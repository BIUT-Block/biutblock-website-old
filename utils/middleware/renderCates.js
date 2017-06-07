/**
 * 初始化分类信息
 * 维护json目录为动态路由做准备
 */
const fs = require('fs');
const { ContentCategory } = require('../../server/lib/controller');

const {
    service
} = require('../../utils');
let writeState = false;
module.exports = function (req, res, next) {
    if (writeState) {
        next();
    } else {
        ContentCategory.getAllCategories(req, res).then((result) => {
            let jsonFile = process.cwd() + '/client/index/assets/cates.json';
            service.writeFile(req, res, jsonFile, JSON.stringify(result), () => {
                writeState = true;
                next();
            })
        })
    }
}