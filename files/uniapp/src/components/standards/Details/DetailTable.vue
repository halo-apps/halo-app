<template>
  <view class="table-layout">
    <view class="table-container">
      <view class="tr">
        <view class="th" v-for="field in table.show" :key="field.name">{{field.label}}</view>
      </view>
      <view class="tr" v-for="(row,i) in form[table.name]" :key="i">
        <view class="td" v-for="field in table.show" :key="field.name">
          <textualize :table="table" :field="field" :index="i" :form="form"></textualize>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import Textualize from './Textualize'

  export default {
    name: 'DetailTable',
    components: {
      Textualize
    },
    props: {
      form: {
        type: Object,
        required: true
      },
      table: {
        type: Object,
        required: true
      },
    }
  }
</script>

<style lang="scss">
</style>
