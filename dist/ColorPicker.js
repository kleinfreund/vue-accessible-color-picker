import { defineComponent as vt, ref as F, reactive as pt, computed as U, watch as dt, onMounted as mt, onBeforeUnmount as gt, openBlock as w, createElementBlock as y, createElementVNode as h, renderSlot as I, createTextVNode as q, createCommentVNode as X, Fragment as bt, renderList as wt, toDisplayString as yt } from "vue";
function M(t, e, s) {
  return Math.max(e, Math.min(t, s));
}
function xt(t, e) {
  if (typeof t == "string" || typeof e == "string")
    return t === e;
  for (const s in t)
    if (t[s] !== e[s])
      return !1;
  return !0;
}
function N(t) {
  const e = [], s = t.length > 5 ? 2 : 1;
  for (let o = 1; o < t.length; o += s) {
    const u = t.substring(o, o + s).repeat(s % 2 + 1), f = parseInt(u, 16);
    e.push(o === 3 * s + 1 ? f / 255 : f);
  }
  return e.length === 3 && e.push(1), {
    r: e[0],
    g: e[1],
    b: e[2],
    a: e[3]
  };
}
function Q(t) {
  const e = t.l / 100, s = e + t.s / 100 * Math.min(e, 1 - e), o = s === 0 ? 0 : 200 * (1 - e / s);
  return {
    h: t.h,
    s: o,
    v: s * 100,
    a: t.a
  };
}
function A(t) {
  let e = t.h % 360;
  e < 0 && (e += 360);
  const s = t.s / 100, o = t.l / 100;
  return {
    r: S(0, e, s, o) * 255,
    g: S(8, e, s, o) * 255,
    b: S(4, e, s, o) * 255,
    a: t.a
  };
}
function S(t, e, s, o) {
  const u = (t + e / 30) % 12, f = s * Math.min(o, 1 - o);
  return o - f * Math.max(-1, Math.min(u - 3, 9 - u, 1));
}
function Z(t) {
  const e = t.s / 100, s = t.v / 100, o = s * (1 - e / 2);
  return {
    h: t.h,
    s: o === 0 || o === 1 ? 0 : (s - o) / Math.min(o, 1 - o) * 100,
    l: o * 100,
    a: t.a
  };
}
function tt(t) {
  return {
    h: t.h,
    w: t.v * (100 - t.s) / 100,
    b: 100 - t.v,
    a: t.a
  };
}
function T(t) {
  return A(Z(t));
}
function x(t) {
  const e = t.w / 100, s = t.b / 100;
  let o, u;
  const f = e + s;
  return f >= 1 ? (o = 0, u = e / f) : (u = 1 - s, o = (1 - e / u) * 100), {
    h: t.h,
    s: o,
    v: u * 100,
    a: t.a
  };
}
function H(t) {
  const { r: e, g: s, b: o, a: u } = t, f = Math.min(e, s, o), v = Math.max(e, s, o), p = v - f, d = (v + f) / 2;
  let c = 0;
  p !== 0 && (v === e ? c = (s - o) / p + (s < o ? 6 : 0) : v === s ? c = (o - e) / p + 2 : v === o && (c = (e - s) / p + 4), c *= 60);
  let l = 0;
  return d !== 0 && d !== 255 && (l = (v - d) / Math.min(d, 255 - d)), {
    h: c,
    s: l * 100,
    l: d / 255 * 100,
    a: u
  };
}
function V(t) {
  return "#" + Object.values(t).map((e, s) => Math.round(s === 3 ? e * 255 : e).toString(16).padStart(2, "0")).join("");
}
function k(t) {
  return tt(Q(H(t)));
}
const Ct = {
  hex: {
    hex: (t) => t,
    hsl: (t) => H(N(t)),
    hsv: (t) => x(k(N(t))),
    hwb: (t) => k(N(t)),
    rgb: N
  },
  hsl: {
    hex: (t) => V(A(t)),
    hsl: (t) => t,
    hsv: Q,
    hwb: (t) => k(A(t)),
    rgb: A
  },
  hsv: {
    hex: (t) => V(T(t)),
    hsl: Z,
    hsv: (t) => t,
    hwb: tt,
    rgb: T
  },
  hwb: {
    hex: (t) => V(T(x(t))),
    hsl: (t) => H(T(x(t))),
    hsv: x,
    hwb: (t) => t,
    rgb: (t) => T(x(t))
  },
  rgb: {
    hex: V,
    hsl: H,
    hsv: (t) => x(k(t)),
    hwb: k,
    rgb: (t) => t
  }
};
function _t(t, e, s) {
  return Ct[t][e](s);
}
function Tt(t, e) {
  const s = t.toFixed(e);
  return s.includes(".") ? s.replace(/\.?0+$/, "") : s;
}
const kt = {
  deg: 1,
  grad: 0.9,
  rad: 180 / Math.PI,
  turn: 360
}, R = {
  from(t) {
    return t.endsWith("%") ? C.from(t, { referenceValue: 1 }) : g.from(t, { min: 0, max: 1 });
  },
  to(t) {
    return g.to(t);
  }
}, G = {
  from(t) {
    const e = t.match(/deg|g?rad|turn$/);
    if (e === null)
      return g.from(t);
    const s = e[0];
    return g.from(t.slice(0, -s.length)) * kt[s];
  },
  to(t) {
    return g.to(t);
  }
}, g = {
  from(t, { min: e = Number.NEGATIVE_INFINITY, max: s = Number.POSITIVE_INFINITY } = {}) {
    return t.endsWith(".") ? NaN : M(Number(t), e, s);
  },
  to(t) {
    return Tt(t, 2);
  }
}, C = {
  from(t, { referenceValue: e = 100, min: s = 0, max: o = 100 } = {}) {
    return t.endsWith("%") ? g.from(t.slice(0, -1), { min: s, max: o }) * e / 100 : NaN;
  },
  to(t) {
    return g.to(t) + "%";
  }
}, j = {
  from(t) {
    return t.endsWith("%") ? C.from(t, { referenceValue: 255 }) : g.from(t, { min: 0, max: 255 });
  },
  to(t) {
    return g.to(t);
  }
}, Mt = {
  hsl: {
    h: G,
    s: C,
    l: C,
    a: R
  },
  hwb: {
    h: G,
    w: C,
    b: C,
    a: R
  },
  rgb: {
    r: j,
    g: j,
    b: j,
    a: R
  }
};
function E(t, e) {
  return Mt[t][e];
}
function W({ format: t, color: e }, s) {
  if (t === "hex")
    return s && [5, 9].includes(e.length) ? e.substring(0, e.length - (e.length - 1) / 4) : e;
  const o = Object.entries(e).slice(0, s ? 3 : 4).map(([u, f]) => {
    const v = E(t, u);
    return (u === "a" ? "/ " : "") + v.to(f);
  });
  return `${t}(${o.join(" ")})`;
}
function et(t) {
  return /^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t);
}
function $t(t) {
  return "r" in t ? "rgb" : "w" in t ? "hwb" : "v" in t ? "hsv" : "s" in t ? "hsl" : null;
}
const J = {
  hsl: ["h", "s", "l", "a"],
  hwb: ["h", "w", "b", "a"],
  rgb: ["r", "g", "b", "a"]
};
function Ft(t) {
  if (typeof t != "string") {
    const p = $t(t);
    return p === null ? null : { format: p, color: t };
  }
  if (t.startsWith("#"))
    return et(t) ? { format: "hex", color: t } : null;
  if (!t.includes("(")) {
    const p = document.createElement("canvas").getContext("2d");
    p.fillStyle = t;
    const d = p.fillStyle;
    return d === "#000000" && t !== "black" ? null : { format: "hex", color: d };
  }
  const [e, s] = t.split("("), o = e.substring(0, 3);
  if (!(o in J))
    return null;
  const u = s.replace(/[,/)]/g, " ").replace(/\s+/g, " ").trim().split(" ");
  u.length === 3 && u.push("1");
  const f = J[o], v = Object.fromEntries(f.map((p, d) => {
    const c = E(o, p);
    return [
      p,
      c.from(u[d])
    ];
  }));
  return { format: o, color: v };
}
function It(t, e, s) {
  const o = t.getBoundingClientRect(), u = e - o.left, f = s - o.top;
  return {
    x: o.width === 0 ? 0 : M(u / o.width * 100, 0, 100),
    y: o.height === 0 ? 0 : M((1 - f / o.height) * 100, 0, 100)
  };
}
const Nt = { class: "vacp-range-input-group" }, Vt = ["for"], At = { class: "vacp-range-input-label-text vacp-range-input-label-text--hue" }, Ht = ["id", "value"], Et = ["for"], Lt = { class: "vacp-range-input-label-text vacp-range-input-label-text--alpha" }, Pt = ["id", "value"], Ot = /* @__PURE__ */ h("span", { class: "vacp-visually-hidden" }, "Copy color", -1), St = /* @__PURE__ */ h("svg", {
  class: "vacp-icon",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  width: "24",
  height: "24",
  viewBox: "0 0 32 32"
}, [
  /* @__PURE__ */ h("path", {
    d: "M25.313 28v-18.688h-14.625v18.688h14.625zM25.313 6.688c1.438 0 2.688 1.188 2.688 2.625v18.688c0 1.438-1.25 2.688-2.688 2.688h-14.625c-1.438 0-2.688-1.25-2.688-2.688v-18.688c0-1.438 1.25-2.625 2.688-2.625h14.625zM21.313 1.313v2.688h-16v18.688h-2.625v-18.688c0-1.438 1.188-2.688 2.625-2.688h16z",
    fill: "currentColor"
  })
], -1), Rt = { class: "vacp-color-inputs" }, jt = { class: "vacp-color-input-group" }, Wt = ["for"], Dt = /* @__PURE__ */ h("span", { class: "vacp-color-input-label-text" }, " Hex ", -1), zt = ["id", "value"], Kt = ["id", "for", "onInput"], Yt = { class: "vacp-color-input-label-text" }, Bt = ["id", "value", "onInput"], Ut = /* @__PURE__ */ h("span", { class: "vacp-visually-hidden" }, "Switch format", -1), qt = /* @__PURE__ */ h("svg", {
  class: "vacp-icon",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "15"
}, [
  /* @__PURE__ */ h("path", {
    d: "M8 15l5-5-1-1-4 2-4-2-1 1zm4-9l1-1-5-5-5 5 1 1 4-2z",
    fill: "currentColor"
  })
], -1), Xt = /* @__PURE__ */ vt({
  __name: "ColorPicker",
  props: {
    color: { default: "#ffffffff" },
    id: { default: "color-picker" },
    visibleFormats: { default: () => ["hex", "hsl", "hwb", "rgb"] },
    defaultFormat: { default: "hsl" },
    alphaChannel: { default: "show" }
  },
  emits: ["color-change"],
  setup(t, { emit: e }) {
    const s = ["hex", "hsl", "hsv", "hwb", "rgb"], o = t, u = e, f = F(null), v = F(null), p = F(null);
    let d = !1;
    const c = F(o.visibleFormats.includes(o.defaultFormat) ? o.defaultFormat : o.visibleFormats[0]), l = pt({
      hex: "#ffffffff",
      hsl: { h: 0, s: 0, l: 100, a: 1 },
      hsv: { h: 0, s: 0, v: 100, a: 1 },
      hwb: { h: 0, w: 100, b: 0, a: 1 },
      rgb: { r: 255, g: 255, b: 255, a: 1 }
    }), nt = U(function() {
      const n = Object.keys(l[c.value]);
      return c.value !== "hex" && o.alphaChannel === "hide" ? n.slice(0, 3) : n;
    }), ot = U(function() {
      return o.alphaChannel === "hide" && [5, 9].includes(l.hex.length) ? l.hex.substring(0, l.hex.length - (l.hex.length - 1) / 4) : l.hex;
    });
    dt(() => o.color, z), mt(function() {
      document.addEventListener("mousemove", L, { passive: !1 }), document.addEventListener("touchmove", P, { passive: !1 }), document.addEventListener("mouseup", $), document.addEventListener("touchend", $), z(o.color);
    }), gt(function() {
      document.removeEventListener("mousemove", L), document.removeEventListener("touchmove", P), document.removeEventListener("mouseup", $), document.removeEventListener("touchend", $);
    });
    function st() {
      const r = (o.visibleFormats.findIndex((a) => a === c.value) + 1) % o.visibleFormats.length;
      c.value = o.visibleFormats[r];
    }
    function rt(n) {
      d = !0, L(n);
    }
    function at(n) {
      d = !0, P(n);
    }
    function $() {
      d = !1;
    }
    function L(n) {
      n.buttons !== 1 || d === !1 || !(v.value instanceof HTMLElement) || D(v.value, n.clientX, n.clientY);
    }
    function P(n) {
      if (d === !1 || !(v.value instanceof HTMLElement))
        return;
      n.preventDefault();
      const r = n.touches[0];
      D(v.value, r.clientX, r.clientY);
    }
    function D(n, r, a) {
      const i = It(n, r, a), m = Object.assign({}, l.hsv);
      m.s = i.x, m.v = i.y, b("hsv", m);
    }
    function lt(n) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(n.key))
        return;
      n.preventDefault();
      const r = ["ArrowLeft", "ArrowDown"].includes(n.key) ? -1 : 1, a = ["ArrowLeft", "ArrowRight"].includes(n.key) ? "s" : "v", i = n.shiftKey ? 10 : 1, m = l.hsv[a] + r * i, _ = Object.assign({}, l.hsv);
      _[a] = M(m, 0, 100), b("hsv", _);
    }
    function z(n) {
      const r = Ft(n);
      r !== null && b(r.format, r.color);
    }
    function K(n, r) {
      const a = n.currentTarget, i = Object.assign({}, l.hsv);
      i[r] = Number(a.value), b("hsv", i);
    }
    function it(n) {
      const r = n.target;
      et(r.value) && b("hex", r.value);
    }
    function Y(n, r) {
      const a = n.target, i = c.value, m = Object.assign({}, l[i]), O = E(i, r).from(a.value);
      Number.isNaN(O) || O === void 0 || (m[r] = O, b(i, m));
    }
    function b(n, r) {
      let a = r;
      if (o.alphaChannel === "hide")
        if (typeof r != "string")
          r.a = 1, a = r;
        else if ([5, 9].includes(r.length)) {
          const i = (r.length - 1) / 4;
          a = r.substring(0, r.length - i) + "f".repeat(i);
        } else
          [4, 7].includes(r.length) && (a = r + "f".repeat((r.length - 1) / 3));
      if (!xt(l[n], a)) {
        l[n] = a;
        for (const i of s)
          i !== n && (l[i] = _t(n, i, a));
        u("color-change", ft());
      }
      f.value instanceof HTMLElement && v.value instanceof HTMLElement && p.value instanceof HTMLElement && ht(f.value, v.value, p.value);
    }
    async function ut() {
      const n = l[c.value], r = o.alphaChannel === "hide", a = W({ color: n, format: c.value }, r);
      await window.navigator.clipboard.writeText(a);
    }
    function ct(n) {
      const r = c.value;
      return E(r, n).to(l[r][n]);
    }
    function ht(n, r, a) {
      const i = W({ format: "hsl", color: l.hsl }, !1);
      n.style.setProperty("--vacp-color", i), r.style.position = "relative", r.style.backgroundColor = `hsl(${l.hsl.h} 100% 50%)`, r.style.backgroundImage = "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)", a.style.boxSizing = "border-box", a.style.position = "absolute", a.style.left = `${l.hsv.s}%`, a.style.bottom = `${l.hsv.v}%`;
    }
    function ft() {
      const n = o.alphaChannel === "hide", r = W({ color: l[c.value], format: c.value }, n);
      return {
        colors: l,
        cssColor: r
      };
    }
    function B(n) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(n.key) || !n.shiftKey)
        return;
      const r = n.currentTarget, a = Number(r.step), i = ["ArrowLeft", "ArrowDown"].includes(n.key) ? -1 : 1, m = Number(r.value) + i * a * 10, _ = M(m, Number(r.min), Number(r.max));
      r.value = String(_ - i * a);
    }
    return (n, r) => (w(), y("div", {
      ref_key: "colorPicker",
      ref: f,
      class: "vacp-color-picker"
    }, [
      h("div", {
        ref_key: "colorSpace",
        ref: v,
        class: "vacp-color-space",
        onMousedown: rt,
        onTouchstart: at
      }, [
        h("div", {
          ref_key: "thumb",
          ref: p,
          class: "vacp-color-space-thumb",
          tabindex: "0",
          "aria-label": "Color space thumb",
          onKeydown: lt
        }, null, 544)
      ], 544),
      h("div", Nt, [
        h("label", {
          class: "vacp-range-input-label vacp-range-input-label--hue",
          for: `${n.id}-hue-slider`
        }, [
          h("span", At, [
            I(n.$slots, "hue-range-input-label", {}, () => [
              q("Hue")
            ])
          ]),
          h("input", {
            id: `${n.id}-hue-slider`,
            class: "vacp-range-input vacp-range-input--hue",
            value: l.hsv.h,
            type: "range",
            min: "0",
            max: "360",
            step: "1",
            onKeydownPassive: B,
            onInput: r[0] || (r[0] = (a) => K(a, "h"))
          }, null, 40, Ht)
        ], 8, Vt),
        n.alphaChannel === "show" ? (w(), y("label", {
          key: 0,
          class: "vacp-range-input-label vacp-range-input-label--alpha",
          for: `${n.id}-alpha-slider`
        }, [
          h("span", Lt, [
            I(n.$slots, "alpha-range-input-label", {}, () => [
              q("Alpha")
            ])
          ]),
          h("input", {
            id: `${n.id}-alpha-slider`,
            class: "vacp-range-input vacp-range-input--alpha",
            value: l.hsv.a,
            type: "range",
            min: "0",
            max: "1",
            step: "0.01",
            onKeydownPassive: B,
            onInput: r[1] || (r[1] = (a) => K(a, "a"))
          }, null, 40, Pt)
        ], 8, Et)) : X("", !0)
      ]),
      h("button", {
        class: "vacp-copy-button",
        type: "button",
        onClick: ut
      }, [
        I(n.$slots, "copy-button", {}, () => [
          Ot,
          St
        ])
      ]),
      h("div", Rt, [
        h("div", jt, [
          c.value === "hex" ? (w(), y("label", {
            key: 0,
            class: "vacp-color-input-label",
            for: `${n.id}-color-hex`
          }, [
            Dt,
            h("input", {
              id: `${n.id}-color-hex`,
              class: "vacp-color-input",
              type: "text",
              value: ot.value,
              onInput: it
            }, null, 40, zt)
          ], 8, Wt)) : (w(!0), y(bt, { key: 1 }, wt(nt.value, (a) => (w(), y("label", {
            id: `${n.id}-color-${c.value}-${a}-label`,
            key: `${n.id}-color-${c.value}-${a}-label`,
            class: "vacp-color-input-label",
            for: `${n.id}-color-${c.value}-${a}`,
            onInput: (i) => Y(i, a)
          }, [
            h("span", Yt, yt(a.toUpperCase()), 1),
            h("input", {
              id: `${n.id}-color-${c.value}-${a}`,
              class: "vacp-color-input",
              type: "text",
              value: ct(a),
              onInput: (i) => Y(i, a)
            }, null, 40, Bt)
          ], 40, Kt))), 128))
        ]),
        n.visibleFormats.length > 1 ? (w(), y("button", {
          key: 0,
          class: "vacp-format-switch-button",
          type: "button",
          onClick: st
        }, [
          I(n.$slots, "format-switch-button", {}, () => [
            Ut,
            qt
          ])
        ])) : X("", !0)
      ])
    ], 512));
  }
});
const Jt = {
  install(t) {
    t.component("ColorPicker", Xt);
  }
};
export {
  Xt as ColorPicker,
  Jt as default
};
