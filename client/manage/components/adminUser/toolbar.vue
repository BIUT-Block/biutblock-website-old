<template>
    <div class="dr-toolbar">
        <el-button size="small" type="primary" icon="plus">添加用户</el-button>
        <div class="dr-searchInput">
            <el-input size="small" placeholder="请填写关键字" icon="search" v-model="input2" :on-icon-click="handleIconClick">
            </el-input>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                input2: ''
            }
        },
        methods: {
            handleIconClick(ev) {
                console.log(ev);
            }
        }

    }
</script>
<style>
    .dr-toolbar {
        margin: 10px auto;
        text-align: left;
    }

    .dr-searchInput {
        width: 200px;
        float: right;
    }
</style>