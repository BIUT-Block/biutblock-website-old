<template>
    <div class="dr-adminGroupForm">
        <el-dialog size="small" title="分配资源" :visible.sync="roleState.show">
            <el-tree :data="treeData" show-checkbox node-key="id" ref="tree" highlight-current :props="defaultProps">
            </el-tree>

            <div class="buttons">
                <el-button @click="getCheckedNodes">通过 node 获取</el-button>
                <el-button @click="getCheckedKeys">通过 key 获取</el-button>
                <el-button @click="setCheckedNodes">通过 node 设置</el-button>
                <el-button @click="setCheckedKeys">通过 key 设置</el-button>
                <el-button @click="resetChecked">清空</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import services from '../../store/services.js';

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
            getCheckedNodes() {
                console.log(this.$refs.tree.getCheckedNodes());
            },
            getCheckedKeys() {
                console.log(this.$refs.tree.getCheckedKeys());
            },
            setCheckedNodes() {
                this.$refs.tree.setCheckedNodes([{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 9,
                    label: '三级 1-1-1'
                }]);
            },
            setCheckedKeys() {
                this.$refs.tree.setCheckedKeys([3]);
            },
            resetChecked() {
                this.$refs.tree.setCheckedKeys([]);
            }
        }
    }
</script>