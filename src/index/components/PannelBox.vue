<template>
    <div :class="'pannel-box ' + className">
        <h3 class="pannel-title">{{title}}</h3>
        <slot></slot>
        <div class="pannel-footer"></div>
    </div>
</template>
<script>
export default {
  name: "PannelBox",
  props: ["title", "className"]
};
</script>

<style lang="scss">
.pannel-box {
  padding: 15px;
  margin-bottom: 20px;
  background: #fff;
}

.pannel-title {
  margin: 0 0 10px;
  padding: 1px 0 1px 7px;
  font-size: 16px;
  font-weight: normal;
  border-left: 3px solid #3ca5f6;
}

.pannel-footer {
  clear: both;
}
</style>