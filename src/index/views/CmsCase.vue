<template>
    <article class="case-item">
        
        <div class="contentContainer">
            <div>
                <el-row :gutter="0">
                    <el-col :xs="1" :sm="1" :md="3" :lg="3">
                        <div class="grid-content bg-purple">&nbsp;</div>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="18" :lg="18">
                        <el-row>
                          <h2>这些站点在用DoraCMS：</h2>
                          <el-col :span="4" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 1 : 0">
                            <el-card :body-style="{ padding: '0px' }">
                              <div style="padding: 14px;">
                                <img src="../assets/logo.png" class="image">
                              </div>
                              <div style="padding: 14px;">
                                <span>站点名称: <el-button type="text" class="button">前端开发俱乐部</el-button></span>
                              </div>
                            </el-card>
                          </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="1" :sm="1" :md="3" :lg="3">
                        <div class="grid-content bg-purple">&nbsp;</div>
                    </el-col>
                </el-row>
            </div>
        </div>
        
    </article>
</template>
<style lang="scss">
.case-item {
  
  min-height: 400px;
  img{
    width: 100%;
  }
}
</style>

<script>
import AdsPannel from '../components/AdsPannel.vue'
export default {
  name: "case-item",
  components: {
      AdsPannel
  },
  data() {
    return {
      currentDate: '2017-11-5 22:24:27'
    };
  }
};
</script>