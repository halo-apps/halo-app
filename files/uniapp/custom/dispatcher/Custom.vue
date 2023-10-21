<template>
  <view v-if="route=='/dashboard'">
    <dashboard></dashboard>
  </view>
  <view v-else>
    自定义页面 {{route}} 待实现
  </view>
</template>

<script>
  import Dashboard from "../views/Dashboard.vue"

  export default {
    components: {
      Dashboard,
    },
    props: {
      route: {
        type: String
      }
    },
    data() {
      return {}
    },
  }
</script>

<style>
</style>
