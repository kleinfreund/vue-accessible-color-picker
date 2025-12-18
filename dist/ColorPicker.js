import { defineComponent as ue, useTemplateRef as Y, ref as U, computed as M, watch as ie, onMounted as pe, onBeforeUnmount as he, toRaw as me, createElementBlock as b, openBlock as g, normalizeStyle as V, unref as fe, createElementVNode as a, createCommentVNode as X, renderSlot as x, createTextVNode as q, Fragment as de, renderList as ve, toDisplayString as be } from "vue";
import y from "colorjs.io";
function v(r, s, p) {
  return Math.max(s, Math.min(r, p));
}
function A(r, { format: s = "srgb", alpha: p = !0, collapse: o = !0 } = { format: "srgb", alpha: !0, collapse: !0 }) {
  const i = {
    alpha: p
  };
  s === "srgb" ? i.format = {
    name: "rgb",
    coords: ["<number>[0, 255]", "<number>[0, 255]", "<number>[0, 255]"]
  } : s === "hex" && (i.format = "hex", i.collapse = o);
  const d = s === "hex" ? "srgb" : s;
  return r.to(d).toString(i).replace(/none/g, "0");
}
function j(r, s, p) {
  const o = r.getBoundingClientRect(), i = s - o.left, d = p - o.top;
  return {
    x: o.width === 0 ? 0 : v(i / o.width * 100, 0, 100),
    y: o.height === 0 ? 0 : v((1 - d / o.height) * 100, 0, 100)
  };
}
const ge = {
  deg: 1,
  grad: 0.9,
  rad: 180 / Math.PI,
  turn: 360
};
function ye() {
  const r = f(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, 1);
  return {
    from(s) {
      const p = s.match(/deg|g?rad|turn$/);
      if (p === null)
        return r.from(s);
      const o = p[0];
      return r.from(s.slice(0, -o.length)) * ge[o];
    }
  };
}
function f(r, s, p) {
  return {
    from(o) {
      if (o.endsWith("%")) {
        const i = o.slice(0, -1);
        return i.endsWith(".") ? NaN : v(Number(i), 0, 100) * p / 100;
      }
      return o.endsWith(".") ? NaN : v(Number(o), r, s);
    }
  };
}
const J = 5, we = f(0, 1, 1), F = ye(), w = f(0, 100, 100), Q = f(-125, 125, 1), Te = f(0, 150, 1), Z = f(0, 1, 1), _ = f(-0.4, 0.4, 1), Ce = f(0, 0.4, 1), H = f(0, 255, 255), D = {
  channel: "alpha",
  label: "Alpha",
  preferredType: "<number>",
  from: we.from
}, ee = {
  hsl: [
    {
      channel: "h",
      label: "H",
      preferredType: "<number>",
      from: F.from
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
      from: F.from
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
      from: Q.from
    },
    {
      channel: "b",
      label: "b",
      preferredType: "<number>",
      from: Q.from
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
      from: Te.from
    },
    {
      channel: "h",
      label: "H",
      preferredType: "<number>",
      from: F.from
    }
  ],
  oklab: [
    {
      channel: "l",
      label: "L",
      preferredType: "<percentage>",
      from: Z.from
    },
    {
      channel: "a",
      label: "a",
      preferredType: "<number>",
      from: _.from
    },
    {
      channel: "b",
      label: "b",
      preferredType: "<number>",
      from: _.from
    }
  ],
  oklch: [
    {
      channel: "l",
      label: "L",
      preferredType: "<percentage>",
      from: Z.from
    },
    {
      channel: "c",
      label: "C",
      preferredType: "<number>",
      from: Ce.from
    },
    {
      channel: "h",
      label: "H",
      preferredType: "<number>",
      from: F.from
    }
  ],
  srgb: [
    {
      channel: "r",
      label: "R",
      preferredType: "<number>",
      from: H.from
    },
    {
      channel: "g",
      label: "G",
      preferredType: "<number>",
      from: H.from
    },
    {
      channel: "b",
      label: "B",
      preferredType: "<number>",
      from: H.from
    }
  ]
}, xe = { class: "vacp-range-input-group" }, Ne = ["for"], $e = { class: "vacp-range-input-label-text vacp-range-input-label-text--hue" }, ke = ["id", "value"], Ie = ["for"], Ae = { class: "vacp-range-input-label-text vacp-range-input-label-text--alpha" }, Fe = ["id", "value"], Le = { class: "vacp-actions" }, Ee = { class: "vacp-color-inputs" }, Pe = { class: "vacp-color-input-group" }, Se = ["for"], Me = ["id", "value"], Ve = ["id", "for"], He = { class: "vacp-color-input-label-text" }, De = ["id", "value"], Re = /* @__PURE__ */ ue({
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
  setup(r, { expose: s, emit: p }) {
    const o = r, i = p;
    s({
      copyColor: B,
      switchFormat: R
    });
    const d = Y("colorPicker"), N = Y("colorSpaceRef");
    let T = !1;
    const h = U(o.visibleFormats.includes(o.defaultFormat) ? o.defaultFormat : o.visibleFormats[0]), l = U(new y("srgb", [1, 1, 1], 1)), te = M(function() {
      const e = h.value, t = l.value.space.getFormat("default").coords;
      return ee[e].map(({ channel: n, label: c, preferredType: u }, m) => {
        const C = l.value.to(e);
        C.toGamut();
        const I = t[m];
        return { value: (I.find(({ type: se }) => se === u) ?? I.at(0)).serialize(C.coords[m] ?? 0, J), channel: n, label: c };
      }).concat(o.alphaChannel === "show" ? [{
        value: l.value.alpha.toPrecision(J).replace(/\.?0+$/, ""),
        channel: D.channel,
        label: D.label
      }] : []);
    }), oe = M(function() {
      return A(l.value, { format: "hex", alpha: o.alphaChannel === "show" });
    }), L = M(function() {
      const e = l.value.to("hsv");
      return e.toGamut(), e;
    });
    ie(() => o.color, W, { immediate: !0 }), pe(function() {
      document.addEventListener("pointermove", E, { passive: !1 }), document.addEventListener("touchmove", P, { passive: !1 }), document.addEventListener("pointerup", $), document.addEventListener("touchend", $);
    }), he(function() {
      document.removeEventListener("pointermove", E), document.removeEventListener("touchmove", P), document.removeEventListener("pointerup", $), document.removeEventListener("touchend", $);
    });
    function R() {
      const t = (o.visibleFormats.findIndex((n) => n === h.value) + 1) % o.visibleFormats.length;
      h.value = o.visibleFormats[t];
    }
    function ne(e) {
      T = !0, E(e);
    }
    function re(e) {
      T = !0, P(e);
    }
    function $() {
      T = !1;
    }
    function E(e) {
      e.buttons !== 1 || !T || !(N.value instanceof HTMLElement) || S(j(N.value, e.clientX, e.clientY));
    }
    function P(e) {
      if (!T || !(N.value instanceof HTMLElement))
        return;
      e.preventDefault();
      const t = e.touches[0];
      S(j(N.value, t.clientX, t.clientY));
    }
    function S({ x: e, y: t }) {
      const n = l.value.to("hsv");
      n.toGamut(), k(new y("hsv", [n.h ?? 0, e, t], l.value.alpha));
    }
    function ae(e) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(e.key))
        return;
      e.preventDefault();
      const t = ["ArrowLeft", "ArrowDown"].includes(e.key) ? -1 : 1, n = ["ArrowLeft", "ArrowRight"].includes(e.key) ? "s" : "v", c = e.shiftKey ? 10 : 1, u = l.value.to("hsv");
      u.toGamut();
      const m = u.s ?? 0, C = u.v ?? 0, I = n === "s" ? v(m + t * c, 0, 100) : m, K = n === "v" ? v(C + t * c, 0, 100) : C;
      S({ x: I, y: K });
    }
    function W(e) {
      let t;
      try {
        t = e instanceof y ? e : new y(e);
      } catch (n) {
        if (n instanceof TypeError)
          return;
        throw n;
      }
      k(t);
    }
    function z(e, t) {
      const n = e.currentTarget, c = t === "alpha" ? Number(n.value) : l.value.alpha, u = l.value.to("hsl");
      u.toGamut();
      const m = t === "h" ? Number(n.value) : u.h ?? 0;
      k(new y("hsl", [m, u.s ?? 0, u.l ?? 0], c));
    }
    function le(e) {
      const t = e.target;
      /^#(([A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t.value) && W(t.value);
    }
    function ce() {
      const e = h.value, t = ee[e].concat(o.alphaChannel === "show" ? [D] : []).map(({ channel: c, from: u }) => {
        const m = d.value.querySelector(`input[id="${o.id}-color-${e}-${c}"]`);
        return u(m.value);
      });
      if (t.some((c) => Number.isNaN(c)))
        return;
      const n = t.slice(0, 3);
      k(new y(e, n, t[3]));
    }
    function k(e) {
      Math.abs(l.value.distance(e)) < Number.EPSILON && l.value.alpha === e.alpha || (l.value = e, i("color-change", G()));
    }
    async function B() {
      const e = A(l.value, { format: h.value, alpha: o.alphaChannel === "show" });
      await (o.copy ? o.copy : (n) => window.navigator.clipboard.writeText(n))(e), i("color-copy", G());
    }
    function G() {
      return {
        color: me(l.value),
        cssColor: A(l.value, { format: h.value, alpha: o.alphaChannel === "show" })
      };
    }
    function O(e) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(e.key) || !e.shiftKey)
        return;
      const t = e.currentTarget, n = Number(t.step), c = ["ArrowLeft", "ArrowDown"].includes(e.key) ? -1 : 1, u = Number(t.value) + c * n * 10, m = v(u, Number(t.min), Number(t.max));
      t.value = String(m - c * n);
    }
    return (e, t) => (g(), b("div", {
      ref_key: "colorPicker",
      ref: d,
      class: "vacp-color-picker",
      style: V(`--vacp-color: ${fe(A)(l.value, { format: "hsl", alpha: !1 })}`)
    }, [
      a("div", {
        ref: "colorSpaceRef",
        class: "vacp-color-space",
        style: V(`position: relative; background: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${L.value.h} 100% 50%)`),
        onPointerdown: ne,
        onTouchstart: re
      }, [
        a("div", {
          ref: "thumb",
          class: "vacp-color-space-thumb",
          tabindex: "0",
          "aria-label": "Color space thumb",
          style: V(`box-sizing: border-box; position: absolute; left: ${L.value.s}%; bottom: ${L.value.v}%;`),
          onKeydown: ae
        }, null, 36)
      ], 36),
      a("div", xe, [
        a("label", {
          class: "vacp-range-input-label vacp-range-input-label--hue",
          for: `${r.id}-hue-slider`
        }, [
          a("span", $e, [
            x(e.$slots, "hue-range-input-label", {}, () => [
              t[2] || (t[2] = q("Hue", -1))
            ])
          ]),
          a("input", {
            id: `${r.id}-hue-slider`,
            class: "vacp-range-input vacp-range-input--hue",
            value: l.value.to("hsl").toGamut().h ?? 0,
            type: "range",
            min: "0",
            max: "360",
            step: "1",
            onKeydown: O,
            onInput: t[0] || (t[0] = (n) => z(n, "h"))
          }, null, 40, ke)
        ], 8, Ne),
        r.alphaChannel === "show" ? (g(), b("label", {
          key: 0,
          class: "vacp-range-input-label vacp-range-input-label--alpha",
          for: `${r.id}-alpha-slider`
        }, [
          a("span", Ae, [
            x(e.$slots, "alpha-range-input-label", {}, () => [
              t[3] || (t[3] = q("Alpha", -1))
            ])
          ]),
          a("input", {
            id: `${r.id}-alpha-slider`,
            class: "vacp-range-input vacp-range-input--alpha",
            value: l.value.alpha,
            type: "range",
            min: "0",
            max: "1",
            step: "0.01",
            onKeydown: O,
            onInput: t[1] || (t[1] = (n) => z(n, "alpha"))
          }, null, 40, Fe)
        ], 8, Ie)) : X("", !0)
      ]),
      a("div", Le, [
        a("button", {
          class: "vacp-copy-button",
          type: "button",
          onClick: B
        }, [
          x(e.$slots, "copy-button", {}, () => [
            t[4] || (t[4] = a("span", { class: "vacp-visually-hidden" }, "Copy color", -1)),
            t[5] || (t[5] = a("svg", {
              class: "vacp-icon",
              xmlns: "http://www.w3.org/2000/svg",
              "aria-hidden": "true",
              width: "24",
              height: "24",
              viewBox: "0 0 32 32"
            }, [
              a("path", {
                d: "M25.313 28v-18.688h-14.625v18.688h14.625zM25.313 6.688c1.438 0 2.688 1.188 2.688 2.625v18.688c0 1.438-1.25 2.688-2.688 2.688h-14.625c-1.438 0-2.688-1.25-2.688-2.688v-18.688c0-1.438 1.25-2.625 2.688-2.625h14.625zM21.313 1.313v2.688h-16v18.688h-2.625v-18.688c0-1.438 1.188-2.688 2.625-2.688h16z",
                fill: "currentColor"
              })
            ], -1))
          ])
        ]),
        x(e.$slots, "actions")
      ]),
      a("div", Ee, [
        a("div", Pe, [
          h.value === "hex" ? (g(), b("label", {
            key: 0,
            class: "vacp-color-input-label",
            for: `${r.id}-color-hex`
          }, [
            t[6] || (t[6] = a("span", { class: "vacp-color-input-label-text" }, " Hex ", -1)),
            a("input", {
              id: `${r.id}-color-hex`,
              class: "vacp-color-input",
              type: "text",
              value: oe.value,
              onChange: le
            }, null, 40, Me)
          ], 8, Se)) : (g(!0), b(de, { key: 1 }, ve(te.value, ({ value: n, channel: c, label: u }) => (g(), b("label", {
            id: `${r.id}-color-${h.value}-${c}-label`,
            key: `${r.id}-color-${h.value}-${c}-label`,
            class: "vacp-color-input-label",
            for: `${r.id}-color-${h.value}-${c}`
          }, [
            a("span", He, be(u), 1),
            a("input", {
              id: `${r.id}-color-${h.value}-${c}`,
              class: "vacp-color-input",
              type: "text",
              value: n,
              onChange: ce
            }, null, 40, De)
          ], 8, Ve))), 128))
        ]),
        r.visibleFormats.length > 1 ? (g(), b("button", {
          key: 0,
          class: "vacp-format-switch-button",
          type: "button",
          onClick: R
        }, [
          x(e.$slots, "format-switch-button", {}, () => [
            t[7] || (t[7] = a("span", { class: "vacp-visually-hidden" }, "Switch format", -1)),
            t[8] || (t[8] = a("svg", {
              class: "vacp-icon",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "15"
            }, [
              a("path", {
                d: "M8 15l5-5-1-1-4 2-4-2-1 1zm4-9l1-1-5-5-5 5 1 1 4-2z",
                fill: "currentColor"
              })
            ], -1))
          ])
        ])) : X("", !0)
      ])
    ], 4));
  }
}), Ge = {
  install(r) {
    r.component("ColorPicker", Re);
  }
};
export {
  Re as ColorPicker,
  Ge as default
};
