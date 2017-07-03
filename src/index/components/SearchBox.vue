<template>
    <div class="search-box">
        <el-input placeholder="请输入关键字" @keyup.enter="search($event)" icon="search" v-model="searchkey" :on-icon-click="handleIconClick">
        </el-input>
    </div>
</template>
<script>

import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    data() {
        return {
            searchkey: ''
        }
    },
    computed: {
        ...mapGetters([
        
        ])
    },
    methods: {
        handleIconClick(ev) {
            console.log(ev);
        },
        search(e) {
            alert(0);
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
.search-box {}
</style>