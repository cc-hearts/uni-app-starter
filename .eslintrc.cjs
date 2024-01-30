
module.exports = {
  extends: '@cc-heart/eslint-config/vue3-typescript-eslint',
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'laster',
  },
  "rules":{
    "vue/component-name-in-template-casing":"off"
  }
}