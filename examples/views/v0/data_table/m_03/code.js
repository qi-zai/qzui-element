export const html = `<data-table :column="column_03" :data="data_03" :max-height="300">
  <template v-slot:date="{ row }">
    <img src="favicon.ico" width="30" />
    <div>{{ row.date }}</div>
  </template>
</data-table>`

export const js = `export default {
  data() {
    return {
      data_03: null,

      column_03: Object.freeze([
        { type: 'index' },
        { prop: 'name', label: '名称' },
        { prop: 'date', label: '插槽 - 日期' },
        { prop: 'tag', label: '标签', tag: ({ row }) => (row.tag === '家' ? 'success' : 'primary') }
      ])
    }
  },

  mounted() {
    this.data_03 = this.fetch()
  }
}
`
