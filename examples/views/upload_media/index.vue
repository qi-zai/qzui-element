<template>
  <div>
    <BoxCard title="示例">
      <UploadMedia v-model="data" size="60px" multiple />

      <PreCode path="upload_media/m_01/code" />
    </BoxCard>
  </div>
</template>

<script>
import M_01 from './m_01/mixin'

export default {
  mixins: [M_01]
}
</script>
