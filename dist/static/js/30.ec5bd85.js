webpackJsonp([30],{146:function(e,t,n){var i=n(11)(n(476),n(501),null,null,null);e.exports=i.exports},476:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(74);t.default={props:{dataList:Array,pageInfo:Object},data:function(){return{loading:!1,tableData3:this.$store.getters.regUserList.docs,multipleSelection:[]}},methods:{handleUserSelect:function(e){if(e&&e.length>0){var t=e.map(function(e,t){return e._id});this.multipleSelection=t,this.$emit("changeUserSelectList",t)}},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(e){this.multipleSelection=e},editUserInfo:function(e,t){var n=t[e];this.$store.dispatch("showRegUserForm",{edit:!0,formData:n})},deleteUser:function(e,t){var n=this;this.$confirm("此操作将永久删除该用户, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return i.a.deleteRegUser({ids:t[e]._id})}).then(function(e){"success"===e.data.state?(n.$store.dispatch("getRegUserList",n.pageInfo),n.$message({message:"删除成功",type:"success"})):n.$message.error(e.data.message)}).catch(function(e){n.$message({type:"info",message:"删除失败"+e})})}}}},501:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{align:"center",data:e.dataList,"tooltip-effect":"dark"},on:{"selection-change":e.handleUserSelect}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),n("el-table-column",{attrs:{prop:"userName",label:"用户名",width:"120"}}),e._v(" "),n("el-table-column",{attrs:{prop:"date",label:"注册时间","show-overflow-tooltip":""}}),e._v(" "),n("el-table-column",{attrs:{prop:"email",label:"邮箱","show-overflow-tooltip":""}}),e._v(" "),n("el-table-column",{attrs:{label:"操作",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"primary",plain:"",round:""},on:{click:function(n){e.editUserInfo(t.$index,e.dataList)}}},[n("i",{staticClass:"fa fa-edit"})]),e._v(" "),n("el-button",{attrs:{size:"mini",type:"danger",plain:"",round:"",icon:"el-icon-delete"},on:{click:function(n){e.deleteUser(t.$index,e.dataList)}}})]}}])})],1)],1)},staticRenderFns:[]}}});