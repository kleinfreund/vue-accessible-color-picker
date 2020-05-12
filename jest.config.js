module.exports = {
  moduleFileExtensions: ['js', 'vue'],
  transform: {
    '^.*\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testMatch: [
    '<rootDir>/**/*.test.js',
  ],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,vue}', '!**/node_modules/**'],
}
