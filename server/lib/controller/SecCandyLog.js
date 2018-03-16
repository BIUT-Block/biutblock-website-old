const BaseComponent = require('../prototype/baseComponent');
const SecCandyLogModel = require("../models").SecCandyLog;
const WalletsModel = require("../models").Wallets;
const formidable = require('formidable');
const { service, settings, validatorUtil, logUtil, siteFunc } = require('../../../utils');
const shortid = require('shortid');
const validator = require('validator')
const _ = require('lodash');
const axios = require('axios');

function checkFormData(req, res, fields) {
    let errMsg = '';

    if (!fields.walletAddress || !/^[a-zA-Z0-9]{42,43}$/.test(fields.walletAddress) || (fields.walletAddress).indexOf('0x') < 0) {
        errMsg = '请填写正确的钱包地址!';
    }
    if (!req.session.passiveCode || !shortid.isValid(req.session.passiveCode)) {
        errMsg = '没有正确有效的推荐码';
    }
    //TODO 暂时放开
    if (errMsg) {
        throw new siteFunc.UserException(errMsg);
    }
}

class SecCandyLog {
    constructor() {
        // super()
    }

    async getSecCandyList(req, res, next) {
        try {
            let modules = req.query.modules;
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            let model = req.query.model; // 查询模式 full/simple
            let searchkey = req.query.searchkey, queryObj = {};
            if (model === 'full') {
                pageSize = '1000'
            }

            if (searchkey) {
                let reKey = new RegExp(searchkey, 'i')
                queryObj.passiveCode = { $regex: reKey }
            }

            const secCandyList = await SecCandyLogModel.find(queryObj).sort({ date: -1 }).skip(Number(pageSize) * (Number(current) - 1)).limit(Number(pageSize)).populate([{
                path: 'wallets',
                select: 'walletId hasSend -_id'
            }]).exec();
            const totalItems = await SecCandyLogModel.count(queryObj);

            let newCandyList = JSON.parse(JSON.stringify(secCandyList));
            for (let item of newCandyList) {
                let currentWallet = await WalletsModel.findOne({ myCode: item.passiveCode });
                if (currentWallet && currentWallet._id) {
                    item.passiveWallet = currentWallet;
                }
            }

            let tagsData = {
                state: 'success',
                docs: newCandyList,
                pageInfo: {
                    totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10,
                    searchkey: searchkey || ''
                }
            };
            if (modules && modules.length > 0) {
                return tagsData;
            } else {
                res.send(tagsData);
            }
        } catch (err) {
            logUtil.error(err, req);
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取ContentTag失败'
            })
        }
    }

    async getWalletsList(req, res, next) {
        try {
            let modules = req.query.modules;
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            let model = req.query.model; // 查询模式 full/simple
            let searchkey = req.query.searchkey, queryObj = {};
            if (model === 'full') {
                pageSize = '1000'
            }
            if (searchkey) {
                let reKey = new RegExp(searchkey, 'i')
                queryObj.walletId = { $regex: reKey }
            }
            const secWalletList = await WalletsModel.find(queryObj).sort({ date: -1 }).skip(Number(pageSize) * (Number(current) - 1)).limit(Number(pageSize));
            const totalItems = await WalletsModel.count(queryObj);

            let tagsData = {
                state: 'success',
                docs: secWalletList,
                pageInfo: {
                    totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10,
                    searchkey: searchkey || ''
                }
            };
            if (modules && modules.length > 0) {
                return tagsData;
            } else {
                res.send(tagsData);
            }
        } catch (err) {
            logUtil.error(err, req);
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取ContentTag失败'
            })
        }
    }

    async addSecCandyLog(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            try {
                checkFormData(req, res, fields);
            } catch (err) {
                console.log(err.message, err);
                res.send({
                    state: 'error',
                    type: 'ERROR_PARAMS',
                    message: err.message
                })
                return
            }
            const walletObj = {
                passiveCode: req.session.passiveCode,
            }
            try {
                // 先看钱包是否已经绑定过 如果已通过其他链接绑定，则此处再分享是无效的
                const targetWallet = await WalletsModel.findOne({ walletId: fields.walletAddress });
                let userWalletId = "", myShareId = shortid.generate();

                if (targetWallet && targetWallet._id) {
                    myShareId = targetWallet.myCode;
                } else {
                    // 创建钱包并生成分享ID
                    const newWallet = new WalletsModel({ walletId: fields.walletAddress, myCode: myShareId });
                    const newWalletObj = await newWallet.save();
                    userWalletId = newWalletObj._id;

                    // 更新分享记录
                    const targetCandyLog = await SecCandyLogModel.findOne({ passiveCode: req.session.passiveCode });
                    if (targetCandyLog && targetCandyLog._id) {
                        // 去重
                        targetCandyLog.wallets.push(userWalletId);
                        let currentWallets = _.uniq(targetCandyLog.wallets);
                        await SecCandyLogModel.findOneAndUpdate({ passiveCode: req.session.passiveCode }, { 'wallets': currentWallets });
                    } else {
                        let currentWallets = [];
                        currentWallets.push(userWalletId)
                        walletObj.wallets = currentWallets;
                        const newSecCandyLog = new SecCandyLogModel(walletObj);
                        await newSecCandyLog.save();
                    }


                    // 针对被分享的用户进行发币处理
                    // 1、获取被分享者的信息
                    let targetSecCandy = await SecCandyLogModel.findOne({ passiveCode: req.session.passiveCode });
                    if (targetSecCandy && targetSecCandy._id) {
                        let shareTotalNum = targetSecCandy.wallets.length;
                        // 2、在约定的分享次数范围内进行发币
                        if (shareTotalNum < settings.maxSecShareNum) {
                            let currentWallet = await WalletsModel.findOne({ myCode: req.session.passiveCode });
                            if (currentWallet && currentWallet._id) {
                                // 获取需要发币的钱包
                                let targetWallet = currentWallet.walletId;
                                let writeState = await axios.get(settings.coinServer + targetWallet + '/' + settings.coinPer + '/' + settings.gasPrice);
                                if (writeState.status == 'success') {
                                    logUtil.info(targetWallet, '转账成功！')
                                    await SecCandyLogModel.findOneAndUpdate({ passiveCode: req.session.passiveCode }, { '$inc': { 'getCoins': 20 } });
                                } else {
                                    logUtil.info(targetWallet, '转账失败！')
                                }
                            }
                        }
                    }

                }

                // 标记该用户已接受分享成功
                req.session.addWalletSuccess = true;
                req.session.shareId = myShareId;

                res.send({
                    state: 'success'
                });
            } catch (err) {
                logUtil.error(err, req);
                res.send({
                    state: 'error',
                    type: 'ERROR_IN_SAVE_DATA',
                    message: '保存数据失败:' + err,
                })
            }
        })
    }

    async getSecCandyInfoByCode(req, res, next) {
        let shareId = req.session.shareId;
        console.log('---req.session.shareId----', req.session.shareId);
        try {
            const targetCandyLog = await SecCandyLogModel.findOne({ passiveCode: shareId }).populate([{
                path: 'wallets',
                select: 'walletId hasSend -_id'
            }]).exec();
            const myWallet = await WalletsModel.findOne({ myCode: req.session.shareId });
            if (myWallet && myWallet.hasSend) {
                let baseCoin = 20;
                if (targetCandyLog && targetCandyLog._id) {
                    let wallets = targetCandyLog.wallets;
                    // 通过电报群校验的被推荐者才计算
                    let checkedWallets = _.filter(wallets, (wallet) => {
                        return wallet.hasSend;
                    });

                    let shareNum = checkedWallets.length;
                    if (shareNum > settings.maxSecShareNum) shareNum = settings.maxSecShareNum;
                    return {
                        rcvNum: checkedWallets.length,
                        rcvScore: shareNum * 20 + baseCoin
                    }
                } else {
                    return {
                        rcvNum: 0,
                        rcvScore: baseCoin
                    }
                }
            } else {
                return {
                    rcvNum: 0,
                    rcvScore: 0
                }
            }

        } catch (error) {
            logUtil.error(error, req);
            res.send({
                state: 'error',
                type: 'ERROR_IN_SAVE_DATA',
                message: '保存数据失败:' + error,
            })
        }


    }

    async checkCurrentCode(code) {
        return await WalletsModel.findOne({ myCode: code });
    }

    async activeUserWallet(code) {
        try {
            let myWallet = await WalletsModel.findOneAndUpdate({ myCode: code }, { $set: { hasSend: true } });
            if (!_.isEmpty(myWallet) && myWallet.walletId) {
                let targetWallet = myWallet.walletId;
                logUtil.info(targetWallet, '激活成功！')
                let writeState = await axios.get(settings.coinServer + targetWallet + '/' + settings.coinPer + '/' + settings.gasPrice);
                if (writeState.status == 'success') {
                    logUtil.info(targetWallet, '转账成功！')
                    return await SecCandyLogModel.findOneAndUpdate({ passiveCode: req.session.passiveCode }, { '$inc': { 'getCoins': 20 } });
                } else {
                    logUtil.info(targetWallet, '转账失败！')
                }
            } else {
                logUtil.info(error, '钱包不能为空！')
            }
        } catch (error) {
            logUtil.info(error, '激活或转账失败！')
        }


    }
}

module.exports = new SecCandyLog();