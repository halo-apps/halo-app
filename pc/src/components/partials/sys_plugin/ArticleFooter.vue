<script>
export default {
  name: "ArticleFooter",
  props: {
    table: Object,
    data: Object,
    row: Object,
  },
  data() {
    return {
      form: {
        type: null,
        id: null
      },
      isInstalling: false,
      isUninstalling: false,
    }
  },
  methods: {
    install(e) {
      this.isInstalling = true
      e.preventDefault()
      this.form.type = 'install'
      this.form.id = this.row[this.table.key.name]
      this.$http.post('/system/Plugin', this.form).then(({message}) => {
        this.$message.success(message)
      }).finally(() => {
        this.isInstalling = false
      })
    },
    uninstall(e) {
      this.isUninstalling = true
      e.preventDefault()
      this.form.type = 'uninstall'
      this.form.id = this.row[this.table.key.name]
      this.$http.post('/system/Plugin', this.form).then(({message}) => {
        this.$message.success(message)
      }).finally(() => {
        this.isUninstalling = false
      })
    }
  }
}
</script>

<template>
  <div class="plugin-operation">
    <el-button type="primary" :loading="isInstalling" @click="install" v-if="!row['IsInstalled']">安装
    </el-button>
    <el-button type="danger" :loading="isUninstalling" @click="uninstall" v-else>卸载</el-button>
  </div>
</template>

<style lang="scss">
.plugin-operation {
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>