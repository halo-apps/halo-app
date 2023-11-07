<script setup lang="ts">
import {computed, ref, toRefs} from "vue";
import {HttpHelper, MessageHelper, TreeHelper, useSettingStore} from "hona-pc";

let emit = defineEmits(['add', 'remove', 'copy', 'show-import', 'show-export', 'multiEdit', 'succeed', 'submit'])
let props = defineProps({
  table: Object,
  next: Object,
  data: Object,
  selection: Array,
})
let {table, next, data, selection} = toRefs(props)

let settingStore = useSettingStore()
let showDialog = ref(false), importing = ref(false)
let databases = ref([]), keywords = ref()
let form = ref({database: null, tables: []})

let showImport = () => {
  emit('show-import')
}

let showExport = () => {
  emit('show-export')
}

let search = () => {
  emit('submit')
}

let add = (ctrl = false) => {
  emit('add', ctrl)
}

let confirm = () => {
  emit('remove', selection.value)
}

let showImportTable = () => {
  HttpHelper.post('/dictionary/provider').then(({data}) => {
    databases.value = data
    showDialog.value = true
    if (form.value.database) {
      changeDatabase(form.value.database)
    }
  })
}

let selectionChange = (selection: any[]) => {
  form.value.tables = selection.map(n => n.name)
}

//更换数据库
let changeDatabase = (val: any) => {
  form.value.tables = [] //清空选择的数据表
  if (!val)
    return
  HttpHelper.get('/database/schema', {database: val, type: 'Table'}).then(({data}) => {
    let database = databases.value.find(n => n.value == val)
    database['tables'] = data
  })
}

//导入数据表
let submitImport = () => {
  importing.value = true
  HttpHelper.post('/database/importtable', form.value).then(({message}) => {
    MessageHelper.success(message)
  }).finally(() => {
    importing.value = false
  })
}

let tableRows = computed(() => { //当前选中的数据库的所有表
  let database = databases.value.find(n => n.value == form.value.database)
  if (!database || !database.tables)
    return []
  let result = TreeHelper.searchTree(keywords.value, database.tables, 'children', ['name', 'description'])
  return result
})
</script>

<template>
  <div class="search-title">
    <el-button type="primary" class="btn-insert" @click.exact="add()" @click.ctrl="add(true)">
      <template #icon><i class="fa fa-plus"></i></template>
      {{ $t('paging.add') }}
    </el-button>
    <el-popconfirm :width="180" :title="$t('common.confirm_delete')" :confirm-button-text="$t('common.confirm')"
                   :cancel-button-text="$t('common.cancel')" @confirm="confirm" v-if="next.delete">
      <template #reference>
        <el-button type="danger" class="btn-delete" plain :disabled="selection.length==0">
          <template #icon><i class="fa fa-trash-alt"></i></template>
          {{ $t('common.delete') }}({{ selection.length }})
        </el-button>
      </template>
    </el-popconfirm>
    <el-button type="primary" :disabled="!selection.length" @click="emit('copy', selection)"
               v-if="next.copy">
      <template #icon><i class="fa fa-copy"></i></template>
      {{ $t('common.copy') }}{{ selection.length ? '(' + selection.length + ')' : '' }}
    </el-button>
    <el-button type="primary" :icon="parent.multiEdit.isEditing?'el-icon-check':'el-icon-edit'"
               @click="emit('multi-edit')" :loading="parent.multiEdit.loading"
               v-if="next.update&&table.fields.find(n=>n.control.editable)">
      {{ parent.multiEdit.loading ? '载入中' : parent.multiEdit.isEditing ? '保存编辑' : '批量编辑' }}
    </el-button>
    <el-button @click="showImportTable">
      <template #icon><i class="fa fa-file-import"></i></template>
      {{ $t('common.import_table') }}
    </el-button>
  </div>
  <div class="search-operation">
    <el-button type="primary" @click="search">
      <template #icon><i class="fa fa-search"></i></template>
      {{ $t('paging.search') }}
    </el-button>
    <el-button @click="showImport" v-if="next.import">
      <template #icon><i class="fa fa-file-import"></i></template>
      {{ $t('paging.import') }}
    </el-button>
    <el-button @click="showExport" v-if="next.export">
      <template #icon><i class="fa fa-file-export"></i></template>
      {{ $t('paging.export') }}
    </el-button>
  </div>
  <el-dialog draggable :title="$t('common.import_table')" width="500px" append-to-body v-model="showDialog">
    <el-form>
      <el-form-item :label="$t('common.database')">
        <el-select clearable filterable @change="changeDatabase" v-model="form.database">
          <el-option v-for="item in databases" :key="item.value" :label="item.text" :value="item.value">
            <div class="autocomplete-text">{{ item.text }}</div>
            <div class="autocomplete-suffix">
              ({{ item.suffix }}
              <template v-if="settingStore.central.name==item.value">, 当前库</template>
              )
            </div>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-input type="text" clearable placeholder="搜索" v-model="keywords" v-if="form.database"></el-input>
    <el-table :data="tableRows" :max-height="300" border highlight-current-row style="height: auto;"
              @selection-change="selectionChange" v-if="tableRows.length>0">
      <el-table-column type="selection" width="30"></el-table-column>
      <el-table-column label="表名" prop="name"></el-table-column>
      <el-table-column label="描述" prop="description"></el-table-column>
      <el-table-column label="行数" prop="count"></el-table-column>
    </el-table>
    <el-divider></el-divider>
    <template #footer>
      <div class="search-operation">
        <span v-if="tableRows.length>0" style="font-size: 12px;">{{ form.tables.length }}/{{ tableRows.length }}</span>
      </div>
      <div class="footer-content">
        <el-button type="primary" :loading="importing" @click="submitImport">{{ $t('paging.import') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style>
</style>