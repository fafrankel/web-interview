module.exports = {
  env: {
    node: true,
  },
  extends: 'eslint:recommended',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  rules: {},
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
    },
  ],
  ignorePatterns: ['node_modules/', 'dist/', 'build/', '.eslintrc.cjs'],
}
