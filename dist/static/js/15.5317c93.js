webpackJsonp([15,25,27,30],{123:function(e,t,s){function a(e){s(426)}var n=s(9)(s(424),s(427),a,null,null);e.exports=n.exports},124:function(e,t,s){function a(e){s(432)}var n=s(9)(s(428),s(431),a,null,null);e.exports=n.exports},151:function(e,t,s){var a=s(9)(s(529),s(575),null,null,null);e.exports=a.exports},170:function(e,t,s){function a(e){s(745)}var n=s(9)(s(624),s(720),a,null,null);e.exports=n.exports},424:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(75),n=s(27),i=s.n(n);t.default={props:{pageInfo:Object,type:String,ids:Array},data:function(){return{systemModelTypes:[{value:"all",label:"全部"},{value:"h5-exception",label:"h5异常"},{value:"node-exception",label:"nodejs异常"},{value:"login",label:"系统登录"}],targetSysLogType:"all",loadingState:!1,formState:{show:!1},searchkey:""}},methods:{selectSysLogType:function(e){this.targetSysLogType=e,"all"==e?this.$store.dispatch("getSystemLogsList"):this.$store.dispatch("getSystemLogsList",{type:e})},searchResult:function(e){var t=this.pageInfo.searchkey;"content"==this.type?this.$store.dispatch("getContentList",{searchkey:t}):"contentTag"==this.type?this.$store.dispatch("getContentTagList",{searchkey:t}):"contentMessage"==this.type?this.$store.dispatch("getContentMessageList",{searchkey:t}):"regUser"==this.type&&this.$store.dispatch("getRegUserList",{searchkey:t})},addUser:function(){this.$store.dispatch("showAdminUserForm")},addRole:function(){this.$store.dispatch("showAdminGroupForm")},addResource:function(){this.$store.dispatch("showAdminResourceForm",{type:"root",formData:{parentId:"0"}})},addContent:function(){this.$store.dispatch("showContentForm"),this.$router.push("/addContent")},addAds:function(){this.$store.dispatch("adsInfoForm",{edit:!1,formData:{}}),this.$router.push("/addAds")},addSysAnnounce:function(){this.$store.dispatch("showContentForm"),this.$router.push("/addSysAnnounce")},addTopCates:function(){this.$store.dispatch("showContentCategoryForm",{type:"root",formData:{parentId:"0"}})},clearSystemOptionLogs:function(){var e=this;this.$confirm("此操作将清空所有日志, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return a.a.clearSystemOptionLogs()}).then(function(t){"success"===t.data.state?(e.$store.dispatch("getSystemLogsList"),e.$message({message:"清空日志成功",type:"success"})):e.$message.error(t.data.message)}).catch(function(t){e.$message({type:"info",message:"已取消删除"})})},branchDelete:function(e){var t=this,s=this,n=void 0;if("msg"===e?n="留言":"user"===e?n="用户":"systemlogs"===e?n="系统操作日志":"systemnotify"===e&&(n="系统消息"),i.a.isEmpty(s.ids))return this.$message({type:"info",message:"请选择指定目标！"}),!1;this.$confirm("此操作将永久删除这些"+n+", 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t=s.ids.join();return"msg"===e?a.a.deleteContentMessage({ids:t}):"user"===e?a.a.deleteRegUser({ids:t}):"systemlogs"===e?a.a.deleteSystemOptionLogs({ids:t}):"systemnotify"===e?a.a.deleteSystemNotify({ids:t}):void 0}).then(function(s){"success"===s.data.state?("msg"===e?t.$store.dispatch("getContentMessageList"):"user"===e?t.$store.dispatch("getRegUserList"):"systemlogs"===e?t.$store.dispatch("getSystemLogsList"):"systemnotify"===e&&t.$store.dispatch("getSystemNotifyList"),t.$message({message:n+"删除成功",type:"success"})):t.$message.error(s.data.message)}).catch(function(e){t.$message({type:"info",message:"已取消删除"})})},addTag:function(){this.$store.dispatch("showContentTagForm")},delUser:function(){},bakUpData:function(){var e=this;this.$confirm("您即将执行数据备份操作, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return e.loadingState=!0,a.a.bakUpData()}).then(function(t){"success"===t.data.state?(e.loadingState=!1,e.$store.dispatch("getBakDateList"),e.$message({message:"数据备份成功",type:"success"})):e.$message.error(t.data.message)}).catch(function(t){e.$message({type:"info",message:"数据备份失败:"+t})})},setHasRead:function(){var e=this;if(i.a.isEmpty(this.ids))return this.$message({type:"info",message:"请选择指定目标！"}),!1;var t=this.ids.join();a.a.setNoticeRead({ids:t}).then(function(t){if("success"===t.data.state){e.$store.dispatch("getSystemNotifyList");var s=e.$store.getters.loginState.noticeCounts;e.$store.dispatch("loginState",{noticeCounts:s-e.ids.length})}else e.$message.error(t.data.message)})}},components:{}}},425:function(e,t,s){t=e.exports=s(73)(void 0),t.push([e.i,".option-button{display:inline-block}",""])},426:function(e,t,s){var a=s(425);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);s(74)("1b23ec5c",a,!0)},427:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"dr-toolbar"},[s("div",{staticClass:"option-button"},["adminGroup"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:e.addRole}},[s("i",{staticClass:"fa fa-fw fa-plus",attrs:{"aria-hidden":"true"}})])],1):"adminUser"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:e.addUser}},[s("i",{staticClass:"fa fa-fw fa-plus"})])],1):"adminResource"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:e.addResource}},[s("i",{staticClass:"fa fa-fw fa-plus",attrs:{"aria-hidden":"true"}})])],1):"content"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:e.addContent}},[s("i",{staticClass:"fa fa-fw fa-plus",attrs:{"aria-hidden":"true"}})])],1):"contentCategory"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:e.addTopCates}},[s("i",{staticClass:"fa fa-fw fa-plus",attrs:{"aria-hidden":"true"}})])],1):"contentMessage"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"danger",plain:"",round:""},on:{click:function(t){e.branchDelete("msg")}}},[s("i",{staticClass:"fa fa-fw fa-trash-o"})])],1):"contentTag"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:e.addTag}},[s("i",{staticClass:"fa fa-fw fa-plus",attrs:{"aria-hidden":"true"}})])],1):"regUser"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"danger",plain:"",round:""},on:{click:function(t){e.branchDelete("user")}}},[s("i",{staticClass:"fa fa-fw fa-trash-o"})])],1):"backUpData"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:"",loading:e.loadingState},on:{click:e.bakUpData}},[s("i",{staticClass:"fa fa-fw fa-cloud-download",attrs:{"aria-hidden":"true"}})])],1):"systemOptionLogs"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"danger",plain:"",round:""},on:{click:function(t){e.branchDelete("systemlogs")}}},[s("i",{staticClass:"fa fa-fw fa-trash-o"})]),e._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"清空所有日志",placement:"right-start"}},[s("el-button",{attrs:{size:"small",type:"warning",plain:"",round:""},on:{click:e.clearSystemOptionLogs}},[s("i",{staticClass:"fa fa-fw fa-window-restore"})])],1)],1):"systemNotify"===e.type?s("div",[s("el-button",{attrs:{size:"small",type:"primary",plain:"",round:""},on:{click:function(t){e.setHasRead()}}},[s("i",{staticClass:"fa fa-fw fa-eye",attrs:{"aria-hidden":"true"}})]),e._v(" "),s("el-button",{attrs:{size:"small",type:"danger",plain:"",round:""},on:{click:function(t){e.branchDelete("systemnotify")}}},[s("i",{staticClass:"fa fa-fw fa-trash-o"})])],1):"systemAnnounce"===e.type?s("div",[s("el-button",{attrs:{type:"primary",size:"small",plain:"",round:""},on:{click:e.addSysAnnounce}},[s("i",{staticClass:"fa fa-fw fa-plus"})])],1):"ads"===e.type?s("div",[s("el-button",{attrs:{type:"primary",size:"small",plain:"",round:""},on:{click:e.addAds}},[s("i",{staticClass:"fa fa-fw fa-plus"})])],1):e._e()]),e._v(" "),s("div",{staticClass:"dr-searchInput"},["content"===e.type?s("div",[s("el-input",{attrs:{size:"small",placeholder:"请输入关键字","suffix-icon":"el-icon-search","on-icon-click":e.searchResult},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.searchResult(t)}},model:{value:e.pageInfo.searchkey,callback:function(t){e.$set(e.pageInfo,"searchkey",t)},expression:"pageInfo.searchkey"}})],1):"contentTag"===e.type?s("div",[s("el-input",{attrs:{size:"small",placeholder:"标签名称","suffix-icon":"el-icon-search","on-icon-click":e.searchResult},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.searchResult(t)}},model:{value:e.pageInfo.searchkey,callback:function(t){e.$set(e.pageInfo,"searchkey",t)},expression:"pageInfo.searchkey"}})],1):"contentMessage"===e.type?s("div",[s("el-input",{attrs:{size:"small",placeholder:"留言内容","suffix-icon":"el-icon-search","on-icon-click":e.searchResult},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.searchResult(t)}},model:{value:e.pageInfo.searchkey,callback:function(t){e.$set(e.pageInfo,"searchkey",t)},expression:"pageInfo.searchkey"}})],1):"regUser"===e.type?s("div",[s("el-input",{attrs:{size:"small",placeholder:"请输入用户名","suffix-icon":"el-icon-search","on-icon-click":e.searchResult},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.searchResult(t)}},model:{value:e.pageInfo.searchkey,callback:function(t){e.$set(e.pageInfo,"searchkey",t)},expression:"pageInfo.searchkey"}})],1):"systemOptionLogs"===e.type?s("div",[s("el-select",{attrs:{size:"small",placeholder:"请选择日志类别"},on:{change:e.selectSysLogType},model:{value:e.targetSysLogType,callback:function(t){e.targetSysLogType=t},expression:"targetSysLogType"}},e._l(e.systemModelTypes,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1):e._e()])])},staticRenderFns:[]}},428:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{pageInfo:Object,pageType:String},methods:{handleSizeChange:function(e){console.log("每页 "+e+" 条"),this.$store.dispatch("getAdminUserList",{pageSize:e})},handleCurrentChange:function(e){console.log("当前页: "+e);var t=this.pageInfo.searchkey||"";"content"===this.pageType?this.$store.dispatch("getContentList",{current:e,searchkey:t}):"adminUser"===this.pageType?this.$store.dispatch("getAdminUserList",{current:e,searchkey:t}):"adminGroup"===this.pageType?this.$store.dispatch("getAdminGroupList",{current:e,searchkey:t}):"contentMessage"===this.pageType?this.$store.dispatch("getContentMessageList",{current:e,searchkey:t}):"contentTag"===this.pageType?this.$store.dispatch("getContentTagList",{current:e,searchkey:t}):"regUser"===this.pageType?this.$store.dispatch("getRegUserList",{current:e,searchkey:t}):"backUpData"===this.pageType?this.$store.dispatch("getBakDateList",{current:e,searchkey:t}):"systemOptionLogs"===this.pageType?this.$store.dispatch("getSystemLogsList",{current:e,searchkey:t}):"systemNotify"===this.pageType?this.$store.dispatch("getSystemNotifyList",{current:e,searchkey:t}):"systemAnnounce"===this.pageType?this.$store.dispatch("getSystemAnnounceList",{current:e,searchkey:t}):"ads"===this.pageType&&this.$store.dispatch("getAdsList",{current:e,searchkey:t})}},data:function(){return{}}}},430:function(e,t,s){t=e.exports=s(73)(void 0),t.push([e.i,".dr-pagination{text-align:center;margin:15px auto}",""])},431:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"block dr-pagination"},[e.pageInfo?s("div",[s("el-pagination",{attrs:{"current-page":e.pageInfo.current,"page-size":e.pageInfo.pageSize,layout:"total, prev, pager, next",total:e.pageInfo.totalItems},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.pageInfo,"current",t)}}})],1):e._e()])},staticRenderFns:[]}},432:function(e,t,s){var a=s(430);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);s(74)("05db6b6d",a,!0)},529:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(75);t.default={props:{dataList:Array},data:function(){return{loading:!1,multipleSelection:[]}},methods:{showDetails:function(e,t){this.$alert(t[e].logs,"日志详情",{confirmButtonText:"关闭"})},handleSystemLogsSelectionChange:function(e){if(e&&e.length>0){var t=e.map(function(e,t){return e._id});this.multipleSelection=t,this.$emit("changeSystemLogsSelectList",t)}},deleteDataItem:function(e,t){var s=this;this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return a.a.deleteSystemOptionLogs({ids:t[e]._id})}).then(function(e){"success"===e.data.state?(s.$store.dispatch("getSystemLogsList"),s.$message({message:"删除成功",type:"success"})):s.$message.error(e.data.message)}).catch(function(){s.$message({type:"info",message:"已取消删除"})})}}}},575:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{align:"center",data:e.dataList,"tooltip-effect":"dark"},on:{"selection-change":e.handleSystemLogsSelectionChange}},[s("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),s("el-table-column",{attrs:{prop:"logs",label:"行为"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-tag",{attrs:{size:"small",type:t.row.type.indexOf("exception")>-1?"danger":"gray"}},[e._v(e._s(e._f("cutWords")(t.row.logs,50)))])]}}])}),e._v(" "),s("el-table-column",{attrs:{prop:"type",label:"类别"},scopedSlots:e._u([{key:"default",fn:function(t){return["login"==t.row.type?s("span",[e._v("系统登录")]):e._e(),e._v(" "),t.row.type.indexOf("exception")>-1?s("span",[e._v("系统异常")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{prop:"date",label:"发生时间"}}),e._v(" "),s("el-table-column",{attrs:{label:"操作",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{size:"mini",type:"primary",plain:"",round:""},on:{click:function(s){e.showDetails(t.$index,e.dataList)}}},[s("i",{class:"fa "+(t.row.type.indexOf("exception")>-1?"fa-bug":"fa-eye"),attrs:{"aria-hidden":"true"}})]),e._v(" "),s("el-button",{attrs:{size:"mini",type:"danger",plain:"",round:"",icon:"el-icon-delete"},on:{click:function(s){e.deleteDataItem(t.$index,e.dataList)}}})]}}])})],1)],1)},staticRenderFns:[]}},624:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(2),n=s.n(a),i=s(151),o=s.n(i),r=s(123),c=s.n(r),l=s(124),p=s.n(l),u=s(13);t.default={name:"index",data:function(){return{selectlist:[]}},components:{DataTable:o.a,TopBar:c.a,Pagination:p.a},methods:{changeLogsSelect:function(e){this.selectlist=e}},computed:n()({},s.i(u.a)(["systemOptionLogs"])),mounted:function(){this.$store.dispatch("getSystemLogsList")}}},654:function(e,t,s){t=e.exports=s(73)(void 0),t.push([e.i,"",""])},720:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"adminUser"},[s("el-row",{staticClass:"dr-datatable"},[s("el-col",{attrs:{span:24}},[s("TopBar",{attrs:{type:"systemOptionLogs",ids:e.selectlist}}),e._v(" "),s("DataTable",{attrs:{dataList:e.systemOptionLogs.docs},on:{changeSystemLogsSelectList:e.changeLogsSelect}}),e._v(" "),s("Pagination",{attrs:{pageInfo:e.systemOptionLogs.pageInfo,pageType:"systemOptionLogs"}})],1)],1)],1)},staticRenderFns:[]}},745:function(e,t,s){var a=s(654);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);s(74)("c955d83c",a,!0)}});