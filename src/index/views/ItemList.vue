<style lang='scss'>
.post-b {
  border-bottom: 1px solid #efefef;
  // margin-bottom: 25px;
  padding: 20px 0px;
}

.post-b:last-child {
  border: none;
}
.post-b:hover {
  margin: 0 -15px;
  padding: 20px 15px;
  background: #fafafa;
  -webkit-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
}
</style>
<template>
    <div class="post-b">
        <TopItem :item="item" :key="item._id" />
    </div>
</template>

<script>
import TopItem from "./TopItem";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "itemlist",
  props: ["item"],
  data() {
    return {
      // displayedItems: this.$store.getters.contentList
    };
  },
  components: {
    // Pagination,
    TopItem
  },
  methods: {},
  computed: {}
};
</script>