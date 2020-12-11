<template>
  <div>
    <BoxCard title="示例">
      <FilterLayout ref="filters" :filters="filters" label-width="80px" />

      <PreCode path="v0/layout_filter/m_01/code" />
    </BoxCard>

    <BoxCard title="文档">
      <Docs title="Attributes" :data="_Attributes" />

      <Docs title="filters" :data="_Filters" />

      <Docs
        title="Refs-Events"
        :data="_RefsEvents"
        :column="{ attr: '属性名称', type: '类型', explain: '说明', parame: '参数说明' }"
      />
    </BoxCard>
  </div>
</template>

<script>
import M_01 from './m_01/mixin'

export default {
  mixins: [M_01],

  created() {
    this._Attributes = [
      { parame: 'filters', explain: '显示筛选器项，详细配置看下文', type: 'array' },
      { parame: 'size', explain: '所有筛选器的大小', type: 'String' },
      { parame: 'label-width', explain: 'label宽度', type: 'String' }
    ]

    this._Filters = [
      {
        parame: 'key',
        explain:
          '与 getValues() 搭配，效果更好<br>例1: "a.b" => { a: { b: "value" } }<br>例1: "c,d,..." => { c: value[0], d: value[1],... }<br>注意：此时value必须是Array<br>更多详情请看示例',
        type: 'String'
      },
      { parame: 'label', explain: '控件的label名', type: 'String' },
      { parame: 'value', explain: '控件的值', type: 'any' },
      {
        parame: 'mold',
        explain: '控件以什么模型展示',
        type: 'String',
        options: 'input/button/select/date/<br/>cascader/buttonGroup/custom'
      },
      { parame: 'component', explain: '自定义展示控件，仅在mold为custom下生效', type: 'VNode' },
      { parame: 'options', explain: '下拉项，仅在mold为select/cascader下生效', type: 'Object/Array' },
      {
        parame: 'props',
        explain: '设置 options 时有效，定义下拉项中的key的key，仅在mold为select/cascader下生效',
        type: 'String',
        default: '{ value: "value", label: "label" }'
      },
      { parame: 'on', explain: '控件的Event事件', type: 'Object' }
    ]

    this._RefsEvents = [
      {
        attr: 'getValues(option)',
        type: 'Function',
        explain: '获取带key的 mold 值，当 key="a.b"，获取的数据格式为 { a: { b: "value" } }',
        parame: 'option: { origin: "origin", key: "key" }，origin: 数据源, key: 取值的key'
      },
      { attr: 'reset', type: 'Function', explain: '重置所有筛选器的值' }
    ]
  }
}
</script>
