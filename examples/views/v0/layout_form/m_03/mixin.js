export default {
  data() {
    return {
      molds_03: Object.freeze([{ label: '专栏标题', key: 'title', value: '' }]),

      rules_03: Object.freeze({
        title: [{ required: true, message: '请输入专栏标题' }]
      })
    }
  },

  methods: {
    check_03() {
      this.$refs.formRef_03.validate((data) => {
        alert(JSON.stringify(data, null, 2))
      })
    }
  }
}
