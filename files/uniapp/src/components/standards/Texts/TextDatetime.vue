<template>
  <text-text :table="table" :field="field" :index="index" :form="form" :page="page"></text-text>
</template>

<script>
  import TextText from './TextText'

  export default {
    name: 'TextDatetime',
    components: {
      TextText
    },
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
    }
  }
</script>

<style scoped>

</style>
