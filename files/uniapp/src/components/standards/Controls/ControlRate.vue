<template>
  <view class="control-rate">
    <uni-rate :disabled="field.readonly" :value="model" @change="change"></uni-rate>
	<icon type="clear" @click="clear" v-if="model"/>
  </view>
</template>

<script>
  import {
    getValue,
    setValue
  } from '../../../plugins/standards/control-helper'

  export default {
    name: "ControlRate",
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
      change({
        value
      }) {
        this.model = value.toString()
      },
      clear() {
        this.model = null
      }
    },
    computed: {
      model: {
        get() {
          let result = getValue(this.form, this.index, this.table, this.field)
          if (result)
            return parseInt(result)
          return null
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

</style>
