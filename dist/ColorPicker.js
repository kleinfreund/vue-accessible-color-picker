import { defineComponent as ht, useTemplateRef as ft, ref as pt, reactive as vt, computed as O, watch as dt, onMounted as mt, onBeforeUnmount as bt, createElementBlock as w, openBlock as y, normalizeStyle as W, unref as gt, createElementVNode as h, createCommentVNode as Q, renderSlot as T, createTextVNode as Z, Fragment as wt, renderList as yt, toDisplayString as xt } from "vue";
function N(t, e, r) {
  return Math.max(e, Math.min(t, r));
}
function Ct(t, e) {
  if (typeof t == "string" || typeof e == "string")
    return t === e;
  for (const r in t)
    if (t[r] !== e[r])
      return !1;
  return !0;
}
function k(t) {
  const e = [], r = t.length > 5 ? 2 : 1;
  for (let s = 1; s < t.length; s += r) {
    const a = t.substring(s, s + r).repeat(r % 2 + 1), p = parseInt(a, 16);
    e.push(s === 3 * r + 1 ? p / 255 : p);
  }
  return e.length === 3 && e.push(1), {
    r: e[0],
    g: e[1],
    b: e[2],
    a: e[3]
  };
}
function nt(t) {
  const e = t.l / 100, r = e + t.s / 100 * Math.min(e, 1 - e), s = r === 0 ? 0 : 200 * (1 - e / r);
  return {
    h: t.h,
    s,
    v: r * 100,
    a: t.a
  };
}
function M(t) {
  let e = t.h % 360;
  e < 0 && (e += 360);
  const r = t.s / 100, s = t.l / 100;
  return {
    r: j(0, e, r, s) * 255,
    g: j(8, e, r, s) * 255,
    b: j(4, e, r, s) * 255,
    a: t.a
  };
}
function j(t, e, r, s) {
  const a = (t + e / 30) % 12, p = r * Math.min(s, 1 - s);
  return s - p * Math.max(-1, Math.min(a - 3, 9 - a, 1));
}
function ot(t) {
  const e = t.s / 100, r = t.v / 100, s = r * (1 - e / 2);
  return {
    h: t.h,
    s: s === 0 || s === 1 ? 0 : (r - s) / Math.min(s, 1 - s) * 100,
    l: s * 100,
    a: t.a
  };
}
function rt(t) {
  return {
    h: t.h,
    w: t.v * (100 - t.s) / 100,
    b: 100 - t.v,
    a: t.a
  };
}
function $(t) {
  return M(ot(t));
}
function x(t) {
  const e = t.w / 100, r = t.b / 100;
  let s, a;
  const p = e + r;
  return p >= 1 ? (s = 0, a = e / p) : (a = 1 - r, s = (1 - e / a) * 100), {
    h: t.h,
    s,
    v: a * 100,
    a: t.a
  };
}
function H(t) {
  const { r: e, g: r, b: s, a } = t, p = Math.min(e, r, s), v = Math.max(e, r, s), f = v - p, c = (v + p) / 2;
  let u = 0;
  f !== 0 && (v === e ? u = (r - s) / f + (r < s ? 6 : 0) : v === r ? u = (s - e) / f + 2 : v === s && (u = (e - r) / f + 4), u *= 60);
  let V = 0;
  return c !== 0 && c !== 255 && (V = (v - c) / Math.min(c, 255 - c)), {
    h: u,
    s: V * 100,
    l: c / 255 * 100,
    a
  };
}
function A(t) {
  return "#" + Object.values(t).map((e, r) => Math.round(r === 3 ? e * 255 : e).toString(16).padStart(2, "0")).join("");
}
function F(t) {
  return rt(nt(H(t)));
}
const Tt = {
  hex: {
    hex: (t) => t,
    hsl: (t) => H(k(t)),
    hsv: (t) => x(F(k(t))),
    hwb: (t) => F(k(t)),
    rgb: k
  },
  hsl: {
    hex: (t) => A(M(t)),
    hsl: (t) => t,
    hsv: nt,
    hwb: (t) => F(M(t)),
    rgb: M
  },
  hsv: {
    hex: (t) => A($(t)),
    hsl: ot,
    hsv: (t) => t,
    hwb: rt,
    rgb: $
  },
  hwb: {
    hex: (t) => A($(x(t))),
    hsl: (t) => H($(x(t))),
    hsv: x,
    hwb: (t) => t,
    rgb: (t) => $(x(t))
  },
  rgb: {
    hex: A,
    hsl: H,
    hsv: (t) => x(F(t)),
    hwb: F,
    rgb: (t) => t
  }
};
function $t(t, e, r) {
  return Tt[t][e](r);
}
function Ft(t, e) {
  const r = t.toFixed(e);
  return r.includes(".") ? r.replace(/\.?0+$/, "") : r;
}
const Nt = {
  deg: 1,
  grad: 0.9,
  rad: 180 / Math.PI,
  turn: 360
}, E = {
  from(t) {
    return t.endsWith("%") ? C.from(t, { referenceValue: 1 }) : b.from(t, { min: 0, max: 1 });
  },
  to(t) {
    return b.to(t);
  }
}, tt = {
  from(t) {
    const e = t.match(/deg|g?rad|turn$/);
    if (e === null)
      return b.from(t);
    const r = e[0];
    return b.from(t.slice(0, -r.length)) * Nt[r];
  },
  to(t) {
    return b.to(t);
  }
}, b = {
  from(t, { min: e = Number.NEGATIVE_INFINITY, max: r = Number.POSITIVE_INFINITY } = {}) {
    return t.endsWith(".") ? NaN : N(Number(t), e, r);
  },
  to(t) {
    return Ft(t, 2);
  }
}, C = {
  from(t, { referenceValue: e = 100, min: r = 0, max: s = 100 } = {}) {
    return t.endsWith("%") ? b.from(t.slice(0, -1), { min: r, max: s }) * e / 100 : NaN;
  },
  to(t) {
    return b.to(t) + "%";
  }
}, z = {
  from(t) {
    return t.endsWith("%") ? C.from(t, { referenceValue: 255 }) : b.from(t, { min: 0, max: 255 });
  },
  to(t) {
    return b.to(t);
  }
}, Vt = {
  hsl: {
    h: tt,
    s: C,
    l: C
  },
  hwb: {
    h: tt,
    w: C,
    b: C
  },
  rgb: {
    r: z,
    g: z,
    b: z
  }
};
function L(t, e) {
  return Vt[t][e];
}
function D({ format: t, color: e }, r) {
  if (t === "hex")
    return r && [5, 9].includes(e.length) ? e.substring(0, e.length - (e.length - 1) / 4) : e;
  const s = Object.entries(e).slice(0, r ? 3 : 4).map(([a, p]) => {
    const v = a === "a" ? E : L(t, a);
    return (a === "a" ? "/ " : "") + v.to(p);
  });
  return `${t}(${s.join(" ")})`;
}
function st(t) {
  return /^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t);
}
function It(t) {
  return "r" in t ? "rgb" : "w" in t ? "hwb" : "v" in t ? "hsv" : "s" in t ? "hsl" : null;
}
const et = {
  hsl: ["h", "s", "l", "a"],
  hwb: ["h", "w", "b", "a"],
  rgb: ["r", "g", "b", "a"]
};
function kt(t) {
  if (typeof t != "string") {
    const f = It(t);
    return f === null ? null : { format: f, color: t };
  }
  if (t.startsWith("#"))
    return st(t) ? { format: "hex", color: t } : null;
  if (!t.includes("(")) {
    const f = document.createElement("canvas").getContext("2d");
    f.fillStyle = t;
    const c = f.fillStyle;
    return c === "#000000" && t !== "black" ? null : { format: "hex", color: c };
  }
  const [e, r] = t.split("("), s = e.substring(0, 3);
  if (!(s in et))
    return null;
  const a = r.replace(/[,/)]/g, " ").replace(/\s+/g, " ").trim().split(" ");
  a.length === 3 && a.push("1");
  const p = et[s], v = Object.fromEntries(p.map((f, c) => {
    const u = f === "a" ? E : L(s, f);
    return [
      f,
      u.from(a[c])
    ];
  }));
  return { format: s, color: v };
}
function At(t, e, r) {
  const s = t.getBoundingClientRect(), a = e - s.left, p = r - s.top;
  return {
    x: s.width === 0 ? 0 : N(a / s.width * 100, 0, 100),
    y: s.height === 0 ? 0 : N((1 - p / s.height) * 100, 0, 100)
  };
}
const Mt = { class: "vacp-range-input-group" }, Ht = ["for"], Et = { class: "vacp-range-input-label-text vacp-range-input-label-text--hue" }, Lt = ["id", "value"], St = ["for"], Pt = { class: "vacp-range-input-label-text vacp-range-input-label-text--alpha" }, Rt = ["id", "value"], Ot = { class: "vacp-actions" }, Wt = { class: "vacp-color-inputs" }, jt = { class: "vacp-color-input-group" }, zt = ["for"], Dt = ["id", "value"], _t = ["id", "for", "onInput"], Kt = { class: "vacp-color-input-label-text" }, Yt = ["id", "value", "onInput"], Bt = /* @__PURE__ */ ht({
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
  setup(t, { expose: e, emit: r }) {
    const s = ["hex", "hsl", "hsv", "hwb", "rgb"], a = t, p = r;
    e({
      copyColor: X,
      switchFormat: _
    });
    const v = ft("colorSpace");
    let f = !1;
    const c = pt(a.visibleFormats.includes(a.defaultFormat) ? a.defaultFormat : a.visibleFormats[0]), u = vt({
      hex: "#ffffffff",
      hsl: { h: 0, s: 0, l: 100, a: 1 },
      hsv: { h: 0, s: 0, v: 100, a: 1 },
      hwb: { h: 0, w: 100, b: 0, a: 1 },
      rgb: { r: 255, g: 255, b: 255, a: 1 }
    }), V = O(function() {
      const o = c.value, n = u[o];
      return o.split("").map((i) => {
        const l = n[i];
        return {
          value: L(o, i).to(l),
          channel: i,
          label: i.toUpperCase()
        };
      }).concat(a.alphaChannel === "show" ? [{
        value: E.to(n.a),
        channel: "a",
        label: "Alpha"
      }] : []);
    }), at = O(function() {
      return a.alphaChannel === "hide" && [5, 9].includes(u.hex.length) ? u.hex.substring(0, u.hex.length - (u.hex.length - 1) / 4) : u.hex;
    }), S = O(function() {
      return u.hsv;
    });
    dt(() => a.color, Y), mt(function() {
      document.addEventListener("pointermove", P, { passive: !1 }), document.addEventListener("touchmove", R, { passive: !1 }), document.addEventListener("pointerup", I), document.addEventListener("touchend", I), Y(a.color);
    }), bt(function() {
      document.removeEventListener("pointermove", P), document.removeEventListener("touchmove", R), document.removeEventListener("pointerup", I), document.removeEventListener("touchend", I);
    });
    function _() {
      const n = (a.visibleFormats.findIndex((i) => i === c.value) + 1) % a.visibleFormats.length;
      c.value = a.visibleFormats[n];
    }
    function it(o) {
      f = !0, P(o);
    }
    function lt(o) {
      f = !0, R(o);
    }
    function I() {
      f = !1;
    }
    function P(o) {
      o.buttons !== 1 || !f || !(v.value instanceof HTMLElement) || K(v.value, o.clientX, o.clientY);
    }
    function R(o) {
      if (!f || !(v.value instanceof HTMLElement))
        return;
      o.preventDefault();
      const n = o.touches[0];
      K(v.value, n.clientX, n.clientY);
    }
    function K(o, n, i) {
      const l = At(o, n, i), d = Object.assign({}, u.hsv);
      d.s = l.x, d.v = l.y, g("hsv", d);
    }
    function ut(o) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(o.key))
        return;
      o.preventDefault();
      const n = ["ArrowLeft", "ArrowDown"].includes(o.key) ? -1 : 1, i = ["ArrowLeft", "ArrowRight"].includes(o.key) ? "s" : "v", l = o.shiftKey ? 10 : 1, d = u.hsv[i] + n * l, m = Object.assign({}, u.hsv);
      m[i] = N(d, 0, 100), g("hsv", m);
    }
    function Y(o) {
      const n = kt(o);
      n !== null && g(n.format, n.color);
    }
    function B(o, n) {
      const i = o.currentTarget, l = Object.assign({}, u.hsv);
      l[n] = Number(i.value), g("hsv", l);
    }
    function ct(o) {
      const n = o.target;
      st(n.value) && g("hex", n.value);
    }
    function U(o, n) {
      const i = o.target, l = c.value, d = Object.assign({}, u[l]), J = (n === "a" ? E : L(l, n)).from(i.value);
      Number.isNaN(J) || (d[n] = J, g(l, d));
    }
    function g(o, n) {
      let i = n;
      if (a.alphaChannel === "hide")
        if (typeof n != "string")
          n.a = 1, i = n;
        else if ([5, 9].includes(n.length)) {
          const l = (n.length - 1) / 4;
          i = n.substring(0, n.length - l) + "f".repeat(l);
        } else [4, 7].includes(n.length) && (i = n + "f".repeat((n.length - 1) / 3));
      if (!Ct(u[o], i)) {
        u[o] = i;
        for (const l of s)
          l !== o && (u[l] = $t(o, l, i));
        p("color-change", q());
      }
    }
    async function X() {
      const o = u[c.value], n = a.alphaChannel === "hide", i = D({ color: o, format: c.value }, n);
      await (a.copy ? a.copy : (d) => window.navigator.clipboard.writeText(d))(i), p("color-copy", q());
    }
    function q() {
      const o = a.alphaChannel === "hide", n = D({ color: u[c.value], format: c.value }, o);
      return {
        colors: u,
        cssColor: n
      };
    }
    function G(o) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(o.key) || !o.shiftKey)
        return;
      const n = o.currentTarget, i = Number(n.step), l = ["ArrowLeft", "ArrowDown"].includes(o.key) ? -1 : 1, d = Number(n.value) + l * i * 10, m = N(d, Number(n.min), Number(n.max));
      n.value = String(m - l * i);
    }
    return (o, n) => (y(), w("div", {
      class: "vacp-color-picker",
      style: W(`--vacp-color: ${gt(D)({ format: "hsl", color: u.hsl }, !0)}`)
    }, [
      h("div", {
        ref_key: "colorSpace",
        ref: v,
        class: "vacp-color-space",
        style: W(`position: relative; background: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${S.value.h} 100% 50%)`),
        onPointerdown: it,
        onTouchstart: lt
      }, [
        h("div", {
          ref: "thumb",
          class: "vacp-color-space-thumb",
          tabindex: "0",
          "aria-label": "Color space thumb",
          style: W(`box-sizing: border-box; position: absolute; left: ${S.value.s}%; bottom: ${S.value.v}%;`),
          onKeydown: ut
        }, null, 36)
      ], 36),
      h("div", Mt, [
        h("label", {
          class: "vacp-range-input-label vacp-range-input-label--hue",
          for: `${o.id}-hue-slider`
        }, [
          h("span", Et, [
            T(o.$slots, "hue-range-input-label", {}, () => [
              n[2] || (n[2] = Z("Hue", -1))
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
            onKeydownPassive: G,
            onInput: n[0] || (n[0] = (i) => B(i, "h"))
          }, null, 40, Lt)
        ], 8, Ht),
        o.alphaChannel === "show" ? (y(), w("label", {
          key: 0,
          class: "vacp-range-input-label vacp-range-input-label--alpha",
          for: `${o.id}-alpha-slider`
        }, [
          h("span", Pt, [
            T(o.$slots, "alpha-range-input-label", {}, () => [
              n[3] || (n[3] = Z("Alpha", -1))
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
            onKeydownPassive: G,
            onInput: n[1] || (n[1] = (i) => B(i, "a"))
          }, null, 40, Rt)
        ], 8, St)) : Q("", !0)
      ]),
      h("div", Ot, [
        h("button", {
          class: "vacp-copy-button",
          type: "button",
          onClick: X
        }, [
          T(o.$slots, "copy-button", {}, () => [
            n[4] || (n[4] = h("span", { class: "vacp-visually-hidden" }, "Copy color", -1)),
            n[5] || (n[5] = h("svg", {
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
        T(o.$slots, "actions")
      ]),
      h("div", Wt, [
        h("div", jt, [
          c.value === "hex" ? (y(), w("label", {
            key: 0,
            class: "vacp-color-input-label",
            for: `${o.id}-color-hex`
          }, [
            n[6] || (n[6] = h("span", { class: "vacp-color-input-label-text" }, " Hex ", -1)),
            h("input", {
              id: `${o.id}-color-hex`,
              class: "vacp-color-input",
              type: "text",
              value: at.value,
              onInput: ct
            }, null, 40, Dt)
          ], 8, zt)) : (y(!0), w(wt, { key: 1 }, yt(V.value, ({ value: i, channel: l, label: d }) => (y(), w("label", {
            id: `${o.id}-color-${c.value}-${l}-label`,
            key: `${o.id}-color-${c.value}-${l}-label`,
            class: "vacp-color-input-label",
            for: `${o.id}-color-${c.value}-${l}`,
            onInput: (m) => U(m, l)
          }, [
            h("span", Kt, xt(d), 1),
            h("input", {
              id: `${o.id}-color-${c.value}-${l}`,
              class: "vacp-color-input",
              type: "text",
              value: i,
              onInput: (m) => U(m, l)
            }, null, 40, Yt)
          ], 40, _t))), 128))
        ]),
        o.visibleFormats.length > 1 ? (y(), w("button", {
          key: 0,
          class: "vacp-format-switch-button",
          type: "button",
          onClick: _
        }, [
          T(o.$slots, "format-switch-button", {}, () => [
            n[7] || (n[7] = h("span", { class: "vacp-visually-hidden" }, "Switch format", -1)),
            n[8] || (n[8] = h("svg", {
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
    ], 4));
  }
}), Xt = {
  install(t) {
    t.component("ColorPicker", Bt);
  }
};
export {
  Bt as ColorPicker,
  Xt as default
};
