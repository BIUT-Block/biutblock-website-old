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
                <DataTable></DataTable>
                <Pagination></Pagination>
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
        name: 'news',
        data() {
            return {
                news: [
                    '11111111',
                    '22222222',
                    '333333',
                    '444444',
                ]
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
            // ...mapGetters([
            //     'adminUserList'
            // ]),
            formState() {
                return this.$store.getters.adminUserFormState
            }
        },
        created() {
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