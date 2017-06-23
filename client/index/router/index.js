import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const ItemList = require('../views/ItemList.vue')
const Article = require('../views/Article.vue')
const SiteMap = require('../views/SiteMap.vue')
const Tag = require('../components/common/Tag.vue')
const AdminLogin = require('../views/AdminLogin.vue')
const UserLoginForm = require('../views/UserLoginForm');
import createListView from '../views/CreateListView';
export function createRouter() {
    const router = new Router({
        mode: 'history',
        scrollBehavior(to, from, savedPosition) {
            return {
                x: 0,
                y: 0
            }
        },
        routes: [{
            path: '/',
            name: 'index',
            component: createListView({
                name: 'indexPage',
                typeId: 'indexPage',
                typeName: '首页'
            })
        }, {
            path: '/page/:page(\\d+)?',
            name: 'indexPage',
            component: createListView({
                name: 'indexPage',
                typeId: 'indexPage',
                typeName: '首页'
            })
        }, {
            path: '/tag/:tagName',
            name: 'tagPage',
            component: createListView({
                name: 'tagpage',
                typeId: 'tags',
                typeName: '标签云'
            })
        }, {
            path: '/users/login',
            name: 'login',
            component: UserLoginForm
        }, {
            path: '/dr-admin',
            name: 'adminlogin',
            component: AdminLogin
        }, {
            path: '/details/:id',
            name: 'article',
            component: Article
        }, {
            path: '/sitemap.html',
            name: 'sitemap',
            component: SiteMap
        }]
    })

    router.beforeEach((to, from, next) => {
        next()
    })

    let headerNav = require('../../../utils/routePath/indexCates.json');
    let newRoters = [];
    if (headerNav.length > 0) {
        headerNav.map((item, index) => {
            newRoters.push({
                path: '/' + item.defaultUrl + '___' + item._id + '/:page(\\d+)?',
                component: createListView({
                    name: (item.defaultUrl).split('-')[0],
                    typeId: item._id,
                    typeName: item.name,
                    discription: item.comments,
                    keywords: item.keywords
                }),
                name: 'catePage_' + item._id,
                iconCls: 'fa fa-id-card-o'
            })
        })
        router.addRoutes(newRoters)
    }
    return router;
}