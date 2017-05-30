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
</style>
<template>
    <header class="header">
        <el-row :gutter="10" class="header-main">
            <el-col :xs="8" :sm="6" :md="2" :lg="2">
                <div class="grid-content bg-purple">&nbsp;</div>
            </el-col>
            <el-col :xs="4" :sm="6" :md="20" :lg="20">
                <el-row class="grid-content bg-purple-light">

                    <el-col :xs="8" :sm="8" :md="4" :lg="2">
                        <div class="header-logo">
                            <img src="../../../assets/logo.png" />
                        </div>
                    </el-col>
                    <el-col :xs="4" :sm="8" :md="10" :lg="18">
                        <nav class="header-nave">
                            <ul>
                                {{headerNav}}
                                <li v-for="nav in headerNav">
                                    <router-link :to="{path: '/'+nav.defaultUrl+ '___'+nav._id}">{{nav.name}}</router-link>
                                </li>
                            </ul>
                        </nav>
                    </el-col>
                    <el-col :xs="4" :sm="8" :md="10" :lg="4">
                        <div class="grid-content bg-purple">&nbsp;</div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :xs="4" :sm="6" :md="2" :lg="2">
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
            let newRoters = []
            if (this.headerNav.length > 0) {
                this.headerNav.map((item, index) => {
                    newRoters.push({
                        path: '/' + item.defaultUrl + '___' + item._id,
                        component: SlotHeader,
                        name: item.name,
                        iconCls: 'fa fa-id-card-o',
                        meta: {
                            title: '测试Demo'
                        }
                    })
                })
            }
            this.$router.addRoutes(newRoters)
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