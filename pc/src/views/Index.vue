<script setup lang="ts">
import {onActivated, onMounted} from "vue";
import {UrlHelper} from "hona-pc/commons";
import {useConfigStore, useUserStore, useSettingStore} from "hona-pc/stores";
import Container from 'hona-pc/components/commons/Container.vue';
import PanelGroup from 'hona-pc/components/panels/PanelGroup.vue';
import Panel from 'hona-pc/components/panels/Panel.vue';

let emit = defineEmits(['loaded'])
let userStore = useUserStore(), configStore = useConfigStore(), settingStore = useSettingStore()

let refresh = () => {
}

let to = (menu: any) => {
  let route = UrlHelper.getRoute(menu.url)
  route.query.m = menu.id
  UrlHelper.toUrl(menu.url)
}

onActivated(() => {
  emit('loaded', 'sys.name')
})

onMounted(async () => {
  let a = await configStore.getConfig('home')
  let b = await configStore.saveConfig('home', {a: 10})
})

defineExpose({refresh})
</script>

<template>
  <container class="home">
    <el-alert :title="`${$t('sys.welcome')} ${$t('sys.description')}`" type="info" style="margin-bottom: 10px;"
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