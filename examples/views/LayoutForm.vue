<template>
  <div>
    <h1>Form表单布局</h1>
    <FormLayout ref="formRef" :molds="molds" inline :rules="rules" label-width="100px">
      <template v-slot:test="props">
        <el-input v-model="props.model.test" placeholder="请输入..." />
        <span>{{ props }}</span>
      </template>
    </FormLayout>

    <FormLayout ref="formRef2" :molds="molds2" inline readonly label-width="100px">
      <template v-slot:readonly-slot="{ cell, model }">
        <span>{{ cell._prop.fetchValue(model) }}</span>
      </template>
    </FormLayout>

    <div style="text-align: center;">
      <el-button type="primary" @click="setEmpty">重置</el-button>
      <el-button type="primary" @click="clearValidate">清空验证</el-button>
      <el-button type="primary" @click="setValues">设置值</el-button>
      <el-button type="primary" @click="setDate">设日期值</el-button>
      <el-button type="primary" @click="check">检查</el-button>
    </div>
  </div>
</template>

<script>
import FormLayout from '~/form-layout'

export default {
  components: { FormLayout },

  data() {
    return {
      molds: [
        { label: '专栏标题', key: 'title', mold: 'input', value: 'aaaaa' },
        { label: '作者', key: 'author', mold: 'input', value: 'qizaicc' },
        { label: '创建方式', key: 'createMode.key', dict: 'CREATE_MODE', mold: 'select', options: null },
        { label: 'cascader', key: 'cascader3', mold: 'cascader', options: null },
        { label: '来源', key: 'excerpt', mold: 'input' },
        { label: '显示状态', key: 'status.key', options: null, dict: 'DISPLAY_STATUS', mold: 'select' },
        { label: '作者', key: 'authortextarea', mold: 'input', class: 'qzui-textarea', type: 'textarea' },
        { label: '日期', key: 'startTime,endTime', mold: 'date', type: 'daterange' },
        { label: '其他', key: 'test' }
      ],

      rules: {
        createMode_key: [{ required: true, message: '请选择' }],
        startTime_endTime: [
          {
            required: true,
            validator: (rule, value, cb) => cb(value && value.find((v) => v) ? undefined : new Error('请选择'))
          }
        ],
        test: [{ required: true, message: '请输入' }]
      },

      molds2: [
        { label: '专栏标题', key: 'title', mold: 'input', value: 'aaaaa' },
        { label: '作者', key: 'author', mold: 'input', value: 'qizaicc' },
        { label: '创建方式', key: 'createMode.key', dict: 'CREATE_MODE', mold: 'select', options: null },
        { label: 'cascader', key: 'cascader3', mold: 'cascader', options: null },
        { label: '来源', key: 'excerpt', mold: 'input' },
        { label: '显示状态', key: 'status.key', options: null, dict: 'DISPLAY_STATUS', mold: 'select' },
        { label: '作者', key: 'authortextarea', mold: 'input', class: 'qzui-textarea', type: 'textarea' },
        { label: '日期', key: 'date,date2', mold: 'date', type: 'daterange' },
        { label: '其他', key: 'test' }
      ]
    }
  },

  mounted() {
    this.molds[2].options = { '1': '爬虫', '2': '录入' }
    this.molds[3].options = [
      {
        value: 'zhinan',
        label: '指南',
        children: [{ value: 'shejiyuanze', label: '设计原则', children: [{ value: 'yizhi', label: '一致' }] }]
      }
    ]
  },

  methods: {
    clearValidate() {
      this.$refs.formRef.clearValidate()
    },

    setEmpty() {
      this.$refs.formRef.setValues()
    },

    setValues() {
      this.$refs.formRef.setValues({
        title: '你要被覆盖了，哈哈哈',
        cascader1: 'zhinan',
        cascader2: 'shejiyuanze',
        cascader3: 'yizhi'
      })
    },

    setDate() {
      this.$refs.formRef.setValue('date,date2', ['2020-11-11', '2020-11-12']).setValue('createMode.key', '============')
    },

    check() {
      this.$refs.formRef.validate((data) => {
        // eslint-disable-next-line no-console
        console.log('success', data)
      })
    }
  }
}
</script>
