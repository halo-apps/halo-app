<template>
  <view>
    <page-type ref="pageType" :menu="menu" v-if="menu"></page-type>
    <view class="tab-control" v-if="menus">
      <view :class="{'tab-item':true,'active':isActive(menu)}" v-for="menu in menus" :key="menu.url" @click="jump(menu)">
        <uni-icons :type="menu.icon"></uni-icons>
        <view class="tab-name">{{menu.name}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  import store from '../store/index.js'
  import Debug from '../components/commons/Debug.vue'
  import PageType from './PageType.vue'

  import {
    getUrlFromMenu
  } from '../plugins/url-helper.js'

  export default {
    components: {
      Debug,
      PageType
    },
    data() {
      return {
        query: null,
        menu: null
      }
    },
    methods: {
      isActive(menu) {
        return this.menu && (this.menu.id == menu.id)
      },
      jump(menu) {
        //不能使用路由跳转，否则会导致切换动画
        this.menu = menu
        //切换时更改标题
        uni.setNavigationBarTitle({
          title: menu.name
        })
      },
    },
    onLoad(e) {
      this.query = e
    },
    computed: {
      menus() {
        let menu = store.state.user.menu
        if (menu) {
          if (this.query && this.query.m) {
            this.menu = menu.menus.find(n => n.id == this.query.m)
          } else {
            //默认绑定第1个菜单
            this.menu = menu.menus[0]
          }
          return menu.menus
        }
        return null
      }
    },
    watch: {
      'menus': {
        handler(menus, oldVal) {},
        deep: true //深度监听
      }
    }
  }
</script>
<style lang="scss" scoped>
  .tab-control {
    position: fixed;
    bottom: 0;
  }
</style>
