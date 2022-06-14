module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['plugin:nuxt/recommended', 'prettier'],
  parserOptions: {},
  plugins: ['only-warn'],

  rules: {
    semi: ['warn', 'never'],
    quotes: ['warn', 'single', { allowTemplateLiterals: true }],
    'no-console': ['off'],
    'comma-dangle': [
      'warn',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    'no-unreachable': ['off'],
  },
}
