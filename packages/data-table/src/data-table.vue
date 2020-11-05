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
    headerAlign: { type: String, default: 'center' },

    events: { type: Object, default: () => ({}) },

    pageInfo: { type: Object, default: null }
  },

  destroyed() {
    this.destroyedTimer()
  },

  methods: {
    handleTableColumn(h) {
      const cols = []

      for (let i = 0, col; (col = this.column[i]); i++) {
        cols.push(
          h('el-table-column', {
            class: 'twstst',
            props: {
              filterMultiple: false,
              width: this.columnWidth,
              headerAlign: this.headerAlign,
              align: ['selection', 'index'].includes(col.type) ? 'center' : null,
              className: col.type === 'editable' ? 'qzui-table-editable' : null,
              ...col
            },
            scopedSlots: col.labelCallback
              ? this.handleTableColumnScopedSlots(h, col)
              : !['selection', 'index'].includes(col.type) &&
                !(col.prop && col.prop.includes('.')) &&
                this.handleTableColumnScopedSlots(h, col)
          })
        )
      }

      return cols
    },

    handleTableColumnScopedSlots(h, col) {
      if (col.type === 'editable') {
        return {
          default: (attrs) => {
            return [
              h('input', {
                attrs: { placeholder: '请输入...', value: attrs.row[attrs.column.property], ...col.editorAttrs },
                on: { input: (event) => (attrs.row[attrs.column.property] = event.target.value) }
              })
            ]
          }
        }
      } else if (['expand', 'custom'].includes(col.type)) {
        return {
          default: (attrs) => [h(col.component, { props: { parentRow: attrs } })]
        }
      } else if (col.tag) {
        return {
          default: (attrs) => [h('el-tag', { props: { type: col.tag(attrs) } }, attrs.row.tag)]
        }
      } else if (col.actions) {
        return {
          default: (attrs) =>
            (typeof col.actions === 'function' ? col.actions.call(this.$parent, attrs) : col.actions).map((props) =>
              h(
                'el-button',
                {
                  props: { size: this.size, type: 'text', ...props },
                  on: { click: () => props.click && props.click(attrs, props) }
                },
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
      h('el-table', { ref: 'ref_table', props: { ...this.$props, ...this.$attrs }, on: this.events }, this.handleTableColumn(h)),
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
.qzui-data-table {
  .el-pagination {
    margin: 15px 0;
  }

  .qzui-table-editable {
    input {
      margin: inherit;
      padding: 0 8px;
      width: 100%;
      outline: 0;
      font-size: inherit;
      font-weight: inherit;
      color: inherit;
      line-height: 35px;
      background-color: transparent;
      border: 1px solid #ebeef5;
      border-radius: 3px;
      box-sizing: border-box;
    }
  }
}
</style>
