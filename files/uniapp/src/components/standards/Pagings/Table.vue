<template>
    <view class="table-layout">
      <view class="table-container">
        <view class="tr">
          <view class="th" v-for="field in table.show" :key="field.name">{{field.label}}</view>
        </view>
        <view class="tr" v-for="(row,i) in form[table.name]" :key="i">
          <view class="td" v-for="field in table.show" :key="field.name">
            <textualize :table="table" :field="field" :index="i" :form="form"></textualize>
          </view>
        </view>
      </view>
    </view>
</template>

<script>
  import Textualize from '../Details/Textualize.vue'
  import store from '../../../store/index.js'

  export default {
    name: "PagingLayout",
    components: {
      Textualize
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
      query: Object,
    },
    data() {
      return {
      }
    },
    methods: {
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
  }
</script>

<style lang="scss">
</style>
