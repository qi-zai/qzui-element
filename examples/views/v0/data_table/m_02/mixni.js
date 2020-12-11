export default {
  data() {
    return {
      data_02: null,

      pageInfo_02: { currentPage: 1, pageSize: 10, total: 37 },

      column_02: Object.freeze([
        { type: 'index' },
        { prop: 'name', label: '名称' },
        { prop: 'label.name', label: 'label' },
        { prop: 'address', label: '地址', width: 300, labelCallback: ({ row }) => row.name + '：的地址为【' + row.address },
        { prop: 'tag', label: '标签', tag: ({ row }) => (row.tag === '家' ? 'success' : 'primary') }
      ])
    }
  },

  mounted() {
    this.data_02 = this.fetch()
  },

  methods: {
    pageChange_02({ currentPage, pageSize }) {
      // To Do ...
    }
  }
}
