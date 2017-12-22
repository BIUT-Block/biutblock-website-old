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
              <el-col :xs="19" :sm="19" :md="19" :lg="19" :xl="19" class="right-pannel">
                {{contentFormState}}
                  <el-form :model="contentFormState.formData" :rules="rules" ref="ruleForm" label-width="70px" class="info-form">
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
                    <el-form-item>
                      <el-button size="small" type="primary" @click="submitForm('ruleForm')">提交发布</el-button>
                    </el-form-item>
                  </el-form>
              </el-col>
              <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5" class="left-pannel">
               <el-cascader size="small" expand-trigger="hover" :options="cateMenu.docs"  @change="handleChangeCategory" :props="categoryProps">
                </el-cascader>
              </el-col>
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
import UserCenterLeftMenu from "../components/UserCenterLeftMenu";
const validatorUtil = require("../../../utils/validatorUtil.js");
import { renderTreeData } from "../../manage/store/actions";

import { mapGetters, mapActions } from "vuex";
export default {
  name: "userLogin",
  metaInfo() {
    return {
      title: "用户中心"
    };
  },
  components: {
    UserCenterLeftMenu
  },
  data() {
    return {
      rules: {
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (!validatorUtil.checkPwd(value)) {
                callback(new Error("6-12位，只能包含字母、数字和下划线!"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: "请确认密码",
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.contentFormState.formData.password) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            },
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
    setFormLogo(res) {
      this.contentFormState && (this.contentFormState.formData.logo = res);
    },
    submitForm(formName) {
      let userContent = postEditor.getMarkdown();
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!content) {
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
      contentFormState: "frontend/user/contentFormState"
    }),
    cateMenu() {
      let fullNav = this.$store.getters["global/category/getHeaderNavList"];
      let navs = fullNav.data;
      return renderTreeData({ docs: navs });
    }
  },
  mounted() {
    let _this = this;
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