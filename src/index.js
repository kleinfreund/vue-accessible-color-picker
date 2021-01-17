import ColorPicker from './ColorPicker.vue'

export default {
  /**
   * @param {import('vue').App} app
   */
  install (app) {
    app.component('ColorPicker', ColorPicker)
  },
}

export { ColorPicker }
