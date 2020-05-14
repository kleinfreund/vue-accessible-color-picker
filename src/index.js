import ColorPicker from './ColorPicker.vue'

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

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
} else if (typeof global !== 'undefined' && global.Vue) {
  global.Vue.use(plugin)
}

export default plugin

export { ColorPicker }
