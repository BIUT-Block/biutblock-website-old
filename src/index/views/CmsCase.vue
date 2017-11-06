<template>
    <article class="case-box">
        
        <div class="contentContainer">
            <el-row :gutter="0">
                <el-col :xs="1" :sm="1" :md="3" :lg="3">
                    &nbsp;
                </el-col>
                <el-col :xs="22" :sm="22" :md="18" :lg="18">
                    <el-row :gutter="20">
                      <h3 style="margin:5px auto 20px;">这些站点在用DoraCMS：</h3>
                      <AdsPannel id="BkxSmqcaAZ" />
                    </el-row>
                </el-col>
                <el-col :xs="1" :sm="1" :md="3" :lg="3">
                    &nbsp;
                </el-col>
            </el-row>
        </div>
        
    </article>
</template>
<style lang="scss">
.case-box {
  min-height: 400px;
  img {
    width: 100%;
    height: 2rem;
  }
}
</style>

<script>
import AdsPannel from "../components/AdsPannel.vue";
export default {
  name: "case-item",
  components: {
    AdsPannel
  }
};
</script>