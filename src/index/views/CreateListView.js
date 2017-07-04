import Item from './AriticleList.vue'

export default function (options) {
  return {
    name: `${options.name}-list-view`,
    asyncData({ store, route }) {
      let params = { model: 'normal' };
      params.typeId = options.typeId || 'indexPage';
      params.cache = true;
      if (route) {
        params.current = Number(route.params.page) || 1;
        if (route.params.tagName) {
          params.tagName = route.params.tagName
        }
        if (route.params.searchkey) {
          params.searchkey = route.params.searchkey
        }
      }
      return store.dispatch('indexContentList', params)
    },
    render(h) {
      return h(Item, { props: { options: options } })
    }
  }
}
