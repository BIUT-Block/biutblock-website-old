<template>
    <div>
        <h3>我是新闻页</h3>
        <ul>
            <li v-for="(val,index) in news">{{val}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'news',
    data() {
        return {
            news: [
                '11111111',
                '22222222',
                '333333',
                '444444',
            ]
        }
    }
}
</script>