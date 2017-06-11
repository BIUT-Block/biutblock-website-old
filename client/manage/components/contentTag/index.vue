<template>
    <div class="adminUser">
        <TagForm :dialogState="formState"></TagForm>
        <el-row class="dr-datatable">
            <el-col :span="24">
                <ToolBar></ToolBar>
                <DataTable :dataList="contentTagList.docs"></DataTable>
                <Pagination :pageInfo="contentTagList.pageInfo" pageType="contentTag"></Pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import TagForm from './tagForm'
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
        TagForm,
        Pagination
    },
    methods: mapActions([

    ]),
    computed: {
        ...mapGetters([
            'contentTagList'
        ]),
        formState() {
            return this.$store.getters.contentTagFormState
        }
    },
    mounted() {
        this.$store.dispatch('getContentTagList');
    }
}
</script>

<style lang="">

</style>