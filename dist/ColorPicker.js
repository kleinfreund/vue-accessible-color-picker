import { Fragment as e, computed as t, createCommentVNode as n, createElementBlock as r, createElementVNode as i, createTextVNode as a, defineComponent as o, normalizeStyle as s, onBeforeUnmount as c, onMounted as ee, openBlock as l, ref as u, renderList as d, renderSlot as f, toDisplayString as p, toRaw as te, unref as ne, useTemplateRef as m, watch as h } from "vue";
import g from "colorjs.io";
//#region src/utilities/clamp.ts
function _(e, t, n) {
	return Math.max(t, Math.min(e, n));
}
//#endregion
//#region src/utilities/serialize.ts
function v(e, { format: t = "srgb", alpha: n = !0 } = {
	format: "srgb",
	alpha: !0
}) {
	let r = { alpha: n };
	t === "srgb" ? r.format = {
		name: "rgb",
		coords: [
			"<number>[0, 255]",
			"<number>[0, 255]",
			"<number>[0, 255]"
		]
	} : t === "hex" && (r.format = "hex", r.collapse = !0);
	let i = t === "hex" ? "srgb" : t;
	return e.to(i).toString(r).replace(/none/g, "0");
}
//#endregion
//#region src/utilities/getNewThumbPosition.ts
function y(e, t, n) {
	let r = e.getBoundingClientRect(), i = t - r.left, a = n - r.top;
	return {
		x: r.width === 0 ? 0 : _(i / r.width * 100, 0, 100),
		y: r.height === 0 ? 0 : _((1 - a / r.height) * 100, 0, 100)
	};
}
//#endregion
//#region src/utilities/CssValues.ts
var b = {
	deg: 1,
	grad: .9,
	rad: 180 / Math.PI,
	turn: 360
};
function x() {
	let e = S(-Infinity, Infinity, 1);
	return { from(t) {
		let n = t.match(/deg|g?rad|turn$/);
		if (n === null) return e.from(t);
		let r = n[0];
		return e.from(t.slice(0, -r.length)) * b[r];
	} };
}
function S(e, t, n) {
	return { from(r) {
		if (r.endsWith("%")) {
			let e = r.slice(0, -1);
			return e.endsWith(".") ? NaN : _(Number(e), 0, 100) * n / 100;
		}
		return r.endsWith(".") ? NaN : _(Number(r), e, t);
	} };
}
//#endregion
//#region src/constants.ts
var C = S(0, 1, 1), w = x(), T = S(0, 100, 100), E = S(-125, 125, 1), D = S(0, 150, 1), O = S(0, 1, 1), k = S(-.4, .4, 1), A = S(0, .4, 1), j = S(0, 255, 255), M = {
	channel: "alpha",
	label: "Alpha",
	preferredType: "<number>",
	from: C.from
}, N = {
	hsl: [
		{
			channel: "h",
			label: "H",
			preferredType: "<number>",
			from: w.from
		},
		{
			channel: "s",
			label: "S",
			preferredType: "<percentage>",
			from: T.from
		},
		{
			channel: "l",
			label: "L",
			preferredType: "<percentage>",
			from: T.from
		}
	],
	hwb: [
		{
			channel: "h",
			label: "H",
			preferredType: "<number>",
			from: w.from
		},
		{
			channel: "w",
			label: "W",
			preferredType: "<percentage>",
			from: T.from
		},
		{
			channel: "b",
			label: "B",
			preferredType: "<percentage>",
			from: T.from
		}
	],
	lab: [
		{
			channel: "l",
			label: "L",
			preferredType: "<percentage>",
			from: T.from
		},
		{
			channel: "a",
			label: "a",
			preferredType: "<number>",
			from: E.from
		},
		{
			channel: "b",
			label: "b",
			preferredType: "<number>",
			from: E.from
		}
	],
	lch: [
		{
			channel: "l",
			label: "L",
			preferredType: "<percentage>",
			from: T.from
		},
		{
			channel: "c",
			label: "C",
			preferredType: "<number>",
			from: D.from
		},
		{
			channel: "h",
			label: "H",
			preferredType: "<number>",
			from: w.from
		}
	],
	oklab: [
		{
			channel: "l",
			label: "L",
			preferredType: "<percentage>",
			from: O.from
		},
		{
			channel: "a",
			label: "a",
			preferredType: "<number>",
			from: k.from
		},
		{
			channel: "b",
			label: "b",
			preferredType: "<number>",
			from: k.from
		}
	],
	oklch: [
		{
			channel: "l",
			label: "L",
			preferredType: "<percentage>",
			from: O.from
		},
		{
			channel: "c",
			label: "C",
			preferredType: "<number>",
			from: A.from
		},
		{
			channel: "h",
			label: "H",
			preferredType: "<number>",
			from: w.from
		}
	],
	srgb: [
		{
			channel: "r",
			label: "R",
			preferredType: "<number>",
			from: j.from
		},
		{
			channel: "g",
			label: "G",
			preferredType: "<number>",
			from: j.from
		},
		{
			channel: "b",
			label: "B",
			preferredType: "<number>",
			from: j.from
		}
	]
}, re = { class: "vacp-range-input-group" }, ie = ["for"], ae = { class: "vacp-range-input-label-text vacp-range-input-label-text--hue" }, oe = ["id", "value"], se = ["for"], ce = { class: "vacp-range-input-label-text vacp-range-input-label-text--alpha" }, le = ["id", "value"], P = { class: "vacp-actions" }, F = { class: "vacp-color-inputs" }, I = { class: "vacp-color-input-group" }, L = ["for"], R = ["id", "value"], z = ["id", "for"], B = { class: "vacp-color-input-label-text" }, V = ["id", "value"], H = /* @__PURE__ */ o({
	__name: "ColorPicker",
	props: {
		color: { default: "#ffffffff" },
		copy: { type: Function },
		id: { default: "color-picker" },
		visibleFormats: { default: () => [
			"hex",
			"hsl",
			"hwb",
			"srgb"
		] },
		defaultFormat: { default: "hsl" },
		alphaChannel: { default: "show" }
	},
	emits: ["color-change", "color-copy"],
	setup(o, { expose: b, emit: x }) {
		let S = x;
		b({
			copyColor: Z,
			switchFormat: j
		});
		let C = m("colorPicker"), w = m("colorSpaceRef"), T = !1, E = u(o.visibleFormats.includes(o.defaultFormat) ? o.defaultFormat : o.visibleFormats[0]), D = u(new g("srgb", [
			1,
			1,
			1
		], 1)), O = t(function() {
			let e = E.value, t = D.value.space.getFormat("default").coords;
			return N[e].map(({ channel: n, label: r, preferredType: i }, a) => {
				let o = D.value.to(e);
				o.toGamut();
				let s = t[a];
				return {
					value: (s.find(({ type: e }) => e === i) ?? s.at(0)).serialize(o.coords[a] ?? 0, 5),
					channel: n,
					label: r
				};
			}).concat(o.alphaChannel === "show" ? [{
				value: D.value.alpha.toPrecision(5).replace(/\.?0+$/, ""),
				channel: M.channel,
				label: M.label
			}] : []);
		}), k = t(function() {
			return v(D.value, {
				format: "hex",
				alpha: o.alphaChannel === "show"
			});
		}), A = t(function() {
			let e = D.value.to("hsv");
			return e.toGamut(), e;
		});
		h(() => o.color, J, { immediate: !0 }), ee(function() {
			document.addEventListener("pointermove", G, { passive: !1 }), document.addEventListener("touchmove", K, { passive: !1 }), document.addEventListener("pointerup", W), document.addEventListener("touchend", W);
		}), c(function() {
			document.removeEventListener("pointermove", G), document.removeEventListener("touchmove", K), document.removeEventListener("pointerup", W), document.removeEventListener("touchend", W);
		});
		function j() {
			let e = (o.visibleFormats.findIndex((e) => e === E.value) + 1) % o.visibleFormats.length;
			E.value = o.visibleFormats[e];
		}
		function H(e) {
			T = !0, G(e);
		}
		function U(e) {
			T = !0, K(e);
		}
		function W() {
			T = !1;
		}
		function G(e) {
			e.buttons !== 1 || !T || !(w.value instanceof HTMLElement) || q(y(w.value, e.clientX, e.clientY));
		}
		function K(e) {
			if (!T || !(w.value instanceof HTMLElement)) return;
			e.preventDefault();
			let t = e.touches[0];
			q(y(w.value, t.clientX, t.clientY));
		}
		function q({ x: e, y: t }) {
			let n = D.value.to("hsv");
			n.toGamut(), X(new g("hsv", [
				n.h ?? 0,
				e,
				t
			], D.value.alpha));
		}
		function ue(e) {
			if (![
				"ArrowUp",
				"ArrowRight",
				"ArrowDown",
				"ArrowLeft"
			].includes(e.key)) return;
			e.preventDefault();
			let t = ["ArrowLeft", "ArrowDown"].includes(e.key) ? -1 : 1, n = ["ArrowLeft", "ArrowRight"].includes(e.key) ? "s" : "v", r = e.shiftKey ? 10 : 1, i = D.value.to("hsv");
			i.toGamut();
			let a = i.s ?? 0, o = i.v ?? 0;
			q({
				x: n === "s" ? _(a + t * r, 0, 100) : a,
				y: n === "v" ? _(o + t * r, 0, 100) : o
			});
		}
		function J(e) {
			let t;
			try {
				t = e instanceof g ? e : new g(e);
			} catch (e) {
				if (e instanceof TypeError) return;
				throw e;
			}
			X(t);
		}
		function Y(e, t) {
			let n = e.currentTarget, r = t === "alpha" ? Number(n.value) : D.value.alpha, i = D.value.to("hsl");
			i.toGamut(), X(new g("hsl", [
				t === "h" ? Number(n.value) : i.h ?? 0,
				i.s ?? 0,
				i.l ?? 0
			], r));
		}
		function de(e) {
			let t = e.target;
			/^#(([A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t.value) && J(t.value);
		}
		function fe() {
			let e = E.value, t = N[e].concat(o.alphaChannel === "show" ? [M] : []).map(({ channel: t, from: n }) => n(C.value.querySelector(`input[id="${o.id}-color-${e}-${t}"]`).value));
			t.some((e) => Number.isNaN(e)) || X(new g(e, t.slice(0, 3), t[3]));
		}
		function X(e) {
			Math.abs(D.value.distance(e)) < 2 ** -52 && D.value.alpha === e.alpha || (D.value = e, S("color-change", Q()));
		}
		async function Z() {
			let e = v(D.value, {
				format: E.value,
				alpha: o.alphaChannel === "show"
			});
			await (o.copy ? o.copy : (e) => window.navigator.clipboard.writeText(e))(e), S("color-copy", Q());
		}
		function Q() {
			return {
				color: te(D.value),
				cssColor: v(D.value, {
					format: E.value,
					alpha: o.alphaChannel === "show"
				})
			};
		}
		function $(e) {
			if (![
				"ArrowUp",
				"ArrowRight",
				"ArrowDown",
				"ArrowLeft"
			].includes(e.key) || !e.shiftKey) return;
			let t = e.currentTarget, n = Number(t.step), r = ["ArrowLeft", "ArrowDown"].includes(e.key) ? -1 : 1, i = _(Number(t.value) + r * n * 10, Number(t.min), Number(t.max));
			t.value = String(i - r * n);
		}
		return (t, c) => (l(), r("div", {
			ref_key: "colorPicker",
			ref: C,
			class: "vacp-color-picker",
			style: s(`--vacp-color: ${ne(v)(D.value, {
				format: "hsl",
				alpha: !1
			})}`)
		}, [
			i("div", {
				ref: "colorSpaceRef",
				class: "vacp-color-space",
				style: s(`position: relative; background: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${A.value.h} 100% 50%)`),
				onPointerdown: H,
				onTouchstart: U
			}, [i("div", {
				ref: "thumb",
				class: "vacp-color-space-thumb",
				tabindex: "0",
				"aria-label": "Color space thumb",
				style: s(`box-sizing: border-box; position: absolute; left: ${A.value.s}%; bottom: ${A.value.v}%;`),
				onKeydown: ue
			}, null, 36)], 36),
			i("div", re, [i("label", {
				class: "vacp-range-input-label vacp-range-input-label--hue",
				for: `${o.id}-hue-slider`
			}, [i("span", ae, [f(t.$slots, "hue-range-input-label", {}, () => [c[2] ||= a("Hue", -1)])]), i("input", {
				id: `${o.id}-hue-slider`,
				class: "vacp-range-input vacp-range-input--hue",
				value: D.value.to("hsl").toGamut().h ?? 0,
				type: "range",
				min: "0",
				max: "360",
				step: "1",
				onKeydown: $,
				onInput: c[0] ||= (e) => Y(e, "h")
			}, null, 40, oe)], 8, ie), o.alphaChannel === "show" ? (l(), r("label", {
				key: 0,
				class: "vacp-range-input-label vacp-range-input-label--alpha",
				for: `${o.id}-alpha-slider`
			}, [i("span", ce, [f(t.$slots, "alpha-range-input-label", {}, () => [c[3] ||= a("Alpha", -1)])]), i("input", {
				id: `${o.id}-alpha-slider`,
				class: "vacp-range-input vacp-range-input--alpha",
				value: D.value.alpha,
				type: "range",
				min: "0",
				max: "1",
				step: "0.01",
				onKeydown: $,
				onInput: c[1] ||= (e) => Y(e, "alpha")
			}, null, 40, le)], 8, se)) : n("", !0)]),
			i("div", P, [i("button", {
				class: "vacp-copy-button",
				type: "button",
				onClick: Z
			}, [f(t.$slots, "copy-button", {}, () => [c[4] ||= i("span", { class: "vacp-visually-hidden" }, "Copy color", -1), c[5] ||= i("svg", {
				class: "vacp-icon",
				xmlns: "http://www.w3.org/2000/svg",
				"aria-hidden": "true",
				width: "24",
				height: "24",
				viewBox: "0 0 32 32"
			}, [i("path", {
				d: "M25.313 28v-18.688h-14.625v18.688h14.625zM25.313 6.688c1.438 0 2.688 1.188 2.688 2.625v18.688c0 1.438-1.25 2.688-2.688 2.688h-14.625c-1.438 0-2.688-1.25-2.688-2.688v-18.688c0-1.438 1.25-2.625 2.688-2.625h14.625zM21.313 1.313v2.688h-16v18.688h-2.625v-18.688c0-1.438 1.188-2.688 2.625-2.688h16z",
				fill: "currentColor"
			})], -1)])]), f(t.$slots, "actions")]),
			i("div", F, [i("div", I, [E.value === "hex" ? (l(), r("label", {
				key: 0,
				class: "vacp-color-input-label",
				for: `${o.id}-color-hex`
			}, [c[6] ||= i("span", { class: "vacp-color-input-label-text" }, " Hex ", -1), i("input", {
				id: `${o.id}-color-hex`,
				class: "vacp-color-input",
				type: "text",
				value: k.value,
				onChange: de
			}, null, 40, R)], 8, L)) : (l(!0), r(e, { key: 1 }, d(O.value, ({ value: e, channel: t, label: n }) => (l(), r("label", {
				id: `${o.id}-color-${E.value}-${t}-label`,
				key: `${o.id}-color-${E.value}-${t}-label`,
				class: "vacp-color-input-label",
				for: `${o.id}-color-${E.value}-${t}`
			}, [i("span", B, p(n), 1), i("input", {
				id: `${o.id}-color-${E.value}-${t}`,
				class: "vacp-color-input",
				type: "text",
				value: e,
				onChange: fe
			}, null, 40, V)], 8, z))), 128))]), o.visibleFormats.length > 1 ? (l(), r("button", {
				key: 0,
				class: "vacp-format-switch-button",
				type: "button",
				onClick: j
			}, [f(t.$slots, "format-switch-button", {}, () => [c[7] ||= i("span", { class: "vacp-visually-hidden" }, "Switch format", -1), c[8] ||= i("svg", {
				class: "vacp-icon",
				"aria-hidden": "true",
				xmlns: "http://www.w3.org/2000/svg",
				width: "16",
				height: "15"
			}, [i("path", {
				d: "M8 15l5-5-1-1-4 2-4-2-1 1zm4-9l1-1-5-5-5 5 1 1 4-2z",
				fill: "currentColor"
			})], -1)])])) : n("", !0)])
		], 4));
	}
}), U = { install(e) {
	e.component("ColorPicker", H);
} };
//#endregion
export { H as ColorPicker, U as default };
