export default {
  created() {
    this.molds_03 = [{ label: '专栏标题', key: 'title', value: '' }]

    this.rules_03 = {
      title: [{ required: true, message: '请输入专栏标题' }]
    }
  },

  methods: {
    check_03() {
      // eslint-disable-next-line no-console
      this.$refs.formRef_03.validate(console.log)
    }
  }
}
