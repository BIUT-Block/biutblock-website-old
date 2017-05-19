// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css';
import 'font-awesome/css/font-awesome.min.css'
import './assets/styles/public.css';
import moment from 'moment';
// 自定义全局组件Loading
import Loading from './components/loading'
import store from './store/index.js'
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Loading);
/* eslint-disable no-new */
Vue.filter("formatDate", function (date) { //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
});

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