import * as types from './types.js'
import getters from './getters';
import _ from 'lodash';
const state = {
    userLoginState: {
        userInfo: {},
        logined: false
    },
    headerNav: [],
    headerState: {
        show: 'myheader'
    },
    adminLoginForm: {
        formData: {
            userName: '',
            password: ''
        }
    },
    contentList: {
        pageInfo: {},
        docs: []
    },
    contentDetails: {
        doc: []
    },
    contentTag: [],
    hotContentList: {
        pageInfo: {},
        docs: []
    },
    userMessageList: {
        pageInfo: {},
        docs: []
    },
    userMessageForm: {
        reply: false,
        formData: {
            contentId: '',
            content: '',
            replyId: '',
            relationMsgId: ''
        }
    },
    userLoginForm: {
        formData: {
            email: '',
            password: ''
        }
    },
    siteMapList: []
}

const mutations = {
    [types.SET_USER_LOGINSTATE](state, loginInfo) {
        state.userLoginState = Object.assign({
            userInfo: {},
            logined: false
        }, loginInfo);
    },
    [types.GET_HEADER_NAV](state, navs) {
        state.headerNav = navs.docs;
    },
    [types.CONTENT_TAGS](state, tags) {
        state.contentTag = tags.docs;
    },
    [types.SET_HEADER_STATE](state, active) {
        state.headerState.show = active
    },
    [types.ADMINLOGIN_FORM_STATE](state, formState) {
        state.adminLoginForm.formData = Object.assign({
            userName: '',
            password: ''
        }, formState.formData);
    },
    [types.INDEX_CONTENT_LIST](state, contentList) {
        state.contentList = contentList
    },
    [types.CONTENT_DETAILS](state, contentDetails) {
        state.contentDetails.doc = contentDetails.doc;
    },
    [types.CONTENT_HOTITEMS](state, contentList) {
        state.hotContentList = contentList
    },
    [types.USER_MESSAGE_LIST](state, messageList) {
        state.userMessageList = messageList
    },
    [types.USER_MESSAGE_FORM](state, formState) {
        state.userMessageForm.reply = formState.reply;
        state.userMessageForm.formData = Object.assign({
            contentId: '',
            content: '',
            replyId: '',
            relationMsgId: ''
        }, formState.formData);
    },
    [types.USER_LOGIN_FORM](state, formState) {
        state.userMessageForm.formData = Object.assign({
            email: '',
            password: ''
        }, formState.formData);
    },
    [types.SITEMAP_LIST](state, siteMapList) {
        state.siteMapList = siteMapList
    }
}

export default {
    state,
    mutations,
    getters
}