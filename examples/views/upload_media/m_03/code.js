export const html = `<UploadMedia v-model="file_0301" type="slot" accept="image/jpeg, image/gif, image/png" multiple>
  <template v-slot="{ item }">
    <div style="padding: 10px;">
      <img :src="item.link" width="80" height="50" />
      <p>{{ item.name }}</p>
    </div>
  </template>
</UploadMedia>

`
