<template>
  <span class="detail-link-container" v-if="disabled">
    <slot></slot>
  </span>
  <router-link class="detail-link" :to="{path:path,query:query}" v-else>
    <slot></slot>
  </router-link>
</template>

<script>
  import {generateMenuAndBack} from "../../../plugins/url-helper";
  import {base64Encode} from "../../../plugins/encrypt-helper";
  import qs from 'qs'

  export default {
    name: "TextLink",
    props: {
      field: {type: Object, default: null},
      value: {type: String, default: null},
      row: {type: Object, default: null},
      disabled: {type: Boolean, default: false},
    },
    computed: {
      path() {
        let result = this.field.link.href.split('?')[0]
        return result
      },
      query() {
        let result
        let queryString = this.field.link.href.split('?')[1]
        this.field.link.values.forEach(v => {
          queryString = queryString.replace(`{${v}}`, this.row[v])
        })

        //格式化成json对象
        if (this.path.indexOf('http://') == 0 || this.path.indexOf('https://') == 0) {
          result = qs.parse(queryString)
        } else {
          result = {...qs.parse(queryString), ...generateMenuAndBack(this.$route)}
        }

        //设置搜索过滤条件
        if (this.field.link.tables.length > 0) {
          let search = {}
          this.field.link.tables.forEach(t => {
            search[t.name] = {}
            t.search.forEach(s => {
              search[t.name][s.name] = this.row[s.value]
            })
          })
          result.condition = base64Encode(JSON.stringify(search))
        }
        return result
      }
    }
  }
</script>

<style lang="scss" scoped>
  .detail-link {
    color: #1890ff;

    &:hover, &:visited {
      color: #1890ff;
    }
  }
</style>
