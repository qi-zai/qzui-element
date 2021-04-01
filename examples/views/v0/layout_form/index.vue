<template>
  <div>
    <BoxCard title="示例1 - 基础" tip="注意：在不使用插槽的情况下 mold 字段必须要定义">
      <FormLayout ref="formRef_01" :molds="molds_01" inline :rules="rules_01" label-width="100px" />

      <div class="button-group">
        <el-button type="primary" @click="setEmpty_01">重置</el-button>
        <el-button type="primary" @click="clearValidate_01">清空验证</el-button>
        <el-button type="primary" @click="setValues_01">设置值</el-button>
        <el-button type="primary" @click="setDate_01">设日期值</el-button>
        <el-button type="primary" @click="check_01">校验</el-button>
      </div>

      <PreCode path="v0/layout_form/m_01/code" />
    </BoxCard>

    <BoxCard title="示例2 - 插槽1" tip="根据 molds 中的 key 或者 slot_key 定义插槽">
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

      <PreCode path="v0/layout_form/m_02/code" />
    </BoxCard>

    <BoxCard title="示例3 - 插槽2" tip="通过 custom 自定义所有节点">
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

      <PreCode path="v0/layout_form/m_03/code" />
    </BoxCard>

    <BoxCard title="文档">
      <Docs title="Attributes" :data="_Attributes" more="form#form-attributes" />
      <Docs title="Molds" :data="_Molds" />
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
import M_02 from './m_02/mixin'
import M_03 from './m_03/mixin'

export default {
  mixins: [M_01, M_02, M_03],

  created() {
    this._Attributes = [
      { parame: 'models', explain: '显示form表单项', type: 'Array', default: '[]' },
      { parame: 'rules', explain: '表单验证规则', type: 'Object', default: '{}' },
      { parame: 'custom', explain: '是否自定义所有插槽，如果为true，将调用默认插槽', type: 'Boolean', default: 'false' }
    ]

    this._Molds = [
      { parame: 'label', explain: '控件的label名', type: 'array' },
      {
        parame: 'key',
        explain:
          '与 getValues() 搭配，效果更好<br>例1: "a.b" => { a: { b: "value" } }<br>例1: "c,d,..." => { c: value[0], d: value[1],... }，注意：此时value必须是Array<br>详情请看示例',
        type: 'String'
      },
      { parame: 'display', explain: '用于控制列的显示隐藏', type: 'Boolean', default: 'true' },
      { parame: 'style', explain: 'style 样式', type: 'String/Object/Function', default: 'false' },
      { parame: 'slot_key', explain: '自定义插槽key', type: 'String' },
      { parame: 'value', explain: '控件的初始默认值', type: 'any' },
      {
        parame: 'mold',
        explain: '控件以什么模型展示',
        type: 'String',
        options: 'input/button/select/date/<br/>cascader'
      }
    ]

    this._RefsEvents = [
      { attr: 'elFormRef', type: 'Attribute', explain: 'el-form 的 ref 实例' },
      {
        attr: 'setValue(key, value)',
        type: 'Function',
        explain: '为单个mold赋值，可级联操作',
        parame: 'key：逗号和点需要写成下划线, value：mold的值'
      },
      {
        attr: 'setValues({key, value})',
        type: 'Function',
        explain: '可为多项mold',
        parame: 'key：逗号和点需要写成下划线, value：mold的值<br>如果不传，则会清空表单'
      },
      { attr: 'clearValidate()', type: 'Function', explain: '清空表单验证' },
      {
        attr: 'validate(callback)',
        type: 'Function',
        explain: '验证表单',
        parame: 'callback：验证成功的回调函数，表单验证成功后执行该回调'
      }
    ]
  }
}
</script>
