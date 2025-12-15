import { defineComponent as ht, useTemplateRef as ft, ref as vt, reactive as pt, computed as O, watch as dt, onMounted as mt, onBeforeUnmount as bt, createElementBlock as w, openBlock as x, normalizeStyle as W, unref as gt, createElementVNode as h, createCommentVNode as Z, renderSlot as T, createTextVNode as _, Fragment as wt, renderList as xt, toDisplayString as yt } from "vue";
function N(t, e, o) {
  return Math.max(e, Math.min(t, o));
}
function Ct(t, e) {
  if (typeof t == "string" || typeof e == "string")
    return t === e;
  for (const o in t)
    if (t[o] !== e[o])
      return !1;
  return !0;
}
function A(t) {
  const e = [], o = t.length > 5 ? 2 : 1;
  for (let r = 1; r < t.length; r += o) {
    const a = t.substring(r, r + o).repeat(o % 2 + 1), v = parseInt(a, 16);
    e.push(r === 3 * o + 1 ? v / 255 : v);
  }
  return e.length === 3 && e.push(1), {
    r: e[0],
    g: e[1],
    b: e[2],
    a: e[3]
  };
}
function nt(t) {
  const e = t.l / 100, o = e + t.s / 100 * Math.min(e, 1 - e), r = o === 0 ? 0 : 200 * (1 - e / o);
  return {
    h: t.h,
    s: r,
    v: o * 100,
    a: t.a
  };
}
function k(t) {
  let e = t.h % 360;
  e < 0 && (e += 360);
  const o = t.s / 100, r = t.l / 100;
  return {
    r: j(0, e, o, r) * 255,
    g: j(8, e, o, r) * 255,
    b: j(4, e, o, r) * 255,
    a: t.a
  };
}
function j(t, e, o, r) {
  const a = (t + e / 30) % 12, v = o * Math.min(r, 1 - r);
  return r - v * Math.max(-1, Math.min(a - 3, 9 - a, 1));
}
function ot(t) {
  const e = t.s / 100, o = t.v / 100, r = o * (1 - e / 2);
  return {
    h: t.h,
    s: r === 0 || r === 1 ? 0 : (o - r) / Math.min(r, 1 - r) * 100,
    l: r * 100,
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
  return k(ot(t));
}
function y(t) {
  const e = t.w / 100, o = t.b / 100;
  let r, a;
  const v = e + o;
  return v >= 1 ? (r = 0, a = e / v) : (a = 1 - o, r = (1 - e / a) * 100), {
    h: t.h,
    s: r,
    v: a * 100,
    a: t.a
  };
}
function H(t) {
  const { r: e, g: o, b: r, a } = t, v = Math.min(e, o, r), p = Math.max(e, o, r), f = p - v, c = (p + v) / 2;
  let u = 0;
  f !== 0 && (p === e ? u = (o - r) / f + (o < r ? 6 : 0) : p === o ? u = (r - e) / f + 2 : p === r && (u = (e - o) / f + 4), u *= 60);
  let V = 0;
  return c !== 0 && c !== 255 && (V = (p - c) / Math.min(c, 255 - c)), {
    h: u,
    s: V * 100,
    l: c / 255 * 100,
    a
  };
}
function M(t) {
  return "#" + Object.values(t).map((e, o) => Math.round(o === 3 ? e * 255 : e).toString(16).padStart(2, "0")).join("");
}
function F(t) {
  return rt(nt(H(t)));
}
const Tt = {
  hex: {
    hex: (t) => t,
    hsl: (t) => H(A(t)),
    hsv: (t) => y(F(A(t))),
    hwb: (t) => F(A(t)),
    rgb: A
  },
  hsl: {
    hex: (t) => M(k(t)),
    hsl: (t) => t,
    hsv: nt,
    hwb: (t) => F(k(t)),
    rgb: k
  },
  hsv: {
    hex: (t) => M($(t)),
    hsl: ot,
    hsv: (t) => t,
    hwb: rt,
    rgb: $
  },
  hwb: {
    hex: (t) => M($(y(t))),
    hsl: (t) => H($(y(t))),
    hsv: y,
    hwb: (t) => t,
    rgb: (t) => $(y(t))
  },
  rgb: {
    hex: M,
    hsl: H,
    hsv: (t) => y(F(t)),
    hwb: F,
    rgb: (t) => t
  }
};
function $t(t, e, o) {
  return Tt[t][e](o);
}
function Ft(t, e) {
  const o = t.toFixed(e);
  return o.includes(".") ? o.replace(/\.?0+$/, "") : o;
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
    const o = e[0];
    return b.from(t.slice(0, -o.length)) * Nt[o];
  },
  to(t) {
    return b.to(t);
  }
}, b = {
  from(t, { min: e = Number.NEGATIVE_INFINITY, max: o = Number.POSITIVE_INFINITY } = {}) {
    return t.endsWith(".") ? NaN : N(Number(t), e, o);
  },
  to(t) {
    return Ft(t, 2);
  }
}, C = {
  from(t, { referenceValue: e = 100, min: o = 0, max: r = 100 } = {}) {
    return t.endsWith("%") ? b.from(t.slice(0, -1), { min: o, max: r }) * e / 100 : NaN;
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
function D({ format: t, color: e }, o) {
  if (t === "hex")
    return o && [5, 9].includes(e.length) ? e.substring(0, e.length - (e.length - 1) / 4) : e;
  const r = Object.entries(e).slice(0, o ? 3 : 4).map(([a, v]) => {
    const p = a === "a" ? E : L(t, a);
    return (a === "a" ? "/ " : "") + p.to(v);
  });
  return `${t}(${r.join(" ")})`;
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
function At(t) {
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
  const [e, o] = t.split("("), r = e.substring(0, 3);
  if (!(r in et))
    return null;
  const a = o.replace(/[,/)]/g, " ").replace(/\s+/g, " ").trim().split(" ");
  a.length === 3 && a.push("1");
  const v = et[r], p = Object.fromEntries(v.map((f, c) => {
    const u = f === "a" ? E : L(r, f);
    return [
      f,
      u.from(a[c])
    ];
  }));
  return { format: r, color: p };
}
function Mt(t, e, o) {
  const r = t.getBoundingClientRect(), a = e - r.left, v = o - r.top;
  return {
    x: r.width === 0 ? 0 : N(a / r.width * 100, 0, 100),
    y: r.height === 0 ? 0 : N((1 - v / r.height) * 100, 0, 100)
  };
}
const kt = { class: "vacp-range-input-group" }, Ht = ["for"], Et = { class: "vacp-range-input-label-text vacp-range-input-label-text--hue" }, Lt = ["id", "value"], St = ["for"], Rt = { class: "vacp-range-input-label-text vacp-range-input-label-text--alpha" }, Pt = ["id", "value"], Ot = { class: "vacp-actions" }, Wt = { class: "vacp-color-inputs" }, jt = { class: "vacp-color-input-group" }, zt = ["for"], Dt = ["id", "value"], Kt = ["id", "for", "onInput"], Yt = { class: "vacp-color-input-label-text" }, Bt = ["id", "value", "onInput"], Ut = /* @__PURE__ */ ht({
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
  setup(t, { expose: e, emit: o }) {
    const r = ["hex", "hsl", "hsv", "hwb", "rgb"], a = t, v = o;
    e({
      copyColor: q,
      switchFormat: K
    });
    const p = ft("colorSpaceRef");
    let f = !1;
    const c = vt(a.visibleFormats.includes(a.defaultFormat) ? a.defaultFormat : a.visibleFormats[0]), u = pt({
      hex: "#ffffffff",
      hsl: { h: 0, s: 0, l: 100, a: 1 },
      hsv: { h: 0, s: 0, v: 100, a: 1 },
      hwb: { h: 0, w: 100, b: 0, a: 1 },
      rgb: { r: 255, g: 255, b: 255, a: 1 }
    }), V = O(function() {
      const s = c.value, n = u[s];
      return s.split("").map((i) => {
        const l = n[i];
        return {
          value: L(s, i).to(l),
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
    dt(() => a.color, B), mt(function() {
      document.addEventListener("pointermove", R, { passive: !1 }), document.addEventListener("touchmove", P, { passive: !1 }), document.addEventListener("pointerup", I), document.addEventListener("touchend", I), B(a.color);
    }), bt(function() {
      document.removeEventListener("pointermove", R), document.removeEventListener("touchmove", P), document.removeEventListener("pointerup", I), document.removeEventListener("touchend", I);
    });
    function K() {
      const n = (a.visibleFormats.findIndex((i) => i === c.value) + 1) % a.visibleFormats.length;
      c.value = a.visibleFormats[n];
    }
    function it(s) {
      f = !0, R(s);
    }
    function lt(s) {
      f = !0, P(s);
    }
    function I() {
      f = !1;
    }
    function R(s) {
      s.buttons !== 1 || !f || !(p.value instanceof HTMLElement) || Y(p.value, s.clientX, s.clientY);
    }
    function P(s) {
      if (!f || !(p.value instanceof HTMLElement))
        return;
      s.preventDefault();
      const n = s.touches[0];
      Y(p.value, n.clientX, n.clientY);
    }
    function Y(s, n, i) {
      const l = Mt(s, n, i), d = Object.assign({}, u.hsv);
      d.s = l.x, d.v = l.y, g("hsv", d);
    }
    function ut(s) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(s.key))
        return;
      s.preventDefault();
      const n = ["ArrowLeft", "ArrowDown"].includes(s.key) ? -1 : 1, i = ["ArrowLeft", "ArrowRight"].includes(s.key) ? "s" : "v", l = s.shiftKey ? 10 : 1, d = u.hsv[i] + n * l, m = Object.assign({}, u.hsv);
      m[i] = N(d, 0, 100), g("hsv", m);
    }
    function B(s) {
      const n = At(s);
      n !== null && g(n.format, n.color);
    }
    function U(s, n) {
      const i = s.currentTarget, l = Object.assign({}, u.hsv);
      l[n] = Number(i.value), g("hsv", l);
    }
    function ct(s) {
      const n = s.target;
      st(n.value) && g("hex", n.value);
    }
    function X(s, n) {
      const i = s.target, l = c.value, d = Object.assign({}, u[l]), Q = (n === "a" ? E : L(l, n)).from(i.value);
      Number.isNaN(Q) || (d[n] = Q, g(l, d));
    }
    function g(s, n) {
      let i = n;
      if (a.alphaChannel === "hide")
        if (typeof n != "string")
          n.a = 1, i = n;
        else if ([5, 9].includes(n.length)) {
          const l = (n.length - 1) / 4;
          i = n.substring(0, n.length - l) + "f".repeat(l);
        } else [4, 7].includes(n.length) && (i = n + "f".repeat((n.length - 1) / 3));
      if (!Ct(u[s], i)) {
        u[s] = i;
        for (const l of r)
          l !== s && (u[l] = $t(s, l, i));
        v("color-change", G());
      }
    }
    async function q() {
      const s = u[c.value], n = a.alphaChannel === "hide", i = D({ color: s, format: c.value }, n);
      await (a.copy ? a.copy : (d) => window.navigator.clipboard.writeText(d))(i), v("color-copy", G());
    }
    function G() {
      const s = a.alphaChannel === "hide", n = D({ color: u[c.value], format: c.value }, s);
      return {
        colors: u,
        cssColor: n
      };
    }
    function J(s) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(s.key) || !s.shiftKey)
        return;
      const n = s.currentTarget, i = Number(n.step), l = ["ArrowLeft", "ArrowDown"].includes(s.key) ? -1 : 1, d = Number(n.value) + l * i * 10, m = N(d, Number(n.min), Number(n.max));
      n.value = String(m - l * i);
    }
    return (s, n) => (x(), w("div", {
      class: "vacp-color-picker",
      style: W(`--vacp-color: ${gt(D)({ format: "hsl", color: u.hsl }, !0)}`)
    }, [
      h("div", {
        ref: "colorSpaceRef",
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
      h("div", kt, [
        h("label", {
          class: "vacp-range-input-label vacp-range-input-label--hue",
          for: `${t.id}-hue-slider`
        }, [
          h("span", Et, [
            T(s.$slots, "hue-range-input-label", {}, () => [
              n[2] || (n[2] = _("Hue", -1))
            ])
          ]),
          h("input", {
            id: `${t.id}-hue-slider`,
            class: "vacp-range-input vacp-range-input--hue",
            value: u.hsv.h,
            type: "range",
            min: "0",
            max: "360",
            step: "1",
            onKeydownPassive: J,
            onInput: n[0] || (n[0] = (i) => U(i, "h"))
          }, null, 40, Lt)
        ], 8, Ht),
        t.alphaChannel === "show" ? (x(), w("label", {
          key: 0,
          class: "vacp-range-input-label vacp-range-input-label--alpha",
          for: `${t.id}-alpha-slider`
        }, [
          h("span", Rt, [
            T(s.$slots, "alpha-range-input-label", {}, () => [
              n[3] || (n[3] = _("Alpha", -1))
            ])
          ]),
          h("input", {
            id: `${t.id}-alpha-slider`,
            class: "vacp-range-input vacp-range-input--alpha",
            value: u.hsv.a,
            type: "range",
            min: "0",
            max: "1",
            step: "0.01",
            onKeydownPassive: J,
            onInput: n[1] || (n[1] = (i) => U(i, "a"))
          }, null, 40, Pt)
        ], 8, St)) : Z("", !0)
      ]),
      h("div", Ot, [
        h("button", {
          class: "vacp-copy-button",
          type: "button",
          onClick: q
        }, [
          T(s.$slots, "copy-button", {}, () => [
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
        T(s.$slots, "actions")
      ]),
      h("div", Wt, [
        h("div", jt, [
          c.value === "hex" ? (x(), w("label", {
            key: 0,
            class: "vacp-color-input-label",
            for: `${t.id}-color-hex`
          }, [
            n[6] || (n[6] = h("span", { class: "vacp-color-input-label-text" }, " Hex ", -1)),
            h("input", {
              id: `${t.id}-color-hex`,
              class: "vacp-color-input",
              type: "text",
              value: at.value,
              onInput: ct
            }, null, 40, Dt)
          ], 8, zt)) : (x(!0), w(wt, { key: 1 }, xt(V.value, ({ value: i, channel: l, label: d }) => (x(), w("label", {
            id: `${t.id}-color-${c.value}-${l}-label`,
            key: `${t.id}-color-${c.value}-${l}-label`,
            class: "vacp-color-input-label",
            for: `${t.id}-color-${c.value}-${l}`,
            onInput: (m) => X(m, l)
          }, [
            h("span", Yt, yt(d), 1),
            h("input", {
              id: `${t.id}-color-${c.value}-${l}`,
              class: "vacp-color-input",
              type: "text",
              value: i,
              onInput: (m) => X(m, l)
            }, null, 40, Bt)
          ], 40, Kt))), 128))
        ]),
        t.visibleFormats.length > 1 ? (x(), w("button", {
          key: 0,
          class: "vacp-format-switch-button",
          type: "button",
          onClick: K
        }, [
          T(s.$slots, "format-switch-button", {}, () => [
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
        ])) : Z("", !0)
      ])
    ], 4));
  }
}), qt = {
  install(t) {
    t.component("ColorPicker", Ut);
  }
};
export {
  Ut as ColorPicker,
  qt as default
};
