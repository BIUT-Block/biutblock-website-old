<template>
    <div>
        <el-table align="center" v-loading="loading" ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="title" label="标题" width="200">
            </el-table-column>
            <el-table-column prop="date" label="创建时间" width="180">
                <template scope="scope">{{scope.row.updateDate}}</template>
            </el-table-column>
            <el-table-column prop="categories" label="类别" show-overflow-tooltip>
                <template scope="scope">{{scope.row.categories[scope.row.categories.length-1].name}}</template>
            </el-table-column>
            <el-table-column prop="from" label="来源" show-overflow-tooltip>
                <template scope="scope">{{scope.row.from === '1'?'原创':'转载'}}</template>
            </el-table-column>
            <el-table-column prop="isTop" label="推荐" show-overflow-tooltip>
                <template scope="scope">
                    <i class="fa fa-check" style="color:#13CE66" v-show="scope.row.isTop===1"></i>
                </template>
            </el-table-column>
            <el-table-column prop="clickNum" label="点击" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="commentNum" label="评论数" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="state" label="显示" show-overflow-tooltip>
                <template scope="scope">{{scope.row.state}}</template>
            </el-table-column>
            <el-table-column prop="author.name" label="作者" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="130" fixed="right">
                <template scope="scope">
                    <el-button size="mini" type="primary" @click="editContentInfo(scope.$index, dataList)">
                        <i class="fa fa-edit"></i>
                    </el-button>
                    <el-button size="mini" @click="deleteContent(scope.$index, dataList)">
                        <i class="fa fa-thumbs-o-up"></i>
                    </el-button>
                    <el-button size="mini" @click="deleteContent(scope.$index, dataList)">
                        <i class="fa fa-trash-o"></i>
                    </el-button>
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
            editContentInfo(index, rows) {
                let rowData = rows[index];
                let categoryIdArr = [],
                    tagsArr = [];
                rowData.categories.map((item, index) => {
                    categoryIdArr.push(item._id);
                })
                rowData.tags.map((item, index) => {
                    tagsArr.push(item._id);
                })
                rowData.categories = categoryIdArr;
                rowData.tags = tagsArr;
                this.$store.dispatch('showContentForm', {
                    edit: true,
                    formData: rowData
                });
                this.$router.push('/editContent/' + rowData._id);
            },
            deleteContent(index, rows) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    return services.deleteContent({
                        ids: rows[index]._id
                    });
                }).then((result) => {
                    if (result.data.state === 'success') {
                        this.$store.dispatch('getContentList');
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
        },
        computed: {

        }
    }

</script>
