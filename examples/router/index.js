import Home from '../views/Home.vue'

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },

    {
      path: '/upload-media',
      meta: { title: '上传文件' },
      component: () => import(/* webpackChunkName: "views/upload_media" */ '../views/upload_media')
    },

    {
      path: '/layout-filter',
      meta: { title: '数据筛选器' },
      component: () => import(/* webpackChunkName: "views/layout_filter" */ '../views/layout_filter')
    },

    {
      path: '/data-table',
      meta: { title: '数据表格' },
      component: () => import(/* webpackChunkName: "views/data_table" */ '../views/data_table')
    },

    {
      path: '/layout-form',
      meta: { title: 'Form 表单' },
      component: () => import(/* webpackChunkName: "views/layout_form" */ '../views/layout_form')
    }
  ]
})

export default router
