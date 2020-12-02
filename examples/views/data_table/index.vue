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
  </div>
</template>

<script>
import M_01 from './m_01/mixni'
import M_02 from './m_02/mixni'
import M_03 from './m_03/mixni'
import M_04 from './m_04/mixni'

export default {
  mixins: [M_01, M_02, M_03, M_04],

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
