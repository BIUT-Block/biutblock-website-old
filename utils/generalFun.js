/**
 ** 定义获取前端数据入口
* 
 */
// [documentList] 约定获取文档列表
const {
    AdminUser,
    AdminGroup,
    AdminResource,
    ContentCategory,
    Content,
    ContentTag,
    User,
    Message,
    SystemConfig,
    DataOptionLog,
    SystemOptionLog,
    UserNotify,
    Notify,
    Ads
} = require('../server/lib/controller');
const settings = require("./settings");


let generalFun = {

    // 获取页面基础信息
    async getSiteInfo(req, res, next) {
        return await SystemConfig.getSystemConfigs(req, res, next);
    },

    // 获取分类信息
    async getCategoryList(req, res, next) {
        return await ContentCategory.getContentCategories(req, res, next);
    },

    // 获取文档获取当前父子类别信息
    async getCategoryByContentId(req, res, next) {
        return await ContentCategory.getCurrentCategoriesById(req, res, next);
    },

    // 获取文档列表
    async getDocumentList(req, res, next) {
        return await Content.getContents(req, res, next);
    },

    // 获取随机文档列表
    async getRandomDocumentList(req, res, next) {
        return await Content.getRadomContents(req, res, next);
    },

    // 获取单个文档
    async getOneDocument(req, res, next) {
        return await Content.getOneContent(req, res, next);
    },

    // 获取留言列表
    async getMessageList(req, res, next) {
        return await Message.getMessages(req, res, next);
    },

    // 获取标签数据
    async getTagList(req, res, next) {
        return await ContentTag.getContentTags(req, res, next);
    },

    async getPageData(req, res, next) {
        let _this = this; pageData = {}, modules = req.query.modules;
        for (let md of modules) {
            req.query = Object.assign({}, req.query, md.params);
            if (md.action.indexOf('get_document') > -1) {
                let queryParams = {}, documentKey = 'documentList';
                if (md.action == 'get_document_hot_list') {
                    queryParams = { sortby: 'clickNum', model: 'simple' };
                    documentKey = 'hotItemListData';
                } else if (md.action == 'get_document_new_list') {
                    queryParams = { model: 'simple' };
                    documentKey = 'newItemListData';
                }
                Object.assign(req.query, queryParams);
                pageData[documentKey] = await generalFun.getDocumentList(req, res, next);
            } else if (md.action == 'get_category_list') {
                pageData.cateTypes = await generalFun.getCategoryList(req, res, next);
            } else if (md.action == 'get_category_list_byContentId') {
                pageData.currentCateList = await generalFun.getCategoryByContentId(req, res, next);
            } else if (md.action == 'get_site_info') {
                pageData.siteInfo = await generalFun.getSiteInfo(req, res, next);
            } else if (md.action == 'get_tag_list') {
                pageData.tagList = await generalFun.getTagList(req, res, next);
            } else if (md.action == 'get_content_detail') {
                pageData.documentInfo = await generalFun.getOneDocument(req, res, next);
            } else if (md.action == 'get_random_content') {
                pageData.reCommendListData = await generalFun.getRandomDocumentList(req, res, next);
            } else if (md.action == 'get_content_messages') {
                pageData.messageList = await generalFun.getMessageList(req, res, next);
            }
        }
        // 登录态
        pageData.userInfo = req.session.user;
        pageData.logined = req.session.logined;
        // 静态目录
        pageData.staticforder = 'dorawhite';
        // 当前类别
        pageData.cateInfo = '';
        pageData.pageType = 'index';

        pageData.layout = settings.SYSTEMTEMPFORDER + 'public/defaultTemp.html';
        console.log('---pageData.layout----', pageData.currentCateList);
        // console.log('---pageData.categoryList----', pageData.categoryList);
        res.render(settings.SYSTEMTEMPFORDER + req.query.tempPage, pageData);
    },

    async getDataForIndexPage(req, res, next) {
        req.query.tempPage = 'index.html';
        req.query.modules = [
            { action: 'get_document_list' },
            { action: 'get_document_hot_list' },
            { action: 'get_category_list' },
            { action: 'get_site_info', params: { modal: 'simple' } }
        ];
        await generalFun.getPageData(req, res, next);
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
        await generalFun.getPageData(req, res, next);
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
        await generalFun.getPageData(req, res, next);
    }

}



module.exports = generalFun;