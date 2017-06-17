<template>
    <div class="dr-toolbar">
        <el-button size="small" type="danger" icon="plus" @click="delUser">批量删除</el-button>
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
            delUser() {
                // this.$store.dispatch('showAdminUserForm')
            }
        },
        components: {

        }

    }
</script>
<style lang="scss">

</style>