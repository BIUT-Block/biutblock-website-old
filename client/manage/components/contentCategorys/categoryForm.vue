<template>
    <div class="dr-AdminResourceForm">
        <el-dialog size="small" title="填写分类信息" :visible.sync="dialogState.show" :close-on-click-modal="false">
            <el-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                {{dialogState.formData}}
                <el-form-item v-show="dialogState.type==='children' && !dialogState.edit" label="父对象" prop="label">
                    <el-input size="small" :disabled="true" v-model="dialogState.formData.parentId"></el-input>
                </el-form-item>
                <el-form-item label="类别名称" prop="label">
                    <el-input size="small" v-model="dialogState.formData.label"></el-input>
                </el-form-item>
                <el-form-item label="有效" prop="enable">
                    <el-switch on-text="是" off-text="否" v-model="dialogState.formData.enable"></el-switch>
                </el-form-item>
                <el-form-item label="Url" prop="label">
                    <el-input size="small" v-model="dialogState.formData.defaultUrl"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sortId">
                    <el-input-number size="small" v-model="dialogState.formData.sortId" @change="handleChange" :min="1" :max="50"></el-input-number>
                </el-form-item>
                <el-form-item label="关键字" prop="keywords">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="dialogState.formData.keywords"> </el-input>
                </el-form-item>
                <el-form-item label="描述" prop="comments">
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
                },
                options: [{
                    value: '0',
                    label: '基础菜单'
                }, {
                    value: '1',
                    label: '操作和功能'
                }]
            };
        },
        methods: {
            handleChange(value) {
                console.log(value);
            },
            confirm() {
                this.$store.dispatch('hideAdminResourceForm')
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('---formdatas--', this);
                        let params = this.dialogState.formData;
                        // params.parentId = this.dialogState.type === 'root' ? '0' : this.dialogState.formData
                        //     .parent
                        //     ._id;
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