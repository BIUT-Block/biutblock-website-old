<template>
    <div class="content-tag">
        <h3 class="simpletitle">标签云</h3>
        <ul>
            <li v-for="(item,index) in tags" :key="item._id" v-once>
                <router-link :to="'/tag/'+item.name">{{item.name}}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    // async asyncData({ store, route }, config = {}) {
    //     const { params: path } = route
    //     const base = { ...config, path }
    //     await store.dispatch('global/tags/getTagList')
    // },
    name: 'Tag',
    props: ['tags']
    // computed: {
    //     ...mapGetters({
    //         tags: 'global/tags/getTagList'
    //     })
    // }
}

</script>

<style lang="scss">
.content-tag {
    text-align: left;
    margin-bottom: 40px;
    ul {
        li {
            font-size: 14px;
            list-style-type: none;
            display: inline-block;
            margin: 0 20px 0 0;
            a {
                padding: 10px 0px;
                display: inline-block;
                color: #6e7173;
                cursor: pointer;
            }
            a:link,
            a:visited {
                border-bottom: 1px dashed #ededed;
            }
            a:hover {
                border-bottom: 1px dashed #20A0FF;
                color: #20A0FF
            }
        }
    }
}
</style>
