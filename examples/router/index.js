import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },

    {
      path: '/upload-media',
      meta: { title: '上传文件' },
      component: () => import(/* webpackChunkName: "UploadMedia" */ '../views/UploadMedia.vue')
    },

    {
      path: '/layout-filter',
      meta: { title: '数据筛选器' },
      component: () => import(/* webpackChunkName: "LayoutFilter" */ '../views/LayoutFilter.vue')
    },

    {
      path: '/data-table',
      meta: { title: '数据表格' },
      component: () => import(/* webpackChunkName: "DataTable" */ '../views/DataTable.vue')
    },

    {
      path: '/layout-form',
      meta: { title: 'Form 表单' },
      component: () => import(/* webpackChunkName: "LayoutForm" */ '../views/LayoutForm.vue')
    }
  ]
})

export default router
