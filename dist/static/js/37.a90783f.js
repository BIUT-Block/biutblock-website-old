webpackJsonp([37],{139:function(t,e,a){var l=a(23)(a(431),a(499),null,null,null);t.exports=l.exports},431:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a(60);e.default={props:{dialogState:Object,groups:Array},data:function(){return{green:{color:"#13CE66",fontWeight:"bold"},gray:{color:"gray"}}},methods:{confirm:function(){this.$store.dispatch("hideSecCandyDetails")}}}},499:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dr-contentTagForm"},[a("el-dialog",{attrs:{width:"35%",size:"small",title:"被分享钱包列表",visible:t.dialogState.show,"close-on-click-modal":!1},on:{"update:visible":function(e){t.$set(t.dialogState,"show",e)}}},[t.dialogState.formData&&t.dialogState.formData.wallets&&t.dialogState.formData.wallets.length>0?a("div",[a("ol",t._l(t.dialogState.formData.wallets,function(e){return a("li",{key:e._id},[a("span",{style:e.hasSend?t.green:t.gray},[t._v(t._s(e.walletId))])])}))]):a("div",[t._v("\n            暂无记录\n        ")])])],1)},staticRenderFns:[]}}});