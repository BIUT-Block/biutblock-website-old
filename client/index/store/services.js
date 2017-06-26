import Axios from "axios";

if (typeof window == "undefined") {
    Axios.defaults.baseURL = 'http://127.0.0.1:81';
}

export function reqJsonData(url, params = {}, method = 'post') {

    if (method === 'get') {
        return Axios.get('/' + url, {
            params
        })
    } else if (method === 'post') {
        return Axios.post('/' + url, params)
    }

}
export default {

    getUserSession() {
        return reqJsonData('api/users/session', {}, 'get')
    },

    userLogOut() {
        return reqJsonData('api/users/logOut', {}, 'get')
    },

    contentList(params) {
        // console.log('---begin to get contents----', params);
        return reqJsonData('api/content/getList', params, 'get')
    },

    getSimpleList(params) {
        return reqJsonData('api/content/getSimpleListByParams', params, 'get')
    },

    getOneContent(params) {
        return reqJsonData('api/content/getContent', params, 'get')
    },

    userDoLogin(params) {
        return reqJsonData('api/users/doLogin', params)
    },

    adminDoLogin(params) {
        return reqJsonData('api/admin/doLogin', params)
    },

    contentCategoryList(params) {
        return reqJsonData('api/contentCategory/getList', params, 'get')
    },

    contentTagList(params) {
        return reqJsonData('api/contentTag/getList', params, 'get')
    },

    userMessageList(params) {
        return reqJsonData('api/message/getList', params, 'get')
    },

    userSendMessage(params) {
        return reqJsonData('api/message/post', params)
    },

    siteMapList() {
        return reqJsonData('api/sitemap/getList', {}, 'get')
    },

    getSystemConfigs(params) {
        return reqJsonData('api/systemConfig/getConfig', params, 'get')
    }

}