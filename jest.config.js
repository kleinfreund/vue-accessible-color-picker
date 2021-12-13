module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'vue'],
  transform: {
    '^.*\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: [
    '<rootDir>/**/*.test.js',
  ],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,vue}'],
}
