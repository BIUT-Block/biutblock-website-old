<template>
    <div class="adminUser">
        <MessageForm :dialogState="formState"></MessageForm>
        <el-row class="dr-datatable">
            <el-col :span="24">
                <ToolBar></ToolBar>
                <DataTable :dataList="contentMessageList.docs"></DataTable>
                <Pagination :pageInfo="contentMessageList.pageInfo"></Pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import MessageForm from './messageForm'
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
        MessageForm,
        Pagination
    },
    methods: mapActions([

    ]),
    computed: {
        ...mapGetters([
            'contentMessageList'
        ]),
        formState() {
            return this.$store.getters.contentMessageFormState
        }
    },
    mounted() {
        this.$store.dispatch('getContentMessageList');
    }
}
</script>

<style lang="">

</style>