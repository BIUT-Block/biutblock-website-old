<template>
    <div class="adminUser">
        <UserForm :dialogState="formState"></UserForm>
        <el-row class="dr-breadcrumb">
            <el-col :span="24">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                    <el-breadcrumb-item>系统配置</el-breadcrumb-item>
                    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
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
    .adminUser {
        padding: 15px;
    }

    .dr-breadcrumb {
        margin: 0px auto 10px;
    }
</style>