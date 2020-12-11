/* eslint-disable camelcase */

export const codes00_html = `<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/qzui/lib/qzui.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/qzui/lib/qzui.common.js"></script>
`

export const codes01_sh = 'npm i qzui -S'

export const codes02_js = `import Vue from 'vue'
import qzui, { fetchMoldValues } from 'qzui'
import 'qzui/lib/qzui.css'
import App from './App.vue'

Vue.use(qzui)

new Vue({
  el: '#app',
  render: h => h(App)
})
`

export const codes03_js = `import Vue from 'vue'
import 'qzui/lib/qzui.css'
import App from './App.vue'

import {
  DataTable,
  FormLayout
  // ...
} from 'qzui'

Vue.use(DataTable)
Vue.use(FormLayout)

// or
// Vue.component(DataTable.name, DataTable)
// Vue.component(FormLayout.name, FormLayout)

new Vue({
  el: '#app',
  render: h => h(App)
})
`
