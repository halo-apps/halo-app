<template>
  <view class="footer">
    详情默认操作自定义的
    <button form-type="submit" @click="update">修改</button>
  </view>
</template>

<script>
  export default {
    components: {},
    props: {
      partial: {
        type: String,
        default: null
      }
    },
    data() {
      return {}
    },
    methods: {
      update() {
        this.$emit('update')
      }
    }
  }
</script>

<style>
</style>
