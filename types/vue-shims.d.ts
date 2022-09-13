// Fixes the following TypeScript error when importing a Vue single file component:
// Cannot find module './ColorPicker.vue' or its corresponding type declarations.

declare module '*.vue' {
	import { defineComponent } from 'vue'

	const component: ReturnType<typeof defineComponent>

	export default component
}
