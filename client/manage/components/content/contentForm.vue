<template>
    <div class="dr-adminUserForm">
        <el-form :model="formState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
                <el-input size="small" v-model="dialogState.formData.title"></el-input>
            </el-form-item>
            <el-form-item label="简短标题" prop="stitle">
                <el-input size="small" v-model="dialogState.formData.stitle"></el-input>
            </el-form-item>
            <el-form-item label="来源" prop="from">
                <el-radio class="radio" v-model="dialogState.formData.from" label="1">原创</el-radio>
                <el-radio class="radio" v-model="dialogState.formData.from" label="2">转载</el-radio>
            </el-form-item>
            <el-form-item label="发布" prop="state">
                <el-switch on-text="是" off-text="否" v-model="dialogState.formData.state"></el-switch>
            </el-form-item>
            <el-form-item label="TAG标签" prop="tags">
                <el-select v-model="dialogState.formData.tags" multiple filterable allow-create placeholder="请选择文章标签">
                    <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="缩略图" prop="sImg">
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="文章类别" prop="category">
                <el-select v-model="dialogState.formData.category" placeholder="请选择">
                    <el-option-group v-for="group in options3" :key="group.label" :label="group.label">
                        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-option-group>
                </el-select>
            </el-form-item>
            <el-form-item label="关键字" prop="keywords">
                <el-input size="small" v-model="dialogState.formData.keywords"></el-input>
            </el-form-item>
            <el-form-item label="内容摘要" prop="discription">
                <el-input size="small" type="textarea" v-model="dialogState.formData.discription"></el-input>
            </el-form-item>
            <el-form-item label="文档详情" prop="comments">
                <el-input size="small" type="textarea" v-model="dialogState.formData.comments"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">{{dialogState.edit ? '更新' : '保存'}}</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
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
            options3: [{
            label: '热门城市',
            options: [{
                value: 'Shanghai',
                label: '上海'
            }, {
                value: 'Beijing',
                label: '北京'
            }]
            }, {
            label: '城市名',
            options: [{
                value: 'Chengdu',
                label: '成都'
            }, {
                value: 'Shenzhen',
                label: '深圳'
            }, {
                value: 'Guangzhou',
                label: '广州'
            }, {
                value: 'Dalian',
                label: '大连'
            }]
            }],
            options: [{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
            }, {
            value: '选项3',
            label: '蚵仔煎'
            }, {
            value: '选项4',
            label: '龙须面'
            }, {
            value: '选项5',
            label: '北京烤鸭'
            }],
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

    },
    computed:{
        formState() {
            console.log('---99',this.$store.getters.contentFormState);
            return this.$store.getters.contentFormState
        }
    }
}
</script>