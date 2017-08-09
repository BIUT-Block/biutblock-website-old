import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
// import cookies from 'js-cookie'

// import { inBrowser } from '../utils'

import index from '../views/ArticleList.vue'
import article from '../views/Article.vue'
import adminLogin from '../views/AdminLogin.vue'
import userLoginForm from '../views/UserLoginForm'
import siteMap from '../views/SiteMap.vue'

Vue.use(VueRouter)
Vue.use(Meta)

const scrollBehavior = to => {
    const position = {}
    if (to.hash) {
        position.selector = to.hash
    }
    if (to.matched.some(mm => mm.meta.scrollToTop)) {
        position.x = 0
        position.y = 0
    }
    return position
}

// const guardRoute = (to, from, next) => {
//     var token = cookies.get('user') || !inBrowser
//     if (!token) {
//         next('/')
//     } else {
//         next()
//     }
// }
export function createRouter() {
    const router = new VueRouter({
        mode: 'history',
        //base: __dirname,
        // scrollBehavior,
        routes: [
            // { name:'index', path: '/', component: index },
            // { name:'trending', path: '/trending/:by', component: index },
            // { name:'category', path: '/category/:id', component: index },
            // { name:'search', path: '/search/:key', component: index },
            // { name:'article', path: '/article/:id', component: article, meta: { scrollToTop: true } },
            // { name:'about', path: '/about', component: about, meta: { scrollToTop: true } },
            // { name:'account', path: '/user/account', component: account, meta: { scrollToTop: true }, beforeEnter: guardRoute },
            // { name:'password', path: '/user/password', component: password, meta: { scrollToTop: true }, beforeEnter: guardRoute }

            { name: 'index', path: '/', component: index, meta: { typeId: 'indexPage' } },
            { name: 'index', path: '/page/:current(\\d+)?', component: index, meta: { typeId: 'indexPage' } },
            { name: 'category', path: '/:cate1?___:typeId?/:current(\\d+)?', component: index },
            { name: 'category', path: '/:cate0/:cate1?___:typeId?/:current(\\d+)?', component: index },
            { name: 'search', path: '/search/:searchkey/:current(\\d+)?', component: index, meta: { typeId: 'search' } },
            { name: 'article', path: '/details/:id', component: article, meta: { notKeepAlive: true } },
            { name: 'login', path: '/users/login', component: userLoginForm },
            { name: 'adminlogin', path: '/dr-admin', component: adminLogin, meta: { typeId: 'adminlogin' } },
            { name: 'sitemap', path: '/sitemap.html', component: siteMap },
            { name: 'tagPage', path: '/tag/:tagName/:page(\\d+)?', component: index, meta: { typeId: 'tags' } }
        ]
    })
    return router;
}

