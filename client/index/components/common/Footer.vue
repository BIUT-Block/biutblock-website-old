<template>
    <footer class="footer">
        <div class="container text-left">
            <ul>
                <li>自豪的采用&nbsp;
                    <a href="https://github.com/doramart/DoraCMS" rel="nofollow" target="_blank" title="代码在这里">DoraCMS 2.0
                    </a>&nbsp;Copyright (c) 2017 &nbsp;
                    <a href="http://www.miitbeian.gov.cn/" rel="nofollow" target="_blank">
                        {{systemConfig.configs.registrationNo}}
                    </a> All Rights Reserved</li>
                <li>
                    <router-link to="/sitemap.html" class="">站点地图</router-link>&nbsp;应用案例：
                    <a href="http://www.dailyads.cn" target="_blank">每日一广告</a>&nbsp;
                </li>
            </ul>
        </div>
    </footer>
</template>
<script>
let packageJson = require("../../../../package.json");

import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'systemConfig'
        ]),
        codeVersion() {
            return "DoraCMS " + packageJson.version
        }
    },
    asyncData({
            store
        }) {
        return store.dispatch('getSystemConfig');
    }
}
</script>
<style lang="scss">
.footer {
    background: #faf9f4;
    padding: 20px 0;

    ul {
        li {
            text-align: center;
            line-height: 35px;
            height: 35px;
        }
    }
}
</style>

