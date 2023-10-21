<template>
  <el-progress :percentage="value" :status="status"></el-progress>
</template>

<script>
  import {
    getValue
  } from '../../../plugins/standards/control-helper'

  export default {
    name: 'TextProgress',
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
    computed: {
      value() {
        let value = getValue(this.form, this.index, this.table, this.field, this.page)
        if (value) {
          return parseInt(value)
        }
        return value
      },
      status() {
        if (this.value == 100) {
          return 'success'
        }
        return null
      }
    }
  }
</script>

<style lang="scss">
  .detail {
    .el-progress {
      line-height: 35px;
    }
  }
</style>
