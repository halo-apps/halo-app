<template>
  <div class="list">
    <v-toolbar color="primary" dark class="toolbar">
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title v-if="result">{{result.title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>fa fa-search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table
      :loading="isLoading"
      :headers="headers"
      :items="items"
      :page="result.page"
      :server-items-length="result.count"
      :items-per-page="result.pageSize"
      loading-text="拼命加载中...">
      <template v-slot:[`item.${header.field.name}`]="{ item,header,value }"
                v-for="header in headers.filter(n=>n.value!='_field_operation')">
        <!-- <template :slot="'item.'+header.field.name" slot-scope="{ item,header,value }" v-for="header in headers">-->
        <text-control :field="header.field" :row="item" :value="value" from="list"></text-control>
      </template>
      <template v-slot:item._field_operation="{ item,header,value }">
        <v-btn @click="edit(item[result.table.key.name])">修改</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import {getList} from "../../api/standard";
  import {getRouteFromLink} from '../../plugins/url-helper'
  import TextControl from "../../components/Standards/Details/TextControl";

  export default {
    name: "List",
    components: {TextControl},
    data() {
      return {
        headers: [],
        items: [],
        isLoading: true,
        result: {page: 1},
        getRouteFromLink: getRouteFromLink,
      }
    },
    methods: {
      edit(id) {
        let route = {path: this.result.route.update, query: {id}}
        route.query.m = this.$route.query.m
        this.$router.push(route)
      },
      bindData(result) {
        result.table.key = result.table.fields.find(n => n.name == result.table.key)
        let show = []
        result.table.fields.forEach(field => {
          if (result.table.show.includes(field.name)) {
            show.push(field)
          }
        })
        result.table.show = show

        //处理表头
        result.table.show.forEach(field => {
          this.headers.push({
            text: field.label,
            value: field.name,
            sortable: true,
            field
          })
        })
        this.headers.push({text: '操作', value: '_field_operation'})

        //处理数据
        this.items = result.data[result.table.name]
        this.result = result
      },
      init() {
        this.isLoading = true
        let path = this.$route.path
        getList(path, {}).then(({data}) => {
          this.bindData(data)
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        })
      }
    },
    created() {
      this.init()
    },
    watch: {
      $route(to, from) {
        this.init()
      }
    },
    computed: {
    }
  }
</script>

<style lang="scss">
  .list {
    .toolbar {
    }

    .v-data-table__mobile-row {
      min-height: auto !important;
      margin: 5px;
      align-items: flex-start;

      .v-data-table__mobile-row__header {
        font-weight: normal;
        white-space: nowrap;
      }

      .v-data-table__mobile-row__cell {
        font-weight: bold;
      }
    }
  }
</style>
