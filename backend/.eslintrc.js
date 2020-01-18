module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    plugins: ['react'],
    rules: {
        'react/jsx-uses-react': 1,
        'react/jsx-uses-vars': 1,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true,
        },
    },
}
