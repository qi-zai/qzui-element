<script>
import { fetchMoldValues } from '~/utils/tools'

export default {
  name: 'FilterLayout',

  props: {
    filters: { type: Array, default: () => [] },
    size: { type: String, default: null },
    labelWidth: { type: String, default: null },
    columnSpan: { type: Number, default: null },
    gutter: { type: Number, default: null }
  },

  data() {
    return {
      comps: Object.freeze({
        input: (h, props) =>
          h('el-input', {
            attrs: { placeholder: '请输入...', size: this.size, ...props },
            on: { ...props.on, input: (event) => (props.value = event) }
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
            style: props.style,
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
          h(props.component, { attrs: { size: this.size, ...props }, on: { input: (event) => (props.value = event) } })
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

    /**
     * 获取 mold 数据
     *
     * @param {object} { origin: 数据源, key: 取值的key }
     */
    getValues(options) {
      return fetchMoldValues(this.filters, options)
    },

    reset() {
      for (let i = 0, item; (item = this.filters[i]); i++) {
        if (!item.mold || item.mold.includes('button')) continue
        item.value = ''
      }
    },

    fetchLayout(h) {
      const childs = []
      for (const props of this.filters) {
        if (props.display === false) continue
        childs.push(this.fetchItem(h, props))
      }
      return h(
        'el-form',
        { class: 'qzui-filter-layout', attrs: { size: this.size, inline: true, labelWidth: this.labelWidth } },
        childs
      )
    },

    fetchItem(h, props) {
      return h(
        'el-form-item',
        { class: { not__empty__label: props.label && props.label.trim() }, props: { label: props.label, prop: props.key } },
        [this.comps[props.mold](h, props)]
      )
    }
  },

  render(h) {
    return this.fetchLayout(h)
  }
}
</script>
