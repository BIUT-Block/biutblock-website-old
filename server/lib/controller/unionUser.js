const BaseComponent = require('../prototype/baseComponent');
const UnionUserModel = require("../models").UnionUser;
const MessageModel = require("../models").Message;
const NotifyModel = require("../models").Notify;
const UserNotifyModel = require("../models").UserNotify;
const AdminUserModel = require("../models").AdminUser;
const SystemConfigModel = require("../models").SystemConfig;
const UnionUserSendLogModel = require("../models").UnionUserSendLog;
const formidable = require('formidable');
const { service, settings, validatorUtil, logUtil, siteFunc } = require('../../../utils');
const shortid = require('shortid');
const validator = require('validator');
const _ = require('lodash')
const fs = require('fs')
const captcha = require('trek-captcha')
const axios = require('axios');
const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');
const moment = require('moment')

function checkFormData(req, res, fields) {
    let errMsg = '';
    if (fields._id && !siteFunc.checkCurrentId(fields._id)) {
        errMsg = '非法请求，请稍后重试！';
    }
    if (!validatorUtil.checkUserName(fields.userName)) {
        errMsg = '5-12个英文字符!';
    }
    if (fields.name && !validatorUtil.checkName(fields.name)) {
        errMsg = '2-6个中文字符!';
    }
    if (fields.phoneNum && !validatorUtil.checkPhoneNum(fields.phoneNum)) {
        errMsg = '请填写正确的手机号码!';
    }
    if (fields.email && !validatorUtil.checkEmail(fields.email)) {
        errMsg = '请填写正确的邮箱!';
    }
    if (!validator.isLength(fields.comments, 5, 30)) {
        errMsg = '请输入5-30个字符!';
    }
    if (errMsg) {
        throw new siteFunc.UserException(errMsg);
    }
}

function checkCurrentDate(updateTime) {
    let date = new Date();
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let D = date.getDate();
    let D1 = (date.getDate() + 1);
    let end = new Date(Y + M + D).getTime()//今天结束时的毫秒数
    let start = end - 86400000 * 90//三个月开始时的毫秒数

    let userStateTime = new Date(updateTime).getTime(); //用户注册时间
    if (end - userStateTime > 86400000 * 90) {
        return false;
    } else {
        return true;
    }

}

