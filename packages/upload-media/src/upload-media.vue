<template>
  <div class="upload-media" :readonly="readonly" :style="{ fontSize: size }">
    <div v-for="(v, i) in list" :key="i" :class="['upload-media-item', 'upload-media-type-' + type]" :media-index="i">
      <div v-if="!readonly" class="media-delete" @click="multiple ? deleteMedia(i) : selectMedia()">
        <i :class="'el-icon-' + (multiple ? 'delete' : 'refresh')" />
      </div>

      <img v-if="type === 'image'" :draggable="sort" class="upload-media-ctx" :src="v" width="100%" height="100%" />

      <video v-else-if="type === 'video'" :draggable="sort" class="upload-media-ctx" :src="v" controls mediatype="video" />
    </div>

    <div v-if="!readonly && isShowAdd" class="upload-media-item add" @click="selectMedia">
      <i class="el-icon-plus" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadMedia',

  props: {
    value: { type: [String, Array], default: null },
    type: { type: String, default: 'image' },
    accepts: { type: Object, default: () => ({}) },
    selected: { type: Function, default: null },
    max: { type: Number, default: null },
    size: { type: String, default: null },

    readonly: Boolean,
    multiple: Boolean,
    sort: Boolean
  },

  data() {
    return { list: [] }
  },

  computed: {
    isShowAdd() {
      return this.multiple ? !this.max || this.max > this.list.length : !this.list.length
    }
  },

  watch: {
    value: {
      immediate: true,
      handler: 'setList'
    },

    type() {
      this.reset()
    },

    multiple() {
      this.reset()
    },

    sort: {
      immediate: true,
      handler(v) {
        this.$nextTick(() => this[v ? 'addDragEvent' : 'removeDragEvent']())
      }
    }
  },

  destroyed() {
    this._inputEL = null
    this.removeDragEvent()
  },

  methods: {
    setList(value) {
      this.list = Array.isArray(value) ? value : value ? [value] : []
    },

    reset() {
      this.list.splice(0)
      this.$emit('input', null)
    },

    selectMedia() {
      if (!this._inputEL) {
        this._inputEL = document.createElement('input')
        this._inputEL.setAttribute('type', 'file')
        this._inputEL.onchange = this.change
      }

      this._inputEL.setAttribute('accept', this.accepts[this.type])
      this._inputEL.click()
    },

    change() {
      this.selected && this.selected(this._inputEL.files[0], this.selectedCallback)
      this._inputEL.value = ''
    },

    selectedCallback(url) {
      if (this.multiple) {
        this.list.push(url)
        this.$emit('input', this.list)
      } else {
        this.list = [url]
        this.$emit('input', this.list[0])
      }
    },

    deleteMedia(index) {
      this.list.splice(index, 1)
    },

    addDragEvent() {
      let origin = null
      this.events = Object.freeze({
        dragstart: (e) => {
          origin = e.target
          origin.style.opacity = 0.5
        },
        dragend: (e) => (e.target.style.opacity = ''),
        dragover: (e) => e.preventDefault(),
        dragenter: (e) => e.target.className === 'upload-media-ctx' && (e.target.parentNode.style.borderColor = 'red'),
        dragleave: (e) => e.target.className === 'upload-media-ctx' && (e.target.parentNode.style.borderColor = ''),
        drop: (e) => {
          event.preventDefault()
          if (e.target.className === 'upload-media-ctx') {
            e.target.parentNode.style.borderColor = ''
            this.insertMediaPosi(e.target.parentNode.getAttribute('media-index'), origin.parentNode.getAttribute('media-index'))
          }
        }
      })

      for (const name in this.events) {
        this.$el.addEventListener(name, this.events[name], false)
      }
    },

    insertMediaPosi(targetIndex, originIndex) {
      if (targetIndex === originIndex) return
      this.list.splice(targetIndex, 0, ...this.list.splice(originIndex, 1))
    },

    removeDragEvent() {
      if (!this.events) return
      ;['dragstart', 'dragend', 'dragover', 'drop', 'dragenter', 'dragleave'].forEach((name) =>
        this.$el.removeEventListener(name, this.events[name])
      )
      this.events = null
    }
  }
}
</script>

<style lang="scss">
.upload-media {
  display: inline-flex;
  flex-wrap: wrap;
  position: relative;
  font-size: 100px;

  &[readonly]::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    opacity: 0;
  }

  &-item {
    margin-right: 10px;
    width: 1.5em;
    height: 1.5em;
    position: relative;
    border: 1px dashed transparent;
    border-radius: 6px;
    overflow: hidden;

    .media-delete {
      padding: 1em;
      position: absolute;
      top: -8px;
      right: -8px;
      z-index: 1;
      font-size: 0.18em;
      font-weight: bold;
      color: #fff;
      cursor: pointer;
      background-color: #f44336;
      border-radius: 0 0 0 50px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }

    img {
      object-fit: cover;
      transition: transform 0.1s;
    }

    video {
      height: 100%;
    }

    &.upload-media-type-video {
      width: auto;
    }

    &.add {
      display: flex;
      justify-content: center;
      align-items: center;
      border-color: #c0ccda;
      color: #8c939d;
      cursor: pointer;

      i {
        font-size: 0.28em;
      }

      &:hover {
        color: #1890ff;
        border-color: #1890ff;
      }
    }
  }
}
</style>
