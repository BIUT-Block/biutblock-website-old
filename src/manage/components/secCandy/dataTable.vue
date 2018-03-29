<template>
    <div>
        <el-table align="center" v-loading="loading" ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSecCandyChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="passiveWallet" label="分享者(钱包地址)" width="380">
                <template slot-scope="scope">
                    {{scope.row.passiveWallet.walletId}}
                </template>
            </el-table-column>
            <el-table-column prop="passiveCode" label="用户名" width="100">
              <template slot-scope="scope">
                    {{scope.row.passiveWallet.first_name?(scope.row.passiveWallet.first_name+scope.row.passiveWallet.last_name):'无'}}
                </template>
            </el-table-column>
            <el-table-column prop="wallets" label="分享总数" width="100">
                <template slot-scope="scope">
                    {{scope.row.wallets.length}}
                </template>
            </el-table-column>
            <el-table-column prop="wallets" label="获得奖励">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>状态: {{ scope.row.passiveWallet.hasSend ?'已校验':'未校验' }}</p>
                  <p>有效分享: {{currentShareNum(scope.row).currentShareNum}} &nbsp;次</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium" type="success">{{currentShareNum(scope.row).currentShareCoin}}&nbsp;SEC</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="getCoins" label="成功发放">
            </el-table-column>
            <el-table-column label="详情" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" plain round @click="editSecCandy(scope.$index, dataList)"><i class="fa fa-file-text"></i></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import services from "../../store/services.js";
import _ from "lodash";
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
  computed: {},
  methods: {
    currentShareNum(row) {
      let wallets = row.wallets;
      // TODO生产环境需要修改
      let maxSecShareNum = 29;
      let currentShareNum = 0,
        currentShareCoin = 0,
        currentWallets = [];
      // 判断被分享者是否被激活
      if (row.passiveWallet.hasSend) {
        currentWallets = _.filter(wallets, wallet => {
          return wallet.hasSend;
        });
        currentShareNum =
          currentWallets.length > maxSecShareNum
            ? maxSecShareNum
            : currentWallets.length;
        currentShareCoin = currentShareNum * 20 + 20;
      } else {
        currentShareNum = 0;
        currentShareCoin = 0;
      }

      return {
        currentShareNum,
        currentShareCoin
      };
    },
    handleSecCandyChange(val) {
      let _this = this;
      if (val && val.length > 0) {
        let ids = val.map((item, index) => {
          // let currentCoins = _this.currentShareNum(item).currentShareCoin;
          // let hadCoins = item.getCoins;
          // let wantCoins = currentCoins - hadCoins;
          return item.id;
        });
        this.multipleSelection = ids;
        this.$emit("handleCandyChange", ids);
      }
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