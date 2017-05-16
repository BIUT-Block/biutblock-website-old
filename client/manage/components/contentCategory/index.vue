<template>
    <div class="admincategory">
        <CategoryForm :dialogState="formState"></CategoryForm>
        <el-row class="dr-datatable">
            <el-col :span="24">
                <ToolBar></ToolBar>
                <CategoryTree :treeData="contentCategoryList.docs"></CategoryTree>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import CategoryForm from './categoryForm'
import CategoryTree from './categoryTree'
import ToolBar from './toolBar.vue';
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
        ToolBar,
        CategoryForm,
        CategoryTree
    },
    methods: mapActions([

    ]),
    computed: {
        ...mapGetters([
            'contentCategoryList'
        ]),
        formState() {
            return this.$store.getters.contentCategoryFormState
        }
    },
    mounted() {
        this.$store.dispatch('getContentCategoryList')
    }
}
</script>

<style lang="">

</style>