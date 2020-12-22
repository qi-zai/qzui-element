export const html = `<FormLayout ref="formRef_02" :molds="molds_02" inline :rules="rules_02" label-width="100px">
  <template v-slot:title="prop">
    <el-input v-model="prop.model.title" />
  </template>
  <template v-slot:text="prop">
    <el-input v-model="prop.model.text" />
    <div>{{ prop }}</div>
  </template>
</FormLayout>`

export const js = `export default {
  created() {
    this.molds_02 = [
      { label: '标题', key: 'title', value: 'qzui' },
      { label: '文本', key: 'text', slot_key: 'text', value: 'qzui-text' }
    ]

    this.rules_02 = {
      title: [{ required: true, message: '请输入专栏标题' }],
      text: [{ required: true, message: '请输入专栏标题' }]
    }
  },

  methods: {
    check_02() {
      // eslint-disable-next-line no-console
      this.$refs.formRef_02.validate(console.log)
    }
  }
}

`
