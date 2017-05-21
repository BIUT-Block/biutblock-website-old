<template>
    <div class="dr-adminGroupForm">
        <el-dialog size="small" title="分配资源" :visible.sync="roleState.show">
            {{roleState.formData}}
            <el-tree :data="treeData" :default-checked-keys="roleState.formData.power" show-checkbox node-key="_id" ref="tree" highlight-current
                :props="defaultProps" @check-change="handleCheckChange">
            </el-tree>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
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
                this.$store.dispatch('hideAdminGroupRoleForm');
            },
            handleCheckChange(data, checked, indeterminate) {
                // console.log(data, checked, indeterminate);
                let formData = this.roleState.formData;
                if (checked) {
                    _.uniq(formData.power.push(data._id));
                } else {
                    _.remove(formData.power, function (n) {
                        return n === data._id;
                    });
                }
                
                this.$store.dispatch('showAdminGroupRoleForm', {
                    edit: true,
                    formData
                });
            }
        }
    }
</script>