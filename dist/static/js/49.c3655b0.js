webpackJsonp([49],{134:function(t,e,a){var o=a(24)(a(530),a(440),null,null,null);t.exports=o.exports},440:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dr-contentMessageForm"},[a("el-dialog",{attrs:{width:"35%",size:"small",title:"留言回复",visible:t.dialogState.show,"close-on-click-modal":!1},on:{"update:visible":function(e){t.$set(t.dialogState,"show",e)}}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.dialogState.formData,rules:t.rules,"label-width":"90px"}},[a("el-form-item",{attrs:{label:"用户说"}},[t._v("\n                "+t._s(t.dialogState.parentformData.content)+"\n            ")]),t._v(" "),a("el-form-item",{attrs:{label:"回复",prop:"content"}},[a("el-input",{attrs:{size:"small",type:"textarea"},model:{value:t.dialogState.formData.content,callback:function(e){t.$set(t.dialogState.formData,"content",e)},expression:"dialogState.formData.content"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"medium",type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("回复")])],1)],1)],1)],1)},staticRenderFns:[]}},530:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(62);e.default={props:{dialogState:Object,groups:Array},data:function(){return{rules:{content:[{required:!0,message:"请填写留言",trigger:"blur"},{min:5,max:200,message:"请输入5-200个字符",trigger:"blur"}]}}},methods:{confirm:function(){this.$store.dispatch("hideContentMessageForm")},submitForm:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;var a=e.dialogState.parentformData,r={};r.relationMsgId=a._id,r.contentId=a.contentId._id,r.utype="1",a.author?r.replyAuthor=a.author._id:a.adminAuthor&&(r.adminReplyAuthor=a.adminAuthor._id),r.content=e.dialogState.formData.content,o.a.addContentMessage(r).then(function(t){"success"===t.data.state?(e.$store.dispatch("hideContentMessageForm"),e.$store.dispatch("getContentMessageList"),e.$message({message:"添加成功",type:"success"})):e.$message.error(t.data.message)})})}}}}});