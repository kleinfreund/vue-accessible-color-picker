import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'

import pkg from './package.json' with { type: 'json' }

export default defineConfig({
	plugins: [
		vue(),
		dts({ rollupTypes: true }),
	],

	build: {
		lib: {
			entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
			fileName: 'ColorPicker',
			formats: ['es'],
		},
		rollupOptions: {
			output: {
				// Controls the file name of the CSS file.
				assetFileNames: 'ColorPicker.[ext]',
			},
			// Prevents bundling peer dependencies.
			external: Object.keys(pkg.peerDependencies),
		},
	},

	test: {
		environment: 'jsdom',
		coverage: {
			include: ['src'],
		},
	},
})
