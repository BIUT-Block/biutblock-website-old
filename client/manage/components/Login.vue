<template>
  <div class="dr-admin-login">
    <div class="login-form">
      <el-form :model="adminLoginFormData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm login-container">
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
import services from '../store/services.js';
const validatorUtil = require('../../../utils/validatorUtil.js')
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
          let params = this.adminLoginFormData;
          services.adminDoLogin(params).then((result) => {
            if (result.state == 'success') {
              this.$router.push('/');
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
  mounted() {

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

<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
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
</style>