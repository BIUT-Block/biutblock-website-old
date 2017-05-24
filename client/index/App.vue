<style src="./assets/_ionicicon.css"></style>
<style src="./assets/base.css"></style>

<style>
.view {
  text-align: center;
  padding-top: 1rem;
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
    <component :is="headerState.show"></component>
    <router-view class="view">
    </router-view>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex';
import Header from './components/common/header'
import SlotHeader from './components/common/header/slotHeader.vue'

export default {

  data() {
    return {}
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

  }
}
</script>