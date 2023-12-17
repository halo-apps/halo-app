<script setup lang="ts">
import {onActivated} from "vue";
import {UrlHelper, useConfigStore, useUserStore, Container, Panel, PanelGroup} from "hona-pc";

let emit = defineEmits(['loaded', 'navigate'])
let userStore = useUserStore(), configStore = useConfigStore()

let refresh = () => {
}

let to = (menu: any) => {
  let url = UrlHelper.getUrl(menu.url, {m: menu.id})
  UrlHelper.toUrl(url)
  emit('navigate', url)
}

onActivated(() => {
  emit('loaded', 'sys.name')
})


defineExpose({refresh})
</script>

<template>
  <container class="home">
    <el-alert :title="`${t('sys.welcome')} ${t('sys.description')}`" type="info" style="margin-bottom: 10px;"
              show-icon></el-alert>
    <panel-group>
      <panel dark :title="menu.title" v-for="menu in userStore.menus">
        <div class="menus">
          <div class="menu" v-for="child in menu.children" @click="to(child)">
            <i :class="child.icon"></i>
            <span class="title">{{ child.title }}</span>
          </div>
        </div>
      </panel>
    </panel-group>
  </container>
</template>

<style lang="scss">
</style>