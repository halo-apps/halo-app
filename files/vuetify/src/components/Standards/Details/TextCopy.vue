<template>
  <span v-if="disabled">
      <slot></slot>
  </span>
  <div class="copy-container" v-else>
    <i class="btn-copy" @click="copy()">
      <!--      <img src="../../../public/images/clippy.svg" alt="复制文本"/>-->
      复制文本
    </i>
    <slot></slot>
  </div>
</template>

<script>
  import Clipboard from 'clipboard'

  export default {
    name: "TextCopy",
    props: {
      text: {type: String, default: ''},
      disabled: {type: Boolean, default: false},
    },
    methods: {
      copy() {
        let self = this
        let clipboard = new Clipboard('.btn-copy', {text: () => self.text})

        clipboard.on('success', function (e) {
          self.$message({message: '复制成功', showClose: true, type: 'success'})
          clipboard.destroy()
        })

        clipboard.on('error', function (e) {
          self.$message({message: '复制失败,', showClose: true, type: 'error'})
          clipboard.destroy()
        })
      }
    }
  }
</script>

<style scoped>

</style>
