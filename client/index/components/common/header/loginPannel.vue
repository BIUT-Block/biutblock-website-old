<template>
    <div class="login-pannel">
        <ul>
            <li v-if="loginState.logined">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        {{loginState.userInfo.userName}}
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
            <li v-else>
                <a href="/users/login">
                    <i class="fa fa-user-o" aria-hidden="true"></i>登录</a>
            </li>
        </ul>
    </div>
</template>

<script>
import services from '../../../store/services.js';

export default {

    beforeMount() {
        this.$store.dispatch('loginState');
    },
    computed: {
        loginState() {
            return this.$store.getters.userLoginState;
        }
    },
    methods: {
        logout() {
            services.userLogOut();
        }
    }

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
