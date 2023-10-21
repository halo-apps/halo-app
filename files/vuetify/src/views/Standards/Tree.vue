<template>
  <div class="tree">
    <v-toolbar color="primary" dark class="toolbar">
      <v-btn icon @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title v-if="result">{{result.title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <div>树页面待实现</div>
  </div>
</template>

<script>
  import {getRouteFromUrl} from "../../plugins/url-helper";

  export default {
    name: "Tree",
    data() {
      return {
        result: null
      }
    },
    methods: {
      goBack() {
        let returnUrl = this.$route.query.return_url
        let route = getRouteFromUrl(returnUrl)
        this.$router.push(route)
      }
    }
  }
</script>

<style scoped>

</style>
