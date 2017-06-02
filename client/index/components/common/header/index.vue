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
                            <router-link to="/">
                                <img src="../../../assets/logo.png" />
                            </router-link>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="16" :md="16" :lg="16">
                        <nav class="header-nav">
                            <el-row type="flex">
                                <el-col v-for="(nav,index) in headerNav" :key="index">
                                    <router-link :to="{path: '/'+nav.defaultUrl+ '___'+nav._id}">{{nav.name}}</router-link>
                                </el-col>
                            </el-row>
                        </nav>
                    </el-col>
                    <el-col :xs="0" :sm="4" :md="4" :lg="4">
                        <div class="grid-content bg-purple">&nbsp;</div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :xs="1" :sm="1" :md="1" :lg="1">
                <div class="grid-content bg-purple">&nbsp;</div>
            </el-col>
        </el-row>
    </header>
</template>
<script>
import SlotHeader from './slotHeader'
export default {
    name: 'Header',
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
            return this.$store.getters.headerNav
        },
        User() {
            return this.$store.getters.User
        }
    },
    mounted() {
        // window.addEventListener('resize', this.checkMobile)
    },
    methods: {
        checkMobile() {
            if (window.innerWidth > 800) {
                // this.$store.dispatch('hideHeaderNav')
            }
        },
        toggleMNav() {
            if (this.HeaderNav.show) {
                // this.$store.dispatch('hideHeaderNav')
            } else {
                // this.$store.dispatch('showHeaderNav')
            }
        }
    },
    asyncData({
            store
        }) {
        return store.dispatch('headerNav')
    }
}
</script>
<style lang="scss">
.header {
    overflow: hidden;
    background: #faf9f4;
    border-bottom: 1px solid #f1f1f1;

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
            margin-top: 10px; // border-left: 1px solid #f1eee0;
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