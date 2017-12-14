<template>
    <div>
        <PannelBox title="推荐文章" className="hot-content-list">
            <div class="content-list">
                <el-row :gutter="10">
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="hot-li" v-for="(item,index) in hotItems" :key="item._id">
                    <router-link :to="'/details/'+item._id+'.html'" class="continue-reading">
                      <img :src="item.sImg" :alt="item.title" />
                    </router-link>
                    <router-link class="title" :to="'/details/'+item._id+'.html'">{{item.title | cutWords(25)}}</router-link>
                  </el-col>
                </el-row>
            </div>
        </PannelBox>
    </div>
</template>
<script>
import PannelBox from "./PannelBox.vue";
export default {
  name: "hotContents",
  data() {
    return {
      loadingState: true
    };
  },
  props: ["hotItems", "typeId"],
  components: {
    PannelBox
  },
  serverCacheKey: props => {
    return `hotItem-${props.typeId}`;
  }
};
</script>

<style lang="scss">
.hot-content-list {
  margin-bottom: 30px;
  .content-list {
    text-align: left;
    .hot-li {
      margin: 0 0 10px;
      .continue-reading {
        min-height: 5.8rem;
        display: inline-block;
      }
      img {
        width: 100%;
        border-radius: 2px;
      }
      .title {
        font-size: 12px;
        word-break: break-all;
        line-height: 16px;
        display: inline-block;
        height: 52px;
        vertical-align: text-top;
      }
    }
  }
}
</style>