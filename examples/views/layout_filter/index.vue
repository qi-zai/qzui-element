<template>
  <BoxCard title="示例">
    <FilterLayout ref="filters" :filters="filters" label-width="80px" />

    <PreCode path="layout_filter/code" />
  </BoxCard>
</template>

<script>
import CustomComponent from '@/components/Custom'

export default {
  data() {
    return {
      filters: [
        { key: 'filter_input', mold: 'input', label: '输入', value: '' },
        { key: 'filter_date', label: '日期', mold: 'date', type: 'daterange', value: '' },
        {
          key: 'filter_select',
          mold: 'select',
          label: '下拉框',
          value: 'value1',
          props: { value: 'id', label: 'name' },
          options: []
        },
        {
          key: 'filter_select2',
          mold: 'select',
          label: '下拉框',
          value: 'value2',
          props: { value: 'id', label: 'name' },
          options: { value1: '值1', value2: '值2' }
        },
        {
          key: 'cascader',
          mold: 'cascader',
          label: '级联框',
          value: ['100', '100100'],
          clearable: true,
          options: [{ value: '100', label: '100', children: [{ value: '100100', label: '100100' }] }]
        },
        { key: 'custom', mold: 'custom', value: [1, 2, 4], label: '自定义', component: CustomComponent },
        { mold: 'button', label: ' ', value: '取filters中的值', type: 'primary', icon: 'el-icon-edit', click: this.fetchData },
        { mold: 'button', value: '查询中', type: 'primary', loading: true, plain: false, click: this.fetchData },
        {
          mold: 'dropdown',
          button: { value: '更多操作', type: 'primary', plain: true },
          options: ['删除', '添加'],
          optionClick: this.optionClick
        },
        {
          mold: 'buttonGroup',
          buttons: [
            { mold: 'button', type: 'primary', value: '搜索', plain: false, round: true },
            { mold: 'button', type: 'primary', value: '重置', plain: false, round: true, click: this.reset }
          ]
        }
      ]
    }
  },

  mounted() {
    this.filters[1].options = [
      { id: 'value1', name: 'label1', disabled: true },
      { id: 'value2', name: 'label2' },
      { id: 'value3', name: 'label3' }
    ]
  },

  methods: {
    clickHandle() {
      alert('你的点击我以收到')
    },

    fetchData() {
      const data = this.$refs.filters.getValues()
      alert(JSON.stringify(data, '', 2))
    },

    optionClick(index, label) {
      alert(`你点击了【${label}】按钮，options中的索引为：${index}`)
    },

    reset() {
      this.$refs.filters.reset()
    }
  }
}
</script>
