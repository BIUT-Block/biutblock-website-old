<template>
    <div class="block dr-pagination">
        <div v-if="pageInfo">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageInfo.current" :page-size="15" layout="total, prev, pager, next" :total="pageInfo.totalItems">
            </el-pagination>
        </div>
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
        pageInfo: Object,
        pageType: String
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
            if (this.pageType === 'content') {
                this.$store.dispatch('getContentList', {
                    current: val
                });
            } else if (this.pageType === 'adminUser') {
                this.$store.dispatch('getAdminUserList', {
                    current: val
                });
            } else if (this.pageType === 'adminGroup') {
                this.$store.dispatch('getAdminGroupList', {
                    current: val
                });
            } else if (this.pageType === 'contentMessage') {
                this.$store.dispatch('getContentMessageList', {
                    current: val
                });
            } else if (this.pageType === 'contentTag') {
                this.$store.dispatch('getContentTagList', {
                    current: val
                });
            } else if (this.pageType === 'regUser') {
                this.$store.dispatch('getRegUserList', {
                    current: val
                });
            }

        }
    },
    data() {

        return {

        };
    }
}
</script>