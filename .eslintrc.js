module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  globals: {
  },
  rules: {
    'nuxt/no-cjs-in-config': 0,
    'no-extend-native': 0,
    'new-cap': 0,
    'no-new': 0,
    'vue/no-v-html': 0,
    'unicorn/prefer-starts-ends-with': 0,
    'require-await': 1
  }
}
