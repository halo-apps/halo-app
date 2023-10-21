<template>
  <view class="detail-link-container" v-if="!field.link">
    <slot></slot>
  </view>
  <navigator class="detail-link" :url="url" v-else>
    <slot></slot>
  </navigator>
</template>

<script>
  import {
    generateMenuAndBack
  } from '../../../plugins/url-helper'
  import {
    base64Encode
  } from '../../../plugins/encrypt-helper'
  import qs from 'qs'
  import {
    getValue
  } from '../../../plugins/standards/control-helper'

  export default {
    name: 'TextLink',
    props: {
      table: {
        type: Object,
        default: null
      },
      field: {
        type: Object,
        default: null
      },
      index: {
        type: Number,
        default: -1
      },
      form: {
        type: Object,
        default: null
      },
      from: {
        type: String,
        default: null
      },
      page: {
        type: Number,
        default: -1,
      }
    },
    computed: {
      value() {
        let value = getValue(this.form, this.index, this.table, this.field, this.page)
        return value
      },
      row() {
        return this.form[this.table.name][this.index]
      },
      url() {
        return 's'
      },
      // path() {
      //   debugger
      //   let result = this.field.link.href.split('?')[0]
      //   return result
      // },
      // query() {
      //   let result
      //   let queryString = this.field.link.href.split('?')[1]
      //   this.field.link.values.forEach(v => {
      //     queryString = queryString.replace(`{${v}}`, this.row[v])
      //   })

      //   //格式化成json对象
      //   if (this.path.indexOf('http://') == 0 || this.path.indexOf('https://') == 0) {
      //     result = qs.parse(queryString)
      //   } else {
      //     result = { ...qs.parse(queryString),
      //       ...generateMenuAndBack(this.$route)
      //     }
      //   }

      //   //设置搜索过滤条件
      //   if (this.field.link.tables.length > 0) {
      //     let search = {}
      //     this.field.link.tables.forEach(t => {
      //       search[t.name] = {}
      //       t.search.forEach(s => {
      //         search[t.name][s.name] = this.row[s.value]
      //       })
      //     })
      //     result.condition = base64Encode(JSON.stringify(search))
      //   }
      //   return result
      // }
    }
  }
</script>

<style lang="scss">
  .detail-link {
    color: #1890ff;

    &:hover,
    &:visited {
      color: #1890ff;
    }
  }
</style>
