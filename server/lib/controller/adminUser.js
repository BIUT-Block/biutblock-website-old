const BaseComponent = require('../prototype/baseComponent');
const AdminUserModel = require("../models").AdminUser;
const formidable = require('formidable');
const { service, settings, validatorUtil } = require('../../../utils');

class AdminUser {
    constructor() {
        // super()
    }
    async getAdminUsers(req, res, next) {
        try {
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            const adminUsers = await AdminUserModel.find({}).sort({ date: -1 }).skip(10 * (Number(current) - 1)).limit(Number(pageSize)).populate({
                path: 'group',
                select: "name _id"
            }).exec();
            const totalItems = await AdminUserModel.count();
            res.send({
                state: 'success',
                docs: adminUsers,
                pageInfo: {
                    totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10
                }
            })
        } catch (err) {
            console.log('获取adminUsers失败');
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取adminUsers失败'
            })
        }
    }

    async getAdminUserByParams(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            const userObj = {
                userName: fields.userName,
                password: service.encrypt(fields.password, settings.encrypt_key),
            }
            let adminUser = await AdminUserModel.findOne(userObj).populate([{
                path: 'group',
                select: 'power _id enable'
            }]).exec();
            return adminUser;
        })
    }

    async addAdminUser(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            console.log('---fields----', fields);
            try {
                if (!fields.name) {
                    // throw new Error('必须填写食品类型名称');
                } else if (!fields.restaurant_id) {
                    // throw new Error('餐馆ID错误');
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
                password: service.encrypt(fields.password, settings.encrypt_key),
                confirm: fields.confirm,
                group: fields.group
            }

            const newAdminUser = new AdminUserModel(userObj);
            try {
                await newAdminUser.save();
                res.send({
                    state: 'success',
                    id: newAdminUser._id
                });
            } catch (err) {
                console.log('保存数据失败', err);
                res.send({
                    state: 'error',
                    type: 'ERROR_IN_SAVE_DATA',
                    message: '保存数据失败:',
                })
            }
        })
    }

    async updateAdminUser(req, res, next) {
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
                password: service.encrypt(fields.password, settings.encrypt_key),
                confirm: fields.confirm,
                group: fields.group
            }
            const item_id = fields._id;
            console.log('---fields----', fields);
            // const newData = new AdminUserModel(userObj);
            try {
                await AdminUserModel.findOneAndUpdate({ _id: item_id }, { $set: userObj });
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

    async delAdminUser(req, res, next) {
        try {
            await AdminUserModel.remove({ _id: req.query.ids });
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

module.exports = new AdminUser();