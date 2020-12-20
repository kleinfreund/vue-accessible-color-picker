## [1.1.1](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v1.1.0...v1.1.1) (2020-12-20)


### Bug Fixes

* **package:** add exports and module fields to package.json ([5a9eda3](https://github.com/kleinfreund/vue-accessible-color-picker/commit/5a9eda391f437f99b7922e36894463f30d35a1fa))

  Adds the “exports” and “module” fields to the package.json file. Their values refer to the package’s main entry point (i.e. `./dist/vue-accessible-color-picker.js`).

## [1.1.0](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v1.0.1...v1.1.0)


### Features

* **types:** add basic type definitions ([37b425e](https://github.com/kleinfreund/vue-accessible-color-picker/commit/37b425ed19f248017a65eaedd2c783de5f19ae7d))

  Adds type definitions file index.d.ts within the types directory and moves existing JSDoc-based type definitions into this file.

  Points the types field in the package.json file to the newly added type definition file and adds it to the bundled package files.

  Configures the project to check JavaScript for TypeScript errors via a jsconfig.json file in the project’s root directory.

  Adds type annotations to several parts of the codebase.

## [1.0.1](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v1.0.0...v1.0.1)


### Bug Fixes

* **import:** safe-guard Vue.use call ([b4b829a](https://github.com/kleinfreund/vue-accessible-color-picker/commit/b4b829a096111e89290d6d3daf04012c3041a965))

  Adds an additional check to the index.js side effect that causes Vue.use only to be called when it is a function.
