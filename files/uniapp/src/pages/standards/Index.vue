<template>
  <view class="index">
    <view class="menu-control" v-if="menu&&menu.children">
      <view :class="{'menu-item':true}" v-for="(child,i) in menu.children" :key="child.url" @click="jump(child)">
        <uni-icons :type="child.icon"></uni-icons>
        <view class="menu-name">{{ child.name }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import Container from '../../components/commons/Container.vue'
import store from '../../store/index.js'
import {
  getUrlFromMenu
} from "../../plugins/url-helper";
import {
  getMenuByPath
} from "../../plugins/menu-helper.js";

export default {
  name: "Index",
  components: {
    Container
  },
  props: {
    route: {
      type: String,
      required: true
    }, //要显示哪个路由的表单信息
    query: {
      type: Object
    }, //附加信息，比如主键等
    menu: {
      type: Object,
    }
  },
  data() {
    return {}
  },
  methods: {
    jump(child) {
      store.dispatch('system/setTitle', child.title)
      let url = getUrlFromMenu(child)
      uni.navigateTo({
        url: url,
      })
    },
  },
  created() {
    if (this.menu) {

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
.index {
  color: red;
}
</style>
