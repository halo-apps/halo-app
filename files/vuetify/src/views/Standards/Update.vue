<template>
  <v-form v-if="!isLoading">
    <v-toolbar color="primary" dark class="toolbar">
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{result.title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container>
      <v-row>
        <v-col cols="12" md="4" v-for="field in result.table.show" :key="field.name">
          <Control :data="result.data" :field="field" :table="result.table" :index="0"></Control>
        </v-col>
      </v-row>
    </v-container>
    <div class="update-children" v-if="result.table.children.length>0">
      <v-tabs v-model="tab" class="detail-tabs" background-color="primary" dark center-active>
        <v-tabs-slider></v-tabs-slider>
        <v-tab v-for="child in result.table.children" :key="child.name">
          {{ child.title }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="child in result.table.children" :key="child.name">
          <div v-for="(row,i) in result.data[child.name]" class="table-row">
            <div v-for="field in child.fields" class="field-row">
              <control :field="field" :data="result.data" :table="child" :index="i" from="detail"></control>
            </div>
          </div>
        </v-tab-item>
      </v-tabs-items>
      <v-btn @click="edit">修改</v-btn>
    </div>
  </v-form>
</template>

<script>
  import {getUpdate, submitUpdate} from "../../api/standard";
  import Control from "../../components/Standards/Updates/Control";
  import {getMenuByPath} from "../../store/commons/user";

  export default {
    name: "Update",
    components: {Control},
    data: () => ({
      result: null,
      isLoading: true,
      tab: null,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }),
    methods: {
      edit() {

      },
      submitUpdate() {
        submitUpdate()
      },
      bindData(result) {
        //主表显示字段
        let show = []
        result.table.fields.forEach(field => {
          if (result.table.show.indexOf(field.name) != -1)
            show.push(field)
        })
        result.table.show = show

        //从表和显示字段
        this.result = result
      },
      init() {
        let path = this.$route.path
        let query = this.$route.query
        this.isLoading = true
        getUpdate(path, query).then(({data}) => {
          this.bindData(data)
        }).finally(() => {
          this.isLoading = false
        })
      }
    },
    created() {
      this.init()
    },
    computed: {
    }
  }
</script>

<style scoped>

</style>
