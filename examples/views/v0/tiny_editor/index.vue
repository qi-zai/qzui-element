<template>
  <div>
    <BoxCard class="qzui_home_v0">
      <h1>安装</h1>

      <p>建议：在body底部中加入如下代码</p>

      <PreCode :codes="use" no-wapper />
    </BoxCard>

    <BoxCard title="示例1 - 基础">
      <TinyEditor ref="editor_01" v-model="editor_01" :setting="setting_01" />

      <div class="code_view">{{ editor_01 }}</div>

      <PreCode path="v0/tiny_editor/m_01/code" />
    </BoxCard>

    <BoxCard title="文档">
      <Docs title="Attributes" :data="_Attributes" more="https://www.tiny.cloud/docs-4x/configure/editor-appearance" />
      <Docs title="Events" :data="_Events" :column="{ attr: '事件名称', explain: '说明', parame: '回调参数' }" />
    </BoxCard>
  </div>
</template>

<script>
import { use } from './code'
import M_01 from './m_01/mixin'

export default {
  mixins: [M_01],

  created() {
    this.use = use

    this._Attributes = [
      { parame: 'value', explain: '内容', type: 'String' },
      { parame: 'setting', explain: '配置', type: 'Object' }
    ]

    this._Events = [
      { attr: 'setup', explain: '初始化前调用', parame: 'editor' },
      { attr: 'initCallback', explain: '初始化完成时的回调', parame: 'editor' }
    ]
  }
}
</script>

<style lang="scss" scoped>
.code_view {
  margin: 15px 0;
  padding: 15px;
  border: 1px dashed #ddd;
  border-radius: 3px;
}
</style>
