webpackJsonp([43],{142:function(e,t,a){var n=a(24)(a(538),a(427),null,null,null);e.exports=n.exports},427:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{align:"center",data:e.dataList,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{prop:"walletId",label:"钱包地址",width:"380"}}),e._v(" "),a("el-table-column",{attrs:{prop:"myCode",label:"分享码"}}),e._v(" "),a("el-table-column",{attrs:{prop:"state",label:"校验状态","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("i",{class:t.row.hasSend?"fa fa-check-circle":"fa fa-minus-circle",style:t.row.hasSend?e.green:e.red})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"date",label:"更新时间"}})],1)],1)},staticRenderFns:[]}},538:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(62);t.default={props:{dataList:Array,pageInfo:Object},data:function(){return{loading:!1,multipleSelection:[],green:{color:"#13CE66"},red:{color:"#FF4949"}}},methods:{handleSelectionChange:function(e){this.multipleSelection=e},deleteSecCandy:function(e,t){var a=this;this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return n.a.deleteSecCandy({ids:t[e]._id})}).then(function(e){"success"===e.data.state?(a.$store.dispatch("getSecCandyWalletList",a.pageInfo),a.$message({message:"删除成功",type:"success"})):a.$message.error(e.data.message)}).catch(function(){a.$message({type:"info",message:"已取消删除"})})}}}}});