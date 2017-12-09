<template>
    <div>
        <PannelBox title="推荐文章" className="hot-content-list">
            <div class="content-list">
                <ul>
                    <li class="hot-li" v-for="(item,index) in hotItems" :key="item._id">
                      <el-row :gutter="10">
                        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="5">
                          <router-link :to="'/details/'+item._id+'.html'" class="continue-reading">
                            <img :src="item.sImg" :alt="item.title" />
                        </router-link>
                        </el-col>
                        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="19">
                          <div class="left-area">
                            <router-link class="title" :to="'/details/'+item._id+'.html'">{{item.title}}</router-link>
                        </div>
                        </el-col>
                      </el-row>
                        
                        
                    </li>
                </ul>
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
    ul {
      .hot-li:last-child {
        border: none;
      }
      li {
        position: relative;
        padding: 10px 0;
        overflow: hidden;
        font-size: 14px;
        display: block;
        img {
          width: 100%;
          border-radius: 4px;
          border: 1px solid #f0f0f0;
        }
      }
    }
  }
}
</style>