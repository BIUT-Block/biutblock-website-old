<style lang='scss'>
    .siteMap {
        padding: 15px;
    }

    .siteMap ul li {
        height: 25px;
    }
</style>
<template>
    <div class="container min-hight" style="margin-bottom: 20px;background: #FFFFFF">
        <el-row :gutter="10">
            <el-col :xs="2" :sm="2" :md="2" :lg="2">
                <div class="grid-content bg-purple">&nbsp;</div>
            </el-col>
            <el-col :xs="20" :sm="20" :md="20" :lg="20">
                <div class="col-md-12 siteMap">
                    <ul>
                        <li v-for="(item,index) in siteMapList.doc" v-once>
                            <router-link :to="'/details/'+item._id+'.html'" class="continue-reading">{{index+1}}.&nbsp;{{item.title}}</router-link>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :xs="2" :sm="2" :md="2" :lg="2">
                <div class="grid-content bg-purple">&nbsp;</div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        props: {

        },
        name: 'sitemap',
        data() {
            return {
                // displayedItems: this.$store.getters.contentList
            }
        },
        methods: {

        },
        computed: {
            ...mapGetters([
                'siteMapList'
            ])
        },
        asyncData({
            store
        }) {
            return store.dispatch('siteMapList')
        }

    }
</script>