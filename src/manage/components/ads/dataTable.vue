<template>
    <div>
        <el-table align="center" ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="name" label="广告名" width="120">
            </el-table-column>
            <el-table-column prop="type" label="广告类型">
                <template scope="scope">
                    <span v-if="scope.row.type == '0'">文字</span>
                    <span v-if="scope.row.type == '1'">图片</span>
                    <span v-if="scope.row.type == '2'">友情链接</span>
                </template>
            </el-table-column>
            <el-table-column prop="comments" label="广告描述" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="mini" @click="editAdsInfo(scope.$index, dataList)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteAds(scope.$index, dataList)">删除</el-button>
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

        }
    },

    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        editAdsInfo(index, rows) {
            let rowData = rows[index];
            this.$store.dispatch('adsInfoForm', {
                edit: true,
                formData: rowData
            });
            this.$router.push('/editAds/' + rowData._id);
        },
        deleteAds(index, rows) {
            this.$confirm('此操作将永久删除该广告, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return services.deleteAds({
                    ids: rows[index]._id
                });
            }).then((result) => {
                if (result.data.state === 'success') {
                    this.$store.dispatch('getAdsList');
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                } else {
                    this.$message.error(result.data.message);
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