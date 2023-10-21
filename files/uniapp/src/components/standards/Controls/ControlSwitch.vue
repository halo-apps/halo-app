<template>
  <switch class="control-switch" :checked="model" :disabled="field.readonly" @change="change" />
</template>

<script>
  import {
    getValue,
    setValue
  } from '../../../plugins/standards/control-helper'

  export default {
    name: 'ControlSwitch',
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
      } //当前行的索引
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
          return result == true.toString()
        },
        set(val) {
          let value = val.toString()
          setValue(value, this.form, this.index, this.table, this.field)
          this.$emit('change', this.form)
        }
      }
    }
  }
</script>

<style lang="scss">
  .control-switch {
    zoom: .6;
  }
</style>
