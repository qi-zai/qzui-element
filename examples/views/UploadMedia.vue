<template>
  <div>
    <UploadMedia v-model="list" size="60px" multiple />
  </div>
</template>

<script>
import UploadMedia from '~/upload-media'

export default {
  components: { UploadMedia },

  data: () => ({
    list: ''
  })
}
</script>
