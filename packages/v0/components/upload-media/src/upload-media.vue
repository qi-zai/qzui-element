<template>
  <div v-loading="loading" :class="['upload_media', 'upload_media_type__' + type]">
    <div v-for="(v, i) in file_list" :key="i" class="upload_media_item" :title="v.name" :media-index="i">
      <slot :item="v" :index="i">
        <img v-if="type === 'image'" :src="v.link" :draggable="sort" width="100%" height="100%" />
        <video
          v-else-if="type === 'video'"
          :src="v.link"
          :draggable="sort"
          controls
          mediatype="video"
          width="100%"
          height="100%"
        />
        <span v-else class="media_text" :download="download" :draggable="sort" @click="download && $emit('on-download', v)">
          {{ v.name }}
        </span>

        <div v-if="!readonly" class="media_actions">
          <i class="icon el-icon-delete" title="删除" @click="deleteFile(i)" />
          <i class="icon el-icon-refresh" title="替换" @click="replaceFile(i)" />
        </div>
      </slot>
    </div>

    <template v-if="!readonly">
      <div v-if="file_list.length < (multiple ? max : 1)" class="upload_media_item upload_media_action" @click="pushFile">
        <slot name="upload-label">{{ uploadLabel }}</slot>
      </div>
    </template>
  </div>
</template>

<script>
import InputDom from './input_dom'

export default {
  name: 'UploadMedia',

  props: {
    value: { type: Array, default: () => [] },
    accept: { type: String, default: null },
    type: { type: String, default: 'text' },
    uploadLabel: { type: String, default: '上传' },
    max: { type: Number, default: Infinity },
    autoUpload: Boolean,

    download: Boolean,
    readonly: Boolean,
    multiple: Boolean,
    sort: Boolean
  },

  data() {
    return { loading: false, file_list: [] }
  },

  watch: {
    value: {
      handler(v) {
        this.file_list = this.value
      },
      immediate: true
    },

    file_list(v) {
      this.$emit('input', v)
    },

    sort: {
      immediate: true,
      handler(v) {
        this.$nextTick(() => this[v ? 'addDragEvent' : 'removeDragEvent']())
      }
    }
  },

  methods: {
    toLink(file) {
      return file instanceof File ? { name: file.name, link: URL.createObjectURL(file), download: file.download } : file
    },

    upload(callback) {
      InputDom((file) => {
        this.loading = true
        this.autoUpload ? this.$emit('on-upload', file, callback) : callback(file)
      }, this.accept)
    },

    pushFile() {
      this.upload((file) => {
        if (file) {
          this.file_list.push(this.toLink(file))
          this.$emit('on-change', file)
        }
        this.loading = false
      })
    },

    replaceFile(index) {
      this.upload((file) => {
        if (file) {
          this.file_list.splice(index, 1, this.toLink(file))
          this.$emit('on-change', file)
        }
        this.loading = false
      })
    },

    deleteFile(index) {
      this.$emit('on-change', this.file_list.splice(index, 1))
    },

    addDragEvent() {
      let origin = null
      this.events = {
        dragstart: (e) => {
          origin = e.target
          origin.style.opacity = 0.5
        },
        dragend: (e) => (e.target.style.opacity = ''),
        dragover: (e) => e.preventDefault(),
        dragenter: (e) => e.target.draggable && (e.target.parentNode.style.border = '1px dashed red'),
        dragleave: (e) => e.target.draggable && (e.target.parentNode.style.border = ''),
        drop: (e) => {
          e.preventDefault()
          if (e.target.draggable) {
            e.target.parentNode.style.borderColor = ''
            this.insertMediaPosi(e.target.parentNode.getAttribute('media-index'), origin.parentNode.getAttribute('media-index'))
          }
        }
      }

      for (const name in this.events) {
        this.$el.addEventListener(name, this.events[name], false)
      }
    },

    insertMediaPosi(targetIndex, originIndex) {
      if (targetIndex === originIndex) return
      this.file_list.splice(targetIndex, 0, ...this.file_list.splice(originIndex, 1))
    },

    removeDragEvent() {
      if (!this.events) return
      for (const name in this.events) this.$el.removeEventListener(name, this.events[name])
      this.events = null
    }
  }
}
</script>

<style lang="scss">
.upload_media {
  display: inline-flex;
  flex-wrap: wrap;
  vertical-align: bottom;

  .upload_media_item {
    margin: 8px;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    border-radius: 3px;
    border: 1px solid #efefef;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;

    .media_actions {
      display: flex;
      height: 35%;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.8);
      font-size: 18px;
      color: #fff;
      transform: translateY(-150%);
      transition: transform 0.3s;
      border-radius: inherit;

      .icon {
        margin: 5%;
        cursor: pointer;
      }
    }

    &:hover .media_actions {
      transform: translate(0) !important;
    }
  }

  .upload_media_action {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #a8a8a8;
    border: 1px dashed #e8e8e8;
    background-color: transparent;

    &:hover {
      color: #409eff;
      border-color: #409eff !important;
    }
  }

  img,
  video {
    object-fit: cover;
    border-radius: inherit;
    outline: none;
  }

  &.upload_media_type__image .upload_media_item {
    width: 130px;
    height: 130px;
  }

  &.upload_media_type__video .upload_media_item {
    width: 230px;
    height: 130px;

    .media_actions {
      bottom: 60%;
    }
  }

  &.upload_media_type__text {
    .upload_media_item {
      padding: 13px 15px;
      width: 150px;
      border: 1px solid #fafafa;
      background-color: #fafafa;

      .media_actions {
        padding: 0 12px;
        height: 100%;
        left: auto;
        transform: translateX(150%);
      }

      .media_text {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

        &[download] {
          cursor: pointer;
          color: #0096fa;
          text-decoration: underline;
        }
      }

      &.upload_media_action {
        border: 1px dashed #e8e8e8;
        background-color: transparent;
      }
    }
  }
}
</style>
