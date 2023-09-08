import { clamp } from './clamp.js'

export function getNewThumbPosition (colorSpace: HTMLElement, clientX: number, clientY: number): { x: number, y: number } {
	const rect = colorSpace.getBoundingClientRect()
	const x = clientX - rect.left
	const y = clientY - rect.top

	return {
		x: rect.width === 0 ? 0 : clamp((x / rect.width)*100, 0, 100),
		y: rect.height === 0 ? 0 : clamp((1 - y / rect.height)*100, 0, 100),
	}
}
