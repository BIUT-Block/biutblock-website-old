<template>
    <div class="dr-contentTagForm">
        <el-dialog width="35%" size="small" title="我的会员" :visible.sync="dialogState.show" :close-on-click-modal="false">
            <div v-if="dialogState.formData && dialogState.formData.myUsers && dialogState.formData.myUsers.length>0">
                <ol>
                    <li v-for="user in dialogState.formData.myUsers" :key="user._id">
                        <span :style="user.enable ? green : gray">{{user.userName}}</span>
                        <span>({{user.phoneNum}})</span>
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
      this.$store.dispatch("hideUnionShareForm");
    }
  }
};
</script>