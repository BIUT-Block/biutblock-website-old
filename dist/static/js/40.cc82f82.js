webpackJsonp([40],{134:function(e,t,a){var s=a(23)(a(516),a(438),null,null,null);e.exports=s.exports},438:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"dr-contentTagForm"},[a("el-dialog",{attrs:{width:"35%",size:"small",title:"填写标签信息",visible:e.dialogState.show,"close-on-click-modal":!1},on:{"update:visible":function(t){e.$set(e.dialogState,"show",t)}}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.dialogState.formData,rules:e.rules,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"名称",prop:"name"}},[a("el-input",{attrs:{size:"small"},model:{value:e.dialogState.formData.name,callback:function(t){e.$set(e.dialogState.formData,"name",t)},expression:"dialogState.formData.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注",prop:"comments"}},[a("el-input",{attrs:{size:"small",type:"textarea"},model:{value:e.dialogState.formData.comments,callback:function(t){e.$set(e.dialogState.formData,"comments",t)},expression:"dialogState.formData.comments"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"medium",type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v(e._s(e.dialogState.edit?"更新":"保存"))])],1)],1)],1)],1)},staticRenderFns:[]}},516:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(60);t.default={props:{dialogState:Object,groups:Array},data:function(){return{rules:{name:[{required:!0,message:"请输入标签名称",trigger:"blur"},{min:1,max:12,message:"请输入1-12个非特殊字符",trigger:"blur"}],comments:[{required:!0,message:"请填写备注",trigger:"blur"},{min:2,max:30,message:"请输入5-30个字符",trigger:"blur"}]}}},methods:{confirm:function(){this.$store.dispatch("hideContentTagForm")},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;var a=t.dialogState.formData;t.dialogState.edit?s.a.updateContentTag(a).then(function(e){"success"===e.data.state?(t.$store.dispatch("hideContentTagForm"),t.$store.dispatch("getContentTagList"),t.$message({message:"更新成功",type:"success"})):t.$message.error(e.data.message)}):s.a.addContentTag(a).then(function(e){"success"===e.data.state?(t.$store.dispatch("hideContentTagForm"),t.$store.dispatch("getContentTagList"),t.$message({message:"添加成功",type:"success"})):t.$message.error(e.data.message)})})}}}}});