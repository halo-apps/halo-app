<script setup lang="ts">
import {computed} from "vue";
import {useComponentStore} from "hona-pc";

let componentStore = useComponentStore()

let controls = computed(() => {
  let result = componentStore.comps.filter(n => n.indexOf('control-') == 0)
  return result
})

let refresh = () => {
}

defineExpose({refresh})
</script>

<template>
  <div class="table-design">
    <div class="design-side">
      <div class="side-title">控件选择</div>
      <div class="design-controls">
        <div class="design-control" draggable="true" v-for="control in controls">{{ control }}</div>
      </div>
    </div>
    <div class="design-main">
      布局设计
    </div>
    <div class="design-config">
      <div class="config-title">控件配置</div>
    </div>
  </div>
</template>

<style lang="scss">
.table-design {
  display: flex;
  justify-content: space-between;
  height: 100%;
  overflow: auto;

  .design-side {
    width: 200px;
    border-right: 1px solid #363738;

    .side-title {
      border-bottom: 1px solid #363738;
      height: 32px;
      padding-left: 10px;
      display: flex;
      align-items: center;
    }

    .design-controls {
      display: flex;
      flex-wrap: wrap;
    }

    .design-control {
      width: 100px;
    }
  }

  .design-main {
  }

  .design-config {
    .config-title {
      border-bottom: 1px solid #363738;
      height: 32px;
      padding-left: 10px;
      display: flex;
      align-items: center;
    }
  }
}
</style>