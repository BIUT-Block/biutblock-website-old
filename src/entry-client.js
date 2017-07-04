import {
    app,
    store,
    router
} from './app'

import Vue from 'vue'

// import 'es6-promise/auto'
import ProgressBar from './index/components/ProgressBar.vue'
import _ from 'lodash'
import renderPageInfo from '../utils/documentInfo';

const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)



if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
    // 定义服务端请求数据的钩子
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c)) || c.name.indexOf('list-view') > 0 || c.name === 'cmsarticleview'
        })
        if (!activated.length) {
            return next();
        }
        bar.start()
        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({
                    store,
                    route: to
                })
            }
        })).then(() => {
            bar.finish()
            // 针对非服务端渲染文章title处理
            if (window && window.__INITIAL_STATE__) {
                document.title = renderPageInfo(window.__INITIAL_STATE__, to).currentTitle;
            }
            next()
        }).catch(next)
    })

    app.$mount('#app')
})
// only https
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator && window.location.hostname !== 'localhost') {
    navigator.serviceWorker.register('/service-worker.js')
}
