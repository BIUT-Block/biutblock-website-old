<template>
    <div class="content">
        <el-row class="dr-datatable">
            <el-col :span="24">
                <div>
                    <router-view>
                        <ToolBar></ToolBar>
                        <DataTable :dataList="contentList.docs"></DataTable>
                        <Pagination :pageInfo="contentList.pageInfo"></Pagination>
                    </router-view>
                </div>
            </el-col>
        </el-row>

    </div>
</template>
<script>
    // import ContentForm from './contentForm'
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
                'contentList',
                'contentCategoryList'
            ])

        },
        mounted() {
            this.$store.dispatch('getContentList');
            this.$store.dispatch('getContentCategoryList');
        }
    }
</script>

<style lang="">

</style>