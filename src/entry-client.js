import Vue from 'vue'
import { createApp } from './app'
import ProgressBar from './index/components/ProgressBar.vue'

import "./index/assets/base.css"

// 全局的进度条，在组件中可通过 $loading 访问
const loading = Vue.prototype.$loading = new Vue(ProgressBar).$mount()
document.body.appendChild(loading.$el)

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

Vue.mixin({
    // 当复用的路由组件参数发生变化时，例如/detail/1 => /detail/2
    beforeRouteUpdate(to, from, next) {
        // asyncData方法中包含异步数据请求
        const asyncData = this.$options.asyncData
        if (asyncData) {
            loading.start()
            asyncData.call(this, {
                store: this.$store,
                route: to,
                isServer: false,
                isClient: true
            }).then(() => {
                loading.finish()
                next()
            }).catch(next)
        }
        else {
            next()
        }
    },

})

// 此时异步组件已经加载完成
router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    // [a, b]
    // [a, b, c, d]
    // => [c, d]
    let diffed = false
    const activated = matched.filter((c, i) => diffed || (diffed = prevMatched[i] !== c))

    if (!activated.length) {
        return next()
    }

    loading.start()
    Promise.all(activated.map(c => {

        /**
         * 两种情况下执行asyncData:
         * 1. 非keep-alive组件每次都需要执行
         * 2. keep-alive组件首次执行，执行后添加标志
         */
        if (c.asyncData && (!c.asyncDataFetched || to.meta.notKeepAlive)) {
            return c.asyncData({
                store,
                route: to,
                isServer: false,
                isClient: true
            }).then(() => {
                c.asyncDataFetched = true
            })
        }
    })).then(() => {
        loading.finish()
        next()
    }).catch(next)
})

router.onReady(() => app.$mount('#app'))

// only https
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator && window.location.hostname !== 'localhost') {
    navigator.serviceWorker.register('/service-worker.js')
}
