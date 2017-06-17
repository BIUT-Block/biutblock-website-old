import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const index = require('../views/index.vue')
const ItemList = require('../views/ItemList.vue')
const MainBody = require('../views/MainBody.vue')
const Article = require('../views/Article.vue')
const SiteMap = require('../views/SiteMap.vue')
const Tag = require('../components/common/Tag.vue')
const Login = require('../views/Login.vue')
const AdminLogin = require('../views/AdminLogin.vue')
const SlotHeader = require('../components/common/header/slotHeader');
const UserLoginForm = require('../components/common/UserLoginForm');

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
            component: MainBody,
            meta: {
                typeId: 'indexPage',
            }
        }, {
            path: '/page/:page(\\d+)?',
            name: 'indexPage',
            component: MainBody,
            meta: {
                typeId: 'indexPage',
            }
        }, {
            path: '/tag',
            name: 'tag',
            component: Tag
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
                component: MainBody,
                name: 'catePage_' + item._id,
                iconCls: 'fa fa-id-card-o',
                meta: {
                    title: item.name,
                    typeId: item._id,
                    discription: item.comments,
                    keywords: item.keywords
                }
            })
        })
        router.addRoutes(newRoters)
    }
    return router;
}