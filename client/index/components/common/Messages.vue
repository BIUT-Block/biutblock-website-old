<template>
    <div class="content-message">
        <h3>评论</h3>
        <div>
            <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <div class="give-message">
                        {{msgFormData}}
                        <el-form :model="msgFormData" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                            <el-form-item class="send-content" prop="content">
                                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="msgFormData.content">
                                </el-input>
                            </el-form-item>
                            <el-form-item class="send-button">
                                <div class="user-notice">
                                    <router-link to="/users/login">登录</router-link>&nbsp;后参与评论
                                </div>
                                <el-button type="primary" @click="submitForm('ruleForm')" size="small">提交评论</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </div>
        <ul>
            <li v-for="(item,index) in userMessageList.docs">
                <el-row :gutter="15">
                    <el-col :xs="2" :sm="2" :md="2" :lg="2">
                        <div class="user-logo">
                            <div v-if="item.utype == '1'">
                                <img :src="item.adminAuthor.logo" />
                            </div>
                            <div v-else>
                                <img :src="item.author.logo" />
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22">
                        <div class="user-name">
                            <div v-if="item.utype == '1'">
                                {{item.adminAuthor.userName}}
                                <span title="管理员" style="color: #20A0FF;font-size: 12px;">[
                                    <i class="el-icon-star-on"></i>&nbsp;管理员]</span>
                            </div>
                            <div v-else>{{item.author.userName}}</div>
                        </div>
                        <div class="user-content">
                            <div v-if="item.replyAuthor">
                                <span style="color: #20A0FF">{{'@'+item.replyAuthor.userName}}</span>&nbsp; {{item.content}}
                            </div>
                            {{item.content}}
                        </div>
                    </el-col>
                </el-row>
    
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'Message',
    data() {
        return {
            rules: {
                content: [{
                    required: true,
                    message: '请填写评论',
                    trigger: 'blur'
                }, {
                    min: 5,
                    max: 200,
                    message: '请输入5-200个字符',
                    trigger: 'blur'
                }]
            }
        }
    },
    props: {
        userMessageList: Object
    },
    computed: {
        msgFormData() {
            return this.$store.getters.userMessageFormData;
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('---formdatas--', this.msgFormData);

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }

}
</script>

<style lang="scss">
.content-message {
    h3 {}
    ul {
        li {
            margin: 15px 0;
            border-top: 1px dashed #e8e8e8;
            padding-top: 15px;
            font-size: 14px;
            .user-logo {

                img {
                    width: 100%;
                }
            }
            .user-content {
                color: #666666;
            }
            .user-name {
                color: #20A0FF;
            }
        }
    }
    .give-message {
        .el-form-item__content {
            margin-left: 0 !important;
        }
        .user-notice {
            float: left;
        }
        .send-content {
            margin-bottom: 10px;
        }
        .send-button {
            margin-top: 5px;
            text-align: right;
        }
    }
}
</style>
