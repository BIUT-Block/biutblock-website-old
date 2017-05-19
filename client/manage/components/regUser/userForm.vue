<template>
    <div class="dr-regUserForm">
        <el-dialog size="small" title="填写用户信息" :visible.sync="dialogState.show" :close-on-click-modal="false">
            <el-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="userName">
                    <el-input size="small" v-model="dialogState.formData.userName"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input size="small" v-model="dialogState.formData.name"></el-input>
                </el-form-item>
                <el-form-item label="有效" prop="enable">
                    <el-switch on-text="是" off-text="否" v-model="dialogState.formData.enable"></el-switch>
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
        dialogState: Object,
        groups: Array
    },
    data() {
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
            this.$store.dispatch('hideRegUserForm')
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('---formdatas--', this);
                    let params = this.dialogState.formData;
                    // 更新
                    if (this.dialogState.edit) {
                        services.updateRegUser(params).then((result) => {
                            if (result.state === 'success') {
                                this.$store.dispatch('hideRegUserForm');
                                this.$store.dispatch('getRegUserList');
                                this.$message({
                                    message: '更新成功',
                                    type: 'success'
                                });
                            } else {
                                this.$message.error('出错啦！');
                            }
                        });
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