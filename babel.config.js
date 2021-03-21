module.exports = {
  presets: ['@babel/preset-env'],

  // Prevents the “ReferenceError: regeneratorRuntime is not defined” error.
  // See https://github.com/facebook/jest/issues/3126.
  targets: { node: 'current' },
}
