import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/data-table', component: () => import(/* webpackChunkName: "DataTable" */ '../views/DataTable.vue') },
    { path: '/layout-filter', component: () => import(/* webpackChunkName: "LayoutFilter" */ '../views/LayoutFilter.vue') }
  ]
})

export default router
