import BoxCard from '@/components/BoxCard'
import PreCode from '@/components/PreCode'
import Docs from '@/components/Docs'

import App from './App.vue'
import router from './router'

import '@/assets/scss/index.scss'

Vue.component('BoxCard', BoxCard)
Vue.component('PreCode', PreCode)
Vue.component('Docs', Docs)

Vue.use(hljs.vuePlugin)

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 300 }
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
