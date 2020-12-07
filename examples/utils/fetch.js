import axios from 'axios'
import { Notification, MessageBox } from 'element-ui'
import db from '@/utils/localstorage'
import { Base64 } from 'js-base64'

const MS = ['PUT', 'POST', 'PATCH']
const ERR_CODE = [40000, 40001, 40002, 40003, 40005, 40006, 40008]
const tomsg = (message, type = 'error') => Notification({ title: '操作异常', message, type, duration: 2000 })

const instance = axios.create({
  baseURL: process.env.VUE_APP_PROD_REQUEST_DOMAIN_PREFIX + process.env.VUE_APP_BASE_API,
  timeout: 20000
  // withCredentials: true // 允许cookie 跨域
})

instance.interceptors.request.use(
  (config) => {
    if (config.method === 'get') config.params = { ts: Date.now(), ...config.params }

    const token = db.get('TOKEN', '')
    if (token && config.headers['X-isToken'] !== false) config.headers.token = 'Bearer ' + token
    config.headers.tenant = db.get('TENANT', '')
    config.headers.Authorization = `Basic ${Base64.encode(
      `${process.env.VUE_APP_CLIENT_ID}:${process.env.VUE_APP_CLIENT_SECRET}`
    )}`
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (res) => {
    if (res.data.isError) {
      if (ERR_CODE.includes(res.data.code)) {
        MessageBox.alert(res.data.msg, '提醒', { confirmButtonText: '确定', callback: () => (window.location.hash = '/login') })
      } else {
        throw new Error(JSON.stringify(res.data.msg))
      }
    }
    return res
  },
  (error) => Promise.reject(error)
)

const handleFormatData = (data) => {
  if (!data) return

  const fm = new FormData()
  for (const k in data) fm.append(k, data[k])
  return fm
}

export default async (options) => {
  try {
    return await instance({
      ...options,
      [MS.includes(options.method) ? 'data' : 'params']: options.formData ? handleFormatData(options.data) : options.data
    })
  } catch (err) {
    if (err.code === 'ECONNABORTED') {
      tomsg('请求超时，请稍后再试！')
    } else if (err.response && err.response.data) {
      tomsg(err.response.data.msg)
    } else {
      tomsg(err.message)
    }
  }
}
