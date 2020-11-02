import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/upload-media', component: () => import(/* webpackChunkName: "UploadMedia" */ '../views/UploadMedia.vue') },
    { path: '/layout-filter', component: () => import(/* webpackChunkName: "LayoutFilter" */ '../views/LayoutFilter.vue') },
    { path: '/data-table', component: () => import(/* webpackChunkName: "DataTable" */ '../views/DataTable.vue') }
  ]
})

export default router
