import * as types from './types.js';
import services from './services.js';
import _ from 'lodash';


export default {
    loginState({
        commit
    }) {
        return services.getUserSession().then((result) => {
            commit(types.SET_USER_LOGINSTATE, result.data || {})
        })
    },
    simplePage({
        commit
    }) {
        commit(types.SET_PAGE_STATE, true)
    },
    normalPage({
        commit
    }) {
        commit(types.SET_PAGE_STATE, false)
    },
    headerNav({
        commit
    }, params = {}) {
        return services.contentCategoryList(params).then((result) => {
            commit(types.GET_HEADER_NAV, result.data);
        })
    },
    contentTag({
        commit
    }, params = {}) {
        return services.contentTagList(params).then((result) => {
            commit(types.CONTENT_TAGS, result.data)
        })
    },
    adminLoginForm({
        commit
    }, params = {
            formData: {}
        }) {
        commit(types.ADMINLOGIN_FORM_STATE, {
            formData: params.formData
        })
    },
    indexContentList({
        commit,
        state,
        rootState: { route: { path, params: { id } } } 
    }, params = {}) {
        return services.contentList(params).then((result) => {
            commit(types.INDEX_CONTENT_LIST, result.data);
        })
    },
    getContentDetails({ commit, state, rootState: { route: { path, params: { id } } } }, params = {}) {
        if (id) {
            let currentId = id.substr(0, id.length - 5);
            params.id = currentId;
        }
        return services.getOneContent(params).then((result) => {
            commit(types.CONTENT_DETAILS, result.data);
            commit(types.USER_MESSAGE_FORM, {
                formData: {
                    contentId: result.data ? result.data.doc._id : ''
                }
            })
        })
    },
    getHotContentList({
        commit
    }, params = {}) {
        return services.getSimpleList(params).then((result) => {
            commit(types.CONTENT_HOTITEMS, result.data)
        })
    },
    getRencentlyContentList({
        commit
    }, params = {}) {
        return services.getSimpleList(params).then((result) => {
            commit(types.CONTENT_RECENTLYITEMS, result.data)
        })
    },
    getContentInfos({
        commit
    }, params = {}) {
        commit(types.CONTENT_INFOS, {
            contentInfos: params.contentInfos
        })
    },
    getUserMessageList({
        commit
    }, params = {}) {
        return services.userMessageList(params).then((result) => {
            commit(types.USER_MESSAGE_LIST, result.data)
        })
    },
    userMessageForm({
        commit
    }, params = {
            reply: false,
            formData: {}
        }) {
        commit(types.USER_MESSAGE_FORM, {
            reply: params.reply,
            formData: params.formData
        })
    },
    userLoginForm({
        commit
    }, params = {
            formData: {}
        }) {
        commit(types.USER_LOGIN_FORM, {
            formData: params.formData
        })
    },
    siteMapList({
        commit
    }) {
        return services.siteMapList().then((result) => {
            commit(types.SITEMAP_LIST, result.data)
        })
    },
    getSystemConfig({
        commit
    }, params = {}) {
        services.getSystemConfigs(params).then((config) => {
            let currentConfig = config.data ? config.data.docs[0] : {};
            commit(types.SYSTEMCONFIG_CONFIGLIST, currentConfig)
        })
    }

}