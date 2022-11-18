## [4.1.2](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v4.1.1...v4.1.2) (2022-11-18)


### Bug Fixes

* more duplicate ID attributes ([fec5ff3](https://github.com/kleinfreund/vue-accessible-color-picker/commit/fec5ff3d44c53b81c962df5aba01ddd5d075a1d9))

## [4.1.1](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v4.1.0...v4.1.1) (2022-11-18)


### Bug Fixes

* duplicate ID attributes ([e8b5e00](https://github.com/kleinfreund/vue-accessible-color-picker/commit/e8b5e0022352b972d6b7c1282ee4918496682be4))

## [4.1.0](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v4.0.7...v4.1.0) (2022-10-06)


### Features

* reworks color picker styles ([ad9afb8](https://github.com/kleinfreund/vue-accessible-color-picker/commit/ad9afb813720515e9e64afa22b15b7ab7a3d1eac))

## [4.0.7](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v4.0.6...v4.0.7) (2022-10-06)


### Bug Fixes

* not falling back to visible format correctly ([9530d37](https://github.com/kleinfreund/vue-accessible-color-picker/commit/9530d37455933a58af8718527bea6844effa8fdd)), closes [#23](https://github.com/kleinfreund/vue-accessible-color-picker/issues/23)

## [4.0.6](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v4.0.5...v4.0.6) (2022-09-02)


### Bug Fixes

* css not being minified ([307e46b](https://github.com/kleinfreund/vue-accessible-color-picker/commit/307e46baf660e936c674a62185fb8585d4feb08c))

## [4.0.5](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v4.0.4...v4.0.5) (2022-08-27)


### Bug Fixes

* color picker initializing incorrectly without color prop ([065b5b1](https://github.com/kleinfreund/vue-accessible-color-picker/commit/065b5b16dc02af0d9740dd2b838f2050f6a3a7d5))

## [4.0.4](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v4.0.3...v4.0.4) (2022-08-07)


### Bug Fixes

* not always initially setting custom properties ([9ec0b64](https://github.com/kleinfreund/vue-accessible-color-picker/commit/9ec0b6442344a1553974f9a05594765bc69dc40a))

## [4.0.3](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v4.0.2...v4.0.3) (2022-05-30)


### Bug Fixes

* incorrectly reading hex color from prop ([9f31c3e](https://github.com/kleinfreund/vue-accessible-color-picker/commit/9f31c3eb39d4960b66fb097d083cc8c79c4b3e12))

## [4.0.2](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v4.0.1...v4.0.2) (2022-05-24)


### Bug Fixes

* incorrectly formatting hex colors with hidden alpha channel ([a849207](https://github.com/kleinfreund/vue-accessible-color-picker/commit/a8492073afe0f84f04f056ca1ea76bc27d94ec99)), closes [#112233](https://github.com/kleinfreund/vue-accessible-color-picker/issues/112233) [#1122](https://github.com/kleinfreund/vue-accessible-color-picker/issues/1122)

## [4.0.1](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v4.0.0...v4.0.1) (2022-05-23)


### Bug Fixes

* showing alpha channel of hex color in wrong scenario ([b301c5b](https://github.com/kleinfreund/vue-accessible-color-picker/commit/b301c5bee128600fc2141906deaeeb7272cb5b2a))

## [4.0.0](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v3.3.1...v4.0.0) (2022-04-03)


### Code Refactoring

* **dist:** make package ES module only ([3ab745b](https://github.com/kleinfreund/vue-accessible-color-picker/commit/3ab745b2d5d2e1c3f406ec0959a62743f2001e36))


### BREAKING CHANGES

* **dist:** Adds `"type": "package"` to the package.json file which indicates that this package is now distributed primarily (and solely) in the ES module format. Previously, the package was distributed in both ES and UMD module formats. Below is a list of the individual breaking changes regarding the package’s exposed module specifiers. If you want to know what module specifiers are, you can read up on the matter in the article “Publishing and consuming ECMAScript modules via packages – the big picture” by Dr. Axel Rauschmayer (https://2ality.com/2022/01/esm-specifiers.html#referring-to-ecmascript-modules-via-specifiers).
* **dist:** Changes the bare module specifiers “vue-accessible-color-picker” and “vue-accessible-color-picker/unstyled” to refer to ES modules instead of UMD modules.
* **dist:** Removes the bare module specifier “vue-accessible-color-picker/esm”. The same module is now referred to as “vue-accessible-color-picker”.
* **dist:** Removes the bare module specifier “vue-accessible-color-picker/esm/unstyled”. The same module is now referred to as “vue-accessible-color-picker/unstyled”.
* **dist:** Removes the bare module specifier “vue-accessible-color-picker/dist/vue-accessible-color-picker-unstyled.js”. Use “vue-accessible-color-picker/unstyled” instead.

## [3.3.1](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v3.3.0...v3.3.1) (2022-02-14)


### Bug Fixes

* **types:** declare ColorPicker type in type definitions ([dfe11f3](https://github.com/kleinfreund/vue-accessible-color-picker/commit/dfe11f3569dd945953a66196be0a5a6fc4d63532)), closes [#14](https://github.com/kleinfreund/vue-accessible-color-picker/issues/14)

## [3.3.0](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v3.2.0...v3.3.0) (2022-02-05)


### Features

* provide untranspiled ES module bundles ([ce1dc59](https://github.com/kleinfreund/vue-accessible-color-picker/commit/ce1dc59ab364329fd41db33127762dbacf4bce21))

## [3.2.0](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v3.1.0...v3.2.0) (2021-12-16)


### Features

* add prop for hiding alpha channel ([cdfce86](https://github.com/kleinfreund/vue-accessible-color-picker/commit/cdfce862dcee843ae8b07531f1bfe271c5107dbb))

## [3.1.0](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v3.0.1...v3.1.0) (2021-12-10)


### Features

* convert to script setup syntax ([70c59a5](https://github.com/kleinfreund/vue-accessible-color-picker/commit/70c59a5a1881e4899779dd46c7ae9cd4991a460b))

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
