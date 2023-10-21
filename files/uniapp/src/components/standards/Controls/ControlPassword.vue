<template>
  <view>
    <input type="text" password class="control-password" :placeholder="'请输入'+field.label" :disabled="field.readonly" v-model="model" />
    <view v-if="field.suffix">{{field.suffix}}</view>
  </view>
</template>

<script>
  import {
    getValue,
    setValue
  } from '../../../plugins/standards/control-helper'

  export default {
    name: "ControlText",
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
        type: Number,
      }, //当前行的索引
    },
    methods: {
      submit() {
        this.$emit('submit')
      }
    },
    computed: {
      model: {
        get() {
          let result = getValue(this.form, this.index, this.table, this.field)
          return result
        },
        set(val) {
          setValue(val, this.form, this.index, this.table, this.field)
          this.$emit('change', this.form)
        }
      }
    }
  }
</script>

<style lang="scss">
  .control-text {
    background: #fff;
    font-size: .9rem;

    //修复小程序文本框内容错位
    //#ifdef MP-WEIXIN
    margin-top: -6px;
    top: 2px;
    position: relative;
    //#endif
  }
</style>
