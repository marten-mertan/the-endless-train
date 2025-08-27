import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    stylistic: {
      semi: false,
      indent: 2,
      quotes: 'single',
    },
  },
  rules: {
    'vue/attribute-hyphenation': [
      'error',
      'always',
    ],
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/custom-event-name-casing': 'off',
    'vue/html-closing-bracket-newline': 'error',
    'vue/html-indent': [
      'error',
      4,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 2,
        multiline: {
          max: 1,
        },
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
          normal: 'any',
          component: 'any',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/multiline-html-element-content-newline': [
      'error',
      {
        ignoreWhenEmpty: false,
        allowEmptyLines: true,
      },
    ],
    'vue/script-indent': [
      'error',
      4,
      {
        baseIndent: 0,
        switchCase: 1,
        ignores: [],
      },
    ],
    'vue/component-definition-name-casing': [
      'error',
      'PascalCase',
    ],
    'vue/no-v-html': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-reserved-keys': 'off',
    'vue/padding-line-between-blocks': 2,
    'vue/new-line-between-multi-line-property': [
      'error',
      {
        minLineOfMultilineProperty: 2,
      },
    ],
    'vue/first-attribute-linebreak': [
      'error',
      {
        singleline: 'ignore',
        multiline: 'below',
      },
    ],
    'vue/no-lone-template': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/valid-attribute-name': 'off',
    'no-extra-semi': 'warn',
    // Types
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',

  },
})
