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

</style>