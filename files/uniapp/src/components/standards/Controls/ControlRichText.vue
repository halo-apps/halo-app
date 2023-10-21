<template>
  <scroll-view scroll-y="true" style="height:300px;" :scroll-top="scrollTop" @scroll="scroll">
    <form class="control-rich-text">
      <editor id="editor" :placeholder="'请输入'+field.label" :read-only="field.readonly" @ready="onEditorReady" @input="input"></editor>
    </form>
  </scroll-view>
</template>

<script>
  import {
    getValue,
    setValue
  } from '../../../plugins/standards/control-helper'

  export default {
    name: "ControlRichText",
    components: {},
    props: {
      table: {
        type: Object,
        default: null
      },
      field: {
        type: Object,
        default: null
      },
      form: {
        type: Object,
        default: null
      }, //大表单信息
      index: {
        type: Number,
      }, //当前行的索引
    },
    data() {
      return {
        editorCtx: null,
        scrollTop: 100,
      }
    },
    methods: {
      input({
        detail
      }) {
        this.model = detail.html
      },
      scroll({
        detail
      }) {
        // console.log(JSON.stringify(detail))
      },
      onEditorReady() {
        this.$nextTick(() => {
          //通过in(this)解决小程序拿不到context回调参数的问题
          let editor = uni.createSelectorQuery().in(this).select('#editor')
          editor.context((res) => {
            this.editorCtx = res.context
            this.editorCtx.setContents({
              html: this.model,
              success: (res) => {
                //重要：小程序只有在设置内容成功后，才可以触发scrollTop绑定
                //滚动到指定滚动条位置
                if (this.field.control.scrollTop) {
                  let scrollTop
                  if (this.index == -1) {
                    scrollTop = this.form[this.table.name][this.field.control.scrollTop]
                  } else {
                    scrollTop = this.form[this.table.name][this.index][this.field.control.scrollTop]
                  }
                  this.scrollTop = parseInt(scrollTop) * 2
                }
              },
              fail: (res) => {},
            })
          }).exec()
        })
      },
    },
    computed: {
      model: {
        get() {
          let result = getValue(this.form, this.index, this.table, this.field)
          return result
        },
        set(val) {
          setValue(val, this.form, this.index, this.table, this.field)
          this.$emit('change', this.form)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
