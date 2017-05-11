<template>
    <div class="dr-toolbar">
        <el-button size="small" type="primary" icon="plus" @click="addResource">添加主菜单</el-button>
        <div class="dr-searchInput">
            <!--<el-input size="small" placeholder="角色名,模糊搜索" icon="search" v-model="input2" :on-icon-click="handleIconClick">
                </el-input>-->
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formState: {
                show: false
            },
            input2: ''
        }
    },
    methods: {
        handleIconClick(ev) {
            console.log(ev);
        },
        addResource() {
            this.$store.dispatch('showAdminResourceForm')
        }
    },
    components: {

    }

}
</script>
<style>
.dr-toolbar {
    background: #f2f2f2;
    padding: 10px;
    margin: 10px 0;
}

.dr-searchInput {
    width: 200px;
    float: right;
}
</style>