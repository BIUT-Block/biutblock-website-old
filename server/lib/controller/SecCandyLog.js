const BaseComponent = require('../prototype/baseComponent');
const SecCandyLogModel = require("../models").SecCandyLog;
const WalletsModel = require("../models").Wallets;
const formidable = require('formidable');
const { service, settings, validatorUtil, logUtil, siteFunc } = require('../../../utils');
const shortid = require('shortid');
const validator = require('validator')
const _ = require('lodash');

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

            let tagsData = {
                state: 'success',
                docs: secCandyList,
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
                // 先看钱包是否已经绑定过
                const targetWallet = await WalletsModel.findOne({ walletId: fields.walletAddress });
                let userWalletId = "", myShareId = shortid.generate();
                if (targetWallet && targetWallet._id) {
                    userWalletId = targetWallet._id;
                    myShareId = targetWallet.myCode;
                } else {
                    // 创建钱包并生成分享ID
                    // console.log('---myShareId---', myShareId);
                    const newWallet = new WalletsModel({ walletId: fields.walletAddress, myCode: myShareId });
                    const newWalletObj = await newWallet.save();
                    // console.log('---newWalletObj---', newWalletObj);
                    userWalletId = newWalletObj._id;
                }
                const targetCandyLog = await SecCandyLogModel.findOne({ passiveCode: req.session.passiveCode });
                if (targetCandyLog && targetCandyLog._id) {
                    // console.log('---userWalletId--', userWalletId);
                    // 去重
                    targetCandyLog.wallets.push(userWalletId);
                    // console.log('----targetCandyLog.wallets--', targetCandyLog.wallets);
                    let currentWallets = _.uniq(targetCandyLog.wallets);
                    let newContent = await SecCandyLogModel.findOneAndUpdate({ passiveCode: req.session.passiveCode }, { 'wallets': currentWallets });
                } else {
                    let currentWallets = [];
                    currentWallets.push(userWalletId)
                    // console.log('-----userWalletId---', userWalletId, '----', currentWallets);
                    walletObj.wallets = currentWallets;
                    // console.log('---walletObj---', walletObj);
                    const newSecCandyLog = new SecCandyLogModel(walletObj);
                    await newSecCandyLog.save();
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
            const targetCandyLog = await SecCandyLogModel.findOne({ passiveCode: shareId });
            const myWallet = await WalletsModel.findOne({ myCode: req.session.shareId });
            let baseCoin = myWallet.hasSend ? 20 : 0;
            if (targetCandyLog && targetCandyLog._id) {
                let wallets = targetCandyLog.wallets
                return {
                    rcvNum: wallets.length,
                    rcvScore: wallets.length * 20 + baseCoin
                }
            } else {
                return {
                    rcvNum: 0,
                    rcvScore: baseCoin
                }
            }
        } catch (error) {
            logUtil.error(err, req);
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
        return await WalletsModel.update({ myCode: code }, { $set: { hasSend: true } });
    }
}

module.exports = new SecCandyLog();