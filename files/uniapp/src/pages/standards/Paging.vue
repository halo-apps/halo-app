<template>
  <view class="paging">
    <uni-search-bar @confirm="search" :placeholder="count>0?'搜索'+count+'条内容':'请输入搜索内容'" @input="input" v-if="false">
    </uni-search-bar>
    <view class="toolbar" v-if="false">
      <view class="toolbar-order">
        <view class="order-title" @click="isSortActive=!isSortActive">排序</view>
        <view :class="{'order-content':true,active:isSortActive}">
          <view class="order-option">名称</view>
          <view class="order-option">创建时间</view>
        </view>
      </view>
      <view class="toolbar-operation">操作</view>
      <view class="toolbar-search" @click="isShowSearch=!isShowSearch">搜索</view>
    </view>
    <paging-layout :table="table" :next="next" :form="form" :title="title" :page="page" :page-size="pageSize" :count="count"
      :order-bys="orderBys" @on-add="add" @onSucceed="onSucceed" @on-page-change="pageChange" @on-pull-down-refresh="pullDownRefresh"
      v-if="form"></paging-layout>
  </view>
</template>

<script>
  import store from '../../store/index.js'
  import PagingLayout from '../../components/standards/Pagings/Layout.vue'
  import request from '../../plugins/request.js'
  import {
    expandSchema
  } from '../../plugins/standards/standard-helper.js'
  import {
    serialize,
    deserialize,
    getUrlFromMenu,
    getApiUrl
  } from '../../plugins/url-helper.js'

  export default {
    components: {
      PagingLayout
    },
    props: {
      menu: {
        type: Object
      }
    },
    data() {
      return {
        query: null,
        title: null,
        form: null, //二维数组，提升分页加载性能
        table: null,
        next: null,
        count: null,
        page: null,
        pageSize: null,
        orderBys: null, //排序信息
        isLoading: true,
        isSortActive: false,
      }
    },
    methods: {
      //子组件操作成功（删除、弹窗操作）后执行，用于刷新当前页面数据
      onSucceed() {
        this.refresh()
      },
      add() {
        let insert = this.next.insert
        store.dispatch('system/setTitle', insert.title)
        uni.navigateTo({
          url: `/src/pages/standards/Update?route=${insert.route}`
        })
      },
      pageChange(page, cb) {
        this.page = page
        this.query.page = this.page
        return this.fetch().then(data => {
          //累加数据，实现上拉逐步加载的效果
          let table = this.table
          this.form[table.name].push(...data[table.name])
          cb()
        })
      },
      pullDownRefresh(cb) {
        this.query.page = 1
        this.fetch().then(data => {
            // debugger
            // let table = this.table
            // this.form[table.name] = [] //二维数组
            // this.form[table.name].push(data[table.name])
          })
          .finally(() => {
            cb()
          })
      },
      fetch() {
        this.isLoading = true
        //h5会自动对query参数解码，小程序不会
        let url = `${getApiUrl(this.query)}`
        return new Promise((resolve, reject) => {
          request({
            url,
            method: 'get'
          }).then(({
            data
          }) => {
            this.title = data.title
            this.table = expandSchema(data.table)
            this.next = data.next
            this.form = data.data
            this.count = data.count
            this.page = data.page
            this.pageSize = data.pageSize

            uni.setNavigationBarTitle({
              title: this.title
            })
            resolve(data.data)
          }).catch((res) => {
            reject(res)
          }).finally(() => {
            this.isLoading = false
          })
        })
      },
      init() {
        this.fetch().then(data => {
          // if (!this.form)
          //   this.form = {}
          // let table = this.table
          // //二维数组，并防止新属性不被监听，导致子组件第1行数据丢失
          // this.$set(this.form, table.name, [])
          // this.form[table.name].push(data[table.name])
        })
      },
    },
    onReady() {
      uni.setNavigationBarTitle({
        title: this.system.title
      })
    },
    //组件事件：当前组价被创建时执行，内嵌组件，所有会有menu
    created() {
      if (this.menu) {
        let url = getUrlFromMenu(this.menu)
        this.query = deserialize(url)
      }
      this.init()
    },
    //生命周期事件：当跳转到当前页面时执行
    onLoad(option) {
      //条件编译
      // #ifdef H5
      // debugger
      // #endif
      this.query = option //h5会自动解码里面的参数
    },
    computed: {
      system() {
        return store.state.system
      }
    }
  }
</script>

<style lang="scss">
  .toolbar {
    display: flex;

    .toolbar-order {
      flex: 1;
      position: relative;

      .order-title {
        text-align: center;
      }

      .order-content {
        display: none;
        text-align: center;
        position: absolute;
        background: #fff;
        width: 100%;
        z-index: 1;

        &.active {
          display: block;
        }
      }
    }

    .toolbar-operation {
      flex: 1;
    }

    .toolbar-search {
      flex: 1;
    }
  }
</style>
