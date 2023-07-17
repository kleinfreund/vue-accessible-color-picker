/** @type {import('semantic-release').Options} */ const options = {
	branches: [
		'main',
	],
	plugins: [
		// This analyzes all new commits and determines whether to release a new version.
		// https://github.com/semantic-release/commit-analyzer
		'@semantic-release/commit-analyzer',

		// This takes the releasing commits’ messages and compiles release notes to be used for the CHANGELOG.md file and the GitHub release.
		// https://github.com/semantic-release/release-notes-generator
		'@semantic-release/release-notes-generator',

		// This creates/updates the CHANGELOG.md file.
		// https://github.com/semantic-release/changelog
		'@semantic-release/changelog',

		// This updates the package.json and package-lock.json files with the new version number.
		// https://github.com/semantic-release/npm
		'@semantic-release/npm',

		// This creates a GitHub release and attaches assets to it.
		// https://github.com/semantic-release/github
		['@semantic-release/github', {
			assets: [
				{ path: 'dist/vue-accessible-color-picker.js' },
				{ path: 'dist/vue-accessible-color-picker-unstyled.js' },
				{ path: 'types/index.d.ts' },
			],
		}],

		// This creates a release commit in the git repository.
		// https://github.com/semantic-release/git
		'@semantic-release/git',
	],
}

module.exports = options
