<template>
    <div class="dr-adminGroupForm">
        <el-dialog size="small" title="分配资源" :visible.sync="roleState.show" :close-on-click-modal="false">
            <el-tree :data="treeData" show-checkbox node-key="_id" ref="tree" highlight-current :props="defaultProps">
            </el-tree>
    
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeTree">取 消</el-button>
                <el-button type="primary" @click="savePower">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import services from '../../store/services.js';
import _ from 'lodash';

export default {
    props: {
        roleState: Object,
        treeData: Array
    },
    data() {
        return {
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    methods: {
        savePower() {
            // console.log(this.$refs.tree.getCheckedNodes());
            let currentNodes = this.$refs.tree.getCheckedNodes();
            let currentArr = [];
            currentNodes.length > 0 && currentNodes.map((item, index) => {
                currentArr.push(item._id);
            });
            let params = this.roleState.formData;
            params.power = currentArr;
            services.updateAdminGroup(params).then((result) => {
                if (result.state === 'success') {
                    this.$store.dispatch('hideAdminGroupRoleForm');
                    this.$store.dispatch('getAdminGroupList');
                    this.$message({
                        message: '更新成功',
                        type: 'success'
                    });
                } else {
                    this.$message.error('出错啦！');
                }
            });
        },
        closeTree() {
            this.$store.dispatch('hideAdminGroupRoleForm');
        }
    },
    updated() {
        // console.log('组件更新完毕', this.$refs);
        this.$refs.tree && this.$refs.tree.setCheckedKeys(this.roleState.formData.power);
    }
}
</script>