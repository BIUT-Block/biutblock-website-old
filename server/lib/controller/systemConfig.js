const BaseComponent = require('../prototype/baseComponent');
const SystemConfigModel = require("../models").SystemConfig;
const formidable = require('formidable');
const { service, settings, validatorUtil, logUtil } = require('../../../utils');

class SystemConfig {
    constructor() {
        // super()
    }
    async getSystemConfigs(req, res, next) {
        try {
            let model = req.query.model, files = null; // 查询模式 full/simple
            if (model === 'simple') {
                files = {
                    siteName: 1,
                    siteDomain: 1,
                    siteDiscription: 1,
                    siteKeywords: 1,
                    siteEmail: 1,
                    registrationNo: 1
                }
            }
            const systemConfigs = await SystemConfigModel.find({}, files);
            res.send({
                state: 'success',
                docs: systemConfigs
            })
        } catch (err) {
            logUtil.error(err, req);
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取SystemConfigs失败'
            })
        }
    }

    async updateSystemConfig(req, res, next) {
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

            const systemObj = {
                siteName: fields.siteName,
                siteDomain: fields.siteDomain,
                siteDiscription: fields.siteDiscription,
                siteKeywords: fields.siteKeywords,
                siteEmail: fields.siteEmail,
                registrationNo: fields.registrationNo,
                databackForderPath: fields.databackForderPath,
                mongodbInstallPath: fields.mongodbInstallPath
            }
            const item_id = fields._id;
            console.log('---fields----', fields);
            try {
                if (item_id) {
                    await SystemConfigModel.findOneAndUpdate({ _id: item_id }, { $set: systemObj });
                } else {
                    const newAdminUser = new SystemConfigModel(systemObj);
                    await newAdminUser.save();
                }
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

}

module.exports = new SystemConfig();