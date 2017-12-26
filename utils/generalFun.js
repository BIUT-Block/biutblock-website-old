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

    // 获取文档列表
    async getDocumentList(req, res, next) {
        return await Content.getContents(req, res, next);
    },

    // 获取标签数据
    async getTagList(req, res, next) {
        return await ContentTag.getContentTags(req, res, next);
    },

    async getPageData(req, res, next) {
        let _this = this; pageData = {}, modules = req.query.modules;
        for (let md of modules) {
            if (md.action == 'get_document_list') {
                pageData.documentList = await generalFun.getDocumentList(req, res, next);
            } else if (md.action == 'get_category_list') {
                pageData.cateTypes = await generalFun.getCategoryList(req, res, next);
            } else if (md.action == 'get_site_info') {
                req.query.model = md.params.model;
                pageData.siteInfo = await generalFun.getSiteInfo(req, res, next);
            } else if (md.action == 'get_tag_list') {
                pageData.tagList = await generalFun.getTagList(req, res, next);
            }
        }
        // 登录态
        pageData.userInfo = req.session.user;
        pageData.logined = req.session.logined;
        // 静态目录
        pageData.staticforder = 'dorawhite';
        // 当前类别
        pageData.cateInfo = '';

        pageData.layout = settings.SYSTEMTEMPFORDER + 'public/defaultTemp.html';
        console.log('---pageData.layout----', pageData.layout);
        // console.log('---pageData.categoryList----', pageData.categoryList);
        res.render(settings.SYSTEMTEMPFORDER + 'index.html', pageData);
    },

    async getDataForIndexPage(req, res, next) {
        req.query.modules = [
            { action: 'get_document_list' },
            { action: 'get_category_list' },
            { action: 'get_site_info', params: { modal: 'simple' } }
        ];
        await generalFun.getPageData(req, res, next);
        // siteConfig: this.siteInfos("首页"),
        //     documentList: documentList.docs,
        //     hotItemListData: this.getHotItemListData({'state':true}),
        //     friendLinkData: this.getFriendLink(),
        //     cateTypes: this.getCategoryList(),
        //     cateInfo: '',
        //     tagsData: tagsData,
        //     pageInfo: documentList.pageInfo,
        //     pageType: 'index',
        //     logined: isLogined(req),
        //     staticforder : staticforder,
        //     layout: defaultTempPath
    }

}



module.exports = generalFun;