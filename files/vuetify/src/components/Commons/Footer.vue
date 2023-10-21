<template>
  <v-tabs class="footer-tabs" background-color="primary" :value="currentNav"
          hide-slider dark grow centered center-active icons-and-text v-if="menu">
    <v-tabs-slider></v-tabs-slider>
    <v-tab v-for="item in menu.menus" :key="item.id" :href="'#'+item.id" @click="to(item)">
      {{ item.name }}
      <v-icon>{{item.icon}}</v-icon>
    </v-tab>
  </v-tabs>
</template>

<script>
  import store from "../../store";
  import {getRouteFromUrl} from "../../plugins/url-helper";

  export default {
    name: "Footer",
    data() {
      return {}
    },
    methods: {
      to(menu) {
        let route = getRouteFromUrl(menu.url)
        route.query.m = menu.id
        this.$router.push(route).catch(() => {
          this.$emit('refresh')
        })
      },
    },
    created() {
    },
    computed: {
      menu() {
        return store.state.user.menu
      },
      currentNav() {
        return this.$route.query.m
      }
    }
  }
</script>

<style lang="scss">
  .v-footer {
    margin: 0 !important;
    padding: 0 !important;
  }

  .footer-tabs {
    .v-tabs-bar {
      height: 50px !important;
    }

    .v-tab {
      font-size: 0.6rem;
      min-width: 75px;

      .v-icon.v-icon {
        font-size: 18px;
        margin-bottom: 3px !important;
      }
    }
  }

  //隐藏选项卡左边距
  .v-tabs-bar.v-slide-group--is-overflowing.v-tabs-bar--is-mobile:not(.v-tabs-bar--show-arrows):not(.v-slide-group--has-affixes) .v-slide-group__prev {
    display: none !important;
  }

  .v-snack--bottom {
    bottom: 60px !important;
  }
</style>
