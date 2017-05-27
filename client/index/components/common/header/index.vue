<style lang="scss">
    .header {
        .header-main {
            margin: 0 auto;
            padding: 25px 0px;
            overflow: hidden;
            .header-logo {
                img {
                    height: 40px;
                }
            }

            .header-nav {
                height: 40px;
                float: left;
                margin-top: 10px;
                border-left: 1px solid #f1eee0;
                margin-left: 60px;
            }
        }
    }

    .header-logo {}
</style>
<template>
    <header class="header">
        <el-row :gutter="10" class="header-main">
            <el-col :xs="8" :sm="6" :md="0" :lg="2">
                <div class="grid-content bg-purple">&nbsp;</div>
            </el-col>
            <el-col :xs="4" :sm="6" :md="12" :lg="20">
                <div class="grid-content bg-purple-light">

                    <el-col :xs="8" :sm="6" :md="4" :lg="2">
                        <div class="header-logo"><img src="../../../assets/logo.png" /></div>
                    </el-col>
                    <el-col :xs="4" :sm="6" :md="8" :lg="18">
                        <nav class="header-nave">
                            <ul>
                                <li v-for="nav in navs">{{nav.name}}</li>
                            </ul>
                        </nav>
                    </el-col>
                    <el-col :xs="4" :sm="6" :md="8" :lg="4">
                        <div class="grid-content bg-purple">&nbsp;</div>
                    </el-col>
                </div>
            </el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="2">
                <div class="grid-content bg-purple">&nbsp;</div>
            </el-col>
        </el-row>
    </header>
</template>
<script>
    export default {
        props: {
            navs: Array
        },
        data() {
            return {
                button: {
                    signIn: {
                        show: true,
                        state: 'success',
                        line: false,
                        loading: false
                    },
                    signUp: {
                        show: true,
                        state: 'success',
                        line: true,
                        loading: false
                    }
                }
            }
        },
        computed: {
            HeaderNav() {
                return this.$store.getters.HeaderNav
            },
            User() {
                return this.$store.getters.User
            }
        },
        mounted() {
            window.addEventListener('resize', this.checkMobile)
        },
        methods: {
            checkMobile() {
                if (window.innerWidth > 800) {
                    this.$store.dispatch('hideHeaderNav')
                }
            },
            toggleMNav() {
                if (this.HeaderNav.show) {
                    this.$store.dispatch('hideHeaderNav')
                } else {
                    this.$store.dispatch('showHeaderNav')
                }
            }
        }
    }
</script>