import reqwest from 'reqwest';
export function reqJsonData(url, params = {}, method = 'post') {
    // console.log('reqParams', params)
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

    contentList(params) {
        return reqJsonData('api/content/getList', params, 'get')
    },

    getOneContent(params) {
        return reqJsonData('api/content/getContent', params, 'get')
    }

}