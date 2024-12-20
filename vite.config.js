/// <reference types="vitest/config" />

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [
		vue(),
	],

	build: {
		emptyOutDir: false,
		lib: {
			entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
			fileName: 'ColorPicker',
			// Only emits an ESM bundle.
			formats: ['es'],
		},
		rollupOptions: {
			output: {
				// Controls the file name of the CSS file.
				assetFileNames: 'ColorPicker.[ext]',
			},
			// Prevents bundling vue.
			external: ['vue'],
		},
	},

	test: {
		environment: 'jsdom',
		coverage: {
			include: ['src'],
		},
	},
})
