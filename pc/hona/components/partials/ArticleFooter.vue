<script setup lang="ts">
import {toRefs} from "vue";

let emit = defineEmits(['preview', 'edit', 'copy', 'before-remove', 'remove'])
let props = defineProps({
  table: {type: Object, required: true},
  next: {type: Object, required: true},
  data: {type: Object, required: true},
  row: {type: Object, required: true},
})
let {table, next, data, row} = toRefs(props)

//region 行操作
let preview = (event: MouseEvent) => {
  emit('preview', row.value, event)
}
let edit = (event: MouseEvent) => {
  emit('edit', row.value, event)
}
let copy = (event: MouseEvent) => {
  emit('copy', row.value, event)
}
let beforeRemove = (event: MouseEvent) => {
  // emit('before-remove', row.value, event)
}
let remove = () => {
  emit('remove', [row.value])
}
//endregion
</script>

<template>
  <div class="article-footer">
    <i class="fa fa-search-plus btn-icon" @click.prevent.stop="preview" v-if="next.detail"></i>
    <i class="fa fa-pencil btn-icon" @click.prevent.stop="edit" v-if="next.update"></i>
    <i class="fa fa-copy btn-icon" @click.prevent.stop="copy" v-if="next.copy"></i>
    <el-popconfirm :width="180" :title="t('common.confirm_delete')" :confirm-button-text="t('common.confirm')"
                   :cancel-button-text="t('common.cancel')" @confirm="remove" v-if="next.delete">
      <template #reference><i class="fa fa-trash-alt btn-icon" @click.prevent.stop="beforeRemove"></i></template>
    </el-popconfirm>
  </div>
</template>

<style lang="scss">
</style>