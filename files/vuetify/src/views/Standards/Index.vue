<template>
  <div class="index">
    <v-toolbar color="primary" dark class="toolbar">
      <v-btn icon @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title v-if="meta">{{ meta.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row class="menus" v-if="menu&&menu.children">
      <v-col v-for="child in menu.children" :key="child.url" class="menu">
        <v-btn color="primary" class="submenu" text large dark @click="toSubmenu(child)">
          <i :class="'submenu-icon '+child.icon"></i>
          <div class="submenu-title">{{ child.name }}</div>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {getMenuByPath} from "../../store/commons/user";
import {getRouteFromUrl} from "../../plugins/url-helper";

export default {
  name: "Index",
  data() {
    return {}
  },
  methods: {
    toSubmenu(menu) {
      let route = getRouteFromUrl(menu.url)
      route.query.m = this.$route.query.m
      this.$router.push(route)
    },
    refresh() {

    },
    goBack() {
      let returnUrl = this.$route.query.return_url
      let route = getRouteFromUrl(returnUrl)
      this.$router.push(route)
    }
  },
  computed: {
    menu() {
      let path = this.$route.path
      let menu = getMenuByPath(path)
      return menu
    },
    meta() {
      let matched = this.$route.matched
      let result = matched[matched.length - 1].meta
      return result
    }
  }
}
</script>

<style lang="scss">
.index {

  .menus {
    margin: 0;

    .menu {
      width: 20%;
      flex-grow: initial;
      padding: 0;

      .submenu {
        height: 80px !important;
        padding: 0 !important;

        .submenu-icon {
          font-size: 20px;
        }

        .submenu-title {
          font-size: 12px;
          color: #666;
        }

        .v-btn__content {
          flex-direction: column;
        }
      }

    }
  }
}
</style>
