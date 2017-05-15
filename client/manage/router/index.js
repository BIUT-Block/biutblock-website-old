import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Home from '../components/Home'
import News from '../components/News'
import AdminUser from '../components/adminUser/index'
import AdminGroup from '../components/adminGroup/index'
import AdminResource from '../components/adminResource/index'
import ContentCategorys from '../components/contentCategorys/index'
import Content from '../components/content/index'
import ContentForm from '../components/content/contentForm'
// import App from '../App'


Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Home,
    name: '系统管理',
    iconCls: 'el-icon-setting', //图标样式class
    children: [{
      path: 'adminUser',
      component: AdminUser,
      name: '用户管理'
    },
    {
      path: 'adminGroup',
      component: AdminGroup,
      name: '角色管理'
    },
    {
      path: 'adminResource',
      component: AdminResource,
      name: '资源管理'
    }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '文档管理',
    iconCls: 'fa fa-file-text', //图标样式class
    children: [{
      path: 'contentCategory',
      component: ContentCategorys,
      name: '文档类别'
    },
    {
      path: 'content',
      component: Content,
      name: '文档管理',
      children: [
        { path: 'add', component: ContentForm },
        { path: 'edit/:id', component: ContentForm }
      ]
    },
    {
      path: 'contentTags',
      component: AdminResource,
      name: '标签管理'
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