import TableExpand from './TableExpand'
import TableExpandCustom from './TableExpandCustom'

export default {
  data() {
    return {
      data_04: null,

      column_04: Object.freeze([
        { type: 'expand', component: TableExpand },
        { prop: 'name', label: '名称', width: 88 },
        { type: 'custom', label: 'TableExpandCustom', component: TableExpandCustom }
      ])
    }
  },

  mounted() {
    this.data_04 = this.fetch()
  }
}
