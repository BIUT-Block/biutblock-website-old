<template>
    <div>
        <el-table align="center" ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="userName" label="用户名" width="120">
            </el-table-column>
            <el-table-column prop="group" label="用户类型" width="120">
            </el-table-column>
            <el-table-column prop="name" label="姓名" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="phoneNum" label="联系方式" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="email" label="邮箱" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="mini" type="primary" @click="editUserInfo">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteUser">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px;display:none;">
            <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            dataList: Array
        },
        data() {
            return {
                tableData3: this.$store.getters.adminUserList.docs,
                multipleSelection: []
            }
        },

        methods: {
            handleClick() {
                alert('ok')
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            editUserInfo() {
                this.$store.dispatch('showAdminUserForm')
            },
            deleteUser() {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>