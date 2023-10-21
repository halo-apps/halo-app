<template>
  <view class="debug" v-if="settings.web.debug">
    <slot></slot>
  </view>
</template>

<script>
  import store from '../../store/index.js'
  export default {
    name: "Debug",
    computed: {
      settings() {
        return store.state.system.settings
      },
    }
  }
</script>

<style lang="scss" scoped>
  .debug {
    &::before {
      content: '调试信息';
      width: 12rpx;
      color: #f40;
      position: absolute;
      left: -25rpx;
    }

    display: block;
    position: relative;
    word-break: break-all;
    color: #999;
    font-size: 24rpx;
    margin-top: 10px;
  }
</style>
