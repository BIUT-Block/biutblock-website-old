import Vue from 'vue'
import {
    createApp
} from './app'
import 'es6-promise/auto'
import ProgressBar from './components/common/ProgressBar.vue'
import _ from 'lodash'
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)
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
        if (!activated.length) {
            return next()
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

            if (window && window.__INITIAL_STATE__) {
                let winState = window.__INITIAL_STATE__,
                    documentTitle = '';
                if (!_.isEmpty(winState.mutations.contentDetails) && !_.isEmpty(winState.mutations.contentDetails.doc)) {
                    documentTitle = (winState.mutations.contentDetails.doc.title + ' | 前端开发俱乐部')
                }
                document.title = documentTitle;
            }

            next()
        }).catch(next)
    })

    app.$mount('#app')
})