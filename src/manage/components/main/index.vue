<template>
    <div class="admin-main">
        <el-row :gutter="15">
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-card class="box-card pannel-box">
                        <div slot="header" class="clearfix">
                            <span>概况</span>
                        </div>
                        <div class="box-body">
                            <ul class="row basic-count">
                                <li>
                                    <i class="fa fa-fw fa-user"></i> 管理员: <span>{{basicInfo.adminUserCount}}</span>
                                </li>
                                <li>
                                    <i class="fa fa-fw fa-users"></i> 用户: <span>{{basicInfo.regUserCount}}</span>
                                </li>
                                <li>
                                    <i class="fa fa-fw fa-file-text-o"></i> 文档: <span>{{basicInfo.contentCount}}</span>
                                </li>
                                <li>
                                    <i class="fa fa-fw fa-comments-o"></i> 留言: <span>{{basicInfo.messageCount}}</span>
                                </li>
                            </ul>
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-card class="box-card pannel-box">
                        <div slot="header" class="clearfix">
                            <span>快捷操作</span>
                        </div>
                        <div class="box-body">
                            <ul class="row quick-opt">
                                <li>
                                    <el-button size="small" type="primary" plain round @click="getToPage('adminUser')">
                                        <i class="fa fa-fw fa-user"></i> 添加管理员</el-button>
                                </li>
                                <li>
                                    <el-button size="small" type="success" plain round @click="getToPage('addContent')">
                                        <i class="fa fa-fw fa-file-text-o"></i> 添加文档</el-button>
                                </li>
                                <li>
                                    <el-button size="small" type="info" plain round @click="getToPage('adminResource')">
                                        <i class="fa fa-fw fa-th-list"></i> 资源管理</el-button>
                                </li>
                                <li>
                                    <el-button size="small" type="warning" plain round @click="getToPage('systemConfig')">
                                        <i class="fa fa-fw fa-cog"></i> 系统配置</el-button>
                                </li>
                            </ul>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="15">
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-card class="box-card pannel-box">
                        <div slot="header" class="clearfix">
                            <span>近期评论</span>
                        </div>
                        <div class="box-body">
                            <div class="row user-messages">
                                <div v-if="basicInfo.messages && basicInfo.messages.length > 0">
                                    <div class="direct-chat-msg" v-for="msg in basicInfo.messages" :key="msg._id">
                                        <div v-if="msg.utype =='0'">
                                            <div class="direct-chat-info clearfix">
                                                <span class="direct-chat-name pull-left">
                                                    <a href="#">{{msg.author.userName}}</a>
                                                在 <a :href="'/details/'+msg.contentId._id+'.html'" target="_blank">{{msg.contentId.title}}</a> 中说
                                            </span>
                                                <span class="direct-chat-timestamp pull-right"><i class="fa fa-clock-o"></i> <span>{{msg.date}}</span></span>
                                            </div>
                                            <img alt="message user image" :src="msg.author.logo" class="direct-chat-img">
                                            <div class="direct-chat-text" v-html="msg.content"></div>
                                        </div>
                                        <div v-else-if="msg.utype =='1'">
                                            <div class="direct-chat-info clearfix">
                                                <span class="direct-chat-name pull-left">
                                                    <a href="#">{{msg.adminAuthor.userName}}</a>
                                                在 <a :href="'/details/'+msg.contentId._id+'.html'" target="_blank">{{msg.contentId.title}}</a> 中回复 <a href="#">{{msg.replyAuthor.userName}}</a>
                                            </span>
                                                <span class="direct-chat-timestamp pull-right"><i class="fa fa-clock-o"></i> <span>{{msg.date}}</span></span>
                                            </div>
                                            <img alt="message user image" :src="msg.adminAuthor.logo" class="direct-chat-img">
                                            <div class="direct-chat-text" v-html="msg.content"></div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>暂无数据</div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-card class="box-card pannel-box">
                        <div slot="header" class="clearfix">
                            <span>新注册用户</span>
                        </div>
                        <div class="box-body">
                            <ul class="row user-list">
                                <div v-if="basicInfo.regUsers && basicInfo.regUsers.length > 0">
                                    <li v-for="user in basicInfo.regUsers" :key="user._id">
                                        <img :src="user.logo" :alt="user.userName" :title="user.userName" /><span>{{user.userName | cutWords(8)}}</span>
                                    </li>
                                </div>
                                <div v-else>暂无数据</div>
                            </ul>
                        </div>
                    </el-card>
                </div>
            </el-col>

        </el-row>
    </div>
</template>
<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'

    export default {
        name: 'admin-main',
        data() {
            return {

            }
        },

        methods: {
            getToPage(targetPage) {
                this.$router.push(targetPage);
            }
        },
        computed: {
            ...mapGetters([
                'basicInfo'
            ]),
        },
        mounted() {
            this.$store.dispatch('getSiteBasicInfo');
        }
    }
</script>

<style lang="scss">
    .admin-main {
        margin-top: 20px;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 15px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .pannel-box {
        margin-bottom: 10px;
        ul {
            margin: 0;
            padding: 0;
            li {
                list-style-type: none;
            }
        }
        .quick-opt {
            li {
                display: inline-block;
                margin: 5px 2px;
            }
        }

        .basic-count {
            li {
                color: #5A5E66;
                line-height: 25px;
                span {
                    color: #409EFF;
                    font-style: oblique;
                }
            }
        }
        .user-list {
            li {
                display: inline-block;
                margin-bottom: 10px;
                position: relative;
                width: 100px;
                img {
                    border-radius: 50%;
                    max-width: 75%;
                    height: auto;
                    width: 26px;
                    position: absolute;
                }
                span {
                    height: 26px;
                    line-height: 26px;
                    margin-left: 30px;
                }
            }
        }
    }
</style>