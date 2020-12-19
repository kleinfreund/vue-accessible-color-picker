module.exports = {
  branches: ['main', 'next', { name: 'beta', prerelease: true }],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/github', {
      assets: [
        { path: 'dist/vue-accessible-color-picker.js' },
        { path: 'dist/vue-accessible-color-picker-unstyled.js' },
        { path: 'dist/index.d.ts' },
      ],
    }],
    '@semantic-release/git',
  ],
}
