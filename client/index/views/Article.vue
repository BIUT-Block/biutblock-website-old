<template>
    <div>
        <div class="content home">
            <div class="readme">
                <h2>{{contentDetails.doc.title}}</h2>
                <div v-html="contentDetails.doc.comments">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    name: 'Article',
    serverCacheKey: () => 'tag',
    data() {
        return {
            contentDetails: this.$store.getters.contentDetails
        }
    },
    // beforeMount() {
    //     let contentId = this.$route.params.id;
    //     let currentId = contentId.substr(0, contentId.length - 5)
    //     this.getContentDetails({ id: currentId }).then(() => {

    //     })
    // },
    ...mapActions([
        'getContentDetails'
    ]),
    asyncData({ store, route }) {
        let contentId = route.params.id;
        let currentId = contentId.substr(0, contentId.length - 5)
        console.log('---currentId---', currentId)
        return store.dispatch('getContentDetails', { id: currentId })
    }

}
</script>