<template>
    <div class="adminUser">
        <UserForm :dialogState="formState"></UserForm>
        <el-row class="dr-datatable">
            <el-col :span="24">
                <ToolBar></ToolBar>
                <DataTable :dataList="adminUserList.docs"></DataTable>
                <Pagination :pageInfo="adminUserList.pageInfo"></Pagination>
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
            'adminUserList'
        ]),
        formState() {
            return this.$store.getters.adminUserFormState
        }
    },
    mounted() {
        this.$store.dispatch('getAdminUserList')
    }
}
</script>

<style lang="">

</style>