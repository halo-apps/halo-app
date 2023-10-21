<template>
  <view>
    <uni-card :title="menu.name" v-for="menu in menus" :key="menu.url" v-if="menus">
      <uni-grid :column="3" @change="jump($event,menu)">
        <uni-grid-item class="menu-item" v-for="(child,i) in menu.children" :key="child.url" :index="i">
          <text class="menu-name">{{child.name}}</text>
        </uni-grid-item>
      </uni-grid>
    </uni-card>
  </view>
</template>
<script>
  import Container from '../components/commons/Container.vue'
  import request from '../plugins/request.js'
  import store from '../store/index.js'
  import {
    getUrlFromMenu
  } from '../plugins/url-helper.js'
  export default {
    components: {
      Container,
    },
    data() {
      return {
        isLoading: true,
      }
    },
    methods: {
      jump({
        detail
      }, parent) {
        let menu = parent.children[detail.index]
        let url = getUrlFromMenu(menu)
        uni.navigateTo({
          url: url
        })
      }
    },
    computed: {
      menus() {
        if (store.state.user.menu) {
          return store.state.user.menu.menus
        }
        return null
      }
    }
  }
</script>

<style lang="scss">
  .menu-item {
    .menu-name {}
  }
</style>
