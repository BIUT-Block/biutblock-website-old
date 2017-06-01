<style lang='scss'>
.contentContainer {}
</style>
<template>
    <div>
        <div class="contentContainer">
            <div>
                <el-row :gutter="0">
                    <el-col :xs="1" :sm="1" :md="2" :lg="2">
                        <div class="grid-content bg-purple">&nbsp;</div>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="20" :lg="20" class="content-mainbody-left">
                        <el-row :gutter="20">
                            <el-col :xs="24" :sm="18" :md="18" :lg="18">
                                <ItemList :contentList="contentList" />
                            </el-col>
                            <el-col :xs="0" :sm="6" :md="6" :lg="6" class="content-mainbody-right">
                                <div class="grid-content bg-purple-light title">
                                    <HotContents/>
                                    <Tag/>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="1" :sm="1" :md="2" :lg="2">
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
        ])
    },
    asyncData({
            store,
        route
        }) {
        let params = {};
        if (route) {
            params.typeId = route.meta.typeId;
        }
        console.log('-----route-----', params);
        return store.dispatch('indexContentList', params)
    }

}
</script>