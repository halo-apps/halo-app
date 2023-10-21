<template>
  <scroll-view :class="{'page-scroll-view':true}" scroll-y scroll-with-animation refresher-enabled :refresher-triggered="refresherTriggered"
    @scrolltolower="reachBottom" @refresherrefresh="pullDownRefresh">
    <view class="paging-normal">
      <view class="list-normal" v-if="form">
        <!-- {{form[table.name].length}} -->
        <view class="list-page" v-for="(rows,page) in form[table.name]" :key="page">
          <view class="list-item" v-for="(row,i) in rows" :key="i" @click="edit(row)">
            <view class="list-wrapper">
              <view class="list-container">
                <view class="list-title">{{row[table.show[0].name]}}</view>
                <view class="list-content">
                  <textualize class="normal-text" :form="form" :table="table" :index="i" :field="table.show[1]"
                    from="List"></textualize>
                </view>
              </view>
              <view class="list-operation">
                <uni-icons type="arrowright" size="30"></uni-icons>
              </view>
            </view>
          </view>
        </view>
        <!-- {{form}} -->
      </view>
      <view class="paging-operation" @click="add">
        <uni-icons type="plusempty"></uni-icons>
      </view>
    </view>
    <uni-load-more :status="loadMoreStatus" :contentText="{contentdown: '加载更多',contentrefresh: '拼命加载中...',contentnomore: '没有更多'}"
      @clickLoadMore="loadMore" v-if="loadMoreStatus!='noMore'"></uni-load-more>
  </scroll-view>
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
    },
    data() {
      return {
        isRereshing: false, //防止自定义刷新被触发2次
        isShowSearch: false,

        isShowSearch: false,
        refresherTriggered: false,
        loadMoreStatus: 'loading',
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
      reachBottom() {
        this.loadMoreStatus = 'loading'
        this.loadMore()
      },
      loadMore() {
        let page = this.page + 1
        this.$emit('on-page-change', page, () => {
          this.updateLoadingStatus()
        })
      },
      pullDownRefresh() {
        //防止下拉刷新被执行2次
        if (this.isRereshing) return
        this.isRereshing = true

        this.refresherTriggered = true
        this.$emit('on-pull-down-refresh', () => {
          this.updateLoadingStatus()
          this.$nextTick(() => {
            //DOM数据渲染完毕，才停止下拉刷新提示
            //下拉刷新，返回结果出错后，停止刷新
            this.refresherTriggered = false
            this.isRereshing = false
          })
        })
      },
      updateLoadingStatus() {
        //等dom数据渲染完毕后，再更改加载更多的样式
        //VIP:否则dom未渲染完毕，已经提示加载更多
        this.$nextTick(() => {
          if (this.count > this.page * this.pageSize) {
            this.loadMoreStatus = 'more'
          } else {
            this.loadMoreStatus = 'noMore'
          }
        })
      },
    },
    created() {
      this.updateLoadingStatus()
    }
  }
</script>

<style lang="scss">
</style>
