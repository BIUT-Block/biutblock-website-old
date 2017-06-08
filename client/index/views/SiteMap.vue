<style lang='scss'>
.siteMap {
    padding: 15px;
}

.siteMap ol li {
    height: 25px;
}
</style>
<template>
    <div class="container min-hight" style="margin-bottom: 20px;background: #FFFFFF">
        <div class="col-md-12 siteMap">
            <ol>
                <li v-for="item in siteMapList">
                    <router-link :to="'/details/'+item._id+'.html'" class="continue-reading">{{item.title}}</router-link>
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    props: {

    },
    name: 'sitemap',
    data() {
        return {
            // displayedItems: this.$store.getters.contentList
        }
    },
    methods: {

    },
    computed: {
        ...mapGetters([
            'siteMapList'
        ])
    },
    asyncData({
            store
        }) {
        return store.dispatch('siteMapList')
    }

}
</script>