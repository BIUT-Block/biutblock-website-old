webpackJsonp([43],{131:function(e,t,n){var a=n(23)(n(423),n(511),null,null,null);e.exports=a.exports},423:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(60);t.default={props:{dataList:Array,pageInfo:Object},data:function(){return{loading:!1,multipleSelection:[]}},methods:{handleMsgSelectionChange:function(e){if(e&&e.length>0){var t=e.map(function(e,t){return e._id});this.multipleSelection=t,this.$emit("changeMsgSelectList",t)}},replyContentMessage:function(e,t){var n=t[e];this.$store.dispatch("showContentMessageForm",{edit:!0,parentformData:n})},deleteContentMessage:function(e,t){var n=this;this.$confirm("此操作将永久删除该留言, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return a.a.deleteContentMessage({ids:t[e]._id})}).then(function(e){"success"===e.data.state?(n.$store.dispatch("getContentMessageList",n.pageInfo),n.$message({message:"删除成功",type:"success"})):n.$message.error(e.data.message)}).catch(function(e){n.$message({type:"info",message:"已取消删除"+e})})}}}},511:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{align:"center",data:e.dataList,"tooltip-effect":"dark"},on:{"selection-change":e.handleMsgSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),n("el-table-column",{attrs:{prop:"contentId.stitle",label:"文章标题",width:"200"}}),e._v(" "),n("el-table-column",{attrs:{prop:"content",label:"留言内容",width:"280","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("cutWords")(t.row.content,20)))]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"author",label:"留言者"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s("0"===t.row.utype?t.row.author?t.row.author.userName:"匿名":t.row.adminAuthor?t.row.adminAuthor.userName:""))]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"replyAuthor",label:"关联用户(被回复)"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.replyAuthor?t.row.replyAuthor.userName:t.row.adminReplyAuthor?t.row.adminReplyAuthor.userName:""))]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"date",label:"时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.date))]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作",width:"150",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"primary",plain:"",round:""},on:{click:function(n){e.replyContentMessage(t.$index,e.dataList)}}},[n("i",{staticClass:"fa fa-mail-reply",attrs:{"aria-hidden":"true"}})]),e._v(" "),n("el-button",{attrs:{size:"mini",type:"danger",plain:"",round:"",icon:"el-icon-delete"},on:{click:function(n){e.deleteContentMessage(t.$index,e.dataList)}}})]}}])})],1)],1)},staticRenderFns:[]}}});