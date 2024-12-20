import { defineComponent as ft, ref as I, reactive as pt, computed as q, watch as vt, onMounted as mt, onBeforeUnmount as dt, openBlock as y, createElementBlock as x, createElementVNode as h, renderSlot as N, createTextVNode as X, createCommentVNode as G, Fragment as gt, renderList as bt, toDisplayString as wt } from "vue";
function k(t, n, s) {
  return Math.max(n, Math.min(t, s));
}
function yt(t, n) {
  if (typeof t == "string" || typeof n == "string")
    return t === n;
  for (const s in t)
    if (t[s] !== n[s])
      return !1;
  return !0;
}
function V(t) {
  const n = [], s = t.length > 5 ? 2 : 1;
  for (let o = 1; o < t.length; o += s) {
    const u = t.substring(o, o + s).repeat(s % 2 + 1), f = parseInt(u, 16);
    n.push(o === 3 * s + 1 ? f / 255 : f);
  }
  return n.length === 3 && n.push(1), {
    r: n[0],
    g: n[1],
    b: n[2],
    a: n[3]
  };
}
function Z(t) {
  const n = t.l / 100, s = n + t.s / 100 * Math.min(n, 1 - n), o = s === 0 ? 0 : 200 * (1 - n / s);
  return {
    h: t.h,
    s: o,
    v: s * 100,
    a: t.a
  };
}
function H(t) {
  let n = t.h % 360;
  n < 0 && (n += 360);
  const s = t.s / 100, o = t.l / 100;
  return {
    r: W(0, n, s, o) * 255,
    g: W(8, n, s, o) * 255,
    b: W(4, n, s, o) * 255,
    a: t.a
  };
}
function W(t, n, s, o) {
  const u = (t + n / 30) % 12, f = s * Math.min(o, 1 - o);
  return o - f * Math.max(-1, Math.min(u - 3, 9 - u, 1));
}
function tt(t) {
  const n = t.s / 100, s = t.v / 100, o = s * (1 - n / 2);
  return {
    h: t.h,
    s: o === 0 || o === 1 ? 0 : (s - o) / Math.min(o, 1 - o) * 100,
    l: o * 100,
    a: t.a
  };
}
function et(t) {
  return {
    h: t.h,
    w: t.v * (100 - t.s) / 100,
    b: 100 - t.v,
    a: t.a
  };
}
function M(t) {
  return H(tt(t));
}
function C(t) {
  const n = t.w / 100, s = t.b / 100;
  let o, u;
  const f = n + s;
  return f >= 1 ? (o = 0, u = n / f) : (u = 1 - s, o = (1 - n / u) * 100), {
    h: t.h,
    s: o,
    v: u * 100,
    a: t.a
  };
}
function E(t) {
  const { r: n, g: s, b: o, a: u } = t, f = Math.min(n, s, o), p = Math.max(n, s, o), v = p - f, m = (p + f) / 2;
  let c = 0;
  v !== 0 && (p === n ? c = (s - o) / v + (s < o ? 6 : 0) : p === s ? c = (o - n) / v + 2 : p === o && (c = (n - s) / v + 4), c *= 60);
  let i = 0;
  return m !== 0 && m !== 255 && (i = (p - m) / Math.min(m, 255 - m)), {
    h: c,
    s: i * 100,
    l: m / 255 * 100,
    a: u
  };
}
function A(t) {
  return "#" + Object.values(t).map((n, s) => Math.round(s === 3 ? n * 255 : n).toString(16).padStart(2, "0")).join("");
}
function $(t) {
  return et(Z(E(t)));
}
const xt = {
  hex: {
    hex: (t) => t,
    hsl: (t) => E(V(t)),
    hsv: (t) => C($(V(t))),
    hwb: (t) => $(V(t)),
    rgb: V
  },
  hsl: {
    hex: (t) => A(H(t)),
    hsl: (t) => t,
    hsv: Z,
    hwb: (t) => $(H(t)),
    rgb: H
  },
  hsv: {
    hex: (t) => A(M(t)),
    hsl: tt,
    hsv: (t) => t,
    hwb: et,
    rgb: M
  },
  hwb: {
    hex: (t) => A(M(C(t))),
    hsl: (t) => E(M(C(t))),
    hsv: C,
    hwb: (t) => t,
    rgb: (t) => M(C(t))
  },
  rgb: {
    hex: A,
    hsl: E,
    hsv: (t) => C($(t)),
    hwb: $,
    rgb: (t) => t
  }
};
function Ct(t, n, s) {
  return xt[t][n](s);
}
function Tt(t, n) {
  const s = t.toFixed(n);
  return s.includes(".") ? s.replace(/\.?0+$/, "") : s;
}
const Mt = {
  deg: 1,
  grad: 0.9,
  rad: 180 / Math.PI,
  turn: 360
}, L = {
  from(t) {
    return t.endsWith("%") ? T.from(t, { referenceValue: 1 }) : b.from(t, { min: 0, max: 1 });
  },
  to(t) {
    return b.to(t);
  }
}, J = {
  from(t) {
    const n = t.match(/deg|g?rad|turn$/);
    if (n === null)
      return b.from(t);
    const s = n[0];
    return b.from(t.slice(0, -s.length)) * Mt[s];
  },
  to(t) {
    return b.to(t);
  }
}, b = {
  from(t, { min: n = Number.NEGATIVE_INFINITY, max: s = Number.POSITIVE_INFINITY } = {}) {
    return t.endsWith(".") ? NaN : k(Number(t), n, s);
  },
  to(t) {
    return Tt(t, 2);
  }
}, T = {
  from(t, { referenceValue: n = 100, min: s = 0, max: o = 100 } = {}) {
    return t.endsWith("%") ? b.from(t.slice(0, -1), { min: s, max: o }) * n / 100 : NaN;
  },
  to(t) {
    return b.to(t) + "%";
  }
}, j = {
  from(t) {
    return t.endsWith("%") ? T.from(t, { referenceValue: 255 }) : b.from(t, { min: 0, max: 255 });
  },
  to(t) {
    return b.to(t);
  }
}, $t = {
  hsl: {
    h: J,
    s: T,
    l: T
  },
  hwb: {
    h: J,
    w: T,
    b: T
  },
  rgb: {
    r: j,
    g: j,
    b: j
  }
};
function P(t, n) {
  return $t[t][n];
}
function D({ format: t, color: n }, s) {
  if (t === "hex")
    return s && [5, 9].includes(n.length) ? n.substring(0, n.length - (n.length - 1) / 4) : n;
  const o = Object.entries(n).slice(0, s ? 3 : 4).map(([u, f]) => {
    const p = u === "a" ? L : P(t, u);
    return (u === "a" ? "/ " : "") + p.to(f);
  });
  return `${t}(${o.join(" ")})`;
}
function nt(t) {
  return /^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t);
}
function kt(t) {
  return "r" in t ? "rgb" : "w" in t ? "hwb" : "v" in t ? "hsv" : "s" in t ? "hsl" : null;
}
const Q = {
  hsl: ["h", "s", "l", "a"],
  hwb: ["h", "w", "b", "a"],
  rgb: ["r", "g", "b", "a"]
};
function Ft(t) {
  if (typeof t != "string") {
    const v = kt(t);
    return v === null ? null : { format: v, color: t };
  }
  if (t.startsWith("#"))
    return nt(t) ? { format: "hex", color: t } : null;
  if (!t.includes("(")) {
    const v = document.createElement("canvas").getContext("2d");
    v.fillStyle = t;
    const m = v.fillStyle;
    return m === "#000000" && t !== "black" ? null : { format: "hex", color: m };
  }
  const [n, s] = t.split("("), o = n.substring(0, 3);
  if (!(o in Q))
    return null;
  const u = s.replace(/[,/)]/g, " ").replace(/\s+/g, " ").trim().split(" ");
  u.length === 3 && u.push("1");
  const f = Q[o], p = Object.fromEntries(f.map((v, m) => {
    const c = v === "a" ? L : P(o, v);
    return [
      v,
      c.from(u[m])
    ];
  }));
  return { format: o, color: p };
}
function It(t, n, s) {
  const o = t.getBoundingClientRect(), u = n - o.left, f = s - o.top;
  return {
    x: o.width === 0 ? 0 : k(u / o.width * 100, 0, 100),
    y: o.height === 0 ? 0 : k((1 - f / o.height) * 100, 0, 100)
  };
}
const Nt = { class: "vacp-range-input-group" }, Vt = ["for"], At = { class: "vacp-range-input-label-text vacp-range-input-label-text--hue" }, Ht = ["id", "value"], Et = ["for"], Lt = { class: "vacp-range-input-label-text vacp-range-input-label-text--alpha" }, Pt = ["id", "value"], St = { class: "vacp-color-inputs" }, Ot = { class: "vacp-color-input-group" }, Rt = ["for"], Wt = ["id", "value"], jt = ["id", "for", "onInput"], Dt = { class: "vacp-color-input-label-text" }, _t = ["id", "value", "onInput"], zt = /* @__PURE__ */ ft({
  __name: "ColorPicker",
  props: {
    color: { default: "#ffffffff" },
    id: { default: "color-picker" },
    visibleFormats: { default: () => ["hex", "hsl", "hwb", "rgb"] },
    defaultFormat: { default: "hsl" },
    alphaChannel: { default: "show" }
  },
  emits: ["color-change", "color-copy"],
  setup(t, { emit: n }) {
    const s = ["hex", "hsl", "hsv", "hwb", "rgb"], o = t, u = n, f = I(null), p = I(null), v = I(null);
    let m = !1;
    const c = I(o.visibleFormats.includes(o.defaultFormat) ? o.defaultFormat : o.visibleFormats[0]), i = pt({
      hex: "#ffffffff",
      hsl: { h: 0, s: 0, l: 100, a: 1 },
      hsv: { h: 0, s: 0, v: 100, a: 1 },
      hwb: { h: 0, w: 100, b: 0, a: 1 },
      rgb: { r: 255, g: 255, b: 255, a: 1 }
    }), ot = q(function() {
      const r = c.value, e = i[r];
      return r.split("").map((a) => {
        const l = e[a];
        return {
          value: P(r, a).to(l),
          channel: a,
          label: a.toUpperCase()
        };
      }).concat(o.alphaChannel === "show" ? [{
        value: L.to(e.a),
        channel: "a",
        label: "Alpha"
      }] : []);
    }), rt = q(function() {
      return o.alphaChannel === "hide" && [5, 9].includes(i.hex.length) ? i.hex.substring(0, i.hex.length - (i.hex.length - 1) / 4) : i.hex;
    });
    vt(() => o.color, z), mt(function() {
      document.addEventListener("mousemove", S, { passive: !1 }), document.addEventListener("touchmove", O, { passive: !1 }), document.addEventListener("mouseup", F), document.addEventListener("touchend", F), z(o.color);
    }), dt(function() {
      document.removeEventListener("mousemove", S), document.removeEventListener("touchmove", O), document.removeEventListener("mouseup", F), document.removeEventListener("touchend", F);
    });
    function st() {
      const e = (o.visibleFormats.findIndex((a) => a === c.value) + 1) % o.visibleFormats.length;
      c.value = o.visibleFormats[e];
    }
    function at(r) {
      m = !0, S(r);
    }
    function lt(r) {
      m = !0, O(r);
    }
    function F() {
      m = !1;
    }
    function S(r) {
      r.buttons !== 1 || m === !1 || !(p.value instanceof HTMLElement) || _(p.value, r.clientX, r.clientY);
    }
    function O(r) {
      if (m === !1 || !(p.value instanceof HTMLElement))
        return;
      r.preventDefault();
      const e = r.touches[0];
      _(p.value, e.clientX, e.clientY);
    }
    function _(r, e, a) {
      const l = It(r, e, a), d = Object.assign({}, i.hsv);
      d.s = l.x, d.v = l.y, w("hsv", d);
    }
    function it(r) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(r.key))
        return;
      r.preventDefault();
      const e = ["ArrowLeft", "ArrowDown"].includes(r.key) ? -1 : 1, a = ["ArrowLeft", "ArrowRight"].includes(r.key) ? "s" : "v", l = r.shiftKey ? 10 : 1, d = i.hsv[a] + e * l, g = Object.assign({}, i.hsv);
      g[a] = k(d, 0, 100), w("hsv", g);
    }
    function z(r) {
      const e = Ft(r);
      e !== null && w(e.format, e.color);
    }
    function K(r, e) {
      const a = r.currentTarget, l = Object.assign({}, i.hsv);
      l[e] = Number(a.value), w("hsv", l);
    }
    function ut(r) {
      const e = r.target;
      nt(e.value) && w("hex", e.value);
    }
    function Y(r, e) {
      const a = r.target, l = c.value, d = Object.assign({}, i[l]), R = (e === "a" ? L : P(l, e)).from(a.value);
      Number.isNaN(R) || R === void 0 || (d[e] = R, w(l, d));
    }
    function w(r, e) {
      let a = e;
      if (o.alphaChannel === "hide")
        if (typeof e != "string")
          e.a = 1, a = e;
        else if ([5, 9].includes(e.length)) {
          const l = (e.length - 1) / 4;
          a = e.substring(0, e.length - l) + "f".repeat(l);
        } else [4, 7].includes(e.length) && (a = e + "f".repeat((e.length - 1) / 3));
      if (!yt(i[r], a)) {
        i[r] = a;
        for (const l of s)
          l !== r && (i[l] = Ct(r, l, a));
        u("color-change", B());
      }
      f.value instanceof HTMLElement && p.value instanceof HTMLElement && v.value instanceof HTMLElement && ht(f.value, p.value, v.value);
    }
    async function ct() {
      const r = i[c.value], e = o.alphaChannel === "hide", a = D({ color: r, format: c.value }, e);
      await window.navigator.clipboard.writeText(a), u("color-copy", B());
    }
    function ht(r, e, a) {
      const l = D({ format: "hsl", color: i.hsl }, !1);
      r.style.setProperty("--vacp-color", l), e.style.position = "relative", e.style.backgroundColor = `hsl(${i.hsl.h} 100% 50%)`, e.style.backgroundImage = "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)", a.style.boxSizing = "border-box", a.style.position = "absolute", a.style.left = `${i.hsv.s}%`, a.style.bottom = `${i.hsv.v}%`;
    }
    function B() {
      const r = o.alphaChannel === "hide", e = D({ color: i[c.value], format: c.value }, r);
      return {
        colors: i,
        cssColor: e
      };
    }
    function U(r) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(r.key) || !r.shiftKey)
        return;
      const e = r.currentTarget, a = Number(e.step), l = ["ArrowLeft", "ArrowDown"].includes(r.key) ? -1 : 1, d = Number(e.value) + l * a * 10, g = k(d, Number(e.min), Number(e.max));
      e.value = String(g - l * a);
    }
    return (r, e) => (y(), x("div", {
      ref_key: "colorPicker",
      ref: f,
      class: "vacp-color-picker"
    }, [
      h("div", {
        ref_key: "colorSpace",
        ref: p,
        class: "vacp-color-space",
        onMousedown: at,
        onTouchstart: lt
      }, [
        h("div", {
          ref_key: "thumb",
          ref: v,
          class: "vacp-color-space-thumb",
          tabindex: "0",
          "aria-label": "Color space thumb",
          onKeydown: it
        }, null, 544)
      ], 544),
      h("div", Nt, [
        h("label", {
          class: "vacp-range-input-label vacp-range-input-label--hue",
          for: `${r.id}-hue-slider`
        }, [
          h("span", At, [
            N(r.$slots, "hue-range-input-label", {}, () => [
              e[2] || (e[2] = X("Hue"))
            ])
          ]),
          h("input", {
            id: `${r.id}-hue-slider`,
            class: "vacp-range-input vacp-range-input--hue",
            value: i.hsv.h,
            type: "range",
            min: "0",
            max: "360",
            step: "1",
            onKeydownPassive: U,
            onInput: e[0] || (e[0] = (a) => K(a, "h"))
          }, null, 40, Ht)
        ], 8, Vt),
        r.alphaChannel === "show" ? (y(), x("label", {
          key: 0,
          class: "vacp-range-input-label vacp-range-input-label--alpha",
          for: `${r.id}-alpha-slider`
        }, [
          h("span", Lt, [
            N(r.$slots, "alpha-range-input-label", {}, () => [
              e[3] || (e[3] = X("Alpha"))
            ])
          ]),
          h("input", {
            id: `${r.id}-alpha-slider`,
            class: "vacp-range-input vacp-range-input--alpha",
            value: i.hsv.a,
            type: "range",
            min: "0",
            max: "1",
            step: "0.01",
            onKeydownPassive: U,
            onInput: e[1] || (e[1] = (a) => K(a, "a"))
          }, null, 40, Pt)
        ], 8, Et)) : G("", !0)
      ]),
      h("button", {
        class: "vacp-copy-button",
        type: "button",
        onClick: ct
      }, [
        N(r.$slots, "copy-button", {}, () => [
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
      h("div", St, [
        h("div", Ot, [
          c.value === "hex" ? (y(), x("label", {
            key: 0,
            class: "vacp-color-input-label",
            for: `${r.id}-color-hex`
          }, [
            e[6] || (e[6] = h("span", { class: "vacp-color-input-label-text" }, " Hex ", -1)),
            h("input", {
              id: `${r.id}-color-hex`,
              class: "vacp-color-input",
              type: "text",
              value: rt.value,
              onInput: ut
            }, null, 40, Wt)
          ], 8, Rt)) : (y(!0), x(gt, { key: 1 }, bt(ot.value, ({ value: a, channel: l, label: d }) => (y(), x("label", {
            id: `${r.id}-color-${c.value}-${l}-label`,
            key: `${r.id}-color-${c.value}-${l}-label`,
            class: "vacp-color-input-label",
            for: `${r.id}-color-${c.value}-${l}`,
            onInput: (g) => Y(g, l)
          }, [
            h("span", Dt, wt(d), 1),
            h("input", {
              id: `${r.id}-color-${c.value}-${l}`,
              class: "vacp-color-input",
              type: "text",
              value: a,
              onInput: (g) => Y(g, l)
            }, null, 40, _t)
          ], 40, jt))), 128))
        ]),
        r.visibleFormats.length > 1 ? (y(), x("button", {
          key: 0,
          class: "vacp-format-switch-button",
          type: "button",
          onClick: st
        }, [
          N(r.$slots, "format-switch-button", {}, () => [
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
        ])) : G("", !0)
      ])
    ], 512));
  }
}), Yt = {
  install(t) {
    t.component("ColorPicker", zt);
  }
};
export {
  zt as ColorPicker,
  Yt as default
};
