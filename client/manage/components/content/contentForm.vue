<template>
    <div class="dr-contentForm">
        <el-form :model="formState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
                <el-input size="small" v-model="formState.formData.title"></el-input>
            </el-form-item>
            <el-form-item label="简短标题" prop="stitle">
                <el-input size="small" v-model="formState.formData.stitle"></el-input>
            </el-form-item>
            <el-form-item label="来源" prop="from">
                <el-radio class="radio" v-model="formState.formData.from" label="1">原创</el-radio>
                <el-radio class="radio" v-model="formState.formData.from" label="2">转载</el-radio>
            </el-form-item>
            <el-form-item label="发布" prop="state">
                <el-switch on-text="是" off-text="否" v-model="formState.formData.state"></el-switch>
            </el-form-item>
            <el-form-item label="标签/关键字" prop="tags">
                <el-select size="small" v-model="formState.formData.tags" multiple filterable allow-create placeholder="请选择文章标签">
                    <el-option v-for="item in contentTagList.docs" :key="item._id" :label="item.name" :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="缩略图" prop="sImg">
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="文章类别" prop="categories">
                <el-cascader size="small" expand-trigger="hover" :options="contentCategoryList.docs" v-model="formState.formData.categories" @change="handleChangeCategory" :props="categoryProps">
                </el-cascader>
            </el-form-item>
            <el-form-item label="内容摘要" prop="discription">
                <el-input size="small" type="textarea" v-model="formState.formData.discription"></el-input>
            </el-form-item>
            <el-form-item label="文档详情" prop="comments">
                <!--<el-input size="small" type="textarea" v-model="formState.formData.comments"></el-input>-->
            </el-form-item>
            <el-form-item class="dr-submitContent">
                <el-button size="small" type="primary" @click="submitForm('ruleForm')">{{formState.edit ? '更新' : '保存'}}</el-button>
                <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
                <el-button size="small" @click="backToList">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="scss">
.dr-contentForm {
    margin: 15px 0;
    width: 60%;
    padding-bottom: 50px;
    .dr-submitContent {
        position: fixed;
        padding: 10px 30px;
        text-align: right;
        right: 0;
        bottom: 0;
        background: none;
        margin-bottom: 0;
    }
}
</style>

<script>
import services from '../../store/services.js';
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    props: {
        groups: Array
    },
    data() {
        return {
            categoryProps: {
                value: '_id',
                label: 'name',
                children: 'children'
            },
            fileList2: [],
            selectedOptions2: [],
            rules: {
                title: [{
                    required: true,
                    message: '请输入文档标题',
                    trigger: 'blur'
                },
                {
                    min: 5,
                    max: 50,
                    message: '5-50个非特殊字符',
                    trigger: 'blur'
                }
                ],
                stitle: [{
                    required: true,
                    message: '请输入简短标题',
                    trigger: 'blur'
                },
                {
                    min: 5,
                    max: 40,
                    message: '5-40个非特殊字符',
                    trigger: 'blur'
                }
                ],
                categories: [{
                    required: true,
                    message: '请选择文档文档类别',
                    trigger: 'blur'
                }],
                keywords: [{
                    required: true,
                    message: '请输入关键字',
                    trigger: 'blur'
                }],
                discription: [{
                    required: true,
                    message: '请输入内容摘要',
                    trigger: 'blur'
                },
                {
                    min: 5,
                    max: 100,
                    message: '5-100个非特殊字符',
                    trigger: 'blur'
                }
                ]
            }
        };
    },
    methods: {
        handleChangeCategory(value) {
            console.log(value);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        backToList() {
            this.$router.push('/content');
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('---formdatas--', this);
                    let params = this.formState.formData;
                    // 更新
                    if (this.formState.edit) {
                        services.updateContent(params).then((result) => {
                            if (result.state === 'success') {
                                this.$router.push('/content');
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
                        services.addContent(params).then((result) => {
                            if (result.state === 'success') {
                                this.$router.push('/content');
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
    computed: {
        ...mapGetters([
            'contentCategoryList',
            'contentTagList'
        ]),
        formState() {
            return this.$store.getters.contentFormState
        }
    },
    mounted() {
        // 针对手动页面刷新
        if (this.$route.params.id && !this.formState.formData.title) {
            services.getOneContent(this.$route.params).then((result) => {
                if (result.state === 'success') {
                    if (result.doc) {
                        this.$store.dispatch('showContentForm', {
                            edit: true,
                            formData: result.doc
                        });
                    } else {
                        this.$message({
                            message: '参数非法,请重新操作！',
                            type: 'warning',
                            onClose: () => {
                                this.$router.push('/content');
                            }
                        });
                    }
                } else {
                    this.$message.error('出错啦！');
                }
            });
        }
        this.$store.dispatch('getContentCategoryList');
        this.$store.dispatch('getContentTagList');
    }
}
</script>