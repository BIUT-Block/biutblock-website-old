<template>
    <div class="regUser">
        <UserForm :dialogState="formState"></UserForm>
        <el-row class="dr-datatable">
            <el-col :span="24">
                <ToolBar></ToolBar>
                <DataTable :dataList="regUserList.docs"></DataTable>
                <Pagination :pageInfo="regUserList.pageInfo"></Pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import UserForm from './userForm'
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
        UserForm,
        Pagination
    },
    methods: mapActions([

    ]),
    computed: {
        ...mapGetters([
            'regUserList',
        ]),
        formState() {
            return this.$store.getters.regUserFormState
        }
    },
    mounted() {
        this.$store.dispatch('getRegUserList');
    }
}
</script>

<style lang="">

</style>