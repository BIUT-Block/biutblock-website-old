webpackJsonp([56],{118:function(e,t,s){var r=s(24)(s(514),s(433),null,null,null);e.exports=r.exports},433:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"dr-adminGroupForm"},[s("el-dialog",{attrs:{width:"35%",size:"small",title:"分配资源",visible:e.roleState.show,"close-on-click-modal":!1},on:{"update:visible":function(t){e.$set(e.roleState,"show",t)}}},[s("el-tree",{ref:"tree",attrs:{data:e.treeData,"show-checkbox":"","node-key":"_id","highlight-current":"",props:e.defaultProps}}),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{size:"medium"},on:{click:e.closeTree}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{size:"medium",type:"primary"},on:{click:e.savePower}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]}},514:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(62);t.default={props:{roleState:Object,treeData:Array},data:function(){return{defaultProps:{children:"children",label:"label"}}},methods:{savePower:function(){var e=this,t=this.$refs.tree.getCheckedNodes(),s=[];t.length>0&&t.map(function(e,t){"1"==e.type&&s.push(e._id)});var o=this.roleState.formData;o.power=s,r.a.updateAdminGroup(o).then(function(t){"success"===t.data.state?(e.$store.dispatch("hideAdminGroupRoleForm"),e.$store.dispatch("getAdminGroupList"),e.$message({message:"更新成功,重新登录后权限生效",type:"success"})):e.$message.error(t.data.message)})},closeTree:function(){this.$store.dispatch("hideAdminGroupRoleForm")}},updated:function(){this.$refs.tree&&this.$refs.tree.setCheckedKeys(this.roleState.formData.power)}}}});