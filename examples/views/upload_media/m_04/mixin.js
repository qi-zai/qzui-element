export default {
  data() {
    return {
      file_0401: []
    }
  },

  methods: {
    upload_04(file, cb) {
      setTimeout(() => {
        // cb({ name: file.name, link: 'http://xxx.jpg', download: '' })
        cb(file)
      }, 3000)
    }
  }
}
