webpackJsonp([38],{138:function(e,t,n){var a=n(23)(n(424),n(502),null,null,null);e.exports=a.exports},424:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(63),r=n.n(a),s=n(60);t.default={props:{dataList:Array,pageInfo:Object},data:function(){return{loading:!1,multipleSelection:[]}},computed:{},methods:{currentShareNum:function(e){var t=e.wallets,n=0,a=0,s=[];return e.passiveWallet.hasSend?(s=r()(t,function(e){return e.hasSend}),n=s.length>2?2:s.length,a=20*n+20):(n=0,a=0),{currentShareNum:n,currentShareCoin:a}},handleSelectionChange:function(e){this.multipleSelection=e},editSecCandy:function(e,t){var n=t[e];this.$store.dispatch("showSecCandyForm",{edit:!0,formData:n})},deleteSecCandy:function(e,t){var n=this;this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return s.a.deleteSecCandy({ids:t[e]._id})}).then(function(e){"success"===e.data.state?(n.$store.dispatch("getSecCandyList",n.pageInfo),n.$message({message:"删除成功",type:"success"})):n.$message.error(e.data.message)}).catch(function(){n.$message({type:"info",message:"已取消删除"})})}}}},502:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{align:"center",data:e.dataList,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),n("el-table-column",{attrs:{prop:"passiveWallet",label:"被分享(钱包地址)",width:"380"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                "+e._s(t.row.passiveWallet.walletId)+"\n            ")]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"wallets",label:"被分享总数",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                "+e._s(t.row.wallets.length)+"\n            ")]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"wallets",label:"获得奖励",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-popover",{attrs:{trigger:"hover",placement:"top"}},[n("p",[e._v("状态: "+e._s(t.row.passiveWallet.hasSend?"未校验":"已校验"))]),e._v(" "),n("p",[e._v("有效分享: "+e._s(e.currentShareNum(t.row).currentShareNum)+"  次")]),e._v(" "),n("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[n("el-tag",{attrs:{size:"medium",type:"success"}},[e._v(e._s(e.currentShareNum(t.row).currentShareCoin)+" SEC")])],1)])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"详情",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"primary",plain:"",round:""},on:{click:function(n){e.editSecCandy(t.$index,e.dataList)}}},[n("i",{staticClass:"fa fa-edit"})])]}}])})],1)],1)},staticRenderFns:[]}}});