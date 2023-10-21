<template>
  <view v-if="field.search=='Betweens'" class="control-decimal-range">
    <input clearable :disabled="field.readonly" :placeholder="field.prefix||field.suffix" v-model="start" />
    -
    <input clearable :disabled="field.readonly" :placeholder="field.prefix||field.suffix" v-model="end" />
  </view>
  <view class="control-decimal" v-else>
    <view class="prefix" v-if="field.prefix">{{field.prefix}}</view>
    <input type="digit" :disabled="field.readonly" v-model="model" />
    <view v-if="field.suffix">{{field.suffix}}</view>
  </view>
</template>

<script>
  import {
    getValue,
    setValue
  } from '../../../plugins/standards/control-helper'

  export default {
    name: 'ControlDecimal',
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
        type: Number
      }, //当前行的索引
    },
    computed: {
      model: {
        get() {
          let result = getValue(this.form, this.index, this.table, this.field)
          if (this.field.search == 'Betweens') {
            if (result) {
              let a = result.split(',')
              return a
            } else {
              return [null, null]
            }
          }
          return result
        },
        set(val) {
          let value
          if (this.field.search == 'Betweens') {
            value = val.join(',')
            setValue(value, this.form, this.index, this.table, this.field)
          } else {
            value = val
            if (!isNaN(value)) {
              setValue(value, this.form, this.index, this.table, this.field)
            }
          }
          this.$emit('change', this.form)
        }
      },
      start: {
        get() {
          return this.model[0]
        },
        set(val) {
          //如果输入值，不是数字，不触发更新逻辑
          if (!isNaN(val)) {
            this.model = [val, this.model[1]]
          }
        }
      },
      end: {
        get() {
          return this.model[1]
        },
        set(val) {
          //如果输入值，不是数字，不触发更新逻辑
          if (!isNaN(val)) {
            this.model = [this.model[0], val]
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .control-decimal {
    display: flex;

    .prefix {
      margin-right: .2rem;
    }
  }

  .control-decimal-range {
    .el-input--medium {
      width: calc(50% - 8px);
    }
  }
</style>
