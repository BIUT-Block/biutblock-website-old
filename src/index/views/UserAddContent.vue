<template>
  <div class="contentContainer">
    <div class="mainbody user-center">
      <el-row :gutter="0">
        <el-col :xs="1" :sm="1" :md="1" :lg="2" :xl="5">
          <div class="grid-content bg-purple">&nbsp;</div>
        </el-col>
        <el-col :xs="22" :sm="22" :md="22" :lg="19" :xl="14">
          <div class="user-info">
            <el-row :gutter="15" class="basic-info">
                <el-form :model="contentFormState.formData" :rules="rules" ref="ruleForm" label-width="70px" class="content-info-form">

              <el-col :xs="19" :sm="19" :md="19" :lg="19" :xl="19" class="right-pannel">
                {{contentFormState}}
                    <el-form-item label="分类" prop="categories">
                      <el-cascader size="small" expand-trigger="hover" :options="cateMenu.docs"  @change="handleChangeCategory" :props="categoryProps">
                      </el-cascader>
                    </el-form-item>
                    
                    
                    <el-form-item label="标题" prop="title">
                      <el-input placeholder="请输入标题" v-model="contentFormState.formData.title"></el-input>
                    </el-form-item>
                    <el-form-item label="摘要" prop="discription">
                      <el-input placeholder="请摘要" v-model="contentFormState.formData.discription"></el-input>
                    </el-form-item>
                    <el-form-item label="详情" prop="comments">
                      <div id="post-content">
                          <textarea style="display:none;">### Hello Editor.md !</textarea>
                      </div>
                    </el-form-item>
                    
              </el-col>
              <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5" class="left-pannel">
              <el-form-item>
                <el-button size="small" type="primary" @click="submitForm('ruleForm')">提交发布</el-button>
              </el-form-item>
               <PannelBox title="缩略图" className="markdown-pannle">
                  <el-form-item prop="sImg">
                        <el-upload class="avatar-uploader" action="/system/upload?type=images" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="contentFormState.formData.sImg" :src="contentFormState.formData.sImg" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
              </PannelBox>
               <PannelBox title="标签" className="markdown-pannle">
                 <el-form-item prop="tags">
                        <el-select v-model="contentFormState.formData.tags" multiple filterable allow-create placeholder="请选择文章标签">
                            <el-option v-for="item in contentTagList.data" :key="item._id" :label="item.name" :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>
               </PannelBox>
              </el-col>
              </el-form>
            </el-row>
          </div>
        </el-col>
        <el-col :xs="1" :sm="1" :md="1" :lg="2" :xl="5">
          <div class="grid-content bg-purple">
            &nbsp;
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import api from "~api";
// import UserCenterLeftMenu from "../components/UserCenterLeftMenu";
const validatorUtil = require("../../../utils/validatorUtil.js");
import { renderTreeData } from "../../manage/store/actions";
import PannelBox from "../components/PannelBox.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "userLogin",
  metaInfo() {
    return {
      title: "用户中心"
    };
  },
  components: {
    // UserCenterLeftMenu,
    PannelBox
  },
  data() {
    return {
      rules: {
        title: [
          {
            required: true,
            message: "请输入文档标题",
            trigger: "blur"
          },
          {
            min: 5,
            max: 50,
            message: "5-50个非特殊字符",
            trigger: "blur"
          }
        ],
        stitle: [
          {
            required: true,
            message: "请输入简短标题",
            trigger: "blur"
          },
          {
            min: 5,
            max: 40,
            message: "5-40个非特殊字符",
            trigger: "blur"
          }
        ],
        categories: [
          {
            validator: (rule, value, callback) => {
              if (_.isEmpty(value)) {
                callback(new Error("请选择文档类别!"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        tags: [
          {
            validator: (rule, value, callback) => {
              if (_.isEmpty(value)) {
                callback(new Error("请选择标签!"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        discription: [
          {
            required: true,
            message: "请输入内容摘要",
            trigger: "blur"
          },
          {
            min: 5,
            max: 300,
            message: "5-100个非特殊字符",
            trigger: "blur"
          }
        ]
      },
      categoryProps: {
        value: "_id",
        label: "name",
        children: "children"
      }
    };
  },
  methods: {
    handleChangeCategory(value) {
      console.log(value);
    },
    handleAvatarSuccess(res, file) {
      let imageUrl = res;
      this.$store.dispatch("showContentForm", {
        edit: this.contentFormState.edit,
        formData: Object.assign({}, this.contentFormState.formData, {
          sImg: imageUrl
        })
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error("上传头像图片只能是 JPG,PNG,GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isJPG || isPNG || isGIF) && isLt2M;
    },
    setFormLogo(res) {
      this.contentFormState && (this.contentFormState.formData.logo = res);
    },
    submitForm(formName) {
      let userContent = postEditor.getMarkdown();
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!userContent) {
            this.$message.error("请输入内容");
          } else {
            let params = this.contentFormState.formData;
            params.comments = userContent;
            let apiPath = "content/addOne";
            if (this.contentFormState.edit) {
              apiPath = "content/updateOne";
            }
            api
              .post(apiPath, params)
              .then(result => {
                if (result.data.state == "success") {
                  this.$message({
                    message: "信息更新成功！",
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: result.data.message,
                    type: "error"
                  });
                }
              })
              .catch(err => {
                this.$message.error(err.response.data.error);
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  computed: {
    ...mapGetters({
      contentFormState: "frontend/user/contentFormState",
      contentTagList: "global/tags/getTagList"
    }),
    cateMenu() {
      let fullNav = this.$store.getters["global/category/getHeaderNavList"];
      let navs = fullNav.data;
      return renderTreeData({ docs: navs });
    }
  },
  mounted() {
    let _this = this;
    this.$store.dispatch("global/tags/getTagList", { limit: 100 });
    window.postEditor = editormd("post-content", {
      width: "100%",
      height: 500,
      markdown: "",
      placeholder: "请输入内容...",
      path: "/editor.md/lib/",
      toolbarIcons() {
        return [
          "bold",
          "italic",
          "quote",
          "|",
          "list-ul",
          "list-ol",
          "hr",
          "|",
          "link",
          "reference-link",
          "image",
          "code",
          "table",
          "|",
          "watch",
          "preview",
          "fullscreen"
        ];
      },
      watch: false,
      saveHTMLToTextarea: true
      // onchange: function() {
      //   _this.$store.dispatch("frontend/user/contentForm", {
      //     edit: false,
      //     formData: Object.assign({}, _this.contentFormState.formData, {
      //       comments: this.getValue()
      //     })
      //   });
      // }
    });
  }
};
</script>

<style lang="scss">
.editormd-preview-close-btn {
  display: none;
}
</style>