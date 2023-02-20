module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:import/typescript',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: [
        'import',
        'react',
        'react-hooks',
        '@typescript-eslint',
        'prettier',
    ],
    rules: {
        'react/react-in-jsx-scope': 0,
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
        ],
        camelcase: 'error',
        'spaced-comment': 'error',
        quotes: ['error', 'single'],
        'no-duplicate-imports': 'error',
        'react/function-component-definition': [
            2,
            { namedComponents: 'arrow-function' },
        ],
        'react/jsx-props-no-spreading': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'react/jsx-filename-extension': [
            'warn',
            { extensions: ['.tsx', '.ts', '.js'] },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'import/prefer-default-export': 'off',
        'import/no-relative-packages': 'off',
        'react/prop-types': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        '@typescript-eslint/explicit-function-return-type': [
            'error',
            {
                allowExpressions: true,
            },
        ],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'max-len': ['warn', { code: 80 }],
        'brace-style': [
            1,
            '1tbs',
            {
                allowSingleLine: true,
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {
                extensions: ['.ts', '.tsx'],
            },
            // node: {
            //     extensions: ['.js', '.jsx', '.ts', '.tsx'],
            // },
        },
    },
}
