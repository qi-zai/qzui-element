<template>
  <div>
    <FilterLayout ref="filters" :filters="filters" />
  </div>
</template>

<script>
import Custom from '@/components/Custom'
import FilterLayout from '~/filter-layout'

export default {
  components: { FilterLayout },

  data() {
    return {
      filters: [
        { key: 'filter_input', mold: 'input', label: '输入', value: '' },
        {
          key: 'filter_select',
          mold: 'select',
          label: '一个下拉框',
          value: 'value1',
          props: { value: 'id', label: 'name' },
          options: []
        },
        {
          key: 'filter_select2222222',
          mold: 'select',
          label: '一个下拉框',
          value: 'value2',
          props: { value: 'id', label: 'name' },
          options: { value1: '值1', value2: '值2' }
        },
        { key: 'filter_date', label: '日期', mold: 'date', type: 'monthrange', value: '' },

        {
          key: 'cascader',
          mold: 'cascader',
          value: ['100', '100100'],
          clearable: true,
          options: [{ value: '100', label: '100', children: [{ value: '100100', label: '100100' }] }]
        },

        { key: 'custom', mold: 'custom', value: [1, 2, 4], label: '自定义', custom: () => Custom },
        { mold: 'button', value: '取filters中的值', type: 'primary', icon: 'el-icon-edit', click: this.fetchData },
        { mold: 'button', value: '查询中', type: 'primary', loading: true, plain: false, click: this.fetchData },
        [
          { mold: 'button', type: 'primary', value: '搜索', plain: false, round: true, click: this.clickHandle },
          { mold: 'button', type: 'warning', value: '重置', plain: false, round: true, click: this.clickHandle }
        ],
        {
          mold: 'dropdown',
          button: { value: '更多操作', type: 'primary', plain: true },
          options: ['删除', '添加'],
          optionClick: this.optionClick
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

    /**
     * 获取 filters 中的 用户输入的值
     */
    fetchData() {
      const data = this.$refs.filters.getValues()
      alert(JSON.stringify(data, '', 2))
    },

    optionClick(index, label) {
      alert(`你点击了【${label}】按钮，options中的索引为：${index}`)
    }
  }
}
</script>
