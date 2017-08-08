const BaseComponent = require('../prototype/baseComponent');
const UserModel = require("../models").User;
const formidable = require('formidable');
const { service, settings, validatorUtil, logUtil } = require('../../../utils');
const shortid = require('shortid');

class User {
    constructor() {
        // super()
    }
    async getUsers(req, res, next) {
        try {
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            const Users = await UserModel.find({}).sort({ date: -1 }).skip(10 * (Number(current) - 1)).limit(Number(pageSize));
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
                if (!fields.name) {
                } else if (!fields.restaurant_id) {
                }
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
            await UserModel.remove({ _id: req.query.ids });
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