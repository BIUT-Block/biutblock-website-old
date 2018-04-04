<template>
    <div class="adminUser">
        <el-row class="dr-datatable">
            <el-col :span="24">
                <TopBar type="secCandyWalletLogs" :pageInfo="secCandyWalletLogsList.pageInfo"></TopBar>
                <DataTable :pageInfo="secCandyWalletLogsList.pageInfo" :dataList="secCandyWalletLogsList.docs"></DataTable>
                <Pagination :pageInfo="secCandyWalletLogsList.pageInfo" pageType="secCandyWalletLogs"></Pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import DataTable from "./dataTable.vue";
import TopBar from "../common/TopBar.vue";
import Pagination from "../common/Pagination.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "index",
  data() {
    return {};
  },
  components: {
    DataTable,
    TopBar,
    Pagination
  },
  methods: mapActions([]),
  computed: {
    ...mapGetters(["secCandyWalletLogsList"])
  },

  mounted() {
    this.$store.dispatch("getSecCandyWalletLogsList");
  }
};
</script>

<style lang="">

</style>