<script>
export default {
  name: 'DataTable',

  props: {
    column: { type: Array, default: () => [] },
    data: { type: Array, default: () => [] }
  },

  render(h) {
    return h('div', { class: 'qzui-data-table' }, [
      h('el-table', { ref: 'elTableRef', props: { ...this.$props, ...this.$attrs }, on: this.on }, this.handleTableColumn(h))
    ])
  }
}
</script>

<style lang="scss">
.qzui-data-table {
  .el-pagination {
    margin: 15px 0;
  }
}
</style>
