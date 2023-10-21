<template>
  <v-rating v-model="model" readonly small></v-rating>
</template>

<script>
  export default {
    name: "TextRate",
    props: {
      value: {type: String, default: null},
    },
    computed: {
      model: {
        get() {
          if (this.value)
            return parseInt(this.value)
          return null
        },
        set(val) {
        }
      }
    }
  }
</script>

<style scoped>

</style>
