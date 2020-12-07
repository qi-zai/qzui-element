/* eslint-disable no-console */
export default {
  data() {
    const filters = [{ text: '2020-05-02', value: '2020-05-02' }]
    return {
      data_01: null,

      column_01: Object.freeze([
        { type: 'selection' },
        { type: 'index' },
        { prop: 'date', label: '日期', filters, filterMethod: (value, row, column) => value === row.date },
        { prop: 'name', label: '名称', sortable: true },
        { prop: 'label.name', label: '作者' },
        { prop: 'address', label: '地址', width: 300, labelCallback: ({ row }) => row.name + ': 的地址是: ' + row.address },
        { prop: 'tag', label: '标签', tag: ({ row }) => (row.tag === '家' ? 'success' : 'primary') },
        { label: '操作', actions: this.actions_01 }
      ])
    }
  },

  mounted() {
    this.data_01 = this.fetch()
  },

  methods: {
    actions_01(props) {
      return [
        { icon: 'el-icon-edit', label: props.row.enable ? '启用' : '禁用', click: this.handleEnable_01 },
        { icon: 'el-icon-edit', label: '这是一个隐藏按钮', display: false }
      ]
    },

    handleEnable_01(prop) {
      // To Do ...
    },

    getSelect_01() {
      console.log(this.$refs.dataTable_01.selection)
    },

    getElTableRef_01() {
      console.log(this.$refs.dataTable_01.elTableRef)
    },

    selectAll() {
      alert('点击了全选')
    }
  }
}
