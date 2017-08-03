function getTitle(vm) {
  const {
    title
  } = vm.$options
  if (title) {
    return typeof title === 'function' ?
      title.call(vm) :
      title
  }
}

function getDiscription(vm) {
  const {
    discription
  } = vm.$options
  if (discription) {
    return typeof discription === 'function' ?
      discription.call(vm) :
      discription
  }
}

function getKeyWords(vm) {
  const {
    keywords
  } = vm.$options
  if (keywords) {
    return typeof keywords === 'function' ?
      keywords.call(vm) :
      keywords
  }
}

const serverTitleMixin = {
  created() {
    const title = getTitle(this)
    const discription = getDiscription(this)
    const keywords = getKeyWords(this)
    if (title) {
      this.$ssrContext.title = `${title} | 前端开发俱乐部`
    }
    if (discription) {
      this.$ssrContext.discription = `${discription}`
    }
    if (keywords) {
      this.$ssrContext.keywords = `${keywords}`
    }
  }
}

const clientTitleMixin = {
  mounted() {
    const title = getTitle(this)
    const discription = getDiscription(this)
    const keywords = getKeyWords(this)
    if (title) {
      document.title = `${title} | 前端开发俱乐部`
    }
    if (discription) {
      document.getElementById('discription').content = `${discription}`
    }
    if (keywords) {
      document.getElementById('keywords').content = `${keywords}`
    }
  }
}

export default process.env.VUE_ENV === 'server' ?
  serverTitleMixin :
  clientTitleMixin