<template>
  <div class="app-layout">
    <AppMenu />
    <!-- <AppHead /> -->

    <div class="app-main">
      <transition name="fade" mode="out-in"><router-view /></transition>
    </div>
  </div>
</template>

<script>
import AppMenu from '@/layout/menu'
// import AppHead from '@/layout/header'

export default {
  components: { AppMenu }
}
</script>

<style lang="scss">
$--menu-width: 230px;

html,
body,
.app-layout {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: hsl(210, 37%, 97%);
  overflow: hidden;
}

.app-layout {
  overflow-y: auto;

  .app-menu {
    width: $--menu-width;
  }

  .app-main {
    margin-left: $--menu-width;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity, transform;
  transition-duration: 0.2s, 0.3s;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
  transform: translateX(0);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
