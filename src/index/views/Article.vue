<template>
    <div>
        <div class="content-detail">
            <div class="readme">
                <el-row :gutter="0" class="header-main">
                    <el-col :xs="1" :sm="1" :md="3" :lg="3" :xl="6">
                        <div class="grid-content bg-purple">&nbsp;</div>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="18" :lg="18" :xl="12">
                        <el-row :gutter="24">
                            <el-col :xs="24" :sm="17" :md="17" :lg="17">
                                <div>
                                    <h2 class="content-title">{{article.doc.title}}&nbsp;<span v-show="article.doc.from == '2'" class="from">[转]</span></h2>
                                    <div class="content-author">
                                        <ul>
                                            <li class="author-name">
                                                <el-tag size="mini">{{article.doc.author ? article.doc.author.name:''}}</el-tag>
                                            </li>
                                            <li>
                                                <span class="dot">&nbsp;•&nbsp;</span>{{cateName}}
                                            </li>
                                            <li>
                                                <span class="dot">&nbsp;•&nbsp;</span>{{article.doc.date}}
                                            </li>
                                            <li>
                                                <span class="dot">&nbsp;•&nbsp;</span>{{article.doc.clickNum}}&nbsp;次阅读
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-html="article.doc.comments" class="content-main">
                                    </div>
                                    <div class="meta-bottom">
                                        <el-row :gutter="10">
                                        <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                                            <div class="like"> <el-button type="danger" plain round @click="likeIt(article.doc._id)"><i class="fa fa-heart-o"></i>&nbsp;喜欢 | {{article.doc.likeNum}}</el-button></div>
                                        </el-col>
                                        <el-col :xs="19" :sm="19" :md="19" :lg="19" :xl="19">
                                            <div class="share-group" v-if="systemConfig.data">
                                                <ul>
                                                    <el-popover
                                                    ref="popover1"
                                                    placement="top-start"
                                                    width="200"
                                                    trigger="hover"
                                                    popper-class="prop-wechat"
                                                    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                                                     <template slot-scope="scope">
                                                         <h5>打开微信“扫一扫”，打开网页后点击屏幕右上角分享按钮</h5>
                                                         <img :src="'/api/qrImg?detailLink='+systemConfig.data[0].siteDomain+'/details/'+article.doc._id+'.html'" :alt="article.doc.title">
                                                     </template>
                                                    </el-popover>
                                                    <li class="wechat">
                                                        <a v-popover:popover1>
                                                            <i class="fa fa-wechat"></i>
                                                        </a>
                                                    </li>
                                                    <li class="weibo">
                                                        <a :href="'http://service.weibo.com/share/share.php?url='+systemConfig.data[0].siteDomain+'/details/'+article.doc._id+'.html&amp;title='+article.doc.title+'&amp;pic='+((article.doc.sImg).indexOf('cdn')?'':systemConfig.data[0].siteDomain)+article.doc.sImg+'&amp;appkey=902932546 target=_blank'">
                                                        <i class="fa fa-weibo"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div class="jiathis_style_32x32">
                                                <a class="jiathis_button_qzone"></a>
                                                <a class="jiathis_button_tsina"></a>
                                                <a class="jiathis_button_weixin"></a>
                                                </div>
                                            </div>
                                        </el-col>
                                        </el-row>
                                    </div>
                                    <RandomArticle :articles="article.randomArticles" />
                                    <Messages :userMessageList="messages.data" :contentId="article.doc._id" />
                                </div>
                            </el-col>
                            <el-col :xs="0" :sm="7" :md="7" :lg="7" class="content-mainbody-right">
                                <div class="grid-content bg-purple-light title">
                                    <CatesMenu :typeId="typeId" />
                                    <RecentContents :recentItems="recentArticle" />
                                    <HotContents :hotItems="hotlist" :typeId="$route.params.typeId" v-if="hotlist.length > 0" />
                                    <AdsPannel id="Sk_n90ucb" />
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="1" :sm="1" :md="3" :lg="3" :xl="6">
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
    import HotContents from '../components/HotContents.vue'
    import CatesMenu from '../components/CatesMenu.vue'
    import AdsPannel from '../components/AdsPannel.vue'
    import api from "~api";
    export default {
        name: 'frontend-article',
        async asyncData({ store, route }) {
            const { path, params: { id } } = route;
            let params = {}, currentId = '';
            if (id) {
                if (id.indexOf('html') > 0) {
                    currentId = id.substr(0, id.length - 5);
                } else {
                    currentId = id;
                }
            }
            store.dispatch('frontend/article/getHotContentList', { typeId: 'indexPage', pageSize: 10})
            store.dispatch('global/message/getUserMessageList',{ contentId: currentId, pageSize: 999})
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
                hotlist: 'frontend/article/getHotContentList',
                messages: 'global/message/getUserMessageList',
                recentArticle: 'frontend/article/getRecentContentList',
                loginState: 'frontend/user/getSessionState',
                systemConfig: 'global/footerConfigs/getSystemConfig'
            }),
            cateName() {
                let catesArr = this.article.doc.categories;
                if (typeof catesArr === 'object' && catesArr.length > 1) {
                    return catesArr[catesArr.length - 1].name
                } else {
                    return '其它'
                }
            },
            typeId(){
                let catesArr = this.article.doc.categories;
                if (typeof catesArr === 'object' && catesArr.length > 1) {
                    return catesArr[0]._id
                } else {
                    return 'indexPage'
                }
            }
        },
        components: {
            Messages,
            RandomArticle,
            RecentContents,
            SearchBox,
            HotContents,
            CatesMenu,
            AdsPannel
        },
        methods: {
            addTarget(content) {
                if (!content) return ''
                return content.replace(/<a(.*?)href="http/g, '<a$1target="_blank" href="http')
            },
            likeIt(itemId){
                if (!this.loginState.logined) {
                    this.$router.push('/users/login');
                }else{
                   api.get("content/updateLikeNum", { contentId: itemId }).then(result => {
                        let data = result.data;
                        if (data.state == "success") {
                            this.article.doc.likeNum = data.likeNum;
                        } else {
                            this.$message({
                                    message: data.message,
                                    type: 'error'
                                });
                        }
                    }).catch((err) => {
                            this.$message.error(err.response.data.error)
                    }); 
                }  
            }

        },
        mounted() {
            // this.$options.asyncData({store: this.$store})
        },
        metaInfo() {
            const { title, discription, tags } = this.article.doc;
            let tagArr = ['doracms'];
            if(tags){
                tagArr = tags.map((item,index)=>{
                    return item ? item.name : 'doracms'
                })
            }
            return {
                title,
                titleTemplate: '%s | 前端开发俱乐部',
                meta: [
                    { vmid: 'description', name: 'description', content: discription },
                    { vmid: 'keywords', name: 'keywords', content: tagArr.join() }
                ]
            }
        }
    }

