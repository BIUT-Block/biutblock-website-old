import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Home from '../components/Home'
import News from '../components/News'
import AdminUser from '../components/adminUser/index'
import AdminGroup from '../components/adminGroup/index'
import AdminResource from '../components/adminResource/index'
import ContentCategory from '../components/contentCategory/index'
import Content from '../components/content/index'
import ContentForm from '../components/content/contentForm'
import ContentTag from '../components/contentTag/index'
import RegUser from '../components/regUser/index'


Vue.use(Router)

export default new Router({
  routes: [{
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
    },
    {
      path: '/adminResource',
      component: AdminResource,
      name: '资源管理'
    }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '文档管理',
    iconCls: 'fa fa-file-text',
    children: [{
      path: '/contentCategory',
      component: ContentCategory,
      name: '文档类别'
    },
    {
      path: '/content',
      component: Content,
      name: '文档管理'
    },
    {
      path: '/addContent',
      component: ContentForm,
      name: '文档添加',
      hidden: true
    },
    {
      path: '/editContent/:id',
      component: ContentForm,
      name: '文档编辑',
      hidden: true
    },
    {
      path: '/contentTags',
      component: ContentTag,
      name: '标签管理'
    }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '会员管理',
    iconCls: 'fa fa-user',
    children: [{
      path: '/regUser',
      component: RegUser,
      name: '注册会员'
    }
    ]
  }

  ]
})