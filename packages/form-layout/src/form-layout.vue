<script>
import { fetchMoldValues } from '~/utils/tools'
export default {
  name: 'FormLayout',

  props: {
    fetchKey: { type: String, default: '_prop' },
    molds: { type: Array, default: () => [] },
    rules: { type: Object, default: null }
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
            on: { input: (event) => (model[mold[this.fetchKey]] = event), ...mold.events }
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
              on: { input: (event) => (model[mold[this.fetchKey]] = event) }
            },
            childs
          )
        },

        cascader: (h, mold) =>
          h('el-cascader', {
            props: { placeholder: '请选择...', ...mold, value: model[mold[this.fetchKey]] },
            on: { input: (event) => (model[mold[this.fetchKey]] = event) }
          })
      })
    }
  },

  methods: {
    getFormRef() {
      return this.$refs.formRef
    },

    setValues(data) {
      for (const v of this.form_list) {
        if (v.key) this.model[v._prop] = v.key.fetchValue(data)
      }
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
          const _prop = v.key.replace('.', '_')
          if (v.prop) v.prop = _prop
          v._prop = _prop
          model[_prop] = v.value
        }
      }
      return model
    }
  },

  render(h) {
    return h(
      'el-form',
      {
        ref: 'formRef',
        class: ['qzui-form-layout', this.$attrs.class],
        props: { ...this.$props, ...this.$attrs, model: this.model }
      },
      this.molds.map((props) => h('el-form-item', { props, class: props.class }, [this.comps[props.mold](h, props)]))
    )
  }
}
</script>

<style lang="scss">
.qzui-form-layout {
  .el-form-item {
    width: 30%;
  }

  .el-form-item__content {
    width: 230px;

    .el-select {
      width: 100%;
    }
  }
}
</style>
