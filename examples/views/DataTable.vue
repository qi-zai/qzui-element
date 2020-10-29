<template>
  <div class="app-container">
    <h2>数据表格</h2>

    <el-button type="primary" @click="getTableRef">获取表格的 ref 实例</el-button>
    <br /><br />

    <data-table
      ref="table"
      :column="column"
      :data="list"
      :height="300"
      :page-info="pageInfo"
      column-width="180"
      :events="{ 'cell-click': cellClick, 'row-click': rowClick }"
      @page-change="pageChange"
    />
  </div>
</template>

<script>
/* eslint-disable no-console */
import DataTable from '~/data-table/src/data-table'

export default {
  components: { DataTable },

  data() {
    return {
      // 分页信息
      pageInfo: { currentPage: 1, pageSize: 10, total: 37 },

      column: [
        { type: 'selection', width: '55' },
        { type: 'index', width: '55', fixed: true },
        {
          prop: 'date',
          label: '日期',
          filters: [{ text: '2016-05-2', value: '2016-05-2' }],
          filterMethod: (value, row, column) => value === row.date,
          sortable: true
        },
        { prop: 'name', label: '名称' },
        {
          prop: 'address',
          label: '地址',
          labelCallback: ({ row }) => `${row.name}：的地址为【${row.address}】`,
          width: '315px',
          fixed: true
        },
        { prop: 'address', label: '地址' },
        { prop: 'address', label: '地址' },
        { prop: 'label.name', label: 'label' },
        {
          prop: 'tag',
          label: '标签',
          tag: ({ row }) => (row.tag === '家' ? 'success' : 'primary')
        },
        {
          label: '操作',
          width: '380px',
          actions: this.actions
        }
      ],

      list: []
    }
  },

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
          enable: i % 3,
          label: { key: 0, name: '你好' },
          address: '上海市普陀区金沙江路 ' + i + ' 弄',
          tag: '国家'[i % 2]
        })
      }
      this.list = list
    },

    actions(props) {
      return [
        { icon: 'el-icon-edit', type: props.row.enable ? 'danger' : 'primary', label: '编辑', click: this.tableAction },
        { icon: 'el-icon-edit', label: 'test', click: this.test },
        { icon: 'el-icon-edit', label: '编辑', click: this.tableAction },
        { icon: 'el-icon-edit', label: '编辑', click: this.tableAction },
        { icon: 'el-icon-edit', label: '编辑', click: this.tableAction }
      ]
    },

    test(props) {
      console.log('=======', props)
    },

    pageChange({ currentPage, pageSize }) {
      console.log(currentPage, pageSize)
    },

    tableAction({ row }) {
      row.enable = 0
      row.tag = '家'
    },

    getTableRef() {
      console.log(this.$refs.table.getTableRef())
    },

    cellClick(row, column, cell, event) {
      console.log(row, column, cell, event)
    },

    rowClick(row, column, event) {
      console.log(row, column, event)
    }
  }
}
</script>
