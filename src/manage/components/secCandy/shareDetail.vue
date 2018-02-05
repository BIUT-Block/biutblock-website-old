<template>
    <div class="dr-contentTagForm">
        <el-dialog width="35%" size="small" title="被分享钱包列表" :visible.sync="dialogState.show" :close-on-click-modal="false">
            <div v-if="dialogState.formData && dialogState.formData.wallets && dialogState.formData.wallets.length>0">
                <ol>
                    <li v-for="wallet in dialogState.formData.wallets" :key="wallet._id">
                        <span :style="wallet.hasSend ? green : gray">{{wallet.walletId}}</span>
                    </li>
                </ol>
            </div>
            <div v-else>
                暂无记录
            </div>
        </el-dialog>
    </div>
</template>
<script>
import services from "../../store/services.js";
import _ from "lodash";
export default {
  props: {
    dialogState: Object,
    groups: Array
  },
  data() {
    return {
      green: { color: "#13CE66", fontWeight: "bold" },
      gray: { color: "gray" }
    };
  },
  methods: {
    confirm() {
      this.$store.dispatch("hideSecCandyDetails");
    }
  }
};
</script>