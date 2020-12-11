<template>
  <div class="code__wapper">
    <div :class="{ code__wapper__inner: !noWapper, pre__scroll: !noScroll }" code-title="代码">
      <div v-for="(v, k) in code" :key="k" :lang="k" class="code__preview">
        <highlightjs :language="k" :code="v" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreCode',

  props: {
    path: { type: String, default: null },
    codes: { type: Object, default: null },

    noWapper: Boolean,
    noScroll: Boolean
  },

  computed: {
    code() {
      return this.codes || (this.path && require('@/views/' + this.path)) || {}
    }
  }
}
</script>

<style lang="scss" scoped>
.code__wapper {
  &__inner {
    margin-top: 15px;
    padding: 0 15px 15px;
    background-color: #f4f7fa;
    border-radius: 3px;

    &::before {
      content: attr(code-title);
      display: block;
      padding: 18px 0;
      color: #e91e63;
    }
  }

  .code__preview {
    border-radius: 3px;
    background-color: #23241f;
    position: relative;

    + .code__preview {
      margin-top: 15px;
    }

    &::before {
      content: attr(lang);
      display: block;
      position: absolute;
      top: 5px;
      right: 8px;
      opacity: 0.6;
      text-transform: uppercase;
      font-weight: bold;
      color: #fff;
    }
  }

  pre {
    margin: 0;
    padding: 8px;
    line-height: 18px;
    font-size: 13px;
  }

  .pre__scroll pre {
    max-height: 50vh;
    overflow: auto;
  }
}
</style>
