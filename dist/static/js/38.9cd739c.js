webpackJsonp([38],{138:function(e,t,a){var n=a(23)(a(520),a(424),null,null,null);e.exports=n.exports},424:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{align:"center",data:e.dataList,"tooltip-effect":"dark"},on:{"selection-change":e.handleSecCandyChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{prop:"passiveWallet",label:"分享者(钱包地址)",width:"380"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                "+e._s(t.row.passiveWallet.walletId)+"\n            ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"passiveCode",label:"用户名",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                "+e._s(t.row.passiveWallet.first_name?t.row.passiveWallet.first_name+t.row.passiveWallet.last_name:"无")+"\n            ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"wallets",label:"分享总数",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                "+e._s(t.row.wallets.length)+"\n            ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"wallets",label:"获得奖励"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-popover",{attrs:{trigger:"hover",placement:"top"}},[a("p",[e._v("状态: "+e._s(t.row.passiveWallet.hasSend?"已校验":"未校验"))]),e._v(" "),a("p",[e._v("有效分享: "+e._s(e.currentShareNum(t.row).currentShareNum)+"  次")]),e._v(" "),a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[a("el-tag",{attrs:{size:"medium",type:"success"}},[e._v(e._s(e.currentShareNum(t.row).currentShareCoin)+" SEC")])],1)])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"getCoins",label:"成功发放"}}),e._v(" "),a("el-table-column",{attrs:{label:"详情",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"primary",plain:"",round:""},on:{click:function(a){e.editSecCandy(t.$index,e.dataList)}}},[a("i",{staticClass:"fa fa-file-text"})])]}}])})],1)],1)},staticRenderFns:[]}},520:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(64),l=a.n(n),s=a(60);t.default={props:{dataList:Array,pageInfo:Object},data:function(){return{loading:!1,multipleSelection:[]}},computed:{},methods:{currentShareNum:function(e){var t=e.wallets,a=0,n=0,s=[];return e.passiveWallet.hasSend?(s=l()(t,function(e){return e.hasSend}),a=s.length>29?29:s.length,n=20*a+20):(a=0,n=0),{currentShareNum:a,currentShareCoin:n}},handleSecCandyChange:function(e){if(e&&e.length>0){var t=e.map(function(e,t){return e.id});this.multipleSelection=t,this.$emit("handleCandyChange",t)}},editSecCandy:function(e,t){var a=t[e];this.$store.dispatch("showSecCandyForm",{edit:!0,formData:a})},deleteSecCandy:function(e,t){var a=this;this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return s.a.deleteSecCandy({ids:t[e]._id})}).then(function(e){"success"===e.data.state?(a.$store.dispatch("getSecCandyList",a.pageInfo),a.$message({message:"删除成功",type:"success"})):a.$message.error(e.data.message)}).catch(function(){a.$message({type:"info",message:"已取消删除"})})}}}}});