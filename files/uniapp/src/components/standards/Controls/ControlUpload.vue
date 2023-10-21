<template>
  <view :class="field.upload.preview?'control-file-preview':'control-file'">
    <view :list-type="listType" :action="action" :headers="headers" :file-list="fileList" :before-upload="beforeUpload"
      :before-remove="beforeRemove" :on-preview="preview" :on-success="success" :disabled="field.readonly">
      <i class="el-icon-plus" v-if="field.upload.preview"></i>
      <input type="button" v-else>点击上传</el-button>
    </view>
    <view :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="previewUrl" alt="">
    </view>
  </view>
</template>

<script>
  import store from '../../../store/index.js'
  import {
    getHeader
  } from '../../../plugins/auth'
  import {
    getValue,
    setValue
  } from '../../../plugins/standards/control-helper'
  import {
    isImage,
    getFileIcon,
    isHttpOrHttps
  } from '../../../plugins/standards/upload-helper'
  import {
    uploadDelete
  } from '../../../api/custom'

  export default {
    name: 'ControlUpload',
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
      } //当前行的索引
    },
    data() {
      return {
        dialogVisible: false,
        action: this.settings, //.api.url+ 'system/upload',
        headers: getHeader(),
        fileList: []
      }
    },
    methods: {
      beforeUpload(file) {
        return new Promise((resolve, reject) => {
          if (this.field.upload.type == 'Image') {
            if (file.type.indexOf('image') == 0) {
              resolve()
            } else {
              this.$message.error('请上传正确的图片文件')
              reject()
            }
          } else {
            //放行
            resolve()
          }
        })
      },
      beforeRemove(file, fileList) {
        let url = file.name.replace(settings.api.url, '')
        let files = [url]
        return new Promise((resolve, reject) => {
          uploadDelete({
            files
          }).then(({
            data
          }) => {
            setValue(null, this.form, this.index, this.table, this.field)
            this.$emit('change', this.form)
            resolve()
          }).catch(() => {
            reject()
          })
        })
      },
      preview(file) {
        this.dialogVisible = true
      },
      success({
        code,
        message,
        data
      }, file) {
        if (code != 200) {
          this.$message.error(message)
          //上传失败，清空图片
          this.fileList = []
        } else {
          let url = data[0].url
          if (!isImage(url)) {
            file.url = getFileIcon(url) //重新设置缩略图地址
          }
          setValue(url, this.form, this.index, this.table, this.field)
          this.$emit('change', this.form)
        }
      },
      getFileList() {
        if (!this.value) return
        let url = isHttpOrHttps(this.value) ? this.value : settings.api.url + this.value
        let file = {
          name: url
        }
        if (isImage(url)) {
          file.url = url
        } else {
          file.url = getFileIcon(url)
        } //重新设置缩略图地址
        this.fileList.push(file)
      }
    },
    created() {
      this.getFileList()
    },
    computed: {
      listType() {
        return this.field.upload.preview ? 'picture-card' : null
      },
      value() {
        return getValue(this.form, this.index, this.table, this.field)
      },
      previewUrl() {
        if (!this.value) {
          return this.value
        }
        let url = settings.api.url + this.value
        if (isImage(url)) {
          return url
        } else {
          return getFileIcon(url)
        }
      },
      settings() {
        return store.state.system.settings
      },
    }
  }
</script>

<style lang="scss">
  .control-file-preview {
    .el-upload--picture-card {
      width: 80px;
      height: 80px;
      line-height: 88px;
    }

    .el-upload-list__item {
      width: 80px;
      height: 80px;
    }
  }

  .control-file {}
</style>
