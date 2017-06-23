<style src="./assets/base.css"></style>
<style src='../../node_modules/element-ui/lib/theme-default/index.css'></style>

<style>
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
} from 'vuex';
import MyHeader from './components/common/header'
import MyFooter from './components/common/Footer'
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