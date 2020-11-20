// ***************** script *****************
import prototype from './utils/prototype'
import { fetchMoldValues } from './utils/tools'

// ***************** 组件 *****************
import DataTable from './data-table'
import FilterLayout from './filter-layout'
import FormLayout from './form-layout'
import UploadMedia from './upload-media'

const components = [DataTable, FilterLayout, UploadMedia, FormLayout]

const install = function(Vue, { prototype = true }) {
  if (install.installed) return
  for (const component of components) {
    Vue.use(component)
  }
  if (prototype) prototype()
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  DataTable,
  FilterLayout,
  UploadMedia,
  FormLayout
}

export { prototype, fetchMoldValues, DataTable, FilterLayout, FormLayout, UploadMedia }
