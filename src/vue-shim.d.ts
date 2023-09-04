// Fixes the following TypeScript error when importing a Vue single file component:
// Cannot find module './ColorPicker.vue' or its corresponding type declarations.

declare module '*.vue' {
	import { DefineComponent } from 'vue'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const component: DefineComponent<object, object, any>
	export default component
}
