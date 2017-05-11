<template>
    <div class="dr-AdminResourceForm">
        <el-dialog size="small" title="填写用户信息" :visible.sync="dialogState.show" :close-on-click-modal="false">
            <el-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="资源名称" prop="name">
                    <el-input size="small" v-model="dialogState.formData.name"></el-input>
                </el-form-item>
                <el-form-item label="资源描述" prop="comments">
                    <el-input size="small" v-model="dialogState.formData.comments"></el-input>
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
        return {
            rules: {
                name: [{
                    message: '请输入资源名称',
                    trigger: 'blur'
                },
                {
                    pattern: /[\u4e00-\u9fa5]/,
                    message: '2-6个中文字符',
                    trigger: 'blur'
                }
                ],
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
            this.$store.dispatch('hideAdminResourceForm')
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('---formdatas--', this);
                    let params = this.dialogState.formData;
                    // 更新
                    if (this.dialogState.edit) {
                        services.updateAdminResource(params).then((result) => {
                            if (result.state === 'success') {
                                this.$store.dispatch('hideAdminResourceForm');
                                this.$store.dispatch('getAdminResourceList');
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
                        services.addAdminResource(params).then((result) => {
                            if (result.state === 'success') {
                                this.$store.dispatch('hideAdminResourceForm');
                                this.$store.dispatch('getAdminResourceList');
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