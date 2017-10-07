<template>
    <div :class="'pannel-box ' + className">
        <h3 class="pannel-title">{{title}}</h3>
        <span class="span-mark"></span>
        <slot></slot>
        <div class="pannel-footer"></div>
    </div>
</template>
<script>
    export default {
        name: 'PannelBox',
        props: ['title', 'className']
    }
</script>

<style lang="scss">
    .pannel-box {
        background-color: #fafafa;
        padding-bottom: 24px;
        margin-bottom: 30px;
    }

    .pannel-title {
        font-size: 20px;
        font-weight: 400;
        padding: 30px 30px 0 30px;
        margin: 0;
    }

    .span-mark {
        display: inline-block;
        background-color: #f63756;
        position: absolute;
        z-index: 1;
        height: 20px;
        line-height: 20px;
        margin: -20px 0 0 0;
        width: 4px;
    }

    .pannel-footer {
        clear: both;
    }
</style>