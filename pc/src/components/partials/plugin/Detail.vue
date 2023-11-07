<script setup>
import {ref, toRefs} from "vue";
import {MessageHelper, HttpHelper, PanelOperation} from "hona-pc";

let props = defineProps({
  route: {type: Object, required: true},//要显示哪个路由的表单信息
  table: {type: Object, required: true},
  data: {type: Object, required: true},
  next: {type: Object, required: true},
})
let {table, data, next} = toRefs(props)
let publishing = ref(false)
let packing = ref(false)
let publishForm = ref({id: null, type: null, terminal: null, version: null})

let packPlugin = () => {
  packing.value = true
  publishForm.value.id = data.value[table.value.name][0][table.value.key.name]
  publishForm.value.type = 'pack'
  HttpHelper.post('/system/plugin', publishForm.value).then(res => {
    MessageHelper.success(res.message)
  }).finally(() => {
    packing.value = false
  })
}
let publishPlugin = (command) => {
  publishing.value = true
  publishForm.value.id = data.value[table.value.name][0][table.value.key.name]
  publishForm.value.type = 'publish'
  publishForm.value.terminal = data.value[table.value.name][0].Terminal
  publishForm.value.version = command
  HttpHelper.post('/system/sysplugin', publishForm.value).then(res => {
    MessageHelper.success(res.message)
  }).finally(() => {
    publishing.value = false
  })
}
</script>

<template>
  <panel-operation>
    <el-button type="warning" icon="fa fa-file-zip-o" :loading="packing" @click="packPlugin">打包</el-button>
    <el-dropdown class="btn-gap" @command="publishPlugin">
      <el-button type="danger" icon="fa fa-battery-quarter" :loading="publishing" @click="publishPlugin('small')">发布
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="small" icon="fa fa-battery-quarter">Small</el-dropdown-item>
          <el-dropdown-item command="medium" icon="fa fa-battery-half">Medium</el-dropdown-item>
          <el-dropdown-item command="big" icon="fa fa-battery-full">Big</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-button type="primary" icon="el-icon-edit" @click="parent.edit">修改</el-button>
    <el-button @click="close">
      <template #icon><i class="fa fa-chevron-left"></i></template>
      {{ $t('common.back') }}
    </el-button>
  </panel-operation>
</template>

<style>
</style>