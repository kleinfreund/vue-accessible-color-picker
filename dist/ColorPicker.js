import { defineComponent as pt, ref as N, reactive as vt, computed as G, watch as dt, onMounted as mt, onBeforeUnmount as gt, openBlock as x, createElementBlock as C, createElementVNode as h, renderSlot as V, createTextVNode as J, createCommentVNode as Q, Fragment as bt, renderList as wt, toDisplayString as yt } from "vue";
function k(t, n, r) {
  return Math.max(n, Math.min(t, r));
}
function xt(t, n) {
  if (typeof t == "string" || typeof n == "string")
    return t === n;
  for (const r in t)
    if (t[r] !== n[r])
      return !1;
  return !0;
}
function A(t) {
  const n = [], r = t.length > 5 ? 2 : 1;
  for (let s = 1; s < t.length; s += r) {
    const a = t.substring(s, s + r).repeat(r % 2 + 1), f = parseInt(a, 16);
    n.push(s === 3 * r + 1 ? f / 255 : f);
  }
  return n.length === 3 && n.push(1), {
    r: n[0],
    g: n[1],
    b: n[2],
    a: n[3]
  };
}
function et(t) {
  const n = t.l / 100, r = n + t.s / 100 * Math.min(n, 1 - n), s = r === 0 ? 0 : 200 * (1 - n / r);
  return {
    h: t.h,
    s,
    v: r * 100,
    a: t.a
  };
}
function E(t) {
  let n = t.h % 360;
  n < 0 && (n += 360);
  const r = t.s / 100, s = t.l / 100;
  return {
    r: j(0, n, r, s) * 255,
    g: j(8, n, r, s) * 255,
    b: j(4, n, r, s) * 255,
    a: t.a
  };
}
function j(t, n, r, s) {
  const a = (t + n / 30) % 12, f = r * Math.min(s, 1 - s);
  return s - f * Math.max(-1, Math.min(a - 3, 9 - a, 1));
}
function nt(t) {
  const n = t.s / 100, r = t.v / 100, s = r * (1 - n / 2);
  return {
    h: t.h,
    s: s === 0 || s === 1 ? 0 : (r - s) / Math.min(s, 1 - s) * 100,
    l: s * 100,
    a: t.a
  };
}
function ot(t) {
  return {
    h: t.h,
    w: t.v * (100 - t.s) / 100,
    b: 100 - t.v,
    a: t.a
  };
}
function M(t) {
  return E(nt(t));
}
function T(t) {
  const n = t.w / 100, r = t.b / 100;
  let s, a;
  const f = n + r;
  return f >= 1 ? (s = 0, a = n / f) : (a = 1 - r, s = (1 - n / a) * 100), {
    h: t.h,
    s,
    v: a * 100,
    a: t.a
  };
}
function L(t) {
  const { r: n, g: r, b: s, a } = t, f = Math.min(n, r, s), d = Math.max(n, r, s), c = d - f, v = (d + f) / 2;
  let m = 0;
  c !== 0 && (d === n ? m = (r - s) / c + (r < s ? 6 : 0) : d === r ? m = (s - n) / c + 2 : d === s && (m = (n - r) / c + 4), m *= 60);
  let p = 0;
  return v !== 0 && v !== 255 && (p = (d - v) / Math.min(v, 255 - v)), {
    h: m,
    s: p * 100,
    l: v / 255 * 100,
    a
  };
}
function H(t) {
  return "#" + Object.values(t).map((n, r) => Math.round(r === 3 ? n * 255 : n).toString(16).padStart(2, "0")).join("");
}
function $(t) {
  return ot(et(L(t)));
}
const Ct = {
  hex: {
    hex: (t) => t,
    hsl: (t) => L(A(t)),
    hsv: (t) => T($(A(t))),
    hwb: (t) => $(A(t)),
    rgb: A
  },
  hsl: {
    hex: (t) => H(E(t)),
    hsl: (t) => t,
    hsv: et,
    hwb: (t) => $(E(t)),
    rgb: E
  },
  hsv: {
    hex: (t) => H(M(t)),
    hsl: nt,
    hsv: (t) => t,
    hwb: ot,
    rgb: M
  },
  hwb: {
    hex: (t) => H(M(T(t))),
    hsl: (t) => L(M(T(t))),
    hsv: T,
    hwb: (t) => t,
    rgb: (t) => M(T(t))
  },
  rgb: {
    hex: H,
    hsl: L,
    hsv: (t) => T($(t)),
    hwb: $,
    rgb: (t) => t
  }
};
function Tt(t, n, r) {
  return Ct[t][n](r);
}
function Ft(t, n) {
  const r = t.toFixed(n);
  return r.includes(".") ? r.replace(/\.?0+$/, "") : r;
}
const Mt = {
  deg: 1,
  grad: 0.9,
  rad: 180 / Math.PI,
  turn: 360
}, P = {
  from(t) {
    return t.endsWith("%") ? F.from(t, { referenceValue: 1 }) : w.from(t, { min: 0, max: 1 });
  },
  to(t) {
    return w.to(t);
  }
}, Z = {
  from(t) {
    const n = t.match(/deg|g?rad|turn$/);
    if (n === null)
      return w.from(t);
    const r = n[0];
    return w.from(t.slice(0, -r.length)) * Mt[r];
  },
  to(t) {
    return w.to(t);
  }
}, w = {
  from(t, { min: n = Number.NEGATIVE_INFINITY, max: r = Number.POSITIVE_INFINITY } = {}) {
    return t.endsWith(".") ? NaN : k(Number(t), n, r);
  },
  to(t) {
    return Ft(t, 2);
  }
}, F = {
  from(t, { referenceValue: n = 100, min: r = 0, max: s = 100 } = {}) {
    return t.endsWith("%") ? w.from(t.slice(0, -1), { min: r, max: s }) * n / 100 : NaN;
  },
  to(t) {
    return w.to(t) + "%";
  }
}, D = {
  from(t) {
    return t.endsWith("%") ? F.from(t, { referenceValue: 255 }) : w.from(t, { min: 0, max: 255 });
  },
  to(t) {
    return w.to(t);
  }
}, $t = {
  hsl: {
    h: Z,
    s: F,
    l: F
  },
  hwb: {
    h: Z,
    w: F,
    b: F
  },
  rgb: {
    r: D,
    g: D,
    b: D
  }
};
function S(t, n) {
  return $t[t][n];
}
function _({ format: t, color: n }, r) {
  if (t === "hex")
    return r && [5, 9].includes(n.length) ? n.substring(0, n.length - (n.length - 1) / 4) : n;
  const s = Object.entries(n).slice(0, r ? 3 : 4).map(([a, f]) => {
    const d = a === "a" ? P : S(t, a);
    return (a === "a" ? "/ " : "") + d.to(f);
  });
  return `${t}(${s.join(" ")})`;
}
function rt(t) {
  return /^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t);
}
function kt(t) {
  return "r" in t ? "rgb" : "w" in t ? "hwb" : "v" in t ? "hsv" : "s" in t ? "hsl" : null;
}
const tt = {
  hsl: ["h", "s", "l", "a"],
  hwb: ["h", "w", "b", "a"],
  rgb: ["r", "g", "b", "a"]
};
function It(t) {
  if (typeof t != "string") {
    const c = kt(t);
    return c === null ? null : { format: c, color: t };
  }
  if (t.startsWith("#"))
    return rt(t) ? { format: "hex", color: t } : null;
  if (!t.includes("(")) {
    const c = document.createElement("canvas").getContext("2d");
    c.fillStyle = t;
    const v = c.fillStyle;
    return v === "#000000" && t !== "black" ? null : { format: "hex", color: v };
  }
  const [n, r] = t.split("("), s = n.substring(0, 3);
  if (!(s in tt))
    return null;
  const a = r.replace(/[,/)]/g, " ").replace(/\s+/g, " ").trim().split(" ");
  a.length === 3 && a.push("1");
  const f = tt[s], d = Object.fromEntries(f.map((c, v) => {
    const m = c === "a" ? P : S(s, c);
    return [
      c,
      m.from(a[v])
    ];
  }));
  return { format: s, color: d };
}
function Nt(t, n, r) {
  const s = t.getBoundingClientRect(), a = n - s.left, f = r - s.top;
  return {
    x: s.width === 0 ? 0 : k(a / s.width * 100, 0, 100),
    y: s.height === 0 ? 0 : k((1 - f / s.height) * 100, 0, 100)
  };
}
const Vt = { class: "vacp-range-input-group" }, At = ["for"], Ht = { class: "vacp-range-input-label-text vacp-range-input-label-text--hue" }, Et = ["id", "value"], Lt = ["for"], Pt = { class: "vacp-range-input-label-text vacp-range-input-label-text--alpha" }, St = ["id", "value"], Ot = { class: "vacp-color-inputs" }, Rt = { class: "vacp-color-input-group" }, Wt = ["for"], jt = ["id", "value"], Dt = ["id", "for", "onInput"], _t = { class: "vacp-color-input-label-text" }, zt = ["id", "value", "onInput"], Kt = /* @__PURE__ */ pt({
  __name: "ColorPicker",
  props: {
    color: { default: "#ffffffff" },
    copy: { type: Function, default: void 0 },
    id: { default: "color-picker" },
    visibleFormats: { default: () => ["hex", "hsl", "hwb", "rgb"] },
    defaultFormat: { default: "hsl" },
    alphaChannel: { default: "show" }
  },
  emits: ["color-change", "color-copy"],
  setup(t, { expose: n, emit: r }) {
    const s = ["hex", "hsl", "hsv", "hwb", "rgb"], a = t, f = r;
    n({
      copyColor: U
    });
    const d = N(null), c = N(null), v = N(null);
    let m = !1;
    const p = N(a.visibleFormats.includes(a.defaultFormat) ? a.defaultFormat : a.visibleFormats[0]), u = vt({
      hex: "#ffffffff",
      hsl: { h: 0, s: 0, l: 100, a: 1 },
      hsv: { h: 0, s: 0, v: 100, a: 1 },
      hwb: { h: 0, w: 100, b: 0, a: 1 },
      rgb: { r: 255, g: 255, b: 255, a: 1 }
    }), st = G(function() {
      const o = p.value, e = u[o];
      return o.split("").map((l) => {
        const i = e[l];
        return {
          value: S(o, l).to(i),
          channel: l,
          label: l.toUpperCase()
        };
      }).concat(a.alphaChannel === "show" ? [{
        value: P.to(e.a),
        channel: "a",
        label: "Alpha"
      }] : []);
    }), at = G(function() {
      return a.alphaChannel === "hide" && [5, 9].includes(u.hex.length) ? u.hex.substring(0, u.hex.length - (u.hex.length - 1) / 4) : u.hex;
    });
    dt(() => a.color, K), mt(function() {
      document.addEventListener("mousemove", O, { passive: !1 }), document.addEventListener("touchmove", R, { passive: !1 }), document.addEventListener("mouseup", I), document.addEventListener("touchend", I), K(a.color);
    }), gt(function() {
      document.removeEventListener("mousemove", O), document.removeEventListener("touchmove", R), document.removeEventListener("mouseup", I), document.removeEventListener("touchend", I);
    });
    function lt() {
      const e = (a.visibleFormats.findIndex((l) => l === p.value) + 1) % a.visibleFormats.length;
      p.value = a.visibleFormats[e];
    }
    function it(o) {
      m = !0, O(o);
    }
    function ut(o) {
      m = !0, R(o);
    }
    function I() {
      m = !1;
    }
    function O(o) {
      o.buttons !== 1 || m === !1 || !(c.value instanceof HTMLElement) || z(c.value, o.clientX, o.clientY);
    }
    function R(o) {
      if (m === !1 || !(c.value instanceof HTMLElement))
        return;
      o.preventDefault();
      const e = o.touches[0];
      z(c.value, e.clientX, e.clientY);
    }
    function z(o, e, l) {
      const i = Nt(o, e, l), g = Object.assign({}, u.hsv);
      g.s = i.x, g.v = i.y, y("hsv", g);
    }
    function ct(o) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(o.key))
        return;
      o.preventDefault();
      const e = ["ArrowLeft", "ArrowDown"].includes(o.key) ? -1 : 1, l = ["ArrowLeft", "ArrowRight"].includes(o.key) ? "s" : "v", i = o.shiftKey ? 10 : 1, g = u.hsv[l] + e * i, b = Object.assign({}, u.hsv);
      b[l] = k(g, 0, 100), y("hsv", b);
    }
    function K(o) {
      const e = It(o);
      e !== null && y(e.format, e.color);
    }
    function Y(o, e) {
      const l = o.currentTarget, i = Object.assign({}, u.hsv);
      i[e] = Number(l.value), y("hsv", i);
    }
    function ht(o) {
      const e = o.target;
      rt(e.value) && y("hex", e.value);
    }
    function B(o, e) {
      const l = o.target, i = p.value, g = Object.assign({}, u[i]), W = (e === "a" ? P : S(i, e)).from(l.value);
      Number.isNaN(W) || W === void 0 || (g[e] = W, y(i, g));
    }
    function y(o, e) {
      let l = e;
      if (a.alphaChannel === "hide")
        if (typeof e != "string")
          e.a = 1, l = e;
        else if ([5, 9].includes(e.length)) {
          const i = (e.length - 1) / 4;
          l = e.substring(0, e.length - i) + "f".repeat(i);
        } else [4, 7].includes(e.length) && (l = e + "f".repeat((e.length - 1) / 3));
      if (!xt(u[o], l)) {
        u[o] = l;
        for (const i of s)
          i !== o && (u[i] = Tt(o, i, l));
        f("color-change", q());
      }
      d.value instanceof HTMLElement && c.value instanceof HTMLElement && v.value instanceof HTMLElement && ft(d.value, c.value, v.value);
    }
    async function U() {
      const o = u[p.value], e = a.alphaChannel === "hide", l = _({ color: o, format: p.value }, e);
      await (a.copy ? a.copy : window.navigator.clipboard.writeText)(l), f("color-copy", q());
    }
    function ft(o, e, l) {
      const i = _({ format: "hsl", color: u.hsl }, !0);
      o.style.setProperty("--vacp-color", i), e.style.position = "relative", e.style.backgroundColor = `hsl(${u.hsl.h} 100% 50%)`, e.style.backgroundImage = "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)", l.style.boxSizing = "border-box", l.style.position = "absolute", l.style.left = `${u.hsv.s}%`, l.style.bottom = `${u.hsv.v}%`;
    }
    function q() {
      const o = a.alphaChannel === "hide", e = _({ color: u[p.value], format: p.value }, o);
      return {
        colors: u,
        cssColor: e
      };
    }
    function X(o) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(o.key) || !o.shiftKey)
        return;
      const e = o.currentTarget, l = Number(e.step), i = ["ArrowLeft", "ArrowDown"].includes(o.key) ? -1 : 1, g = Number(e.value) + i * l * 10, b = k(g, Number(e.min), Number(e.max));
      e.value = String(b - i * l);
    }
    return (o, e) => (x(), C("div", {
      ref_key: "colorPicker",
      ref: d,
      class: "vacp-color-picker"
    }, [
      h("div", {
        ref_key: "colorSpace",
        ref: c,
        class: "vacp-color-space",
        onMousedown: it,
        onTouchstart: ut
      }, [
        h("div", {
          ref_key: "thumb",
          ref: v,
          class: "vacp-color-space-thumb",
          tabindex: "0",
          "aria-label": "Color space thumb",
          onKeydown: ct
        }, null, 544)
      ], 544),
      h("div", Vt, [
        h("label", {
          class: "vacp-range-input-label vacp-range-input-label--hue",
          for: `${o.id}-hue-slider`
        }, [
          h("span", Ht, [
            V(o.$slots, "hue-range-input-label", {}, () => [
              e[2] || (e[2] = J("Hue"))
            ])
          ]),
          h("input", {
            id: `${o.id}-hue-slider`,
            class: "vacp-range-input vacp-range-input--hue",
            value: u.hsv.h,
            type: "range",
            min: "0",
            max: "360",
            step: "1",
            onKeydownPassive: X,
            onInput: e[0] || (e[0] = (l) => Y(l, "h"))
          }, null, 40, Et)
        ], 8, At),
        o.alphaChannel === "show" ? (x(), C("label", {
          key: 0,
          class: "vacp-range-input-label vacp-range-input-label--alpha",
          for: `${o.id}-alpha-slider`
        }, [
          h("span", Pt, [
            V(o.$slots, "alpha-range-input-label", {}, () => [
              e[3] || (e[3] = J("Alpha"))
            ])
          ]),
          h("input", {
            id: `${o.id}-alpha-slider`,
            class: "vacp-range-input vacp-range-input--alpha",
            value: u.hsv.a,
            type: "range",
            min: "0",
            max: "1",
            step: "0.01",
            onKeydownPassive: X,
            onInput: e[1] || (e[1] = (l) => Y(l, "a"))
          }, null, 40, St)
        ], 8, Lt)) : Q("", !0)
      ]),
      h("button", {
        class: "vacp-copy-button",
        type: "button",
        onClick: U
      }, [
        V(o.$slots, "copy-button", {}, () => [
          e[4] || (e[4] = h("span", { class: "vacp-visually-hidden" }, "Copy color", -1)),
          e[5] || (e[5] = h("svg", {
            class: "vacp-icon",
            xmlns: "http://www.w3.org/2000/svg",
            "aria-hidden": "true",
            width: "24",
            height: "24",
            viewBox: "0 0 32 32"
          }, [
            h("path", {
              d: "M25.313 28v-18.688h-14.625v18.688h14.625zM25.313 6.688c1.438 0 2.688 1.188 2.688 2.625v18.688c0 1.438-1.25 2.688-2.688 2.688h-14.625c-1.438 0-2.688-1.25-2.688-2.688v-18.688c0-1.438 1.25-2.625 2.688-2.625h14.625zM21.313 1.313v2.688h-16v18.688h-2.625v-18.688c0-1.438 1.188-2.688 2.625-2.688h16z",
              fill: "currentColor"
            })
          ], -1))
        ])
      ]),
      h("div", Ot, [
        h("div", Rt, [
          p.value === "hex" ? (x(), C("label", {
            key: 0,
            class: "vacp-color-input-label",
            for: `${o.id}-color-hex`
          }, [
            e[6] || (e[6] = h("span", { class: "vacp-color-input-label-text" }, " Hex ", -1)),
            h("input", {
              id: `${o.id}-color-hex`,
              class: "vacp-color-input",
              type: "text",
              value: at.value,
              onInput: ht
            }, null, 40, jt)
          ], 8, Wt)) : (x(!0), C(bt, { key: 1 }, wt(st.value, ({ value: l, channel: i, label: g }) => (x(), C("label", {
            id: `${o.id}-color-${p.value}-${i}-label`,
            key: `${o.id}-color-${p.value}-${i}-label`,
            class: "vacp-color-input-label",
            for: `${o.id}-color-${p.value}-${i}`,
            onInput: (b) => B(b, i)
          }, [
            h("span", _t, yt(g), 1),
            h("input", {
              id: `${o.id}-color-${p.value}-${i}`,
              class: "vacp-color-input",
              type: "text",
              value: l,
              onInput: (b) => B(b, i)
            }, null, 40, zt)
          ], 40, Dt))), 128))
        ]),
        o.visibleFormats.length > 1 ? (x(), C("button", {
          key: 0,
          class: "vacp-format-switch-button",
          type: "button",
          onClick: lt
        }, [
          V(o.$slots, "format-switch-button", {}, () => [
            e[7] || (e[7] = h("span", { class: "vacp-visually-hidden" }, "Switch format", -1)),
            e[8] || (e[8] = h("svg", {
              class: "vacp-icon",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "15"
            }, [
              h("path", {
                d: "M8 15l5-5-1-1-4 2-4-2-1 1zm4-9l1-1-5-5-5 5 1 1 4-2z",
                fill: "currentColor"
              })
            ], -1))
          ])
        ])) : Q("", !0)
      ])
    ], 512));
  }
}), Bt = {
  install(t) {
    t.component("ColorPicker", Kt);
  }
};
export {
  Kt as ColorPicker,
  Bt as default
};
