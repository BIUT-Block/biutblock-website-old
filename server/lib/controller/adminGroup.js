const BaseComponent = require('../prototype/baseComponent');
const AdminGroupModel = require("../models").AdminGroup;
const formidable = require('formidable');
const { service, settings, validatorUtil, logUtil } = require('../../../utils');

class AdminGroup {
    constructor() {
        // super()
    }
    async getAdminGroups(req, res, next) {
        try {
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            const AdminGroups = await AdminGroupModel.find({});
            const totalItems = await AdminGroupModel.count();
            res.send({
                state: 'success',
                docs: AdminGroups,
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
                message: '获取AdminGroups失败'
            })
        }
    }

    async addAdminGroup(req, res, next) {
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

            const groupObj = {
                name: fields.name,
                comments: fields.comments,
                enable: fields.enable
            }

            const newAdminGroup = new AdminGroupModel(groupObj);
            try {
                await newAdminGroup.save();
                res.send({
                    state: 'success',
                    id: newAdminGroup._id
                });
            } catch (err) {
                logUtil.error(err, req);
                res.send({
                    state: 'error',
                    type: 'ERROR_IN_SAVE_DATA',
                    message: '保存数据失败:',
                })
            }
        })
    }

    async updateAdminGroup(req, res, next) {
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
                name: fields.name,
                comments: fields.comments,
                enable: fields.enable,
                power: fields.power
            }
            const item_id = fields._id;
            console.log('---fields----', fields);

            try {
                await AdminGroupModel.findOneAndUpdate({ _id: item_id }, { $set: userObj });
                // 更新power
                req.session.adminPower = userObj.power;
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

    async delAdminGroup(req, res, next) {
        try {
            await AdminGroupModel.remove({ _id: req.query.ids });
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

}

module.exports = new AdminGroup();