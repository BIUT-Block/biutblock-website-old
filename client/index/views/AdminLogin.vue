<template>
  <div class="dr-admin-login">
    <div class="login-form">
      test
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
          console.log('---adminLoginFormDatas--', this);
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
  width: 150px;
  margin: 0 auto;
}
</style>
