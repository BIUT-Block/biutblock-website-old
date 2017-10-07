<template>
    <PannelBox title="近期文章" className="recent-content-list">
        <div class="content-list">
            <ul>
                <li :key='index' v-for="(item,index) in recentItems">
                    <router-link :to="'/details/'+item._id+'.html'">{{item.stitle | cutWords(25)}}</router-link>
                </li>
            </ul>
        </div>
    </PannelBox>
</template>
<script>
    import PannelBox from './PannelBox.vue'
    export default {
        name: 'recentlyContents',
        data() {
            return {
                loadingState: true
            }
        },
        components: {
            PannelBox
        },
        props: ['recentItems']
    }
</script>

<style lang="scss">
    .recent-content-list {
        margin-bottom: 30px;
        .content-list {
            text-align: left;
            ul {
                margin: 0 0 0 30px;
                li {
                    font-size: 16px;
                    color: #333;
                    height: 55px;
                    border-bottom: 1px solid #f0f0f0;
                    line-height: 55px;
                }
            }
        }
    }
</style>