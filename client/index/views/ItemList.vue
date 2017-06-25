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
        position: relative;
        .content-cate {
            position: absolute;
            top: .4rem;
            left: .4rem;
            display: block;
            padding: 0 .5rem;
            color: #fff;
            background: rgba(0, 0, 0, .5);
            font-size: .6rem;
            text-align: center;
            border-radius: 1rem;
            z-index: 11;
        }
    }
    .discription {
        text-align: left;
        .post-meta {
            li {
                display: inline-block;
                font-size: 13px;
                color: #bbbbbb;
                margin: 10px 10px 10px 0;
            }
        }
        .title {
            h2 {
                margin: 0;
                color: #6e7173;
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
            color: #828a92;
        }
    }
}

article:last-child {
    border: none
}
</style>
<template>
    <div class="post">
        <article v-for="item in contentList.docs" class="content-item">
            <el-row :gutter="0">
                <el-col :xs="0" :sm="0" :md="7" :lg="7">
                    <div class="grid-content bg-purple contentImg">
                        <div v-if="item.categories && item.categories.length>1">
                            <span class="content-cate">{{(item.categories)[item.categories.length-1].name}}</span>
                        </div>
                        <img :src="item.sImg" />
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="17" :lg="17" class='discription'>
                    <div class="grid-content bg-purple-light title">
                        <h2>
                            <router-link :to="'/details/'+item._id+'.html'" class="continue-reading">{{item.title}}</router-link>
                        </h2>
                        <ul class="post-meta">
                            <li>{{item.date | formatDateNearBy}}</li>
                            <li>
                                <i class="fa fa-bullseye" aria-hidden="true"></i>&nbsp;&nbsp;{{item.clickNum}}</li>
                            <li>
                                <i class="fa fa-comment" aria-hidden="true"></i>&nbsp;&nbsp;{{item.commentNum}}</li>
                        </ul>
                    </div>
                    <div class="dis">{{item.discription}}</div>
                </el-col>
            </el-row>
        </article>
        <div class="content-pagination">
            <Pagination :pageInfo="contentList.pageInfo" :typeId="typeId" />
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