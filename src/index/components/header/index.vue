<template>
    <header class="header">
        <el-row :gutter="0" class="header-main">
            <el-col :xs="1" :sm="1" :md="1" :lg="1">
                <div class="grid-content bg-purple">&nbsp;</div>
            </el-col>
            <el-col :xs="22" :sm="22" :md="22" :lg="22">
                <el-row class="grid-content bg-purple-light">
                    <el-col :xs="24" :sm="4" :md="4" :lg="4">
                        <div class="header-logo">
                            <router-link :to="{path: '/'}"><img src="../../assets/logo.png" /></router-link>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="16" :md="16" :lg="16">
                        <nav class="header-nav">
                            <el-row type="flex">
                                <el-col v-for="(nav,index) in headerNav" :key="index" v-once>
                                    <a :href="'/'+nav.defaultUrl+'___'+nav._id">{{nav.name}}</a>
                                </el-col>
                            </el-row>
                        </nav>
                    </el-col>
                    <el-col :xs="0" :sm="4" :md="4" :lg="4">
                        <div class="grid-content bg-purple">
                            <LoginPannel />
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :xs="1" :sm="1" :md="1" :lg="1">
                <div class="grid-content bg-purple">
                    &nbsp;
                </div>
            </el-col>
        </el-row>
    </header>
</template>
<script>
    import LoginPannel from './loginPannel';
    import _ from 'lodash'
    export default {
        name: 'Header',
        serverCacheKey: props => {
            return `navlist-${props.navs}`
        },
        components: {
            LoginPannel
        },
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
            headerNav() {
                let fullNav = this.$store.getters.headerNav;
                return _.filter(fullNav, (doc) => {
                    return doc.parentId === '0'
                });
            },
            User() {
                return this.$store.getters.User
            }
        },
        mounted() {
            // window.addEventListener('resize', this.checkMobile)
        },
        methods: {

        },
        asyncData({
            store
        }) {
            return store.dispatch('headerNav', {
                model: 'full'
            })
        }
    }

</script>
<style lang="scss">
    .header {
        overflow: hidden;
        border-bottom: 1px solid #f1f1f1;

        .header-main {
            margin: 0 auto;
            padding: 10px 0px;
            overflow: hidden;
            .header-logo {
                img {
                    max-height: 40px;
                }
            }

            .header-nav {
                height: 40px;
                line-height: 40px;
                float: left;
                margin-left: 30px;
                width: 100%;
                .el-row {
                    margin: 0;
                    padding: 0;
                    .el-col {
                        list-style-type: none;
                        display: inline-block;
                        text-align: center
                    }
                }
            }
        }
    }

</style>
