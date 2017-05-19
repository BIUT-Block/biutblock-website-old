<template>
    <div class="dr-toolbar">
        <el-button size="small" type="primary" icon="plus" @click="addResource">添加主分类</el-button>
        <div class="dr-searchInput">
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
                this.$store.dispatch('showContentCategoryForm', {
                    type: 'root',
                    formData: {
                        parentId: '0'
                    }
                })
            }
        },
        components: {

        }

    }
</script>
<style lang="scss">

</style>