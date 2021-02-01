import './styles/index.scss'

// ***************** script *****************
import prototypeFn from './utils/prototype'
import { fillArray, uuid, fetchMoldValues } from './utils/tools'

// ***************** 组件 *****************
import DataTable from './components/data-table'
import FilterLayout from './components/filter-layout'
import FormLayout from './components/form-layout'
import UploadMedia from './components/upload-media'
import TinyEditor from './components/tiny-editor'

const components = [DataTable, FilterLayout, UploadMedia, FormLayout, TinyEditor]

const install = function(Vue) {
  if (install.installed) return
  for (const component of components) {
    Vue.use(component)
  }
}

/* istanbul ignore if */
if (typeof window !== 'undefined') {
  prototypeFn()
  window.Vue && install(window.Vue)
}

export default {
  install,
  DataTable,
  FilterLayout,
  UploadMedia,
  FormLayout,
  TinyEditor
}

export { fillArray, uuid, fetchMoldValues, DataTable, FilterLayout, FormLayout, UploadMedia, TinyEditor }
