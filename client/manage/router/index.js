import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Home from '../components/Home'
import News from '../components/News'
import AdminUser from '../components/adminUser/index'
import AdminGroup from '../components/adminGroup/index'
import App from '../App'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Hello',
      component: Home
    },
    {
      path: '/',
      component: App,
      name: '系统管理',
      iconCls: 'el-icon-settings', //图标样式class
      children: [{
          path: '/adminUser',
          component: AdminUser,
          name: '主页',
          hidden: true
        },
        {
          path: '/adminGroup',
          component: AdminGroup,
          name: 'Table'
        }
      ]
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