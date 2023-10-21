<template>
  <view>
    <detail :ref="menu.pageType" :menu="menu" v-if="menu.pageType=='Detail'"></detail>
    <index :ref="menu.pageType" :menu="menu" :route="menu.url" :query="menu.query" v-else-if="menu.pageType=='Index'"></index>
    <paging :ref="menu.pageType" :menu="menu" v-else-if="menu.pageType=='Paging'"></paging>
    <list :ref="menu.pageType" :menu="menu" v-else-if="menu.pageType=='List'"></list>
    <update :ref="menu.pageType" :menu="menu" v-else-if="menu.pageType=='Update'"></update>
    <custom :ref="menu.pageType" :menu="menu" v-else-if="menu.pageType=='Custom'"></custom>
    <view v-else>未支持的页面类型{{menu.pageType}}</view>
  </view>
</template>

<script>
  import store from '../store/index.js'
  import Debug from '../components/commons/Debug.vue'
  import Detail from './standards/Detail.vue'
  import Index from './standards/Index.vue'
  import Paging from './standards/Paging.vue'
  import List from './standards/List.vue'
  import Update from './standards/Update.vue'
  import Custom from './Custom.vue'
  import {
    getUrlFromMenu
  } from '../plugins/url-helper.js'

  export default {
    components: {
      Debug,
      Detail,
      Index,
      Paging,
      List,
      Update,
      Custom
    },
    props: {
      menu: {
        type: Object,
        required: true
      }
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>
<style>
</style>
