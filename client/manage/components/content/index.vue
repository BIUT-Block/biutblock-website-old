<template>
    <div class="content">
        <el-row class="dr-datatable">
            <el-col :span="24">
                <ToolBar></ToolBar>
                <DataTable :dataList="contentList.docs"></DataTable>
                <Pagination :pageInfo="contentList.pageInfo" pageType="content"></Pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import DataTable from './dataTable.vue';
    import ToolBar from './toolBar.vue';
    import Pagination from '../common/Pagination.vue';
    import {
        mapGetters,
        mapActions
    } from 'vuex'

    export default {
        name: 'index',
        data() {
            return {

            }
        },
        components: {
            DataTable,
            ToolBar,
            // ContentForm,
            Pagination
        },
        methods: mapActions([

        ]),
        computed: {
            ...mapGetters([
                'contentList'
            ])
        },
        mounted() {
            this.$store.dispatch('getContentList');
        }
    }
</script>

<style lang="">

</style>