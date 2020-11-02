<template>
  <div class="upload-media">
    <div v-for="(v, i) in list" :key="i" :class="['upload-media-item', 'upload-media-type-' + type]">
      <div class="media-delete" @click="multiple ? deleteMedia(i) : selectMedia()">
        <i :class="'el-icon-' + (multiple ? 'delete' : 'refresh')" />
      </div>

      <img v-if="type === 'image'" :src="v" width="100%" height="100%" />

      <video v-else-if="type === 'video'" :src="v" controls mediatype="video" />
    </div>

    <div v-if="multiple ? max > list.length : !list.length" class="upload-media-item add" @click="selectMedia">
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
    max: { type: Number, default: 5 },

    multiple: Boolean
  },

  data: () => ({ list: [] }),

  watch: {
    value(v) {
      this.list = v
    },

    type() {
      this.reset()
    },

    multiple() {
      this.reset()
    }
  },

  destroyed() {
    this._inputEL = null
  },

  methods: {
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
    }
  }
}
</script>

<style lang="scss">
.upload-media {
  display: inline-flex;
  flex-wrap: wrap;

  &-item {
    margin-right: 10px;
    width: 150px;
    height: 150px;
    position: relative;
    border: 1px dashed transparent;
    border-radius: 6px;
    overflow: hidden;

    .media-delete {
      padding: 18px;
      position: absolute;
      top: -8px;
      right: -8px;
      z-index: 1;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      cursor: pointer;
      background-color: #f56c6c;
      border-radius: 0 0 0 50px;
      opacity: 0.9;

      &:hover {
        opacity: 1;
      }
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
      font-size: 28px;
      color: #8c939d;
      cursor: pointer;

      &:hover {
        color: #1890ff;
        border-color: #1890ff;
      }
    }
  }
}
</style>
