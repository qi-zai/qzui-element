export const html = `<UploadMedia v-model="file01" />
<UploadMedia v-model="file02" type="image" accept="image/jpeg, image/gif, image/png" />
<UploadMedia v-model="file03" type="video" accept="video/mp4" />
`

export const js = `export default {
  data() {
    return {
      file01: [],
      file02: [],
      file03: []
    }
  }
}
`
