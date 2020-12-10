<template>
  <div>
    <BoxCard title="示例1" tip="基础">
      <data-table ref="dataTable_01" :column="column_01" :data="data_01" :on="{ 'select-all': selectAll }" :max-height="300" />

      <div class="button-group">
        <el-button type="primary" @click="getSelect_01">获取选中的数据</el-button>
        <el-button type="primary" @click="getElTableRef_01">获取 el-table 的实例</el-button>
      </div>

      <PreCode path="data_table/m_01/code" />
    </BoxCard>

    <BoxCard title="示例2" tip="分页">
      <data-table :column="column_02" :data="data_02" :max-height="300" :page-info="pageInfo_02" @page-change="pageChange_02" />

      <PreCode path="data_table/m_02/code" />
    </BoxCard>

    <BoxCard title="示例3" tip="插槽1：slot 插槽">
      <data-table :column="column_03" :data="data_03" :max-height="300">
        <template v-slot:date="{ row }">
          <img src="favicon.ico" width="30" />
          <div>{{ row.date }}</div>
        </template>
      </data-table>

      <PreCode path="data_table/m_03/code" />
    </BoxCard>

    <BoxCard title="示例4" tip="插槽2：组件式插槽">
      <data-table :column="column_04" :data="data_04" :max-height="300" />

      <PreCode path="data_table/m_04/code" />
    </BoxCard>

    <BoxCard title="文档">
      <Docs title="Attributes" :data="_Attributes" more="table#table-attributes" />

      <Docs title="column" :data="_Column" more="table#table-column-attributes" />

      <Docs
        title="Refs-Events"
        :data="_RefsEvents"
        :column="{ attr: '属性名称', type: '类型', explain: '说明', parame: '参数说明' }"
      />
    </BoxCard>
  </div>
</template>

<script>
import M_01 from './m_01/mixni'
import M_02 from './m_02/mixni'
import M_03 from './m_03/mixni'
import M_04 from './m_04/mixni'

export default {
  mixins: [M_01, M_02, M_03, M_04],

  created() {
    this._Attributes = [
      { parame: 'column', explain: '显示的列', type: 'Array', default: '[]' },
      { parame: 'data', explain: '显示的数据', type: 'Array', default: '[]' },
      {
        parame: 'height',
        explain:
          'Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。',
        type: 'Number'
      },
      {
        parame: 'maxHeight',
        explain: 'Table 的最大高度。合法的值为数字或者单位为 px 的高度。',
        type: 'Number'
      },
      { parame: 'size', explain: 'Table 的尺寸', type: 'String', options: 'medium / small / mini' },
      { parame: 'border', explain: '是否带有纵向边框', type: 'Boolean', default: 'true' },
      { parame: 'columnWidth', explain: '说明', type: 'String', options: '可选值' },
      { parame: 'align', explain: '对齐方式', type: 'String', options: 'left/center/right', default: 'center' },
      {
        parame: 'headerAlign',
        explain: '表头对齐方式，若不设置该项，则使用表格的对齐方式',
        type: 'String',
        options: 'left/center/right',
        default: 'center'
      },
      {
        parame: 'pageInfo',
        explain: '分页信息，{ currentPage: 当前页, pageSize: 每页显示多少条, total: 总共有多少数据 }，如果没有设置将不显示',
        type: 'Object',
        default: 'null'
      },
      { parame: 'on', explain: 'el-table 的事件，例：{ clearFilter: () => {} }', type: 'Object' }
    ]

    this._Column = [
      {
        parame: 'type',
        explain: 'selection 多选框/index 行号索引/expand 可展开的按钮/custom 自定义插槽',
        type: 'String/VNode',
        options: 'selection/index/expand/custom'
      },
      { parame: 'label', explain: '表格头部的列名', type: 'String' },
      { parame: 'prop', explain: '对应列内容的字段名，也可以使用 property 属性', type: 'String' },
      { parame: 'slot_key', explain: '自定义插槽key', type: 'String', default: '[]' },
      { parame: 'labelCallback', explain: 'label回调函数', type: 'Function' },
      { parame: 'width', explain: '每列的宽度', type: 'String' },
      { parame: 'headerAlign', explain: '表格头的对齐方式', type: 'String', options: 'left/center/right', default: 'center' },
      { parame: 'tag', explain: '同element-ui官网的el-tag', type: 'String/Function' },
      { parame: 'actions', explain: '操作列，每一项是一个 el-button', type: 'Function/Array' },
      { parame: '***', explain: '更多配置项，请参考element-ui官网' }
    ]

    this._RefsEvents = [
      { attr: 'elTableRef', type: 'Attribute', explain: 'el-table 的 实例' },
      { attr: 'selection', type: 'Attribute', explain: '多选框选中的数据' },
      {
        attr: 'pageChange',
        type: 'Function',
        explain: '分页信息有变化时会触发，多用与请求数据',
        parame: 'pageinfo: { currentPage, pageSize }'
      }
    ]
  },

  methods: {
    fetch() {
      const list = []
      for (let i = 5; i--; ) {
        list.push({
          id: i,
          date: '2020-05-0' + i,
          name: '张三' + i,
          enable: i % 3,
          label: { key: 0, name: 'qzui' },
          address: '上海市普陀区金沙江路 ' + i + ' 🦌',
          tag: '国家'[i % 2]
        })
      }
      return list
    }
  }
}
</script>
