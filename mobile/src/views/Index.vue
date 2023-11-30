<script setup lang="ts">
import {onMounted, ref} from "vue";
import {showDialog} from 'vant';
import {UrlHelper, useI18nStore, useUserStore, useSettingStore, useRouterStore} from "hona-mobile";

let emit = defineEmits(['loaded'])
let userStore = useUserStore(), settingStore = useSettingStore(), {t} = useI18nStore(), {router} = useRouterStore()
let operationVisible = ref(false)
let active = ref()
let operations = ref([{text: '设置'}, {text: '退出'}])

let selectOperation = (action: any) => {
  if (action.text == '设置') {
    return
  }
  if (action.text == '退出')
    router.push('/logout')
}

let showDescription = () => {
  let message = t('sys.description') + ' 版本：v' + settingStore['version']
  showDialog({message})
}

//获取菜单相对地址
let getMenuUrl = (menu: any, id: any) => {
  let result = UrlHelper.getUrl(menu.url, {m: id})
  return result
}

let init = () => {
  if (userStore.menus?.length > 0)
    active.value = router.currentRoute.query.m || userStore.menus[0].id.toString()
}

onMounted(() => {
  init()
  emit('loaded')
})
</script>

<template>
  <!--<van-loading v-if="loading"></van-loading>-->
  <van-nav-bar fixed :title="settingStore.name">
    <template #left>
      <div class="user" @click="operationVisible=!operationVisible" v-if="userStore.user">
        <van-icon name="user-o"/>
      </div>
      <router-link to="/login" v-else>登录</router-link>
      <van-popover placement="bottom" :actions="operations" @select="selectOperation"
                   v-model:show="operationVisible">
      </van-popover>
    </template>
    <template #right>
      <van-icon name="question-o" @click="showDescription"/>
    </template>
  </van-nav-bar>
  <div class="container footer">
    <van-notice-bar left-icon="volume-o" scrollable :text="$t('sys.description')"/>
    <div v-for="menu in userStore.menus" v-if="userStore.menus">
      <div class="index-title">{{ menu.title }}</div>
      <van-grid clickable>
        <van-grid-item :icon="child.icon" :to="getMenuUrl(child,child.id,false)" :text="child.title"
                       v-for="child in menu.children">
        </van-grid-item>
      </van-grid>
    </div>
    <van-empty description="暂无菜单权限" v-else/>
  </div>
  <van-tabbar fixed v-model="active">
    <van-tabbar-item :to="getMenuUrl(menu,menu.id)" :name="menu.id.toString()" :icon="menu.icon"
                     v-for="menu in userStore.menus">{{ menu.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<style lang="scss">
.user {
  line-height: 46px;

  i {
    font-size: 18px;
  }
}

.index-title {
  color: var(--van-text-color-2);
  padding: 10px 20px;
  font-size: var(--van-font-size-md);
}

.van-tabbar, .van-grid {
  i[class*="fa-"] {
    font-size: 15px;
  }
}
</style>