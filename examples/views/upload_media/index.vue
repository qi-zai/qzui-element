<template>
  <div>
    <BoxCard title="示例1 - 基础">
      <UploadMedia readonly />
      <UploadMedia type="image" accept="image/jpg" />
      <UploadMedia type="video" accept="video/mp4" />

      <PreCode path="upload_media/m_01/code" />
    </BoxCard>

    <BoxCard title="示例2 - 多选">
      <div><UploadMedia multiple /></div>
      <div><UploadMedia type="image" accept="image/jpeg, image/gif, image/png" multiple /></div>
      <div><UploadMedia type="video" accept="video/mp4" multiple /></div>

      <PreCode path="upload_media/m_02/code" />
    </BoxCard>

    <BoxCard title="示例3 - 插槽">
      <UploadMedia type="slot" accept="image/jpeg, image/gif, image/png" multiple>
        <template v-slot="{ item }">
          <div style="padding: 10px;">
            <img :src="item.link" width="80" height="50" />
            <p>{{ item.name }}</p>
          </div>
        </template>
      </UploadMedia>

      <PreCode path="upload_media/m_03/code" />
    </BoxCard>

    <BoxCard title="示例4 - 异步上传">
      <UploadMedia v-model="file_0401" type="image" accept="image/jpg" auto-upload multiple @on-upload="upload_04" />

      <PreCode path="upload_media/m_04/code" />
    </BoxCard>

    <BoxCard title="文档">
      <Docs title="Attributes" :data="docs" />
    </BoxCard>
  </div>
</template>

<script>
import M_04 from './m_04/mixin'

export default {
  mixins: [M_04],

  created() {
    this.docs = [
      { parame: 'value', explain: '展示的数据', type: 'array' },
      { parame: 'accept', explain: '上传的文件类型', type: 'string' },
      { parame: 'type', explain: '组件以什么类型显示', type: 'string', options: 'text/image/video', default: 'text' },
      { parame: 'uploadLabel', explain: '上传按钮文案', type: 'string', default: '上传' },
      { parame: 'autoUpload', explain: '是否立即上传，必须与 on-upload 同时使用', type: 'boolean', default: 'false' },
      { parame: 'max', explain: '最多上传数量', type: 'number', default: 'Infinity' },

      { parame: 'multiple', explain: '是否多选', type: 'boolean', default: 'false' },
      { parame: 'readonly', explain: '控件以只读模式显示', type: 'boolean', default: 'false' }
    ]
  }
}
</script>

<style scoped>
.upload_media_type__slot {
  padding: 8px;
}
</style>
