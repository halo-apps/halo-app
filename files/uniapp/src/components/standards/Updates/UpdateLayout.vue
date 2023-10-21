<template>
  <view>
    <update-normal :form="form" :table="table" @change="change" v-if="table.layout.type=='Normal'"></update-normal>
    <update-table :form="form" :table="table" @change="change" v-else-if="table.layout.type=='Table'"></update-table>
    <update-tree :form="form" :table="table" @change="change" v-else-if="table.layout.type=='Tree'"></update-tree>
    <div v-else>未支持的表单布局方式 {{table.layout.type}}</div>
  </view>
</template>

<script>
  import UpdateNormal from './UpdateNormal.vue'
  import UpdateTable from './UpdateTable.vue'
  import UpdateTree from './UpdateTree.vue'

  export default {
    name: "UpdateLayout",
    components: {
      UpdateNormal,
      UpdateTable,
      UpdateTree
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
      },
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
