webpackJsonp([47],{129:function(e,t,a){var o=a(23)(a(514),a(438),null,null,null);e.exports=o.exports},438:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"dr-AdminResourceForm"},[a("el-dialog",{attrs:{width:"35%",size:"small",title:"填写分类信息",visible:e.dialogState.show,"close-on-click-modal":!1},on:{"update:visible":function(t){e.$set(e.dialogState,"show",t)}}},[a("el-form",{ref:"cateRuleForm",staticClass:"demo-ruleForm",attrs:{model:e.dialogState.formData,rules:e.cateRules,"label-width":"120px"}},[a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:"children"===e.dialogState.type&&!e.dialogState.edit,expression:"dialogState.type==='children' && !dialogState.edit"}],attrs:{label:"父对象",prop:"label"}},[a("el-input",{attrs:{size:"small",disabled:!0},model:{value:e.dialogState.formData.parentObj.name,callback:function(t){e.$set(e.dialogState.formData.parentObj,"name",t)},expression:"dialogState.formData.parentObj.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"类别名称",prop:"name"}},[a("el-input",{attrs:{size:"small"},model:{value:e.dialogState.formData.name,callback:function(t){e.$set(e.dialogState.formData,"name",t)},expression:"dialogState.formData.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"显示",prop:"enable"}},[a("el-switch",{attrs:{"on-text":"是","off-text":"否"},model:{value:e.dialogState.formData.enable,callback:function(t){e.$set(e.dialogState.formData,"enable",t)},expression:"dialogState.formData.enable"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"SeoUrl",prop:"defaultUrl"}},[a("el-input",{attrs:{size:"small"},model:{value:e.dialogState.formData.defaultUrl,callback:function(t){e.$set(e.dialogState.formData,"defaultUrl",t)},expression:"dialogState.formData.defaultUrl"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"排序",prop:"sortId"}},[a("el-input-number",{attrs:{size:"small",min:1,max:50},on:{change:e.handleChange},model:{value:e.dialogState.formData.sortId,callback:function(t){e.$set(e.dialogState.formData,"sortId",t)},expression:"dialogState.formData.sortId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"关键字",prop:"keywords"}},[a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:e.dialogState.formData.keywords,callback:function(t){e.$set(e.dialogState.formData,"keywords",t)},expression:"dialogState.formData.keywords"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"描述",prop:"comments"}},[a("el-input",{attrs:{size:"small",type:"texarea"},model:{value:e.dialogState.formData.comments,callback:function(t){e.$set(e.dialogState.formData,"comments",t)},expression:"dialogState.formData.comments"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"medium",type:"primary"},on:{click:function(t){e.submitForm("cateRuleForm")}}},[e._v(e._s(e.dialogState.edit?"更新":"保存"))])],1)],1)],1)],1)},staticRenderFns:[]}},514:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a(61);t.default={props:{dialogState:Object},data:function(){return{cateRules:{name:[{required:!0,message:"请输入类别名称",trigger:"blur"},{min:2,max:20,message:"2-20个非特殊字符",trigger:"blur"}],defaultUrl:[{required:!0,message:"请输入seoUrl",trigger:"blur"}],comments:[{message:"请填写备注",trigger:"blur"},{min:4,max:100,message:"请输入4-100个字符",trigger:"blur"}]},options:[{value:"0",label:"基础菜单"},{value:"1",label:"操作和功能"}]}},methods:{handleChange:function(e){console.log(e)},confirm:function(){this.$store.dispatch("hideContentCategoryForm")},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;console.log("---formdatas--",t);var a=t.dialogState.formData;t.dialogState.edit?o.a.updateContentCategory(a).then(function(e){"success"===e.data.state?(t.$store.dispatch("hideContentCategoryForm"),t.$store.dispatch("getContentCategoryList"),t.$message({message:"更新成功",type:"success"})):t.$message.error(e.data.message)}):o.a.addContentCategory(a).then(function(e){"success"===e.data.state?(t.$store.dispatch("hideContentCategoryForm"),t.$store.dispatch("getContentCategoryList"),t.$message({message:"添加成功",type:"success"})):t.$message.error(e.data.message)})})}}}}});