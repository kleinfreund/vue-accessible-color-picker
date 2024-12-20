## [5.1.1](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v5.1.0...v5.1.1) (2024-12-20)

### Bug Fixes

* not using fully opaque color for alpha slider ([cd0772b](https://github.com/kleinfreund/vue-accessible-color-picker/commit/cd0772b76375679d65f6834f92879a9d56dd4e1c))

## [5.1.0](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v5.0.1...v5.1.0) (2024-10-20)

### Features

* add color-copy event ([910f12c](https://github.com/kleinfreund/vue-accessible-color-picker/commit/910f12c5f48d9a8475a8dd73e46792248d2bf214))

  Add a new event `copy-color` that is fired once a copy operation succeeded. Its event data is the same as that of the `color-change` event.

## [5.0.1](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v5.0.0...v5.0.1) (2023-11-23)


### Bug Fixes

* cannot find module TypeScript error ([577b4b4](https://github.com/kleinfreund/vue-accessible-color-picker/commit/577b4b4286d2d909c87d8b027bb073c6e8a1ae0d))

  Adds the types field back to the package.json file to prevent the "Cannot find module 'vue-accessible-color-picker' or its corresponding type declarations." error.

## [5.0.0](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v4.1.4...v5.0.0) (2023-11-23)


### ⚠ BREAKING CHANGES

* Renames the following CSS custom properties: `--vacp-border-color` → `--vacp-color-border`, `--vacp-border-width` → `--vacp-width-border`, `--vacp-color-space-width` → `--vacp-width-color-space`, `--vacp-focus-color` → `--vacp-color-focus` (see README.md for the full list of supported custom properties).
* Removes the following CSS custom properties: `--vacp-border` (direct replacement: `var(--vacp-width-border) solid var(--vacp-color-border)`), `--vacp-focus-outline` (direct replacement: `2px solid var(--vacp-color-focus)`).
* Changes how color objects provided to the `color` prop are handled. Color objects no longer use values that are constrained to the range [0, 1] (except for any alpha channel values). **How to update**: Multiply any value of objects you pass to the `color` prop by the number in parentheses corresponding to the right color channel: For HSL: h (360), s (100), l (100). For HWB: h (360), w (100), b (100). For RGB: r (255), g (255), b (255).
* Changes the data emitted by the `color-change` event such that the values on the `colors` object are no longer constrained to the range [0, 1] (except for any alpha channel values). **How to update**: Divide any value of objects from the `colors` object you mkae use of by the number in parentheses corresponding to the right color channel: For HSL: h (360), s (100), l (100). For HWB: h (360), w (100), b (100). For RGB: r (255), g (255), b (255).
* The component, when imported using the default module specifier `vue-accessible-color-picker`, no longer injects styles into the document. **How to update**: Import the styles either locally inside a Vue single file component's `style` block (using `@import url('vue-accessible-color-picker/styles');`) or globally in your application's entry point (commonly a main.js file somewhere).
* Removes the module specifier `vue-accessible-color-picker/unstyled`. It's no longer needed because `vue-accessible-color-picker` now resolves to a component without styles. **How to update**: Import from `vue-accessible-color-picker` instead.
* Removes the module specifier `vue-accessible-color-picker/types/index.d.ts`. **How to update**: Import from `vue-accessible-color-picker` instead.
* Renames the type `ColorChangeEvent` to `ColorChangeDetail`.


### Features

* make theming using custom properties easier ([e3147aa](https://github.com/kleinfreund/vue-accessible-color-picker/commit/e3147aa944a7e30bbe4256b74f44bb2bb14e2dbe))

  Simplifies theming of the color picker GUI with CSS custom properties by making better use of the CSS cascade. Customizing the custom properties (e.g. `--vacp-focus-color`) can now be done on any ancestor element of `.vacp-color-picker` in addition to `.vacp-color-picker` itself. For example, you can set `--vacp-focus-color: orange` on `:root` and it will work.

  Adds the following CSS custom properties for theming: `--vacp-color-background-input`, `--vacp-color-background`, `--vacp-color-text-input`, `--vacp-color-text`, `--vacp-font-family`, `--vacp-font-size` (see README.md for the full list of supported custom properties).

  **BREAKING CHANGE**: Renames the following CSS custom properties: `--vacp-border-color` → `--vacp-color-border`, `--vacp-border-width` → `--vacp-width-border`, `--vacp-color-space-width` → `--vacp-width-color-space`, `--vacp-focus-color` → `--vacp-color-focus` (see README.md for the full list of supported custom properties).

  **BREAKING CHANGE**: Removes the following CSS custom properties: `--vacp-border` (direct replacement: `var(--vacp-width-border) solid var(--vacp-color-border)`), `--vacp-focus-outline` (direct replacement: `2px solid var(--vacp-color-focus)`).

* support all angle values as input ([3fac65e](https://github.com/kleinfreund/vue-accessible-color-picker/commit/3fac65ed1b2fcf8f1c19dbce38410e5ccfae943b))

  Adds support for the angle value units `deg`, `grad`, `rad`, and `turn` when entering hues (see https://www.w3.org/TR/css-values-4/#angle-value).

  Stops normalizing angle values to the range [0, 360) (e.g. a hue value of 450 will no longer be processed, stored, and emitted as 90).


### Code Refactoring

* change color channels to not be constrained to the range [0, 1] ([93fce2c](https://github.com/kleinfreund/vue-accessible-color-picker/commit/93fce2cc442f5158b4d3fac7b2f9d13711e785a7))

  Changes how color objects are processed (via the `color` prop), stored, and emitted (via the `color-change` event) such that the representation of the current color doesn't have its values constrained to the range [0, 1] (inclusive) anymore. Instead, the values are now stored as close as possible to the native representation in CSS (e.g. the hue value 270 is now stored as 270 instead of 0.75). Alpha channel values continue to be stored in the range [0, 1].

  **BREAKING CHANGE**: Changes how color objects provided to the `color` prop are handled. Color objects no longer use values that are constrained to the range [0, 1] (except for any alpha channel values). **How to update**: Multiply any value of objects you pass to the `color` prop by the number in parentheses corresponding to the right color channel: For HSL: h (360), s (100), l (100). For HWB: h (360), w (100), b (100). For RGB: r (255), g (255), b (255).

  **BREAKING CHANGE**: Changes the data emitted by the `color-change` event such that the values on the `colors` object are no longer constrained to the range [0, 1] (except for any alpha channel values). **How to update**: Divide any value of objects from the `colors` object you mkae use of by the number in parentheses corresponding to the right color channel: For HSL: h (360), s (100), l (100). For HWB: h (360), w (100), b (100). For RGB: r (255), g (255), b (255).
* migrate code base to TypeScript ([18a2a98](https://github.com/kleinfreund/vue-accessible-color-picker/commit/18a2a98d894d859a248031aa9ef950001be8f843))

  Migrates the code base to TypeScript. This required a fundamental change in the build chain as some of the previously used Rollup plugins (`rollup-plugin-vue`, `rollup-plugin-typescript`, `rollup-plugin-typescript2`) are either not being maintained anymore and/or don't work well with the combination of Vue 3 and TypeScript. The project is now built using `vite` and `@vitejs/plugin-vue` (for building the component) and `vue-tsc` and `@microsoft/api-extractor` (for bundling the type definitions).

  **BREAKING CHANGE**: The component, when imported using the default module specifier `vue-accessible-color-picker`, no longer injects styles into the document. **How to update**: Import the styles either locally inside a Vue single file component's `style` block (using `@import url('vue-accessible-color-picker/styles');`) or globally in your application's entry point (commonly a main.js file somewhere).

  **BREAKING CHANGE**: Removes the module specifier `vue-accessible-color-picker/unstyled`. It's no longer needed because `vue-accessible-color-picker` now resolves to a component without styles. **How to update**: Import from `vue-accessible-color-picker` instead.

  **BREAKING CHANGE**: Removes the module specifier `vue-accessible-color-picker/types/index.d.ts`. **How to update**: Import from `vue-accessible-color-picker` instead.

  **BREAKING CHANGE**: Renames the type `ColorChangeEvent` to `ColorChangeDetail`.

## [4.1.4](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v4.1.3...v4.1.4) (2023-08-02)


### Bug Fixes

* not setting box-sizing on the color picker element ([651a0fd](https://github.com/kleinfreund/vue-accessible-color-picker/commit/651a0fd5fae87d3306f3c90fa50c8e94de88da28))

## [4.1.3](https://github.com/kleinfreund/vue-accessible-color-picker/compare/v4.1.2...v4.1.3) (2023-05-18)


### Bug Fixes

* types being misconfigured in pkg.exports ([c56cb99](https://github.com/kleinfreund/vue-accessible-color-picker/commit/c56cb994b4a6a93263dc088390e952a25b2c86c9))

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
