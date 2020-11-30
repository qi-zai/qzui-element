import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../lib/qzui.css'
import qzui from '../lib/qzui.common.js'
import App from './App.vue'
import router from './router'

Vue.use(qzui)

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small' })

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
