import { defineComponent as pt, ref as A, reactive as vt, computed as Y, watch as dt, onMounted as mt, onBeforeUnmount as gt, openBlock as y, createElementBlock as x, createElementVNode as h, renderSlot as M, createTextVNode as q, createCommentVNode as G, Fragment as bt, renderList as wt, toDisplayString as yt } from "vue";
function g(t, o, e) {
  return Math.max(o, Math.min(t, e));
}
function p(t, o) {
  const e = t.toFixed(o);
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function J(t) {
  return t.endsWith(".") ? NaN : (parseFloat(t) % 360 + 360) % 360 / 360;
}
function Q(t) {
  return p(t * 360, 2);
}
function _(t) {
  if (!t.endsWith("%"))
    return NaN;
  const o = t.substring(0, t.length - 1);
  if (o.endsWith("."))
    return NaN;
  const e = parseFloat(o);
  return Number.isNaN(e) ? NaN : g(e, 0, 100) / 100;
}
function k(t) {
  return p(t * 100, 2) + "%";
}
function E(t) {
  if (t.endsWith("%"))
    return _(t);
  if (t.endsWith("."))
    return NaN;
  const o = parseFloat(t);
  return Number.isNaN(o) ? NaN : g(o, 0, 255) / 255;
}
function P(t) {
  return p(t * 255, 2);
}
function S(t) {
  return t.endsWith("%") ? _(t) : g(parseFloat(t), 0, 1);
}
function V(t) {
  return String(t);
}
const j = {
  hsl: {
    h: {
      to: Q,
      from: J
    },
    s: {
      to: k,
      from: _
    },
    l: {
      to: k,
      from: _
    },
    a: {
      to: V,
      from: S
    }
  },
  hwb: {
    h: {
      to: Q,
      from: J
    },
    w: {
      to: k,
      from: _
    },
    b: {
      to: k,
      from: _
    },
    a: {
      to: V,
      from: S
    }
  },
  rgb: {
    r: {
      to: P,
      from: E
    },
    g: {
      to: P,
      from: E
    },
    b: {
      to: P,
      from: E
    },
    a: {
      to: V,
      from: S
    }
  }
};
function xt(t, o) {
  if (typeof t == "string" || typeof o == "string")
    return t === o;
  for (const e in t)
    if (t[e] !== o[e])
      return !1;
  return !0;
}
function H(t) {
  const o = t.replace(/^#/, ""), e = [], a = o.length > 4 ? 2 : 1;
  for (let f = 0; f < o.length; f += a) {
    const m = o.slice(f, f + a);
    e.push(m.repeat(a % 2 + 1));
  }
  e.length === 3 && e.push("ff");
  const u = e.map((f) => parseInt(f, 16) / 255);
  return {
    r: u[0],
    g: u[1],
    b: u[2],
    a: u[3]
  };
}
function Ct(t) {
  const o = t.l + t.s * Math.min(t.l, 1 - t.l), e = o === 0 ? 0 : 2 - 2 * t.l / o;
  return {
    h: t.h,
    s: e,
    v: o,
    a: t.a
  };
}
function W(t) {
  const o = t.l < 0.5 ? t.l * (1 + t.s) : t.l + t.s - t.l * t.s, e = 2 * t.l - o;
  return {
    r: R(e, o, t.h + 1 / 3),
    g: R(e, o, t.h),
    b: R(e, o, t.h - 1 / 3),
    a: t.a
  };
}
function R(t, o, e) {
  return e < 0 ? e += 1 : e > 1 && (e -= 1), e < 1 / 6 ? t + (o - t) * 6 * e : e < 1 / 2 ? o : e < 2 / 3 ? t + (o - t) * (2 / 3 - e) * 6 : t;
}
function $t(t) {
  const o = t.v - t.v * t.s / 2, e = Math.min(o, 1 - o), a = e === 0 ? 0 : (t.v - o) / e;
  return {
    h: t.h,
    s: a,
    l: o,
    a: t.a
  };
}
function _t(t) {
  return {
    h: t.h,
    w: (1 - t.s) * t.v,
    b: 1 - t.v,
    a: t.a
  };
}
function T(t) {
  return {
    r: O(5, t),
    g: O(3, t),
    b: O(1, t),
    a: t.a
  };
}
function O(t, o) {
  const e = (t + o.h * 6) % 6;
  return o.v - o.v * o.s * Math.max(0, Math.min(e, 4 - e, 1));
}
function C(t) {
  return {
    h: t.h,
    s: t.b === 1 ? 0 : 1 - t.w / (1 - t.b),
    v: 1 - t.b,
    a: t.a
  };
}
function $(t) {
  const o = Math.min(t.r, t.g, t.b), e = Math.max(t.r, t.g, t.b);
  let a;
  return e === o ? a = 0 : e === t.r ? a = (0 + (t.g - t.b) / (e - o)) / 6 : e === t.g ? a = (2 + (t.b - t.r) / (e - o)) / 6 : a = (4 + (t.r - t.g) / (e - o)) / 6, a < 0 && (a += 1), {
    h: a,
    w: o,
    b: 1 - e,
    a: t.a
  };
}
function D(t) {
  const o = $(t), e = o.w, a = 1 - o.b, u = (a + e) / 2;
  let f;
  return a === 0 || e === 1 ? f = 0 : f = (a - u) / Math.min(u, 1 - u), {
    h: o.h,
    s: f,
    l: u,
    a: t.a
  };
}
function N(t) {
  return "#" + Object.values(t).map((e) => {
    const a = e * 255, u = Math.round(a).toString(16);
    return u.length === 1 ? "0" + u : u;
  }).join("");
}
const Tt = {
  hex: {
    hex: (t) => t,
    hsl: (t) => D(H(t)),
    hsv: (t) => C($(H(t))),
    hwb: (t) => $(H(t)),
    rgb: H
  },
  hsl: {
    hex: (t) => N(W(t)),
    hsl: (t) => t,
    hsv: Ct,
    hwb: (t) => $(W(t)),
    rgb: W
  },
  hsv: {
    hex: (t) => N(T(t)),
    hsl: $t,
    hsv: (t) => t,
    hwb: _t,
    rgb: T
  },
  hwb: {
    hex: (t) => N(T(C(t))),
    hsl: (t) => D(T(C(t))),
    hsv: C,
    hwb: (t) => t,
    rgb: (t) => T(C(t))
  },
  rgb: {
    hex: N,
    hsl: D,
    hsv: (t) => C($(t)),
    hwb: $,
    rgb: (t) => t
  }
};
function Ft(t, o, e) {
  return Tt[t][o](e);
}
const At = {
  hex(t, o) {
    return o && [5, 9].includes(t.length) ? t.substring(0, t.length - (t.length - 1) / 4) : t;
  },
  hsl(t, o) {
    const e = p(t.h * 360, 2), a = p(t.s * 100, 2), u = p(t.l * 100, 2);
    return `hsl(${e} ${a}% ${u}%` + (o ? ")" : ` / ${p(t.a, 2)})`);
  },
  hwb(t, o) {
    const e = p(t.h * 360, 2), a = p(t.w * 100, 2), u = p(t.b * 100, 2);
    return `hwb(${e} ${a}% ${u}%` + (o ? ")" : ` / ${p(t.a, 2)})`);
  },
  rgb(t, o) {
    const e = p(t.r * 255, 2), a = p(t.g * 255, 2), u = p(t.b * 255, 2);
    return `rgb(${e} ${a} ${u}` + (o ? ")" : ` / ${p(t.a, 2)})`);
  }
};
function Z(t, o, e) {
  return At[o](t, e);
}
function tt(t) {
  return /^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t);
}
function Mt(t) {
  return "r" in t ? "rgb" : "w" in t ? "hwb" : "v" in t ? "hsv" : "s" in t ? "hsl" : null;
}
function kt(t) {
  if (typeof t != "string")
    return { format: Mt(t), color: t };
  if (t.startsWith("#"))
    return tt(t) ? { format: "hex", color: t } : null;
  if (!t.includes("(")) {
    const d = document.createElement("canvas").getContext("2d");
    d.fillStyle = t;
    const c = d.fillStyle;
    return c === "#000000" && t !== "black" ? null : { format: "hex", color: c };
  }
  const [o, e] = t.split("("), a = o.substring(0, 3), u = e.replace(/[,/)]/g, " ").replace(/\s+/g, " ").trim().split(" ");
  u.length === 3 && u.push("1");
  const f = (a + "a").split(""), m = Object.fromEntries(f.map((d, c) => {
    const i = j[a][d];
    return [
      d,
      i.from(u[c])
    ];
  }));
  return { format: a, color: m };
}
const Ht = { class: "vacp-range-input-group" }, Nt = ["for"], It = { class: "vacp-range-input-label-text vacp-range-input-label-text--hue" }, Lt = ["id", "value"], Et = ["for"], Pt = { class: "vacp-range-input-label-text vacp-range-input-label-text--alpha" }, St = ["id", "value"], Vt = /* @__PURE__ */ h("span", { class: "vacp-visually-hidden" }, "Copy color", -1), Wt = /* @__PURE__ */ h("svg", {
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
], -1), Rt = { class: "vacp-color-inputs" }, Ot = { class: "vacp-color-input-group" }, Dt = ["for"], jt = /* @__PURE__ */ h("span", { class: "vacp-color-input-label-text" }, " Hex ", -1), zt = ["id", "value"], Bt = ["id", "for", "onInput"], Kt = { class: "vacp-color-input-label-text" }, Ut = ["id", "value", "onInput"], Xt = /* @__PURE__ */ h("span", { class: "vacp-visually-hidden" }, "Switch format", -1), Yt = /* @__PURE__ */ h("svg", {
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
], -1), qt = /* @__PURE__ */ pt({
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
    const e = t, a = ["hex", "hsl", "hsv", "hwb", "rgb"], u = A(null), f = A(null), m = A(null);
    let d = !1;
    const c = A(e.visibleFormats.includes(e.defaultFormat) ? e.defaultFormat : e.visibleFormats[0]), i = vt({
      hex: "#ffffffff",
      hsl: { h: 0, s: 0, l: 1, a: 1 },
      hsv: { h: 0, s: 0, v: 1, a: 1 },
      hwb: { h: 0, w: 1, b: 0, a: 1 },
      rgb: { r: 1, g: 1, b: 1, a: 1 }
    }), et = Y(function() {
      const n = Object.keys(i[c.value]);
      return c.value !== "hex" && e.alphaChannel === "hide" ? n.slice(0, 3) : n;
    }), nt = Y(function() {
      return e.alphaChannel === "hide" && [5, 9].includes(i.hex.length) ? i.hex.substring(0, i.hex.length - (i.hex.length - 1) / 4) : i.hex;
    });
    dt(() => e.color, B), mt(function() {
      document.addEventListener("mousemove", I, { passive: !1 }), document.addEventListener("touchmove", L, { passive: !1 }), document.addEventListener("mouseup", F), document.addEventListener("touchend", F), B(e.color);
    }), gt(function() {
      document.removeEventListener("mousemove", I), document.removeEventListener("touchmove", L), document.removeEventListener("mouseup", F), document.removeEventListener("touchend", F);
    });
    function ot() {
      const s = (e.visibleFormats.findIndex((r) => r === c.value) + 1) % e.visibleFormats.length;
      c.value = e.visibleFormats[s];
    }
    function st(n) {
      d = !0, I(n);
    }
    function rt(n) {
      d = !0, L(n);
    }
    function F() {
      d = !1;
    }
    function I(n) {
      n.buttons !== 1 || d === !1 || !(f.value instanceof HTMLElement) || z(f.value, n.clientX, n.clientY);
    }
    function L(n) {
      if (d === !1 || !(f.value instanceof HTMLElement))
        return;
      n.preventDefault();
      const s = n.touches[0];
      z(f.value, s.clientX, s.clientY);
    }
    function z(n, s, r) {
      const l = ft(n, s, r), v = Object.assign({}, i.hsv);
      v.s = l.x, v.v = l.y, b("hsv", v);
    }
    function at(n) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(n.key))
        return;
      n.preventDefault();
      const s = ["ArrowLeft", "ArrowDown"].includes(n.key) ? -1 : 1, r = ["ArrowLeft", "ArrowRight"].includes(n.key) ? "s" : "v", l = n.shiftKey ? 10 : 1, v = i.hsv[r] + s * l * 0.01, w = Object.assign({}, i.hsv);
      w[r] = g(v, 0, 1), b("hsv", w);
    }
    function B(n) {
      const s = kt(n);
      s !== null && b(s.format, s.color);
    }
    function K(n, s) {
      const r = n.currentTarget, l = Object.assign({}, i.hsv);
      l[s] = parseInt(r.value) / parseInt(r.max), b("hsv", l);
    }
    function lt(n) {
      const s = n.target;
      tt(s.value) && b("hex", s.value);
    }
    function U(n, s) {
      const r = n.target, l = Object.assign({}, i[c.value]), v = j[c.value][s].from(r.value);
      Number.isNaN(v) || v === void 0 || (l[s] = v, b(c.value, l));
    }
    function b(n, s) {
      let r = s;
      if (e.alphaChannel === "hide")
        if (typeof s != "string")
          s.a = 1, r = s;
        else if ([5, 9].includes(s.length)) {
          const l = (s.length - 1) / 4;
          r = s.substring(0, s.length - l) + "f".repeat(l);
        } else
          [4, 7].includes(s.length) && (r = s + "f".repeat((s.length - 1) / 3));
      if (!xt(i[n], r)) {
        i[n] = r;
        for (const l of a)
          l !== n && (i[l] = Ft(n, l, r));
        o("color-change", ht());
      }
      u.value instanceof HTMLElement && f.value instanceof HTMLElement && m.value instanceof HTMLElement && ct(u.value, f.value, m.value);
    }
    async function it() {
      const n = i[c.value], s = e.alphaChannel === "hide", r = Z(n, c.value, s);
      await window.navigator.clipboard.writeText(r);
    }
    function ut(n, s) {
      return j[n][s].to(i[n][s]);
    }
    function ct(n, s, r) {
      n.style.setProperty("--vacp-hsl-h", String(i.hsl.h)), n.style.setProperty("--vacp-hsl-s", String(i.hsl.s)), n.style.setProperty("--vacp-hsl-l", String(i.hsl.l)), n.style.setProperty("--vacp-hsl-a", String(i.hsl.a)), s.style.position = "relative", s.style.backgroundColor = "hsl(calc(var(--vacp-hsl-h) * 360) 100% 50%)", s.style.backgroundImage = "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)", r.style.boxSizing = "border-box", r.style.position = "absolute", r.style.left = `${i.hsv.s * 100}%`, r.style.bottom = `${i.hsv.v * 100}%`;
    }
    function ht() {
      const n = e.alphaChannel === "hide", s = Z(i[c.value], c.value, n);
      return {
        colors: i,
        cssColor: s
      };
    }
    function ft(n, s, r) {
      const l = n.getBoundingClientRect(), v = s - l.left, w = r - l.top;
      return {
        x: l.width === 0 ? 0 : g(v / l.width, 0, 1),
        y: l.height === 0 ? 0 : g(1 - w / l.height, 0, 1)
      };
    }
    function X(n) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(n.key) || !n.shiftKey)
        return;
      const s = n.currentTarget, r = parseFloat(s.step), l = ["ArrowLeft", "ArrowDown"].includes(n.key) ? -1 : 1, v = parseFloat(s.value) + l * r * 10, w = g(v, parseInt(s.min), parseInt(s.max));
      s.value = String(w - l * r);
    }
    return (n, s) => (y(), x("div", {
      ref_key: "colorPicker",
      ref: u,
      class: "vacp-color-picker"
    }, [
      h("div", {
        ref_key: "colorSpace",
        ref: f,
        class: "vacp-color-space",
        onMousedown: st,
        onTouchstart: rt
      }, [
        h("div", {
          ref_key: "thumb",
          ref: m,
          class: "vacp-color-space-thumb",
          tabindex: "0",
          "aria-label": "Color space thumb",
          onKeydown: at
        }, null, 544)
      ], 544),
      h("div", Ht, [
        h("label", {
          class: "vacp-range-input-label vacp-range-input-label--hue",
          for: `${n.id}-hue-slider`
        }, [
          h("span", It, [
            M(n.$slots, "hue-range-input-label", {}, () => [
              q("Hue")
            ])
          ]),
          h("input", {
            id: `${n.id}-hue-slider`,
            class: "vacp-range-input vacp-range-input--hue",
            value: i.hsv.h * 360,
            type: "range",
            min: "0",
            max: "360",
            step: "1",
            onKeydownPassive: X,
            onInput: s[0] || (s[0] = (r) => K(r, "h"))
          }, null, 40, Lt)
        ], 8, Nt),
        n.alphaChannel === "show" ? (y(), x("label", {
          key: 0,
          class: "vacp-range-input-label vacp-range-input-label--alpha",
          for: `${n.id}-alpha-slider`
        }, [
          h("span", Pt, [
            M(n.$slots, "alpha-range-input-label", {}, () => [
              q("Alpha")
            ])
          ]),
          h("input", {
            id: `${n.id}-alpha-slider`,
            class: "vacp-range-input vacp-range-input--alpha",
            value: i.hsv.a * 100,
            type: "range",
            min: "0",
            max: "100",
            step: "1",
            onKeydownPassive: X,
            onInput: s[1] || (s[1] = (r) => K(r, "a"))
          }, null, 40, St)
        ], 8, Et)) : G("", !0)
      ]),
      h("button", {
        class: "vacp-copy-button",
        type: "button",
        onClick: it
      }, [
        M(n.$slots, "copy-button", {}, () => [
          Vt,
          Wt
        ])
      ]),
      h("div", Rt, [
        h("div", Ot, [
          c.value === "hex" ? (y(), x("label", {
            key: 0,
            class: "vacp-color-input-label",
            for: `${n.id}-color-hex`
          }, [
            jt,
            h("input", {
              id: `${n.id}-color-hex`,
              class: "vacp-color-input",
              type: "text",
              value: nt.value,
              onInput: lt
            }, null, 40, zt)
          ], 8, Dt)) : (y(!0), x(bt, { key: 1 }, wt(et.value, (r) => (y(), x("label", {
            id: `${n.id}-color-${c.value}-${r}-label`,
            key: `${n.id}-color-${c.value}-${r}-label`,
            class: "vacp-color-input-label",
            for: `${n.id}-color-${c.value}-${r}`,
            onInput: (l) => U(l, r)
          }, [
            h("span", Kt, yt(r.toUpperCase()), 1),
            h("input", {
              id: `${n.id}-color-${c.value}-${r}`,
              class: "vacp-color-input",
              type: "text",
              value: ut(c.value, r),
              onInput: (l) => U(l, r)
            }, null, 40, Ut)
          ], 40, Bt))), 128))
        ]),
        n.visibleFormats.length > 1 ? (y(), x("button", {
          key: 0,
          class: "vacp-format-switch-button",
          type: "button",
          onClick: ot
        }, [
          M(n.$slots, "format-switch-button", {}, () => [
            Xt,
            Yt
          ])
        ])) : G("", !0)
      ])
    ], 512));
  }
});
const Jt = {
  install(t) {
    t.component("ColorPicker", qt);
  }
};
export {
  qt as ColorPicker,
  Jt as default
};
