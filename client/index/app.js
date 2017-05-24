import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css';
// require('../../node_modules/element-ui/lib/theme-default/index.css')
// import 'font-awesome/css/font-awesome.min.css'
sync(store, router)
Vue.use(ElementUI);
const app = new Vue({
    store,
    router,
    ...App
})

export { app, router, store }
