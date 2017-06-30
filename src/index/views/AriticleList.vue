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
                                <div v-if="options.typeName !== '首页'">
                                    <div v-if="options.typeId === 'tags'">
                                        <h3 class="catetitle">
                                            <div>标签
                                                <span style="color:#20A0FF;font-weight:700">{{tagName}}</span> 下的文章</div>
                                        </h3>
                                    </div>
                                    <div v-else>
                                        <h3 class="catetitle">
                                            <div>分类
                                                <span style="color:#20A0FF;font-weight:700">{{options.typeName}}</span> 下的文章</div>
                                        </h3>
                                    </div>
                                </div>
                                <ItemList :contentList="contentList" :typeId="options.typeId" />
                            </el-col>
                            <el-col :xs="0" :sm="6" :md="6" :lg="6" class="content-mainbody-right">
                                <div class="grid-content bg-purple-light title">
                                    <div v-if="checkCateList">
                                        <CatesMenu :options="options" />
                                    </div>
                                    <Tag/>
                                    <HotContents :typeId="options.typeId" />
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
    import Tag from '../components/common/Tag.vue'
    import HotContents from '../components/common/HotContents.vue'
    import CatesMenu from '../components/common/CatesMenu.vue'
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        props: ['options'],
        name: 'cmslistview',
        title() {
            return this.options.typeName || '首页'
        },
        discription() {
            return this.options.discription || this.systemConfig.configs.siteDiscription;
        },
        keywords() {
            return this.options.keywords || this.systemConfig.configs.siteKeywords;
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
            CatesMenu
        },
        computed: {
            ...mapGetters([
                'contentList',
                'systemConfig'
            ]),
            page() {
                return Number(this.$store.state.route.params.page) || 1
            },
            tagName() {
                return this.$store.state.route.params.tagName
            },
            checkCateList() {                
                return this.options.typeId != 'indexPage' && shortid.isValid(this.options.typeId);
            }
        }

    }
</script>