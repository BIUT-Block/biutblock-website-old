<template>
    <div class="adminUser">
        <ShareDetail :dialogState="formState"></ShareDetail>
        <el-row class="dr-datatable">
            <el-col :span="24">
                <TopBar type="secCandyCode" :pageInfo="secCandyCodeList.pageInfo"></TopBar>
                <DataTable :pageInfo="secCandyCodeList.pageInfo" :dataList="secCandyCodeList.docs"></DataTable>
                <Pagination :pageInfo="secCandyCodeList.pageInfo" pageType="secCandyCode"></Pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import ShareDetail from "./shareDetail";
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
    ShareDetail,
    Pagination
  },
  methods: mapActions([]),
  computed: {
    ...mapGetters(["secCandyCodeList"]),
    formState() {
      return this.$store.getters.secCandyCodeDetailFormState;
    }
  },

  mounted() {
    this.$store.dispatch("getSecCandyCodeList");
  }
};
</script>

<style lang="">

</style>