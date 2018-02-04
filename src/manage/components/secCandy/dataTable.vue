<template>
    <div>
        <el-table align="center" v-loading="loading" ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="passiveCode" label="分享码" width="120">
            </el-table-column>
            <el-table-column prop="wallets" label="被分享次数">
                <template slot-scope="scope">
                    {{scope.row.wallets.length}}
                </template>
            </el-table-column>
            <el-table-column prop="date" label="更新时间">
            </el-table-column>
            <el-table-column label="详情" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" plain round @click="editSecCandy(scope.$index, dataList)"><i class="fa fa-edit"></i></el-button>
                    <!-- <el-button size="mini" type="danger" plain round icon="el-icon-delete" @click="deleteSecCandy(scope.$index, dataList)"></el-button> -->
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
      multipleSelection: []
    };
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    editSecCandy(index, rows) {
      let rowData = rows[index];
      this.$store.dispatch("showSecCandyForm", {
        edit: true,
        formData: rowData
      });
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
            this.$store.dispatch("getSecCandyList", this.pageInfo);
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