webpackJsonp([30],{109:function(e,t,s){function a(e){s(321)}var n=s(23)(s(319),s(322),a,null,null);e.exports=n.exports},319:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(111),n=s.n(a),i=s(62);t.default={props:{pageInfo:Object,type:String,ids:Array},data:function(){return{systemModelTypes:[{value:"all",label:"全部"},{value:"h5-exception",label:"h5异常"},{value:"node-exception",label:"nodejs异常"},{value:"login",label:"系统登录"},{value:"sendMessage",label:"短信发送"},{value:"forbiddenIP",label:"IP禁止"}],targetSysLogType:"all",targetSecCandyList:"all",secCandyTypes:[{value:"all",label:"全部"},{value:"2",label:"待审核"}],loadingState:!1,formState:{show:!1},searchkey:""}},methods:{selectSysLogType:function(e){this.targetSecCandyList=e,"all"==e?this.$store.dispatch("getSecCandyCodeList"):this.$store.dispatch("getSecCandyCodeList",{hasValidate:"2"})},selectSecCandyList:function(e){this.targetSysLogType=e,"all"==e?this.$store.dispatch("getSystemLogsList"):this.$store.dispatch("getSystemLogsList",{type:e})},searchResult:function(e){var t=this.pageInfo?this.pageInfo.searchkey:"",s=this.pageInfo?this.pageInfo.hasValidate:"";"content"==this.type?this.$store.dispatch("getContentList",{searchkey:t}):"contentTag"==this.type?this.$store.dispatch("getContentTagList",{searchkey:t}):"contentMessage"==this.type?this.$store.dispatch("getContentMessageList",{searchkey:t}):"regUser"==this.type?this.$store.dispatch("getRegUserList",{searchkey:t}):"secCandyCode"==this.type?this.$store.dispatch("getSecCandyCodeList",{searchkey:t,hasValidate:s}):"secCandyWallet"==this.type?this.$store.dispatch("getSecCandyWalletList",{searchkey:t}):"secCandyWalletLogs"==this.type&&this.$store.dispatch("getSecCandyWalletLogsList",{searchkey:t})},addUser:function(){this.$store.dispatch("showAdminUserForm")},addRole:function(){this.$store.dispatch("showAdminGroupForm")},addResource:function(){this.$store.dispatch("showAdminResourceForm",{type:"root",formData:{parentId:"0"}})},addContent:function(){this.$store.dispatch("showContentForm"),this.$router.push("/addContent")},addAds:function(){this.$store.dispatch("adsInfoForm",{edit:!1,formData:{}}),this.$router.push("/addAds")},addSysAnnounce:function(){this.$store.dispatch("showContentForm"),this.$router.push("/addSysAnnounce")},addTopCates:function(){this.$store.dispatch("showContentCategoryForm",{type:"root",formData:{parentId:"0"}})},clearSystemOptionLogs:function(){var e=this;this.$confirm("此操作将清空所有日志, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return i.a.clearSystemOptionLogs()}).then(function(t){"success"===t.data.state?(e.$store.dispatch("getSystemLogsList"),e.$message({message:"清空日志成功",type:"success"})):e.$message.error(t.data.message)}).catch(function(t){e.$message({type:"info",message:"已取消删除"})})},branchDelete:function(e){var t=this,s=this,a=void 0;if("msg"===e?a="留言":"user"===e?a="用户":"systemlogs"===e?a="系统操作日志":"systemnotify"===e&&(a="系统消息"),n()(s.ids))return this.$message({type:"info",message:"请选择指定目标！"}),!1;this.$confirm("此操作将永久删除这些"+a+", 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t=s.ids.join();return"msg"===e?i.a.deleteContentMessage({ids:t}):"user"===e?i.a.deleteRegUser({ids:t}):"systemlogs"===e?i.a.deleteSystemOptionLogs({ids:t}):"systemnotify"===e?i.a.deleteSystemNotify({ids:t}):void 0}).then(function(s){"success"===s.data.state?("msg"===e?t.$store.dispatch("getContentMessageList"):"user"===e?t.$store.dispatch("getRegUserList"):"systemlogs"===e?t.$store.dispatch("getSystemLogsList"):"systemnotify"===e&&t.$store.dispatch("getSystemNotifyList"),t.$message({message:a+"删除成功",type:"success"})):t.$message.error(s.data.message)}).catch(function(e){t.$message({type:"info",message:"已取消删除"})})},branchSendCoin:function(e){var t=this,s=this.pageInfo?this.pageInfo.searchkey:"",a=this.pageInfo?this.pageInfo.hasValidate:"",o=this;if(n()(o.ids))return this.$message({type:"info",message:"请选择指定目标！"}),!1;this.$confirm("您即将给勾选的用户发币, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e=o.ids.join();return i.a.sendCoinsToUsers({ids:e})}).then(function(e){"success"===e.data.state?(t.$message({message:"请求已发出！",type:"success"}),t.$store.dispatch("getSecCandyCodeList",{searchkey:s,hasValidate:a})):t.$message.error(e.data.message)}).catch(function(e){t.$message({type:"info",message:"已取消删除"})})},addTag:function(){this.$store.dispatch("showContentTagForm")},delUser:function(){},bakUpData:function(){var e=this;this.$confirm("您即将执行数据备份操作, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return e.loadingState=!0,i.a.bakUpData()}).then(function(t){"success"===t.data.state?(e.loadingState=!1,e.$store.dispatch("getBakDateList"),e.$message({message:"数据备份成功",type:"success"})):e.$message.error(t.data.message)}).catch(function(t){e.$message({type:"info",message:"数据备份失败:"+t})})},setHasRead:function(){var e=this;if(n()(this.ids))return this.$message({type:"info",message:"请选择指定目标！"}),!1;var t=this.ids.join();i.a.setNoticeRead({ids:t}).then(function(t){if("success"===t.data.state){e.$store.dispatch("getSystemNotifyList");var s=e.$store.getters.loginState.noticeCounts;e.$store.dispatch("loginState",{noticeCounts:s-e.ids.length})}else e.$message.error(t.data.message)})}},components:{}}},320:function(e,t,s){t=e.exports=s(107)(!1),t.push([e.i,"\n.option-button {\n  display: inline-block;\n}\n",""])},321:function(e,t,s){var a=s(320);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);s(108)("c17294dc",a,!0,{})},322:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"dr-toolbar"},[s("div",{staticClass:"option-button"},["adminGroup"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:e.addRole}},[s("i",{staticClass:"fa fa-fw fa-plus",attrs:{"aria-hidden":"true"}})])],1):"adminUser"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:e.addUser}},[s("i",{staticClass:"fa fa-fw fa-plus"})])],1):"adminResource"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:e.addResource}},[s("i",{staticClass:"fa fa-fw fa-plus",attrs:{"aria-hidden":"true"}})])],1):"content"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:e.addContent}},[s("i",{staticClass:"fa fa-fw fa-plus",attrs:{"aria-hidden":"true"}})])],1):"contentCategory"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:e.addTopCates}},[s("i",{staticClass:"fa fa-fw fa-plus",attrs:{"aria-hidden":"true"}})])],1):"contentMessage"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"danger",plain:"",round:""},on:{click:function(t){e.branchDelete("msg")}}},[s("i",{staticClass:"fa fa-fw fa-trash-o"})])],1):"contentTag"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:e.addTag}},[s("i",{staticClass:"fa fa-fw fa-plus",attrs:{"aria-hidden":"true"}})])],1):"regUser"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"danger",plain:"",round:""},on:{click:function(t){e.branchDelete("user")}}},[s("i",{staticClass:"fa fa-fw fa-trash-o"})])],1):"backUpData"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:"",loading:e.loadingState},on:{click:e.bakUpData}},[s("i",{staticClass:"fa fa-fw fa-cloud-download",attrs:{"aria-hidden":"true"}})])],1):"systemOptionLogs"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"danger",plain:"",round:""},on:{click:function(t){e.branchDelete("systemlogs")}}},[s("i",{staticClass:"fa fa-fw fa-trash-o"})]),e._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"清空所有日志",placement:"right-start"}},[s("el-button",{attrs:{size:"small",type:"warning",plain:"",round:""},on:{click:e.clearSystemOptionLogs}},[s("i",{staticClass:"fa fa-fw fa-window-restore"})])],1)],1):"systemNotify"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:function(t){e.setHasRead()}}},[s("i",{staticClass:"fa fa-fw fa-eye",attrs:{"aria-hidden":"true"}})]),e._v(" "),s("el-button",{attrs:{size:"small",type:"danger",plain:"",round:""},on:{click:function(t){e.branchDelete("systemnotify")}}},[s("i",{staticClass:"fa fa-fw fa-trash-o"})])],1):"systemAnnounce"===e.type?s("div",[s("el-button",{attrs:{type:"primary",size:"small",plain:"",round:""},on:{click:e.addSysAnnounce}},[s("i",{staticClass:"fa fa-fw fa-plus"})])],1):"ads"===e.type?s("div",[s("el-button",{attrs:{type:"primary",size:"small",plain:"",round:""},on:{click:e.addAds}},[s("i",{staticClass:"fa fa-fw fa-plus"})])],1):"secCandyCode"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:function(t){e.branchSendCoin("coins")}}},[s("i",{staticClass:"fa fa-fw fa-btc"})])],1):e._e()]),e._v(" "),s("div",{staticClass:"dr-searchInput"},["content"===e.type?s("div",[s("el-input",{attrs:{size:"small",placeholder:"请输入关键字","suffix-icon":"el-icon-search","on-icon-click":e.searchResult},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.searchResult(t):null}},model:{value:e.pageInfo.searchkey,callback:function(t){e.$set(e.pageInfo,"searchkey",t)},expression:"pageInfo.searchkey"}})],1):"contentTag"===e.type?s("div",[s("el-input",{attrs:{size:"small",placeholder:"标签名称","suffix-icon":"el-icon-search","on-icon-click":e.searchResult},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.searchResult(t):null}},model:{value:e.pageInfo.searchkey,callback:function(t){e.$set(e.pageInfo,"searchkey",t)},expression:"pageInfo.searchkey"}})],1):"contentMessage"===e.type?s("div",[s("el-input",{attrs:{size:"small",placeholder:"留言内容","suffix-icon":"el-icon-search","on-icon-click":e.searchResult},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.searchResult(t):null}},model:{value:e.pageInfo.searchkey,callback:function(t){e.$set(e.pageInfo,"searchkey",t)},expression:"pageInfo.searchkey"}})],1):"regUser"===e.type?s("div",[s("el-input",{attrs:{size:"small",placeholder:"请输入用户名","suffix-icon":"el-icon-search","on-icon-click":e.searchResult},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.searchResult(t):null}},model:{value:e.pageInfo.searchkey,callback:function(t){e.$set(e.pageInfo,"searchkey",t)},expression:"pageInfo.searchkey"}})],1):"systemOptionLogs"===e.type?s("div",[s("el-select",{attrs:{size:"small",placeholder:"请选择日志类别"},on:{change:e.selectSysLogType},model:{value:e.targetSysLogType,callback:function(t){e.targetSysLogType=t},expression:"targetSysLogType"}},e._l(e.systemModelTypes,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1):"secCandyCode"===e.type?s("div",[s("el-input",{staticStyle:{width:"350px",float:"right"},attrs:{size:"small",placeholder:"钱包或分享码","suffix-icon":"el-icon-search","on-icon-click":e.searchResult},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.searchResult(t):null}},model:{value:e.pageInfo.searchkey,callback:function(t){e.$set(e.pageInfo,"searchkey",t)},expression:"pageInfo.searchkey"}}),e._v(" "),s("el-select",{attrs:{size:"small",placeholder:"请选择"},on:{change:e.selectSysLogType},model:{value:e.targetSecCandyList,callback:function(t){e.targetSecCandyList=t},expression:"targetSecCandyList"}},e._l(e.secCandyTypes,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1):"secCandyWallet"===e.type?s("div",[s("el-input",{attrs:{size:"small",placeholder:"钱包地址","suffix-icon":"el-icon-search","on-icon-click":e.searchResult},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.searchResult(t):null}},model:{value:e.pageInfo.searchkey,callback:function(t){e.$set(e.pageInfo,"searchkey",t)},expression:"pageInfo.searchkey"}})],1):"secCandyWalletLogs"===e.type?s("div",[s("el-input",{staticStyle:{width:"350px",float:"right"},attrs:{size:"small",placeholder:"钱包地址","suffix-icon":"el-icon-search","on-icon-click":e.searchResult},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.searchResult(t):null}},model:{value:e.pageInfo.searchkey,callback:function(t){e.$set(e.pageInfo,"searchkey",t)},expression:"pageInfo.searchkey"}})],1):e._e()])])},staticRenderFns:[]}}});