import Home from '@/views/v0/Home'

export default [
  { path: '/', component: Home },
  {
    path: '/upload-media',
    meta: { title: '上传文件' },
    component: () => import(/* webpackChunkName: "v0/upload_media" */ '@/views/v0/upload_media')
  },

  {
    path: '/layout-filter',
    meta: { title: '数据筛选器' },
    component: () => import(/* webpackChunkName: "v0/layout_filter" */ '@/views/v0/layout_filter')
  },

  {
    path: '/data-table',
    meta: { title: '数据表格' },
    component: () => import(/* webpackChunkName: "v0/data_table" */ '@/views/v0/data_table')
  },

  {
    path: '/layout-form',
    meta: { title: 'Form 表单' },
    component: () => import(/* webpackChunkName: "v0/layout_form" */ '@/views/v0/layout_form')
  }
]
