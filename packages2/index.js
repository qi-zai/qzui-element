import './styles/index.scss'

// ***************** script *****************
import prototypeFn from './utils/prototype'
import { fetchMoldValues } from './utils/tools'

// ***************** 组件 *****************
import DataTable from './data-table'

const components = [DataTable]

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
  DataTable
}

export { prototypeFn, fetchMoldValues, DataTable }
