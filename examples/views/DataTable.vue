<template>
  <div class="app-container" style="text-align: center;">
    <h2>数据表格</h2>
    <data-table :column="column" :data="list" :height="300" column-width="180" @click-action="tableAction" />
  </div>
</template>

<script>
import DataTable from '~/data-table/src/data-table'

export default {
  components: { DataTable },

  data: () => ({
    column: [
      { type: 'selection', width: '55' },
      {
        prop: 'date',
        label: '日期',
        filters: [{ text: '2016-05-2', value: '2016-05-2' }],
        filterMethod: (value, row, column) => value === row.date,
        sortable: true
      },
      { prop: 'name', label: '名称', fixed: true },
      { prop: 'address', label: '地址' },
      { prop: 'address', label: '地址' },
      { prop: 'address', label: '地址' },
      { prop: 'address', label: '地址' },
      { prop: 'address', label: '地址' },
      { prop: 'address', label: '地址' },
      { prop: 'address', label: '地址' },
      { prop: 'address', label: '地址' },
      { prop: 'address', label: '地址' },
      { prop: 'address', label: '地址' },
      { prop: 'tag', label: '标签', tag: ({ row }) => (row.tag === '家' ? 'success' : 'primary') },
      { label: '操作', actions: [{ icon: 'el-icon-edit', label: '编辑' }] }
    ],

    list: []
  }),

  mounted() {
    this.fetch()
  },

  methods: {
    fetch() {
      const list = []
      for (let i = 30; i--; ) {
        list.push({
          id: i,
          date: '2016-05-' + i,
          name: '王小虎' + i,
          address: '上海市普陀区金沙江路 ' + i + ' 弄',
          tag: '国家'[i % 2]
        })
      }
      this.list = Object.freeze(list)
    },

    tableAction({ row }, props) {
      // eslint-disable-next-line no-console
      console.log(row, props)
    }
  }
}
</script>
