import * as types from './types.js'
import getters from './getters';
import _ from 'lodash';
const state = {
    HeaderNav: {
        show: false,
        navs: [{
            text: '首页',
            route: {
                name: 'home'
            }
        }, {
            text: '文章',
            route: {
                name: 'article'
            }
        }, {
            text: '标签',
            route: {
                name: 'tag'
            }
        }]
    },
    headerState: {
        show: 'myheader'
    },
    adminLoginForm: {
        formData: {
            userName: '',
            password: ''
        }
    },
    content: {
        contentList: {
            pageInfo: {},
            docs: []
        },
        contentDetails: {}
    }
}

const mutations = {
    [types.SET_HEADER_NAV](state, active) {
        state.HeaderNav.show = active
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
        state.content.contentList = contentList
    },
    [types.CONTENT_DETAILS](state, contentDetails) {
        state.content.contentDetails = contentDetails
    }
}

export default {
    state,
    mutations,
    getters
}