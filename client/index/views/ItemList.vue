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
                margin-top: 0;
            }
        }
    }
}
</style>
<template>
    <div>
        <div v-for="item in contentList.docs" class="content-item">
            <el-row :gutter="0">
                <el-col :xs="0" :sm="0" :md="6" :lg="6">
                    <div class="grid-content bg-purple contentImg">
                        <img :src="item.sImg" />
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="18" :lg="18" class='discription'>
                    <div class="grid-content bg-purple-light title">
                        <h3>
                            <router-link :to="'/details/'+item._id+'.html'" class="continue-reading">{{item.title}}</router-link>
                        </h3>
                    </div>
                    <div class="dis">{{item.discription}}</div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import compA from '../components/compA.vue'
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    props: {
        type: String,
        contentList: Object
    },
    // name: 'cmslistview',
    data() {
        return {
            // displayedItems: this.$store.getters.contentList
        }
    },
    components: {
        compA
    },
    methods: {

    },
    computed: {
        
    }

}
</script>