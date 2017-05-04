import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Home from '../components/Home'
import News from '../components/News'
import AdminUser from '../components/adminUser/index'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Hello',
      component: Home
    },
    {
      path: '/adminUser',
      component: AdminUser
    }
    // {
    //   path: '/home',
    //   component: Home
    // },
    // {
    //   path: '/news',
    //   component: News
    // }
  ]
})