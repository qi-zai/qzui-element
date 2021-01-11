import TinyEditor from './src/tiny-editor.vue'

TinyEditor.install = function(Vue) {
  Vue.component(TinyEditor.name, TinyEditor)
}

export default TinyEditor
