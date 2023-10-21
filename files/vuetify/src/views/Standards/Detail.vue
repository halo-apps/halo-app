<template>
  <div class="detail" v-if="!isLoading">
    <v-toolbar color="primary" dark class="toolbar">
      <v-btn icon @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{result.title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="detail-main">
      <div v-for="row in result.data[result.table.name]" class="table-row">
        <div v-for="field in result.table.fields" class="field-row">
          <div class="field-label">{{field.label}}</div>
          <div class="field-content">
            <text-control :field="field" :row="row" :value="row[field.name]" from="detail"></text-control>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-children" v-if="result.table.children.length>0">
      <v-tabs v-model="tab" class="detail-tabs" background-color="primary" dark center-active>
        <v-tabs-slider></v-tabs-slider>
        <v-tab v-for="child in result.table.children" :key="child.name">
          {{ child.title }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="child in result.table.children" :key="child.name">
          <div v-for="row in result.data[child.name]" class="table-row">
            <div v-for="field in child.fields" class="field-row">
              <div class="field-label">{{field.label}}</div>
              <div class="field-content">
                <text-control :field="field" :row="row" :value="row[field.name]" from="detail"></text-control>
              </div>
            </div>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
  import {getDetail} from "../../api/standard";
  import TextControl from "../../components/Standards/Details/TextControl";
  import {getMenuByPath} from "../../store/commons/user";
  import {getRouteFromUrl} from "../../plugins/url-helper";

  export default {
    name: "Detail",
    components: {TextControl},
    data() {
      return {
        isLoading: true,
        result: null,
        tab: null,
      }
    },
    methods: {
      bindData(result) {
        this.result = result
      },
      init() {
        this.isLoading = true
        let path = this.$route.path
        let query = this.$route.query
        getDetail(path, query).then(({data}) => {
          this.bindData(data)
          this.isLoading = false
        }).catch(() => {
        })
      },
      goBack() {
        let returnUrl = this.$route.query.return_url
        let route = getRouteFromUrl(returnUrl)
        this.$router.push(route)
      }
    },
    created() {
      this.init()
    },
    computed: {}
  }
</script>

<style lang="scss">
  .table-row {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);

    .field-row {
      display: flex;
      font-size: 14px;
      margin: 5px;

      .field-label {
        white-space: nowrap;
        color: #666;
      }

      .field-content {
        width: 100%;
        text-align: right;
        font-weight: bold;
      }
    }
  }

  .detail-children {
    .detail-tabs {
      .v-tabs-bar {
        height: 40px;
      }
    }
  }
</style>
