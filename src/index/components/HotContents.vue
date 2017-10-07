<template>
    <div>
        <PannelBox title="热门文章" className="hot-content-list">
            <div class="content-list">
                <ul>
                    <li class="hot-li" v-for="(item,index) in hotItems" :key="item._id">
                        <router-link :to="'/details/'+item._id+'.html'" class="continue-reading">
                            <img :src="item.sImg" :alt="item.title" />
                        </router-link>
                        <router-link :to="'/details/'+item._id+'.html'">{{item.stitle?item.stitle:item.title}}</router-link>
                    </li>
                </ul>
            </div>
        </PannelBox>
    </div>
</template>
<script>
    import PannelBox from './PannelBox.vue'
    export default {
        name: 'hotContents',
        data() {
            return {
                loadingState: true
            }
        },
        props: ['hotItems', 'typeId'],
        components: {
            PannelBox
        },
        serverCacheKey: props => {
            return `hotItem-${props.typeId}`
        }
    }
</script>

<style lang="scss">
    .hot-content-list {
        margin-bottom: 30px;
        .content-list {
            text-align: left;
            ul {
                .hot-li:last-child{
                    border: none;
                }
                li {
                    padding: 30px 30px 24px 30px;
                    border-bottom: 1px solid #f0f0f0;
                    overflow: hidden;
                    img {
                        width: 100%;
                    }
                    a {
                        display: block;
                        width: 100%;
                        line-height: 30px;
                        padding: 8px 0px;
                    }
                }
            }
        }
    }
</style>