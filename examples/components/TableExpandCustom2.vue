<template>
  <div>
    <h5>{{ parentRow.row.address }}</h5>
    <img src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2699863970,3643884691&fm=26&gp=0.jpg" height="80" />
  </div>
</template>

<script>
export default {
  props: {
    parentRow: { type: Object, default: null }
  },

  data() {
    return {}
  },

  mounted() {}
}
</script>
