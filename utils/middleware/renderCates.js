/**
 * 初始化分类信息
 * 维护json目录为动态路由做准备
 */
const fs = require('fs');
const {
    ContentCategory,
    AdminResource
} = require('../../server/lib/controller');

const {
    service
} = require('../../utils');
let writeState = false;
module.exports = function (req, res, next) {
    if (writeState) {
        next();
    } else {
        ContentCategory.getAllCategories(req, res).then((result) => {
            let jsonFile = process.cwd() + '/utils/routePath/indexCates.json';
            service.writeFile(req, res, jsonFile, JSON.stringify(result))
            writeState = true;
            next();
        });
    }
}