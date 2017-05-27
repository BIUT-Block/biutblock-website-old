<template>
    <div>
        <div class="content home">
            it's home page
            <div v-for="item in displayedItems.docs">
                <router-link :to="'/details/'+item._id+'.html'" class="continue-reading">{{item.title}}</router-link>

            </div>
            <button @click="addOne">add a 233</button>
            <comp-a></comp-a>
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
        name: 'Home',
        serverCacheKey: () => 'home',
        data() {
            return {
                list: ['test', '233'],
                displayedItems: this.$store.getters.contentList
            }
        },
        components: {
            compA
        },
        methods: {
            ...mapActions([
                'indexContentList'
            ]),
            addOne() {
                // this.list.push('233')
                this.$router.push('/home');
            }
        },

        asyncData({
            store
        }) {
            return store.dispatch('indexContentList')
        }
    }
</script>