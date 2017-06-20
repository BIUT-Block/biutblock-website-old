import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'
import Hello from '../components/Hello'
import Home from '../components/Home'
import Login from '../components/Login'
import News from '../components/News'
import AdminUser from '../components/adminUser/index'
import AdminGroup from '../components/adminGroup/index'
import AdminResource from '../components/adminResource/index'
import SystemConfig from '../components/systemConfig/index'
import ContentCategory from '../components/contentCategory/index'
import Content from '../components/content/index'
import ContentForm from '../components/content/contentForm'
import ContentTag from '../components/contentTag/index'
import ContentMessage from '../components/contentMessage/index'
import RegUser from '../components/regUser/index'
import Axios from "axios";
import _ from 'lodash';
Vue.use(Router)

// let router = new Router({
//   routes: [{
//       path: '/login',
//       component: Login,
//       name: '',
//       hidden: true
//     },
//     {
//       path: '/',
//       component: Home,
//       name: '系统管理',
//       iconCls: 'el-icon-setting', //图标样式class
//       children: [{
//           path: '/adminUser',
//           component: AdminUser,
//           name: '用户管理'
//         },
//         {
//           path: '/adminGroup',
//           component: AdminGroup,
//           name: '角色管理'
//         },
//         {
//           path: '/adminResource',
//           component: AdminResource,
//           name: '资源管理'
//         },
//         {
//           path: '/systemConfig',
//           component: SystemConfig,
//           name: '参数配置'
//         }
//       ]
//     },
//     {
//       path: '/',
//       component: Home,
//       name: '文档管理',
//       iconCls: 'fa fa-file-text',
//       children: [{
//           path: '/contentCategory',
//           component: ContentCategory,
//           name: '文档类别'
//         },
//         {
//           path: '/content',
//           component: Content,
//           name: '文档管理'
//         },
//         {
//           path: '/addContent',
//           component: ContentForm,
//           name: '文档添加',
//           hidden: true
//         },
//         {
//           path: '/editContent/:id',
//           component: ContentForm,
//           name: '文档编辑',
//           hidden: true
//         },
//         {
//           path: '/contentTags',
//           component: ContentTag,
//           name: '标签管理'
//         },
//         {
//           path: '/contentMessages',
//           component: ContentMessage,
//           name: '留言管理'
//         }
//       ]
//     },
//     {
//       path: '/',
//       component: Home,
//       name: '会员管理',
//       iconCls: 'fa fa-user',
//       children: [{
//         path: '/regUser',
//         component: RegUser,
//         name: '注册会员'
//       }]
//     }

//   ]
// })

// renderLeftMenu();
// console.log('---xx---', xx);
let router = new Router({
  routes: renderLeftMenu()
})

function renderLeftMenu() {
  let addNewRoutes = [];
  let treeData = require('../../../utils/routePath/manageCates.json');
  let newResult = [].concat(treeData);
  // let treeData = newResult.docs;
  let delAtArr = [];
  let childArr = _.filter(treeData, (doc) => {
    return doc.parentId != '0'
  });

  for (let i = 0; i < childArr.length; i++) {
    let child = childArr[i];
    for (let j = 0; j < treeData.length; j++) {
      let treeItem = treeData[j];
      treeItem.children = treeItem.children || [];
      if (treeItem._id == child.parentId) {
        treeItem.children.push(child);
        break;
      }
    }
  }
  newResult = _.filter(treeData, (menu) => {
    return menu.parentId == '0'
  });

  newResult.map((item, index) => {
    // TODO 目前只支持二级
    let childrenMenu = [];
    let childItem = item.children;
    let renderChildren = (childrenArr) => {
      if (childrenArr && childrenArr.length > 0) {
        (item.children).map((child, index) => {
          childrenMenu.push({
            path: '/' + child.routePath,
            component: resolve => require(['../components/' + child.componentPath], resolve),
            name: child.label,
            hidden: !child.enable
          })
        })
      }
    }
    renderChildren(childItem);
    let parentMenu = {
      path: '/',
      component: Home,
      name: item.label,
      iconCls: 'fa fa-user',
      children: childrenMenu
    }
    addNewRoutes.push(parentMenu);

  })

  // console.log('---addNewRoutes---', addNewRoutes);
  return addNewRoutes;
}


router.beforeEach((to, from, next) => {
  // token 校验
  if (store.getters.token) {
    Axios.defaults.headers.common['Authorization'] = 'DoraCMS ' + router.app.$store.getters.token; // 全局设定header的token验证，注意Bearer后有个空格
    next()
  } else {
    window.location = '/dr-admin';
  }
})

export default router;