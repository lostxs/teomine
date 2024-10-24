const nx = require('@nx/eslint-plugin')

const { FlatCompat } = require('@eslint/eslintrc')
const js = require('@eslint/js')
const { fixupConfigRules } = require('@eslint/compat')

const baseConfig = require('../../eslint.config.js')

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
})

const filterDuplicatePlugins = (config, pluginName) => {
	return config.map((item) => {
		if (item.plugins && item.plugins[pluginName]) {
			const { [pluginName]: restPlugins } = item.plugins
			return { ...item, plugins: restPlugins }
		}
		return item
	})
}

const filteredBaseConfig = filterDuplicatePlugins(baseConfig, 'import')

module.exports = [
	...fixupConfigRules(compat.extends('next')),
	...fixupConfigRules(compat.extends('next/core-web-vitals')),

	...filteredBaseConfig,
	...nx.configs['flat/react-typescript'],
	{
		ignores: ['.next/**/*'],
	},
]