function sendLastCoins(unionUser, wantCoins) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                let targetWallet = unionUser.wallet;
                // console.log('----targetWallet------' + targetWallet + '--code---' + code + '---wantCoins---' + wantCoins);
                logUtil.info('联盟发放请求(get)：', settings.coinServer + targetWallet + '/' + wantCoins + '/' + settings.gasPrice)
                let writeState = await axios.get(settings.coinServer + targetWallet + '/' + wantCoins + '/' + settings.gasPrice);
                logUtil.info('联盟发放结束！', writeState.status);
                if (writeState.status == 200 && !_.isEmpty(writeState.data) && writeState.data.status == 'success') {
                    logUtil.info('联盟发放-转账成功！', targetWallet + '--' + writeState.data.txHash)
                    await UnionUserModel.findOneAndUpdate({ _id: unionUser._id }, { '$inc': { 'coins': wantCoins } });
                    let sendlog = new UnionUserSendLogModel({
                        user: unionUser._id,
                        getCoins: wantCoins,
                        logs: '联盟会员每天发放'
                    });
                    await sendlog.save();
                    resolve();
                } else {
                    await UnionUserModel.findOneAndUpdate({ _id: unionUser._id }, { '$inc': { 'coins': wantCoins } });
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

function getUnionCoins(unionUsers) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < unionUsers.length; i++) {
            const unionUser = unionUsers[i];
            let currentTime = checkCurrentDate(unionUser.updateTime);
            if (currentTime) {
                setTimeout(async () => {
                    let checkCoinApi = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xc6689eb9a6d724b8d7b1d923ffd65b7005da1b62&address=${unionUser.wallet}&tag=latest&apikey=%20H3WXGNMRUGU6QD6AVV6FYWFE8KH3PTRJZ7`;
                    let checkState = await axios.get(checkCoinApi);
                    if (checkState.status == 200 && checkState.data.status == '1') {
                        let userleft = checkState.data.result / 1000000000000000000;
                        // 更新用户数据
                        await UnionUserModel.findOneAndUpdate({ _id: unionUser._id }, { $set: { 'coins': Number(userleft) } });

                        // let nearlogs = [0];
                        let nearlogs = UnionUserSendLogModel.find({ user: unionUser._id }).sort({ date: -1 });
                        let currentDate = moment(new Date()).format("YYYYMMDD");
                        console.log('--currentDate---', currentDate);
                        if (nearlogs.length > 0) {
                            console.log(currentDate + '------' + nearlogs[0].date);
                            if (currentDate != nearlogs[0].date && userleft >= 100) {
                                logUtil.info('符合条件，准备发放！', currentDate + '------' + nearlogs[0].date + '----' + userleft)
                                await sendLastCoins(unionUser, 100);
                            }
                        } else {
                            if (userleft >= 100000) {
                                await sendLastCoins(unionUser, 100);
                            }
                        }
                    }
                }, 2000)
            }
        }
    })
}



class UnionUser {
    constructor() {
        // super()
    }

    async addOneUnion(req, res, next) {
        try {
            let user1 = { wallet: '0x2ed28eDEbD296Bf085C582f5187E4F987e6214e6', invitationCode: 'H1Yg79BIz', userName: 'doramart', phoneNum: '17665365092', extendCode: ['H1Yg79BIz', 'H1Yg79BIz'], enable: true, group: '0', coins: 0, password: 'c27eee88b48fc504', lock: true };
            let user1Obj = new UnionUserModel(user1);
            await user1Obj.save();
            res.send({
                state: 'success'
            })
        } catch (error) {
            console.log(error);
        }
    }

    async unionReg(req, res, next) {
        let _this = this;
        const form = new formidable.IncomingForm();
        let myShareId = shortid.generate();
        form.parse(req, async (err, fields, files) => {
            try {
                let errMsg = "";
                // console.log(fields.msgCode + '------' + req.session.messageCode)
                if (fields.msgCode != req.session.messageCode) {
                    errMsg = 'messageCode-请输入正确的验证码';
                }

                if (!fields.invitationCode || !shortid.isValid(fields.invitationCode)) {
                    errMsg = 'invitationCode-请输入正确的邀请码';
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
                    // invitationCode: fields.invitationCode
                }

                let parentUser = await UnionUserModel.findOne({ invitationCode: fields.invitationCode });
                if (_.isEmpty(parentUser)) {
                    throw new siteFunc.UserException('invitationCode-请输入正确的邀请码');
                }
                let user = await UnionUserModel.find({ $or: [{ 'phoneNum': currentMobile }, { userName: fields.userName }] })
                console.log('--user----', user);
                if (!_.isEmpty(user)) {
                    throw new siteFunc.UserException('haduser-邮箱或用户名已存在！');
                } else {
                    console.log('---parentUser---', parentUser)
                    let myExtendCode = [];
                    // 存联合推荐人信息
                    myExtendCode.push((parentUser.extendCode)[0]);
                    // 存父推荐人信息
                    myExtendCode.push(fields.invitationCode);
                    userObj.extendCode = myExtendCode;
                    // console.log('----userObj--', userObj);
                    let newUser = new UnionUserModel(userObj);
                    let currentUser = await newUser.save();
                    req.session.user = "";
                    // console.log('----currentUser----', currentUser);
                    // 将cookie存入缓存
                    let auth_token = currentUser._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
                    res.cookie(settings.auth_cookie_name, auth_token,
                        { path: '/', maxAge: 1000 * 60 * 60 * 24 * 30, signed: true, httpOnly: true }); //cookie 有效期30天
                    res.send({
                        state: 'success'
                    });
                }

            } catch (err) {
                logUtil.error(err, req);
                res.send({
                    state: 'error',
                    type: 'ERROR_IN_SAVE_DATA',
                    message: err,
                })
            }
        })
    }

    async addWallet(req, res, next) {
        const form = new formidable.IncomingForm();
        let userInfo = req.session.user;
        console.log('---req.session.user---', req.session.user);
        form.parse(req, async (err, fields, files) => {
            try {
                let errMsg = "";
                if (!fields.wallet || !/^[a-zA-Z0-9]{42,43}$/.test(fields.wallet) || (fields.wallet).indexOf('0x') < 0) {
                    errMsg = 'wallet-请填写正确的钱包地址!';
                }
                // 绑定钱包不可重复
                let targetUser = await UnionUserModel.findOne({ wallet: fields.wallet });
                if (!_.isEmpty(targetUser) && targetUser._id) {
                    errMsg = 'wallet-钱包地址已被注册!';
                }
                if (errMsg) {
                    throw new siteFunc.UserException(errMsg);
                }

                let shareId = shortid.generate();
                await UnionUserModel.findOneAndUpdate({ _id: userInfo._id }, { $set: { wallet: fields.wallet, invitationCode: shareId } });
                req.session.user.invitationCode = shareId;
                req.session.user.wallet = fields.wallet;
                res.send({
                    state: 'success'
                })
            } catch (error) {
                logUtil.error(error, req);
                res.send({
                    state: 'error',
                    type: 'ERROR_IN_SAVE_DATA',
                    message: error,
                })
            }
        })
    }

    async getUnoinUserInfo(req, res, next) {
        try {

            let user = req.session.user;
            let queryObj = {};
            // let reKey = new RegExp(user.invitationCode, 'i')
            queryObj.extendCode = user.invitationCode;

            // 1、查询我旗下的会员
            let squery = Object.assign({}, queryObj, { group: '1' });
            let myUsers = await UnionUserModel.count(squery);

            // 2、查询我旗下的创始人
            let bquery = Object.assign({}, queryObj, { group: '0' });
            let myUnionUsers = await UnionUserModel.count(bquery);

            // 3、查询我的货币总数
            let myInfo = await UnionUserModel.findOne({ _id: user._id });
            // console.log('--myInfo----', myInfo);
            res.send({
                state: 'success',
                data: {
                    myUserNum: myUsers,
                    myUnionUserNum: myUnionUsers > 0 ? myUnionUsers - 1 : 0,
                    myCoins: myInfo.coins || 0
                }
            })
        } catch (error) {
            logUtil.error(error, req);
            res.send({
                state: 'error',
                type: 'ERROR_IN_SAVE_DATA',
                message: error,
            })
        }
    }

    async taskforUnionUserCoins() {
        try {
            // 查出所有联合创始人
            let unionUsers = await UnionUserModel.find({ group: '0', enable: true });
            // console.log('---unionUsers--', unionUsers);
            getUnionCoins(unionUsers);
        } catch (error) {
            logUtil.error(error, {});
        }
    }

    async getImgCode(req, res) {
        const { token, buffer } = await captcha();
        req.session.imageCode = token;
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.write(buffer);
        res.end();
    }

    async getUsers(req, res, next) {
        try {
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            let searchkey = req.query.searchkey, queryObj = {};

            if (searchkey) {
                let reKey = new RegExp(searchkey, 'i')
                queryObj.userName = { $regex: reKey }
            }

            const Users = await UnionUserModel.find(queryObj, { password: 0 }).sort({ date: -1 }).skip(Number(pageSize) * (Number(current) - 1)).limit(Number(pageSize));
            const totalItems = await UnionUserModel.count(queryObj);


            let newUsers = JSON.parse(JSON.stringify(Users));
            let newUsersArr = [];
            for (let i = 0; i < newUsers.length; i++) {
                const targetUser = newUsers[i];
                let suObj = { invitationCode: { $ne: targetUser.invitationCode } };
                // let reKey = new RegExp(targetUser.invitationCode, 'i')
                suObj.extendCode = targetUser.invitationCode;

                // 1、查询我旗下的会员
                let squery = Object.assign({}, suObj);
                let myUsers = await UnionUserModel.find(squery).populate([{
                    path: 'extendCode',
                    select: 'userName id _id wallet'
                }])
                targetUser.myUsers = myUsers;
                newUsersArr.push(targetUser);
            }

            res.send({
                state: 'success',
                docs: newUsersArr,
                pageInfo: {
                    totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10,
                    searchkey: searchkey || ''
                }
            })
        } catch (err) {
            logUtil.error(err, req);
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取User失败'
            })
        }
    }

    async getOneUserByParams(req, res, params) {
        return await UnionUserModel.findOne(params, { password: 0 });
    }

    async updateUser(req, res, next) {
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

            const userObj = {}

            if (fields.userName) {
                userObj.userName = fields.userName;
            }

            if (fields.phoneNum) {
                userObj.phoneNum = fields.phoneNum;
            }

            if (fields.group) {
                userObj.group = fields.group;
            }

            if (fields.comments) {
                userObj.comments = fields.comments;
            }

            userObj.enable = fields.enable;
            userObj.updateTime = new Date();
            // 修改后添加信息锁
            userObj.lock = true;
            const item_id = fields._id;
            console.log('----userObj---', userObj);
            try {
                await UnionUserModel.findOneAndUpdate({ _id: item_id }, { $set: userObj });
                // 更新缓存
                delete userObj.password;
                req.session.user = _.assign(req.session.user, userObj)
                res.send({
                    state: 'success'
                });
            } catch (err) {
                logUtil.error(err, req);
                res.send({
                    state: 'error',
                    type: 'ERROR_IN_SAVE_DATA',
                    message: '更新数据失败:' + err,
                })
            }
        })

    }

    async delUser(req, res, next) {
        try {
            let errMsg = '', targetIds = req.query.ids;
            if (!siteFunc.checkCurrentId(targetIds)) {
                errMsg = '非法请求，请稍后重试！';
            } else {
                targetIds = targetIds.split(',');
            }
            if (errMsg) {
                throw new siteFunc.UserException(errMsg);
            }
            for (let i = 0; i < targetIds.length; i++) {
                let regUserMsg = await MessageModel.find({ 'author': targetIds[i] });
                if (!_.isEmpty(regUserMsg)) {
                    res.send({
                        state: 'error',
                        message: '请删除该用户留言后在执行该操作！',
                    })
                    break;
                }
            }
            await UnionUserModel.remove({ '_id': { $in: targetIds } });
            res.send({
                state: 'success'
            });
        } catch (err) {
            logUtil.error(err, req);
            res.send({
                state: 'error',
                type: 'ERROR_IN_SAVE_DATA',
                message: '删除数据失败:',
            })
        }
    }

    async loginAction(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            try {
                // let newPsd = service.encrypt(fields.password, settings.encrypt_key);
                let errMsg = '';
                if (!validatorUtil.checkPwd(fields.password)) {
                    errMsg = '请输入正确的密码'
                }
                if (errMsg) {
                    throw new siteFunc.UserException(errMsg);
                }
            } catch (err) {
                console.log(err.message, err);
                res.send({
                    state: 'error',
                    type: 'ERROR_PARAMS',
                    message: err.message
                })
                return;
            }
            const userObj = {
                userName: fields.moblieOrUsername,
                password: service.encrypt(fields.password, settings.encrypt_key),
            }

            if (validator.isNumeric(fields.moblieOrUsername)) {
                userObj = {
                    phoneNum: fields.phoneNum,
                    password: service.encrypt(fields.password, settings.encrypt_key),
                }
            }

            try {
                let user = await UnionUserModel.findOne(userObj);
                if (user) {
                    req.session.user = "";
                    // 将cookie存入缓存
                    let auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
                    res.cookie(settings.auth_cookie_name, auth_token,
                        { path: '/', maxAge: 1000 * 60 * 60 * 24 * 30, signed: true, httpOnly: true }); //cookie 有效期30天

                    res.send({
                        state: 'success',
                        data: {
                            enable: user.enable
                        }
                    });
                } else {
                    logUtil.error(err, req);
                    res.send({
                        state: 'error',
                        message: "登录信息有误，请稍后重试"
                    });
                }
            } catch (err) {
                res.send({
                    state: 'error',
                    type: 'ERROR_IN_SAVE_DATA',
                    message: err.stack
                })
            }

        })
    }

    async regAction(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            try {
                let newPsd = service.encrypt(fields.password, settings.encrypt_key);
                let errMsg = '';

                if (!validatorUtil.checkUserName(fields.userName)) {
                    errMsg = '5-12个英文字符!';
                }
                if (!validatorUtil.checkEmail(fields.email)) {
                    errMsg = '请输入正确的邮箱'
                }
                if (!validatorUtil.checkPwd(fields.password)) {
                    errMsg = '请输入正确的密码'
                }
                if (fields.password != fields.confirmPassword) {
                    errMsg = '两次输入密码不一致，请重新输入'
                }
                if (errMsg) {
                    throw new siteFunc.UserException(errMsg);
                }
            } catch (err) {
                console.log(err.message, err);
                res.send({
                    state: 'error',
                    type: 'ERROR_PARAMS',
                    message: err.message
                })
                return;
            }
            const userObj = {
                userName: fields.userName,
                email: fields.email,
                password: service.encrypt(fields.password, settings.encrypt_key),
            }
            try {
                let user = await UnionUserModel.find().or([{ 'email': fields.email }, { userName: fields.userName }])
                if (!_.isEmpty(user)) {
                    res.send({
                        state: 'error',
                        message: '邮箱或用户名已存在！'
                    });
                } else {
                    let newUser = new UnionUserModel(userObj);
                    await newUser.save();

                    //发送通知邮件给用户
                    const systemConfigs = await SystemConfigModel.find({});
                    if (!_.isEmpty(systemConfigs)) {
                        service.sendEmail(req, systemConfigs[0], settings.email_notice_user_reg, {
                            email: fields.email,
                            userName: fields.userName
                        })
                    }

                    let noticeConfig = siteFunc.getNoticeConfig('reg', fields.userName);
                    let notify = new NotifyModel(noticeConfig);
                    // 发系统消息管理员
                    let newNotify = await notify.save();
                    let users = await AdminUserModel.find({}, '_id');
                    if (users.length > 0) {
                        for (let i = 0; i < users.length; i++) {
                            let userNotify = new UserNotifyModel({
                                systemUser: users[i]._id,
                                notify: newNotify
                            });
                            await userNotify.save();
                        }
                    }

                    res.send({
                        state: 'success',
                        message: "注册成功！"
                    });
                }
            } catch (err) {
                res.send({
                    state: 'error',
                    type: 'ERROR_IN_SAVE_DATA',
                    message: err.stack
                })
            }

        })
    }

    async logOut(req, res, next) {
        req.session.destroy();
        res.clearCookie(settings.auth_cookie_name, { path: '/' });
        res.send({
            state: 'success',
        })
    }

}

module.exports = new UnionUser();