<style lang='scss'>
.siteMap {
    padding: 15px;
}

.siteMap ul li {
    height: 25px;
}
</style>
<template>
    <div class="container min-hight" style="margin-bottom: 20px;background: #FFFFFF">
        <div class="col-md-12 siteMap">
            <ul>
                <li v-for="(item,index) in siteMapList.doc">
                    <router-link :to="'/details/'+item._id+'.html'" class="continue-reading">{{index+1}}.&nbsp;{{item.title}}</router-link>
                </li>
            </ul>
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