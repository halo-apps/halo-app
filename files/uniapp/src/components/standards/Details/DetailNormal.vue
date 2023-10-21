<template>
  <view :class="{'normal-layout':true,primary:table.primary,child:!table.primary}">
    <view class="normal-row" v-for="(row,i) in form[table.name]" :key="i">
      <view class="normal-field" v-for="field in table.show" :key="field.name">
        <view class="normal-title">{{field.label}}</view>
        <textualize class="normal-text" :table="table" :field="field" :index="i" :form="form" from="Detail"></textualize>
      </view>
    </view>
  </view>
</template>

<script>
  import Textualize from "./Textualize.vue"

  export default {
    components: {
      Textualize
    },
    props: {
      table: {
        type: Object,
        required: true
      },
      form: {
        type: Object,
        required: true
      },
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss">

</style>
