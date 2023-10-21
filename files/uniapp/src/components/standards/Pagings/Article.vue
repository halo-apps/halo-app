<template>
  <view class="paging-normal">
    <view class="list-normal" v-if="form">
      <!-- {{form[table.name].length}} -->
      <view class="list-item" v-for="(row,i) in form[table.name]" :key="i" @click="edit(row)">
        <view class="list-wrapper">
          <view class="list-container">
            <view class="list-title">{{row[layout.title]}}</view>
            <view class="list-content">
              <textualize class="normal-text" :form="form" :table="table" :index="i" :field="content"></textualize>
            </view>
          </view>
          <view class="list-operation">
            <uni-icons type="arrowright" size="30"></uni-icons>
          </view>
        </view>
      </view>
      <!-- {{form}} -->
    </view>
    <view class="paging-operation" @click="add">
      <uni-icons type="plusempty"></uni-icons>
    </view>
  </view>
</template>

<script>
  import Textualize from '../Details/Textualize.vue'
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
      return {}
    },
    methods: {
      edit(row) {
        this.$emit('on-edit', row)
      },
      add() {
        this.$emit('on-add')
      }
    },
    computed: {
      layout() {
        return this.table.layout
      },
      content() {
        return this.table.fields.find(n => n.name == this.layout.content)
      }
    }
  }
</script>

<style>
</style>
