<template>
  <v-app>
    <v-content>
      <router-view ref="view"/>
    </v-content>
    <v-footer>
      <Footer @refresh="refresh"></Footer>
    </v-footer>
  </v-app>
</template>

<script>
  import Footer from "../components/Commons/Footer";

  export default {
    name: "Layout",
    components: {Footer},
    methods: {
      refresh() {
        this.$refs.view.refresh()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-application {
    background: #ededf3;
    min-height: -webkit-fill-available; //解决手机Chrome浏览器导航栏被隐藏到屏幕下方的问题

    .header-title {
      font-size: 1em !important;
    }

    .v-content {
      height: calc(100vh - 100px);
      padding: 0 !important;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }
</style>
