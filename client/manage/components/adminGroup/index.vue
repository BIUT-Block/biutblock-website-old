<template>
    <div class="adminUser">
        <RoleForm :dialogState="formState"></RoleForm>
        <PowerForm :roleState="roleState" :treeData="adminResourceList.docs"></PowerForm>
        <el-row class="dr-datatable">
            <el-col :span="24">
                <ToolBar></ToolBar>
                <DataTable :dataList="adminGroupList.docs"></DataTable>
                <Pagination :pageInfo="adminGroupList.pageInfo" pageType="adminGroup"></Pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import RoleForm from './roleForm'
import PowerForm from './powerForm'
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
        PowerForm,
        ToolBar,
        RoleForm,
        Pagination
    },
    methods: mapActions([

    ]),
    computed: {
        ...mapGetters([
            'adminGroupList',
            'adminResourceList'
        ]),
        formState() {
            return this.$store.getters.adminGroupFormState
        },
        roleState() {
            return this.$store.getters.adminGroupRoleFormState
        }
    },
    mounted() {
        this.$store.dispatch('getAdminGroupList');
        this.$store.dispatch('getAdminResourceList')
    }
}
</script>

<style lang="">

</style>