<template>
    <div>
        <el-table align="center" v-loading="loading" ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="prize" label="奖项">
            </el-table-column>
            <el-table-column prop="prizeName" label="奖品名称">
            </el-table-column>
            <el-table-column prop="wallet" label="钱包地址">
            </el-table-column>
            <el-table-column prop="phoneNum" label="手机号">
            </el-table-column>
            <el-table-column prop="winTime" label="中奖时间">
            </el-table-column>
            <el-table-column prop="hadGrant" label="发币状态" show-overflow-tooltip>
                <template slot-scope="scope">
                    <i :class="scope.row.hadGrant ? 'fa fa-check-circle' : 'fa fa-minus-circle'" :style="scope.row.hadGrant ? green : red"></i>
                </template>
            </el-table-column>
            <el-table-column prop="winTime" label="更新时间">
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
            this.$store.dispatch("getSecCandyWalletList", this.pageInfo);
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