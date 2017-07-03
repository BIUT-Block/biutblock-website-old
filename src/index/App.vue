<style lang="scss">
    @import './assets/base.css';
    @import '../../node_modules/element-ui/lib/theme-default/index.css';
    @import '../../node_modules/font-awesome/css/font-awesome.min.css';
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
        <MyHeader v-show="!simplePage"></MyHeader>
        <transition name="fade" mode="out-in">
            <router-view class="view"></router-view>
        </transition>
        <MyFooter v-show="!simplePage"></MyFooter>
    </div>
</template>
<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    import MyHeader from './components/header'
    import MyFooter from './components/Footer'
    import services from './store/services'
    export default {

        data() {
            return {
                navItems: []
            }
        },
        components: {
            MyHeader,
            MyFooter
        },
        computed: {
            ...mapGetters([
                'simplePage'
            ])
        },
        methods: {

        },
        beforeMount() {
            this.$store.dispatch('normalPage');
        }
    }

</script>
