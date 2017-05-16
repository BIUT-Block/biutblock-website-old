<template>
  <el-tree :data="treeData" :props="defaultProps" node-key="id" default-expand-all :expand-on-click-node="false" :render-content="renderContent">
  </el-tree>
</template>

<script>

export default {
  props: {
    treeData: Array
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },

  methods: {
    append(store, data) {
      let formData = {};
      formData.parentId = data._id;
      this.$store.dispatch('showContentCategoryForm', {
        edit: false,
        type: 'children',
        formData: formData
      });
    },

    edit(store, data) {
      console.log('----', data)
      this.$store.dispatch('showContentCategoryForm', {
        edit: true,
        type: 'children',
        formData: data
      });
    },

    remove(store, data) {
      store.remove(data);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span>
          <span>
            <span>{node.label}</span>
          </span>
          <span style="float: right; margin-right: 20px">
            <el-button size="mini" on-click={() => this.append(store, data)}>添加</el-button>
            <el-button size="mini" on-click={() => this.edit(store, data)}>编辑</el-button>
            <el-button size="mini" on-click={() => this.remove(store, data)}>删除</el-button>
          </span>
        </span>);
    }
  }
};
</script>