</script>
<style lang="scss">
.prop-wechat {
  text-align: center;
  h5 {
    line-height: 25px;
    font-weight: 700;
    margin-bottom: 0;
  }
  img {
    width: 10rem;
    height: 10rem;
  }
}
.content-detail {
  color: #3f3f3f;
  margin-top: 20px;
  .from {
    color: #fa5555;
    font-size: 13px;
    font-weight: normal;
  }
  img {
    max-width: 100% !important;
  }
  .content-title {
    margin-top: 0;
    font-weight: 700;
    font-size: 20px;
  }
  .content-author {
    color: #969696;
    ul {
      li.author-name {
        color: #409eff;
      }
      li {
        display: inline-block;
        margin-bottom: 10px;
        font-size: 13px;
      }
    }
  }
  .content-main {
    font-size: 15px;
  }
  .meta-bottom {
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 50px;
    margin-top: 30px;
    margin-bottom: 50px;
  }
  .share-group {
    text-align: right;
    ul {
      li {
        width: 3rem;
        height: 3rem;
        margin-left: 5px;
        text-align: center;
        border: 1px solid #dcdcdc;
        border-radius: 50%;
        vertical-align: middle;
        display: inline-block;
        cursor: pointer;
        i {
          font-size: 24px;
          line-height: 2;
        }
        .fa-qq {
          color: #4296d3;
        }
        .fa-wechat {
          color: #00bb29;
        }
        .fa-weibo {
          color: #e05244;
        }
      }
      li.more {
        border: none;
      }
    }
  }
}
</style>
