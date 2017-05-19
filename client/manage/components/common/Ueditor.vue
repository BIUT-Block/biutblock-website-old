<template>
    <div>
        <div ref="editor"></div>
    </div>
</template>
<script>
    //主体文件引入
    import '../../../../public/plugins/ueditor/ueditor.config.js'
    import '../../../../public/plugins/ueditor/ueditor.all.min.js'
    import '../../../../public/plugins/ueditor/lang/zh-cn/zh-cn.js'

    export default {
        data() {
            return {
                id: 'editor_' + (Math.random() * 100000000000000000),
            };
        },
        props: {
            value: {
                type: String,
                default: '',
            },
            config: {
                type: Object,
                default: {},
            }
        },
        watch: {
            value: function value(val, oldVal) {
                this.editor = UE.getEditor(this.id, this.config);
                if (val !== null) {
                    this.editor.setContent(val);
                }
            },
        },
        mounted() {
            this.$nextTick(function f1() {
                // 保证 this.$el 已经插入文档

                this.$refs.editor.id = this.id;
                console.log('---', this.id, this.config);
                this.editor = UE.getEditor(this.id, this.config);

                this.editor.ready(function f2() {
                    this.editor.setContent(this.value);

                    this.editor.addListener("contentChange", function () {
                        const wordCount = this.editor.getContentLength(true);
                        const content = this.editor.getContent();
                        const plainTxt = this.editor.getPlainTxt();
                        this.$emit('input', {
                            wordCount: wordCount,
                            content: content,
                            plainTxt: plainTxt
                        });
                    }.bind(this));

                    this.$emit('ready', this.editor);
                }.bind(this));
            });
        },
    };
</script>