<template>
  <div class="resource-details">
        <el-dialog width="55%" size="small" title="我的权限" :visible.sync="resourceShow" :close-on-click-modal="false">
            
            {{renderResource()}}
            <div v-if="resource && resource.docs.length > 0">

            </div>
            <div v-else>
                暂无数据
            </div>
        </el-dialog>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  props: ["resource", "resourceShow"],
  data() {
    return {};
  },
  methods: {
    renderResource() {
      let newResult = [];
      if (this.resource && this.resource.doc) {
        newResult = this.resource;
        let treeData = newResult.docs;
        console.log("--1-", treeData);
        //   let delAtArr = [];
        let childArr = _.filter(treeData, doc => {
          return doc.parentId != "0";
        });

        for (let i = 0; i < childArr.length; i++) {
          let child = childArr[i];
          for (let j = 0; j < treeData.length; j++) {
            let treeItem = treeData[j];
            if (treeItem._id == child.parentId) {
              if (!treeItem.children) treeItem.children = [];
              treeItem.children.push(child);
              break;
            }
          }
        }
        console.log("---", treeData);
        //   newResult.docs = _.filter(treeData, doc => {
        //     return doc.parentId == "0";
        //   });
      }

      return newResult;
    }
  },
  computed: {
    showForm() {
      return this.resourceShow;
    }
  }
};
</script>

