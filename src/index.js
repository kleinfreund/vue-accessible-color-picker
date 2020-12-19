import ColorPicker from './ColorPicker.vue'

/**
 * @param {any} Vue
 */
export function install (Vue) {
  if (install.installed) {
    return
  }

  install.installed = true

  Vue.component('ColorPicker', ColorPicker)
}

const plugin = {
  install,
}

if (typeof window !== 'undefined' && window.Vue && typeof window.Vue.use === 'function') {
  window.Vue.use(plugin)
} else if (typeof global !== 'undefined' && global.Vue && typeof global.Vue.use === 'function') {
  global.Vue.use(plugin)
}

export default plugin

export { ColorPicker }
