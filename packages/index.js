import DataTable from './data-table'
import FilterLayout from './filter-layout'
import UploadMedia from './upload-media'

const components = [DataTable, FilterLayout, UploadMedia]

const install = function(Vue) {
  if (install.installed) return
  for (let i = 0, component; (component = components[i]); ) {
    Vue.use(component)
  }
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  DataTable,
  FilterLayout,
  UploadMedia
}

export { DataTable, FilterLayout, UploadMedia }
