<template>
    <div>
        <el-table align="center" v-loading="loading" ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="contentId.title" label="文章标题" width="120">
            </el-table-column>
            <el-table-column prop="content" label="留言内容">
            </el-table-column>
            <el-table-column prop="author" label="留言者">
            </el-table-column>
            <el-table-column prop="replyAuthor.userName" label="关联用户(回复)">
            </el-table-column>
            <el-table-column prop="date" label="时间">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="mini" @click="replyContentMessage(scope.$index, dataList)">回复</el-button>
                    <el-button size="mini" type="danger" @click="deleteContentMessage(scope.$index, dataList)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
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
            multipleSelection: []
        }
    },

    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        replyContentMessage(index, rows) {
            let rowData = rows[index];
            this.$store.dispatch('showContentMessageForm', {
                edit: true,
                formData: rowData
            });
        },
        deleteContentMessage(index, rows) {
            this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return services.deleteContentMessage({
                    ids: rows[index]._id
                });
            }).then((result) => {
                if (result.data.state === 'success') {
                    this.$store.dispatch('getContentMessageList');
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