import Axios from "axios";

export function reqJsonData(url, params = {}, method = 'post') {
    // console.log('reqParams', params)
    if (method === 'get') {
        return Axios.get('http://127.0.0.1:8081/' + url, { params })
    } else if (method === 'post') {
        return Axios.post('http://127.0.0.1:8081/' + url, params)
    }

}
export default {

    logOut() {
        return reqJsonData('manage/logout', {}, 'get')
    },

    refreshManageCates(){
        return reqJsonData('manage/refreshManageCates', {}, 'get')
    },

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
        return reqJsonData('manage/adminUser/deleteUser', params, 'get')
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
        return reqJsonData('manage/adminGroup/deleteGroup', params, 'get')
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
        return reqJsonData('manage/adminResource/deleteResource', params, 'get')
    },

    getSystemConfigs(params) {
        return reqJsonData('manage/systemConfig/getConfig', params, 'get')
    },

    updateSystemConfigs(params) {
        return reqJsonData('manage/systemConfig/updateConfig', params)
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
        return reqJsonData('manage/contentCategory/deleteCategory', params, 'get')
    },

    contentList(params) {
        return reqJsonData('manage/content/getList', params, 'get')
    },

    getOneContent(params) {
        return reqJsonData('manage/content/getContent', params, 'get')
    },

    addContent(params) {
        return reqJsonData('manage/content/addOne', params)
    },

    updateContent(params) {
        return reqJsonData('manage/content/updateOne', params)
    },

    deleteContent(params) {
        return reqJsonData('manage/content/deleteContent', params, 'get')
    },

    contentTagList(params) {
        return reqJsonData('manage/contentTag/getList', params, 'get')
    },

    addContentTag(params) {
        return reqJsonData('manage/contentTag/addOne', params)
    },

    updateContentTag(params) {
        return reqJsonData('manage/contentTag/updateOne', params)
    },

    deleteContentTag(params) {
        return reqJsonData('manage/contentTag/deleteTag', params, 'get')
    },

    contentMessageList(params) {
        return reqJsonData('manage/contentMessage/getList', params, 'get')
    },

    addContentMessage(params) {
        return reqJsonData('manage/contentMessage/addOne', params)
    },

    deleteContentMessage(params) {
        return reqJsonData('manage/contentMessage/deleteMessage', params, 'get')
    },

    regUserList(params) {
        return reqJsonData('manage/regUser/getList', params, 'get')
    },

    updateRegUser(params) {
        return reqJsonData('manage/regUser/updateOne', params)
    },

    deleteRegUser(params) {
        return reqJsonData('manage/regUser/deleteUser', params, 'get')
    }



}