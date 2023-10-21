<template>
  <scroll-view class="page-scroll-view" scroll-y scroll-with-animation refresher-enabled
    :refresher-triggered="refresherTriggered" @refresherrefresh="pullDownRefresh">
    <view>列表页面</view>
  </scroll-view>
</template>

<script>
  import {
    getApiUrl,
    serialize,
    deserialize,
    getUrlFromMenu
  } from '../../plugins/url-helper.js'
  export default {
    props: {
      menu: {
        type: Object
      }
    },
    data() {
      return {
        refresherTriggered: false,
        query: null
      }
    },
    methods: {
      init() {},
      pullDownRefresh() {
        this.refresherTriggered = true
        setTimeout(() => {
          this.refresherTriggered = false
        }, 100)
      },
    },
    created() {
      if (this.menu) {
        let url = getUrlFromMenu(this.menu)
        this.query = deserialize(url)
        this.init()
      }
    },
    onLoad(options) {
      this.query = options
      this.init()
    }
  }
</script>

<style>
</style>
