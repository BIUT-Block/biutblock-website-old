webpackJsonp([14,29,31,42,43],{108:function(e,t,s){function a(e){s(329)}var n=s(23)(s(327),s(330),a,null,null);e.exports=n.exports},109:function(e,t,s){function a(e){s(334)}var n=s(23)(s(331),s(333),a,null,null);e.exports=n.exports},131:function(e,t,s){var a=s(23)(s(423),s(511),null,null,null);e.exports=a.exports},132:function(e,t,s){var a=s(23)(s(424),s(510),null,null,null);e.exports=a.exports},158:function(e,t,s){function a(e){s(596)}var n=s(23)(s(537),s(580),a,null,null);e.exports=n.exports},327:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(110),n=s.n(a),o=s(60);t.default={props:{pageInfo:Object,type:String,ids:Array},data:function(){return{systemModelTypes:[{value:"all",label:"全部"},{value:"h5-exception",label:"h5异常"},{value:"node-exception",label:"nodejs异常"},{value:"login",label:"系统登录"},{value:"sendMessage",label:"短信发送"}],targetSysLogType:"all",loadingState:!1,formState:{show:!1},searchkey:""}},methods:{selectSysLogType:function(e){this.targetSysLogType=e,"all"==e?this.$store.dispatch("getSystemLogsList"):this.$store.dispatch("getSystemLogsList",{type:e})},searchResult:function(e){var t=this.pageInfo?this.pageInfo.searchkey:"";"content"==this.type?this.$store.dispatch("getContentList",{searchkey:t}):"contentTag"==this.type?this.$store.dispatch("getContentTagList",{searchkey:t}):"contentMessage"==this.type?this.$store.dispatch("getContentMessageList",{searchkey:t}):"regUser"==this.type?this.$store.dispatch("getRegUserList",{searchkey:t}):"secCandyCode"==this.type?this.$store.dispatch("getSecCandyCodeList",{searchkey:t}):"secCandyWallet"==this.type&&this.$store.dispatch("getSecCandyWalletList",{searchkey:t})},addUser:function(){this.$store.dispatch("showAdminUserForm")},addRole:function(){this.$store.dispatch("showAdminGroupForm")},addResource:function(){this.$store.dispatch("showAdminResourceForm",{type:"root",formData:{parentId:"0"}})},addContent:function(){this.$store.dispatch("showContentForm"),this.$router.push("/addContent")},addAds:function(){this.$store.dispatch("adsInfoForm",{edit:!1,formData:{}}),this.$router.push("/addAds")},addSysAnnounce:function(){this.$store.dispatch("showContentForm"),this.$router.push("/addSysAnnounce")},addTopCates:function(){this.$store.dispatch("showContentCategoryForm",{type:"root",formData:{parentId:"0"}})},clearSystemOptionLogs:function(){var e=this;this.$confirm("此操作将清空所有日志, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return o.a.clearSystemOptionLogs()}).then(function(t){"success"===t.data.state?(e.$store.dispatch("getSystemLogsList"),e.$message({message:"清空日志成功",type:"success"})):e.$message.error(t.data.message)}).catch(function(t){e.$message({type:"info",message:"已取消删除"})})},branchDelete:function(e){var t=this,s=this,a=void 0;if("msg"===e?a="留言":"user"===e?a="用户":"systemlogs"===e?a="系统操作日志":"systemnotify"===e&&(a="系统消息"),n()(s.ids))return this.$message({type:"info",message:"请选择指定目标！"}),!1;this.$confirm("此操作将永久删除这些"+a+", 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t=s.ids.join();return"msg"===e?o.a.deleteContentMessage({ids:t}):"user"===e?o.a.deleteRegUser({ids:t}):"systemlogs"===e?o.a.deleteSystemOptionLogs({ids:t}):"systemnotify"===e?o.a.deleteSystemNotify({ids:t}):void 0}).then(function(s){"success"===s.data.state?("msg"===e?t.$store.dispatch("getContentMessageList"):"user"===e?t.$store.dispatch("getRegUserList"):"systemlogs"===e?t.$store.dispatch("getSystemLogsList"):"systemnotify"===e&&t.$store.dispatch("getSystemNotifyList"),t.$message({message:a+"删除成功",type:"success"})):t.$message.error(s.data.message)}).catch(function(e){t.$message({type:"info",message:"已取消删除"})})},addTag:function(){this.$store.dispatch("showContentTagForm")},delUser:function(){},bakUpData:function(){var e=this;this.$confirm("您即将执行数据备份操作, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return e.loadingState=!0,o.a.bakUpData()}).then(function(t){"success"===t.data.state?(e.loadingState=!1,e.$store.dispatch("getBakDateList"),e.$message({message:"数据备份成功",type:"success"})):e.$message.error(t.data.message)}).catch(function(t){e.$message({type:"info",message:"数据备份失败:"+t})})},setHasRead:function(){var e=this;if(n()(this.ids))return this.$message({type:"info",message:"请选择指定目标！"}),!1;var t=this.ids.join();o.a.setNoticeRead({ids:t}).then(function(t){if("success"===t.data.state){e.$store.dispatch("getSystemNotifyList");var s=e.$store.getters.loginState.noticeCounts;e.$store.dispatch("loginState",{noticeCounts:s-e.ids.length})}else e.$message.error(t.data.message)})}},components:{}}},328:function(e,t,s){t=e.exports=s(106)(!1),t.push([e.i,"\n.option-button {\n  display: inline-block;\n}\n",""])},329:function(e,t,s){var a=s(328);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);s(107)("abb72f62",a,!0,{})},330:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"dr-toolbar"},[s("div",{staticClass:"option-button"},["adminGroup"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:e.addRole}},[s("i",{staticClass:"fa fa-fw fa-plus",attrs:{"aria-hidden":"true"}})])],1):"adminUser"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:e.addUser}},[s("i",{staticClass:"fa fa-fw fa-plus"})])],1):"adminResource"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:e.addResource}},[s("i",{staticClass:"fa fa-fw fa-plus",attrs:{"aria-hidden":"true"}})])],1):"content"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:e.addContent}},[s("i",{staticClass:"fa fa-fw fa-plus",attrs:{"aria-hidden":"true"}})])],1):"contentCategory"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:e.addTopCates}},[s("i",{staticClass:"fa fa-fw fa-plus",attrs:{"aria-hidden":"true"}})])],1):"contentMessage"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"danger",plain:"",round:""},on:{click:function(t){e.branchDelete("msg")}}},[s("i",{staticClass:"fa fa-fw fa-trash-o"})])],1):"contentTag"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:e.addTag}},[s("i",{staticClass:"fa fa-fw fa-plus",attrs:{"aria-hidden":"true"}})])],1):"regUser"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"danger",plain:"",round:""},on:{click:function(t){e.branchDelete("user")}}},[s("i",{staticClass:"fa fa-fw fa-trash-o"})])],1):"backUpData"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:"",loading:e.loadingState},on:{click:e.bakUpData}},[s("i",{staticClass:"fa fa-fw fa-cloud-download",attrs:{"aria-hidden":"true"}})])],1):"systemOptionLogs"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"danger",plain:"",round:""},on:{click:function(t){e.branchDelete("systemlogs")}}},[s("i",{staticClass:"fa fa-fw fa-trash-o"})]),e._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"清空所有日志",placement:"right-start"}},[s("el-button",{attrs:{size:"small",type:"warning",plain:"",round:""},on:{click:e.clearSystemOptionLogs}},[s("i",{staticClass:"fa fa-fw fa-window-restore"})])],1)],1):"systemNotify"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:function(t){e.setHasRead()}}},[s("i",{staticClass:"fa fa-fw fa-eye",attrs:{"aria-hidden":"true"}})]),e._v(" "),s("el-button",{attrs:{size:"small",type:"danger",plain:"",round:""},on:{click:function(t){e.branchDelete("systemnotify")}}},[s("i",{staticClass:"fa fa-fw fa-trash-o"})])],1):"systemAnnounce"===e.type?s("div",[s("el-button",{attrs:{type:"primary",size:"small",plain:"",round:""},on:{click:e.addSysAnnounce}},[s("i",{staticClass:"fa fa-fw fa-plus"})])],1):"ads"===e.type?s("div",[s("el-button",{attrs:{type:"primary",size:"small",plain:"",round:""},on:{click:e.addAds}},[s("i",{staticClass:"fa fa-fw fa-plus"})])],1):e._e()]),e._v(" "),s("div",{staticClass:"dr-searchInput"},["content"===e.type?s("div",[s("el-input",{attrs:{size:"small",placeholder:"请输入关键字","suffix-icon":"el-icon-search","on-icon-click":e.searchResult},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.searchResult(t):null}},model:{value:e.pageInfo.searchkey,callback:function(t){e.$set(e.pageInfo,"searchkey",t)},expression:"pageInfo.searchkey"}})],1):"contentTag"===e.type?s("div",[s("el-input",{attrs:{size:"small",placeholder:"标签名称","suffix-icon":"el-icon-search","on-icon-click":e.searchResult},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.searchResult(t):null}},model:{value:e.pageInfo.searchkey,callback:function(t){e.$set(e.pageInfo,"searchkey",t)},expression:"pageInfo.searchkey"}})],1):"contentMessage"===e.type?s("div",[s("el-input",{attrs:{size:"small",placeholder:"留言内容","suffix-icon":"el-icon-search","on-icon-click":e.searchResult},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.searchResult(t):null}},model:{value:e.pageInfo.searchkey,callback:function(t){e.$set(e.pageInfo,"searchkey",t)},expression:"pageInfo.searchkey"}})],1):"regUser"===e.type?s("div",[s("el-input",{attrs:{size:"small",placeholder:"请输入用户名","suffix-icon":"el-icon-search","on-icon-click":e.searchResult},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.searchResult(t):null}},model:{value:e.pageInfo.searchkey,callback:function(t){e.$set(e.pageInfo,"searchkey",t)},expression:"pageInfo.searchkey"}})],1):"systemOptionLogs"===e.type?s("div",[s("el-select",{attrs:{size:"small",placeholder:"请选择日志类别"},on:{change:e.selectSysLogType},model:{value:e.targetSysLogType,callback:function(t){e.targetSysLogType=t},expression:"targetSysLogType"}},e._l(e.systemModelTypes,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1):"secCandyCode"===e.type?s("div",[s("el-input",{attrs:{size:"small",placeholder:"分享码","suffix-icon":"el-icon-search","on-icon-click":e.searchResult},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.searchResult(t):null}},model:{value:e.pageInfo.searchkey,callback:function(t){e.$set(e.pageInfo,"searchkey",t)},expression:"pageInfo.searchkey"}})],1):"secCandyWallet"===e.type?s("div",[s("el-input",{attrs:{size:"small",placeholder:"钱包地址","suffix-icon":"el-icon-search","on-icon-click":e.searchResult},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.searchResult(t):null}},model:{value:e.pageInfo.searchkey,callback:function(t){e.$set(e.pageInfo,"searchkey",t)},expression:"pageInfo.searchkey"}})],1):e._e()])])},staticRenderFns:[]}},331:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{pageInfo:Object,pageType:String},methods:{handleSizeChange:function(e){console.log("每页 "+e+" 条"),this.$store.dispatch("getAdminUserList",{pageSize:e})},handleCurrentChange:function(e){console.log("当前页: "+e);var t=this.pageInfo?this.pageInfo.searchkey:"";"content"===this.pageType?this.$store.dispatch("getContentList",{current:e,searchkey:t}):"adminUser"===this.pageType?this.$store.dispatch("getAdminUserList",{current:e,searchkey:t}):"adminGroup"===this.pageType?this.$store.dispatch("getAdminGroupList",{current:e,searchkey:t}):"contentMessage"===this.pageType?this.$store.dispatch("getContentMessageList",{current:e,searchkey:t}):"contentTag"===this.pageType?this.$store.dispatch("getContentTagList",{current:e,searchkey:t}):"regUser"===this.pageType?this.$store.dispatch("getRegUserList",{current:e,searchkey:t}):"backUpData"===this.pageType?this.$store.dispatch("getBakDateList",{current:e,searchkey:t}):"systemOptionLogs"===this.pageType?this.$store.dispatch("getSystemLogsList",{current:e,searchkey:t}):"systemNotify"===this.pageType?this.$store.dispatch("getSystemNotifyList",{current:e,searchkey:t}):"systemAnnounce"===this.pageType?this.$store.dispatch("getSystemAnnounceList",{current:e,searchkey:t}):"ads"===this.pageType?this.$store.dispatch("getAdsList",{current:e,searchkey:t}):"secCandyCode"===this.pageType?this.$store.dispatch("getSecCandyCodeList",{current:e,searchkey:t}):"secCandyWallet"===this.pageType&&this.$store.dispatch("getSecCandyWalletList",{current:e,searchkey:t})}},data:function(){return{}}}},332:function(e,t,s){t=e.exports=s(106)(!1),t.push([e.i,".dr-pagination{text-align:center;margin:15px auto}",""])},333:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"block dr-pagination"},[e.pageInfo?s("div",[s("el-pagination",{attrs:{"current-page":e.pageInfo.current,"page-size":e.pageInfo.pageSize,layout:"total, prev, pager, next",total:e.pageInfo.totalItems},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.pageInfo,"current",t)}}})],1):e._e()])},staticRenderFns:[]}},334:function(e,t,s){var a=s(332);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);s(107)("2573508f",a,!0,{})},423:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(60);t.default={props:{dataList:Array,pageInfo:Object},data:function(){return{loading:!1,multipleSelection:[]}},methods:{handleMsgSelectionChange:function(e){if(e&&e.length>0){var t=e.map(function(e,t){return e._id});this.multipleSelection=t,this.$emit("changeMsgSelectList",t)}},replyContentMessage:function(e,t){var s=t[e];this.$store.dispatch("showContentMessageForm",{edit:!0,parentformData:s})},deleteContentMessage:function(e,t){var s=this;this.$confirm("此操作将永久删除该留言, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return a.a.deleteContentMessage({ids:t[e]._id})}).then(function(e){"success"===e.data.state?(s.$store.dispatch("getContentMessageList",s.pageInfo),s.$message({message:"删除成功",type:"success"})):s.$message.error(e.data.message)}).catch(function(e){s.$message({type:"info",message:"已取消删除"+e})})}}}},424:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(60);t.default={props:{dialogState:Object,groups:Array},data:function(){return{rules:{content:[{required:!0,message:"请填写留言",trigger:"blur"},{min:5,max:200,message:"请输入5-200个字符",trigger:"blur"}]}}},methods:{confirm:function(){this.$store.dispatch("hideContentMessageForm")},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;var s=t.dialogState.parentformData,n={};n.relationMsgId=s._id,n.contentId=s.contentId._id,n.utype="1",s.author?n.replyAuthor=s.author._id:s.adminAuthor&&(n.adminReplyAuthor=s.adminAuthor._id),n.content=t.dialogState.formData.content,a.a.addContentMessage(n).then(function(e){"success"===e.data.state?(t.$store.dispatch("hideContentMessageForm"),t.$store.dispatch("getContentMessageList"),t.$message({message:"添加成功",type:"success"})):t.$message.error(e.data.message)})})}}}},510:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"dr-contentMessageForm"},[s("el-dialog",{attrs:{width:"35%",size:"small",title:"留言回复",visible:e.dialogState.show,"close-on-click-modal":!1},on:{"update:visible":function(t){e.$set(e.dialogState,"show",t)}}},[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.dialogState.formData,rules:e.rules,"label-width":"90px"}},[s("el-form-item",{attrs:{label:"用户说"}},[e._v("\n                "+e._s(e.dialogState.parentformData.content)+"\n            ")]),e._v(" "),s("el-form-item",{attrs:{label:"回复",prop:"content"}},[s("el-input",{attrs:{size:"small",type:"textarea"},model:{value:e.dialogState.formData.content,callback:function(t){e.$set(e.dialogState.formData,"content",t)},expression:"dialogState.formData.content"}})],1),e._v(" "),s("el-form-item",[s("el-button",{attrs:{size:"medium",type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("回复")])],1)],1)],1)],1)},staticRenderFns:[]}},511:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{align:"center",data:e.dataList,"tooltip-effect":"dark"},on:{"selection-change":e.handleMsgSelectionChange}},[s("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),s("el-table-column",{attrs:{prop:"contentId.stitle",label:"文章标题",width:"200"}}),e._v(" "),s("el-table-column",{attrs:{prop:"content",label:"留言内容",width:"280","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("cutWords")(t.row.content,20)))]}}])}),e._v(" "),s("el-table-column",{attrs:{prop:"author",label:"留言者"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s("0"===t.row.utype?t.row.author?t.row.author.userName:"匿名":t.row.adminAuthor?t.row.adminAuthor.userName:""))]}}])}),e._v(" "),s("el-table-column",{attrs:{prop:"replyAuthor",label:"关联用户(被回复)"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.replyAuthor?t.row.replyAuthor.userName:t.row.adminReplyAuthor?t.row.adminReplyAuthor.userName:""))]}}])}),e._v(" "),s("el-table-column",{attrs:{prop:"date",label:"时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.date))]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"操作",width:"150",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{size:"mini",type:"primary",plain:"",round:""},on:{click:function(s){e.replyContentMessage(t.$index,e.dataList)}}},[s("i",{staticClass:"fa fa-mail-reply",attrs:{"aria-hidden":"true"}})]),e._v(" "),s("el-button",{attrs:{size:"mini",type:"danger",plain:"",round:"",icon:"el-icon-delete"},on:{click:function(s){e.deleteContentMessage(t.$index,e.dataList)}}})]}}])})],1)],1)},staticRenderFns:[]}},537:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(19),n=s.n(a),o=s(132),i=s.n(o),r=s(131),c=s.n(r),l=s(108),u=s.n(l),d=s(109),p=s.n(d),f=s(61);t.default={name:"index",data:function(){return{selectlist:[]}},components:{DataTable:c.a,TopBar:u.a,MessageForm:i.a,Pagination:p.a},methods:{changeSelect:function(e){this.selectlist=e}},computed:n()({},s.i(f.a)(["contentMessageList"]),{formState:function(){return this.$store.getters.contentMessageFormState}}),mounted:function(){this.$store.dispatch("getContentMessageList")}}},558:function(e,t,s){t=e.exports=s(106)(!1),t.push([e.i,"",""])},580:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"adminUser"},[s("MessageForm",{attrs:{dialogState:e.formState}}),e._v(" "),s("el-row",{staticClass:"dr-datatable"},[s("el-col",{attrs:{span:24}},[s("TopBar",{attrs:{type:"contentMessage",ids:e.selectlist,pageInfo:e.contentMessageList.pageInfo}}),e._v(" "),s("DataTable",{attrs:{dataList:e.contentMessageList.docs,pageInfo:e.contentMessageList.pageInfo},on:{changeMsgSelectList:e.changeSelect}}),e._v(" "),s("Pagination",{attrs:{pageInfo:e.contentMessageList.pageInfo,pageType:"contentMessage"}})],1)],1)],1)},staticRenderFns:[]}},596:function(e,t,s){var a=s(558);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);s(107)("630206ef",a,!0,{})}});