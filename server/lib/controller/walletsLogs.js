const BaseComponent = require('../prototype/baseComponent');
const WalletsLogsModel = require("../models").WalletsLogs;
const formidable = require('formidable');
const { service, settings, validatorUtil, logUtil, siteFunc } = require('../../../utils');
const shortid = require('shortid');
const validator = require('validator')
const _ = require('lodash');
const axios = require('axios');


function sendWalletLogs(txHash) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                let writeState = await axios.get(settings.stateServer + txHash);
                console.log('---状态插入---', writeState.data);
                logUtil.info('状态插入开始！', writeState.data)
                if (writeState.status == 200 && writeState.data) {
                    // 给转账记录表插一条记录
                    await WalletsLogsModel.findOneAndUpdate({ txHash }, { $set: { state: writeState.data.result, message: writeState.data.message, update: new Date() } });
                    console.log('---状态插入完成---');
                    logUtil.info('状态插入完成')
                    resolve();
                } else {
                    logUtil.info('状态插入失败！')
                    resolve();
                }
            } catch (error) {
                logUtil.info(error, {})
                resolve();
            }
        }, 2000)
    })
}

class WalletsLogs {
    constructor() {
        // super()
    }

    async addOneWalletLog(walletObj) {
        let obj = {
            walletId: walletObj.targetWallet,
            txHash: walletObj.txHash
        }
        // console.log('----obj----', obj);
        try {
            let newWallet = new WalletsLogsModel(obj);
            await newWallet.save();

        } catch (error) {
            console.log(error);
        }
    }

    async getWalletsLogs(req, res, next) {
        try {
            let modules = req.query.modules;
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            let searchkey = req.query.searchkey;

            let queryObj = {};

            if (searchkey) {
                let searchWallet = searchkey.trim();
                let currentCode = searchWallet;
                let reKey = new RegExp(currentCode, 'i')
                queryObj.walletId = { $regex: reKey }
            }

            const walletsLogs = await WalletsLogsModel.find(queryObj).sort({
                date: -1
            }).skip(Number(pageSize) * (Number(current) - 1)).limit(Number(pageSize)).populate([{
                path: 'wallets',
                select: 'walletId hasSend -_id',
            }]).exec();
            const totalItems = await WalletsLogsModel.count(queryObj);

            let logsData = {
                state: 'success',
                docs: walletsLogs,
                pageInfo: {
                    totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10,
                    searchkey: searchkey || '',
                    totalPage: Math.ceil(totalItems / pageSize)
                }
            };
            if (modules && modules.length > 0) {
                return logsData;
            } else {
                res.send(logsData);
            }

        } catch (err) {
            logUtil.error(err, req);
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取Message失败'
            })
        }
    }

    async updateWalletLogs(targetId, logs) {
        try {
            await WalletsLogsModel.findOneAndUpdate({ _id: targetId }, { $set: { state: logs } });
        } catch (error) {
            logUtil.error(error, {});
        }
    }

    async addJobForScanWalletLogs() {
        let _this = this;
        logUtil.info('----准备查询发币状态信息----');
        let queryObj = {};
        queryObj.$or = [{ state: null }, { state: '2' }]
        let walletLogs = await WalletsLogsModel.find(queryObj);
        if (!_.isEmpty(walletLogs) && walletLogs.length > 0) {
            logUtil.info('----本次准备更新的状态记录！----', walletLogs.length)
            for (let i = 0; i < walletLogs.length; i++) {
                await sendWalletLogs(walletLogs[i].txHash);
            }
            _this.addJobForScanWalletLogs();
        } else {
            logUtil.info('----等待五分钟继续查询发送结果----');
            setTimeout(() => {
                _this.addJobForScanWalletLogs();
            }, 1000 * 60 * 5)
        }
    }
}

module.exports = new WalletsLogs();