<template>
  <text-dictionary :table="table" :field="field" :index="index" :form="form" :page="page">
  </text-dictionary>
</template>

<script>
  import TextDictionary from './TextDictionary'

  export default {
    name: 'TextRadio',
    components: { TextDictionary },
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
    }
  }
</script>

<style scoped>

</style>
