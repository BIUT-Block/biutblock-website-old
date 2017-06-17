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
                                <ItemList :contentList="contentList" :typeId="typeId" />
                            </el-col>
                            <el-col :xs="0" :sm="6" :md="6" :lg="6" class="content-mainbody-right">
                                <div class="grid-content bg-purple-light title">
                                    <Tag/>
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
import ItemList from './ItemList.vue'
import Tag from '../components/common/Tag.vue'
import HotContents from '../components/common/HotContents.vue'
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    props: {
        type: String
    },
    name: 'cmslistview',
    title() {
        return this.$store.state.route.meta.title || '首页'
    },
    discription() {
        return this.$store.state.route.meta.discription || '首页'
    },
    keywords() {
        return this.$store.state.route.meta.keywords
    },
    data() {
        return {
            // displayedItems: this.$store.getters.contentList
        }
    },
    components: {
        ItemList,
        Tag,
        HotContents
    },
    computed: {
        ...mapGetters([
            'contentList'
        ]),
        page() {
            return Number(this.$store.state.route.params.page) || 1
        },
        typeId() {
            return this.$store.state.route.meta.typeId || 'indexPage'
        }
    },
    asyncData({
            store,
        route
        }) {
        let params = {};
        if (route) {
            params.typeId = route.meta.typeId;
        }
        params.current = Number(route.params.page) || 1;
        return store.dispatch('indexContentList', params)
    }

}
</script>