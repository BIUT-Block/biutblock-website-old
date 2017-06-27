// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css';
import 'font-awesome/css/font-awesome.min.css'
import './assets/styles/public.css';
import Axios from 'axios';
// 自定义全局组件Loading
import Loading from './components/loading'
import * as filters from '../../utils/filters'

import store from './store/index.js'
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Loading);

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// axios拦截返回，拦截token过期
Axios.interceptors.response.use(function (response) {
  // console.log('--response--', response);
  let res = response.data;
  if (res.state === 'error') {
    if (res.err && res.err.indexOf('token') !== -1) {
      store.dispatch("deleteToken");
    } else if (res.err && res.err.indexOf('adminGroupPower') !== -1) {
      store.dispatch("loginState", {
        state: false,
        userInfo: {}
      });
    }
    return response;
  }
  return response;
}, function (error) {
  return Promise.reject(error);
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