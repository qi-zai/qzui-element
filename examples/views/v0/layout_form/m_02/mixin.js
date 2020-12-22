export default {
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
