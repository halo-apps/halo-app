<template>
  <view class="control-text">
    <input type="text" :placeholder="'请输入'+field.label" :disabled="field.readonly" :value="model" @input="input" />
    <view v-if="field.suffix">{{field.suffix}}</view>
    <icon type="clear" @click="clear" v-if="model" />
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
      input({
        detail
      }) {
        this.model = detail.value
      },
      submit() {
        this.$emit('submit')
      },
      clear() {
        this.model = null
      },
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
    display: flex;

    background: #fff;
    font-size: .9rem;

    //修复小程序文本框内容错位
    //#ifdef MP-WEIXIN
    margin-top: -6px;
    top: 2px;
    position: relative;
    //#endif

    input {
      flex: 1;
    }
  }
</style>
