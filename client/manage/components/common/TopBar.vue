<template>
    <div class="dr-toolbar">
        <div class="option-button">
            <div v-if="type === 'adminGroup'">
                <el-button size="small" type="primary" icon="plus" @click="addRole">添加角色</el-button>
            </div>
            <div v-else-if="type === 'adminUser'">
                <el-button size="small" type="primary" icon="plus" @click="addUser">添加管理员</el-button>
            </div>
            <div v-else-if="type === 'adminResource'">
                <el-button size="small" type="primary" icon="plus" @click="addResource">添加主菜单</el-button>
            </div>
            <div v-else-if="type === 'content'">
                <el-button size="small" type="primary" icon="plus" @click="addContent">添加文档</el-button>
            </div>
            <div v-else-if="type === 'contentCategory'">
                <el-button size="small" type="primary" icon="plus" @click="addTopCates">添加主分类</el-button>
            </div>
            <div v-else-if="type === 'contentMessage'">
                <el-button size="small" type="danger" icon="delete" @click="deleteMessages">批量删除</el-button>
            </div>
            <div v-else-if="type === 'contentTag'">
                <el-button size="small" type="primary" icon="plus" @click="addTag">添加新标签</el-button>
            </div>
            <div v-else-if="type === 'regUser'">
                <el-button size="small" type="danger" icon="plus" @click="delUser">批量删除</el-button>
            </div>
        </div>
        <div class="dr-searchInput">
            <el-input size="small" placeholder="角色名,模糊搜索" icon="search" v-model="input2" :on-icon-click="handleIconClick">
            </el-input>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            type: String
        },
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
            addUser() {
                this.$store.dispatch('showAdminUserForm')
            },
            addRole() {
                this.$store.dispatch('showAdminGroupForm')
            },
            addResource() {
                this.$store.dispatch('showAdminResourceForm', {
                    type: 'root',
                    formData: {
                        parentId: '0'
                    }
                })
            },
            addContent() {
                this.$store.dispatch('showContentForm');
                this.$router.push('/addContent');
            },
            addTopCates() {
                this.$store.dispatch('showContentCategoryForm', {
                    type: 'root',
                    formData: {
                        parentId: '0'
                    }
                })
            },
            deleteMessages() {
                console.log('del')
            },
            addTag() {
                this.$store.dispatch('showContentTagForm')
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
    .option-button {
        display: inline-block
    }
</style>