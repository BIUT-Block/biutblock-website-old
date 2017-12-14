<template>
    <div class="search-pannel">
        <div class="input-area" v-bind:class="{ active: activeSearch }">
            <el-input @keyup.enter.native="handleIconClick"  size="small" placeholder="请输入关键字" v-model="searchkey"></el-input>
            <i class="fa fa-search" @click="showSearchInput"></i>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "searchbox",
  data() {
    return {
      searchkey: "",
      activeSearch: false
    };
  },
  methods: {
    handleIconClick(ev) {
      this.$router.replace("/search/" + this.searchkey);
    },
    showSearchInput() {
      this.activeSearch = !this.activeSearch;
    },
    search(e) {}
  }
};
</script>
<style lang="scss">
.search-pannel {
  width: 100%;
  display: inline-block;
  margin-top: 5px;
  text-align: right;
  .input-area {
    display: inline-block;
    position: relative;
    i {
      display: inline-block;
      cursor: pointer;
      font-weight: 700px;
      color: #cccccc;
      position: absolute;
      top: 5px;
      right: 14px;
      font-size: 20px;
    }
    width: 50px;
    height: 30px;
    background: #fff;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    vertical-align: top;
    -webkit-transition: all 0.3s ease-out 0s;
    -o-transition: all 0.3s ease-out 0s;
    transition: all 0.3s ease-out 0s;

    input {
      border: none;
      width: 0;
    }
  }
  .input-area.active {
    width: 184px;
    -webkit-transition: all 0.3s ease-out 0s;
    -o-transition: all 0.3s ease-out 0s;
    transition: all 0.3s ease-out 0s;
    input {
      width: 155px;
      padding: 0 10px;
      -webkit-transition: all 0.3s ease-out 0s;
      -o-transition: all 0.3s ease-out 0s;
      transition: all 0.3s ease-out 0s;
    }
  }

  .el-form-item {
    margin-bottom: 0;
  }
}
</style>