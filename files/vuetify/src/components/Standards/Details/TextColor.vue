<template>
  <span class="color-container">
    <span :style="{color:item.color}" v-for="(item,i) in items" :key="item.value">{{item.text}}{{i==items.length-1?'':', '}}</span>
  </span>
</template>

<script>
  export default {
    name: 'TextColor',
    props: {
      field: { type: Object, default: null },
      value: { type: String, default: null }
    },
    methods: {},
    computed: {
      values() {
        if (this.value) {
          return this.value.split(',')
        }
        return []
      },
      items() {
        if (this.values.length > 0) {
          let result = this.field.dictionary.items.filter(n => this.values.indexOf(n.value) > -1)
          return result
        }
        return []
      }
    }
  }
</script>

<style scoped>

</style>
