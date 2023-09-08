import { defineComponent as vt, ref as k, reactive as pt, computed as B, watch as dt, onMounted as mt, onBeforeUnmount as gt, openBlock as w, createElementBlock as y, createElementVNode as f, renderSlot as I, createTextVNode as U, createCommentVNode as X, Fragment as bt, renderList as wt, toDisplayString as yt } from "vue";
function M(t, o, n) {
  return Math.max(o, Math.min(t, n));
}
function xt(t, o) {
  if (typeof t == "string" || typeof o == "string")
    return t === o;
  for (const n in t)
    if (t[n] !== o[n])
      return !1;
  return !0;
}
function N(t) {
  const o = [], n = t.length > 5 ? 2 : 1;
  for (let r = 1; r < t.length; r += n) {
    const c = t.substring(r, r + n).repeat(n % 2 + 1), h = parseInt(c, 16);
    o.push(r === 3 * n + 1 ? h / 255 : h);
  }
  return o.length === 3 && o.push(1), {
    r: o[0],
    g: o[1],
    b: o[2],
    a: o[3]
  };
}
function Q(t) {
  const o = t.l / 100, n = o + t.s / 100 * Math.min(o, 1 - o), r = n === 0 ? 0 : 200 * (1 - o / n);
  return {
    h: t.h,
    s: r,
    v: n * 100,
    a: t.a
  };
}
function A(t) {
  let o = t.h % 360;
  o < 0 && (o += 360);
  const n = t.s / 100, r = t.l / 100;
  return {
    r: O(0, o, n, r) * 255,
    g: O(8, o, n, r) * 255,
    b: O(4, o, n, r) * 255,
    a: t.a
  };
}
function O(t, o, n, r) {
  const c = (t + o / 30) % 12, h = n * Math.min(r, 1 - r);
  return r - h * Math.max(-1, Math.min(c - 3, 9 - c, 1));
}
function Z(t) {
  const o = t.s / 100, n = t.v / 100, r = n * (1 - o / 2);
  return {
    h: t.h,
    s: r === 0 || r === 1 ? 0 : (n - r) / Math.min(r, 1 - r) * 100,
    l: r * 100,
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
function _(t) {
  return A(Z(t));
}
function x(t) {
  const o = t.w / 100, n = t.b / 100;
  let r, c;
  const h = o + n;
  return h >= 1 ? (r = 0, c = o / h) : (c = 1 - n, r = (1 - o / c) * 100), {
    h: t.h,
    s: r,
    v: c * 100,
    a: t.a
  };
}
function H(t) {
  const { r: o, g: n, b: r, a: c } = t, h = Math.min(o, n, r), p = Math.max(o, n, r), v = p - h, u = (p + h) / 2;
  let l = 0;
  v !== 0 && (p === o ? l = (n - r) / v + (n < r ? 6 : 0) : p === n ? l = (r - o) / v + 2 : p === r && (l = (o - n) / v + 4), l *= 60);
  let $ = 0;
  return u !== 0 && u !== 255 && ($ = (p - u) / Math.min(u, 255 - u)), {
    h: l,
    s: $ * 100,
    l: u / 255 * 100,
    a: c
  };
}
function V(t) {
  return "#" + Object.values(t).map((o, n) => Math.round(n === 3 ? o * 255 : o).toString(16).padStart(2, "0")).join("");
}
function T(t) {
  return tt(Q(H(t)));
}
const Ct = {
  hex: {
    hex: (t) => t,
    hsl: (t) => H(N(t)),
    hsv: (t) => x(T(N(t))),
    hwb: (t) => T(N(t)),
    rgb: N
  },
  hsl: {
    hex: (t) => V(A(t)),
    hsl: (t) => t,
    hsv: Q,
    hwb: (t) => T(A(t)),
    rgb: A
  },
  hsv: {
    hex: (t) => V(_(t)),
    hsl: Z,
    hsv: (t) => t,
    hwb: tt,
    rgb: _
  },
  hwb: {
    hex: (t) => V(_(x(t))),
    hsl: (t) => H(_(x(t))),
    hsv: x,
    hwb: (t) => t,
    rgb: (t) => _(x(t))
  },
  rgb: {
    hex: V,
    hsl: H,
    hsv: (t) => x(T(t)),
    hwb: T,
    rgb: (t) => t
  }
};
function _t(t, o, n) {
  return Ct[t][o](n);
}
function Tt(t, o) {
  const n = t.toFixed(o);
  return n.includes(".") ? n.replace(/\.?0+$/, "") : n;
}
const Mt = {
  deg: 1,
  grad: 0.9,
  rad: 180 / Math.PI,
  turn: 360
}, R = {
  from(t) {
    return t.endsWith("%") ? C.from(t, { referenceValue: 1 }) : m.from(t, { min: 0, max: 1 });
  },
  to(t) {
    return m.to(t);
  }
}, q = {
  from(t) {
    const o = t.match(/deg|g?rad|turn$/);
    if (o === null)
      return m.from(t);
    const n = o[0];
    return m.from(t.slice(0, -n.length)) * Mt[n];
  },
  to(t) {
    return m.to(t);
  }
}, m = {
  from(t, { min: o = Number.NEGATIVE_INFINITY, max: n = Number.POSITIVE_INFINITY } = {}) {
    return t.endsWith(".") ? NaN : M(Number(t), o, n);
  },
  to(t) {
    return Tt(t, 2);
  }
}, C = {
  from(t, { referenceValue: o = 100, min: n = 0, max: r = 100 } = {}) {
    return t.endsWith("%") ? m.from(t.slice(0, -1), { min: n, max: r }) * o / 100 : NaN;
  },
  to(t) {
    return m.to(t) + "%";
  }
}, j = {
  from(t) {
    return t.endsWith("%") ? C.from(t, { referenceValue: 255 }) : m.from(t, { min: 0, max: 255 });
  },
  to(t) {
    return m.to(t);
  }
}, $t = {
  hsl: {
    h: q,
    s: C,
    l: C,
    a: R
  },
  hwb: {
    h: q,
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
function E(t, o) {
  return $t[t][o];
}
function G({ format: t, color: o }, n) {
  if (t === "hex")
    return n && [5, 9].includes(o.length) ? o.substring(0, o.length - (o.length - 1) / 4) : o;
  const r = Object.entries(o).slice(0, n ? 3 : 4).map(([c, h]) => {
    const p = E(t, c);
    return (c === "a" ? "/ " : "") + p.to(h);
  });
  return `${t}(${r.join(" ")})`;
}
function et(t) {
  return /^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t);
}
function Ft(t) {
  return "r" in t ? "rgb" : "w" in t ? "hwb" : "v" in t ? "hsv" : "s" in t ? "hsl" : null;
}
const J = {
  hsl: ["h", "s", "l", "a"],
  hwb: ["h", "w", "b", "a"],
  rgb: ["r", "g", "b", "a"]
};
function kt(t) {
  if (typeof t != "string") {
    const v = Ft(t);
    return v === null ? null : { format: v, color: t };
  }
  if (t.startsWith("#"))
    return et(t) ? { format: "hex", color: t } : null;
  if (!t.includes("(")) {
    const v = document.createElement("canvas").getContext("2d");
    v.fillStyle = t;
    const u = v.fillStyle;
    return u === "#000000" && t !== "black" ? null : { format: "hex", color: u };
  }
  const [o, n] = t.split("("), r = o.substring(0, 3);
  if (!(r in J))
    return null;
  const c = n.replace(/[,/)]/g, " ").replace(/\s+/g, " ").trim().split(" ");
  c.length === 3 && c.push("1");
  const h = J[r], p = Object.fromEntries(h.map((v, u) => {
    const l = E(r, v);
    return [
      v,
      l.from(c[u])
    ];
  }));
  return { format: r, color: p };
}
const It = { class: "vacp-range-input-group" }, Nt = ["for"], Vt = { class: "vacp-range-input-label-text vacp-range-input-label-text--hue" }, At = ["id", "value"], Ht = ["for"], Et = { class: "vacp-range-input-label-text vacp-range-input-label-text--alpha" }, Lt = ["id", "value"], St = /* @__PURE__ */ f("span", { class: "vacp-visually-hidden" }, "Copy color", -1), Pt = /* @__PURE__ */ f("svg", {
  class: "vacp-icon",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  width: "24",
  height: "24",
  viewBox: "0 0 32 32"
}, [
  /* @__PURE__ */ f("path", {
    d: "M25.313 28v-18.688h-14.625v18.688h14.625zM25.313 6.688c1.438 0 2.688 1.188 2.688 2.625v18.688c0 1.438-1.25 2.688-2.688 2.688h-14.625c-1.438 0-2.688-1.25-2.688-2.688v-18.688c0-1.438 1.25-2.625 2.688-2.625h14.625zM21.313 1.313v2.688h-16v18.688h-2.625v-18.688c0-1.438 1.188-2.688 2.625-2.688h16z",
    fill: "currentColor"
  })
], -1), Ot = { class: "vacp-color-inputs" }, Rt = { class: "vacp-color-input-group" }, jt = ["for"], Wt = /* @__PURE__ */ f("span", { class: "vacp-color-input-label-text" }, " Hex ", -1), Dt = ["id", "value"], zt = ["id", "for", "onInput"], Kt = { class: "vacp-color-input-label-text" }, Yt = ["id", "value", "onInput"], Bt = /* @__PURE__ */ f("span", { class: "vacp-visually-hidden" }, "Switch format", -1), Ut = /* @__PURE__ */ f("svg", {
  class: "vacp-icon",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "15"
}, [
  /* @__PURE__ */ f("path", {
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
  setup(t, { emit: o }) {
    const n = t, r = ["hex", "hsl", "hsv", "hwb", "rgb"], c = k(null), h = k(null), p = k(null);
    let v = !1;
    const u = k(n.visibleFormats.includes(n.defaultFormat) ? n.defaultFormat : n.visibleFormats[0]), l = pt({
      hex: "#ffffffff",
      hsl: { h: 0, s: 0, l: 100, a: 1 },
      hsv: { h: 0, s: 0, v: 100, a: 1 },
      hwb: { h: 0, w: 100, b: 0, a: 1 },
      rgb: { r: 255, g: 255, b: 255, a: 1 }
    }), $ = B(function() {
      const e = Object.keys(l[u.value]);
      return u.value !== "hex" && n.alphaChannel === "hide" ? e.slice(0, 3) : e;
    }), nt = B(function() {
      return n.alphaChannel === "hide" && [5, 9].includes(l.hex.length) ? l.hex.substring(0, l.hex.length - (l.hex.length - 1) / 4) : l.hex;
    });
    dt(() => n.color, D), mt(function() {
      document.addEventListener("mousemove", L, { passive: !1 }), document.addEventListener("touchmove", S, { passive: !1 }), document.addEventListener("mouseup", F), document.addEventListener("touchend", F), D(n.color);
    }), gt(function() {
      document.removeEventListener("mousemove", L), document.removeEventListener("touchmove", S), document.removeEventListener("mouseup", F), document.removeEventListener("touchend", F);
    });
    function ot() {
      const s = (n.visibleFormats.findIndex((a) => a === u.value) + 1) % n.visibleFormats.length;
      u.value = n.visibleFormats[s];
    }
    function st(e) {
      v = !0, L(e);
    }
    function rt(e) {
      v = !0, S(e);
    }
    function F() {
      v = !1;
    }
    function L(e) {
      e.buttons !== 1 || v === !1 || !(h.value instanceof HTMLElement) || W(h.value, e.clientX, e.clientY);
    }
    function S(e) {
      if (v === !1 || !(h.value instanceof HTMLElement))
        return;
      e.preventDefault();
      const s = e.touches[0];
      W(h.value, s.clientX, s.clientY);
    }
    function W(e, s, a) {
      const i = ft(e, s, a), d = Object.assign({}, l.hsv);
      d.s = i.x, d.v = i.y, b("hsv", d);
    }
    function at(e) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(e.key))
        return;
      e.preventDefault();
      const s = ["ArrowLeft", "ArrowDown"].includes(e.key) ? -1 : 1, a = ["ArrowLeft", "ArrowRight"].includes(e.key) ? "s" : "v", i = e.shiftKey ? 10 : 1, d = l.hsv[a] + s * i, g = Object.assign({}, l.hsv);
      g[a] = M(d, 0, 100), b("hsv", g);
    }
    function D(e) {
      const s = kt(e);
      s !== null && b(s.format, s.color);
    }
    function z(e, s) {
      const a = e.currentTarget, i = Object.assign({}, l.hsv);
      i[s] = Number(a.value), b("hsv", i);
    }
    function lt(e) {
      const s = e.target;
      et(s.value) && b("hex", s.value);
    }
    function K(e, s) {
      const a = e.target, i = u.value, d = Object.assign({}, l[i]), P = E(i, s).from(a.value);
      Number.isNaN(P) || P === void 0 || (d[s] = P, b(i, d));
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
      if (!xt(l[e], a)) {
        l[e] = a;
        for (const i of r)
          i !== e && (l[i] = _t(e, i, a));
        o("color-change", ht());
      }
      c.value instanceof HTMLElement && h.value instanceof HTMLElement && p.value instanceof HTMLElement && ct(c.value, h.value, p.value);
    }
    async function it() {
      const e = l[u.value], s = n.alphaChannel === "hide", a = G({ color: e, format: u.value }, s);
      await window.navigator.clipboard.writeText(a);
    }
    function ut(e) {
      const s = u.value;
      return E(s, e).to(l[s][e]);
    }
    function ct(e, s, a) {
      e.style.setProperty("--vacp-hsl-h", String(l.hsl.h)), e.style.setProperty("--vacp-hsl-s", String(l.hsl.s)), e.style.setProperty("--vacp-hsl-l", String(l.hsl.l)), e.style.setProperty("--vacp-hsl-a", String(l.hsl.a)), s.style.position = "relative", s.style.backgroundColor = "hsl(var(--vacp-hsl-h) 100% 50%)", s.style.backgroundImage = "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)", a.style.boxSizing = "border-box", a.style.position = "absolute", a.style.left = `${l.hsv.s}%`, a.style.bottom = `${l.hsv.v}%`;
    }
    function ht() {
      const e = n.alphaChannel === "hide", s = G({ color: l[u.value], format: u.value }, e);
      return {
        colors: l,
        cssColor: s
      };
    }
    function ft(e, s, a) {
      const i = e.getBoundingClientRect(), d = s - i.left, g = a - i.top;
      return {
        x: i.width === 0 ? 0 : M(d / i.width * 100, 0, 100),
        y: i.height === 0 ? 0 : M((1 - g / i.height) * 100, 0, 100)
      };
    }
    function Y(e) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(e.key) || !e.shiftKey)
        return;
      const s = e.currentTarget, a = Number(s.step), i = ["ArrowLeft", "ArrowDown"].includes(e.key) ? -1 : 1, d = Number(s.value) + i * a * 10, g = M(d, Number(s.min), Number(s.max));
      s.value = String(g - i * a);
    }
    return (e, s) => (w(), y("div", {
      ref_key: "colorPicker",
      ref: c,
      class: "vacp-color-picker"
    }, [
      f("div", {
        ref_key: "colorSpace",
        ref: h,
        class: "vacp-color-space",
        onMousedown: st,
        onTouchstart: rt
      }, [
        f("div", {
          ref_key: "thumb",
          ref: p,
          class: "vacp-color-space-thumb",
          tabindex: "0",
          "aria-label": "Color space thumb",
          onKeydown: at
        }, null, 544)
      ], 544),
      f("div", It, [
        f("label", {
          class: "vacp-range-input-label vacp-range-input-label--hue",
          for: `${e.id}-hue-slider`
        }, [
          f("span", Vt, [
            I(e.$slots, "hue-range-input-label", {}, () => [
              U("Hue")
            ])
          ]),
          f("input", {
            id: `${e.id}-hue-slider`,
            class: "vacp-range-input vacp-range-input--hue",
            value: l.hsv.h,
            type: "range",
            min: "0",
            max: "360",
            step: "1",
            onKeydownPassive: Y,
            onInput: s[0] || (s[0] = (a) => z(a, "h"))
          }, null, 40, At)
        ], 8, Nt),
        e.alphaChannel === "show" ? (w(), y("label", {
          key: 0,
          class: "vacp-range-input-label vacp-range-input-label--alpha",
          for: `${e.id}-alpha-slider`
        }, [
          f("span", Et, [
            I(e.$slots, "alpha-range-input-label", {}, () => [
              U("Alpha")
            ])
          ]),
          f("input", {
            id: `${e.id}-alpha-slider`,
            class: "vacp-range-input vacp-range-input--alpha",
            value: l.hsv.a,
            type: "range",
            min: "0",
            max: "1",
            step: "0.01",
            onKeydownPassive: Y,
            onInput: s[1] || (s[1] = (a) => z(a, "a"))
          }, null, 40, Lt)
        ], 8, Ht)) : X("", !0)
      ]),
      f("button", {
        class: "vacp-copy-button",
        type: "button",
        onClick: it
      }, [
        I(e.$slots, "copy-button", {}, () => [
          St,
          Pt
        ])
      ]),
      f("div", Ot, [
        f("div", Rt, [
          u.value === "hex" ? (w(), y("label", {
            key: 0,
            class: "vacp-color-input-label",
            for: `${e.id}-color-hex`
          }, [
            Wt,
            f("input", {
              id: `${e.id}-color-hex`,
              class: "vacp-color-input",
              type: "text",
              value: nt.value,
              onInput: lt
            }, null, 40, Dt)
          ], 8, jt)) : (w(!0), y(bt, { key: 1 }, wt($.value, (a) => (w(), y("label", {
            id: `${e.id}-color-${u.value}-${a}-label`,
            key: `${e.id}-color-${u.value}-${a}-label`,
            class: "vacp-color-input-label",
            for: `${e.id}-color-${u.value}-${a}`,
            onInput: (i) => K(i, a)
          }, [
            f("span", Kt, yt(a.toUpperCase()), 1),
            f("input", {
              id: `${e.id}-color-${u.value}-${a}`,
              class: "vacp-color-input",
              type: "text",
              value: ut(a),
              onInput: (i) => K(i, a)
            }, null, 40, Yt)
          ], 40, zt))), 128))
        ]),
        e.visibleFormats.length > 1 ? (w(), y("button", {
          key: 0,
          class: "vacp-format-switch-button",
          type: "button",
          onClick: ot
        }, [
          I(e.$slots, "format-switch-button", {}, () => [
            Bt,
            Ut
          ])
        ])) : X("", !0)
      ])
    ], 512));
  }
});
const Gt = {
  install(t) {
    t.component("ColorPicker", Xt);
  }
};
export {
  Xt as ColorPicker,
  Gt as default
};
