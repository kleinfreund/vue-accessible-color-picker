import ColorPicker from './ColorPicker.vue'

/** @type {import('vue').Plugin} */ const plugin = {
	/**
	 * @param {import('vue').App} app
	 */
	install (app) {
		app.component('ColorPicker', ColorPicker)
	},
}

export { ColorPicker }

export default plugin
