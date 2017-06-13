<template>
    <div class="adminUser">
        <UserForm :dialogState="formState" :groups="adminGroupList.docs"></UserForm>
        <el-row class="dr-datatable">
            <el-col :span="24">
    
            </el-col>
        </el-row>
    </div>
</template>
<script>

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

    },
    methods: mapActions([

    ]),
    computed: {
        ...mapGetters([
            'systemConfig'
        ])
    }
}
</script>

<style lang="">

</style>