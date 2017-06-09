<template>
    <div class="login-pannel">
        <ul>
            <li v-if="loginState.logined">{{loginState.userInfo.userName}}</li>
        </ul>
    </div>
</template>

<script>

export default {

    beforeMount() {
        this.$store.dispatch('loginState');
    },
    computed: {
        loginState() {
            return this.$store.getters.userLoginState;
        }
    },

}
</script>

<style lang="scss">
.login-pannel {
    text-align: right;
    ul {
        li {
            color: #20A0FF;
            height: 40px;
            line-height: 40px;
            display: inline-block;
        }
    }
}
</style>
