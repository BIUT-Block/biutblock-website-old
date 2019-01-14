const BaseComponent = require('../prototype/baseComponent');
const SecCandyLogModel = require("../models").SecCandyLog;
const WalletsModel = require("../models").Wallets;
const WalletsLogsModel = require("../models").WalletsLogs;
const UserModel = require("../models").User;
const formidable = require('formidable');
const { service, settings, validatorUtil, logUtil, siteFunc } = require('../../../utils');
const shortid = require('shortid');
const validator = require('validator')
const _ = require('lodash');
const axios = require('axios');

//缓存
var cache = require('../../../utils/middleware/cache');

// 定义定时任务
let walletTaskTimer;
let redisLoopTimer;
function checkFormData(req, res, fields) {
    let errMsg = '';
    console.log('--fields--', fields);
    if (!fields.walletAddress || !/^[a-zA-Z0-9]{42,43}$/.test(fields.walletAddress) || (fields.walletAddress).indexOf('0x') < 0) {
        errMsg = 'wallet-请填写正确的钱包地址!';
    }
    if (!req.session.passiveCode || !shortid.isValid(req.session.passiveCode)) {
        errMsg = '没有正确有效的推荐码';
    }
    if (fields.msgCode != req.session.messageCode) {
        errMsg = 'messageCode-请输入正确的验证码';
    }
    let mobileArr = fields.mobile.split('-')
    if (mobileArr.length == 1 || !validator.isNumeric(mobileArr[0])
        || !validator.isNumeric(mobileArr[1])
        || mobileArr[0].length != 4
    ) {
        errMsg = 'mobile-手机号格式不正确';
    }
    //TODO 暂时放开
    if (errMsg) {
        throw new siteFunc.UserException(errMsg);
    }
}


function getCacheData(key) {
    return new Promise((resolve, reject) => {
        cache.get(key, function (result) {
            if (result) {
                resolve(JSON.parse(result));
            } else {
                resolve('');
            }
        })
    })
}

function setCacheData(key, value) {
    // 暂时设置一小时缓存
    return new Promise((resolve, reject) => {
        cache.set(key, value, 1000 * 60 * 60)
        resolve()
    })
    // cache.set(key, value, 1000 * 60 * 60)
}

// let checkLock = function (thisCoinList) {
//     setTimeout(async () => {
//         try {
//             // console.log('----11111--')
//             let coinlock = await getCacheData('coinlock');
//             // console.log('----2222--', coinlock)
//             if (coinlock) {
//                 checkLock();
//             } else {
//                 // 加锁
//                 await setCacheData('coinlock', 1);
//                 // 存缓存
//                 let oldRedisCoinList = await getCacheData('thisCoinList');
//                 if (oldRedisCoinList) {
//                     oldRedisCoinList = JSON.parse(oldRedisCoinList);
//                     _.concat(thisCoinList, oldRedisCoinList);
//                     // 去重
//                     _.uniq(thisCoinList);
//                 }
//                 console.log('----3333--', JSON.stringify(thisCoinList))
//                 await setCacheData('thisCoinList', JSON.stringify(thisCoinList));
//                 // 解锁
//                 await setCacheData('coinlock', '');
//             }
//         } catch (error) {
//             logUtil.info(error, {});
//             checkLock();
//         }

//     }, 1000 * 5)
// }

// let checkRedisLock = function (_thisCandy) {
//     setTimeout(async () => {
//         try {
//             let coinlock = await getCacheData('coinlock');
//             if (coinlock) {
//                 checkRedisLock(_thisCandy);
//             } else {
//                 // 加锁
//                 await setCacheData('coinlock', 1);
//                 // 取缓存
//                 let newRedisCoinList = await getCacheData('thisCoinList');
//                 // 清缓存
//                 await setCacheData('thisCoinList', '');
//                 // 解锁
//                 await setCacheData('coinlock', '');
//                 // 发放
//                 if (!_.isEmpty(newRedisCoinList) && newRedisCoinList.length > 0) {
//                     console.log('---------newRedisCoinList------------', newRedisCoinList.length);
//                     _thisCandy.getJobSecCandyList('redis', newRedisCoinList)
//                 }
//                 // 发放完毕 等5s继续轮询
//                 setTimeout(() => {
//                     console.log('轮询继续')
//                     checkRedisLock(_thisCandy);
//                 }, 1000 * 60 * 5)
//             }
//         } catch (error) {
//             logUtil.info(error, {});
//             checkRedisLock(_thisCandy);
//         }

