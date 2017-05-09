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
  routes: [
    {
      path: '/',
      component: Home,
      name: '系统管理',
      iconCls: 'el-icon-setting', //图标样式class
      children: [{
        path: '/adminUser',
        component: AdminUser,
        name: '用户管理'
      },
      {
        path: '/adminGroup',
        component: AdminGroup,
        name: '角色管理'
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