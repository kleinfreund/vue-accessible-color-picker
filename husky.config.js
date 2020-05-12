module.exports = {
  husky: {
    hooks: {
      'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
      'pre-commit': 'npm run lint:fix && npm test',
    },
  },
}
