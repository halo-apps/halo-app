<template>
  <div class="window-controller" v-if="isElectron">
    <div class="controller-item" @click="adjust('minimize')">
      <i class="el-icon-minus"></i>
    </div>
    <div class="controller-item" @click="adjust('restore')" v-if="false">
      <i class="fa fa-window-restore"></i>
    </div>
    <div class="controller-item" @click="adjust('maximize')" v-else>
      <i class="fa fa-window-maximize"></i>
    </div>
    <div class="controller-item" @click="adjust('close')">
      <i class="el-icon-close"></i>
    </div>
  </div>
</template>

<script>
  const {ipcRenderer} = require("electron")

  export default {
    name: "WindowController",
    data() {
      return {}
    },
    methods: {
      //调整窗口
      adjust(type) {
        if (type == 'minimize') {
          ipcRenderer.send('minimize')
        } else if (type == 'restore') {
          ipcRenderer.send('restore')
        } else if (type == 'maximize') {
          ipcRenderer.send('maximize')
        } else if (type == 'close') {
          ipcRenderer.send('close')
        }
      }
    },
    computed: {
      isElectron() {
        var userAgent = navigator.userAgent.toLowerCase()
        return userAgent.indexOf(' electron/') > -1
      }
    }
  }
</script>

<style lang="scss" scoped>
  .window-controller {
    display: inline-block;

    .controller-item {
      cursor: pointer;
      display: block;
      float: left;
      padding: 0 14px;
      color: #5a5e66;

      i {
        font-size: 16px;
      }

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }
  }
</style>
