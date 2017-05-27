<style src="./assets/_ionicicon.css"></style>
<style src="./assets/base.css"></style>
<style src='../../node_modules/element-ui/lib/theme-default/index.css'></style>

<style>
  .view {
    text-align: center;
    padding-top: 1rem;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .content {
    display: inline-block;
    width: 960px;
    min-height: 100vh;
    background-color: #fff;
    padding: 1rem;
  }

  @media all and (max-width: 768px) {
    .content {
      width: 100%;
      padding: .5rem;
      box-sizing: border-box;
    }
  }
</style>
<template>
  <div id="app">
    <component :is="headerState.show" :navs="navItems"></component>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex';
  import Header from './components/common/header'
  import SlotHeader from './components/common/header/slotHeader.vue'
  import services from './store/services'
  export default {

    data() {
      return {
        navItems: []
      }
    },

    components: {
      myheader: Header,
      slotTemp: SlotHeader
    },
    computed: {
      ...mapGetters([
        'headerState'
      ])
    },
    methods: {

    },
    beforeMount() {
      services.contentCategoryList().then((cateList) => {
        this.$nextTick(() => {
          this.navItems = cateList.data.docs
        })
      })
    }


  }
</script>