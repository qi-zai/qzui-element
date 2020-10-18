<script>
export default {
  name: 'DataTable',

  props: {
    column: { type: Array, default: () => [] },
    data: { type: Array, default: () => [] },

    height: { type: Number, default: null },
    size: { type: String, default: 'mini' },
    maxHeight: { type: Number, default: null },
    border: { type: Boolean, default: true },
    columnWidth: { type: String, default: null }
  },

  data: () => ({}),

  methods: {
    handleTableColumn(h) {
      const cols = []

      for (let i = 0, col; (col = this.column[i]); i++) {
        const props = { filterMultiple: false, width: this.columnWidth, ...col }
        const scopedSlots = this.handleTableColumnScopedSlots(h, col)
        cols.push(h('el-table-column', { props, scopedSlots }))
      }

      return cols
    },

    handleTableColumnScopedSlots(h, col) {
      if (col.tag)
        return {
          default: (attrs) => [h('el-tag', { props: { type: col.tag(attrs) } }, attrs.row.tag)]
        }
      else if (col.actions && col.actions.length) {
        return {
          default: (attrs) =>
            col.actions.map((props) =>
              h(
                'el-button',
                { props: { type: 'text', ...props }, on: { click: () => this.$emit('click-action', attrs, props) } },
                props.label
              )
            )
        }
      }
    }
  },

  render(h) {
    return h('el-table', { props: this.$props }, this.handleTableColumn(h))
  }
}
</script>

<style lang="scss">
.el-table--border th:first-child .cell,
.el-table--border td:first-child .cell {
  text-align: center;
}
</style>
