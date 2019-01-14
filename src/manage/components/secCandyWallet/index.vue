<template>
    <div class="adminUser">
        <el-row class="dr-datatable">
            <el-col :span="24">
                <TopBar type="secCandyWallet" :pageInfo="secCandyWalletList.pageInfo"></TopBar>
                <DataTable :pageInfo="secCandyWalletList.pageInfo" :dataList="secCandyWalletList.docs"></DataTable>
                <Pagination :pageInfo="secCandyWalletList.pageInfo" pageType="secCandyWallet"></Pagination>
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
    ...mapGetters(["secCandyWalletList"])
  },

  mounted() {
    this.$store.dispatch("getSecCandyWalletList");
  }
};
</script>

<style lang="">

</style>