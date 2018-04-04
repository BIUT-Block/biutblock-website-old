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
            </el-table-column>
            <el-table-column prop="date" label="更新时间">
              <template slot-scope="scope">
                    <span v-if="scope.row.state == '0'">交易失败</span>
                    <span v-else-if="scope.row.state == '1'">交易成功</span>
                    <span v-else-if="scope.row.state == '2'">交易pending</span>
                    <span v-else>交易失败</span>
                </template>
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