<script>
export default {
  name: 'FilterLayout',

  props: {
    filters: { type: Array, default: () => [] },
    size: { type: String, default: 'medium' }
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
          h('el-button', { props: { size: this.size, plain: true, ...props }, on: { click: props.click } }, props.value),

        select: (h, props) =>
          h(
            'el-select',
            {
              attrs: { placeholder: '请选择...', size: this.size, ...props },
              on: { input: (event) => (props.value = event) }
            },
            props.options &&
              props.options.map((v) =>
                h('el-option', {
                  props: {
                    value: v[props.props?.value || 'value'],
                    label: v[props.props?.label || 'label'],
                    disabled: v.disabled
                  }
                })
              )
          ),

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
            props.map((item) => this.comps.button(h, item))
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
    }
  },

  render(h) {
    return h(
      'el-form',
      { class: 'qzui-filter-layout', props: { inline: true } },
      this.filters.map((props) =>
        h('el-form-item', { props: { label: props.label } }, [
          this.comps[Array.isArray(props) ? 'buttonGroup' : props.mold](h, props)
        ])
      )
    )
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
