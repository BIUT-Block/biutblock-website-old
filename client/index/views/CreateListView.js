import Item from './AriticleList.vue'

export default function (options) {
  return {
    name: `${options.name}-list-view`,
    asyncData({ store, route }) {
      let params = { model: 'normal' };
      params.typeId = options.typeId || 'indexPage';
      if (route) {
        params.current = Number(route.params.page) || 1;
        console.log('---route.params---', route.params);
        if (route.params.tagName) {
          params.tagName = route.params.tagName
        }
      }
      return store.dispatch('indexContentList', params)
    },
    render(h) {
      return h(Item, { props: { options: options } })
    }
  }
}
