import * as types from './types.js';
// import axios from 'axios';
import reqwest from 'reqwest';
import services from './services.js';
import _ from 'lodash';


export default {
    showHeaderNav({ commit }) {
        commit(types.SET_HEADER_NAV, true)
    },
    hideHeaderNav({ commit }) {
        commit(types.SET_HEADER_NAV, false)
    },
    showHeader({ commit }) {
        commit(types.SET_HEADER_STATE, 'myheader')
    },
    hideHeader({ commit }) {
        commit(types.SET_HEADER_STATE, 'slotTemp')
    }

}