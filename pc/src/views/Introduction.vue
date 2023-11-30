<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ScriptHelper, useSettingStore } from "hona-pc";

let emit = defineEmits(['loaded'])
let scrollerRef = ref(), containerRef = ref(), height = ref()
let settingStore = useSettingStore()

ScriptHelper.load(['//cdn.jsdelivr.net/npm/jsmind@0.7.6/es6/jsmind.js', '//cdn.jsdelivr.net/npm/jsmind@0.7.6/style/jsmind.css'])

let updateHeight = () => {
  //直接设置滚动条直接子元素高度,以自动触发滚动条
  height.value = containerRef.value.querySelector('canvas').offsetHeight
}

let resize = (event: MouseEvent) => {
  updateHeight()
  scrollerRef.value.update()
}

onMounted(() => {
  var mind = {
    'meta': {
      'name': 'Profile',
      'author': '869758965@qq.com',
      'version': '0.2'
    },
    'format': 'node_array',
    'data': [
      { 'id': 'root', 'isroot': true, 'topic': settingStore.name },
      { 'id': 'pc', 'isroot': false, 'topic': 'PC', parentid: 'root' },
      { 'id': 'mobile', 'isroot': false, 'topic': 'Mobile', parentid: 'root' },
      { 'id': 'desktop', 'isroot': false, 'topic': 'Desktop', parentid: 'root' },
      { 'id': 'windows', 'isroot': false, 'topic': 'Windows', parentid: 'desktop' },
      { 'id': 'macos', 'isroot': false, 'topic': 'MacOS', parentid: 'desktop' },
      { 'id': 'linux', 'isroot': false, 'topic': 'Linux', parentid: 'desktop', },
      { 'id': 'android', 'isroot': false, 'topic': 'Android', parentid: 'root' },
      { 'id': 'harmony', 'isroot': false, 'topic': 'Harmony', parentid: 'root' },
      { 'id': 'ios', 'isroot': false, 'topic': 'iOS', parentid: 'root' },
    ]
  };
  var options = {
    container: 'jsmind_container',
    theme: 'primary',
    editable: true,
  };
  var jm = new (window as any).jsMind(options);
  jm.show(mind)

  updateHeight()
  emit('loaded', '框架介绍')
})

defineExpose({ resize })
</script>

<template>
  <el-scrollbar ref="scrollerRef">
    <div ref="containerRef" id="jsmind_container" :style="{ height: `${height}px` }"></div>
  </el-scrollbar>
</template>
<style lang="scss">
#jsmind_container {
  jmnode:hover {
    box-shadow: 1px 1px 8px #99f !important;
  }

  jmnodes.theme-primary jmnode.selected {
    background-color: #00f !important;
  }

  jmnode.selected {
    box-shadow: 2px 2px 8px #00f !important;
  }
}
</style>