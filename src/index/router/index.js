import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const ItemList = require('../views/ItemList.vue')
const Article = require('../views/Article.vue')
const AriticleList = require('../views/AriticleList.vue')
const SiteMap = require('../views/SiteMap.vue')
const Tag = require('../components/Tag.vue')
const SearchResult = require('../views/SearchResult.vue')
const AdminLogin = require('../views/AdminLogin.vue')
const UserLoginForm = require('../views/UserLoginForm');
// import createListView from '../views/CreateListView';
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
            name: 'indexPage',
            component: AriticleList,
            meta: {
                title: '首页',
                name: 'indexPage',
                typeId: 'indexPage',
                typeName: '首页'
            }
        }, {
            path: '/page/:page(\\d+)?',
            name: 'indexPage',
            component: AriticleList,
            meta: {
                title: '首页',
                name: 'indexPage',
                typeId: 'indexPage',
                typeName: '首页'
            }
        }, {
            path: '/tag/:tagName/:page(\\d+)?',
            name: 'tagPage',
            component: AriticleList,
            meta: {
                name: 'tagpage',
                typeId: 'tags',
                typeName: '标签云'
            }
        }, {
            path: '/search/:searchkey/:page(\\d+)?',
            name: 'searchPage',
            component: SearchResult
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

    let headerNav = require('../../../utils/routePath/indexCates.json').default;
    let newRoters = [],
        currentName = '';
    if (headerNav.length > 0) {
        headerNav.map((item, index) => {
            if ((item.defaultUrl).indexOf('/') > 0) {
                let nameArr = (item.defaultUrl).split('/');
                currentName = nameArr[nameArr.length - 1]
            } else {
                currentName = item.defaultUrl;
            }
            newRoters.push({
                path: '/' + item.defaultUrl + '___' + item._id + '/:page(\\d+)?',
                component: AriticleList,
                name: 'catePage_' + item._id,
                iconCls: 'fa fa-id-card-o',
                meta: {
                    title: item.name,
                    name: currentName.split('-')[0],
                    typeId: item._id,
                    typeName: item.name,
                    discription: item.comments,
                    keywords: item.keywords
                }
            })
        })
        router.addRoutes(newRoters)
    }
    return router;
}
