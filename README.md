# vue-accessible-color-picker

[![Tests passing](https://github.com/kleinfreund/vue-accessible-color-picker/workflows/tests/badge.svg)](https://github.com/kleinfreund/vue-accessible-color-picker/actions)

An accessible Vue.js color picker component.

Links:

- [demo](https://vue-accessible-color-picker.netlify.app)
- [**npmjs.com**/package/vue-accessible-color-picker](https://www.npmjs.com/package/vue-accessible-color-picker)
  - [on BundlePhobia](https://bundlephobia.com/result?p=vue-accessible-color-picker)
- [**github.com**/kleinfreund/vue-accessible-color-picker](https://github.com/kleinfreund/vue-accessible-color-picker)
  - [code of conduct](https://github.com/kleinfreund/vue-accessible-color-picker/blob/main/CODE_OF_CONDUCT.md)
  - [contributing guidelines](https://github.com/kleinfreund/vue-accessible-color-picker/blob/main/CONTRIBUTING.md)

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
  - [Props](#props)
    - [`color`](#color)
    - [`visibleFormats`](#visibleformats)
    - [`defaultFormat`](#defaultformat)
    - [`alphaChannel`](#alphachannel)
    - [`id`](#id)
  - [Events](#events)
    - [`color-change`](#color-change)
  - [Slots](#slots)
    - [hue-range-input-label](#hue-range-input-label)
    - [alpha-range-input-label](#alpha-range-input-label)
    - [copy-button](#copy-button)
    - [format-switch-button](#format-switch-button)
- [Browser support](#browser-support)
- [Versioning](#versioning)
- [Design](#design)

## Installation

```sh
npm install vue-accessible-color-picker
```

## Usage

### Register component locally

In a Vue single file component (SFC), import the `ColorPicker` plugin and register the component via the `components` property on the Vue instance. You can then use it in the file’s `template` section.

```html
<template>
  <ColorPicker />
</template>

<script>
import { ColorPicker } from 'vue-accessible-color-picker';

export default {
  components: {
    ColorPicker,
  },
}
</script>
```

**Unstyled component**:

If you want to use the unstyled variant of the component, you need to adjust the import statement slightly:

```js
import { ColorPicker } from 'vue-accessible-color-picker/dist/vue-accessible-color-picker-unstyled';
```

### Register component globally

Registering a component globally allows you to use it in all Vue templates without the need to register it via an SFC’s `components` property first.

In your Vue project’s `main.js` file (i.e. where you call `app.mount`), import the `ColorPicker` plugin and register the component using `app.component`.

```js
import { ColorPicker } from 'vue-accessible-color-picker';

app.component('ColorPicker', ColorPicker)
```

**Unstyled component**:

```js
import { ColorPicker } from 'vue-accessible-color-picker/dist/vue-accessible-color-picker-unstyled';

app.component('ColorPicker', ColorPicker)
```

## Documentation

### Props

#### `color`

- **Description**: Sets the color of the color picker. You can pass any valid CSS color string or an object matching the internal color representation for an HSL, HSV, HWB, or RGB color.
- **Type**: `string`, `ColorHsl`, `ColorHsv`, `ColorHwb`, or `ColorRgb`
- **Required**: `false`
- **Default**: `null`
- **Usage**:

  ```html
  <ColorPicker color="hsl(270 100% 50% / 0.8)" />
  ```

  ```html
  <ColorPicker color="#f80b" />
  ```

  ```html
  <ColorPicker :color="{ h: 0.75, s: 1, l: 0.5, a: 0.8 }" />
  ```

  ```html
  <template>
    <ColorPicker :color="color" @color-change="updateColor" />
  </template>

  <script>
  export default {
    data() {
      return {
        color: 'hsl(270 100% 50% / 0.8)',
      }
    },

    methods: {
      updateColor (eventData) {
        this.color = eventData.cssColor
      }
    },
  }
  </script>
  ```

#### `visibleFormats`

- **Description**: A list of visible color formats. Controls for which formats the color `input` elements are shown and in which order the formats will be cycled through when activating the format switch button.
- **Type**: `VisibleColorFormat[]`
- **Required**: `false`
- **Default**: `['hex', 'hsl', 'hwb', 'rgb']`
- **Usage**:

  ```html
  <ColorPicker :visible-formats="['hsl', 'hwb']" />
  ```

#### `defaultFormat`

- **Description**: The color format to show by default when rendering the color picker. Must be one of the formats specified in `visibleFormats`.
- **Type**: `VisibleColorFormat`
- **Required**: `false`
- **Default**: `'rgb'`
- **Usage**:

  ```html
  <ColorPicker default-format="hwb" />
  ```

#### `alphaChannel`

- **Description**: Whether to show input controls for a color’s alpha channel. If set to `'hide'`, the alpha range input and the alpha channel input are hidden, the “Copy color” button will copy a CSS color value without alpha channel, and the object emitted in a `color-change` event will have a `cssColor` property value without alpha channel.
- **Type**: `'show'` or `'hide'`
- **Required**: `false`
- **Default**: `'show'`
- **Usage**:

  ```html
  <ColorPicker alpha-channel="hide" />
  ```

#### `id`

- **Description**: The ID value will be used to prefix all `input` elements’ `id` and `label` elements’ `for` attribute values. Set this prop if you use multiple instances of the `color-picker` component on one page.
- **Type**: `string`
- **Required**: `false`
- **Default**: `'color-picker'`
- **Usage**:

  ```html
  <ColorPicker id="color-picker-1" />
  ```

### Events

#### `color-change`

- **Description**: An `input` event is emitted each time the internal colors object is updated.
- **Data**: The event emits an object containing both the internal colors object and a CSS color value as a string based on the currently active format. The `cssColor` property will respect `alphaChannel`.

  ```ts
  {
    colors: {
      hex: string
      hsl: ColorHsl
      hsv: ColorHsv
      hwb: ColorHwb
      rgb: ColorRgb
    }
    cssColor: string
  }
  ```

- **Usage**:

  ```html
  <template>
    <ColorPicker
      color="hsl(270 100% 50% / 0.8)"
      @color-change="updateColor"
    />
  </template>

  <script>
  export default {
    methods: {
      updateColor (eventData) {
        console.log(eventData)
      }
    },
  }
  </script>
  ```

### Slots

#### hue-range-input-label

- **Description**: Overrides the content of the hue range input’s `label` element. The slot content is placed inside a `span` element.
- **Default content**:

  > Hue

#### alpha-range-input-label

- **Description**: Overrides the content of the alpha range input’s `label` element. The slot content is placed inside a `span` element.
- **Default content**:

  > Alpha

#### copy-button

- **Description**: Overrides the content of the copy button element.
- **Default content**:

  > Copy color

#### format-switch-button

- **Description**: Overrides the content of the format switch button element.
- **Default content**:

  > Switch format

## Browser support

| Edge (Chromium) | Firefox | Chrome | Safari |
|:---------------:|:-------:|:------:|:------:|
| 79              | 63      | 73     | 12.2   |

The browser support is derived from the use of [Object.fromEntries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries) and [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).

## Versioning

This package uses [semantic versioning](https://semver.org).

## Design

The color picker consists of the following main elements:

- **Color space**:

  For fine-tuning the saturation and lightness/value, a slice of the HSV cylinder for the currently selected hue is shown.

  The HSV cylinder is more convenient for this task as it shows a color at 100% saturation and 100% value in the top right corner (i.e. one can drag the color space thumb into the corner as a quasi shortcut). The HSL cylinder’s slice has this color at the halfway point of the Y axis (i.e. at 50% lightness) which isn’t easy to select.

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
