const BaseComponent = require('../prototype/baseComponent');
const MessageModel = require("../models").Message;
const formidable = require('formidable');
const _ = require('lodash');
const {
    service,
    settings,
    validatorUtil,
    logUtil
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
            logUtil.error(err, req);
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
                let errMsg = '';
                if (_.isEmpty(req.session.user) && _.isEmpty(req.session.adminUserInfo)) {
                    errMsg = '非法操作，请稍后重试！'
                }
                if (fields.content && (fields.content.length < 5 || fields.content.length > 200)) {
                    errMsg = '留言内容为5-200字'
                }
                if (!fields.content) {
                    errMsg = '留言内容不能为空'
                }
                if (errMsg) {
                    res.send({
                        state: 'error',
                        type: 'ERROR_PARAMS',
                        message: errMsg
                    })
                    return
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
                replyAuthor: fields.replyAuthor,
                relationMsgId: fields.relationMsgId,
                utype: fields.utype || '0'
            }

            if (fields.utype === '1') { // 管理员
                messageObj.adminAuthor = req.session.adminUserInfo._id;
            } else {
                messageObj.author = req.session.user._id;
            }

            const newMessage = new MessageModel(messageObj);
            try {
                await newMessage.save();
                res.send({
                    state: 'success',
                    id: newMessage._id
                });
            } catch (err) {
                logUtil.error(err, req);
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
            logUtil.error(err, req);
            res.send({
                state: 'error',
                type: 'ERROR_IN_SAVE_DATA',
                message: '删除数据失败:',
            })
        }
    }

}

module.exports = new Message();