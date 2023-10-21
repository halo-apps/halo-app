<template>
  <control-text :data="data" :field="field" :table="table" :index="index"></control-text>
</template>

<script>

  import ControlText from "./ControlText";

  export default {
    name: "Control",
    components: {ControlText},
    props: {
      data: Object,
      field: Object,
      table: Object,
      index: Number
    },
  }
</script>

<style scoped>

</style>
