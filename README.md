# vue-accessible-color-picker

[![Tests passing](https://github.com/kleinfreund/vue-accessible-color-picker/workflows/Tests/badge.svg)](https://github.com/kleinfreund/vue-accessible-color-picker/actions)

A color picker component for Vue.js.

- Distributed in ES module format
- Not transpiled
- Uses [vue](https://www.npmjs.com/package/vue) (as a peer dependency)
- Uses [colorjs.io](https://www.npmjs.com/package/colorjs.io) (as a peer dependency) for color parsing, serialization, comparison, and conversion

Links:

- [demo](https://vue-accessible-color-picker.netlify.app)
- [**npmjs.com**/package/vue-accessible-color-picker](https://www.npmjs.com/package/vue-accessible-color-picker)
- [**github.com**/kleinfreund/vue-accessible-color-picker](https://github.com/kleinfreund/vue-accessible-color-picker)
	- [code of conduct](https://github.com/kleinfreund/vue-accessible-color-picker/blob/main/CODE_OF_CONDUCT.md)
	- [contributing guidelines](https://github.com/kleinfreund/vue-accessible-color-picker/blob/main/CONTRIBUTING.md)
- as a web component: [yet-another-color-picker](https://www.npmjs.com/package/yet-another-color-picker)

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
	- [Props](#props)
		- [`alphaChannel`](#alphachannel)
		- [`color`](#color)
		- [`copy`](#copy)
		- [`defaultFormat`](#defaultformat)
		- [`id`](#id)
		- [`visibleFormats`](#visibleformats)
	- [Exposed methods](#exposed-methods)
		- [`copyColor()`](#copycolor)
		- [`switchFormat()`](#switchformat)
	- [Events](#events)
		- [`color-change`](#color-change)
		- [`color-copy`](#color-copy)
	- [Slots](#slots)
		- [alpha-range-input-label](#alpha-range-input-label)
		- [copy-button](#copy-button)
		- [format-switch-button](#format-switch-button)
		- [hue-range-input-label](#hue-range-input-label)
	- [Theming](#theming)
- [Versioning](#versioning)
- [Design](#design)

## Installation

Install the package (and its peer dependencies).

```sh
npm install vue-accessible-color-picker vue@^3.5.0 colorjs.io@~0.6.0-beta.3
```

Note: this custom element uses colorjs.io and vue under the hood. These dependencies are _peer_ dependencies and will have to be installed as well.

## Usage

In a Vue single file component, import the `ColorPicker` component and its styles (if you want to use them).

```vue
<template>
	<ColorPicker />
</template>

<script setup>
import { ColorPicker } from 'vue-accessible-color-picker'
</script>

<style>
@import url('vue-accessible-color-picker/styles');
</style>
```

When using [Vue’s composition API](https://vuejs.org/guide/extras/composition-api-faq.html), you can directly use the component in the file’s `template` section once you import it.

You can also register the component and import the styles globally.

## Documentation

### Props

#### `alphaChannel`

- **Description**: Whether to show input controls for a color’s alpha channel. If set to `'hide'`, the alpha range input and the alpha channel input are hidden, the “Copy color” button will copy a CSS color value without alpha channel, and the object emitted in a `color-change` event will have a `cssColor` property value without alpha channel.
- **Type**: `'show'` or `'hide'`
- **Required**: No
- **Default**: `'show'`
- **Usage**:

	```vue
	<ColorPicker alpha-channel="hide" />
	```

#### `color`

- **Description**: Sets the color of the color picker. You can pass any valid CSS color string or an object matching the internal color representation for an HSL, HSV, HWB, or RGB color.
- **Type**: `string` or `Color` (see [colorjs.io: The Color Object](https://colorjs.io/docs/the-color-object))
- **Required**: No
- **Default**: `'#ffffffff'`
- **Usage**:

	```vue
	<ColorPicker color="hsl(270 100% 50% / 0.8)" />
	```

	```vue
	<ColorPicker color="#f80b" />
	```

	```vue
	<ColorPicker :color="new Color('hsl', [270, 100, 50], 0.8)" />
	```

	```vue
	<template>
		<ColorPicker
			:color="color"
			@color-change="updateColor"
		/>
	</template>

	<script setup>
	import { ref } from 'vue'
	import { ColorPicker } from 'vue-accessible-color-picker'

	const color = ref('hsl(270 100% 50% / 0.8)')

	function updateColor (eventData) {
		color.value = eventData.cssColor
	}
	</script>
	```
#### `copy`

- **Description**: A function that will be used in place of `window.navigator.clipboard.writeText` to
- **Type**: `(cssString: string) => Promise<void> | void`
- **Required**: No
- **Default**: `window.navigator.clipboard.writeText`
- **Usage**:

	```vue
	<ColorPicker :copy="customCopyFunction" />
	```

#### `defaultFormat`

- **Description**: The color format to show by default when rendering the color picker. Must be one of the formats specified in `visibleFormats`.
- **Type**: `ColorFormat`
- **Required**: No
- **Default**: `'hsl'`
- **Usage**:

	```vue
	<ColorPicker default-format="hwb" />
	```

#### `id`

- **Description**: The ID value will be used to prefix all `input` elements’ `id` and `label` elements’ `for` attribute values. Set this prop if you use multiple instances of the `color-picker` component on one page.
- **Type**: `string`
- **Required**: No
- **Default**: `'color-picker'`
- **Usage**:

	```vue
	<ColorPicker id="color-picker-1" />
	```

#### `visibleFormats`

- **Description**: A list of visible color formats. Controls for which formats the color `input` elements are shown and in which order the formats will be cycled through when activating the format switch button.
- **Type**: `ColorFormat[]`
- **Required**: No
- **Default**: `['hex', 'hsl', 'hwb', 'srgb']`
- **Usage**:

	```vue
	<ColorPicker :visible-formats="['hsl', 'hwb']" />
	```

### Exposed methods

Methods that are exposed on the Vue component instance.

#### copyColor

- **Description**: Copies the current color (determined by the active color format).

  This method behaves the same as activating the “Copy color” button.

  **Only works in secure browsing contexts (i.e. HTTPS) unless `props.copy` is provided**.
- **Return type**: `Promise<void>`
- **Usage**:

	Vue:
	```vue
	colorPicker.vm.copyColor()
	```

#### switchFormat

- **Description**: Sets the next active color format by cycling through `colorPicker.visibleFormats`. This method behaves the same as activating the “Switch format” button. To set a specific color format, use the [`format` property](#format).
- **Return type**: `void`
- **Usage**:

	Vue:
	```vue
	colorPicker.vm.switchFormat()
	```

### Events

#### `color-change`

- **Description**: Fired every time the color is changed.
- **Data**: The event emits an object containing both the internal `Color` object and a CSS color value as a string based on the currently active format. The `cssColor` property will respect `alphaChannel`.

	```ts
	{
		color: Color
		cssColor: string
	}
	```

- **Usage**:

	```vue
	<template>
		<ColorPicker
			color="hsl(270 100% 50% / 0.8)"
			@color-change="colorChanged"
		/>
	</template>

	<script setup>
	import { ColorPicker } from 'vue-accessible-color-picker'

	function colorChanged (eventData) {
		console.log(eventData)
	}
	</script>
	```

#### `color-copy`

- **Description**: The `color-copy` event is fired once a copy operation succeeded.
- **Data**: Emits the same event data as [the `color-change` event](#color-change).
- **Usage**:

	```vue
	<template>
		<ColorPicker
			color="hsl(270 100% 50% / 0.8)"
			@color-copy="colorCopied"
		/>
	</template>

	<script setup>
	import { ColorPicker } from 'vue-accessible-color-picker'

	function colorCopied (eventData) {
		console.log(eventData)
	}
	</script>
	```

### Slots

#### actions

- **Description**: Add additional content following the copy button.
- **Required**: No.
- **Default content**: _None._

#### alpha-range-input-label

- **Description**: Overrides the content of the alpha range input’s `label` element.
- **Required**: No.
- **Default content**: Alpha

#### copy-button

- **Description**: Overrides the content of the copy button element.
- **Required**: No.
- **Default content**: Copy color (and SVG icon)

#### format-switch-button

- **Description**: Overrides the content of the format switch button element.
- **Required**: No.
- **Default content**: Switch format (and SVG icon)

#### hue-range-input-label

- **Description**: Overrides the content of the hue range input’s `label` element.
- **Required**: No.
- **Default content**: Hue

### Theming

You can customize the GUI of the color picker using CSS custom properties:

```css
:root {
	--vacp-color-focus: tomato;
	--vacp-width-border: 2px;
}
```

Available custom properties and their default values:

| Custom property                 | Default value |
| ------------------------------- | ------------- |
| `--vacp-color-background-input` | `#fff`
| `--vacp-color-background`       | `#fff`
| `--vacp-color-border`           | `#000`
| `--vacp-color-focus`            | `#19f`
| `--vacp-color-text-input`       | `currentColor`
| `--vacp-color-text`             | `currentColor`
| `--vacp-font-family`            | `-apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif`
| `--vacp-font-size`              | `0.8em`
| `--vacp-spacing`                | `6px`
| `--vacp-width-border`           | `1px`
| `--vacp-width-color-space`      | `300px`

## Versioning

This package uses [semantic versioning](https://semver.org).

## Design

The color picker consists of the following main elements:

- **Color space**:

	For fine-tuning the saturation and lightness/value, a slice of the HSV cylinder for the currently selected hue is shown.

	The HSV cylinder is more convenient for this task than the HSL cylinder as it shows a color at 100% saturation and 100% value in the top right corner (i.e. one can drag the color space thumb into the corner as a quasi shortcut). The HSL cylinder’s slice has this color at the halfway point of the Y axis (i.e. at 50% lightness) which isn’t easy to select.

- **Hue slider**:

	A slider for selecting the current hue. This rotates the HSV cylinder; thus, it changes the slice of the HSV cylinder that’s shown in the color space.

- **Alpha slider**:

	A slider for selecting the current alpha value.

- **Copy button**:

	Copies the color formatted as a CSS color string in the active format.

- **Color inputs**:

	A set of text fields which allow you to enter the individual components of each color. The text fields are shown based on the active format.

- **Switch format button**:

	Cycles through the available color formats (currently HEX, HSL, HWB, and RGB).
