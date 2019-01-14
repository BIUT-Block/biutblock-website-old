<template>
    <div class="adminUser">
        <el-row class="dr-datatable">
            <el-col :span="24">
                <TopBar type="activeUsers" :pageInfo="activeUsersList.pageInfo"></TopBar>
                <DataTable :pageInfo="activeUsersList.pageInfo" :dataList="activeUsersList.docs"></DataTable>
                <Pagination :pageInfo="activeUsersList.pageInfo" pageType="activeUsers"></Pagination>
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
    ...mapGetters(["activeUsersList"])
  },

  mounted() {
    this.$store.dispatch("getActiveUsersList");
  }
};
</script>

<style lang="">

</style>