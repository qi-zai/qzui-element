<template>
  <div class="app-layout">
    <AppMenu />
    <div class="app-layout-right">
      <AppHead />
      <div class="app-main"><router-view /></div>
    </div>
  </div>
</template>

<script>
import AppMenu from '@/layout/menu'
import AppHead from '@/layout/header'

export default {
  components: { AppMenu, AppHead }
}
</script>

<style lang="scss">
html,
body,
.app-layout {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #f4f7fa;
}

.app-layout {
  display: flex;

  &-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .app-main {
      flex: 1;
      margin: 15px;
      overflow: auto;
    }
  }
}
</style>
