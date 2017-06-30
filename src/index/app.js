import Vue from 'vue'
import {
    createStore
} from './store'
import {
    createRouter
} from './router'
import App from './App.vue'
import Header from './components/common/header'
import Footer from './components/common/Footer'
import MyTag from './components/common/Tag.vue'
import HotContents from './components/common/HotContents.vue'
import * as filters from '../../utils/filters'
import documentInfoMixin from '../../utils/documentInfo/info'
import {
    sync
} from 'vuex-router-sync'
import ElementUI from 'element-ui'

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.mixin(documentInfoMixin);

export function createApp() {
    // create store and router instances
    const store = createStore()
    const router = createRouter()

    // sync the router with the vuex store.
    // this registers `store.state.route`
    sync(store, router)

    // create the app instance.
    // here we inject the router, store and ssr context to all child components,
    // making them available everywhere as `this.$router` and `this.$store`.
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    Vue.use(ElementUI);
    // expose the app, the router and the store.
    // note we are not mounting the app here, since bootstrapping will be
    // different depending on whether we are in a browser or on the server.
    let preFetchComponent = [
        Header,
        Footer,
        MyTag
        // HotContents
    ]

    return {
        app,
        router,
        store,
        preFetchComponent
    }
}