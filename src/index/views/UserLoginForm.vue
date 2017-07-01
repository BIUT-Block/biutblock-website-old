<template>
  <div class="dr-user-login">
    <div class="login-form">
      <el-row :gutter="10">
        <el-col :xs="2" :sm="6" :md="8" :lg="8">
          <div class="grid-content bg-purple">&nbsp;</div>
        </el-col>
        <el-col :xs="20" :sm="12" :md="8" :lg="8">
          <el-form :model="userLoginFormData" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="pannel-title">
              <span>用户登录</span>
            </h3>
            <el-form-item prop="email">
              <el-input size="small" placeholder="请填写邮箱" v-model="userLoginFormData.email"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input size="small" placeholder="请输入密码" type="password" v-model="userLoginFormData.password"></el-input>
            </el-form-item>
            <el-form-item class="submit-btn">
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :xs="2" :sm="6" :md="8" :lg="8">
          <div class="grid-content bg-purple">&nbsp;</div>
        </el-col>
      </el-row>
  
    </div>
  </div>
</template>
<script>
import services from '../store/services.js';
const validatorUtil = require('../../../utils/validatorUtil.js')
import {
  mapGetters,
  mapActions
} from 'vuex';
export default {
  name: 'userLogin',
  metaInfo() {
    return {
      title: '用户登录',
      desc: 'DoraCMS-用户登录',
      keywords: 'DoraCMS-用户登录'
    }
  },
  data() {
    return {
      rules: {
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }, {
          validator: (rule, value, callback) => {
            if (!validatorUtil.checkEmail(value)) {
              callback(new Error('请输入正确的邮箱!'));
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
  serverCacheKey: () => 'userlogin',
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = this.userLoginFormData;
          services.userDoLogin(params).then((result) => {
            result = result.data;
            if (result.state == 'success') {
              // sessionStorage.setItem('user-token', result.token);
              window.location = '/';
            } else {
              this.$message({
                message: result.err,
                type: 'error'
              });
            }
          }).catch((err) => {
            this.$message.error(err.response.data.error)
          })
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
  beforeMount() {
    // this.$store.dispatch('simplePage');
  },
  computed: {
    ...mapGetters([

    ]),
    userLoginFormData() {
      return this.$store.getters.userLoginFormData;
    }
  }
}
</script>

<style lang="scss">
.login-form {

  margin: 0 auto;
  margin-top: 6%;
  margin-bottom: 100px;

  .submit-btn {
    text-align: left;
  }

  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box; // margin: 180px auto;
    padding: 25px 35px 10px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
}
</style>