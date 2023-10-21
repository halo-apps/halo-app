<template>
  <view>
    <!-- <el-cascader ref="cascader" filterable :clearable="!field.required" :options="options" :props="{label: 'text', checkStrictly: true, multiple: field.multiple, expandTrigger: 'hover'}"
      :disabled="field.readonly" v-model="model" @visible-change="visibleChange">
      <template slot-scope="{ node, data }">
        <span>{{ data.text }} {{data.suffix}}</span>
        <span v-if="data.children">({{ data.children.length }})</span>
      </template>
    </el-cascader> -->
  </view>
</template>

<script>
  import {
    getAutocomplete
  } from '../../../api/custom'
  import {
    getValue,
    setValue
  } from '../../../plugins/standards/control-helper'
  import {
    getParents
  } from "../../../plugins/standards/cascader-helper";

  export default {
    name: 'ControlCascader',
    props: {
      field: {
        type: Object,
        default: null
      },
      table: {
        type: Object,
        default: null
      },
      form: {
        type: Object,
        default: null
      }, //大表单信息
      index: {
        type: Number
      }, //当前行的索引
    },
    data() {
      return {
        options: null, //所以，model的getter不能依赖于options，也就是不能出现options
        text: null, //搜索文本
      }
    },
    methods: {
      //结果只有1个时，表示是默认绑定项，才拉取数据
      //意外导致一个性能收获：翻页不再重复加载数据
      visibleChange(isVisible) {
        if (isVisible) {
          this.text = null
          this.loadData()
        }
      },
      loadData() {
        let data = {
          text: this.text,
          conditions: []
        }
        this.field.dictionary.conditions.forEach(c => {
          data.conditions.push({
            field: c.name,
            value: null
          }) //可能需要进一步完善
        })
        getAutocomplete(this.field.dictionary.name, data).then(({
          data
        }) => {
          this.options = data
        })
      }
    },
    computed: {
      model: {
        get() {
          //没有加载成功数据，那么，使用默认字典；翻页的时候，将不再加载数据
          if (!this.options) {
            this.options = this.field.dictionary.data
          }
          let value = getValue(this.form, this.index, this.table, this.field)
          let result = []
          if (this.field.multiple) {
            let values = value ? value.split(',') : [value]
            values.forEach(value => {
              let parents = []
              getParents(value, this.options, parents, [])
              if (parents.length > 0) {
                result.push(parents.map(n => n.value))
              }
            })
          } else {
            //填充单选Cascader数据
            let parents = []
            getParents(value, this.options, parents, [])
            parents.forEach(parent => {
              result.push(parent.value)
            })
          }
          return result
        },
        set(val) {
          let value
          if (this.field.multiple) {
            value = val.map(n => n[n.length - 1]).join(',')
          } else {
            value = val[val.length - 1]
          }
          setValue(value, this.form, this.index, this.table, this.field)
          this.$emit('change', this.form)
        }
      }
    },
  }
</script>

<style scoped>

</style>
