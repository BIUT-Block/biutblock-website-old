<template>
    <div class="content-pagination">
        <el-pagination small layout="prev, pager, next" :total="pageInfo.totalItems" :current-page="pageInfo.current" @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>
<script>
export default {
    props: {
        pageInfo: Object,
        typeId: String
    },
    methods: {
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            console.log('---typeId---', this.typeId);
            if (this.typeId === 'indexPage') {
                this.$router.push('/page/' + val);
            } else {
                this.$router.push((this.$route.matched[0].path).split(':')[0] + val);
            }
        }
    }
}
</script>

<style lang="scss">
.content-pagination {
    margin: 30px 0;
    text-align: center;
}
</style>

