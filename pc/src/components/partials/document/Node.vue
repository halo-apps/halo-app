<script setup lang="ts">
import {toRefs} from "vue";
import {StringHelper} from "hona-pc";

let props = defineProps({
  table: {type: Object},
  data: {type: Object},
  node: {type: Object},
})
let {table, data, node} = toRefs(props)

let getNumber = (node: any, row: any) => {
  let number = (node.parent.data.Children ? node.parent.data.Children.indexOf(row) : node.parent.data.indexOf(row)) + 1
  return StringHelper.padLeft(number, 2, '0')
}
</script>

<template>
  <div>
    <span class="number">{{ getNumber(node, data) }}</span>
    {{ data[table.layout.text] }}
    <span class="count" v-if="data.Children&&data.Children.length>0">({{ data.Children.length }})</span>
  </div>
</template>

<style lang="scss">
</style>