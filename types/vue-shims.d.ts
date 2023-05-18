// Fixes the following TypeScript error when importing a Vue single file component:
// Cannot find module './ColorPicker.vue' or its corresponding type declarations.

declare module '*.vue' {
	import { DefineComponent } from 'vue'

	const component: DefineComponent<{}, {}, any>

	export default component
}
