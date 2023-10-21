<template>
  <view class="paging-layout">
    <paging-normal :table="table" :next="next" :form="form" :title="title" :page="page" :page-size="pageSize" :count="count"
      :order-bys="orderBys" @on-add="add" @onSucceed="onSucceed" @on-page-change="onPageChange" @on-pull-down-refresh="pullDownRefresh"
      @on-edit="edit" v-if="layout.type=='Normal'"></paging-normal>
    <paging-table :table="table" :next="next" :form="form" :title="title" :page="page" :page-size="pageSize" :count="count"
      :order-bys="orderBys" @on-add="add" @onSucceed="onSucceed" @on-page-change="onPageChange" @on-pull-down-refresh="pullDownRefresh"
      @on-edit="edit" v-else-if="layout.type=='Table'"></paging-table>
    <paging-article :table="table" :next="next" :form="form" :title="title" :page="page" :page-size="pageSize" :count="count"
      :order-bys="orderBys" @on-add="add" @onSucceed="onSucceed" @on-page-change="onPageChange" @on-pull-down-refresh="pullDownRefresh"
      @on-edit="edit" v-else-if="layout.type=='Article'"></paging-article>
    <view v-else>未支持的布局方式：{{layout.type}}</view>
  </view>
</template>

<script>
  import Textualize from '../Details/Textualize.vue'
  import PagingTable from './Table.vue'
  import PagingNormal from './Normal.vue'
  import PagingArticle from './Article.vue'
  import store from '../../../store/index.js'

  export default {
    name: "PagingLayout",
    components: {
      Textualize,
      PagingTable,
      PagingNormal,
      PagingArticle
    },
    props: {
      table: Object,
      next: Object,
      form: Object,
      title: String,
      page: Number,
      pageSize: Number,
      count: Number,
      orderBys: Array,
      from: String,
    },
    data() {
      return {
        isRereshing: false, //防止自定义刷新被触发2次
        isShowSearch: false,
      }
    },
    methods: {
      add() {
        this.$emit('on-add')
      },
      onPageChange(page, cb) {
        this.$emit('on-page-change', page, cb)
      },
      pullDownRefresh(cb) {
        this.$emit('on-pull-down-refresh', cb)
      },
      input(value) {},
      edit(row) {
        let id = row[this.table.key.name]
        let detail = this.next.detail
        store.dispatch('system/setTitle', detail.title)
        uni.navigateTo({
          url: `/src/pages/standards/Detail?route=${detail.route}&id=${id}`
        })
      },
    },
    computed: {
      layout() {
        return this.table.layout
      }
    }
  }
</script>

<style lang="scss">
</style>
