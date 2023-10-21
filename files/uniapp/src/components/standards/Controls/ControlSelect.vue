<template>
  <view class="control-select">
    <picker :multiple="field.multiple" :disabled="field.readonly" :value="value" :range="range" @change="change">
      <div class="uni-input" v-if="item">
        <div class="select-text">{{ item.text }}</div>
        <div class="select-suffix" v-if="item.suffix">({{ item.suffix }})</div>
      </div>
      <div v-else>
        请选择
      </div>
    </picker>
	<icon type="clear" @click="clear" v-if="value"/>
  </view>
</template>

<script>
  import {
    getValue,
    setValue
  } from '../../../plugins/standards/control-helper'

  export default {
    name: 'ControlSelect',
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
      } //当前行的索引
    },
    data() {
      return {
        value: null
      }
    },
    methods: {
      change({
        detail
      }) {
        //设置选中项
        this.value = detail.value
        //索引处理为实际值
        this.model = this.field.dictionary.data[this.value].value
      },
      clear() {
        this.value = null
        this.model = null
      },
    },
    created() {
      //处理为索引
      if (this.model) {
        let item = this.field.dictionary.data.find(n => n.value == this.model)
        this.value = this.field.dictionary.data.indexOf(item)
      }
    },
    computed: {
      item() {
        let item = this.field.dictionary.data[this.value]
        return item
      },
      range() {
        let result = this.field.dictionary.data.map(n => n.text)
        return result
      },
      model: {
        get() {
          let value = getValue(this.form, this.index, this.table, this.field)
          if (value && this.field.multiple) {
            return result.split(',')
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
            value = val.toString()
          }
          setValue(value, this.form, this.index, this.table, this.field)
          this.$emit('change', this.form)
        }
      }
    }
  }
</script>

<style lang="scss">
  .control-select {
    display: flex;

    .uni-input {
      padding: 0;
    }
  }
</style>
