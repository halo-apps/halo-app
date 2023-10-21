<template>
  <uni-combox class="control-autocomplete" :candidates="candidates" :placeholder="'请选择'+field.label" v-model="value">
  </uni-combox>
  <!-- <el-select
    filterable
    remote
    reserve-keyword
    :clearable="!field.required"
    default-first-option
    placeholder="请选择"
    class="autocomplete"
    v-model="model"
    :multiple="field.multiple"
    :remote-method="remoteMethod"
    :loading="loading"
    :disabled="field.readonly"
    @keyup.alt.enter.native="submit"
    @focus="focus">
    <el-option v-for="item in options" :key="`${item.value}`"
               :label="item.text+(item.suffix?'('+item.suffix+')':'')" :value="item.value">
      <span class="autocomplete-text">{{ item.text }}</span>
      <span class="autocomplete-suffix" v-if="item.suffix">({{ item.suffix }})</span>
    </el-option>
  </el-select> -->
</template>

<script>
  import {
    getAutocomplete
  } from '../../../api/custom'
  import {
    getValue,
    setValue
  } from '../../../plugins/standards/control-helper'

  export default {
    name: 'ControlAutocomplete',
    props: {
      field: {
        type: Object,
        default: null
      },
      table: {
        type: Object,
        default: null
      }, //当前数据表架构信息
      form: {
        type: Object,
        default: null
      }, //大表单信息
      index: {
        type: Number,
        default: null
      } //当前行的索引
    },
    data() {
      return {
        options: this.field.dictionary.data,
        text: null, //查询文本
        loading: false,
        isFocus: false, //是否每次获取焦点
      }
    },
    methods: {
      submit() {
        this.$emit('submit')
      },
      focus() {
        //第一次获取焦点，把请求参数中的文本值清空
        this.text = null
        this.search()
      },
      search() {
        this.loading = true
        let data = {
          text: this.text,
          conditions: []
        }
        //收集大表单中引用的所有控件的值
        this.field.dictionary.conditions.forEach(condition => {
          let value
          //表单页面
          if (this.index != null) {
            if (condition.range == 'Row') {
              value = this.form[condition.table][this.index][condition.field]
            } else {
              value = this.form[condition.table].map(n => n[condition.field]).join(',')
            }
          } else {
            //搜索页面
            value = this.form[condition.table][condition.field]
          }
          data.conditions.push({
            field: condition.name,
            value
          })
        })
        getAutocomplete(this.field.dictionary.name, data).then(({
          data
        }) => {
          this.options = data
          this.loading = false
        })
      },
      remoteMethod(query) {
        this.text = query
        this.search()
      },
      input(value) {
        this.data[this.table.name][this.index][this.field.name] = value
      },
      getChildren(table, field) {
        let result = []
        let tables = [this.table].concat(this.table.children)
        tables.forEach(t => {
          t.fields.forEach(f => {
            if (f.dictionary) {
              f.dictionary.conditions.forEach(condition => {
                if (condition.table == table.name && condition.field == field.name) {
                  result.push({
                    table: t,
                    field: f
                  })
                }
              })
            }
          })
        })
        return result
      },
      clearValue(table, field) {
        let children = this.getChildren(table, field)
        children.forEach(child => {
          setValue(null, this.form, this.index, child.table, child.field)
          this.clearValue(child.table, child.field)
        })
      }
    },
    computed: {
      value: {
        get() {
          let item = this.field.dictionary.data.find(n => n.value == this.model)
          if (!item)
            return item
          return item.text
        },
        set(val) {
          let item = this.field.dictionary.data.find(n => n.text == val)
          return item.value
        }
      },
      candidates() {
        let result = this.field.dictionary.data.map(n => n.text)
        return result
      },
      model: {
        get() {
          let value = getValue(this.form, this.index, this.table, this.field)
          if (value && this.field.multiple) {
            return value.split(',')
          }
          return value
        },
        set(val) {
          let value
          if (this.field.multiple) {
            if (val.length > 0) {
              value = val.join(',')
            } else {
              value = null
            }
          } else {
            value = val
          }
          setValue(value, this.form, this.index, this.table, this.field)

          //不能使用监控，否则分页时，永远触发值变动事件，导致多依赖值得控件被永远清空
          //当用户修改控件值时，使用递归修改子控件的值即可
          //改变当前控件值时，找到依赖当前控件值的所有控件，自动清空它们的值
          this.clearValue(this.table, this.field)
          this.$emit('change', this.form)
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
