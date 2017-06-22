<style lang='scss'>
.content-item {
    padding-bottom: 35px;
    margin-bottom: 40px;
    overflow: hidden;
    border-bottom: 1px dashed #f1f1f1;
    .contentImg {
        img {
            width: 100%;
        }
        margin-right: 30px;
        height: auto;
        display: block;
    }
    .discription {
        text-align: left;
        .title {
            h3 {
                margin: 0;
            }
            time {
                color: #a2a2a2;
                margin-top: 14px;
                font-style: normal;
                font-size: 15px;
                display: inline-block;
                margin-left: 3px;
                margin-bottom: 15px;
            }
        }
        .dis {
            font-size: 15px;
        }
    }
}
</style>
<template>
    <div>
        testme
        <div class="content-pagination">
    
        </div>
    </div>
</template>

<script>
import Pagination from '../components/common/Pagination.vue'
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    props: {
        page: Number,
        typeId: String,
        contentList: Object,

    },
    // name: 'cmslistview',
    data() {
        return {
            // displayedItems: this.$store.getters.contentList
        }
    },
    components: {
        Pagination
    },
    methods: {

    },
    computed: {

    }

}
</script>