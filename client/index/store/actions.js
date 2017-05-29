import * as types from './types.js';
import services from './services.js';
import _ from 'lodash';


export default {
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
    }) {
        return services.contentCategoryList().then((result) => {
            commit(types.SET_HEADER_NAV, result.data)
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
    }

}