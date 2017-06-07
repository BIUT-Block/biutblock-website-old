const BaseComponent = require('../prototype/baseComponent');
const MessageModel = require("../models").Message;
const formidable = require('formidable');
const { service, settings, validatorUtil } = require('../../../utils');

class Message {
    constructor() {
        // super()
    }
    async getMessages(req, res, next) {
        try {
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            const Messages = await MessageModel.find({}).sort({ date: -1 }).skip(10 * (Number(current) - 1)).limit(Number(pageSize));
            const totalItems = await MessageModel.count();
            res.send({
                state: 'success',
                docs: Messages,
                pageInfo: {
                    totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10
                }
            })
        } catch (err) {
            console.log('获取Message失败');
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取Message失败'
            })
        }
    }

    async addMessage(req, res, next) {
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

            const groupObj = {
                label: fields.label,
                type: fields.type,
                api: fields.api,
                parentId: fields.parentId,
                sortId: fields.sortId,
                comments: fields.comments
            }

            const newMessage = new MessageModel(groupObj);
            try {
                await newMessage.save();
                res.send({
                    state: 'success',
                    id: newMessage._id
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

    async updateMessage(req, res, next) {
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
                label: fields.label,
                type: fields.type,
                api: fields.api,
                parentId: fields.parentId,
                sortId: fields.sortId,
                comments: fields.comments
            }
            const item_id = fields._id;
            console.log('---fields----', fields);
            try {
                await MessageModel.findOneAndUpdate({ _id: item_id }, { $set: userObj });
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

    async delMessage(req, res, next) {
        try {
            await MessageModel.remove({ _id: req.query.ids });
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

module.exports = new Message();