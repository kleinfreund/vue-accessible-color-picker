/// <reference types="vitest" />

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [
		Vue(),
	],

	test: {
		environment: 'jsdom',

		// Disables threads because they cause Node to run using workers which breaks JSDom’s usage of canvas (see https://github.com/vitest-dev/vitest/issues/740).
		// Note: Do not use `singleThread: true` instead (see https://github.com/vitest-dev/vitest/issues/2261).
		threads: false,
	},
})
