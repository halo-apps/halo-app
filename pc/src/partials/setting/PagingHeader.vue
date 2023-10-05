<script setup lang="ts">
import {ref, toRefs} from "vue";
import {MessageHelper} from "hona-pc/commons";
import {HttpHelper} from "hona-pc/services";
import {useConfigStore, useSettingStore} from "hona-pc/stores";

let emit = defineEmits(['add', 'remove', 'copy', 'showImport', 'showExport', 'multiEdit', 'succeed', 'submit'])
let props = defineProps({
  table: {type: Object},
  next: {type: Object},
  data: {type: Object},
  selection: {type: Array},
  multiEdit: {type: Object},
})
let {table, next, data, selection, multiEdit} = toRefs(props)

let settingStore = useSettingStore(), configStore = useConfigStore()
let centralMigrating = ref(false), migrateVisible = ref(false)
let databases = ref([])
let centralForm = ref({
  appFrom: null,
  appTo: null,
  centralFrom: null,
  centralTo: null,
  businessFrom: null,
  businessTo: null,
  clearTarget: false
})

let search = () => {
  emit('submit')
}

let add = (ctrl = false) => {
  emit('add', ctrl)
}

let confirm = () => {
  emit('remove', selection.value)
}

//显示迁移
let showMigrate = () => {
  migrateVisible.value = true
  if (!centralForm.value.appFrom)
    centralForm.value.appFrom = settingStore.application
  if (!centralForm.value.appTo)
    centralForm.value.appTo = settingStore.application
  HttpHelper.post('/dictionary/provider').then(({data}) => {
    databases.value = data
    if (!centralForm.value.centralFrom) {
      let central = data.find(n => n.text == settingStore.central.name)
      centralForm.value.centralFrom = central.value
    }
    if (!centralForm.value.businessFrom) {
      let business = data.find(n => n.text == settingStore.business.name)
      centralForm.value.businessFrom = business.value
    }
  })
  configStore.getConfig('migrate').then(res => {
    if (!res)
      return
    if (!centralForm.value.centralTo)
      centralForm.value.centralTo = res.centralTo
    if (!centralForm.value.businessTo)
      centralForm.value.businessTo = res.businessTo
  })
}

//迁移
let centralMigrate = () => {
  centralMigrating.value = true
  configStore.saveConfig('migrate', centralForm.value)
  HttpHelper.post('/system/migrate', centralForm.value).then(({message}) => {
    MessageHelper.success(message)
  }).finally(() => {
    centralMigrating.value = false
  })
}
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
    <el-button type="primary" :disabled="!selection.length" @click="$emit('copy', selection)">
      <template #icon><i class="fa fa-copy"></i></template>
      {{ $t('common.copy') }}{{ selection.length ? '(' + selection.length + ')' : '' }}
    </el-button>
    <el-button type="primary" :icon="parent.multiEdit.isEditing?'el-icon-check':'el-icon-edit'"
               :loading="parent.multiEdit.loading" @click="$emit('multi-edit')"
               v-if="next.update&&table.fields.find(n=>n.control.editable)">
      {{ parent.multiEdit.loading ? '载入中' : parent.multiEdit.isEditing ? '保存编辑' : '批量编辑' }}
    </el-button>
    <el-button @click="showMigrate">
      <template #icon><i class="fa fa-database"></i></template>
      {{ $t('setting.migration') }}
    </el-button>
    <el-dialog class="migrate" draggable title="迁移" width="500px" append-to-body v-model="migrateVisible">
      <el-form label-width="70px" label-position="left">
        <el-form-item label="应用">
          <el-input v-model="centralForm.appFrom"></el-input>
          <div class="to">-></div>
          <el-input v-model="centralForm.appTo"></el-input>
        </el-form-item>
        <el-form-item label="中心库">
          <el-select filterable clearable v-model="centralForm.centralFrom">
            <el-option :label="`${item.text}(${item.suffix})`" :value="item.value" v-for="item in databases"
                       :key="item.value">
              <span class="autocomplete-text">{{ item.text }}</span>
              <span class="autocomplete-suffix">
                ({{ item.suffix }}<template v-if="settingStore.central.name==item.text">, 当前中心库</template>)
              </span>
            </el-option>
          </el-select>
          <div class="to">-></div>
          <el-select filterable clearable v-model="centralForm.centralTo">
            <el-option :label="item.text+'('+item.suffix +')'" :value="item.value" v-for="item in databases"
                       :key="item.value">
              <span class="autocomplete-text">{{ item.text }}</span>
              <span class="autocomplete-suffix">
                ({{ item.suffix }}<template v-if="settingStore.central.name==item.text">, 当前中心库</template>)
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务库">
          <el-select filterable clearable v-model="centralForm.businessFrom">
            <el-option :label="item.text+'('+item.suffix +')'" :value="item.value" v-for="item in databases"
                       :key="item.value">
              <span class="autocomplete-text">{{ item.text }}</span>
              <span class="autocomplete-suffix">
                ({{ item.suffix }}<template v-if="settingStore.business.name==item.text">, 当前业务库</template>)
              </span>
            </el-option>
          </el-select>
          <div class="to">-></div>
          <el-select filterable clearable v-model="centralForm.businessTo">
            <el-option :label="item.text+'('+item.suffix +')'" :value="item.value" v-for="item in databases"
                       :key="item.value">
              <span class="autocomplete-text">{{ item.text }}</span>
              <span class="autocomplete-suffix">
                ({{ item.suffix }}<template v-if="settingStore.business.name==item.text">, 当前业务库</template>)
              </span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <template #footer>
        <div class="search-operation">
          <el-checkbox v-model="centralForm.clearTarget">清空目标配置</el-checkbox>
        </div>
        <div class="footer-content">
          <el-button type="primary" :loading="centralMigrating" @click="centralMigrate">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
  <div class="search-operation">
    <el-button type="primary" @click="search">
      <template #icon><i class="fa fa-search"></i></template>
      {{ $t('paging.search') }}
    </el-button>
    <el-button @click="emit('show-import')" v-if="next.import">
      <template #icon><i class="fa fa-file-import"></i></template>
      {{ $t('paging.import') }}
    </el-button>
    <el-button @click="emit('show-export')" v-if="next.export">
      <template #icon><i class="fa fa-file-export"></i></template>
      {{ $t('paging.export') }}
    </el-button>
  </div>
</template>

<style lang="scss">
.migrate {
  .el-form-item__content {
    flex-wrap: nowrap;
  }

  .to {
    margin: 0 10px;
  }

  .el-input {
    width: 170px;
  }
}
</style>