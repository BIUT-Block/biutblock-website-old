const BaseComponent = require('../prototype/baseComponent');
const NotifyModel = require("../models").Notify;
const AdminUserModel = require("../models").AdminUser;
const formidable = require('formidable');
const { service, settings, validatorUtil, logUtil } = require('../../../utils');
const shortid = require('shortid');
const validator = require('validator')

class Notify {
    constructor() {
        // super()
    }
    async getNotifys(req, res, next) {
        try {
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            const notifies = await NotifyModel.find({}).sort({ date: -1 }).skip(10 * (Number(current) - 1)).limit(Number(pageSize));
            const totalItems = await NotifyModel.count();
            res.send({
                state: 'success',
                docs: notifies,
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
                message: '获取Notify失败'
            })
        }
    }

    async getOneNotifyByParams(req, res, params) {
        let Notify_id = req.query._id;
        return await Notify.findOne(params);
    }

    async delNotify(req, res, next) {
        try {
            let errMsg = '';
            if (!validatorUtil.checkCurrentId(req.query.ids)) {
                errMsg = '非法请求，请稍后重试！';
            }
            if (errMsg) {
                res.send({
                    state: 'error',
                    message: errMsg,
                })
            }
            await NotifyModel.remove({ _id: req.query.ids });
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

    //发送系统消息给管理后台
    async sendSystemNotice(res, noticeObj) {
        let notify = new NotifyModel(noticeObj);
        await notify.save();
        let users = await AdminUserModel.find({}, '_id');
        return {
            users,
            notify
        }
    }

}

module.exports = new Notify();