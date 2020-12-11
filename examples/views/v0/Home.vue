<template>
  <BoxCard class="qzui_home_v0">
    <h1>快速上手</h1>

    <p>注意：该项目基于element-ui进行的二次封装，更多详情，请参考element-ui官网</p>

    <h2>cdn</h2>
    <p>
      目前可以通过 <a href="https://unpkg.com/browse/qzui/">https://unpkg.com/qzui</a> 获取到最新版本的资源，在页面上引入 js 和
      css 文件即可开始使用。
    </p>
    <PreCode :codes="_codes00" no-wapper />

    <h2>npm 安装</h2>
    <PreCode :codes="_codes01" no-wapper />

    <h2>引入 qzui</h2>
    <p>你可以引入整个 Element，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 Element。</p>
    <p>完整引入</p>
    <p>在 main.js 中写入以下内容：</p>
    <PreCode :codes="_codes02" no-wapper />

    <p>按需引入</p>
    <PreCode :codes="_codes03" no-wapper no-scroll />

    <h2>至此，qzui 安装完毕，欢迎使用</h2>
  </BoxCard>
</template>

<script>
import '~/v0/styles/index.scss'
import * as codes from './code'
import qzui from '~/v0/index'

Vue.use(qzui)

export default {
  created() {
    for (const k in codes) {
      const [key, type] = k.split('_')
      // eslint-disable-next-line import/namespace
      this['_' + key] = { [type]: codes[k] }
    }
  }
}
</script>

<style lang="scss" scoped>
.qzui_home_v0 {
  h1,
  h2 {
    padding: 0 5px;
    font-weight: 400;
    color: #1f2f3d;
  }

  h2 {
    margin: 55px 0 20px;
  }

  p {
    padding: 0 5px;
    font-size: 12px;
    color: #888;
    line-height: 1.5em;

    a {
      color: #409eff;
      text-decoration: none;
    }
  }
}
</style>
