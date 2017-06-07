const BaseComponent = require('../prototype/baseComponent');
const ContentModel = require("../models").Content;
const formidable = require('formidable');
const { service, settings, validatorUtil } = require('../../../utils');

class Content {
    constructor() {
        // super()
    }
    async getContents(req, res, next) {
        try {
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            let sortby = req.query.sortby; //排序规则
            let typeId = req.query.typeId; // 分类ID
            let model = req.query.model; // 查询模式 full/simple
            // 条件配置
            let queryObj = {}, sortObj = { date: -1 }, files = null;
            if (sortby) {
                sortObj[sortby] = -1
            }
            if (typeId && typeId != 'indexPage') {
                queryObj.categories = typeId
            }
            if (model === 'simple') {
                files = {
                    id: 1,
                    stitle: 1
                }
            }

            const contents = await ContentModel.find(queryObj, files).sort({ date: -1 }).skip(10 * (Number(current) - 1)).limit(Number(pageSize)).populate([{
                path: 'author',
                select: 'name -_id'
            },
            {
                path: 'categories',
                select: 'name _id'
            }]).exec();
            const totalItems = await ContentModel.count(queryObj);
            res.send({
                state: 'success',
                docs: contents,
                pageInfo: {
                    totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10
                }
            })
        } catch (err) {
            console.log('获取Contents失败');
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取Contents失败'
            })
        }
    }

    async getOneContent(req, res, next) {
        try {
            let targetId = req.query.id;
            const content = await ContentModel.findOne({ _id: targetId });
            res.send({
                state: 'success',
                doc: content
            })
        } catch (err) {
            console.log('获取Content失败');
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取Content失败'
            })
        }
    }

    async addContent(req, res, next) {
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
                title: fields.title,
                stitle: fields.stitle,
                type: fields.type,
                categories: fields.categories,
                sortPath: fields.sortPath,
                tags: fields.tags,
                keywords: fields.keywords,
                sImg: fields.sImg,
                author: fields.author,
                state: fields.state,
                isTop: fields.isTop,
                from: fields.from,
                discription: fields.discription,
                comments: fields.comments
            }

            const newContent = new ContentModel(groupObj);
            try {
                await newContent.save();
                res.send({
                    state: 'success',
                    id: newContent._id
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

    async updateContent(req, res, next) {
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

            const contentObj = {
                title: fields.title,
                stitle: fields.stitle,
                type: fields.type,
                categories: fields.categories,
                sortPath: fields.sortPath,
                tags: fields.tags,
                keywords: fields.keywords,
                sImg: fields.sImg,
                // author: fields.author,
                state: fields.state,
                isTop: fields.isTop,
                from: fields.from,
                discription: fields.discription,
                comments: fields.comments
            }
            const item_id = fields._id;
            console.log('---fields----', fields);
            try {
                await ContentModel.findOneAndUpdate({ _id: item_id }, { $set: contentObj });
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

    async delContent(req, res, next) {
        try {
            await ContentModel.remove({ _id: req.query.ids });
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

module.exports = new Content();