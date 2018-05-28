<template>
    <div class="regUser">
        <ShareDetail :dialogState="shareFormState"></ShareDetail>
        <UserForm :dialogState="formState"></UserForm>
        <el-row class="dr-datatable">
            <el-col :span="24">
                <TopBar type="unionRegUser" :ids="selectlist" :pageInfo="unionRegUserList.pageInfo"></TopBar>
                <DataTable :pageInfo="unionRegUserList.pageInfo" :dataList="unionRegUserList.docs" @changeUserSelectList="changeSelect"></DataTable>
                <Pagination :pageInfo="unionRegUserList.pageInfo" pageType="unionRegUser"></Pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import UserForm from "./userForm";
import ShareDetail from "./shareDetail";
import DataTable from "./dataTable.vue";
import TopBar from "../common/TopBar.vue";
import Pagination from "../common/Pagination.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "index",
  data() {
    return {
      selectlist: []
    };
  },
  components: {
    DataTable,
    TopBar,
    UserForm,
    Pagination,
    ShareDetail
  },
  methods: {
    changeSelect(ids) {
      this.selectlist = ids;
    }
  },
  computed: {
    ...mapGetters(["unionRegUserList"]),
    formState() {
      return this.$store.getters.unionRegUserFormState;
    },
    shareFormState() {
      return this.$store.getters.unoinShareUserList;
    }
  },
  mounted() {
    this.$store.dispatch("getUnionRegUserList");
  }
};
</script>

<style lang="">

</style>