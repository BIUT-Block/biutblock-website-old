<template>
    <PannelBox title="近期文章" className="recent-content-list">
        <div class="content-list">
            <ul>
                <li :key='index' v-for="(item,index) in recentItems">
                    <span class="triangle"></span>
                    <div class="con">
                        <router-link class="title" :to="'/details/'+item._id+'.html'">{{item.title}}</router-link>
                    </div>
                </li>
            </ul>
        </div>
    </PannelBox>
</template>
<script>
import PannelBox from "./PannelBox.vue";
export default {
  name: "recentlyContents",
  data() {
    return {
      loadingState: true
    };
  },
  components: {
    PannelBox
  },
  props: ["recentItems"]
};
</script>

<style lang="scss">
.recent-content-list {
  .content-list {
    text-align: left;
    ul {
      li {
        font-size: 14px;
        padding: 0 0 0.75rem 1rem;
        position: relative;
        color: #666666;
        .triangle {
          position: absolute;
          top: 0.5rem;
          left: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-color: #fff #fff #fff #cccccc;
          -webkit-transform-origin: 25% center;
          transform-origin: 25% center;
          border-width: 4px;
        }
        .con {
          -webkit-transition: opacity 0.5s ease-in;
          transition: opacity 0.5s ease-in;
          .title {
            display: block;
          }
          .time {
            padding-top: 3px;
            display: inline-block;
            color: #a4abb1;
          }
        }
        .con a:link,
        .con a:visited {
          color: #666666;
        }
      }
    }
  }
}
</style>