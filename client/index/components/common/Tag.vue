<template>
    <div class="content-tag">
        <h3>标签云</h3>
        <ul>
            <li v-for="(item,index) in tags">
                <router-link :to="'/tag/'+item.name">{{item.name}}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'Tag',
    computed: {
        tags() {
            return this.$store.getters.contentTag
        }
    },
    asyncData({
            store
        }) {
        return store.dispatch('contentTag')
    }
}
</script>

<style lang="scss">
.content-tag {
    text-align: left;
    margin-bottom: 40px;
    h3 {
        font-size: 16px;
        color: #000;
        font-weight: 100;
        margin: 0;
    }
    ul {
        li {
            list-style-type: none;
            display: inline-block;
            margin: 0 20px 0 0;
            a {
                padding: 15px 0px;
                display: inline-block;
                color: #a2a2a2;
                cursor: pointer;
            }
            a:link {
                border-bottom: 2px dashed #ededed;
            }
            a:hover {
                border-bottom: 2px dashed #20A0FF;
                color: #20A0FF
            }
        }
    }
}
</style>
