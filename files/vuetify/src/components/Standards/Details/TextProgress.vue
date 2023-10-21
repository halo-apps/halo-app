<template>
  <div>
    <v-progress-linear class="text-progress" :value="model">
      <span>{{ Math.ceil(model) }}%</span>
    </v-progress-linear>
  </div>
</template>

<script>
  export default {
    name: "TextProgress",
    props: {
      value: {type: String, default: null},
    },
    data() {
      return {}
    },
    computed: {
      model: {
        get() {
          return parseInt(this.value)
        }
      },
      status() {
        if (this.model == 100)
          return "success"
        return null
      },
    },
  }
</script>

<style lang="scss">
  .text-progress {
    min-width: 100px;
    font-size: 12px;
    font-weight: normal;
    border-radius: 3px;
    height: 15px !important;

    .v-progress-linear__content {
      justify-content: flex-end;
    }
  }
</style>
