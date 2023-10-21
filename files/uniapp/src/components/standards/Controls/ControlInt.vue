<template>
  <view class="control-int">
    <input type="number" :placeholder="`请输入${field.label}`" :disabled="field.readonly" :value="model">
    </input>
    <view class="suffix" v-if="field.suffix">{{field.suffix}}</view>
  </view>
</template>

<script>
  import {
    getValue,
    setValue
  } from '../../../plugins/standards/control-helper'

  export default {
    name: "ControlInt",
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
    computed: {
      model: {
        get() {
          let result = getValue(this.form, this.index, this.table, this.field)
          if (result)
            return parseInt(result)
          return result
        },
        set(val) {
          if (val) //有值才 转换为int，防止null被转换成NaN
            val = parseInt(val)
          setValue(val, this.form, this.index, this.table, this.field)
          this.$emit('change', this.form)
        }
      }
    }
  }
</script>

<style scoped>
  .control-int {
    display: flex;
  }
</style>
