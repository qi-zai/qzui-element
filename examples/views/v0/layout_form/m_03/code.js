export const html = `<FormLayout ref="formRef_03" :molds="molds_03" :rules="rules_03" label-width="100px" inline custom>
  <template v-slot="prop">
    <span>{{ prop }}</span>
  </template>
</FormLayout>`

export const js = `export default {
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

`
