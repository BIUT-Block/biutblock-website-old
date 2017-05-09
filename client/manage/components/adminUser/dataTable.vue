<template>
    <div>
        <el-table align="center" v-loading="loading" ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
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
                    <el-button size="mini" @click="editUserInfo(scope.$index, dataList)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteUser(scope.$index, dataList)">删除</el-button>
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
import services from '../../store/services.js';
export default {
    props: {
        dataList: Array
    },
    data() {
        return {
            loading: false,
            tableData3: this.$store.getters.adminUserList.docs,
            multipleSelection: []
        }
    },

    methods: {
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
        editUserInfo(index, rows) {
            this.$store.dispatch('showAdminUserForm', {
                edit: true,
                formData: rows[index]
            });
        },
        deleteUser(index, rows) {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return services.deleteAdminUser({
                    ids: rows[index]._id
                });
            }).then((result) => {
                if (result.state === 'success') {
                    this.$store.dispatch('getAdminUserList');
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                } else {
                    this.$message.error('出错啦！');
                }
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