<template>
    <div class="block dr-pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.current" :page-sizes="[
                                                pageInfo.pageSize,
                                                pageInfo.pageSize * 2,
                                                pageInfo.pageSize * 3
                                            ]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.totalItems">
        </el-pagination>
    </div>
</template>
<style lang="">
.dr-pagination {
    text-align: center;
    margin: 15px auto;
}
</style>
<script>
export default {
    props: {
        pageInfo: Object
    },
    methods: {
        handleSizeChange(val) {

            console.log(`每页 ${val} 条`);
            this.$store.dispatch('getAdminUserList', {
                pageSize: val
            });
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.$store.dispatch('getAdminUserList', {
                current: val
            });
        }
    },
    data() {

        return {

        };
    }
}
</script>