import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = require('../views/Home.vue')
const ItemList = require('../views/ItemList.vue')
const Article = require('../views/Article.vue')
const Tag = require('../views/Tag.vue')
const Login = require('../views/Login.vue')
const AdminLogin = require('../views/AdminLogin.vue')
const SlotHeader = require('../components/common/header/slotHeader');
const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))

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
            redirect: '/home'
        }, {
            path: '/home',
            name: 'home',
            component: ItemList
        }, {
            path: '/article',
            name: 'article',
            component: Article
        }, {
            path: '/tag',
            name: 'tag',
            component: Tag
        }, {
            path: '/login',
            name: 'login',
            component: Login
        }, {
            path: '/dr-admin',
            name: 'adminlogin',
            component: AdminLogin
        }, {
            path: '/details/:id',
            name: 'details',
            component: Article
        },]
    })

    router.beforeEach((to, from, next) => {
        next()
    })

    let headerNav = require('../assets/cates.json');
    let newRoters = [];
    if (headerNav.length > 0) {
        headerNav.map((item, index) => {
            newRoters.push({
                path: '/' + item.defaultUrl + '___' + item._id,
                component: ItemList,
                name: item.name,
                iconCls: 'fa fa-id-card-o',
                meta: {
                    title: item.name,
                    typeId: item._id
                }
            })
        })
        router.addRoutes(newRoters)
    }
    return router;
}