<template>
  <el-date-picker
    type="datetimerange"
    value-format="yyyy-MM-dd HH:mm:ss"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    :disabled="field.readonly"
    :picker-options="pickerOptions"
    v-model="model">
  </el-date-picker>
</template>

<script>
  import moment from 'moment'
  import { getValue, setValue } from '../../../plugins/standards/control-helper'

  export default {
    name: "ControlDateTimeRange",
    props: {
      field: {type: Object, default: null},
      table: {type: Object, default: null},
      form: {type: Object, default: null},//大表单信息
      index: {type: Number,},//当前行的索引
    },
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '小时',
            onClick(picker) {
              let start = moment().add(-1, 'hours').toDate()
              const end = moment().toDate()
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '今天',
            onClick(picker) {
              let start = moment().add(-1, 'days').toDate()
              let end = moment().toDate()
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', [start, start]);
            }
          }]
        }
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
