<style lang='scss'>
.contentContainer {
    margin-top: 30px;
}
</style>
<template>
    <div>
        <div class="contentContainer">
            <div>
                <el-row :gutter="0">
                    <el-col :xs="1" :sm="1" :md="1" :lg="1">
                        <div class="grid-content bg-purple">&nbsp;</div>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" class="content-mainbody-left">
                        <el-row :gutter="24">
                            <el-col :xs="24" :sm="18" :md="18" :lg="18">
                                <div v-if="metaOption.typeName !== '首页'">
                                    <div v-if="metaOption.typeId === 'tags'">
                                        <h3 class="catetitle">
                                            <div>标签
                                                <span style="color:#20A0FF;font-weight:700">{{tagName}}</span> 下的文章</div>
                                        </h3>
                                    </div>
                                    <div v-else>
                                        <h3 class="catetitle">
                                            <div>分类
                                                <span style="color:#20A0FF;font-weight:700">{{metaOption.typeName}}</span> 下的文章</div>
                                        </h3>
                                    </div>
                                </div>
                                <ItemList :contentList="contentList" :typeId="metaOption.typeId" />
                            </el-col>
                            <el-col :xs="0" :sm="6" :md="6" :lg="6" class="content-mainbody-right">
                                <div class="grid-content bg-purple-light title">
                                    <SearchBox />
                                    <div v-if="checkCateList">
                                        <CatesMenu :options="metaOption" />
                                    </div>
                                    
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
import shortid from 'shortid';
import ItemList from './ItemList.vue'
import Tag from '../components/Tag.vue'
import HotContents from '../components/HotContents.vue'
import CatesMenu from '../components/CatesMenu.vue'
import SearchBox from '../components/SearchBox.vue'
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    name: 'cms-list-view',
    metaInfo() {
        return {
            title: (this.metaOption.typeName || '首页') + ' | ' + this.systemConfig.configs.siteName,
            desc: this.metaOption.discription || this.systemConfig.configs.siteDiscription,
            keywords: this.metaOption.keywords || this.systemConfig.configs.siteKeywords
        }
    },
    data() {
        return {
            // displayedItems: this.$store.getters.contentList
        }
    },
    components: {
        ItemList,
        Tag,
        HotContents,
        CatesMenu,
        SearchBox
    },
    computed: {
        ...mapGetters([
            'contentList',
            'systemConfig'
        ]),
        metaOption() {
            return this.$store.state.route.meta;
        },
        page() {
            return Number(this.$store.state.route.params.page) || 1
        },
        tagName() {
            return this.$store.state.route.params.tagName
        },
        checkCateList() {
            return this.metaOption.typeId != 'indexPage' && shortid.isValid(this.metaOption.typeId);
        }
    },
    asyncData({ store, route }) {
        let options = route.meta;
        let params = { model: 'normal' };
        params.typeId = options.typeId || 'indexPage';
        if (route) {
            params.current = Number(route.params.page) || 1;
            if (route.params.tagName) {
                params.tagName = route.params.tagName
            }
            if (route.params.searchkey) {
                params.searchkey = route.params.searchkey
            }
        }
        return store.dispatch('indexContentList', params)
    }

}
</script>