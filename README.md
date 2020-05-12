# vue-accessible-color-picker

An accessible Vue.js color picker component.

Links:

- [**npmjs.com**/package/vue-accessible-color-picker](https://www.npmjs.com/package/vue-accessible-color-picker)
- [**github.com**/kleinfreund/vue-accessible-color-picker](https://github.com/kleinfreund/vue-accessible-color-picker)
  - [Code of conduct](https://github.com/kleinfreund/vue-accessible-color-picker/blob/main/CODE_OF_CONDUCT.md)
  - [Contributing guidelines](https://github.com/kleinfreund/vue-accessible-color-picker/blob/main/CONTRIBUTING.md)

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
  - [Props](#props)
    - [`color`](#color)
    - [`visibleFormats`](#visibleformats)
    - [`id`](#id)
  - [Events](#events)
    - [`color-change`](#color-change)
  - [Slots](#slots)
    - [hue-range-input-label](#hue-range-input-label)
    - [alpha-range-input-label](#alpha-range-input-label)
    - [copy-button](#copy-button)
    - [format-switch-button](#format-switch-button)
- [Browser support](#browser-support)
- [Design](#design)
- [Roadmap](#roadmap)

## Installation

```sh
npm install vue-accessible-color-picker
```

## Usage

In your Vue project’s `main.js` (i.e. where you call `new Vue(…)`), import the `ColorPicker` component and register it with `Vue.use`.

```js
import ColorPicker from "vue-accessible-color-picker";

Vue.use(ColorPicker);
```

**Unstyled component**:

```js
import ColorPicker from "vue-accessible-color-picker/dist/vue-accessible-color-picker-unstyled";

Vue.use(ColorPicker);
```

## Documentation

### Props

#### `color`

- **Description**: Sets the color of the color picker. You can pass any valid CSS color string or an object matching the internal color representation for an HSL, HWB, or RGB color.
- **Type**: `string` or `object`
- **Required**: `false`
- **Default**: `null`
- **Usage**:

  ```html
  <color-picker color="hsl(270 100% 50% / 0.8)" />
  ```

  ```html
  <color-picker color="#f80b" />
  ```

  ```html
  <color-picker :color="{ h: 0.75, s: 1, l: 0.5, a: 0.8 }" />
  ```

  ```html
  <template>
    <color-picker :color="color" @color-change="updateColor" />
  </template>

  <script>
  export default {
    data() {
      return {
        color: 'hsl(270 100% 50% / 0.8)'
      }
    },

    methods: {
      updateColor (eventData) {
        this.color = eventData.cssColor
      }
    }
  }
  </script>
  ```

#### `visibleFormats`

- **Description**: A list of visible color formats. Controls for which formats the color `input` elements are shown and in which order the formats will be cycled through when activating the format switch button.
- **Type**: `array`
- **Required**: `false`
- **Default**: `['hex', 'hsl', 'hwb', 'rgb']`
- **Usage**:

  ```html
  <color-picker :visible-formats="['hsl', 'hwb']" />
  ```


#### `id`

- **Description**: The ID value will be used to prefix all `input` elements’ `id` and `label` elements’ `for` attribute values. Set this prop if you use multiple instances of the `color-picker` component on one page.
- **Type**: `string`
- **Required**: `false`
- **Default**: `'color-picker'`
- **Usage**:

  ```html
  <color-picker id="color-picker-1" />
  ```

### Events

#### `color-change`

- **Description**: An `input` event is emitted each time the internal colors object is updated.
- **Data**: The event emits an object containing both the internal colors object and a CSS color value as a string based on the currently active format.

  ```js
  {
    colors: {
      hex: string,
      hsl: object
      hsv: object,
      hwb: object,
      rgb: object
    },
    cssColor: string
  }
  ```

- **Usage**:

  ```html
  <template>
    <color-picker color="hsl(270 100% 50% / 0.8)" @color-change="updateColor" />
  </template>

  <script>
  export default {
    methods: {
      updateColor (eventData) {
        console.log(eventData)
      }
    }
  }
  </script>
  ```

### Slots

#### hue-range-input-label

- **Description**: Overrides the content of the hue range input’s `label` element. The slot content is placed inside a `span` element.
- **Default content**:

  ```html
  Hue
  ```

#### alpha-range-input-label

- **Description**: Overrides the content of the alpha range input’s `label` element. The slot content is placed inside a `span` element.
- **Default content**:

  ```html
  Alpha
  ```

#### copy-button

- **Description**: Overrides the content of the copy button element.
- **Default content**:

  ```html
  Copy color
  ```

#### format-switch-button

- **Description**: Overrides the content of the format switch button element.
- **Default content**:

  ```html
  Switch format
  ```

## Browser support

| IE | Edge | Edge (Chromium) | Firefox | Chrome | Safari |
|:--:|:----:|:---------------:|:-------:|:------:|:------:|
| no | 16   | 79              | 55      | 49     | 9.1    |

The component’s browser support is due to the use of [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) and [spread syntax in object literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).

## Design

The color picker consists of the following main elements:

- **Color space**:

  For fine-tuning the saturation and lightness/value, a slice of the HSV cylinder for the currently selected hue is shown.

  The HSV cylinder is more convenient for this task as it shows a color at 100% saturation and 100% value in the top right corner (i.e. one can drag the color space thumb into the corner as a quasi shortcut). The HSL cylinder’s slice has the this colors at the halfway point of the Y axis (i.e. at 50% lightness) which isn’t easy to hit.

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

## Roadmap

- **Feature**: Add Lab and LCH formats (see [CSS Color Module Level 4: Device-independent Colors: Lab and LCH](https://www.w3.org/TR/css-color-4/#lab-colors))
