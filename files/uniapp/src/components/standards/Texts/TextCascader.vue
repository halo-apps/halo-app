<template>
  <div class="text-cascader">
    <span v-for="(items,index) in groups" :key="index">
      <span :style="{color:item.color}" v-for="(item,i) in items" :key="item.value">{{item.text}}{{i==items.length-1?'':' / '}}</span><span
      class="cascader-seperator" v-if="index!=groups.length-1">,</span>
    </span>
  </div>
</template>

<script>
  import { getParents } from '../../../plugins/standards/cascader-helper'
  import { getValue } from '../../../plugins/standards/control-helper'

  export default {
    name: 'TextCascader',
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
      groups() {
        if (this.values.length > 0) {
          let options = this.field.dictionary.data
          let result = []
          this.values.forEach(value => {
            let parents = []
            getParents(value, options, parents, [])
            if (parents.length > 0) {
              result.push(parents)
            }
          })
          return result
        }
        return []
      }
    }
  }
</script>

<style scoped>
  .cascader-seperator {
    margin-right: 5px;
  }
</style>
