<template>
  <scroll-view class="page-scroll-view" scroll-y scroll-with-animation refresher-enabled
    :refresher-triggered="refresherTriggered" @refresherrefresh="pullDownRefresh">
    <form v-if="data">
      <detail-layout :table="table" :form="data"></detail-layout>
      <view class="tab-control" v-if="table.children.length>0">
        <view :class="{'tab-item':true,'active':i==current}" v-for="(child,i) in table.children" :key="child.name"
          @click="jump(child,i)">
          <uni-icons type="list"></uni-icons>
          <view class="tab-name">{{child.title}}</view>
        </view>
      </view>
      <view v-for="(child,i) in table.children" :key="child.name">
        <detail-layout :form="data" :table="child" @change="change" v-if="i==current"></detail-layout>
      </view>
      <dispatcher-detail :partial="partial" @update="update"></dispatcher-detail>
    </form>
  </scroll-view>
</template>

<script>
  import Container from '../../components/commons/Container.vue'
  import DetailLayout from '../../components/standards/Details/DetailLayout.vue'
  import DispatcherDetail from '../../../custom/dispatcher/Detail.vue'
  import request from '../../plugins/request.js'
  import store from '../../store/index.js'
  import {
    getApiUrl,
    deserialize,
    getUrlFromMenu
  } from '../../plugins/url-helper.js'
  import {
    expandSchema
  } from '../../plugins/standards/standard-helper.js'
  export default {
    components: {
      Container,
      DetailLayout,
      DispatcherDetail,
    },
    props: {
      menu: {
        type: Object
      }
    },
    data() {
      return {
        isLoading: true,
        refresherTriggered: false,
        data: null,
        next: null,
        table: null,
        query: null,
        current: 0, //当前选项卡
        partial: null, //页面底部自定义
      }
    },
    methods: {
      update() {
        let row = this.data[this.table.name][0]
        let id = row[this.table.key.name]
        let update = this.next.update
        store.dispatch('system/setTitle', update.title)
        uni.navigateTo({
          url: `/src/pages/standards/Update?route=${update.route}&id=${id}`
        })
      },
      jump(child, i) {
        this.current = i
      },
      fetch() {
        this.isLoading = true
        return request({
            url: `${getApiUrl(this.query)}`,
            method: 'get'
          }).then(({
            data
          }) => {
            uni.setNavigationBarTitle({
              title: data.title
            })
            this.data = data.data
            this.table = expandSchema(data.table)
            this.next = data.next
            this.partial = data.partial
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      init() {
        this.fetch()
      },
      pullDownRefresh() {
        this.refresherTriggered = true
        this.fetch().then(() => {
          this.refresherTriggered = false
        })
      },
    },
    onReady() {
      uni.setNavigationBarTitle({
        title: this.system.title
      })
    },
    //组件生命周期事件：当前组价被创建时执行，内嵌组件，所有会有menu
    created() {
      if (this.menu) {
        let url = getUrlFromMenu(this.menu)
        this.query = deserialize(url)
        this.init()
      }
    },
    //页面生命周期事件：
    onLoad(options) {
      this.query = options
      this.init()
    },
    computed: {
      system() {
        return store.state.system
      },
    }
  }
</script>

<style lang="scss">
</style>
