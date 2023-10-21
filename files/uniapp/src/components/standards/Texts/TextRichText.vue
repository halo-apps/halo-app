<template>
  <rich-text :nodes="value" v-if="from=='List'" style="height: 18px;"></rich-text>
  <rich-text :nodes="value" v-else></rich-text>
</template>

<script>
  import {
    getValue
  } from '../../../plugins/standards/control-helper'

  export default {
    name: 'TextRichText',
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
    computed: {
      value() {
        let value = getValue(this.form, this.index, this.table, this.field, this.page)
        return value || '' //防止控件报错
      }
    }
  }
</script>

<style scoped>

</style>
