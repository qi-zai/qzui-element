<template>
  <textarea :id="selector" />
</template>

<script>
/* eslint-disable no-undef */

export default {
  name: 'TinyEditor',

  props: {
    value: { type: String, default: '' },
    setting: { type: Object, default: () => ({}) }
  },

  computed: {
    selector() {
      return (
        'qzui_tiny_editor_' +
        Math.random()
          .toString(16)
          .substr(2)
      )
    }
  },

  mounted() {
    if (tinymce) this.init(tinymce)
  },

  methods: {
    init(editor) {
      editor
        .init({
          selector: '#' + this.selector,
          language: 'zh_CN',
          statusbar: false,
          menubar: false,

          ...this.setting,

          setup: (editor) => this.$emit('setup', editor),
          init_instance_callback: (editor) => {
            editor.setContent(this.value)
            this.$emit('initCallback', editor)
            editor.on('nodechange input change', () => this.$emit('input', editor.getContent()))
          }
        })
        .then(([editor]) => (this.$editor = editor))
    },

    destroy() {
      tinymce.remove(this.$editor)
    }
  }
}
</script>
