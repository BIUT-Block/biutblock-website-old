<template>
    <div>
        <el-table align="center" v-loading="loading" ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="walletId" label="钱包地址" width="380">
            </el-table-column>
            <el-table-column prop="txHash" label="txHash">
            </el-table-column>
            <el-table-column prop="state" label="发送状态" show-overflow-tooltip>
              <template slot-scope="scope">
                    <el-tag v-if="!scope.row.state" size="medium" type="info">暂无记录</el-tag>
                    <el-tag v-else-if="scope.row.state == '0'" size="medium" type="danger">交易失败</el-tag>
                    <el-tag v-else-if="scope.row.state == '1'" size="medium" type="success">交易成功</el-tag>
                    <el-tag v-else-if="scope.row.state == '2'" size="medium" type="warning">交易pending</el-tag>
                    <el-tag v-else>交易失败</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="更新时间">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import services from "../../store/services.js";
export default {
  props: {
    dataList: Array,
    pageInfo: Object
  },
  data() {
    return {
      loading: false,
      multipleSelection: [],
      green: { color: "#13CE66" },
      red: { color: "#FF4949" }
    };
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteSecCandy(index, rows) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return services.deleteSecCandy({
            ids: rows[index]._id
          });
        })
        .then(result => {
          if (result.data.state === "success") {
            this.$store.dispatch("getSecCandyWalletLogsList", this.pageInfo);
            this.$message({
              message: "删除成功",
              type: "success"
            });
          } else {
            this.$message.error(result.data.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>