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
                                                <a>{{contentDetails.doc.author ? contentDetails.doc.author.name:''}}</a>
                                            </li>
                                            <li>
                                                <span class="dot">&nbsp;•&nbsp;</span>{{contentDetails.doc.categories ? contentDetails.doc.categories[contentDetails.doc.categories.length-1].name:''}}
                                            </li>
                                            <li>
                                                <span class="dot">&nbsp;•&nbsp;</span>{{contentDetails.doc.date}}
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-html="contentDetails.doc.comments">
                                    </div>
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
        Messages
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
        ])
    },
    asyncData({
            store,
        route
        }) {
        let contentId = route.params.id;
        let params = {};
        if (contentId) {
            let currentId = contentId.substr(0, contentId.length - 5);
            params.id = currentId;
            params.cache = true;
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