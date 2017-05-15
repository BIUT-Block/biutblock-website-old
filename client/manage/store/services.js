// import axios from 'axios';
import reqwest from 'reqwest';
export function reqJsonData(url, params = {}, method = 'post') {
    console.log('reqParams', params)
    return reqwest({
        url: 'http://127.0.0.1:8081/' + url,
        method: method,
        data: {
            ...params,
        },
        type: 'json',
    })
}
export default {

    adminUserList(params) {
        return reqJsonData('manage/adminUser/getList', params, 'get')
    },

    addAdminUser(params) {
        return reqJsonData('manage/adminUser/addOne', params)
    },

    updateAdminUser(params) {
        return reqJsonData('manage/adminUser/updateOne', params)
    },

    deleteAdminUser(params) {
        return reqJsonData('manage/adminUser/deleteUser', params)
    },

    adminGroupList(params) {
        return reqJsonData('manage/adminGroup/getList', params, 'get')
    },

    addAdminGroup(params) {
        return reqJsonData('manage/adminGroup/addOne', params)
    },

    updateAdminGroup(params) {
        return reqJsonData('manage/adminGroup/updateOne', params)
    },

    deleteAdminGroup(params) {
        return reqJsonData('manage/adminGroup/deleteGroup', params)
    },

    adminResourceList(params) {
        return reqJsonData('manage/adminResource/getList', params, 'get')
    },

    addAdminResource(params) {
        return reqJsonData('manage/adminResource/addOne', params)
    },

    updateAdminResource(params) {
        return reqJsonData('manage/adminResource/updateOne', params)
    },

    deleteAdminResource(params) {
        return reqJsonData('manage/adminResource/deleteResource', params)
    },

    contentCategoryList(params) {
        return reqJsonData('manage/contentCategory/getList', params, 'get')
    },

    addContentCategory(params) {
        return reqJsonData('manage/contentCategory/addOne', params)
    },

    updateContentCategory(params) {
        return reqJsonData('manage/contentCategory/updateOne', params)
    },

    deleteContentCategory(params) {
        return reqJsonData('manage/contentCategory/deleteCategory', params)
    },

    contentList(params) {
        return reqJsonData('manage/content/getList', params, 'get')
    },

    addcontent(params) {
        return reqJsonData('manage/content/addOne', params)
    },

    updatecontent(params) {
        return reqJsonData('manage/content/updateOne', params)
    },

    deletecontent(params) {
        return reqJsonData('manage/content/deleteCategory', params)
    }



}