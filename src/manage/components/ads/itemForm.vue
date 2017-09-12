<template>
    <div class="dr-adminGroupForm">
        <el-dialog size="small" title="添加图片" :visible.sync="formState.show" :close-on-click-modal="false">
            testme
        </el-dialog>
    </div>
</template>
<script>
import services from '../../store/services.js';
import _ from 'lodash';

export default {
    props: {
        formState: Object
    },
    data() {
        return {

        };
    },
    methods: {
        savePower() {
            let currentNodes = this.$refs.tree.getCheckedNodes();
            let currentArr = [];
            currentNodes.length > 0 && currentNodes.map((item, index) => {
                if (item.type == '1') {
                    currentArr.push(item._id);
                }
            });
            let params = this.roleState.formData;
            params.power = currentArr;
            services.updateAdminGroup(params).then((result) => {
                if (result.data.state === 'success') {
                    this.$store.dispatch('hideAdminGroupRoleForm');
                    this.$store.dispatch('getAdminGroupList');
                    this.$message({
                        message: '更新成功,重新登录后权限生效',
                        type: 'success'
                    });
                } else {
                    this.$message.error(result.data.message);
                }
            });
        }
    }
}

</script>