//     }, 1000 * 5)
// }

function sendLastCoins(targetWallet, code, wantCoins) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                logUtil.info('准备补发！----targetWallet------' + targetWallet + '--code---' + code + '---wantCoins---' + wantCoins);
                // console.log('----targetWallet------' + targetWallet + '--code---' + code + '---wantCoins---' + wantCoins);
                logUtil.info('补发请求(get)：', settings.coinServer + targetWallet + '/' + wantCoins + '/' + settings.gasPrice)
                let writeState = await axios.get(settings.coinServer + targetWallet + '/' + wantCoins + '/' + settings.gasPrice);
                logUtil.info('补发结束！', writeState.status);
                if (writeState.status == 200 && !_.isEmpty(writeState.data) && writeState.data.status == 'success') {
                    logUtil.info('补发-转账成功！', targetWallet + '--' + writeState.data.txHash)
                    await SecCandyLogModel.findOneAndUpdate({ passiveCode: code }, { '$inc': { 'getCoins': wantCoins } });
                    // 给转账记录表插一条记录
                    let newWalletLogs = new WalletsLogsModel({ walletId: targetWallet, txHash: writeState.data.txHash });
                    await newWalletLogs.save();
                    resolve();
                } else {
                    logUtil.info('补发-转账失败！', writeState.data)
                    resolve();
                }
            } catch (error) {
                logUtil.info(error, {})
                resolve();
            }
        }, 5000)
    })
}

class SecCandyLog {
    constructor() {
        // super()
    }

