<template>
  <div>
    <el-card shadow="never" class="el-box-card">
      <div slot="header">示例1 - 基础<span>注意：在不使用插槽的情况下 mold 字段必须要定义</span></div>
      <FormLayout ref="formRef_01" :molds="molds_01" inline :rules="rules_01" label-width="100px" />

      <div class="button-group">
        <el-button type="primary" @click="setEmpty_01">重置</el-button>
        <el-button type="primary" @click="clearValidate_01">清空验证</el-button>
        <el-button type="primary" @click="setValues_01">设置值</el-button>
        <el-button type="primary" @click="setDate_01">设日期值</el-button>
        <el-button type="primary" @click="check_01">校验</el-button>
      </div>

      <PreCode path="layout_form/m_01/code" />
    </el-card>

    <el-card shadow="never" class="el-box-card">
      <div slot="header">示例2 - 插槽1<span>根据 molds 中的 key 或者 slot_key 定义插槽</span></div>
      <FormLayout ref="formRef_02" :molds="molds_02" inline :rules="rules_02" label-width="100px">
        <template v-slot:title="prop">
          <el-input v-model="prop.model.title" />
        </template>
        <template v-slot:text="prop">
          <el-input v-model="prop.model.text" />
          <div>{{ prop }}</div>
        </template>
      </FormLayout>

      <div class="button-group">
        <el-button type="primary" @click="check_02">校验</el-button>
      </div>

      <PreCode path="layout_form/m_02/code" />
    </el-card>

    <el-card shadow="never" class="el-box-card">
      <div slot="header">示例3 - 插槽2<span>通过 custom 自定义所有节点</span></div>
      <FormLayout ref="formRef_03" :molds="molds_03" :rules="rules_03" label-width="100px" inline custom>
        <template v-slot="prop">
          <span>{{ prop.model.title }}</span>
          <el-button @click="prop.model.title = 'qzui'">赋值</el-button>
          <el-button @click="prop.model.title = ''">清空</el-button>
        </template>
      </FormLayout>

      <div class="button-group">
        <el-button type="primary" @click="check_03">校验</el-button>
      </div>

      <PreCode path="layout_form/m_03/code" />
    </el-card>
  </div>
</template>

<script>
import M_01 from './m_01/mixin'
import M_02 from './m_02/mixin'
import M_03 from './m_03/mixin'

export default {
  mixins: [M_01, M_02, M_03]
}
</script>

<style lang="scss" scoped>
.button-group {
  margin: 30px;
  text-align: center;
}
</style>
