function getTitle(vm) {
    const { metaInfo } = vm.$options
    if (metaInfo) {
        return typeof metaInfo === 'function' ? metaInfo.call(vm) : metaInfo
    }
}

const serverTitleMixin = {
    created() {
        const meta = getTitle(this)
        if (meta) {
            this.$ssrContext.title = meta.title || meta
            this.$ssrContext.description = meta.desc || meta
            this.$ssrContext.keywords = meta.keywords || meta
        }
    }
}

const clientTitleMixin = {
    mounted() {
        const meta = getTitle(this)
        if (meta) {
            document.title = `${meta.title} | 前端开发俱乐部` || meta
        }
    }
}

export default process.env.VUE_ENV === 'server'
    ? serverTitleMixin
    : clientTitleMixin
