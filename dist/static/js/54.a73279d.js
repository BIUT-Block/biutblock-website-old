webpackJsonp([54],{124:function(t,e,n){var a=n(24)(n(520),n(449),null,null,null);t.exports=a.exports},449:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{align:"center",data:t.dataList,"tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),n("el-table-column",{attrs:{prop:"name",label:"广告名",width:"120"}}),t._v(" "),n("el-table-column",{attrs:{prop:"type",label:"类型",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return["0"==e.row.type?n("span",[t._v("文字")]):t._e(),t._v(" "),"1"==e.row.type?n("span",[t._v("图片")]):t._e()]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"state",label:"显示",width:"100","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[n("i",{class:e.row.state?"fa fa-check-circle":"fa fa-minus-circle",style:e.row.state?t.green:t.red})]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"comments",label:"获取代码",width:"280","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s('<AdsPannel id="'+e.row._id+'" />'))])]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"comments",label:"广告描述","show-overflow-tooltip":""}}),t._v(" "),n("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini",type:"primary",plain:"",round:""},on:{click:function(n){t.editAdsInfo(e.$index,t.dataList)}}},[n("i",{staticClass:"fa fa-edit"})]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"danger",plain:"",round:"",icon:"el-icon-delete"},on:{click:function(n){t.deleteAds(e.$index,t.dataList)}}})]}}])})],1)],1)},staticRenderFns:[]}},520:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(62);e.default={props:{dataList:Array},data:function(){return{green:{color:"#13CE66"},red:{color:"#FF4949"}}},methods:{handleSelectionChange:function(t){this.multipleSelection=t},editAdsInfo:function(t,e){var n=e[t];this.$store.dispatch("adsInfoForm",{edit:!0,formData:n}),this.$router.push("/editAds/"+n._id)},deleteAds:function(t,e){var n=this;this.$confirm("此操作将永久删除该广告, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return a.a.delAds({ids:e[t]._id})}).then(function(t){"success"===t.data.state?(n.$store.dispatch("getAdsList"),n.$message({message:"删除成功",type:"success"})):n.$message.error(t.data.message)}).catch(function(){n.$message({type:"info",message:"已取消删除"})})}}}}});