<template>
  <view class="text-code" v-if="value">
    <view :class="table.name + '-' + field.name + '-' + index" v-if="from=='List'">{{value}}</view>
    <rich-text :nodes="htmlValue" v-else></rich-text>
  </view>
</template>

<script>
  import {
    getValue
  } from '../../../plugins/standards/control-helper'

  export default {
    name: 'TextCode',
    props: {
      table: {
        type: Object,
        default: null
      },
      field: {
        type: Object,
        default: null
      },
      index: {
        type: Number,
        default: null
      },
      form: {
        type: Object,
        default: null
      },
      from: {
        type: String,
        default: null
      },
      page: {
        type: Number,
        default: null
      }
    },
    data() {
      return {}
    },
    created() {},
    computed: {
      htmlValue() {
        let result = this.value.replace(/\r\n/g, "<br/>")
        return result
      },
      value() {
        let value = getValue(this.form, this.index, this.table, this.field, this.page)
        return value
      },
      language() {
        return this.field.control.type.toLowerCase()
      }
    }
  }
</script>

<style lang="scss">
  .text-code {
    display: block;
    overflow-x: scroll;
  }
</style>
