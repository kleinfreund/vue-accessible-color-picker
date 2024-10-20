import { defineComponent as pt, ref as I, reactive as vt, computed as q, watch as dt, onMounted as mt, onBeforeUnmount as gt, openBlock as w, createElementBlock as y, createElementVNode as h, renderSlot as N, createTextVNode as X, createCommentVNode as G, Fragment as bt, renderList as wt, toDisplayString as yt } from "vue";
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
function V(t) {
  const n = [], r = t.length > 5 ? 2 : 1;
  for (let s = 1; s < t.length; s += r) {
    const u = t.substring(s, s + r).repeat(r % 2 + 1), f = parseInt(u, 16);
    n.push(s === 3 * r + 1 ? f / 255 : f);
  }
  return n.length === 3 && n.push(1), {
    r: n[0],
    g: n[1],
    b: n[2],
    a: n[3]
  };
}
function Z(t) {
  const n = t.l / 100, r = n + t.s / 100 * Math.min(n, 1 - n), s = r === 0 ? 0 : 200 * (1 - n / r);
  return {
    h: t.h,
    s,
    v: r * 100,
    a: t.a
  };
}
function H(t) {
  let n = t.h % 360;
  n < 0 && (n += 360);
  const r = t.s / 100, s = t.l / 100;
  return {
    r: R(0, n, r, s) * 255,
    g: R(8, n, r, s) * 255,
    b: R(4, n, r, s) * 255,
    a: t.a
  };
}
function R(t, n, r, s) {
  const u = (t + n / 30) % 12, f = r * Math.min(s, 1 - s);
  return s - f * Math.max(-1, Math.min(u - 3, 9 - u, 1));
}
function tt(t) {
  const n = t.s / 100, r = t.v / 100, s = r * (1 - n / 2);
  return {
    h: t.h,
    s: s === 0 || s === 1 ? 0 : (r - s) / Math.min(s, 1 - s) * 100,
    l: s * 100,
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
function x(t) {
  const n = t.w / 100, r = t.b / 100;
  let s, u;
  const f = n + r;
  return f >= 1 ? (s = 0, u = n / f) : (u = 1 - r, s = (1 - n / u) * 100), {
    h: t.h,
    s,
    v: u * 100,
    a: t.a
  };
}
function E(t) {
  const { r: n, g: r, b: s, a: u } = t, f = Math.min(n, r, s), p = Math.max(n, r, s), v = p - f, d = (p + f) / 2;
  let c = 0;
  v !== 0 && (p === n ? c = (r - s) / v + (r < s ? 6 : 0) : p === r ? c = (s - n) / v + 2 : p === s && (c = (n - r) / v + 4), c *= 60);
  let l = 0;
  return d !== 0 && d !== 255 && (l = (p - d) / Math.min(d, 255 - d)), {
    h: c,
    s: l * 100,
    l: d / 255 * 100,
    a: u
  };
}
function A(t) {
  return "#" + Object.values(t).map((n, r) => Math.round(r === 3 ? n * 255 : n).toString(16).padStart(2, "0")).join("");
}
function $(t) {
  return et(Z(E(t)));
}
const Ct = {
  hex: {
    hex: (t) => t,
    hsl: (t) => E(V(t)),
    hsv: (t) => x($(V(t))),
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
    hex: (t) => A(M(x(t))),
    hsl: (t) => E(M(x(t))),
    hsv: x,
    hwb: (t) => t,
    rgb: (t) => M(x(t))
  },
  rgb: {
    hex: A,
    hsl: E,
    hsv: (t) => x($(t)),
    hwb: $,
    rgb: (t) => t
  }
};
function Tt(t, n, r) {
  return Ct[t][n](r);
}
function Mt(t, n) {
  const r = t.toFixed(n);
  return r.includes(".") ? r.replace(/\.?0+$/, "") : r;
}
const $t = {
  deg: 1,
  grad: 0.9,
  rad: 180 / Math.PI,
  turn: 360
}, j = {
  from(t) {
    return t.endsWith("%") ? C.from(t, { referenceValue: 1 }) : g.from(t, { min: 0, max: 1 });
  },
  to(t) {
    return g.to(t);
  }
}, J = {
  from(t) {
    const n = t.match(/deg|g?rad|turn$/);
    if (n === null)
      return g.from(t);
    const r = n[0];
    return g.from(t.slice(0, -r.length)) * $t[r];
  },
  to(t) {
    return g.to(t);
  }
}, g = {
  from(t, { min: n = Number.NEGATIVE_INFINITY, max: r = Number.POSITIVE_INFINITY } = {}) {
    return t.endsWith(".") ? NaN : k(Number(t), n, r);
  },
  to(t) {
    return Mt(t, 2);
  }
}, C = {
  from(t, { referenceValue: n = 100, min: r = 0, max: s = 100 } = {}) {
    return t.endsWith("%") ? g.from(t.slice(0, -1), { min: r, max: s }) * n / 100 : NaN;
  },
  to(t) {
    return g.to(t) + "%";
  }
}, W = {
  from(t) {
    return t.endsWith("%") ? C.from(t, { referenceValue: 255 }) : g.from(t, { min: 0, max: 255 });
  },
  to(t) {
    return g.to(t);
  }
}, kt = {
  hsl: {
    h: J,
    s: C,
    l: C,
    a: j
  },
  hwb: {
    h: J,
    w: C,
    b: C,
    a: j
  },
  rgb: {
    r: W,
    g: W,
    b: W,
    a: j
  }
};
function L(t, n) {
  return kt[t][n];
}
function D({ format: t, color: n }, r) {
  if (t === "hex")
    return r && [5, 9].includes(n.length) ? n.substring(0, n.length - (n.length - 1) / 4) : n;
  const s = Object.entries(n).slice(0, r ? 3 : 4).map(([u, f]) => {
    const p = L(t, u);
    return (u === "a" ? "/ " : "") + p.to(f);
  });
  return `${t}(${s.join(" ")})`;
}
function nt(t) {
  return /^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t);
}
function Ft(t) {
  return "r" in t ? "rgb" : "w" in t ? "hwb" : "v" in t ? "hsv" : "s" in t ? "hsl" : null;
}
const Q = {
  hsl: ["h", "s", "l", "a"],
  hwb: ["h", "w", "b", "a"],
  rgb: ["r", "g", "b", "a"]
};
function It(t) {
  if (typeof t != "string") {
    const v = Ft(t);
    return v === null ? null : { format: v, color: t };
  }
  if (t.startsWith("#"))
    return nt(t) ? { format: "hex", color: t } : null;
  if (!t.includes("(")) {
    const v = document.createElement("canvas").getContext("2d");
    v.fillStyle = t;
    const d = v.fillStyle;
    return d === "#000000" && t !== "black" ? null : { format: "hex", color: d };
  }
  const [n, r] = t.split("("), s = n.substring(0, 3);
  if (!(s in Q))
    return null;
  const u = r.replace(/[,/)]/g, " ").replace(/\s+/g, " ").trim().split(" ");
  u.length === 3 && u.push("1");
  const f = Q[s], p = Object.fromEntries(f.map((v, d) => {
    const c = L(s, v);
    return [
      v,
      c.from(u[d])
    ];
  }));
  return { format: s, color: p };
}
function Nt(t, n, r) {
  const s = t.getBoundingClientRect(), u = n - s.left, f = r - s.top;
  return {
    x: s.width === 0 ? 0 : k(u / s.width * 100, 0, 100),
    y: s.height === 0 ? 0 : k((1 - f / s.height) * 100, 0, 100)
  };
}
const Vt = { class: "vacp-range-input-group" }, At = ["for"], Ht = { class: "vacp-range-input-label-text vacp-range-input-label-text--hue" }, Et = ["id", "value"], Lt = ["for"], Pt = { class: "vacp-range-input-label-text vacp-range-input-label-text--alpha" }, Ot = ["id", "value"], St = { class: "vacp-color-inputs" }, Rt = { class: "vacp-color-input-group" }, jt = ["for"], Wt = ["id", "value"], Dt = ["id", "for", "onInput"], _t = { class: "vacp-color-input-label-text" }, zt = ["id", "value", "onInput"], Kt = /* @__PURE__ */ pt({
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
    const r = ["hex", "hsl", "hsv", "hwb", "rgb"], s = t, u = n, f = I(null), p = I(null), v = I(null);
    let d = !1;
    const c = I(s.visibleFormats.includes(s.defaultFormat) ? s.defaultFormat : s.visibleFormats[0]), l = vt({
      hex: "#ffffffff",
      hsl: { h: 0, s: 0, l: 100, a: 1 },
      hsv: { h: 0, s: 0, v: 100, a: 1 },
      hwb: { h: 0, w: 100, b: 0, a: 1 },
      rgb: { r: 255, g: 255, b: 255, a: 1 }
    }), ot = q(function() {
      const o = Object.keys(l[c.value]);
      return c.value !== "hex" && s.alphaChannel === "hide" ? o.slice(0, 3) : o;
    }), st = q(function() {
      return s.alphaChannel === "hide" && [5, 9].includes(l.hex.length) ? l.hex.substring(0, l.hex.length - (l.hex.length - 1) / 4) : l.hex;
    });
    dt(() => s.color, z), mt(function() {
      document.addEventListener("mousemove", P, { passive: !1 }), document.addEventListener("touchmove", O, { passive: !1 }), document.addEventListener("mouseup", F), document.addEventListener("touchend", F), z(s.color);
    }), gt(function() {
      document.removeEventListener("mousemove", P), document.removeEventListener("touchmove", O), document.removeEventListener("mouseup", F), document.removeEventListener("touchend", F);
    });
    function rt() {
      const e = (s.visibleFormats.findIndex((a) => a === c.value) + 1) % s.visibleFormats.length;
      c.value = s.visibleFormats[e];
    }
    function at(o) {
      d = !0, P(o);
    }
    function lt(o) {
      d = !0, O(o);
    }
    function F() {
      d = !1;
    }
    function P(o) {
      o.buttons !== 1 || d === !1 || !(p.value instanceof HTMLElement) || _(p.value, o.clientX, o.clientY);
    }
    function O(o) {
      if (d === !1 || !(p.value instanceof HTMLElement))
        return;
      o.preventDefault();
      const e = o.touches[0];
      _(p.value, e.clientX, e.clientY);
    }
    function _(o, e, a) {
      const i = Nt(o, e, a), m = Object.assign({}, l.hsv);
      m.s = i.x, m.v = i.y, b("hsv", m);
    }
    function it(o) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(o.key))
        return;
      o.preventDefault();
      const e = ["ArrowLeft", "ArrowDown"].includes(o.key) ? -1 : 1, a = ["ArrowLeft", "ArrowRight"].includes(o.key) ? "s" : "v", i = o.shiftKey ? 10 : 1, m = l.hsv[a] + e * i, T = Object.assign({}, l.hsv);
      T[a] = k(m, 0, 100), b("hsv", T);
    }
    function z(o) {
      const e = It(o);
      e !== null && b(e.format, e.color);
    }
    function K(o, e) {
      const a = o.currentTarget, i = Object.assign({}, l.hsv);
      i[e] = Number(a.value), b("hsv", i);
    }
    function ut(o) {
      const e = o.target;
      nt(e.value) && b("hex", e.value);
    }
    function Y(o, e) {
      const a = o.target, i = c.value, m = Object.assign({}, l[i]), S = L(i, e).from(a.value);
      Number.isNaN(S) || S === void 0 || (m[e] = S, b(i, m));
    }
    function b(o, e) {
      let a = e;
      if (s.alphaChannel === "hide")
        if (typeof e != "string")
          e.a = 1, a = e;
        else if ([5, 9].includes(e.length)) {
          const i = (e.length - 1) / 4;
          a = e.substring(0, e.length - i) + "f".repeat(i);
        } else [4, 7].includes(e.length) && (a = e + "f".repeat((e.length - 1) / 3));
      if (!xt(l[o], a)) {
        l[o] = a;
        for (const i of r)
          i !== o && (l[i] = Tt(o, i, a));
        u("color-change", B());
      }
      f.value instanceof HTMLElement && p.value instanceof HTMLElement && v.value instanceof HTMLElement && ft(f.value, p.value, v.value);
    }
    async function ct() {
      const o = l[c.value], e = s.alphaChannel === "hide", a = D({ color: o, format: c.value }, e);
      await window.navigator.clipboard.writeText(a), u("color-copy", B());
    }
    function ht(o) {
      const e = c.value;
      return L(e, o).to(l[e][o]);
    }
    function ft(o, e, a) {
      const i = D({ format: "hsl", color: l.hsl }, !1);
      o.style.setProperty("--vacp-color", i), e.style.position = "relative", e.style.backgroundColor = `hsl(${l.hsl.h} 100% 50%)`, e.style.backgroundImage = "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)", a.style.boxSizing = "border-box", a.style.position = "absolute", a.style.left = `${l.hsv.s}%`, a.style.bottom = `${l.hsv.v}%`;
    }
    function B() {
      const o = s.alphaChannel === "hide", e = D({ color: l[c.value], format: c.value }, o);
      return {
        colors: l,
        cssColor: e
      };
    }
    function U(o) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(o.key) || !o.shiftKey)
        return;
      const e = o.currentTarget, a = Number(e.step), i = ["ArrowLeft", "ArrowDown"].includes(o.key) ? -1 : 1, m = Number(e.value) + i * a * 10, T = k(m, Number(e.min), Number(e.max));
      e.value = String(T - i * a);
    }
    return (o, e) => (w(), y("div", {
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
      h("div", Vt, [
        h("label", {
          class: "vacp-range-input-label vacp-range-input-label--hue",
          for: `${o.id}-hue-slider`
        }, [
          h("span", Ht, [
            N(o.$slots, "hue-range-input-label", {}, () => [
              e[2] || (e[2] = X("Hue"))
            ])
          ]),
          h("input", {
            id: `${o.id}-hue-slider`,
            class: "vacp-range-input vacp-range-input--hue",
            value: l.hsv.h,
            type: "range",
            min: "0",
            max: "360",
            step: "1",
            onKeydownPassive: U,
            onInput: e[0] || (e[0] = (a) => K(a, "h"))
          }, null, 40, Et)
        ], 8, At),
        o.alphaChannel === "show" ? (w(), y("label", {
          key: 0,
          class: "vacp-range-input-label vacp-range-input-label--alpha",
          for: `${o.id}-alpha-slider`
        }, [
          h("span", Pt, [
            N(o.$slots, "alpha-range-input-label", {}, () => [
              e[3] || (e[3] = X("Alpha"))
            ])
          ]),
          h("input", {
            id: `${o.id}-alpha-slider`,
            class: "vacp-range-input vacp-range-input--alpha",
            value: l.hsv.a,
            type: "range",
            min: "0",
            max: "1",
            step: "0.01",
            onKeydownPassive: U,
            onInput: e[1] || (e[1] = (a) => K(a, "a"))
          }, null, 40, Ot)
        ], 8, Lt)) : G("", !0)
      ]),
      h("button", {
        class: "vacp-copy-button",
        type: "button",
        onClick: ct
      }, [
        N(o.$slots, "copy-button", {}, () => [
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
        h("div", Rt, [
          c.value === "hex" ? (w(), y("label", {
            key: 0,
            class: "vacp-color-input-label",
            for: `${o.id}-color-hex`
          }, [
            e[6] || (e[6] = h("span", { class: "vacp-color-input-label-text" }, " Hex ", -1)),
            h("input", {
              id: `${o.id}-color-hex`,
              class: "vacp-color-input",
              type: "text",
              value: st.value,
              onInput: ut
            }, null, 40, Wt)
          ], 8, jt)) : (w(!0), y(bt, { key: 1 }, wt(ot.value, (a) => (w(), y("label", {
            id: `${o.id}-color-${c.value}-${a}-label`,
            key: `${o.id}-color-${c.value}-${a}-label`,
            class: "vacp-color-input-label",
            for: `${o.id}-color-${c.value}-${a}`,
            onInput: (i) => Y(i, a)
          }, [
            h("span", _t, yt(a.toUpperCase()), 1),
            h("input", {
              id: `${o.id}-color-${c.value}-${a}`,
              class: "vacp-color-input",
              type: "text",
              value: ht(a),
              onInput: (i) => Y(i, a)
            }, null, 40, zt)
          ], 40, Dt))), 128))
        ]),
        o.visibleFormats.length > 1 ? (w(), y("button", {
          key: 0,
          class: "vacp-format-switch-button",
          type: "button",
          onClick: rt
        }, [
          N(o.$slots, "format-switch-button", {}, () => [
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
}), Bt = {
  install(t) {
    t.component("ColorPicker", Kt);
  }
};
export {
  Kt as ColorPicker,
  Bt as default
};
