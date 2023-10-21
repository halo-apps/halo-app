<template>
  <span class="text-dictionary">
    <span :style="{color:item.color}" v-for="(item,i) in data" :key="item.value">
      {{item.text}}{{item.suffix?`(${item.suffix})`:''}}{{i==data.length-1?'':', '}}
    </span>
  </span>
</template>

<script>
  import { getValue } from '../../../plugins/standards/control-helper'

  export default {
    name: 'TextDictionary',
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
    methods: {},
    computed: {
      value() {
        let value = getValue(this.form, this.index, this.table, this.field, this.page)
        return value
      },
      values() {
        if (this.value) {
          return this.value.split(',')
        }
        return []
      },
      data() {
        if (this.values.length > 0) {
          let result = this.field.dictionary.data.filter(n => this.values.indexOf(n.value) > -1)
          return result
        }
        return []
      }
    }
  }
</script>

<style scoped>

</style>
