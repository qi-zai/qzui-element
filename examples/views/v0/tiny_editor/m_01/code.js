export const html = `<TinyEditor v-model="editor_01" :setting="setting_01" />
<div class="code_view">{{ editor_01 }}</div>
`

export const js = `export default {
  data() {
    return { editor_01: '欢迎使用 QZUI' }
  },

  created() {
    this.setting_01 = {
      code_dialog_height: 350,
      code_dialog_width: 800,
      toolbar:
        'undo redo | outdent indent | bold italic underline strikethrough | alignleft aligncenter alignright | forecolor backcolor | blockquote removeformat subscript superscript | searchreplace code media',
      plugins: 'code searchreplace media'
    }
  },

  beforeDestroy() {
    this.$refs.editor_01.destroy()
  }
}

`
