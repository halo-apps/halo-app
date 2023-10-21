<template>
  <text-code :table="table" :field="field" :index="index" :form="form" :from="from" :page="page"></text-code>
</template>

<script>
  import TextCode from './TextCode'

  export default {
    name: 'TextJson',
    components: {
      TextCode
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
