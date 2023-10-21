<template>
  <view class="table-layout">
    <view class="table-container">
      <view class="tr">
        <view class="th" v-for="field in table.show" :key="field.name">{{field.label}}</view>
      </view>
      <view class="tr" v-for="(row,i) in form[table.name]" :key="i">
        <view class="td" v-for="field in table.show" :key="field.name">
          <control class="table-control" :table="table" :field="field" :index="i" :form="form" from="Update" @change="change"
            @submit="submit"></control>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import Control from './Control'

  export default {
    name: 'UpdateTable',
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
        enableSelection: true //是否启用多选
      }
    },
    methods: {
      change(form) {
        this.$emit('change', form)
      },
      submit() {
        this.$emit('submit')
      },
      getRowIndex(table, index) {
        let childStore = this.store.table[table.name]
        let result = ((childStore.page - 1) * table.pageSize) + index
        return result
      },
      selectionChange(table, selection) {
        this.$store.dispatch('standards/update/setSelection', {
          key: this.storeKey,
          table,
          selection
        })
      }
    }
  }
</script>

<style scoped>

</style>
