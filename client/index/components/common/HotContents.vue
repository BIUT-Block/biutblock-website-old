<template>
    <div class="hot-content-list">
        <h3 class="content-title normaltitle">
            <span>热门文章</span>
        </h3>
        <div class="content-list">
            <ul>
                <li v-for="(item,index) in hotContentList.docs">
                    <router-link :to="'/details/'+item._id+'.html'">{{index+1}}.&nbsp;{{item.stitle}}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'HotContents',
    computed: {
        hotContentList() {
            return this.$store.getters.hotContentList
        }
    },
    asyncData({
            store
        }) {
        return store.dispatch('getHotContentList', { model: 'simple' })
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
}
</style>
