<style lang='scss'>
    .post-b {
        border-bottom: 1px solid #f0f0f0;
        padding: 30px 0;
    }

    .post-b:last-child {
        border: none;
    }
</style>
<template>
    <div class="post-b">
        <TopItem :item="item" :key="item._id" />
    </div>
</template>

<script>
    import TopItem from './TopItem'
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        name: 'itemlist',
        props: ['item'],
        data() {
            return {
                // displayedItems: this.$store.getters.contentList
            }
        },
        components: {
            // Pagination,
            TopItem
        },
        methods: {

        },
        computed: {

        }

    }
</script>