    async getSecCandyList(req, res, next) {
        try {
            // console.log('--req.query.hasValidate---', req.query.hasValidate);
            let modules = req.query.modules;
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 100;
            let model = req.query.model; // 查询模式 full/simple
            let hasValidate = req.query.hasValidate || '';
            let searchkey = req.query.searchkey, queryObj = {};
            if (model === 'full') {
                pageSize = '1000'
            }

            if (searchkey) {
                let searchWallet = searchkey.trim();
                let currentCode = searchWallet;
                if (searchWallet.length == 42) {
                    let sWallet = await WalletsModel.findOne({ walletId: searchWallet });
                    currentCode = sWallet.myCode;
                }
                let reKey = new RegExp(currentCode, 'i')
                queryObj.passiveCode = { $regex: reKey }
            }

            if (hasValidate == '2') {
                queryObj.hasSend = true;
                queryObj.hasValidate = false;
                queryObj.$where = function () { return this.wallets.length * 20 + 20 > this.getCoins && this.getCoins < 600 }
                queryObj.$or = [{ first_name: { $ne: null } }, { last_name: { $ne: null } }]
            }

            const secCandyList = await SecCandyLogModel.find(queryObj).sort({ date: -1, }).skip(Number(pageSize) * (Number(current) - 1)).limit(Number(pageSize)).populate([{
                path: 'wallets',
                select: 'walletId hasSend -_id',
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
                    totalItems: totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10,
                    searchkey: searchkey || '',
                    hasValidate: hasValidate
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
        let _this = this;
        const form = new formidable.IncomingForm();
        let myShareId = shortid.generate();
        form.parse(req, async (err, fields, files) => {
            try {
                checkFormData(req, res, fields);
                // 查询发送短信次数
            } catch (err) {
                console.log(err.message, err);
                res.send({
                    state: 'error',
                    type: 'ERROR_PARAMS',
                    message: err.message
                })
                return
            }
            let walletObj = {
                passiveCode: req.session.passiveCode,
            }
            try {
                // 获取手机号
                let mobileArr = fields.mobile.split('-');
                let isCnMobile = mobileArr[0] == '0086' ? true : false;
                let currentMobile = isCnMobile ? mobileArr[1] : (mobileArr[0] + mobileArr[1]);
                // 先看钱包是否已经绑定过 如果已通过其他链接绑定，则此处再分享是无效的
                const targetWallet = await WalletsModel.findOne({ 'walletId': fields.walletAddress });
                const targetWalletOne = await WalletsModel.findOne({ 'telPhone': currentMobile });
                let userWalletId = "";
                // console.log('---targetWallet--', targetWallet);
                // console.log('---targetWalletOne--', targetWalletOne);
                if (targetWallet && targetWallet._id || targetWalletOne && targetWalletOne._id) {
                    myShareId = targetWallet ? targetWallet.myCode : targetWalletOne.myCode;
                } else {
                    // 创建钱包并生成分享ID
                    let newWalletQuery = { walletId: fields.walletAddress, myCode: myShareId, telPhone: currentMobile };
                    // 针对渠道进来的，则直接设置为激活状态 
                    if (req.session.channel == 'wechat') {
                        newWalletQuery.hasSend = true;
                    }
                    const newWallet = new WalletsModel(newWalletQuery);
                    const newWalletObj = await newWallet.save();

                    // 创建自己的糖果空记录
                    const newSecCandyLog = new SecCandyLogModel({
                        wallets: [],
                        passiveCode: myShareId
                    });
                    if (req.session.channel == 'wechat') {
                        newSecCandyLog.channel = 'wechat';
                        newSecCandyLog.hasSend = true;
                    }
                    await newSecCandyLog.save();


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
                }
                // 标记该用户已接受分享成功
                req.session.addWalletSuccess = true;
                req.session.shareId = myShareId;
                // 清空短信验证码
                req.session.messageCode = '';
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

    async regCandy(req, res, next) {
        let _this = this;
        const form = new formidable.IncomingForm();
        let myShareId = shortid.generate();
        form.parse(req, async (err, fields, files) => {
            try {
                let errMsg = "";
                console.log(fields.msgCode + '------' + req.session.messageCode)
                if (fields.msgCode != req.session.messageCode) {
                    errMsg = 'messageCode-请输入正确的验证码';
                }
                if (!fields.sImg) {
                    errMsg = 'sImg-请上传身份证照片';
                }
                let mobileArr = fields.mobile.split('-')
                if (mobileArr.length == 1 || !validator.isNumeric(mobileArr[0])
                    || !validator.isNumeric(mobileArr[1])
                    || mobileArr[0].length != 4
                ) {
                    errMsg = 'mobile-手机号格式不正确';
                }

                if (errMsg) {
                    throw new siteFunc.UserException(errMsg);
                }


                // 获取手机号
                let isCnMobile = mobileArr[0] == '0086' ? true : false;
                let currentMobile = isCnMobile ? mobileArr[1] : (mobileArr[0] + mobileArr[1]);

                const userObj = {
                    userName: fields.userName,
                    phoneNum: currentMobile,
                    password: service.encrypt(fields.password, settings.encrypt_key),
                    logo: fields.sImg
                }

                let user = await UserModel.find().or([{ 'phoneNum': fields.phoneNum }, { userName: fields.userName }])
                if (!_.isEmpty(user)) {
                    res.send({
                        state: 'error',
                        message: 'haduser-邮箱或用户名已存在！'
                    });
                } else {
                    let newUser = new UserModel(userObj);
                    await newUser.save();

                    res.send({
                        state: 'success'
                    });
                }

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
        // console.log('---req.session.shareId----', req.session.shareId);
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

    async checkTelegramUser(telegramId) {
        return await WalletsModel.findOne({ telegramId, hasSend: true });
    }

    async activeUserWallet(code, currentId, first_name, last_name) {
        try {
            let _this = this;
            let myWallet = await WalletsModel.findOneAndUpdate({ myCode: code }, { $set: { telegramId: currentId, hasSend: true, first_name, last_name } });
            // 同步更新激活状态
            await SecCandyLogModel.findOneAndUpdate({ passiveCode: code }, { $set: { hasSend: true, first_name, last_name } });
            if (!_.isEmpty(myWallet) && myWallet.walletId) {
                logUtil.info('激活成功,准备发币！', myWallet.walletId)
                // 激活成功，给自己发币
                let myShareCode = myWallet.myCode;
                let targetWallet = myWallet.walletId;

                let mySecCandyLog = await SecCandyLogModel.findOne({ passiveCode: myShareCode }).populate([{
                    path: 'wallets',
                    select: 'walletId hasSend -_id'
                }]).exec();
                if (!_.isEmpty(mySecCandyLog)) {
                    let shareWallets = mySecCandyLog.wallets;
                    // 如果没有被成功分享过
                    if (shareWallets.length == 0) {
                        logUtil.info('发币入口1');
                        _this.sendCoins(targetWallet, code);
                    } else {
                        // 被校验成功的才会加
                        let checkedWallets = _.filter(shareWallets, (wallet) => {
                            return wallet.hasSend;
                        });
                        logUtil.info('发币入口2', checkedWallets.length + 1);
                        // console.log('--2222--', checkedWallets.length + 1);
                        _this.sendCoins(targetWallet, code, checkedWallets.length + 1);
                    }
                }
                // 给被分享者发币
                var secCandyQuery = { 'wallets': { $regex: new RegExp(myWallet._id, 'i') } };
                let passiveWallet = await SecCandyLogModel.find(secCandyQuery);
                if (!_.isEmpty(passiveWallet)) {
                    let myCode = passiveWallet[0].passiveCode;
                    let theWallet = await WalletsModel.findOne({ myCode });
                    if (!_.isEmpty(theWallet) && theWallet.walletId && theWallet.hasSend) {
                        console.log('--f333--');
                        logUtil.info('发币入口3');
                        _this.sendCoins(theWallet.walletId, myCode);
                    }
                }
            } else {
                logUtil.info('钱包不能为空！')
            }
        } catch (error) {
            logUtil.error(error, {});
        }
    }

    async sendCoins(targetWallet, code, num = 1) {
        try {
            let myCoins = await SecCandyLogModel.findOne({ passiveCode: code });
            // 目标发币
            let wantCoins = settings.coinPer * num;
            logUtil.info('发币判断入口');
            if (!_.isEmpty(myCoins)) {
                let hadCoins = myCoins.getCoins;
                if ((hadCoins + wantCoins) > settings.coinPer * (settings.maxSecShareNum + 1)) {
                    wantCoins = settings.coinPer * (settings.maxSecShareNum + 1) - hadCoins;
                }
                logUtil.info('符合条件 等待客服手动发币');
                // let writeState = await axios.get(settings.coinServer + targetWallet + '/' + wantCoins + '/' + settings.gasPrice);
                // logUtil.info('发币结束！', writeState.status);
                // if (writeState.status == 200 && !_.isEmpty(writeState.data) && writeState.data.status == 'success') {
                //     logUtil.info('激活-转账成功！', targetWallet + '--' + writeState.data.txHash)
                //     return await SecCandyLogModel.findOneAndUpdate({ passiveCode: code }, { '$inc': { 'getCoins': wantCoins } });
                // } else {
                //     logUtil.info('激活-转账失败！', writeState.txHash)
                // }
            }
        } catch (error) {
            console.log('转账失败');
            logUtil.error(error, {});
        }
    }


    async getJobSecCandyList(type = 'out') {
        console.log('------开始查询数据------');
        let _this = this;
        let totalLetWantCoins = [];
        try {
            let current = 1;
            let pageSize = 8000;
            let queryObj = {};
            // 如果是人工发放，则筛选审核的列表作为轮询数据
            if (type == 'redis') {
                queryObj.hasValidate = true;
            }
            let secCandyList = await SecCandyLogModel.find(queryObj).sort({ date: -1 }).skip(Number(pageSize) * (Number(current) - 1)).limit(Number(pageSize)).populate([{
                path: 'wallets',
                select: 'walletId hasSend -_id'
            }]).exec();

            console.log('---secCandyList---', secCandyList.length);
            let newCandyList = JSON.parse(JSON.stringify(secCandyList));

            for (let item of newCandyList) {

                let currentWallet = await WalletsModel.findOne({ myCode: item.passiveCode });
                if (currentWallet && currentWallet._id) {
                    item.passiveWallet = currentWallet;
                }
                // 计算应得积分
                let wallets = item.wallets;
                let maxSecShareNum = settings.maxSecShareNum;
                let currentShareNum = 0, currentShareCoin = 0, currentWallets = [];
                // 判断被分享者是否被激活
                let authSentState = false;
                if (type == 'out') {
                    authSentState = item.passiveWallet.hasSend;
                } else {
                    authSentState = item.passiveWallet.hasSend && item.hasValidate
                }
                // console.log('--item.passiveWallet----', item.passiveWallet);
                // console.log('--authSentState---', authSentState);
                if (authSentState) {
                    currentWallets = _.filter(wallets, wallet => {
                        return wallet.hasSend;
                    });
                    currentShareNum = currentWallets.length > maxSecShareNum ? maxSecShareNum : currentWallets.length;
                    currentShareCoin = currentShareNum * 20 + 20;

                    // 比较应得和实发
                    // console.log(currentShareCoin + '-----' + item.getCoins);
                    if (currentShareCoin > item.getCoins) {
                        let { telegramId, telPhone, walletId, myCode } = item.passiveWallet;
                        let wantCoins = currentShareCoin - item.getCoins;
                        let newBakWalletQuery = {
                            walletId,
                            telegramId,
                            telPhone,
                            wantCoins,
                            myCode
                        };
                        totalLetWantCoins.push(newBakWalletQuery);
                    }
                }
            }

            if (!_.isEmpty(totalLetWantCoins) && totalLetWantCoins.length > 0) {
                console.log('---------本次补发数量：------------', totalLetWantCoins.length);
                logUtil.info('本次补发数量：' + totalLetWantCoins.length);
                _this.sendBakCoins(totalLetWantCoins, type);
            } else {
                // 5分钟做一次查询
                console.log('-----补发完毕，准备下次轮询---');
                logUtil.info('补发完毕，准备下次轮询');
                clearTimeout(walletTaskTimer);
                walletTaskTimer = setTimeout(() => {
                    _this.getJobSecCandyList(type);
                }, 1000 * 60 * 5)

            }
        } catch (err) {
            logUtil.error(err, {});
        }
    }

    // 定时任务
    async getJobSecCandyFromRedis() {
        this.getJobSecCandyList('redis')
    }


    async sendBakCoins(baklist, type = 'out') {
        let _this = this;
        try {
            if (!_.isEmpty(baklist) && baklist.length > 0) {
                for (let i = 0; i < baklist.length; i++) {
                    let { wantCoins, telPhone, walletId, myCode } = baklist[i];
                    await sendLastCoins(walletId, myCode, wantCoins);
                }
            }
            _this.getJobSecCandyList(type);
        } catch (error) {
            console.log('转账失败');
            logUtil.error(error, {});
        }
    }

    async branchSendCoins(req, res, next) {
        console.log('--开始发起发币请求--')
        let _this = this;
        try {
            let ids = req.query.ids;
            if (ids) {
                let targetIds = ids.split(',');
                if (targetIds.length > 0) {
                    for (let i = 0; i < targetIds.length; i++) {
                        // 更新状态
                        await SecCandyLogModel.findOneAndUpdate({ _id: targetIds[i] }, { hasValidate: true });
                    }
                }
                res.send({
                    state: 'success'
                })
            } else {
                res.send({
                    state: 'error',
                    message: '非法操作'
                })
            }

        } catch (err) {
            logUtil.error(err, req);
        }

    }
}

module.exports = new SecCandyLog();