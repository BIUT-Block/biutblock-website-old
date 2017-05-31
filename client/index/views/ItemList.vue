<template>
    <div>
        <div class="content home">
            it's home pagexx
            <div v-for="item in contentList.docs">
                <router-link :to="'/details/'+item._id+'.html'" class="continue-reading">{{item.title}}</router-link>
            </div>
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
            type: String
        },
        name: 'cmslistview',
        data() {
            return {
                // displayedItems: this.$store.getters.contentList
            }
        },
        components: {
            compA
        },
        methods: {
            // ...mapActions([
            //     'indexContentList'
            // ]),
            // addOne() {
            //     // this.list.push('233')
            //     this.$router.push('/home');
            // }
        },
        computed: {
            ...mapGetters([
                'contentList'
            ]),
            formState() {
                return this.$store.getters.adminUserFormState
            }
        },

        asyncData({
            store,
            route
        }) {
            let params = {};
            if (route) {
                params.typeId = route.meta.typeId;
            }
            console.log('-----route-----', params);
            return store.dispatch('indexContentList', params)
        }
    }
</script>