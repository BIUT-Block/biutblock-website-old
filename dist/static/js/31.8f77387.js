webpackJsonp([31],{113:function(t,e,r){function a(t){r(389)}var o=r(23)(r(380),r(394),a,null,null);t.exports=o.exports},380:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});r(60);e.default={props:{formState:Object},data:function(){return{rules1:{title:[{required:!0,message:"请输入文字内容",trigger:"blur"},{min:2,max:15,message:"请输入2-15个字符",trigger:"blur"}],link:[{required:!0,message:"请填写备注",trigger:"blur"}]},rules:{alt:[{required:!0,message:"请输入广告备注",trigger:"blur"},{min:2,max:30,message:"请输入2-30个字符",trigger:"blur"}],link:[{required:!0,message:"请填写备注",trigger:"blur"}]}}},computed:{adsType:function(){return this.$store.getters.adsInfoForm.formData.type}},methods:{handleAvatarSuccess:function(t,e){this.formState.formData.sImg=t},beforeAvatarUpload:function(t){var e="image/jpeg"===t.type,r="image/png"===t.type,a="image/gif"===t.type,o=t.size/1024/1024<2;return e||r||a||this.$message.error("上传头像图片只能是 JPG,PNG,GIF 格式!"),o||this.$message.error("上传头像图片大小不能超过 2MB!"),(e||r||a)&&o},submitForm:function(t){var e=this;arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;var r=e.formState.formData,a=e.$store.getters.adsInfoForm,o=a.formData.items;if(e.formState.edit){for(var s=0;s<o.length;s++)o[s]._id==r._id&&(o[s]=r);e.$store.dispatch("adsInfoForm",a)}else o.push(r),e.$store.dispatch("adsInfoForm",a);e.$store.dispatch("hideAdsItemForm")})}}}},387:function(t,e,r){e=t.exports=r(106)(!1),e.push([t.i,"\n.avatar-uploader .el-upload {\n  border: 1px dashed #d9d9d9;\n  border-radius: 6px;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n}\n.avatar-uploader .el-upload:hover {\n  border-color: #409EFF;\n}\n.avatar-uploader-icon {\n  font-size: 28px;\n  color: #8c939d;\n  width: 200px;\n  height: 150px;\n  line-height: 150px;\n  text-align: center;\n}\n.avatar {\n  width: 200px;\n  height: 158px;\n  display: block;\n}\n",""])},389:function(t,e,r){var a=r(387);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);r(107)("9cd629d8",a,!0,{})},394:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"dr-adminGroupForm"},[r("el-dialog",{attrs:{width:"35%",size:"small",title:(t.formState.edit?"编辑":"添加")+("1"==t.adsType?"图片":"文本链接"),visible:t.formState.show,"close-on-click-modal":!1},on:{"update:visible":function(e){t.$set(t.formState,"show",e)}}},["1"==t.adsType?r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.formState.formData,rules:t.rules,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"描述",prop:"alt"}},[r("el-input",{attrs:{size:"small"},model:{value:t.formState.formData.alt,callback:function(e){t.$set(t.formState.formData,"alt",e)},expression:"formState.formData.alt"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"链接",prop:"link"}},[r("el-input",{attrs:{size:"small"},model:{value:t.formState.formData.link,callback:function(e){t.$set(t.formState.formData,"link",e)},expression:"formState.formData.link"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"上传",prop:"sImg"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/system/upload?type=images","show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload}},[t.formState.formData.sImg?r("img",{staticClass:"avatar",attrs:{src:t.formState.formData.sImg}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),r("el-form-item",[r("el-button",{attrs:{size:"medium",type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v(t._s(t.formState.edit?"更新":"保存"))])],1)],1):t._e(),t._v(" "),"0"==t.adsType?r("el-form",{ref:"ruleForm1",staticClass:"demo-ruleForm",attrs:{model:t.formState.formData,rules:t.rules1,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"文字内容",prop:"title"}},[r("el-input",{attrs:{size:"small"},model:{value:t.formState.formData.title,callback:function(e){t.$set(t.formState.formData,"title",e)},expression:"formState.formData.title"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"链接",prop:"link"}},[r("el-input",{attrs:{size:"small"},model:{value:t.formState.formData.link,callback:function(e){t.$set(t.formState.formData,"link",e)},expression:"formState.formData.link"}})],1),t._v(" "),r("el-form-item",[r("el-button",{attrs:{size:"smmediumall",type:"primary"},on:{click:function(e){t.submitForm("ruleForm1")}}},[t._v(t._s(t.formState.edit?"更新":"保存"))])],1)],1):t._e()],1)],1)},staticRenderFns:[]}}});