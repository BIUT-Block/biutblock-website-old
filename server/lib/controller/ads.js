const BaseComponent = require('../prototype/baseComponent');
const AdsModel = require("../models").Ads;
const formidable = require('formidable');
const { service, settings, validatorUtil, logUtil, siteFunc } = require('../../../utils');
const shortid = require('shortid');
const validator = require('validator')

function checkFormData(req, res, fields) {
    let errMsg = '';
    if (fields._id && !siteFunc.checkCurrentId(fields._id)) {
        errMsg = '非法请求，请稍后重试！';
    }
    if (!validator.isLength(fields.name, 1, 12)) {
        errMsg = '1-12个非特殊字符!';
    }
    if (!validator.isLength(fields.comments, 2, 30)) {
        errMsg = '2-30个非特殊字符!';
    }
    if (errMsg) {
        res.send({
            state: 'error',
            type: 'ERROR_PARAMS',
            message: errMsg
        })
    }
}

class Ads {
    constructor() {
        // super()
    }
    async getAds(req, res, next) {
        try {
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            let model = req.query.model; // 查询模式 full/simple
            let queryObj = {};
            if (model === 'full') {
                pageSize = '1000'
            }

            const Ads = await AdsModel.find(queryObj).sort({ date: -1 }).skip(10 * (Number(current) - 1)).limit(Number(pageSize)).populate([{
                path: 'items'
            }]).exec();
            const totalItems = await AdsModel.count();
            res.send({
                state: 'success',
                docs: Ads,
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
                message: '获取Ads失败' + err
            })
        }
    }

    async getOneAd(req, res, next) {
        try {
            let targetId = req.query.id;
            const ad = await AdsModel.findOne({ _id: targetId }).populate([{
                path: 'items'
            }]).exec();
            res.send({
                state: 'success',
                doc: ad || {}
            })
        } catch (error) {
            logUtil.error(err, req);
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取Ad失败' + err
            })
        }
    }

    async addAds(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
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

            const tagObj = {
                name: fields.name,
                alias: fields.alias,
                comments: fields.comments
            }

            const newAds = new AdsModel(tagObj);
            try {
                await newAds.save();
                res.send({
                    state: 'success',
                    id: newAds._id
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

    async updateAds(req, res, next) {
        console.log('--req.params--', req.params);
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
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
                name: fields.name,
                alias: fields.alias,
                comments: fields.comments
            }
            const item_id = fields._id;
            try {
                await AdsModel.findOneAndUpdate({ _id: item_id }, { $set: userObj });
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

    async delAds(req, res, next) {
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
            await AdsModel.remove({ _id: req.query.ids });
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

module.exports = new Ads();