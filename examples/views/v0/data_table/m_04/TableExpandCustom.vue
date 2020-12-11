<!-- TableExpandCustom.vue -->
<template>
  <div>
    <h5>{{ parentRow.row }}</h5>
    <img src="favicon.ico" width="30" />
  </div>
</template>

<script>
export default {
  props: {
    parentRow: { type: Object, default: null }
  }
}
</script>
