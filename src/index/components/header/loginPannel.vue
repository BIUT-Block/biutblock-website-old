<template>
    <div class="login-pannel">
        <ul>
            <li v-if="loginState.logined && loginState.userInfo">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        {{loginState.userInfo.userName}}
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
            <li v-else>
                <a href="/users/login">登录</a>&nbsp;|&nbsp;
                    <a href="/users/reg">注册</a>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '~api'
export default {
    name: 'loginPannel',
    props: ['userLoginState'],
    beforeMount() {
        this.$store.dispatch('frontend/user/getSessionState');
    },
    computed: {
        ...mapGetters({
            loginState: 'frontend/user/getSessionState'
        })
    },
    methods: {
        logout() {
            api.get('users/logOut').then((result) => {
                if (result.data.state === 'success') {
                    this.$message({
                        message: '登出成功',
                        type: 'success',
                        onClose: () => {
                            window.location = '/'
                        }
                    })
                } else {
                    this.$message({
                        message: result.data.err,
                        type: 'error'
                    })
                }
            })
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
            font-size: 13px;
        }
    }
}
</style>
