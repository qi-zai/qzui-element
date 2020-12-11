export const html = `<FilterLayout ref="filters" :filters="filters" label-width="80px" />

<!-- CustomComponent -->
<template>
  <el-cascader v-bind="attrs" />
</template>
<script>
let id = 0

export default {
  name: 'Custom',

  computed: {
    attrs() {
      return { ...this.$attrs, props: this.props }
    }
  },

  created() {
    this.props = {
      lazy: true,
      lazyLoad(node, resolve) {
        const { level } = node
        setTimeout(() => {
          const nodes = Array.from({ length: level + 1 }).map((item) => ({
            value: ++id,
            label: '选项' + id,
            leaf: level >= 2
          }))
          // 通过调用resolve将子节点数据返回，通知组件数据加载完成
          resolve(nodes)
        }, 1000)
      }
    }
  }
}
</script>

`

export const js = `import CustomComponent from '@/components/Custom'

export default {
  data() {
    return {
      filters: [
        { key: 'filter_input', mold: 'input', label: '输入', value: '', on: { focus: this.inputFocus } },
        { key: 'date1,date2', label: '日期', mold: 'date', type: 'daterange', value: ['2020-08-08', '2020-08-30'] },
        {
          key: 'select1.select2',
          mold: 'select',
          label: '下拉框',
          value: 'value1',
          props: { value: 'id', label: 'name' },
          options: []
        },
        {
          key: 'filter_select',
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
    inputFocus() {
      console.log('inputFocus')
    },

    clickHandle() {
      console.log('你的点击我以收到')
    },

    fetchData() {
      const data = this.$refs.filters.getValues()
      alert(JSON.stringify(data, '', 2))
    },

    reset() {
      this.$refs.filters.reset()
    }
  }
}

`
