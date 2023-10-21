<template>
  <div class="text-text">{{value}}</div>
</template>

<script>
  import {
    getValue
  } from '../../../plugins/standards/control-helper'

  export default {
    name: 'TextTextarea',
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
        return value
      }
    }
  }
</script>

<style scoped>

</style>
