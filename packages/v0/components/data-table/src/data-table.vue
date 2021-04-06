<script>
export default {
  name: 'DataTable',

  props: {
    column: { type: Array, default: () => [] },
    data: { type: Array, default: () => [] },

    height: { type: Number, default: null },
    size: { type: String, default: null },
    maxHeight: { type: Number, default: null },
    border: { type: Boolean, default: true },
    columnWidth: { type: String, default: null },
    align: { type: String, default: 'center' },
    headerAlign: { type: String, default: 'center' },
    stripe: { type: Boolean, default: true },
    showOverflowTooltip: { type: Boolean, default: true },

    on: { type: Object, default: () => ({}) },

    pageInfo: { type: Object, default: null }
  },

  computed: {
    elTableRef() {
      return this.$refs.elTableRef
    },

    selection() {
      return this.elTableRef.selection
    }
  },

  destroyed() {
    this.destroyedTimer()
  },

  methods: {
    handleTableColumn(h) {
      const cols = []

      for (const col of this.column) {
        if (col.display === false) continue

        let scopedSlots = null
        const key = col.slot_key || col.prop
        if (key && this.$scopedSlots[key]) {
          scopedSlots = { default: this.$scopedSlots[key] }
        } else {
          scopedSlots = col.labelCallback
            ? this.handleTableColumnScopedSlots(h, col)
            : !['selection', 'index'].includes(col.type) &&
              !(col.prop && col.prop.includes('.')) &&
              this.handleTableColumnScopedSlots(h, col)
        }

        cols.push(
          h('el-table-column', {
            props: {
              filterMultiple: false,
              width: this.columnWidth,
              headerAlign: this.headerAlign,
              align: ['selection', 'index'].includes(col.type) ? 'center' : this.align,
              showOverflowTooltip: this.showOverflowTooltip,
              ...col
            },
            scopedSlots
          })
        )
      }

      return cols
    },

    handleTableColumnScopedSlots(h, col) {
      if (['expand', 'custom'].includes(col.type)) {
        return {
          default: (attrs) => [h(col.component, { props: { parentRow: attrs } })]
        }
      } else if (col.tag) {
        return {
          default: (attrs) => [h('el-tag', { props: { type: col.tag(attrs) } }, attrs.row.tag)]
        }
      } else if (col.actions) {
        return {
          default: (attrs) => {
            const arr = []
            const list = typeof col.actions === 'function' ? col.actions.call(this.$parent, attrs) : col.actions
            for (const props of list) {
              if (props.display === false) continue
              arr.push(
                h(
                  'el-button',
                  {
                    style: props.style,
                    props: { size: this.size, type: 'text', ...props },
                    class: props.class,
                    on: { click: () => props.click && props.click(attrs, props) }
                  },
                  props.label
                )
              )
            }
            return arr
          }
        }
      }

      return {
        default: (attrs) => [
          h(
            'div',
            { class: 'cell' + (attrs.column.showOverflowTooltip ? ' el-tooltip' : '') },
            (col.labelCallback && col.labelCallback(attrs)) || attrs.row[attrs.column.property]
          )
        ]
      }
    },

    currentChange(current) {
      this.pageChange((this.pageInfo.currentPage = current))
    },

    sizeChange(pageSize) {
      this.pageChange((this.pageInfo.pageSize = pageSize))
    },

    pageChange() {
      if (this._timer) this.destroyedTimer()

      this._timer = setTimeout(() => this.$emit('page-change', this.pageInfo), 100)
    },

    destroyedTimer() {
      clearTimeout(this._timer)
      this._timer = null
    }
  },

  render(h) {
    return h('div', { class: 'qzui-data-table' }, [
      h('el-table', { ref: 'elTableRef', props: { ...this.$props, ...this.$attrs }, on: this.on }, this.handleTableColumn(h)),
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
          on: { 'size-change': this.sizeChange, 'current-change': this.currentChange }
        })
    ])
  }
}
</script>

<style lang="scss">
.el-table .cell {
  text-align: inherit;

  &.el-tooltip .cell.el-tooltip {
    padding: 0;
  }
}

.qzui-data-table {
  .el-pagination {
    margin: 15px 0;
  }
}
</style>
