<template>
  <div id="app">
    <el-row>
      <el-col :span="24" class="dora-header">
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-submenu index="2" class="userMenu">
            <template slot="title"><i class="el-icon-setting"></i>&nbsp;admin</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="dora-slider">
        <div class="grid-content bg-purple">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
                <el-submenu index="1">
                  <template slot="title"><i class="el-icon-message"></i>系统管理</template>
                  <el-menu-item-group>
                    <template slot="title">系统配置</template>
                    <el-menu-item index="1-1">
                      <router-link to="/adminUser">用户管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-2">角色管理</el-menu-item>
                    <el-menu-item index="1-3">资源管理</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <!--<el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
                                              <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>-->
              </el-menu>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="20" class="dora-container">
        <div class="grid-content bg-purple-light">

          <router-view></router-view>
        </div>
      </el-col>
    </el-row>

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

  .dora-slider .el-menu-item a:link,
  .dora-slider .el-menu-item a:visited {
    color: #bfcbd9;
    text-decoration: none;
  }

  .dora-container {
    margin-left: 200px;
  }

  .dora-slider .el-menu li {
    text-align: left;
  }

  .dora-header .el-menu--horizontal .el-submenu {
    float: right;
  }
  /*ul li {
  list-style-type: none;
  display: inline-block
}*/
</style>