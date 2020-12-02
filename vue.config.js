const path = require('path')

module.exports = {
  outputDir: 'docs',
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      axios: 'axios',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      hljs: 'hljs'
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve('examples')).set('~', path.resolve('packages'))

    config.module
      .rule('eslint')
      .exclude.add(path.resolve('lib'))
      .end()
      .exclude.add(path.resolve('docs'))
      .end()

    config.module
      .rule('js')
      .include.add(/packages/)
      .end()
      .include.add(/examples/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap((options) => options)
  }
}
