import Vue from 'vue'
import {
    createStore
} from './index/store'
import {
    createRouter
} from './index/router'
import App from './index/App.vue'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'
import ElementUI from 'element-ui'

Vue.use(ElementUI);

const store = createStore()
const router = createRouter()

sync(store, router)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

const app = new Vue({
    router,
    store,
    render: h => h(App)
})

export { app, router, store }
