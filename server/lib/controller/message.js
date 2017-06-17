const BaseComponent = require('../prototype/baseComponent');
const MessageModel = require("../models").Message;
const formidable = require('formidable');
const {
    service,
    settings,
    validatorUtil
} = require('../../../utils');

class Message {
    constructor() {
        // super()
    }
    async getMessages(req, res, next) {
        try {
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            // console.log('---req.query.contentId---', req.query.contentId);
            let contentId = req.query.contentId;
            let queryObj = {};
            if (contentId) {
                queryObj.contentId = contentId;
            }
            const messages = await MessageModel.find(queryObj).sort({
                date: -1
            }).skip(10 * (Number(current) - 1)).limit(Number(pageSize)).populate([{
                path: 'contentId',
                select: 'stitle _id'
            }, {
                path: 'author',
                select: 'userName _id enable date logo'
            }]).populate('replyAuthor').populate('adminAuthor').exec();
            const totalItems = await MessageModel.count(queryObj);
            res.send({
                state: 'success',
                docs: messages,
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

    async postMessages(req, res, next) {
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

            const messageObj = {
                contentId: fields.contentId,
                content: validatorUtil.validateWords(fields.content),
                replyId: fields.replyId,
                relationMsgId: fields.relationMsgId,
                author: req.session.user._id
            }

            const newMessage = new MessageModel(messageObj);
            try {
                await newMessage.save();
                res.send({
                    state: 'success',
                    id: newMessage._id
                });
            } catch (err) {
                console.log('保存留言数据失败', err);
                res.send({
                    state: 'error',
                    type: 'ERROR_IN_SAVE_DATA',
                    message: '保存留言数据失败:',
                })
            }
        })
    }


    async delMessage(req, res, next) {
        try {
            await MessageModel.remove({
                _id: req.query.ids
            });
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