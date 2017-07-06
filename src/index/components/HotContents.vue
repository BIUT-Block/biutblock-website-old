<template>
    <div class="hot-content-list">
        <h3 class="content-title pannel-title">
            <span>热门文章</span>
        </h3>
        <div class="content-list">
            <ul>
                <li v-for="(item,index) in hotContentList.docs">
                    <router-link :to="'/details/'+item._id+'.html'">{{item.title}}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'hotContents',
    serverCacheKey: props => {
        return `hotlist-${props.typeId}`
    },
    props: {
        typeId: String
    },
    computed: {
        hotContentList() {
            return this.$store.getters.hotContentList
        }
    },
    beforeMount() {
        let currentTypeId = this.typeId || 'indexPage';
        this.$store.dispatch('getHotContentList', {
            model: 'simple',
            typeId: currentTypeId,
            sortby: 'clickNum'
        })
    },
    asyncData({
            store
        }) {
        let currentTypeId = this.typeId || 'indexPage'
        return store.dispatch('getHotContentList', {
            model: 'simple',
            typeId: currentTypeId,
            sortby: 'clickNum'
        })
    }
}

</script>

<style lang="scss">
.hot-content-list {
    margin-bottom: 40px;
    .content-list {
        text-align: left;
        ul {
            li {
                font-size: 14px;
                position: relative;
                padding-left: 15px;
                border-bottom: 1px dashed #ededed;
                a {
                    display: block;
                    width: 100%;
                    line-height: 30px;
                    padding: 8px 0px;
                }
            }
        }
    }
    .content-list ul li:before {
        position: absolute;
        top: 20px;
        left: 0;
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background: #20A0FF;
        content: "";
    }
}
</style>
