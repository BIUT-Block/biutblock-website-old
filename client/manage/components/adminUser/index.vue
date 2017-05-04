<template>
    <div class="adminUser">
        <el-row class="dr-breadcrumb">
            <el-col :span="24">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row class="dr-datatable">
            <el-col :span="24">
                <ToolBar></ToolBar>
                <DataTable></DataTable>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import DataTable from './dataTable.vue';
    import ToolBar from './toolBar.vue';
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
            ToolBar
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