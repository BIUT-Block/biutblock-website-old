<style lang='scss'>
.content-item {
    padding-bottom: 35px;
    margin-bottom: 40px;
    overflow: hidden;
    border-bottom: 2px dashed #f1f1f1;
    .contentImg {
        img {
            width: 100%;
            height: 120px;
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
        <article v-for="item in contentList.docs" class="content-item">
            <el-row :gutter="0">
                <el-col :xs="0" :sm="0" :md="7" :lg="7">
                    <div class="grid-content bg-purple contentImg">
                        <img :src="item.sImg" />
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="17" :lg="17" class='discription'>
                    <div class="grid-content bg-purple-light title">
                        <h3>
                            <router-link :to="'/details/'+item._id+'.html'" class="continue-reading">{{item.title}}</router-link>
                        </h3>
                        <time>{{item.date}}&nbsp;-&nbsp;阅&nbsp;{{item.clickNum}}</time>
                    </div>
                    <div class="dis">{{item.discription}}</div>
                </el-col>
            </el-row>
        </article>
        <div class="content-pagination">
            <Pagination :pageInfo="contentList.pageInfo" :typeId="typeId"/>
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