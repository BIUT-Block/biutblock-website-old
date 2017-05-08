<template>
    <div class="adminUser">
        <RoleForm :dialogState="formState"></RoleForm>
        <PowerForm :roleState="roleState"></PowerForm>
        <el-row class="dr-breadcrumb">
            <el-col :span="24">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                    <el-breadcrumb-item>系统配置</el-breadcrumb-item>
                    <el-breadcrumb-item>角色管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row class="dr-datatable">
            <el-col :span="24">
                <ToolBar></ToolBar>
                <DataTable :dataList="adminGroupList.docs"></DataTable>
                <Pagination :pageInfo="adminGroupList.pageInfo"></Pagination>
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
            'adminGroupList'
        ]),
        formState() {
            return this.$store.getters.adminGroupFormState
        },
        roleState() {
            return this.$store.getters.adminGroupRoleFormState
        }
    },
    mounted() {
        this.$store.dispatch('getAdminGroupList')
    }
}
</script>

<style lang="">
.adminUser {
    padding: 15px;
}

.dr-breadcrumb {
    margin: 0px auto 10px;
}
</style>