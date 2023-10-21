<template>
  <view :class="{'normal-layout':true,primary:table.primary,child:!table.primary}">
    <view class="normal-row" v-for="(row,i) in form[table.name]" :key="i">
      <view class="normal-field" v-for="field in table.show" :key="field.name">
        <view class="normal-title">{{field.label}}</view>
        <control class="normal-control" :table="table" :field="field" :index="i" :form="form" from="Update" @change="change"
          @submit="submit"></control>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getRows
  } from '../../../plugins/standards/standard-helper'
  import Control from './Control'

  export default {
    name: 'UpdateNormal',
    components: {
      Control
    },
    props: {
      form: {
        type: Object,
        required: true
      },
      table: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        getRows: getRows
      }
    },
    methods: {
      change(form) {
        this.$emit('change', form)
      },
      submit() {
        this.$emit('submit')
      }
    },
    computed: {}
  }
</script>

<style lang="scss">
  .normal-layout {
    .normal-row {
      .normal-field {
        .normal-title {}

        .normal-control {
          flex: 1;
          position: relative;
        }
      }
    }
  }
</style>
