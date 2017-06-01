import Axios from "axios";
export function reqJsonData(url, params = {}, method = 'post') {

    if (method === 'get') {
        return Axios.get('http://127.0.0.1:8081/' + url, { params })
    } else if (method === 'post') {
        return Axios.post('http://127.0.0.1:8081/' + url, params)
    }

}
export default {

    contentList(params) {
        return reqJsonData('api/content/getList', params, 'get')
    },

    getSimpleList(params) {
        return reqJsonData('api/content/getSimpleListByParams', params, 'get')
    },

    getOneContent(params) {
        return reqJsonData('api/content/getContent', params, 'get')
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

}