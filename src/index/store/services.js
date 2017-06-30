import Axios from "axios"
import api from '~api'
if (typeof window == "undefined") {
    Axios.defaults.baseURL = 'http://127.0.0.1:8080'
}

export function reqJsonData(url, params = {}, method = 'post') {

    if (method === 'get') {
        return api.get('/' + url, params)
    } else if (method === 'post') {
        return api.post('/' + url, params)
    }

}
export default {

    getUserSession() {
        return reqJsonData('users/session', {}, 'get')
    },

    userLogOut() {
        return reqJsonData('users/logOut', {}, 'get')
    },

    contentList(params) {
        // console.log('---begin to get contents----', params);
        return reqJsonData('content/getList', params, 'get')
    },

    getSimpleList(params) {
        return reqJsonData('content/getSimpleListByParams', params, 'get')
    },

    getOneContent(params) {
        return reqJsonData('content/getContent', params, 'get')
    },

    userDoLogin(params) {
        return reqJsonData('users/doLogin', params)
    },

    adminDoLogin(params) {
        return reqJsonData('admin/doLogin', params)
    },

    contentCategoryList(params) {
        return reqJsonData('contentCategory/getList', params, 'get')
    },

    contentTagList(params) {
        return reqJsonData('contentTag/getList', params, 'get')
    },

    userMessageList(params) {
        return reqJsonData('message/getList', params, 'get')
    },

    userSendMessage(params) {
        return reqJsonData('message/post', params)
    },

    siteMapList() {
        return reqJsonData('sitemap/getList', {}, 'get')
    },

    getSystemConfigs(params) {
        return reqJsonData('systemConfig/getConfig', params, 'get')
    }

}
