import Vue from 'vue'
import App from './index/App.vue'
import store from './index/store'
import router from './index/router'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'
import ElementUI from 'element-ui'
sync(store, router)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.use(ElementUI);
const app = new Vue({
    router,
    store,
    render: h => h(App)
})

export { app, router, store }
