<template>
  <div class="dr-admin-login">
    <div class="login-form">
      <input type="text" placeholder="请输入用户名">
      <input type="password" placeholder="请输入密码">
      <button @click="refresh"> 登录 </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  serverCacheKey: () => 'login',
  methods: {
    refresh() {
      location.reload()
    }
  },
  mounted() {
    this.$store.dispatch('hideHeader')
  }
}
</script>

<style>
.login-form {
  width: 150px;
  margin: 0 auto;
}
</style>
