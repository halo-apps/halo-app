<template>
  <div class="text-cascader">
    <span v-for="(items,index) in groups">
      <span :style="{color:item.color}" v-for="(item,i) in items" :key="item.value">{{item.text}}{{i==items.length-1?'':' / '}}</span><span
      class="cascader-seperator" v-if="index!=groups.length-1">,</span>
    </span>
  </div>
</template>

<script>
  import {getParents} from "../../../plugins/cascader-helper";

  export default {
    name: 'TextCascader',
    props: {
      field: {type: Object, default: null},
      value: {type: String, default: null}
    },
    methods: {},
    computed: {
      values() {
        if (this.value) {
          return this.value.split(',')
        }
        return []
      },
      groups() {
        if (this.values.length > 0) {
          let options = this.field.dictionary.items
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
