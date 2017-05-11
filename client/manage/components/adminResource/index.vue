<template>
    <div class="adminResource">
        <ResourceForm :dialogState="formState"></ResourceForm>
        <el-row class="dr-datatable">
            <el-col :span="24">
                <ToolBar></ToolBar>
                <ResourceTree :treeData="adminResourceList.docs"></ResourceTree>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import ResourceForm from './resourceForm'
import ResourceTree from './resourceTree'
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
        ResourceForm,
        ResourceTree
    },
    methods: mapActions([

    ]),
    computed: {
        ...mapGetters([
            'adminResourceList'
        ]),
        formState() {
            return this.$store.getters.adminResourceFormState
        }
    },
    mounted() {
        this.$store.dispatch('getAdminResourceList')
    }
}
</script>

<style lang="">

</style>