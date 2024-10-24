const nx = require('@nx/eslint-plugin')

const importPlugin = require('eslint-plugin-import')
const unicornPlugin = require('eslint-plugin-unicorn')
const sonarjsPlugin = require('eslint-plugin-sonarjs')
const prettierPlugin = require('eslint-plugin-prettier')
const prettierConfig = require('eslint-config-prettier')

const commonFiles = ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx']

module.exports = [
	...nx.configs['flat/base'],
	...nx.configs['flat/typescript'],
	...nx.configs['flat/javascript'],

	// Правила для всех файлов
	{
		files: commonFiles,
		rules: {
			'@nx/enforce-module-boundaries': [
				'error',
				{
					enforceBuildableLibDependency: true,
					allow: [String.raw`^.*/eslint(\.base)?\.config\.[cm]?js$`],
					depConstraints: [
						{
							sourceTag: '*',
							onlyDependOnLibsWithTags: ['*'],
						},
					],
				},
			],
		},
	},

	// Правила для импорта
	{
		files: commonFiles,
		plugins: {
			import: importPlugin,
		},
		rules: {
			'import/order': [
				'error',
				{
					'newlines-between': 'always',
					pathGroups: [
						{
							pattern: '@nx/**',
							group: 'external',
							position: 'before',
						},
						{
							pattern: 'react',
							group: 'external',
							position: 'before',
						},
					],
					pathGroupsExcludedImportTypes: ['react'],
				},
			],
		},
	},

	// Подключаем unicorn с рекомендованными правилами
	{
		files: commonFiles,
		plugins: {
			unicorn: unicornPlugin,
		},
		rules: {
			...unicornPlugin.configs.recommended.rules,
		},
	},

	// Отключение правила unicorn/prefer-module для конфигурационных файлов
	{
		files: ['**/*.js', '**/*.ts'],
		rules: {
			'unicorn/prefer-module': 'off',
		},
	},

	// Подключаем sonarjs с рекомендованными правилами
	{
		files: commonFiles,
		plugins: {
			sonarjs: sonarjsPlugin,
		},
		rules: {
			...sonarjsPlugin.configs.recommended.rules,
		},
	},

	// Отключаем конфликтующие с Prettier правила
	{
		files: commonFiles,
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			'prettier/prettier': 'error',
			...prettierConfig.rules,
		},
	},

	{
		ignores: ['**/dist'],
	},
]
