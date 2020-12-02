export const html = `<data-table :column="column_04" :data="data_04" :max-height="300" />

<!-- TableExpandCustom.vue -->
<template>
  <div>
    <h5>{{ parentRow.row }}</h5>
    <img src="favicon.ico" width="30" />
  </div>
</template>

<script>
export default {
  props: {
    parentRow: { type: Object, default: null }
  }
}
</script>

<!-- TableExpand.vue -->
<template>
  <div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dolore voluptates, modi odio alias, suscipit ad, architecto
    voluptatibus hic unde dolorum distinctio eveniet! A repellat exercitationem eaque vel? Doloremque numquam sapiente deleniti
    dolorum praesentium sit sed pariatur molestiae corporis adipisci obcaecati provident minima vel ut eius cum dolores maiores,
    aliquid, beatae explicabo incidunt quaerat! Aspernatur veniam molestias voluptatem eligendi dignissimos hic nostrum autem eius
    quia maiores nisi cum quos illo sint, pariatur consequuntur veritatis. Voluptatibus sapiente tempora quisquam sed et!
  </div>
</template>

`

export const js = `import TableExpand from './TableExpand'
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

`
