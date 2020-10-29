<script>
export default {
  name: 'FilterLayout',

  props: {
    filters: { type: Array, default: () => [] },
    size: { type: String, default: 'medium' },
    labelWidth: { type: String, default: null },
    columnSpan: { type: Number, default: null },
    gutter: { type: Number, default: null },

    grid: Boolean
  },

  data() {
    return {
      comps: Object.freeze({
        input: (h, props) =>
          h('el-input', {
            attrs: { placeholder: '请输入...', size: this.size, ...props },
            on: { input: (event) => (props.value = event) }
          }),

        button: (h, props) =>
          h(
            'el-button',
            {
              props: { size: this.size, plain: true, ...props },
              on: { click: (...args) => props.click && props.click(...args) }
            },
            props.value
          ),

        select: (h, props) => {
          const childs = []
          if (props.options) {
            for (const k in props.options) {
              childs.push(
                h('el-option', {
                  props: {
                    value: props.options[k][props.props?.value || 'value'] || k,
                    label: props.options[k][props.props?.label || 'label'] || props.options[k],
                    disabled: props.options[k].disabled
                  }
                })
              )
            }
          }
          return h(
            'el-select',
            {
              attrs: { placeholder: '请选择...', size: this.size, ...props },
              on: { input: (event) => (props.value = event) }
            },
            childs
          )
        },

        date: (h, props) =>
          h('el-date-picker', {
            style: { width: props.type === 'datetimerange' ? '358px' : '230px', ...props.style },
            attrs: {
              type: 'date',
              placeholder: '选择日期',
              'range-separator': '',
              'start-placeholder': '开始日期',
              'end-placeholder': '结束日期',
              size: this.size,
              valueFormat: this.dateValueFormat(props.type),
              ...props
            },
            on: {
              input: (event) => (props.value = event)
            }
          }),

        buttonGroup: (h, props) =>
          h(
            'el-button-group',
            (props.buttons || props).map((item) => this.comps.button(h, item))
          ),

        dropdown: (h, props) =>
          h('el-dropdown', [
            h('el-button', { props: { size: this.size, ...props.button } }, [
              props.button.value,
              h('i', { class: 'el-icon-arrow-down el-icon--right' })
            ]),
            h(
              'el-dropdown-menu',
              props.options &&
                props.options.map((v, i) => h('el-dropdown-item', { nativeOn: { click: () => props.optionClick(i, v) } }, v))
            )
          ]),

        cascader: (h, props) =>
          h('el-cascader', { props: { size: this.size, ...props }, on: { input: (event) => (props.value = event) } }),

        custom: (h, props) =>
          h(props.custom(), { attrs: { size: this.size, ...props }, on: { input: (event) => (props.value = event) } })
      })
    }
  },

  methods: {
    dateValueFormat(type = 'date') {
      return {
        year: 'yyyy',
        month: 'yyyy-MM',
        monthrange: 'yyyy-MM',
        date: 'yyyy-MM-dd',
        dates: 'yyyy-MM-dd',
        daterange: 'yyyy-MM-dd',
        datetime: 'yyyy-MM-dd hh:mm:ss',
        datetimerange: 'yyyy-MM-dd hh:mm:ss'
      }[type]
    },

    getValues() {
      const data = {}
      for (let i = 0, item; (item = this.filters[i]); i++) {
        if (!item.key) continue
        data[item.key] = item.value
      }
      return data
    },

    reset() {
      for (let i = 0, item; (item = this.filters[i]); i++) {
        if (!item.mold || item.mold.includes('button')) continue
        item.value = null
      }
    },

    fetchLayout(h) {
      const root = h(
        'el-form',
        { class: 'qzui-filter-layout', attrs: { inline: true, labelWidth: this.labelWidth } },
        this.filters.map((props) => this.fetchItem(h, props))
      )
      if (!this.grid) return root

      return h('el-row', { props: { gutter: this.gutter } }, [root])
    },

    fetchItem(h, props) {
      const item = h('el-form-item', { props: { label: props.label, prop: props.key } }, [
        this.comps[Array.isArray(props) ? 'buttonGroup' : props.mold](h, props)
      ])
      if (!this.grid) return item

      return h('el-col', { props: { span: props.span || this.columnSpan } }, [item])
    }
  },

  render(h) {
    return this.fetchLayout(h)
  }
}
</script>

<style lang="scss">
.qzui-filter-layout {
  .el-form-item {
    margin-bottom: 10px;
  }

  .el-input {
    width: 180px;
  }
}
</style>
