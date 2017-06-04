import Vue from 'vue'
import {
    createApp
} from './app'
import 'es6-promise/auto'

// Vue.mixin({
//     beforeRouteUpdate(to, from, next) {
//         const {
//             asyncData
//         } = this.$options
//         if (asyncData) {
//             asyncData({
//                 store: this.$store,
//                 route: to
//             }).then(next).catch(next)
//         } else {
//             next()
//         }
//     }
// })

const {
    app,
    router,
    store,
    preFetchComponent
} = createApp()

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
            return diffed || (diffed = (prevMatched[i] !== c)) || c.name === 'cmslistview' || c.name === 'cmsarticleview'
        })
        console.log('-------begin to render--------', activated);
        if (!activated.length) {
            return next()
        }
        // bar.start()
        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({
                    store,
                    route: to
                })
            }
        })).then(() => {
            //   bar.finish()
            next()
        }).catch(next)
    })

    app.$mount('#app')
})