import { defineComponent as dt, ref as M, reactive as mt, computed as Y, watch as gt, onMounted as bt, onBeforeUnmount as wt, openBlock as y, createElementBlock as x, createElementVNode as h, renderSlot as k, createTextVNode as q, createCommentVNode as G, Fragment as yt, renderList as xt, toDisplayString as Ct } from "vue";
function g(t, o, n) {
  return Math.max(o, Math.min(t, n));
}
function v(t, o) {
  const n = t.toFixed(o);
  return n.includes(".") ? n.replace(/\.?0+$/, "") : n;
}
function J(t) {
  return t.endsWith(".") ? NaN : (parseFloat(t) % 360 + 360) % 360;
}
function Q(t) {
  return v(t, 2);
}
function $(t) {
  if (!t.endsWith("%"))
    return NaN;
  const o = t.substring(0, t.length - 1);
  if (o.endsWith("."))
    return NaN;
  const n = parseFloat(o);
  return Number.isNaN(n) ? NaN : g(n, 0, 100);
}
function A(t) {
  return v(t, 2) + "%";
}
function V(t) {
  if (t.endsWith("%"))
    return $(t) / 100 * 255;
  if (t.endsWith("."))
    return NaN;
  const o = parseFloat(t);
  return Number.isNaN(o) ? NaN : g(o, 0, 255);
}
function R(t) {
  return v(t, 2);
}
function W(t) {
  return t.endsWith("%") ? $(t) / 100 : g(parseFloat(t), 0, 1);
}
function O(t) {
  return String(t);
}
const j = {
  hsl: {
    h: {
      to: Q,
      from: J
    },
    s: {
      to: A,
      from: $
    },
    l: {
      to: A,
      from: $
    },
    a: {
      to: O,
      from: W
    }
  },
  hwb: {
    h: {
      to: Q,
      from: J
    },
    w: {
      to: A,
      from: $
    },
    b: {
      to: A,
      from: $
    },
    a: {
      to: O,
      from: W
    }
  },
  rgb: {
    r: {
      to: R,
      from: V
    },
    g: {
      to: R,
      from: V
    },
    b: {
      to: R,
      from: V
    },
    a: {
      to: O,
      from: W
    }
  }
};
function $t(t, o) {
  if (typeof t == "string" || typeof o == "string")
    return t === o;
  for (const n in t)
    if (t[n] !== o[n])
      return !1;
  return !0;
}
function H(t) {
  const o = [], n = t.length > 5 ? 2 : 1;
  for (let r = 1; r < t.length; r += n) {
    const c = t.substring(r, r + n).repeat(n % 2 + 1), f = parseInt(c, 16);
    o.push(r === 3 * n + 1 ? f / 255 : f);
  }
  return o.length === 3 && o.push(1), {
    r: o[0],
    g: o[1],
    b: o[2],
    a: o[3]
  };
}
function tt(t) {
  const o = t.l / 100, n = o + t.s / 100 * Math.min(o, 1 - o), r = n === 0 ? 0 : 200 * (1 - o / n);
  return {
    h: t.h,
    s: r,
    v: n * 100,
    a: t.a
  };
}
function E(t) {
  let o = t.h % 360;
  o < 0 && (o += 360);
  const n = t.s / 100, r = t.l / 100;
  return {
    r: D(0, o, n, r) * 255,
    g: D(8, o, n, r) * 255,
    b: D(4, o, n, r) * 255,
    a: t.a
  };
}
function D(t, o, n, r) {
  const c = (t + o / 30) % 12, f = n * Math.min(r, 1 - r);
  return r - f * Math.max(-1, Math.min(c - 3, 9 - c, 1));
}
function et(t) {
  const o = t.s / 100, n = t.v / 100, r = n * (1 - o / 2);
  return {
    h: t.h,
    s: r === 0 || r === 1 ? 0 : (n - r) / Math.min(r, 1 - r) * 100,
    l: r * 100,
    a: t.a
  };
}
function nt(t) {
  return {
    h: t.h,
    w: t.v * (100 - t.s) / 100,
    b: 100 - t.v,
    a: t.a
  };
}
function _(t) {
  return E(et(t));
}
function C(t) {
  const o = t.w / 100, n = t.b / 100;
  let r, c;
  const f = o + n;
  return f >= 1 ? (r = 0, c = o / f) : (c = 1 - n, r = (1 - o / c) * 100), {
    h: t.h,
    s: r,
    v: c * 100,
    a: t.a
  };
}
function S(t) {
  const { r: o, g: n, b: r, a: c } = t, f = Math.min(o, n, r), m = Math.max(o, n, r), p = m - f, u = (m + f) / 2;
  let l = 0;
  p !== 0 && (m === o ? l = (n - r) / p + (n < r ? 6 : 0) : m === n ? l = (r - o) / p + 2 : m === r && (l = (o - n) / p + 4), l *= 60);
  let N = 0;
  return u !== 0 && u !== 255 && (N = (m - u) / Math.min(u, 255 - u)), {
    h: l,
    s: N * 100,
    l: u / 255 * 100,
    a: c
  };
}
function L(t) {
  return "#" + Object.values(t).map((o, n) => Math.round(n === 3 ? o * 255 : o).toString(16).padStart(2, "0")).join("");
}
function T(t) {
  return nt(tt(S(t)));
}
const _t = {
  hex: {
    hex: (t) => t,
    hsl: (t) => S(H(t)),
    hsv: (t) => C(T(H(t))),
    hwb: (t) => T(H(t)),
    rgb: H
  },
  hsl: {
    hex: (t) => L(E(t)),
    hsl: (t) => t,
    hsv: tt,
    hwb: (t) => T(E(t)),
    rgb: E
  },
  hsv: {
    hex: (t) => L(_(t)),
    hsl: et,
    hsv: (t) => t,
    hwb: nt,
    rgb: _
  },
  hwb: {
    hex: (t) => L(_(C(t))),
    hsl: (t) => S(_(C(t))),
    hsv: C,
    hwb: (t) => t,
    rgb: (t) => _(C(t))
  },
  rgb: {
    hex: L,
    hsl: S,
    hsv: (t) => C(T(t)),
    hwb: T,
    rgb: (t) => t
  }
};
function Tt(t, o, n) {
  return _t[t][o](n);
}
const Nt = {
  hex(t, o) {
    return o && [5, 9].includes(t.length) ? t.substring(0, t.length - (t.length - 1) / 4) : t;
  },
  hsl(t, o) {
    const n = v(t.h, 2), r = v(t.s, 2), c = v(t.l, 2);
    return `hsl(${n} ${r}% ${c}%` + (o ? ")" : ` / ${v(t.a, 2)})`);
  },
  hwb(t, o) {
    const n = v(t.h, 2), r = v(t.w, 2), c = v(t.b, 2);
    return `hwb(${n} ${r}% ${c}%` + (o ? ")" : ` / ${v(t.a, 2)})`);
  },
  rgb(t, o) {
    const n = v(t.r, 2), r = v(t.g, 2), c = v(t.b, 2);
    return `rgb(${n} ${r} ${c}` + (o ? ")" : ` / ${v(t.a, 2)})`);
  }
};
function Z(t, o, n) {
  return Nt[o](t, n);
}
function ot(t) {
  return /^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t);
}
function Ft(t) {
  return "r" in t ? "rgb" : "w" in t ? "hwb" : "v" in t ? "hsv" : "s" in t ? "hsl" : null;
}
function Mt(t) {
  if (typeof t != "string")
    return { format: Ft(t), color: t };
  if (t.startsWith("#"))
    return ot(t) ? { format: "hex", color: t } : null;
  if (!t.includes("(")) {
    const p = document.createElement("canvas").getContext("2d");
    p.fillStyle = t;
    const u = p.fillStyle;
    return u === "#000000" && t !== "black" ? null : { format: "hex", color: u };
  }
  const [o, n] = t.split("("), r = o.substring(0, 3), c = n.replace(/[,/)]/g, " ").replace(/\s+/g, " ").trim().split(" ");
  c.length === 3 && c.push("1");
  const f = (r + "a").split(""), m = Object.fromEntries(f.map((p, u) => {
    const l = j[r][p];
    return [
      p,
      l.from(c[u])
    ];
  }));
  return { format: r, color: m };
}
const kt = { class: "vacp-range-input-group" }, At = ["for"], Ht = { class: "vacp-range-input-label-text vacp-range-input-label-text--hue" }, Lt = ["id", "value"], Et = ["for"], St = { class: "vacp-range-input-label-text vacp-range-input-label-text--alpha" }, It = ["id", "value"], Pt = /* @__PURE__ */ h("span", { class: "vacp-visually-hidden" }, "Copy color", -1), Vt = /* @__PURE__ */ h("svg", {
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
], -1), Rt = { class: "vacp-color-inputs" }, Wt = { class: "vacp-color-input-group" }, Ot = ["for"], Dt = /* @__PURE__ */ h("span", { class: "vacp-color-input-label-text" }, " Hex ", -1), jt = ["id", "value"], zt = ["id", "for", "onInput"], Bt = { class: "vacp-color-input-label-text" }, Kt = ["id", "value", "onInput"], Ut = /* @__PURE__ */ h("span", { class: "vacp-visually-hidden" }, "Switch format", -1), Xt = /* @__PURE__ */ h("svg", {
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
], -1), Yt = /* @__PURE__ */ dt({
  __name: "ColorPicker",
  props: {
    color: { default: "#ffffffff" },
    id: { default: "color-picker" },
    visibleFormats: { default: () => ["hex", "hsl", "hwb", "rgb"] },
    defaultFormat: { default: "hsl" },
    alphaChannel: { default: "show" }
  },
  emits: ["color-change"],
  setup(t, { emit: o }) {
    const n = t, r = ["hex", "hsl", "hsv", "hwb", "rgb"], c = M(null), f = M(null), m = M(null);
    let p = !1;
    const u = M(n.visibleFormats.includes(n.defaultFormat) ? n.defaultFormat : n.visibleFormats[0]), l = mt({
      hex: "#ffffffff",
      hsl: { h: 0, s: 0, l: 100, a: 1 },
      hsv: { h: 0, s: 0, v: 100, a: 1 },
      hwb: { h: 0, w: 100, b: 0, a: 1 },
      rgb: { r: 255, g: 255, b: 255, a: 1 }
    }), N = Y(function() {
      const e = Object.keys(l[u.value]);
      return u.value !== "hex" && n.alphaChannel === "hide" ? e.slice(0, 3) : e;
    }), st = Y(function() {
      return n.alphaChannel === "hide" && [5, 9].includes(l.hex.length) ? l.hex.substring(0, l.hex.length - (l.hex.length - 1) / 4) : l.hex;
    });
    gt(() => n.color, B), bt(function() {
      document.addEventListener("mousemove", I, { passive: !1 }), document.addEventListener("touchmove", P, { passive: !1 }), document.addEventListener("mouseup", F), document.addEventListener("touchend", F), B(n.color);
    }), wt(function() {
      document.removeEventListener("mousemove", I), document.removeEventListener("touchmove", P), document.removeEventListener("mouseup", F), document.removeEventListener("touchend", F);
    });
    function rt() {
      const s = (n.visibleFormats.findIndex((a) => a === u.value) + 1) % n.visibleFormats.length;
      u.value = n.visibleFormats[s];
    }
    function at(e) {
      p = !0, I(e);
    }
    function lt(e) {
      p = !0, P(e);
    }
    function F() {
      p = !1;
    }
    function I(e) {
      e.buttons !== 1 || p === !1 || !(f.value instanceof HTMLElement) || z(f.value, e.clientX, e.clientY);
    }
    function P(e) {
      if (p === !1 || !(f.value instanceof HTMLElement))
        return;
      e.preventDefault();
      const s = e.touches[0];
      z(f.value, s.clientX, s.clientY);
    }
    function z(e, s, a) {
      const i = vt(e, s, a), d = Object.assign({}, l.hsv);
      d.s = i.x, d.v = i.y, b("hsv", d);
    }
    function it(e) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(e.key))
        return;
      e.preventDefault();
      const s = ["ArrowLeft", "ArrowDown"].includes(e.key) ? -1 : 1, a = ["ArrowLeft", "ArrowRight"].includes(e.key) ? "s" : "v", i = e.shiftKey ? 10 : 1, d = l.hsv[a] + s * i, w = Object.assign({}, l.hsv);
      w[a] = g(d, 0, 100), b("hsv", w);
    }
    function B(e) {
      const s = Mt(e);
      s !== null && b(s.format, s.color);
    }
    function K(e, s) {
      const a = e.currentTarget, i = Object.assign({}, l.hsv);
      i[s] = Number(a.value), b("hsv", i);
    }
    function ut(e) {
      const s = e.target;
      ot(s.value) && b("hex", s.value);
    }
    function U(e, s) {
      const a = e.target, i = Object.assign({}, l[u.value]), d = j[u.value][s].from(a.value);
      Number.isNaN(d) || d === void 0 || (i[s] = d, b(u.value, i));
    }
    function b(e, s) {
      let a = s;
      if (n.alphaChannel === "hide")
        if (typeof s != "string")
          s.a = 1, a = s;
        else if ([5, 9].includes(s.length)) {
          const i = (s.length - 1) / 4;
          a = s.substring(0, s.length - i) + "f".repeat(i);
        } else
          [4, 7].includes(s.length) && (a = s + "f".repeat((s.length - 1) / 3));
      if (!$t(l[e], a)) {
        l[e] = a;
        for (const i of r)
          i !== e && (l[i] = Tt(e, i, a));
        o("color-change", pt());
      }
      c.value instanceof HTMLElement && f.value instanceof HTMLElement && m.value instanceof HTMLElement && ft(c.value, f.value, m.value);
    }
    async function ct() {
      const e = l[u.value], s = n.alphaChannel === "hide", a = Z(e, u.value, s);
      await window.navigator.clipboard.writeText(a);
    }
    function ht(e, s) {
      return j[e][s].to(l[e][s]);
    }
    function ft(e, s, a) {
      e.style.setProperty("--vacp-hsl-h", String(l.hsl.h)), e.style.setProperty("--vacp-hsl-s", String(l.hsl.s)), e.style.setProperty("--vacp-hsl-l", String(l.hsl.l)), e.style.setProperty("--vacp-hsl-a", String(l.hsl.a)), s.style.position = "relative", s.style.backgroundColor = "hsl(var(--vacp-hsl-h) 100% 50%)", s.style.backgroundImage = "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)", a.style.boxSizing = "border-box", a.style.position = "absolute", a.style.left = `${l.hsv.s}%`, a.style.bottom = `${l.hsv.v}%`;
    }
    function pt() {
      const e = n.alphaChannel === "hide", s = Z(l[u.value], u.value, e);
      return {
        colors: l,
        cssColor: s
      };
    }
    function vt(e, s, a) {
      const i = e.getBoundingClientRect(), d = s - i.left, w = a - i.top;
      return {
        x: i.width === 0 ? 0 : g(d / i.width * 100, 0, 100),
        y: i.height === 0 ? 0 : g((1 - w / i.height) * 100, 0, 100)
      };
    }
    function X(e) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(e.key) || !e.shiftKey)
        return;
      const s = e.currentTarget, a = Number(s.step), i = ["ArrowLeft", "ArrowDown"].includes(e.key) ? -1 : 1, d = Number(s.value) + i * a * 10, w = g(d, Number(s.min), Number(s.max));
      s.value = String(w - i * a);
    }
    return (e, s) => (y(), x("div", {
      ref_key: "colorPicker",
      ref: c,
      class: "vacp-color-picker"
    }, [
      h("div", {
        ref_key: "colorSpace",
        ref: f,
        class: "vacp-color-space",
        onMousedown: at,
        onTouchstart: lt
      }, [
        h("div", {
          ref_key: "thumb",
          ref: m,
          class: "vacp-color-space-thumb",
          tabindex: "0",
          "aria-label": "Color space thumb",
          onKeydown: it
        }, null, 544)
      ], 544),
      h("div", kt, [
        h("label", {
          class: "vacp-range-input-label vacp-range-input-label--hue",
          for: `${e.id}-hue-slider`
        }, [
          h("span", Ht, [
            k(e.$slots, "hue-range-input-label", {}, () => [
              q("Hue")
            ])
          ]),
          h("input", {
            id: `${e.id}-hue-slider`,
            class: "vacp-range-input vacp-range-input--hue",
            value: l.hsv.h,
            type: "range",
            min: "0",
            max: "360",
            step: "1",
            onKeydownPassive: X,
            onInput: s[0] || (s[0] = (a) => K(a, "h"))
          }, null, 40, Lt)
        ], 8, At),
        e.alphaChannel === "show" ? (y(), x("label", {
          key: 0,
          class: "vacp-range-input-label vacp-range-input-label--alpha",
          for: `${e.id}-alpha-slider`
        }, [
          h("span", St, [
            k(e.$slots, "alpha-range-input-label", {}, () => [
              q("Alpha")
            ])
          ]),
          h("input", {
            id: `${e.id}-alpha-slider`,
            class: "vacp-range-input vacp-range-input--alpha",
            value: l.hsv.a,
            type: "range",
            min: "0",
            max: "1",
            step: "0.01",
            onKeydownPassive: X,
            onInput: s[1] || (s[1] = (a) => K(a, "a"))
          }, null, 40, It)
        ], 8, Et)) : G("", !0)
      ]),
      h("button", {
        class: "vacp-copy-button",
        type: "button",
        onClick: ct
      }, [
        k(e.$slots, "copy-button", {}, () => [
          Pt,
          Vt
        ])
      ]),
      h("div", Rt, [
        h("div", Wt, [
          u.value === "hex" ? (y(), x("label", {
            key: 0,
            class: "vacp-color-input-label",
            for: `${e.id}-color-hex`
          }, [
            Dt,
            h("input", {
              id: `${e.id}-color-hex`,
              class: "vacp-color-input",
              type: "text",
              value: st.value,
              onInput: ut
            }, null, 40, jt)
          ], 8, Ot)) : (y(!0), x(yt, { key: 1 }, xt(N.value, (a) => (y(), x("label", {
            id: `${e.id}-color-${u.value}-${a}-label`,
            key: `${e.id}-color-${u.value}-${a}-label`,
            class: "vacp-color-input-label",
            for: `${e.id}-color-${u.value}-${a}`,
            onInput: (i) => U(i, a)
          }, [
            h("span", Bt, Ct(a.toUpperCase()), 1),
            h("input", {
              id: `${e.id}-color-${u.value}-${a}`,
              class: "vacp-color-input",
              type: "text",
              value: ht(u.value, a),
              onInput: (i) => U(i, a)
            }, null, 40, Kt)
          ], 40, zt))), 128))
        ]),
        e.visibleFormats.length > 1 ? (y(), x("button", {
          key: 0,
          class: "vacp-format-switch-button",
          type: "button",
          onClick: rt
        }, [
          k(e.$slots, "format-switch-button", {}, () => [
            Ut,
            Xt
          ])
        ])) : G("", !0)
      ])
    ], 512));
  }
});
const Gt = {
  install(t) {
    t.component("ColorPicker", Yt);
  }
};
export {
  Yt as ColorPicker,
  Gt as default
};
