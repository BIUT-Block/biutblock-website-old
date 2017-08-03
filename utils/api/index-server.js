import axios from 'axios'
import qs from 'qs'
import md5 from 'md5'
import config from './config-server'

export default {
    post(url, data) {
        const key = md5(url + JSON.stringify(data))
        if (config.cached && config.cached.has(key)) {
            console.log('---使用缓存数据---', key);
            return Promise.resolve(config.cached.get(key))
        }
        return axios({
            method: 'post',
            url: config.api + url,
            data: data,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log('---接口信息被缓存---', key);
            if (config.cached && data.cache) config.cached.set(key, res)
            return res
        })
    },
    get(url, params) {
        const key = md5(url + JSON.stringify(params))
        if (config.cached && config.cached.has(key)) {
            console.log('---使用缓存数据---', url + JSON.stringify(params));
            return Promise.resolve(config.cached.get(key))
        }
        return axios({
            method: 'get',
            url: config.api + url,
            params,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            if (config.cached && params.cache) {
                config.cached.set(key, res)
                console.log('---接口信息被缓存---', url + JSON.stringify(params));
            }
            return res
        })
    }
}
