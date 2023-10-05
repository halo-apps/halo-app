<script setup lang="ts">
import {StringHelper} from "hona-pc/commons";

let props = defineProps({
  data: {type: Object},
  node: {type: Object},
  table: {type: Object}
})

let getNumber = (node, rows) => {
  let number = (node.parent.data.Children ? node.parent.data.Children.indexOf(rows) : node.parent.data.indexOf(rows)) + 1
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