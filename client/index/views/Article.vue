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
                                    <h2>{{contentDetails.doc.title}}</h2>
                                    <div class="content-author">
                                        <ul>
                                            <li class="author-name">
                                                <a>{{contentDetails.doc.author.name}}</a>
                                            </li>
                                            <li>
                                                <span class="dot">&nbsp;•&nbsp;</span>{{contentDetails.doc.categories[contentDetails.doc.categories.length-1].name}}
                                            </li>
                                            <li>
                                                <span class="dot">&nbsp;•&nbsp;</span>阅:{{contentDetails.doc.clickNum}}
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-html="contentDetails.doc.comments">
                                    </div>
                                </div>
                            </el-col>
                            <el-col :xs="0" :sm="6" :md="6" :lg="6" class="content-mainbody-right">
                                <div class="grid-content bg-purple-light title">
                                    <HotContents/>
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
import HotContents from '../components/common/HotContents.vue'

export default {
    name: 'cmsarticleview',
    serverCacheKey() {
        let articleState = this.__VUE_SSR_CONTEXT__.state;
        let serverCacheKey = 'cmsarticleview';
        if (articleState) {
            let articleObj = articleState.mutations.contentDetails.doc;
            serverCacheKey = articleObj._id + '::' + articleObj.updateDate
        }
        return serverCacheKey;
    },
    components: {
        HotContents
    },
    data() {
        return {
            // contentDetails: this.$store.getters.contentDetails
        }
    },
    computed: {
        ...mapGetters([
            'contentDetails'
        ])
    },
    asyncData({ store, route }) {
        let contentId = route.params.id;
        let params = {};
        if (contentId) {
            let currentId = contentId.substr(0, contentId.length - 5);
            params.id = currentId;
        }
        return store.dispatch('getContentDetails', params)
    }

}
</script>
<style lang="scss">
.content-detail {
    color: #3f3f3f;
    img {
        max-width: 100% !important;
    }
    .content-author {
        color: #999999;
        ul {
            li.author-name {
                color: #20A0FF;
            }
            li {
                display: inline-block;
                margin: 0px;
                font-size: 15px;
            }
        }
    }
}
</style>
