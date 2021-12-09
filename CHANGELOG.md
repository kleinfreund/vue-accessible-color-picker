## [3.0.1](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v3.0.0...v3.0.1) (2021-11-04)


### Bug Fixes

* clicking color space not emitting color ([c68ea8a](https://github.com/kleinfreund/vue-accessible-color-picker/commit/c68ea8a0bc838c0578b7dba4fe58f5a63025b21b)), closes [#13](https://github.com/kleinfreund/vue-accessible-color-picker/issues/13)

## [3.0.0](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v2.1.0...v3.0.0) (2021-03-21)


### chore

* **types:** remove VueAccessibleColorPicker namespace ([696814f](https://github.com/kleinfreund/vue-accessible-color-picker/commit/696814f8d8f119499b535aba17808b0bd185215f))
* change default format to HSL ([2d746bc](https://github.com/kleinfreund/vue-accessible-color-picker/commit/2d746bc7aa28a9f7cb4c3535999c26bac9741e7e))


### Features

* improve color prop parsing ([8b74dbd](https://github.com/kleinfreund/vue-accessible-color-picker/commit/8b74dbd0d3a6bd502d62e1c367c999c8bc8d54d6))


### BREAKING CHANGES

* **types:** Removes the `VueAccessibleColorPicker` namespace from types.
* Changes the default color format from `'rgb'` to `'hsl'`. To upgrade without changing this in your application, you can pass `'rgb'` to the `defaultFormat` prop.
* Updates browser support on account of using `Object.fromEntries`. Most notably, Edge using the EdgeHTML engine and Safari versions before 12.2 are no longer supported. Please refer to the README.md file for the complete list.

## [2.1.0](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v2.0.0...v2.1.0) (2021-03-21)


### Features

* set different default format via prop ([4291e05](https://github.com/kleinfreund/vue-accessible-color-picker/commit/4291e058e19784d99060ad6354d159831da7628d))

## [2.0.0](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v1.1.2...v2.0.0) (2021-01-17)


### Features

* migrate to Vue.js version 3 ([26b8eb2](https://github.com/kleinfreund/vue-accessible-color-picker/commit/26b8eb2f30b8c57d65b26b71b62395a7e6295786))


### BREAKING CHANGES

* Migrates this package to use and be compatible with Vue.js 3. Upcoming versions of this package therefor no longer support Vue.js 2. Use the new application instance APIs to register components via `app.component`. The README.md file was updated to take these changes into account. Detailed instructions on the the general migration process to Vue.js 3 can be found in the [Vue 3 migration guide](https://v3.vuejs.org/guide/migration/introduction.html).
* Deprecates global component registration via side effect.
* Renames type `SupportedColorFormat` to `ColorFormat`.
* Removes type `ColorChannel` because it’s not a useful type.

Adds the vue package (`vue@^3.x`) as a peer dependency.

Removes some tests from index.test.js because they were testing the behavior of Vue.js itself rather than that of the index.js file.

## [1.1.2](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v1.1.1...v1.1.2) (2020-12-20)


### Bug Fixes

* **package:** bundle dist files ([9b15741](https://github.com/kleinfreund/vue-accessible-color-picker/commit/9b157413af303e749f8f9d70faef051f6af11f7b))

  Fixes the dist files missing from the published npm package. It seems that the `files` field in the package.json must not contain paths that start with `./`.

## [1.1.1](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v1.1.0...v1.1.1) (2020-12-20)

**Note**: This version cannot be used. Use version [1.1.2](https://github.com/kleinfreund/vue-accessible-color-picker/releases/tag/v1.1.2) instead.

Due to an issue with the package.json file’s `files` field, version [1.1.1](https://github.com/kleinfreund/vue-accessible-color-picker/releases/tag/v1.1.1) **does not** include the dist files in the published npm package. The issue was fixed in [9b15741](https://github.com/kleinfreund/vue-accessible-color-picker/commit/9b157413af303e749f8f9d70faef051f6af11f7b) and a new version of the package was released.


### Bug Fixes

* **package:** add exports and module fields to package.json ([5a9eda3](https://github.com/kleinfreund/vue-accessible-color-picker/commit/5a9eda391f437f99b7922e36894463f30d35a1fa))

  Adds the “exports” and “module” fields to the package.json file. Their values refer to the package’s main entry point (i.e. `./dist/vue-accessible-color-picker.js`).

## [1.1.0](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v1.0.1...v1.1.0)

**Note**: This version cannot be used. Use version [1.1.2](https://github.com/kleinfreund/vue-accessible-color-picker/releases/tag/v1.1.2) instead.

Due to an issue with the package.json file’s `files` field, version [1.1.0](https://github.com/kleinfreund/vue-accessible-color-picker/releases/tag/v1.1.0) **does not** include the dist files in the published npm package. The issue was fixed in [9b15741](https://github.com/kleinfreund/vue-accessible-color-picker/commit/9b157413af303e749f8f9d70faef051f6af11f7b) and a new version of the package was released.


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
