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
                                    <h2 class="content-title">{{contentDetails.doc.title}}</h2>
                                    <div class="content-author">
                                        <ul>
                                            <li class="author-name">
                                                <a>{{contentDetails.doc.author ? contentDetails.doc.author.name:'生哥'}}</a>
                                            </li>
                                            <li>
                                                <span class="dot">&nbsp;•&nbsp;</span>{{contentCates}}
                                            </li>
                                            <li>
                                                <span class="dot">&nbsp;•&nbsp;</span>{{contentDetails.doc.date}}
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-html="contentDetails.doc.comments">
                                    </div>
                                    <RandomArticle :articles="contentDetails.randomArticles" />
                                    <div>
                                        <Messages :userMessageList="contentDetails.messages" :contentId="contentDetails.doc._id" />
                                    </div>
                                </div>
                            </el-col>
                            <el-col :xs="0" :sm="6" :md="6" :lg="6" class="content-mainbody-right">
                                <div class="grid-content bg-purple-light title">
                                    <RecentContents />
                                    <HotContents />
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
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import HotContents from '../components/HotContents.vue'
import RecentContents from '../components/RecentContents.vue'
import Messages from '../components/Messages.vue'
import RandomArticle from '../components/RandomArticle.vue'



export default {
    name: 'cmsarticleview',
    metaInfo() {
        return {
            title: this.contentDetails.doc.title,
            desc: this.contentDetails.doc.discription,
            keywords: this.contentDetails.doc.keywords || this.systemConfig.configs.siteKeywords
        }
    },
    components: {
        RecentContents,
        HotContents,
        Messages,
        RandomArticle
    },
    data() {
        return {
            // contentDetails: this.$store.getters.contentDetails
        }
    },
    beforeMount() {

    },
    computed: {
        ...mapGetters([
            'contentDetails',
            'systemConfig'
        ]),
        contentCates() {
            let cates = this.contentDetails.doc.categories;
            if (typeof cates == 'object' && cates.length > 1) {
                return cates[cates.length - 1].name
            } else {
                return '其它'
            }
        }
    },
    asyncData({
            store,
        route
        }) {
        let contentId = route.params.id;
        let params = {}, currentId = '';
        if (contentId) {
            if (contentId.indexOf('html') > 0) {
                currentId = contentId.substr(0, contentId.length - 5);
            } else {
                currentId = contentId;
            }
            params.id = currentId;
        }
        return store.dispatch('getContentDetails', params)
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
