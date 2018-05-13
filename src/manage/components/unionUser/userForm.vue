<template>
    <div class="dr-regUserForm">
        <el-dialog width="35%" size="small" title="填写用户信息" :visible.sync="dialogState.show" :close-on-click-modal="false">
            <el-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="userName">
                    <el-input size="small" v-model="dialogState.formData.userName"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="group">
                  <el-select size="small" v-model="dialogState.formData.group" placeholder="请选择">
                  <el-option
                    v-for="item in groupOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>                
                </el-form-item>
                <el-form-item label="有效" prop="enable">
                    <el-switch on-text="是" off-text="否" v-model="dialogState.formData.enable"></el-switch>
                </el-form-item>
                <el-form-item label="电话" prop="phoneNum">
                    <el-input size="small" v-model.number="dialogState.formData.phoneNum"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="comments">
                    <el-input size="small" type="textarea" v-model="dialogState.formData.comments"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="medium" type="primary" @click="submitForm('ruleForm')">{{dialogState.edit ? '更新' : '保存'}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import services from "../../store/services.js";
const validatorUtil = require("../../../../utils/validatorUtil.js");

import _ from "lodash";
export default {
  props: {
    dialogState: Object,
    groups: Array
  },
  data() {
    return {
      groupOptions: [
        {
          value: "0",
          label: "联合创始人"
        },
        {
          value: "1",
          label: "普通会员"
        }
      ],
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (!validatorUtil.checkUserName(value)) {
                callback(new Error("5-12个英文字符!"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        phoneNum: [
          {
            type: "number",
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (!validatorUtil.checkPhoneNum(value)) {
                callback(new Error("请填写正确的手机号码!"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        comments: [
          {
            message: "请填写备注",
            trigger: "blur"
          },
          {
            min: 5,
            max: 30,
            message: "请输入5-30个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    confirm() {
      this.$store.dispatch("hideRegUserForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("---formdatas--", this);
          let params = this.dialogState.formData;
          // 更新
          if (this.dialogState.edit) {
            services.updateUnionRegUser(params).then(result => {
              if (result.data.state === "success") {
                this.$store.dispatch("hideUnionRegUserForm");
                this.$store.dispatch("getUnionRegUserList");
                this.$message({
                  message: "更新成功",
                  type: "success"
                });
              } else {
                this.$message.error(result.data.message);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>