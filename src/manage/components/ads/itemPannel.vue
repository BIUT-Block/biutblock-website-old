<template>
    <div>
        <ItemForm :formState="adsItemForm" />
        <div class="dr-ads-item" v-for="item in items" :key="item._id">
            <div class="img">
                <img :src="item.sImg" />
            </div>
            <div class="details">
                <ul>
                    <li>名称：{{item.alt}}</li>
                    <li>链接：{{item.link}}</li>
                </ul>
            </div>
            <div class="options">
                <el-button size="mini" type="primary" @click="editAdsItemInfo(item)">
                    <i class="fa fa-edit"></i>
                </el-button>
            </div>
        </div>
    </div>
</template>
<script>
import services from '../../store/services.js';
import _ from 'lodash';
import ItemForm from './itemForm'
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    props: {
        items: Array
    },
    components: {
        ItemForm
    },
    computed: {
        ...mapGetters([
            'adsItemForm'
        ])
    },
    data() {
        return {

        };
    },
    methods: {
        editAdsItemInfo(item) {
            this.$store.dispatch('showAdsItemForm', {
                edit: true,
                formData: item
            });
        }
    }
}

</script>
<style lang="scss">
.dr-ads-item {
    color: #48576a;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    padding: 5px;
    position: relative;
    .img {
        width: 70px;
        height: 70px;
        position: absolute;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .details {
        display: inline-block;
        margin-left: 80px;
        ul {
            margin: 0;
            padding: 0;
            li {
                list-style-type: none;
            }
        }
    }
    .options {
        position: absolute;
        right: 20px;
        top: 20px;
    }
}
</style>
