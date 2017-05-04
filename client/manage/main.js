// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// 自定义全局组件Loading
import Loading from './components/loading'
import store from './store/index.js'
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Loading);
/* eslint-disable no-new */
const app = new Vue({
  // el: '#a',
  router,
  store,
  ...App
})

export {
  app,
  router,
  store
};