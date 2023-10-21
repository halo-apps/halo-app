<template>
  <v-text-field v-model="model" :rules="[]"
                :counter="field.length" :label="field.label">
  </v-text-field>
</template>

<script>
  export default {
    name: "ControlText",
    props: {
      data: Object,
      field: Object,
      table: Object,
      index: Number
    },
    computed: {
      model: {
        get() {
          return this.data[this.table.name][this.index][this.field.name]
        },
        set() {

        }
      }
    }
  }
</script>

<style scoped>

</style>
