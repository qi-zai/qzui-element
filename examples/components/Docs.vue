<template>
  <div>
    <h3 v-if="title" :id="title" class="doc-title">{{ title }}</h3>
    <table class="docs-table">
      <thead>
        <tr>
          <th v-for="(v, k) in column" :key="k">{{ v }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in data" :key="i" class="doc-attr">
          <td v-for="(v, k) in column" :key="k" v-html="item[k]" />
        </tr>
        <tr v-if="more" class="more">
          <td colspan="5">
            <a :href="'https://element.eleme.cn/#/zh-CN/component/' + more" target="_blank">... 更多 ...</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Docs',

  props: {
    column: {
      type: Array,
      default: () => ({ parame: '参数', explain: '说明', type: '类型', options: '可选值', default: '默认值' })
    },
    title: { type: Array, default: null },

    data: { type: Array, required: true },
    more: { type: String, default: null }
  }
}
</script>

<style lang="scss" scoped>
.doc-title {
  margin: 15px 0;
  padding-left: 15px;
  font-weight: 400;
  color: #1f2f3d;
  font-size: 22px;
}

.docs-table {
  border-collapse: collapse;
  width: 100%;
  background-color: #fff;
  font-size: 12px;
  margin-bottom: 30px;
  line-height: 1.5em;

  tr {
    border-bottom: 1px dotted #f8f8f8;

    &.more {
      border: 0;
      text-align: center;

      a {
        text-decoration: none;
        color: #fa6400;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    > th {
      text-align: left;
      white-space: nowrap;
      color: #909399;
      font-weight: 400;
    }

    > td {
      color: #606266;

      &:empty::after {
        content: '—';
        color: #c8c8c8;
      }
    }

    > th,
    > td {
      padding: 15px;
      max-width: 250px;
    }
  }

  tbody tr.doc-attr:hover {
    background-color: #f4f7fa;
  }
}
</style>
