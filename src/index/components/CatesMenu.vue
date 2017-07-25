<template>
    <div class="catesMenu">
        <h3 class="pannel-title">
            <span>分类目录</span>
        </h3>
        <div>
            <div class="parent-name">{{options.typeName}}</div>
            <ul class="cate-list">
                <li v-for="(nav,index) in rightNavs" v-once>
                    {{nav.name}}
                </li>
            </ul>
        </div>
    
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex';
import _ from 'lodash'
export default {
    serverCacheKey: props => {
        return `navlist-${props.options.typeName}`
    },
    props: ['options'],
    name: 'CatesMenu',
    computed: {
        rightNavs() {
            let fullNav = this.$store.getters.headerNav;
            let parentId = this.options.typeId;
            return _.filter(fullNav, (doc) => {
                return doc.parentId === parentId
            });
        }
    }
}

</script>
<style lang="scss">
.catesMenu {
    margin-bottom: 40px;
    font-size: 14px;
    .parent-name {
        color: #6e7173;
        font-weight: 700;
        height: 30px;
        line-height: 30px;
    }
    .cate-list {
        padding-left: 10px;
    }
    .cate-list li {
        font-weight: normal;
        height: 30px;
        line-height: 30px;
    }
}
</style>
