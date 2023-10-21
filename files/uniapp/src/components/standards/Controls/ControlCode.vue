<template>
  <input type="text" v-model="model" v-if="from=='List'"></input>
  <textarea :class="className" :placeholder="'请输入'+field.label" :maxlength="-1" :disabled="field.readonly" :value="model"
    @input="input" v-else>
  </textarea>
</template>

<script>
  import {
    getValue,
    setValue
  } from '../../../plugins/standards/control-helper'

  export default {
    name: 'ControlCode',
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
      }, //当前行的索引，不定义表示是列表搜索控件
      form: {
        type: Object,
        default: null
      }, //大表单信息
      from: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        className: 'control-code ' + this.table.name + '-' + this.field.name + '-' + this.index,
        editor: null
      }
    },
    methods: {
      input({
        detail
      }) {
        this.model = detail.value
      }
    },
    created() {
      if (this.from == 'List')
        return
    },
    computed: {
      model: {
        get() {
          let result = getValue(this.form, this.index, this.table, this.field)
          return result || ''
        },
        set(val) {
          let value = val.toString()
          setValue(value, this.form, this.index, this.table, this.field)
          this.$emit('change', this.form)
        }
      },
    }
  }
</script>

<style lang="scss">
  .control-code {
    height: 300px;
  }
</style>
