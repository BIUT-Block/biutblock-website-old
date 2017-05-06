// import axios from 'axios';
import reqwest from 'reqwest';
export function reqJsonData(url, params = {}, method = 'post') {
    console.log('555---', params)
    return reqwest({
        url: 'http://127.0.0.1:8080/' + url,
        method: method,
        data: {
            ...params,
        },
        type: 'json',
    })
}
export default {

    adminUserList() {
        return reqJsonData('manage/adminUser/getList', {}, 'get')
    },

    addAdminUser(params) {
        return reqJsonData('manage/adminUser/addOne', params)
    }

}