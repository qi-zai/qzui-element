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
    columnWidth: { type: String, default: null },

    pageInfo: { type: Object, default: null }
  },

  methods: {
    handleTableColumn(h) {
      const cols = []

      for (let i = 0, col; (col = this.column[i]); i++) {
        cols.push(
          h('el-table-column', {
            props: { filterMultiple: false, width: this.columnWidth, ...col },
            scopedSlots: !['selection', 'index'].includes(col.type) && this.handleTableColumnScopedSlots(h, col)
          })
        )
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
                { props: { size: this.size, type: 'text', ...props }, on: { click: () => props.click(attrs) } },
                props.label
              )
            )
        }
      }

      return {
        default: (attrs) => [h('div', (col.labelCallback && col.labelCallback(attrs)) || attrs.row[attrs.column.property])]
      }
    },

    getTableRef() {
      return this.$refs.ref_table
    }
  },

  render(h) {
    return h('div', { class: 'qzui-data-table' }, [
      h('el-table', { ref: 'ref_table', props: this.$props }, this.handleTableColumn(h)),
      this.pageInfo &&
        h('el-pagination', {
          props: {
            background: true,
            layout: 'total, sizes, prev, pager, next, jumper',
            currentPage: 1,
            pageSize: 10,
            pageSizes: [10, 30, 50, 100, 150, 200],
            ...this.pageInfo
          },
          on: this.pageInfo.on
        })
    ])
  }
}
</script>

<style lang="scss">
.qzui-data-table {
  .el-table--border th:first-child .cell,
  .el-table--border td:first-child .cell {
    text-align: center;
  }

  .el-pagination {
    margin-top: 8px;
  }
}
</style>
