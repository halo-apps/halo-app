<script setup lang="ts">
import {onMounted} from "vue";
import {appWindow} from "@tauri-apps/api/window";
// import {Command} from '@tauri-apps/api/shell'
// import {resolve, resourceDir} from "@tauri-apps/api/path";
import {BaseDirectory, readTextFile} from "@tauri-apps/api/fs";
import Index from "./views/Index.vue";

let getSetting = async () => {
  let settingContent = await readTextFile("settings.json", {dir: BaseDirectory.Resource})
  let setting = JSON.parse(settingContent)
  console.log('setting', setting)
  return setting
}

// let init = async args => {
//   let api = await resolve(await resourceDir(), "resources/api/")
//   console.log('api', api)
//   const command = new Command("api", [args], {cwd: api})
//   // command.on('error', error => console.error(`API错误: "${error}"`))
//   // command.stdout.on('data', line => console.log(`API标准输出: "${line}"`))
//   command.stderr.on('data', line => {
//     writeFile({path: 'log.txt', contents: line}, {dir: BaseDirectory.Resource})
//     if (line.indexOf('address already in use') > -1)
//       console.error(`API标准错误: "${line}"`, args)
//   })
//   let child = await command.spawn()
// }

onMounted(async () => {
  let setting = await getSetting()
  console.log(setting)

  //TODO 待处理：动态启用拖拽事件，可以防止 DOM销毁后，拖拽失效
  // document.addEventListener('touchstart', (e) => {
  //   if (e.target.hasAttribute('data-tauri-drag-region')) {
  //     e.preventDefault()
  //     appWindow.startDragging();
  //   }
  // })

  // let wd = iframeRef.value.contentWindow
  // wd._setting = {
  //   api: {
  //     url: setting.api
  //   },
  //   web: {
  //     debug: true,//是否开启调试模式（用于打印调试数据）
  //     sidebar: {
  //       width: 210,//侧标栏宽度，默认210px
  //     },
  //     mta_app_id: '500721809'
  //   }
  // }
  // init(setting.args).then()//先执行console输出的事件监听，否则下面更改了window的属性，会导致console无法输出内容并报错
})
</script>

<template>
  <index></index>
  <!--  <div class="title-drag" data-tauri-drag-region></div>-->
  <div class="title-bar">
    <i class="iconfont icon-min min" @click="appWindow.minimize()"></i>
    <i class="iconfont icon-full-screen max" @click="appWindow.toggleMaximize()"></i>
    <i class="iconfont icon-restore restore" style="display: none;"></i>
    <i class="iconfont icon-close2 close" @click="appWindow.hide()"></i>
  </div>
</template>

<style lang="scss">
.desktop-app {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>