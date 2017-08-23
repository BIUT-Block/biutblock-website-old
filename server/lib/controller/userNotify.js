const BaseComponent = require('../prototype/baseComponent');
const UserNotifyModel = require("../models").UserNotify;
const formidable = require('formidable');
const { service, settings, validatorUtil, logUtil, siteFunc } = require('../../../utils');
const shortid = require('shortid');
const validator = require('validator')

class UserNotify {
    constructor() {
        // super()
    }
    async getUserNotifys(req, res, next) {
        try {
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            let user = req.query.user;
            const userNotifys = await UserNotifyModel.find({ user }).sort({ date: -1 }).skip(10 * (Number(current) - 1)).limit(Number(pageSize)).populate([{
                path: 'notify',
                select: 'title content _id'
            }]).exec();;
            const totalItems = await UserNotifyModel.count({ user });
            res.send({
                state: 'success',
                docs: userNotifys,
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
                message: '获取UserNotify失败'
            })
        }
    }

    async getOneUserNotifyByParams(req, res, params) {
        let userNotify_id = req.query._id;
        return await UserNotify.findOne(params);
    }

    async delUserNotify(req, res, next) {
        try {
            let errMsg = '';
            if (!siteFunc.checkCurrentId(req.query.ids)) {
                errMsg = '非法请求，请稍后重试！';
            }
            if (errMsg) {
                res.send({
                    state: 'error',
                    message: errMsg,
                })
            }
            await UserNotifyModel.remove({ _id: req.query.ids });
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

    async addNotifyByUsers(res, users, notify) {
        if (users.length > 0) {
            for (let i = 0; i < users.length; i++) {
                let userNotify = new MessageModel();
                userNotify.systemUser = users[i]._id;
                userNotify.notify = notify;
                await userNotify.save();
            }
        }
    }

    async setMessageHasRead(req, res, next) {
        console.log('--query----', req.query);
        let query = { _id: req.query.ids };
        // 用户只能操作自己的消息
        query.user = req.session.user._id;
        try {
            await UserNotifyModel.update(query, { $set: { 'isRead': true } }, { multi: true });
            res.send({
                state: 'success',
                message: '设置已读成功',
            })
        } catch (error) {
            res.send({
                state: 'error',
                message: '设置已读失败' + error,
            })
        }

    }

    // 根据用户信息获取未读消息
    async getNoReadNotifyCountByUserId(userId, type) {
        let msgQuery = {};
        if (type == 'user') {
            msgQuery = { 'user': userId, 'isRead': false };
        } else if (type == 'adminUser') {
            msgQuery = { 'systemUser': userId, 'isRead': false };
        }
        let noticeCounts = await UserNotifyModel.count(msgQuery);
        // res.send({
        //     state: 'success',
        //     counts: noticeCounts
        // })
    }



}

module.exports = new UserNotify();