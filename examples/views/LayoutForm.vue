<template>
  <div>
    <h1>普通布局</h1>
    <LayoutForm ref="formRef" :molds="molds" :rules="rules" label-width="100px" />

    <div style="text-align: center;"><el-button type="primary" @click="check">检查</el-button></div>
  </div>
</template>

<script>
import LayoutForm from '~/form-layout'

export default {
  components: { LayoutForm },

  data() {
    return {
      molds: [
        { label: '专栏标题', key: 'title', mold: 'input' },
        { label: '作者', key: 'author', mold: 'input' },
        { label: '创建方式', key: 'createMode.key', prop: true, dict: 'CREATE_MODE', mold: 'select', options: null },
        { label: '来源', key: 'excerpt', mold: 'input' },
        { label: '显示状态', key: 'status.key', options: null, dict: 'DISPLAY_STATUS', mold: 'select' },
        { label: '作者', key: 'author', mold: 'input', class: 'qzui-textarea', type: 'textarea' }
      ],

      rules: {
        createMode_key: [{ required: true, message: '请选择' }]
      }
    }
  },

  mounted() {
    this.molds[3].options = { '1': '爬虫', '2': '录入' }
  },

  methods: {
    check() {
      this.$refs.formRef.getValues((data) => {
        // eslint-disable-next-line no-console
        console.log('success', data)
      })
    }
  }
}
</script>

<style lang="scss">
.el-form--inline .qzui-textarea {
  width: 95%;
  display: block;

  .el-form-item__content {
    width: 90%;
  }
}
</style>
