<template>
  <div class="text-image">
    <img class="detail-image" :src="href" @click="dialogVisible=true" :alt="value" v-if="href"/>
    <el-dialog :visible.sync="dialogVisible" top="5vh" :append-to-body="true" v-if="href">
      <img width="100%" :src="href">
    </el-dialog>
  </div>
</template>

<script>
  import {getFileIcon, isImage, isHttpOrHttps} from '../../../plugins/standards/upload-helper'
  import {getValue} from '../../../plugins/standards/control-helper'
	import store from '../../../store/index.js'

  export default {
    name: 'TextFile',
    props: {
      table: {type: Object, default: null},
      field: {type: Object, default: null},
      index: {type: Number, default: null},
      form: {type: Object, default: null},
      from: {type: String, default: null},
      page: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        dialogVisible: false
      }
    },
    methods: {},
    computed: {
      value() {
        let value = getValue(this.form, this.index, this.table, this.field, this.page)
        return value
      },
      href() {
        if (!this.value) {
          return this.value
        }
        let url = isHttpOrHttps(this.value) ? this.value : store.state.system.settings.api.url + this.value
        if (isImage(url)) {
          return url
        } else {
          return getFileIcon(url)
        }
      }
    }
  }
</script>

<style scoped>

</style>