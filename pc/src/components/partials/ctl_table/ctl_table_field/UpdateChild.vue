<script setup lang="ts">
import {toRefs} from "vue";

let emit = defineEmits(['add', 'insert', 'copy', 'remove'])
let props = defineProps({
  module: Object,//页面信息
  table: Object,//表架构
  data: Object,//大表单
  selection: Array,//选区内容
})
let {table, data, selection} = toRefs(props)

let add = () => {
  emit('add')
}
let insert = () => {
  emit('insert')
}
let copy = () => {
  emit('copy')
}
let remove = () => {
  emit('remove')
}
let setDefaultFields = () => {
  let rows = data.value[table.value.name]
  let defaultFields = [
    {
      'Id': null,
      'Name': 'UpdatedTime',
      'IsKey': false,
      'Type': 'Datetime',
      'IsIdentity': false,
      'IsNullable': true,
      'Length': null,
      'Label': '更新时间',
      'IsHide': false,
      'Control': 'Datetime',
      'Default': null,
      'Feature': 'UpdatedTime',
      'Dictionary': null,
      'Sort': null
    },
    {
      'Id': null,
      'Name': 'UpdatedBy',
      'IsKey': false,
      'Type': 'String',
      'IsIdentity': false,
      'IsNullable': true,
      'Length': 50,
      'Label': '更新人',
      'IsHide': false,
      'Control': 'Select',
      'Default': null,
      'Feature': 'UpdatedBy',
      'Dictionary': "User",
      'Sort': null
    },
    {
      'Id': null,
      'Name': 'CreatedTime',
      'IsKey': false,
      'Type': 'Datetime',
      'IsIdentity': false,
      'IsNullable': false,
      'Length': null,
      'Label': '创建时间',
      'IsHide': false,
      'Control': 'Datetime',
      'Default': null,
      'Feature': 'CreatedTime',
      'Dictionary': null,
      'Sort': null
    },
    {
      'Id': null,
      'Name': 'CreatedBy',
      'IsKey': false,
      'Type': 'String',
      'IsIdentity': false,
      'IsNullable': false,
      'Length': 50,
      'Label': '创建人',
      'IsHide': false,
      'Control': 'Select',
      'Default': null,
      'Feature': 'CreatedBy',
      'Dictionary': "User",
      'Sort': null
    }
  ]
  //设置默认字段排序值
  for (let i = 0; i < defaultFields.length; i++) {
    defaultFields[i].Sort = (rows.length + i + 1) * 10
  }
  data.value.Ctl_Table_Field.push(...defaultFields)
}
</script>

<template>
  <el-button type="primary" plain @click="add" v-if="selection.length == 0">
    <template #icon><i class="fa fa-plus"></i></template>
    {{ t('update.add') }}
  </el-button>
  <el-button type="primary" plain @click="insert" v-else>
    <template #icon><i class="fa fa-plus"></i></template>
    {{ t('update.insert') }}
  </el-button>
  <el-button type="primary" plain :disabled="selection.length == 0" @click="copy">
    <template #icon><i class="fa fa-copy"></i></template>
    {{ t('common.copy') }}({{ selection.length }})
  </el-button>
  <el-button type="danger" plain :disabled="selection.length == 0" @click="remove">
    <template #icon><i class="fa fa-trash"></i></template>
    {{ $t('common.delete') }}({{ selection.length }})
  </el-button>
  <el-button type="primary" @click="setDefaultFields">
    <template #icon><i class="fa fa-table-columns"></i></template>
    {{ $t('single.set_default_fields') }}
  </el-button>
</template>

<style lang="scss">
</style>