const BaseComponent = require('../prototype/baseComponent');
const UserModel = require("../models").User;
const MessageModel = require("../models").Message;
const formidable = require('formidable');
const { service, settings, validatorUtil, logUtil, siteFunc } = require('../../../utils');
const shortid = require('shortid');
const validator = require('validator');
const _ = require('lodash')

function checkFormData(req, res, fields) {
    let errMsg = '';
    if (fields._id && !siteFunc.checkCurrentId(fields._id)) {
        errMsg = '非法请求，请稍后重试！';
    }
    if (!validatorUtil.checkUserName(fields.userName)) {
        errMsg = '5-12个英文字符!';
    }
    if (!validatorUtil.checkName(fields.name)) {
        errMsg = '2-6个中文字符!';
    }
    if (fields.phoneNum && !validatorUtil.checkPhoneNum(fields.phoneNum)) {
        errMsg = '请填写正确的手机号码!';
    }
    if (!validatorUtil.checkEmail(fields.email)) {
        errMsg = '请填写正确的邮箱!';
    }
    if (!validator.isLength(fields.comments, 5, 30)) {
        errMsg = '请输入5-30个字符!';
    }
    if (errMsg) {
        res.send({
            state: 'error',
            type: 'ERROR_PARAMS',
            message: errMsg
        })
    }
}

class User {
    constructor() {
        // super()
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

            const Users = await UserModel.find(queryObj).sort({ date: -1 }).skip(10 * (Number(current) - 1)).limit(Number(pageSize));
            const totalItems = await UserModel.count();
            res.send({
                state: 'success',
                docs: Users,
                pageInfo: {
                    totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10
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
        // let user_id = req.query._id;
        return await UserModel.findOne(params);
    }

    async updateUser(req, res, next) {
        console.log('--req.params--', req.params);
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            console.log('---fields----', fields);
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

            const userObj = {
                userName: fields.userName,
                name: fields.name,
                email: fields.email,
                phoneNum: fields.phoneNum,
                password: fields.password,
                confirm: fields.confirm,
                group: fields.group
            }
            const item_id = fields._id;
            console.log('---fields----', fields);
            try {
                await UserModel.findOneAndUpdate({ _id: item_id }, { $set: userObj });
                res.send({
                    state: 'success'
                });
            } catch (err) {
                logUtil.error(err, req);
                res.send({
                    state: 'error',
                    type: 'ERROR_IN_SAVE_DATA',
                    message: '更新数据失败:',
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
                res.send({
                    state: 'error',
                    message: errMsg,
                })
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
            await UserModel.remove({ '_id': { $in: targetIds } });
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
                let newPsd = service.encrypt(fields.password, settings.encrypt_key);
                let errMsg = '';
                if (!validatorUtil.checkEmail(fields.email)) {
                    errMsg = '请输入正确的邮箱'
                } else if (!validatorUtil.checkPwd(fields.password)) {
                    errMsg = '请输入正确的密码'
                }
                if (errMsg) {
                    res.send({
                        state: 'error',
                        type: 'ERROR_PARAMS',
                        message: errMsg
                    })
                    return;
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
                email: fields.email,
                password: service.encrypt(fields.password, settings.encrypt_key),
            }
            try {
                let user = await UserModel.findOne(userObj);
                if (user) {
                    // 将cookie存入缓存
                    let auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
                    res.cookie(settings.auth_cookie_name, auth_token,
                        { path: '/', maxAge: 1000 * 60 * 60 * 24 * 30, signed: true, httpOnly: true }); //cookie 有效期30天

                    res.send({
                        state: 'success'
                    });
                } else {
                    logUtil.error(err, req);
                    res.send({
                        state: 'error',
                        message: "用户名或密码错误"
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

module.exports = new User();