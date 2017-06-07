const BaseComponent = require('../prototype/baseComponent');
const UserModel = require("../models").User;
const formidable = require('formidable');
const { service, settings, validatorUtil } = require('../../../utils');

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
            console.log('获取User失败');
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取User失败'
            })
        }
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
                console.log('更新数据失败', err);
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
            console.log('删除数据失败', err);
            res.send({
                state: 'error',
                type: 'ERROR_IN_SAVE_DATA',
                message: '删除数据失败:',
            })
        }
    }

}

module.exports = new User();