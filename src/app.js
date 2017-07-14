import Vue from 'vue'
import Meta from 'vue-meta'
import {
    createStore
} from './index/store'
import {
    createRouter
} from './index/router'
import App from './index/App.vue'
import { sync } from 'vuex-router-sync'
import * as filters from '../utils/filters'
import documentInfoMixin from './mixins'
import ElementUI from 'element-ui'

import Header from './index/components/header'
import Footer from './index/components/Footer'
import MyTag from './index/components/Tag.vue'


Vue.use(ElementUI);
// Vue.use(Meta);
Vue.mixin(documentInfoMixin);

const store = createStore()
const router = createRouter()
const preFetchComponent = [
    Header,
    Footer,
    MyTag
]

sync(store, router)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

const app = new Vue({
    router,
    store,
    render: h => h(App)
})

export { app, router, store, preFetchComponent }
