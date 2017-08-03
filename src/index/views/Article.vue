<template>
    <div>
        <div class="content-detail">
            <div class="readme">
                <el-row :gutter="0" class="header-main">
                    <el-col :xs="1" :sm="1" :md="1" :lg="1">
                        <div class="grid-content bg-purple">&nbsp;</div>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22">
                        <el-row :gutter="24">
                            <el-col :xs="24" :sm="18" :md="18" :lg="18">
                                <div>
                                    <h2 class="content-title">{{article.doc.title}}</h2>
                                    <div class="content-author">
                                        <ul>
                                            <li class="author-name">
                                                <a>{{article.doc.author ? article.doc.author.name:''}}</a>
                                            </li>
                                            <li>
                                                <span class="dot">&nbsp;•&nbsp;</span>{{cateName}}
                                            </li>
                                            <li>
                                                <span class="dot">&nbsp;•&nbsp;</span>{{article.doc.date}}
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-html="article.doc.comments">
                                    </div>
                                    <RandomArticle :articles="article.randomArticles" />
                                    <Messages :userMessageList="messages.data" :contentId="article.doc._id" />
                                </div>
                            </el-col>
                            <el-col :xs="0" :sm="6" :md="6" :lg="6" class="content-mainbody-right">
                                <div class="grid-content bg-purple-light title">
                                    <SearchBox />
                                    <RecentContents :recentItems="recentArticle" />
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="1" :sm="1" :md="1" :lg="1">
                        <div class="grid-content bg-purple">&nbsp;</div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
    import {
        mapGetters
    } from 'vuex'
    import metaMixin from '~mixins'
    import Messages from '../components/Messages.vue'
    import RandomArticle from '../components/RandomArticle.vue'
    import RecentContents from '../components/RecentContents.vue'
    import SearchBox from '../components/SearchBox.vue'

    export default {
        name: 'frontend-article',
        async asyncData({ store, route }) {
            const { path, params: { id } } = route

            let params = {}, currentId = '';
            if (id) {
                if (id.indexOf('html') > 0) {
                    currentId = id.substr(0, id.length - 5);
                } else {
                    currentId = id;
                }
            }

            store.dispatch('global/message/getUserMessageList',{contentId:currentId})
            store.dispatch('frontend/article/getRecentContentList')
            await store.dispatch(`frontend/article/getArticleItem`, { id: currentId, path })
        },
        mixins: [metaMixin],
        beforeRouteUpdate(to, from, next) {
            if (to.path !== from.path) this.$options.asyncData({
                store: this.$store,
                route: to
            })
            next()
        },
        computed: {
            ...mapGetters({
                article: 'frontend/article/getArticleItem',
                messages: 'global/message/getUserMessageList',
                recentArticle: 'frontend/article/getRecentContentList'
            }),
            cateName() {
                let catesArr = this.article.doc.categories;
                if (typeof catesArr === 'object' && catesArr.length > 1) {
                    return catesArr[catesArr.length - 1].name
                } else {
                    return '其它'
                }
            }
        },
        components: {
            Messages,
            RandomArticle,
            RecentContents,
            SearchBox
        },
        methods: {
            addTarget(content) {
                if (!content) return ''
                return content.replace(/<a(.*?)href="http/g, '<a$1target="_blank" href="http')
            }
        },
        mounted() {
            // this.$options.asyncData({store: this.$store})
        },
        metaInfo() {
            const title = this.article.doc.title ? this.article.doc.title + ' - 前端开发俱乐部' : '前端开发俱乐部';
            const desc = this.article.doc.discription;
            return {
                title,
                // desc,
                meta: [{
                    vmid: 'description',
                    name: 'description',
                    content: title
                }]
            }
        }
    }

</script>
<style lang="scss">
.content-detail {
    color: #3f3f3f;
    margin-top: 20px;
    img {
        max-width: 100% !important;
    }
    .content-title {
        margin-top: 0;
    }
    .content-author {
        color: #999999;
        ul {
            li.author-name {
                color: #20A0FF;
            }
            li {
                display: inline-block;
                margin-bottom: 10px;
                font-size: 14px;
            }
        }
    }
}
</style>
