<template>
  <dispatcher-custom :route="menu.url" v-if="menu"></dispatcher-custom>
</template>

<script>
  import DispatcherCustom from '../../custom/dispatcher/Custom.vue'

  export default {
    components: {
      DispatcherCustom,
    },
    props: {
      menu: {
        type: Object
      }
    },
    data() {
      return {}
    },
  }
</script>

<style>
</style>
