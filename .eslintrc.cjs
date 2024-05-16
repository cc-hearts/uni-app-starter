module.exports = {
  extends: ['@cc-heart/eslint-config/vue3-typescript-eslint', 'plugin:vue/vue3-recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'laster',
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/attribute-hyphenation': 'off',
  },
}
