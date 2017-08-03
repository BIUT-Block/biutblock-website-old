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
                                <ItemList v-for="item in topics.data" :item="item" :key="item._id" />
                                <div class="content-pagination">
                                    <Pagination :pageInfo="topics.pageInfo" :typeId="$route.params.typeId" />
                                </div>
                            </el-col>
                            <el-col :xs="0" :sm="6" :md="6" :lg="6" class="content-mainbody-right">
                                <div class="grid-content bg-purple-light title">
                                    <!-- <SearchBox />
                                        <div v-if="checkCateList">
                                            <CatesMenu :typeId="$route.params.typeId" />
                                        </div>
                                        <Tag :tags="tags.data" />
                                        <HotContents :hotItems="hotlist" :typeId="$route.params.typeId" v-if="hotlist.length > 0" /> -->
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
import shortid from 'shortid'
import { mapGetters } from 'vuex'
import metaMixin from '~mixins'
import HotContents from '../components/HotContents.vue'
import SearchBox from '../components/SearchBox.vue'
import ItemList from '../views/ItemList.vue'
import Pagination from '../components/Pagination.vue'
import Tag from '../components/Tag.vue'
import CatesMenu from '../components/CatesMenu.vue'


const fetchInitialData = async (store, config = { current: 1, model: 'normal' }) => {
    const { params: { id, key, tagName, current, typeId, searchkey }, path } = store.state.route
    const base = { ...config, limit: 10, id, path, searchkey, tagName, current, typeId }
    store.dispatch('frontend/article/getHotContentList', base)
    store.dispatch('global/tags/getTagList', base)
    await store.dispatch('frontend/article/getArticleList', base)
}

export default {
    name: 'frontend-index',
    async asyncData({store, route}, config = { current: 1,model:'normal'}) {
        const {params: {id, key, tagName, current, typeId, searchkey}, path} = route
        const base = { ...config, limit: 10, id, path, searchkey, tagName, current, typeId }
        store.dispatch('frontend/article/getHotContentList', base)
        store.dispatch('global/tags/getTagList', base)
        await store.dispatch('frontend/article/getArticleList', base)
    },
    mixins: [metaMixin],
    components: {
        ItemList,
        Pagination,
        HotContents,
        SearchBox,
        Tag,
        CatesMenu
    },
    computed: {
        ...mapGetters({
            topics: 'frontend/article/getArticleList',
            hotlist: 'frontend/article/getHotContentList',
            tags: 'global/tags/getTagList'
        })
    },
    metaInfo() {
        var title = 'M.M.F 小屋'
        const { id, key, by } = this.$route.params
        if (id) {
            const obj = this.category.find(item => item._id === id)
            if (obj) {
                title = obj.cate_name + ' - ' + title
            }
        } else if (key) {
            title = '搜索: ' + key + ' - ' + title
        } else if (by) {
            title = '热门 - ' + title
        }
        return {
            title,
            meta: [{ vmid: 'description', name: 'description', content: title }]
        }
    }
}
</script>