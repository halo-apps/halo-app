<template>
  <el-date-picker
    v-model="model"
    type="datetime"
    value-format="yyyy-MM-dd HH:mm:ss"
    :disabled="field.readonly"
    placeholder="选择日期时间">
  </el-date-picker>
</template>

<script>
  import { getValue, setValue } from '../../../plugins/standards/control-helper'

  export default {
    name: "ControlDateTime",
    props: {
      field: {type: Object, default: null},
      table: {type: Object, default: null},
      form: {type: Object, default: null},//大表单信息
      index: {type: Number,},//当前行的索引
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
