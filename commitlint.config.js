/** @type {import('@commitlint/types').UserConfig} */ const config = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'header-max-length': [0, 'always', Infinity],
		'body-max-line-length': [0, 'always', Infinity],
		'footer-max-line-length': [0, 'always', Infinity],
	},
}

export default config
