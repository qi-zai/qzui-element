<script>
import { fetchMoldValues } from '../../../utils/tools'
const replaceKey = '_'

export default {
  name: 'FormLayout',

  props: {
    fetchKey: { type: String, default: '_prop' },
    molds: { type: Array, default: () => [] },
    rules: { type: Object, default: () => ({}) },
    custom: Boolean
  },

  data() {
    const model = this.handleFormItem(this.molds)
    return {
      form_list: this.molds,
      model,

      comps: Object.freeze({
        input: (h, mold) =>
          h('el-input', {
            attrs: { placeholder: '请输入...', ...mold, value: model[mold[this.fetchKey]] },
            on: { ...mold.on, input: (event) => (model[mold[this.fetchKey]] = event) }
          }),

        select: (h, mold) => {
          const childs = []
          if (mold.options) {
            for (const k in mold.options) {
              childs.push(
                h('el-option', {
                  props: {
                    value: mold.options[k][mold.props?.value || 'value'] || k,
                    label: mold.options[k][mold.props?.label || 'label'] || mold.options[k],
                    disabled: mold.options[k].disabled
                  }
                })
              )
            }
          }
          return h(
            'el-select',
            {
              attrs: { placeholder: '请选择...', ...mold, value: model[mold[this.fetchKey]] },
              on: { ...mold.on, input: (event) => (model[mold[this.fetchKey]] = event) }
            },
            childs
          )
        },

        cascader: (h, mold) =>
          h('el-cascader', {
            props: { placeholder: '请选择...', ...mold, value: model[mold[this.fetchKey]] },
            on: { ...mold.on, input: (event) => (model[mold[this.fetchKey]] = event) }
          }),

        date: (h, mold) =>
          h('el-date-picker', {
            style: mold.style,
            attrs: {
              type: 'date',
              placeholder: '选择日期',
              'range-separator': '',
              'start-placeholder': '开始日期',
              'end-placeholder': '结束日期',
              valueFormat: this.dateValueFormat(mold.type),
              ...mold,
              value: model[mold[this.fetchKey]]
            },
            on: {
              ...mold.on,
              input: (event) => (model[mold[this.fetchKey]] = event)
            }
          })
      })
    }
  },

  computed: {
    elFormRef() {
      return this.$refs.formRef
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

    setValue(key, value) {
      if (value) {
        const item = this.form_list.find((v) => key === v.key)
        if (item) this.model[item[this.fetchKey]] = value

        this.clearValidate()
      }
      return this
    },

    setValues(data = {}) {
      for (const v of this.form_list) {
        if (!v.key) continue

        if (v.key.includes(',')) {
          this.model[v.key.replace(/,/g, replaceKey)] = v.key.split(',').map((k) => data[k] || '')
        } else {
          this.model[v._prop] = v.key.fetchValue(data)
        }
      }

      this.clearValidate()
    },

    clearValidate() {
      this.$nextTick(this.$refs.formRef.clearValidate)
    },

    validate(cb) {
      this.$refs.formRef.validate((valid) => {
        if (valid) cb(fetchMoldValues(this.molds, { origin: this.model, key: '_prop' }))
        else return false
      })
    },

    handleFormItem(list) {
      const model = {}
      for (const v of list) {
        if (v.key) {
          const _prop = v.key.replace(/\.|,/g, replaceKey)
          if (this.rules[_prop]) v.prop = _prop
          v._prop = _prop
          model[_prop] = v.value
        }
      }
      return model
    },

    fetchSlot(h, props) {
      let childs = null
      if (this.custom) {
        childs = this.$scopedSlots.default({ cell: props, model: this.model })
      } else {
        const key = props.slot_key || props.key
        if (key && this.$scopedSlots[key]) {
          childs = this.$scopedSlots[key]({ cell: props, model: this.model })
        } else {
          if (!props.mold) throw new Error(`The mold attribute was not found on ${JSON.stringify(props)}`)
          childs = [this.comps[props.mold](h, props)]
        }
      }
      return h('el-form-item', { props, class: props.class }, childs)
    }
  },

  render(h) {
    return h(
      'el-form',
      {
        ref: 'formRef',
        class: ['qzui-form-layout', this.$attrs.class],
        props: { ...this.$attrs, rules: this.custom ? undefined : this.rules, model: this.model }
      },
      this.molds.map((props) => this.fetchSlot(h, props))
    )
  }
}
</script>
