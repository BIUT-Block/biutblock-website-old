<template>
    <div class="dr-adminUserForm">
        <el-dialog size="small" title="填写用户信息" :visible.sync="dialogState.show" :close-on-click-modal="false">
            <el-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="userName">
                    <el-input size="small" v-model="dialogState.formData.userName"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input size="small" v-model="dialogState.formData.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input size="small" type="password" v-model="dialogState.formData.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input size="small" type="password" v-model="dialogState.formData.confirmPassword"></el-input>
                </el-form-item>
                <el-form-item label="用户组" prop="group">
                    <el-select size="small" v-model="dialogState.formData.group" placeholder="请选择用户组">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="电话" prop="phoneNum">
                    <el-input size="small" v-model="dialogState.formData.phoneNum"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input size="small" v-model="dialogState.formData.email"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="comments">
                    <el-input size="small" type="textarea" v-model="dialogState.formData.comments"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">{{dialogState.edit ? '更新' : '保存'}}</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import services from '../../store/services.js';
import _ from 'lodash';
export default {
    props: {
        dialogState: Object
    },
    data() {
        let validateConfirmPassword = (rule, value, callback) => {
            if (value !== this.dialogState.formData.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            rules: {
                userName: [{
                    required: true,
                    message: '请输入用户',
                    trigger: 'blur'
                }, {
                    pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,11}$/,
                    message: '5-12个英文字符',
                    trigger: 'blur'
                }],
                name: [{
                    message: '请输入用户姓名',
                    trigger: 'blur'
                },
                {
                    pattern: /[\u4e00-\u9fa5]/,
                    message: '2-6个中文字符',
                    trigger: 'blur'
                }
                ],
                password: [{

                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }, {
                    pattern: /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5,}/,
                    message: '6-12位，只能包含字母、数字和下划线',
                    trigger: 'blur'
                }],
                confirmPassword: [{
                    required: true,
                    message: '请确认密码',
                    trigger: 'blur'
                }, {
                    validator: validateConfirmPassword,
                    trigger: 'blur'
                }],
                group: [{
                    required: true,
                    message: '请选择用户组',
                    trigger: 'change'
                }],
                phoneNum: [{
                    message: '请输入手机号',
                    trigger: 'blur'
                }, {
                    pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/,
                    message: '请填写正确的手机号码',
                    trigger: 'blur'
                }],
                email: [{
                    required: true,
                    message: '请填写邮箱',
                    trigger: 'blur'
                }, {
                    pattern: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
                    message: '请填写正确的邮箱',
                    trigger: 'blur'
                }],
                comments: [{
                    message: '请填写备注',
                    trigger: 'blur'
                }, {
                    min: 5,
                    max: 30,
                    message: '请输入5-30个字符',
                    trigger: 'blur'
                }]
            }
        };
    },
    methods: {
        confirm() {
            this.$store.dispatch('hideAdminUserForm')
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('---formdatas--', this);
                    let params = this.dialogState.formData;
                    // 更新
                    if (this.dialogState.edit) {
                        services.updateAdminUser(params).then((result) => {
                            if (result.state === 'success') {
                                this.$store.dispatch('hideAdminUserForm');
                                this.$store.dispatch('getAdminUserList');
                                this.$message({
                                    message: '更新成功',
                                    type: 'success'
                                });
                            } else {
                                this.$message.error('出错啦！');
                            }
                        });
                    } else {
                        // 新增
                        services.addAdminUser(params).then((result) => {
                            if (result.state === 'success') {
                                this.$store.dispatch('hideAdminUserForm');
                                this.$store.dispatch('getAdminUserList');
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                            } else {
                                this.$message.error('出错啦！');
                            }
                        })
                    }

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }

    }
}
</script>