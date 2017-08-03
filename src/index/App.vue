<style lang="scss">
// @import './assets/base.css';
.fade-enter-active,
.fade-leave-active {
    transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>
<template>
    <div id="app">
        <MyHeader></MyHeader>
        <transition name="fade" mode="out-in">
            <router-view :key="$route.fullPath" class="view"></router-view>
        </transition>
    </div>
</template>
<script>
import {
    mapGetters,
    mapState
} from 'vuex'

import MyHeader from './components/header'
// import MyFooter from './components/Footer'

export default {
    name: 'app',
    components: {
        // Navigation,
        // signUp,
        // signIn,
        // backTop,
        // backendMenu,
        MyHeader,
        // MyFooter
    },
    data() {
        return {}
    },
    computed: {
        ...mapGetters({
            global: 'global/getGlobal'
        }),
        ...mapState('appShell', [
            'pageTransitionName'
        ]),
        key() {
            return this.$route.path.replace(/\//g, '_')
        },
        backend() {
            return this.$route.path.indexOf('backend') >= 0
        },
        isLogin() {
            return this.$route.path === '/backend'
        }
    },
    methods: {
        handleBeforeEnter() {
            this.$store.dispatch('appShell/setPageSwitching', true)
        },
        handleAfterEnter() {
            this.$store.dispatch('appShell/setPageSwitching', false)
        },
        handleClickHeaderBack() {
            this.$router.go(-1)
        },
    }
}
</script>
