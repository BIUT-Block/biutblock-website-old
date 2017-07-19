<style lang='scss'>
article:last-child {
    border: none
}
</style>
<template>
    <div class="post">
        <TopItem v-for="item in contentList.docs" :item="item" :key="item._id" v-once/>
        <div class="content-pagination">
            <Pagination :pageInfo="contentList.pageInfo" :typeId="typeId" />
        </div>
    </div>
</template>

<script>
import Pagination from '../components/Pagination.vue'
import TopItem from './TopItem'
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    name: 'itemlist',
    props: {
        page: Number,
        typeId: String,
        contentList: Object,
    },
    data() {
        return {
            // displayedItems: this.$store.getters.contentList
        }
    },
    components: {
        Pagination,
        TopItem
    },
    methods: {

    },
    computed: {

    }

}

</script>
