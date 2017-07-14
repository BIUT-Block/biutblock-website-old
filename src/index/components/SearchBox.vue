<template>
    <div class="search-box">
        <el-input placeholder="请输入关键字" size="small" icon="search" v-model="searchkey" :on-icon-click="handleIconClick">
        </el-input>
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    name: 'searchbox',
    serverCacheKey: () => 'searchbox',
    data() {
        return {
            searchkey: ''
        }
    },
    methods: {
        handleIconClick(ev) {
            // console.log(ev);
            this.$router.replace('/search/' + this.searchkey)
        },
        search(e) {
            // var qs = e.target.value
            // if (qs === "") {
            //     return false
            // }
            // this.$router.replace('/search/' + qs)
        }
    }
}

</script>
<style lang="scss">
.search-box {
    margin: 15px 0;
}
</style>
