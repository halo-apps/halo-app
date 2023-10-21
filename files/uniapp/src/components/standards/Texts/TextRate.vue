<template>
	<uni-rate :disabled="true" :value="value"></uni-rate>
</template>

<script>
  import { getValue } from '../../../plugins/standards/control-helper'

  export default {
    name: 'TextRate',
    props: {
      table: { type: Object, default: null },
      field: { type: Object, default: null },
      index: { type: Number, default: null },
      form: { type: Object, default: null },
      from: { type: String, default: null },
      page: {
        type: Number,
        default: null
      }
    },
    computed: {
      value() {
        let value = getValue(this.form, this.index, this.table, this.field, this.page)
        if (value) {
          return parseInt(value)
        }
        return value
      }
    }
  }
</script>

<style scoped>

</style>
