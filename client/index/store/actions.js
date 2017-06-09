import * as types from './types.js';
import services from './services.js';
import _ from 'lodash';


export default {
    loginState({
        commit
    }) {
        return services.getUserSession().then((result) => {
            console.log('----result----', result.data);
            commit(types.SET_USER_LOGINSTATE, result.data || {})
        })
    },
    showHeaderNav({
        commit
    }) {
        commit(types.SET_HEADER_NAV, true)
    },
    hideHeaderNav({
        commit
    }) {
        commit(types.SET_HEADER_NAV, false)
    },
    showHeader({
        commit
    }) {
        commit(types.SET_HEADER_STATE, 'myheader')
    },
    hideHeader({
        commit
    }) {
        commit(types.SET_HEADER_STATE, 'slotTemp')
    },
    headerNav({
        commit
    }, params = {}) {
        return services.contentCategoryList(params).then((result) => {
            commit(types.GET_HEADER_NAV, result.data)
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
        commit
    }, params = {}) {
        return services.contentList(params).then((result) => {
            commit(types.INDEX_CONTENT_LIST, result.data)
        })
    },
    getContentDetails({
        commit
    }, params = {}) {
        return services.getOneContent(params).then((result) => {
            commit(types.CONTENT_DETAILS, result.data)
        })
    },
    getHotContentList({
        commit
    }, params = {}) {
        return services.getSimpleList(params).then((result) => {
            commit(types.CONTENT_HOTITEMS, result.data)
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

}