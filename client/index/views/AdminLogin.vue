<template>
  <div class="dr-admin-login">
    <div class="login-form">
      <el-form :model="adminLoginFormData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="userName">
          <el-input size="small" v-model="adminLoginFormData.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input size="small" type="password" v-model="adminLoginFormData.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import validatorUtil from '../../../utils/validatorUtil.js'
import {
  mapGetters,
  mapActions
} from 'vuex';
export default {
  name: 'Login',
  data() {
    return {
      rules: {
        userName: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }, {
          validator: (rule, value, callback) => {
            if (!validatorUtil.checkUserName(value)) {
              callback(new Error('5-12个英文字符!'));
            } else {
              callback();
            }
          },
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, {
          validator: (rule, value, callback) => {
            if (!validatorUtil.checkPwd(value)) {
              callback(new Error('6-12位，只能包含字母、数字和下划线!'));
            } else {
              callback();
            }
          },
          trigger: 'blur'
        }]
      }

    }
  },
  serverCacheKey: () => 'login',
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('---adminLoginadminLoginFormDatas--', this);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {

    this.$store.dispatch('hideHeader')
  },
  computed: {
    ...mapGetters([

    ]),
    adminLoginFormData() {
      return this.$store.getters.adminLoginFormData;
    }
  }
}
</script>

<style lang="scss">
.login-form {
  width: 400px;
  margin: 0 auto;
  margin-top: 200px;
}
</style>
