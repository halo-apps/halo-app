<template>
  <div class="custom">
    <v-toolbar color="primary" dark class="toolbar">
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title v-if="meta">{{meta.title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <div>
      自定义页面待实现
    </div>
  </div>
</template>

<script>
  import {getMenuByPath} from "../../store/commons/user";

  export default {
    name: "Custom",
    computed: {
      meta() {
        let matched = this.$route.matched
        let result = matched[matched.length - 1].meta
        return result
      }
    }
  }
</script>

<style scoped>

</style>
