/**
 ** 定义获取前端数据入口
* 
 */
// [documentList] 约定获取文档列表
const mainCtrl = require('../server/lib/utils/mainCtrl');
const settings = require("./settings");


let generalFun = {

    async getDataForIndexPage(req, res, next) {
        req.query.tempPage = 'index.html';
        req.query.modules = [
            { action: 'get_document_list' },
            { action: 'get_document_rec_list' },
            { action: 'get_document_hot_list' },
            { action: 'get_category_list' },
            { action: 'get_site_info', params: { modal: 'simple', title: '首页' } }
        ];
        await mainCtrl.getPageData(req, res, next);
    },

    async getDataForCatePage(req, res, next) {
        req.query.tempPage = '2-stage-default/contentList.html';
        req.query.modules = [
            { action: 'get_category_list_byContentId' },
            { action: 'get_document_list' },
            { action: 'get_document_hot_list' },
            { action: 'get_category_list' },
            { action: 'get_site_info', params: { modal: 'simple' } }
        ];
        await mainCtrl.getPageData(req, res, next);
    },

    async getDataForContentDetails(req, res, next) {
        req.query.tempPage = '2-stage-default/detail.html';
        req.query.modules = [
            { action: 'get_category_list' },
            { action: 'get_category_list_byContentId', params: { contentId: req.params.id } },
            { action: 'get_content_detail' },
            { action: 'get_random_content' },
            { action: 'get_document_new_list' },
            { action: 'get_content_messages' },
            { action: 'get_site_info', params: { modal: 'simple' } }
        ];
        await mainCtrl.getPageData(req, res, next);
    },

    async getDataForSiteMap(req, res, next) {
        req.query.tempPage = 'sitemap.html';
        req.query.modules = [
            { action: 'get_sitemap_list', params: { contentfiles: 'title' } },
            { action: 'get_category_list' },
            { action: 'get_site_info', params: { modal: 'simple', title: '站点地图' } }
        ];
        await mainCtrl.getPageData(req, res, next);
    },

    async getDataForErr(errNo) {
        req.query.tempPage = 'public/do' + errNo + '.html';
        req.query.modules = [
            { action: 'get_error_info_' + errNo }
        ];
        await mainCtrl.getPageData(req, res, next);
    },

    async getDataForUserCenter() {
        req.query.tempPage = 'users/userCenter.html';
        await mainCtrl.getPageData(req, res, next);
    },

    async getDataForUserReply() {
        req.query.tempPage = 'users/userReplies.html';
        req.query.modules = [
            { action: 'get_user_replies_list', params: { user: req.session.user._id } }
        ];
        await mainCtrl.getPageData(req, res, next);
    },

    async getDataForUserNotice() {
        req.query.tempPage = 'users/userNotice.html';
        req.query.modules = [
            { action: 'get_user_notice_list', params: { user: req.session.user._id } }
        ];
        await mainCtrl.getPageData(req, res, next);
    }

}



module.exports = generalFun;