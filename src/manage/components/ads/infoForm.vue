<template>
    <div class="dr-adminGroupForm">
        {{formState}}
        <el-form :model="formState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="广告名" prop="name">
                <el-input size="small" v-model="formState.formData.name"></el-input>
            </el-form-item>
            <el-form-item label="广告类型" prop="type">
                <el-input size="small" v-model="formState.formData.type"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="comments">
                <el-input size="small" v-model="formState.formData.comments"></el-input>
            </el-form-item>
            <div v-if="formState.formData.items && formState.formData.items.length > 0">
                <el-form-item label="广告详情" prop="items">
                    <ItemPannel :items="formState.formData.items" />
                </el-form-item>
            </div>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">{{formState.edit ? '更新' : '保存'}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import services from '../../store/services.js';
const validatorUtil = require('../../../../utils/validatorUtil.js')
import ItemForm from './itemForm'
import ItemPannel from './itemPannel'

export default {
    data() {
        return {
            rules: {
                name: [{
                    message: '请输入广告名称',
                    trigger: 'blur'
                }, {
                    min: 2,
                    max: 15,
                    message: '请输入2-15个字符',
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
    components: {
        ItemForm,
        ItemPannel
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('---formdatas--', this);
                    let params = this.formState.formData;
                    // 更新
                    if (this.formState.edit) {
                        services.updateAds(params).then((result) => {
                            if (result.data.state === 'success') {
                                this.$store.dispatch('hideAdsItemForm');
                                this.$message({
                                    message: '更新成功',
                                    type: 'success'
                                });
                            } else {
                                this.$message.error(result.data.message);
                            }
                        });
                    } else {
                        // 新增
                        services.addAdminGroup(params).then((result) => {
                            if (result.data.state === 'success') {
                                this.$store.dispatch('hideAdminGroupForm');
                                this.$store.dispatch('getAdminGroupList');
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                            } else {
                                this.$message.error(result.data.message);
                            }
                        })
                    }

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    computed: {
        formState() {
            return this.$store.getters.adsInfoForm
        }
    },
    mounted() {
        // 针对手动页面刷新
        if (this.$route.params.id) {
            services.getOneAd(this.$route.params).then((result) => {
                if (result.data.state === 'success') {
                    if (result.data.doc) {
                        this.$store.dispatch('adsInfoForm', {
                            edit: true,
                            formData: result.data.doc
                        });
                    } else {
                        this.$message({
                            message: '参数非法,请重新操作！',
                            type: 'warning',
                            onClose: () => {
                                this.$router.push('/ads');
                            }
                        });
                    }
                } else {
                    this.$message.error(result.data.message);
                }
            });
        }
    }
}
</script>