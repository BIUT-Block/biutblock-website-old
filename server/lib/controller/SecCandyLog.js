const BaseComponent = require('../prototype/baseComponent');
const SecCandyLogModel = require("../models").SecCandyLog;
const formidable = require('formidable');
const { service, settings, validatorUtil, logUtil, siteFunc } = require('../../../utils');
const shortid = require('shortid');
const validator = require('validator')


function checkFormData(req, res, fields) {
    let errMsg = '';

    if (!fields.wallet || fields.wallet.length < 30) {
        errMsg = '请填写正确的钱包地址!';
    }
    //TODO 暂时放开
    if (!errMsg) {
        throw new siteFunc.UserException(errMsg);
    }
}

class SecCandyLog {
    constructor() {
        // super()
    }

    async addSecCandyLog(req, res, next) {
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
                wallet: fields.wallet,
                randomCode: fields.randomCode,
                logs: fields.logs
            }

            const newSecCandyLog = new SecCandyLogModel(tagObj);
            try {
                // await newSecCandyLog.save();
                res.send({
                    state: 'success'
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

}

module.exports = new SecCandyLog();