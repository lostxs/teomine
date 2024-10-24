// eslint-disable-next-line import/no-anonymous-default-export
export default {
	displayName: 'next-client',
	preset: '../../jest.preset.js',
	transform: {
		'^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
		'^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../../coverage/apps/next-client',
}
