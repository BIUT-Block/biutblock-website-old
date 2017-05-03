<template>
  <div id="app">
    <h3>hello world</h3>

  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex';
  export default {
    name: 'app',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: mapActions([
      'increment',
      'handleOpen',
      'handleClose',
      'handleSelect',
      'decrement'
    ]),
    computed: mapGetters([
      'count'
    ])
    // methods: {
    //   handleOpen(key, keyPath) {
    //     console.log(key, keyPath);
    //   },
    //   handleClose(key, keyPath) {
    //     console.log(key, keyPath);
    //   },
    //   handleSelect(key, keyPath) {
    //     console.log(key, keyPath);
    //   },
    //   increment() {

    //   }
    // }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }

  .dora-slider .el-menu--dark {
    position: fixed;
    height: 100vh;
    width: 200px
  }

  .dora-container {
    margin-left: 200px;
  }
  /*ul li {
  list-style-type: none;
  display: inline-block
}*/
</style>