import { defineComponent as se, useTemplateRef as K, ref as Y, computed as S, watch as ue, onMounted as ie, onBeforeUnmount as he, toRaw as me, createElementBlock as b, openBlock as g, normalizeStyle as M, unref as pe, createElementVNode as r, createCommentVNode as U, renderSlot as x, createTextVNode as X, Fragment as fe, renderList as de, toDisplayString as ve } from "vue";
import y from "colorjs.io";
function v(n, s, h) {
  return Math.max(s, Math.min(n, h));
}
function I(n, { format: s = "srgb", alpha: h = !0, collapse: a = !0 } = { format: "srgb", alpha: !0, collapse: !0 }) {
  const i = {
    alpha: h
  };
  s === "srgb" ? i.format = {
    name: "rgb",
    coords: ["<number>[0, 255]", "<number>[0, 255]", "<number>[0, 255]"]
  } : s === "hex" && (i.format = "hex", i.collapse = a);
  const f = s === "hex" ? "srgb" : s;
  return n.to(f).toString(i).replace(/none/g, "0");
}
function q(n, s, h) {
  const a = n.getBoundingClientRect(), i = s - a.left, f = h - a.top;
  return {
    x: a.width === 0 ? 0 : v(i / a.width * 100, 0, 100),
    y: a.height === 0 ? 0 : v((1 - f / a.height) * 100, 0, 100)
  };
}
const be = {
  deg: 1,
  grad: 0.9,
  rad: 180 / Math.PI,
  turn: 360
};
function ge() {
  const n = d(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, 1);
  return {
    from(s) {
      const h = s.match(/deg|g?rad|turn$/);
      if (h === null)
        return n.from(s);
      const a = h[0];
      return n.from(s.slice(0, -a.length)) * be[a];
    }
  };
}
function d(n, s, h) {
  return {
    from(a) {
      if (a.endsWith("%")) {
        const i = a.slice(0, -1);
        return i.endsWith(".") ? NaN : v(Number(i), 0, 100) * h / 100;
      }
      return a.endsWith(".") ? NaN : v(Number(a), n, s);
    }
  };
}
const j = 5, ye = d(0, 1, 1), A = ge(), w = d(0, 100, 100), J = d(-125, 125, 1), we = d(0, 150, 1), Q = d(0, 1, 1), Z = d(-0.4, 0.4, 1), Te = d(0, 0.4, 1), V = d(0, 255, 255), H = {
  channel: "alpha",
  label: "Alpha",
  preferredType: "<number>",
  from: ye.from
}, _ = {
  hsl: [
    {
      channel: "h",
      label: "H",
      preferredType: "<number>",
      from: A.from
    },
    {
      channel: "s",
      label: "S",
      preferredType: "<percentage>",
      from: w.from
    },
    {
      channel: "l",
      label: "L",
      preferredType: "<percentage>",
      from: w.from
    }
  ],
  hwb: [
    {
      channel: "h",
      label: "H",
      preferredType: "<number>",
      from: A.from
    },
    {
      channel: "w",
      label: "W",
      preferredType: "<percentage>",
      from: w.from
    },
    {
      channel: "b",
      label: "B",
      preferredType: "<percentage>",
      from: w.from
    }
  ],
  lab: [
    {
      channel: "l",
      label: "L",
      preferredType: "<percentage>",
      from: w.from
    },
    {
      channel: "a",
      label: "a",
      preferredType: "<number>",
      from: J.from
    },
    {
      channel: "b",
      label: "b",
      preferredType: "<number>",
      from: J.from
    }
  ],
  lch: [
    {
      channel: "l",
      label: "L",
      preferredType: "<percentage>",
      from: w.from
    },
    {
      channel: "c",
      label: "C",
      preferredType: "<number>",
      from: we.from
    },
    {
      channel: "h",
      label: "H",
      preferredType: "<number>",
      from: A.from
    }
  ],
  oklab: [
    {
      channel: "l",
      label: "L",
      preferredType: "<percentage>",
      from: Q.from
    },
    {
      channel: "a",
      label: "a",
      preferredType: "<number>",
      from: Z.from
    },
    {
      channel: "b",
      label: "b",
      preferredType: "<number>",
      from: Z.from
    }
  ],
  oklch: [
    {
      channel: "l",
      label: "L",
      preferredType: "<percentage>",
      from: Q.from
    },
    {
      channel: "c",
      label: "C",
      preferredType: "<number>",
      from: Te.from
    },
    {
      channel: "h",
      label: "H",
      preferredType: "<number>",
      from: A.from
    }
  ],
  srgb: [
    {
      channel: "r",
      label: "R",
      preferredType: "<number>",
      from: V.from
    },
    {
      channel: "g",
      label: "G",
      preferredType: "<number>",
      from: V.from
    },
    {
      channel: "b",
      label: "B",
      preferredType: "<number>",
      from: V.from
    }
  ]
}, Ce = { class: "vacp-range-input-group" }, xe = ["for"], Ne = { class: "vacp-range-input-label-text vacp-range-input-label-text--hue" }, $e = ["id", "value"], ke = ["for"], Ie = { class: "vacp-range-input-label-text vacp-range-input-label-text--alpha" }, Ae = ["id", "value"], Fe = { class: "vacp-actions" }, Le = { class: "vacp-color-inputs" }, Ee = { class: "vacp-color-input-group" }, Pe = ["for"], Se = ["id", "value"], Me = ["id", "for"], Ve = { class: "vacp-color-input-label-text" }, He = ["id", "value"], De = /* @__PURE__ */ se({
  __name: "ColorPicker",
  props: {
    color: { default: "#ffffffff" },
    copy: { type: Function, default: void 0 },
    id: { default: "color-picker" },
    visibleFormats: { default: () => ["hex", "hsl", "hwb", "srgb"] },
    defaultFormat: { default: "hsl" },
    alphaChannel: { default: "show" }
  },
  emits: ["color-change", "color-copy"],
  setup(n, { expose: s, emit: h }) {
    const a = h;
    s({
      copyColor: z,
      switchFormat: D
    });
    const i = K("colorPicker"), f = K("colorSpaceRef");
    let T = !1;
    const m = Y(n.visibleFormats.includes(n.defaultFormat) ? n.defaultFormat : n.visibleFormats[0]), l = Y(new y("srgb", [1, 1, 1], 1)), ee = S(function() {
      const e = m.value, t = l.value.space.getFormat("default").coords;
      return _[e].map(({ channel: o, label: c, preferredType: u }, p) => {
        const C = l.value.to(e);
        C.toGamut();
        const k = t[p];
        return { value: (k.find(({ type: ce }) => ce === u) ?? k.at(0)).serialize(C.coords[p] ?? 0, j), channel: o, label: c };
      }).concat(n.alphaChannel === "show" ? [{
        value: l.value.alpha.toPrecision(j).replace(/\.?0+$/, ""),
        channel: H.channel,
        label: H.label
      }] : []);
    }), te = S(function() {
      return I(l.value, { format: "hex", alpha: n.alphaChannel === "show" });
    }), F = S(function() {
      const e = l.value.to("hsv");
      return e.toGamut(), e;
    });
    ue(() => n.color, R, { immediate: !0 }), ie(function() {
      document.addEventListener("pointermove", L, { passive: !1 }), document.addEventListener("touchmove", E, { passive: !1 }), document.addEventListener("pointerup", N), document.addEventListener("touchend", N);
    }), he(function() {
      document.removeEventListener("pointermove", L), document.removeEventListener("touchmove", E), document.removeEventListener("pointerup", N), document.removeEventListener("touchend", N);
    });
    function D() {
      const t = (n.visibleFormats.findIndex((o) => o === m.value) + 1) % n.visibleFormats.length;
      m.value = n.visibleFormats[t];
    }
    function ne(e) {
      T = !0, L(e);
    }
    function oe(e) {
      T = !0, E(e);
    }
    function N() {
      T = !1;
    }
    function L(e) {
      e.buttons !== 1 || !T || !(f.value instanceof HTMLElement) || P(q(f.value, e.clientX, e.clientY));
    }
    function E(e) {
      if (!T || !(f.value instanceof HTMLElement))
        return;
      e.preventDefault();
      const t = e.touches[0];
      P(q(f.value, t.clientX, t.clientY));
    }
    function P({ x: e, y: t }) {
      const o = l.value.to("hsv");
      o.toGamut(), $(new y("hsv", [o.h ?? 0, e, t], l.value.alpha));
    }
    function re(e) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(e.key))
        return;
      e.preventDefault();
      const t = ["ArrowLeft", "ArrowDown"].includes(e.key) ? -1 : 1, o = ["ArrowLeft", "ArrowRight"].includes(e.key) ? "s" : "v", c = e.shiftKey ? 10 : 1, u = l.value.to("hsv");
      u.toGamut();
      const p = u.s ?? 0, C = u.v ?? 0, k = o === "s" ? v(p + t * c, 0, 100) : p, O = o === "v" ? v(C + t * c, 0, 100) : C;
      P({ x: k, y: O });
    }
    function R(e) {
      let t;
      try {
        t = e instanceof y ? e : new y(e);
      } catch (o) {
        if (o instanceof TypeError)
          return;
        throw o;
      }
      $(t);
    }
    function W(e, t) {
      const o = e.currentTarget, c = t === "alpha" ? Number(o.value) : l.value.alpha, u = l.value.to("hsl");
      u.toGamut();
      const p = t === "h" ? Number(o.value) : u.h ?? 0;
      $(new y("hsl", [p, u.s ?? 0, u.l ?? 0], c));
    }
    function ae(e) {
      const t = e.target;
      /^#(([A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t.value) && R(t.value);
    }
    function le() {
      const e = m.value, t = _[e].concat(n.alphaChannel === "show" ? [H] : []).map(({ channel: c, from: u }) => {
        const p = i.value.querySelector(`input[id="${n.id}-color-${e}-${c}"]`);
        return u(p.value);
      });
      if (t.some((c) => Number.isNaN(c)))
        return;
      const o = t.slice(0, 3);
      $(new y(e, o, t[3]));
    }
    function $(e) {
      Math.abs(l.value.distance(e)) < Number.EPSILON && l.value.alpha === e.alpha || (l.value = e, a("color-change", B()));
    }
    async function z() {
      const e = I(l.value, { format: m.value, alpha: n.alphaChannel === "show" });
      await (n.copy ? n.copy : (o) => window.navigator.clipboard.writeText(o))(e), a("color-copy", B());
    }
    function B() {
      return {
        color: me(l.value),
        cssColor: I(l.value, { format: m.value, alpha: n.alphaChannel === "show" })
      };
    }
    function G(e) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(e.key) || !e.shiftKey)
        return;
      const t = e.currentTarget, o = Number(t.step), c = ["ArrowLeft", "ArrowDown"].includes(e.key) ? -1 : 1, u = Number(t.value) + c * o * 10, p = v(u, Number(t.min), Number(t.max));
      t.value = String(p - c * o);
    }
    return (e, t) => (g(), b("div", {
      ref_key: "colorPicker",
      ref: i,
      class: "vacp-color-picker",
      style: M(`--vacp-color: ${pe(I)(l.value, { format: "hsl", alpha: !1 })}`)
    }, [
      r("div", {
        ref: "colorSpaceRef",
        class: "vacp-color-space",
        style: M(`position: relative; background: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${F.value.h} 100% 50%)`),
        onPointerdown: ne,
        onTouchstart: oe
      }, [
        r("div", {
          ref: "thumb",
          class: "vacp-color-space-thumb",
          tabindex: "0",
          "aria-label": "Color space thumb",
          style: M(`box-sizing: border-box; position: absolute; left: ${F.value.s}%; bottom: ${F.value.v}%;`),
          onKeydown: re
        }, null, 36)
      ], 36),
      r("div", Ce, [
        r("label", {
          class: "vacp-range-input-label vacp-range-input-label--hue",
          for: `${n.id}-hue-slider`
        }, [
          r("span", Ne, [
            x(e.$slots, "hue-range-input-label", {}, () => [
              t[2] || (t[2] = X("Hue", -1))
            ])
          ]),
          r("input", {
            id: `${n.id}-hue-slider`,
            class: "vacp-range-input vacp-range-input--hue",
            value: l.value.to("hsl").toGamut().h ?? 0,
            type: "range",
            min: "0",
            max: "360",
            step: "1",
            onKeydown: G,
            onInput: t[0] || (t[0] = (o) => W(o, "h"))
          }, null, 40, $e)
        ], 8, xe),
        n.alphaChannel === "show" ? (g(), b("label", {
          key: 0,
          class: "vacp-range-input-label vacp-range-input-label--alpha",
          for: `${n.id}-alpha-slider`
        }, [
          r("span", Ie, [
            x(e.$slots, "alpha-range-input-label", {}, () => [
              t[3] || (t[3] = X("Alpha", -1))
            ])
          ]),
          r("input", {
            id: `${n.id}-alpha-slider`,
            class: "vacp-range-input vacp-range-input--alpha",
            value: l.value.alpha,
            type: "range",
            min: "0",
            max: "1",
            step: "0.01",
            onKeydown: G,
            onInput: t[1] || (t[1] = (o) => W(o, "alpha"))
          }, null, 40, Ae)
        ], 8, ke)) : U("", !0)
      ]),
      r("div", Fe, [
        r("button", {
          class: "vacp-copy-button",
          type: "button",
          onClick: z
        }, [
          x(e.$slots, "copy-button", {}, () => [
            t[4] || (t[4] = r("span", { class: "vacp-visually-hidden" }, "Copy color", -1)),
            t[5] || (t[5] = r("svg", {
              class: "vacp-icon",
              xmlns: "http://www.w3.org/2000/svg",
              "aria-hidden": "true",
              width: "24",
              height: "24",
              viewBox: "0 0 32 32"
            }, [
              r("path", {
                d: "M25.313 28v-18.688h-14.625v18.688h14.625zM25.313 6.688c1.438 0 2.688 1.188 2.688 2.625v18.688c0 1.438-1.25 2.688-2.688 2.688h-14.625c-1.438 0-2.688-1.25-2.688-2.688v-18.688c0-1.438 1.25-2.625 2.688-2.625h14.625zM21.313 1.313v2.688h-16v18.688h-2.625v-18.688c0-1.438 1.188-2.688 2.625-2.688h16z",
                fill: "currentColor"
              })
            ], -1))
          ])
        ]),
        x(e.$slots, "actions")
      ]),
      r("div", Le, [
        r("div", Ee, [
          m.value === "hex" ? (g(), b("label", {
            key: 0,
            class: "vacp-color-input-label",
            for: `${n.id}-color-hex`
          }, [
            t[6] || (t[6] = r("span", { class: "vacp-color-input-label-text" }, " Hex ", -1)),
            r("input", {
              id: `${n.id}-color-hex`,
              class: "vacp-color-input",
              type: "text",
              value: te.value,
              onChange: ae
            }, null, 40, Se)
          ], 8, Pe)) : (g(!0), b(fe, { key: 1 }, de(ee.value, ({ value: o, channel: c, label: u }) => (g(), b("label", {
            id: `${n.id}-color-${m.value}-${c}-label`,
            key: `${n.id}-color-${m.value}-${c}-label`,
            class: "vacp-color-input-label",
            for: `${n.id}-color-${m.value}-${c}`
          }, [
            r("span", Ve, ve(u), 1),
            r("input", {
              id: `${n.id}-color-${m.value}-${c}`,
              class: "vacp-color-input",
              type: "text",
              value: o,
              onChange: le
            }, null, 40, He)
          ], 8, Me))), 128))
        ]),
        n.visibleFormats.length > 1 ? (g(), b("button", {
          key: 0,
          class: "vacp-format-switch-button",
          type: "button",
          onClick: D
        }, [
          x(e.$slots, "format-switch-button", {}, () => [
            t[7] || (t[7] = r("span", { class: "vacp-visually-hidden" }, "Switch format", -1)),
            t[8] || (t[8] = r("svg", {
              class: "vacp-icon",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "15"
            }, [
              r("path", {
                d: "M8 15l5-5-1-1-4 2-4-2-1 1zm4-9l1-1-5-5-5 5 1 1 4-2z",
                fill: "currentColor"
              })
            ], -1))
          ])
        ])) : U("", !0)
      ])
    ], 4));
  }
}), Be = {
  install(n) {
    n.component("ColorPicker", De);
  }
};
export {
  De as ColorPicker,
  Be as default
};
