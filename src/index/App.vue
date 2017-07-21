<style lang="scss">
@import './assets/base.css';
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
        <div v-if="!simplePage">
            <MyHeader></MyHeader>
        </div>
        <transition name="fade" mode="out-in">
            <router-view class="view"></router-view>
        </transition>
        <div v-if="!simplePage">
            <MyFooter></MyFooter>
        </div>
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
