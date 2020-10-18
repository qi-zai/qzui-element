import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/data-table', component: () => import(/* webpackChunkName: "about" */ '../views/DataTable.vue') }
  ]
})

export default router
