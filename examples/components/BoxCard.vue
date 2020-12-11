<template>
  <div class="box-card">
    <div v-if="title" class="box-card__header">
      <slot name="header">
        {{ title }} <span class="tip">{{ tip }}</span>
      </slot>
    </div>
    <div class="box-card__body"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'BoxCard',

  props: {
    title: { type: String, default: null },
    tip: { type: String, default: null }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin: 15px;
  background-color: #fff;
  color: #303133;
  border-radius: 3px;
  overflow: hidden;

  &__header {
    padding: 18px 20px;
    border-bottom: 1px solid #f8f8f8;
    box-sizing: border-box;

    .tip {
      color: #fa6400;
      margin-left: 1em;
    }
  }

  &__body {
    padding: 15px;
  }
}
</style>
