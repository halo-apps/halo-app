<script setup lang="ts">
import {onMounted, ref} from "vue";
import {appWindow} from "@tauri-apps/api/window";

let iframeRef = ref()

let mounted = async payload => {
  //控制窗口操作按钮位置
  let {head, body} = iframeRef.value.contentDocument
  let style = document.createElement('style')
  style.innerHTML = `
  .header-right{padding-right:144px;}
  .el-drawer__header .el-drawer__title{flex: initial;}
  `
  head.appendChild(style);

  //自定义触发拖拽
  let headerMiddle = body.querySelector('.header-middle')
  let mouseDown = e => {
    appWindow.startDragging()
  }
  //内存泄漏？
  headerMiddle.addEventListener('mousedown', mouseDown)
}
//最大化
let maximize = (payload: boolean) => {
  if (payload)
    document.documentElement.classList.add('maximize')
  else
    document.documentElement.classList.remove('maximize')
}
//主题变更
let changeTheme = payload => {
  document.documentElement.className = ''
  document.documentElement.classList.add(payload)
}

//接收到事件激发
window['emit'] = (event: string, payload: any) => {
  if (event == 'maximize') {
    maximize(payload)
    return
  }
  if (event == 'mounted') {
    mounted(payload)
    return
  }
  if (event == 'theme') {
    changeTheme(payload)
    return
  }
  console.error('事件未定义: ' + event)
}

onMounted(() => {
  // let observer = new MutationObserver(mutations => {
  // })
  // observer.observe(iframeRef.value, {attributes: true, attributeOldValue: true})
})
</script>

<template>
  <!--  <micro-app name="my-app" url="http://localhost:3000/"></micro-app>-->
  <iframe ref="iframeRef" src="/app/index.html"></iframe>
</template>

<style lang="scss">
</style>