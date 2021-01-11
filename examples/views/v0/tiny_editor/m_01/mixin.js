export default {
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
  }
}
