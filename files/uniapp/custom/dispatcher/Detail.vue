<template>
  <view v-if="!partial">
    <default-detail @update="update"></default-detail>
  </view>
  <view v-else-if="partial=='/table/detail'">
    <table-detail @update="update"></table-detail>
  </view>
  <view v-else>
    <div>详情组件未实现，请检查组件路径配置是否正确</div>
  </view>
</template>

<script>
  import DefaultDetail from '../default/Detail.vue'
  import TableDetail from '../partial/table/Detail.vue'
  export default {
    components: {
      DefaultDetail,
      TableDetail,
    },
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
