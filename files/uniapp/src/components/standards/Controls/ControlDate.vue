<template>
  <view class="control-date">
    <picker mode="date" :value="value" :disabled="field.readonly" @change="change">
      <view class="uni-input" v-if="value"> {{value}} </view>
      <view v-else>请选择{{field.label}}</view>
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
    name: 'ControlDate',
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
        value: null
      }
    },
    methods: {
      change({
        detail
      }) {
        this.value = detail.value
        this.model = this.value
      },
      clear() {
        this.value = null
        this.model = null
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

<style scoped>
  .control-date {
    display: flex;
  }
</style>
