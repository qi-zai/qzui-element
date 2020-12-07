export const html = `<UploadMedia
  v-model="file_0401"
  type="image"
  accept="image/jpg"
  auto-upload
  multiple
  @on-upload="upload_04"
/>

`

export const js = `export default {
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

`
