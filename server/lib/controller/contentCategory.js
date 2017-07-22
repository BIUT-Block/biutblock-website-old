const BaseComponent = require('../prototype/baseComponent');
const ContentCategoryModel = require("../models").ContentCategory;
const formidable = require('formidable');
const { service, settings, validatorUtil, logUtil } = require('../../../utils');

class ContentCategory {
    constructor() {
        // super()
    }
    async getContentCategories(req, res, next) {
        try {
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            let model = req.query.model; // 查询模式 full/simple
            let parentId = req.query.parentId; // 分类ID

            let queryObj = {};
            if (parentId) {
                queryObj['parentId'] = parentId;
            }
            if (model === 'full') {
                pageSize = '1000'
            }

            const ContentCategories = await ContentCategoryModel.find(queryObj);
            const totalItems = await ContentCategoryModel.count(queryObj);
            res.send({
                state: 'success',
                docs: ContentCategories,
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
                message: '获取ContentCategories失败'
            })
        }
    }

    async getAllCategories(req, res, next) {
        let files = req.query.catefiles || null;
        return await ContentCategoryModel.find({}, files);
    }

    async addContentCategory(req, res, next) {
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
                name: fields.name,
                keywords: fields.keywords,
                sortId: fields.sortId,
                parentId: fields.parentId,
                enable: fields.enable,
                defaultUrl: fields.defaultUrl,
                sortPath: fields.sortPath,
                comments: fields.comments
            }

            const newContentCategory = new ContentCategoryModel(groupObj);
            try {
                await newContentCategory.save();
                res.send({
                    state: 'success',
                    id: newContentCategory._id
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

    async updateContentCategory(req, res, next) {
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

            const cateObj = {
                name: fields.name,
                keywords: fields.keywords,
                sortId: fields.sortId,
                parentId: fields.parentId,
                enable: fields.enable,
                defaultUrl: fields.defaultUrl,
                sortPath: fields.sortPath,
                comments: fields.comments
            }
            const item_id = fields._id;
            console.log('---fields----', fields);
            try {
                await ContentCategoryModel.findOneAndUpdate({ _id: item_id }, { $set: cateObj });
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

    async delContentCategory(req, res, next) {
        try {
            await ContentCategoryModel.remove({ _id: req.query.ids });
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

module.exports = new ContentCategory();