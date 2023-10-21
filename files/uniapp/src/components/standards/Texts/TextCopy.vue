<template>
  <view v-if="!field.copy">
    <slot></slot>
  </view>
  <view class="copy-container" v-else>
    <i class="btn-copy" @click="copy()">
      <img src="../../../../static/images/clippy.svg" alt="复制文本" />
    </i>
    <slot></slot>
  </view>
</template>

<script>
  import {
    getValue
  } from '../../../plugins/standards/control-helper'

  export default {
    name: 'TextCopy',
    props: {
      table: {
        type: Object,
        default: null
      },
      field: {
        type: Object,
        default: null
      },
      index: {
        type: Number,
        default: null
      },
      form: {
        type: Object,
        default: null
      },
      from: {
        type: String,
        default: null
      },
      disabled: {
        type: Boolean,
        default: false
      },
      page: {
        type: Number,
        default: null
      }
    },
    methods: {
      getJson(value) {
        return JSON.stringify(JSON.parse(value), null, 2)
      },
      getCopyText() {
        if (this.value) {
          if (this.field.control.type == 'Json') {
            return this.getJson(this.value).replace(/"/g, '\'')
          }
        }
        return this.value
      },
      copy() {
        // let self = this
        // let clipboard = new Clipboard('.btn-copy', { text: () => self.getCopyText() })

        // clipboard.on('success', function(e) {
        //   self.$message({ message: '复制成功', showClose: true, type: 'success' })
        //   clipboard.destroy()
        // })

        // clipboard.on('error', function(e) {
        //   self.$message({ message: '复制失败,', showClose: true, type: 'error' })
        //   clipboard.destroy()
        // })
      }
    },
    computed: {
      value() {
        let value = getValue(this.form, this.index, this.table, this.field, this.page)
        return value
      }
    }
  }
</script>

<style lang="scss">
  .copy-container {
    .btn-copy {
      display: none;
      position: absolute;
      right: 30px;
      top: 10px;
      cursor: pointer;
      transition: all .3s ease-in-out;
      opacity: 0;
      background-color: #eee;
      background-image: linear-gradient(#fcfcfc, #eee);
      border: 1px solid #d5d5d5;
      border-radius: 3px;
      padding: 3px 6px;
      z-index: 1;

      img {
        width: 13px;
      }
    }

    &:hover {
      .btn-copy {
        display: block;
        opacity: 1;
      }
    }

    .json {
      line-height: 20px;
      max-height: 200px;
      overflow-y: scroll;
      white-space: pre-wrap;

      /* 设置滚动条的样式 */
      &::-webkit-scrollbar {
        width: 10px;
        background-color: #eee;
      }

      /* 滚动槽 */
      &::-webkit-scrollbar-track {
        //border-radius: 3px;
      }

      /* 滚动条滑块 */
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #aaa;
      }
    }
  }
</style>
