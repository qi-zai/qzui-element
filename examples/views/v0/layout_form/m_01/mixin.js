export default {
  created() {
    this.molds_01 = [
      { label: '专栏标题', key: 'title', mold: 'input', value: 'qizaicc' },
      { label: '作者', key: 'author', mold: 'input', value: 'qizaicc' },
      { label: '创建方式', key: 'createMode.key', mold: 'select', options: null },
      { label: 'cascader', key: 'cascader3', mold: 'cascader', options: null },
      { label: '来源', key: 'excerpt', mold: 'input', display: false },
      { label: '显示状态', key: 'status.key', options: null, mold: 'select' },
      { label: '日期', key: 'date,date2', mold: 'date', type: 'daterange' },
      { label: '作者', key: 'authortextarea', mold: 'input', type: 'textarea', class: 'box-block' }
    ]

    this.rules_01 = {
      createMode_key: [{ required: true, message: '请选择' }],
      startTime_endTime: [
        {
          required: true,
          validator: (rule, value, cb) => cb(value && value.find((v) => v) ? undefined : new Error('请选择'))
        }
      ],
      test: [{ required: true, message: '请输入' }]
    }
  },

  mounted() {
    this.molds_01[2].options = { '1': '爬虫', '2': '录入' }
    this.molds_01[3].options = [
      {
        value: 'zhinan',
        label: '指南',
        children: [{ value: 'shejiyuanze', label: '设计原则', children: [{ value: 'yizhi', label: '一致' }] }]
      }
    ]
  },

  methods: {
    clearValidate_01() {
      this.$refs.formRef_01.clearValidate()
    },

    setEmpty_01() {
      this.$refs.formRef_01.setValues()
    },

    setValues_01() {
      this.$refs.formRef_01.setValues({
        title: '你要被覆盖了，哈哈哈',
        cascader1: 'zhinan',
        cascader2: 'shejiyuanze',
        cascader3: 'yizhi',
        date: '2020-11-11',
        date2: '2020-11-12'
      })
    },

    setDate_01() {
      this.$refs.formRef_01
        .setValue('date,date2', ['2020-11-11 18:24:33', '2020-11-12 18:24:33'])
        .setValue('createMode.key', '============')
    },

    check_01() {
      // eslint-disable-next-line no-console
      this.$refs.formRef_01.validate(console.log)
    }
  }
}
