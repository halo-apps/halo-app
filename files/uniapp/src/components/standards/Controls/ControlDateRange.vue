<template>
  <el-date-picker type="daterange" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" :disabled="field.readonly"
    :value="model" @change="change">
  </el-date-picker>
</template>

<script>
  import {
    getValue,
    setValue
  } from '../../../plugins/standards/control-helper'

  export default {
    name: "ControlDateRange",
    props: {
      field: {
        type: Object,
        default: null
      },
      table: {
        type: Object,
        default: null
      },
      form: {
        type: Object,
        default: null
      }, //大表单信息
      index: {
        type: Number,
      }, //当前行的索引
    },
    methods: {
      change({
        detail
      }) {
        this.model = detail.value
      }
    },
    computed: {
      model: {
        get() {
          let result = getValue(this.form, this.index, this.table, this.field)
          return result
        },
        set(val) {
          setValue(val, this.form, this.index, this.table, this.field)
          this.$emit('change', this.form)
        }
      }
    }
  }
</script>

<style scoped>

</style>
