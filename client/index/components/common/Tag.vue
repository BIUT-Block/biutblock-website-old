<template>
    <div>
        <p class="content-tag">
            <el-tag type="gray" v-for="(item,index) in tags" :key="index">{{item.name}}</el-tag>
        </p>
    </div>
</template>
<script>
export default {
    name: 'Tag',
    computed: {
        tags() {
            return this.$store.getters.contentTag
        }
    },
    asyncData({
            store
        }) {
        return store.dispatch('contentTag')
    }
}
</script>

<style lang="scss">
.content-tag {
    .el-tag {
        margin: 0 5px;
    }
}
</style>
