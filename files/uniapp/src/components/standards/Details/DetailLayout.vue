<template>
  <detail-normal :form="form" :table="table" @change="change" v-if="table.layout.type=='Normal'"></detail-normal>
  <detail-table :form="form" :table="table" @change="change" v-else-if="table.layout.type=='Table'"></detail-table>
  <detail-tree :form="form" :table="table" @change="change" v-else-if="table.layout.type=='Tree'"></detail-tree>
  <view v-else>未支持的详情布局方式 {{table.layout.type}}</view>
</template>

<script>
  import DetailNormal from './DetailNormal.vue'
  import DetailTable from './DetailTable.vue'
  import DetailTree from './DetailTree.vue'

  export default {
    name: "DetailLayout",
    components: {
      DetailNormal,
      DetailTable,
      DetailTree
    },
    props: {
      table: {
        type: Object,
        default: null
      },
      form: {
        type: Object,
        default: null
      }, //大表单数据
      from: {
        type: String,
        default: null
      }, //来源
    },
    data() {
      return {}
    },
    methods: {
      change(form) {
        this.$emit('change', form)
      },
    }
  }
</script>

<style>
</style>
