module.exports = {
  branches: ['main', 'next', { name: 'beta', prerelease: true }],
  plugins: [
    // https://github.com/semantic-release/commit-analyzer
    '@semantic-release/commit-analyzer',

    // https://github.com/semantic-release/release-notes-generator
    '@semantic-release/release-notes-generator',

    // https://github.com/semantic-release/changelog
    '@semantic-release/changelog',

    // https://github.com/semantic-release/github
    ['@semantic-release/github', {
      assets: [
        { path: 'dist/vue-accessible-color-picker.js' },
        { path: 'dist/vue-accessible-color-picker-unstyled.js' },
        { path: 'types/index.d.ts' },
      ],
    }],

    // https://github.com/semantic-release/git
    '@semantic-release/git',
  ],
}
