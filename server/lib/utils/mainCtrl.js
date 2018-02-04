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
    Ads,
    SecCandyLog
} = require('../controller');
const settings = require("../../../utils/settings");


let mainCtrl = {

    // 获取页面基础信息
    async getSiteInfo(req, res, next) {
        let configs = await SystemConfig.getSystemConfigs(req, res, next);
        const { siteName, siteDiscription, siteKeywords } = configs[0] || [];

        let { title, des, keywords } = req.query;
        let pageTitle = title ? (title + ' | ' + siteName) : siteName;
        let discription = des ? des : siteDiscription;
        let key = keywords ? keywords : siteKeywords;
        // console.log('---pageTitle---', pageTitle, discription, key);
        return {
            title: pageTitle,
            discription,
            key,
            configs: configs[0] || [],
            version: 2.1
        }
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

    // 获取站点地图列表
    async getSiteMapList(req, res, next) {
        return await Content.getAllContens(req, res, next);
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

    // 获取用户消息
    async getUserNoticeList(req, res, next) {
        return await UserNotify.getUserNotifys(req, res, next);
    },

    // 获取标签数据
    async getTagList(req, res, next) {
        return await ContentTag.getContentTags(req, res, next);
    },

    // 统计用户糖果
    async getSecCandyByCode(req, res, next) {
        return await SecCandyLog.getSecCandyInfoByCode(req, res, next);
    },

    async getPageData(req, res, next) {
        let _this = this; pageData = { pageType: 'index' }, modules = req.query.modules;
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
                } else if (md.action == 'get_document_rec_list') {
                    queryParams = { model: 'simple', isTop: 1 };
                    documentKey = 'reCommendListData';
                }
                Object.assign(req.query, queryParams);
                pageData[documentKey] = await mainCtrl.getDocumentList(req, res, next);
            } else if (md.action == 'get_category_list') {
                pageData.cateTypes = await mainCtrl.getCategoryList(req, res, next);
            } else if (md.action == 'get_category_list_byContentId') {
                pageData.currentCateList = await mainCtrl.getCategoryByContentId(req, res, next);
            } else if (md.action == 'get_tag_list') {
                pageData.tagList = await mainCtrl.getTagList(req, res, next);
            } else if (md.action == 'get_content_detail') {
                pageData.documentInfo = await mainCtrl.getOneDocument(req, res, next);
                const { title, discription, tags } = pageData.documentInfo;
                let tagArr = ['doracms'];
                if (tags) {
                    tagArr = tags.map((item, index) => {
                        return item ? item.name : 'doracms'
                    })
                }
                req.query.title = title;
                req.query.des = discription;
                req.query.keywords = tagArr.join();
            } else if (md.action == 'get_random_content') {
                pageData.randomListData = await mainCtrl.getRandomDocumentList(req, res, next);
            } else if (md.action == 'get_content_messages') {
                pageData.messageList = await mainCtrl.getMessageList(req, res, next);
            } else if (md.action == 'get_user_replies_list') {
                pageData.pageType = 'replies';
                pageData.messageList = await mainCtrl.getMessageList(req, res, next);
            } else if (md.action == 'get_user_notice_list') {
                pageData.pageType = 'notifies';
                pageData.messageList = await mainCtrl.getUserNoticeList(req, res, next);
            } else if (md.action == 'get_sitemap_list') {
                pageData.messageList = await mainCtrl.getSiteMapList(req, res, next);
            } else if (md.action == 'get_error_info_404' || md.action == 'get_error_info_500') {
                pageData.pageType = 'error';
                pageData.errInfo = req.query.message;
            } else if (md.action == 'get_site_info') {
                pageData.siteInfo = await mainCtrl.getSiteInfo(req, res, next);
            } else if (md.action == 'get_referral_Info') {
                pageData.pageType = 'referral';
                // 记录是否已经登记过
                pageData.addWalletSuccess = req.session.addWalletSuccess;
                pageData.shareId = req.session.shareId;
                req.session.shareId && (pageData.rcvInfo = await mainCtrl.getSecCandyByCode(req, res, next));
            } else if (md.action == 'get_adminlogin_Info') {
                pageData.pageType = 'adminlogin';
            }
        }

        // 登录态
        pageData.userInfo = req.session.user;
        pageData.logined = req.session.logined;
        // 静态目录
        pageData.staticforder = 'dorawhite';
        // 当前类别
        pageData.cateInfo = '';

        // pageData.layout = settings.SYSTEMTEMPFORDER + 'public/defaultTemp.html';
        // console.log('---pageData.userInfo----', pageData.userInfo, '-----', pageData.logined);
        res.render(settings.SYSTEMTEMPFORDER + req.query.tempPage, pageData);
    }

}



module.exports = mainCtrl;