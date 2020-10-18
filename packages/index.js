import DataTable from './data-table'

const components = [DataTable]

const install = function(Vue) {
  if (install.installed) return
  for (let i = 0, component; (component = components[i]); ) {
    Vue.use(component)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  DataTable
}

export { DataTable }
