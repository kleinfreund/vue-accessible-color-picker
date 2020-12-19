module.exports = {
  branches: ['main', 'next', { name: 'beta', prerelease: true }],
  plugins: [
    '@semantic-release/git',
  ],
}
