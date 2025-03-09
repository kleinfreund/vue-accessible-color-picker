import { App, Plugin } from 'vue'

import ColorPicker from './ColorPicker.vue'

const plugin: Plugin = {
	install (app: App) {
		app.component('ColorPicker', ColorPicker)
	},
}

export { ColorPicker }

export default plugin

export type {
	ColorChangeDetail,
	ColorFormat,
	ColorPickerProps,
} from './types.js'
