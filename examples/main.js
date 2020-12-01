import Vue from 'vue'
import ElementUI from 'element-ui'
import PreCode from '@/components/PreCode'
import qzui from '../lib/qzui.common.js'
import hljs from './hljs'

import App from './App.vue'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'
import '../lib/qzui.css'
import '@/assets/scss/index.scss'

Vue.use(qzui)
Vue.component('PreCode', PreCode)
Vue.use(hljs.vuePlugin)

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small' })

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
