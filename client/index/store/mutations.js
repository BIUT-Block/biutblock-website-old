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
    }
}

const mutations = {
    [types.SET_HEADER_NAV](state, active) {
        state.HeaderNav.show = active
    },
    [types.SET_HEADER_STATE](state, active) {
        state.headerState.show = active
    }
}

export default {
    state,
    mutations,
    getters
}