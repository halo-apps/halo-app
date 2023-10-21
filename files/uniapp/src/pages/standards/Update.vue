<template>
  <form v-if="!isLoading">
    <update-layout :form="data" :table="table" @change="change"></update-layout>
    <view class="tab-control" v-if="table.children.length>0">
      <view :class="{'tab-item':true,'active':i==current}" v-for="(child,i) in table.children" :key="child.name" @click="jump(child,i)">
        <uni-icons type="list"></uni-icons>
        <view class="tab-name">{{child.title}}</view>
      </view>
    </view>
    <view v-for="(child,i) in table.children" :key="child.name">
      <update-layout :form="data" :table="child" @change="change" v-if="i==current"></update-layout>
    </view>
    <view class="footer">
      <button form-type="submit" @click="submit" :loading="isSubmiting">提交</button>
    </view>
    <debug>{{JSON.stringify(data)}}</debug>
  </form>
</template>

<script>
  import Container from '../../components/commons/Container.vue'
  import Debug from '../../components/commons/Debug.vue'
  import UpdateLayout from '../../components/standards/Updates/UpdateLayout.vue'
  import request from '../../plugins/request.js'
  import store from '../../store/index.js'
  import {
    getApiUrl,
    getUrlFromMenu,
    deserialize
  } from '../../plugins/url-helper.js'
  import {
    expandSchema,
    buildOldKey
  } from '../../plugins/standards/standard-helper.js'
  export default {
    components: {
      Container,
      Debug,
      UpdateLayout
    },
    props: {
      menu: {
        type: Object
      }
    },
    data() {
      return {
        isLoading: true,
        isSubmiting: false,
        data: null,
        next: null,
        table: null,
        query: null,
        current: 0, //当前选项卡
        pageType: null, //页面类型
      }
    },
    methods: {
      jump(child, i) {
        this.current = i
      },
      submit() {
        this.isSubmiting = true
        let url = this.pageType == 'Update' ? this.next.submitUpdate.route : this.next.submitInsert.route
        request({
            url,
            method: 'post',
            data: this.data
          })
          .then(({
            code,
            data,
            message
          }) => {
            if (code == 'ValidationError') {
              let title = data.map(n => n.message).toString()
              uni.showToast({
                icon: 'none',
                title,
              })
            } else {
              uni.showToast({
                title: message
              })
            }
          })
          .finally(() => {
            this.isSubmiting = false
          })
      },
      init() {
        this.isLoading = true
        request({
            url: `${getApiUrl(this.query)}`,
            method: 'get'
          }).then(({
            data
          }) => {
            uni.setNavigationBarTitle({
              title: data.title
            })
            this.table = expandSchema(data.table)
            this.data = buildOldKey(this.table, data.data)
            this.next = data.next
            this.pageType = data.pageType
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      change(form) {
        this.data = form
        console.log(this.data)
      }
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
      }
    }
  }
</script>

<style>
  .uni-input {
    padding: 20rpx 30rpx;
    background: #fff;
  }
</style>