import { defineComponent as ae, useTemplateRef as B, ref as K, computed as S, watch as re, onMounted as le, onBeforeUnmount as se, createElementBlock as b, openBlock as g, normalizeStyle as M, unref as ue, createElementVNode as s, createCommentVNode as O, renderSlot as $, createTextVNode as U, Fragment as ie, renderList as ce, toDisplayString as he } from "vue";
import w from "colorjs.io";
function x(t, r, l) {
  return Math.max(r, Math.min(t, l));
}
const pe = {
  deg: 1,
  grad: 0.9,
  rad: 180 / Math.PI,
  turn: 360
}, Y = {
  from(t) {
    return t.endsWith("%") ? y.from(t, { referenceValue: 1 }) : m.from(t, { min: 0, max: 1 });
  },
  to(t) {
    return m.to(t);
  }
}, X = {
  from(t) {
    const r = t.match(/deg|g?rad|turn$/);
    if (r === null)
      return m.from(t);
    const l = r[0];
    return m.from(t.slice(0, -l.length)) * pe[l];
  },
  to(t) {
    return m.to(t);
  }
}, m = {
  from(t, { min: r = Number.NEGATIVE_INFINITY, max: l = Number.POSITIVE_INFINITY } = {}) {
    return t.endsWith(".") ? NaN : x(Number(t), r, l);
  },
  to(t) {
    return me(t, 2);
  }
}, y = {
  from(t, { referenceValue: r = 100, min: l = 0, max: a = 100 } = {}) {
    return t.endsWith("%") ? m.from(t.slice(0, -1), { min: l, max: a }) * r / 100 : NaN;
  },
  to(t) {
    return m.to(t) + "%";
  }
};
function P({ min: t = 0, max: r = 1 } = { min: 0, max: 0 }) {
  return {
    from(l) {
      return l.endsWith("%") ? y.from(l, { referenceValue: r }) : m.from(l, { min: t, max: r });
    },
    to(l) {
      return m.to(l);
    }
  };
}
const de = {
  hsl: {
    h: X,
    s: y,
    l: y
  },
  hwb: {
    h: X,
    w: y,
    b: y
  },
  rgb: {
    r: P({ min: 0, max: 255 }),
    g: P({ min: 0, max: 255 }),
    b: P({ min: 0, max: 255 })
  }
};
function q(t, r) {
  return de[t][r];
}
function me(t, r) {
  const l = t.toFixed(r);
  return l.includes(".") ? l.replace(/\.?0+$/, "") : l;
}
function A(t, { format: r = "rgb", alpha: l = !0, collapse: a = !0 } = { format: "rgb", alpha: !0, collapse: !0 }) {
  const d = {
    alpha: l
  };
  r === "rgb" ? d.format = {
    name: "rgb",
    coords: ["<number>[0, 255]", "<number>[0, 255]", "<number>[0, 255]"]
  } : r === "hex" && (d.format = "hex", d.collapse = a);
  const v = ["rgb", "hex"].includes(r) ? "srgb" : r;
  return t.to(v).toString(d).replace(/none/g, "0");
}
function j(t, r, l) {
  const a = t.getBoundingClientRect(), d = r - a.left, v = l - a.top;
  return {
    x: a.width === 0 ? 0 : x(d / a.width * 100, 0, 100),
    y: a.height === 0 ? 0 : x((1 - v / a.height) * 100, 0, 100)
  };
}
const ve = {
  hsl: ["h", "s", "l"],
  hwb: ["h", "w", "b"],
  rgb: ["r", "g", "b"]
}, fe = { class: "vacp-range-input-group" }, be = ["for"], ge = { class: "vacp-range-input-label-text vacp-range-input-label-text--hue" }, we = ["id", "value"], ye = ["for"], xe = { class: "vacp-range-input-label-text vacp-range-input-label-text--alpha" }, Ce = ["id", "value"], $e = { class: "vacp-actions" }, Ne = { class: "vacp-color-inputs" }, Fe = { class: "vacp-color-input-group" }, ke = ["for"], Ae = ["id", "value"], Te = ["id", "for"], Ve = { class: "vacp-color-input-label-text" }, Ie = ["id", "value"], Ee = /* @__PURE__ */ ae({
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
  setup(t, { expose: r, emit: l }) {
    const a = t, d = l;
    r({
      copyColor: z,
      switchFormat: W
    });
    const v = B("colorPicker"), N = B("colorSpaceRef");
    let C = !1;
    const p = K(a.visibleFormats.includes(a.defaultFormat) ? a.defaultFormat : a.visibleFormats[0]), u = K(new w("srgb", [1, 1, 1], 1)), J = S(function() {
      const e = p.value;
      return ve[p.value].map((n, i) => {
        const c = u.value.to(e === "rgb" ? "srgb" : e);
        c.inGamut();
        const h = c.coords[i] ?? 0;
        return {
          value: q(e, n).to(e === "rgb" ? h * 255 : h),
          channel: n,
          label: n.toUpperCase()
        };
      }).concat(a.alphaChannel === "show" ? [{
        value: Y.to(u.value.alpha),
        channel: "alpha",
        label: "Alpha"
      }] : []);
    }), Q = S(function() {
      return A(u.value, { format: "hex", alpha: a.alphaChannel === "show" });
    }), T = S(function() {
      const e = u.value.to("hsv");
      return e.toGamut(), e;
    });
    re(() => a.color, D, { immediate: !0 }), le(function() {
      document.addEventListener("pointermove", V, { passive: !1 }), document.addEventListener("touchmove", I, { passive: !1 }), document.addEventListener("pointerup", F), document.addEventListener("touchend", F);
    }), se(function() {
      document.removeEventListener("pointermove", V), document.removeEventListener("touchmove", I), document.removeEventListener("pointerup", F), document.removeEventListener("touchend", F);
    });
    function W() {
      const o = (a.visibleFormats.findIndex((n) => n === p.value) + 1) % a.visibleFormats.length;
      p.value = a.visibleFormats[o];
    }
    function Z(e) {
      C = !0, V(e);
    }
    function _(e) {
      C = !0, I(e);
    }
    function F() {
      C = !1;
    }
    function V(e) {
      e.buttons !== 1 || !C || !(N.value instanceof HTMLElement) || E(j(N.value, e.clientX, e.clientY));
    }
    function I(e) {
      if (!C || !(N.value instanceof HTMLElement))
        return;
      e.preventDefault();
      const o = e.touches[0];
      E(j(N.value, o.clientX, o.clientY));
    }
    function E({ x: e, y: o }) {
      const n = u.value.to("hsv");
      n.toGamut(), k(new w("hsv", [n.h ?? 0, e, o], u.value.alpha));
    }
    function ee(e) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(e.key))
        return;
      e.preventDefault();
      const o = ["ArrowLeft", "ArrowDown"].includes(e.key) ? -1 : 1, n = ["ArrowLeft", "ArrowRight"].includes(e.key) ? "s" : "v", i = e.shiftKey ? 10 : 1, c = u.value.to("hsv");
      c.toGamut();
      const h = c.s ?? 0, f = c.v ?? 0, L = n === "s" ? x(h + o * i, 0, 100) : h, ne = n === "v" ? x(f + o * i, 0, 100) : f;
      E({ x: L, y: ne });
    }
    function D(e) {
      let o;
      try {
        o = e instanceof w ? e : new w(e);
      } catch (n) {
        if (n instanceof TypeError)
          return;
        throw n;
      }
      k(o);
    }
    function R(e, o) {
      const n = e.currentTarget, i = o === "alpha" ? Number(n.value) : u.value.alpha, c = u.value.to("hsl");
      c.toGamut();
      const h = o === "h" ? Number(n.value) : c.h ?? 0;
      k(new w("hsl", [h, c.s ?? 0, c.l ?? 0], i));
    }
    function te(e) {
      const o = e.target;
      /^#(([A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(o.value) && D(o.value);
    }
    function oe() {
      const e = p.value, o = v.value?.querySelectorAll(`input[id^="${a.id}-color-${e}"]`) ?? [], n = Array.from(o).map((h) => {
        const f = h.id.split("-").at(-1);
        return (f === "alpha" ? Y : q(e, f)).from(h.value);
      });
      if (n.some((h) => Number.isNaN(h)))
        return;
      const i = e === "rgb" ? "srgb" : e, c = n.slice(0, 3).map((h) => i === "srgb" ? h / 255 : h);
      k(new w(i, c, n[3]));
    }
    function k(e) {
      Math.abs(u.value.distance(e)) < Number.EPSILON && u.value.alpha === e.alpha || (u.value = e, d("color-change", G()));
    }
    async function z() {
      const e = A(u.value, { format: p.value, alpha: a.alphaChannel === "show" });
      await (a.copy ? a.copy : (n) => window.navigator.clipboard.writeText(n))(e), d("color-copy", G());
    }
    function G() {
      return {
        color: u.value,
        cssColor: A(u.value, { format: p.value, alpha: a.alphaChannel === "show" })
      };
    }
    function H(e) {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(e.key) || !e.shiftKey)
        return;
      const o = e.currentTarget, n = Number(o.step), i = ["ArrowLeft", "ArrowDown"].includes(e.key) ? -1 : 1, c = Number(o.value) + i * n * 10, h = x(c, Number(o.min), Number(o.max));
      o.value = String(h - i * n);
    }
    return (e, o) => (g(), b("div", {
      ref_key: "colorPicker",
      ref: v,
      class: "vacp-color-picker",
      style: M(`--vacp-color: ${ue(A)(u.value, { format: "hsl", alpha: !1 })}`)
    }, [
      s("div", {
        ref: "colorSpaceRef",
        class: "vacp-color-space",
        style: M(`position: relative; background: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${T.value.h} 100% 50%)`),
        onPointerdown: Z,
        onTouchstart: _
      }, [
        s("div", {
          ref: "thumb",
          class: "vacp-color-space-thumb",
          tabindex: "0",
          "aria-label": "Color space thumb",
          style: M(`box-sizing: border-box; position: absolute; left: ${T.value.s}%; bottom: ${T.value.v}%;`),
          onKeydown: ee
        }, null, 36)
      ], 36),
      s("div", fe, [
        s("label", {
          class: "vacp-range-input-label vacp-range-input-label--hue",
          for: `${t.id}-hue-slider`
        }, [
          s("span", ge, [
            $(e.$slots, "hue-range-input-label", {}, () => [
              o[2] || (o[2] = U("Hue", -1))
            ])
          ]),
          s("input", {
            id: `${t.id}-hue-slider`,
            class: "vacp-range-input vacp-range-input--hue",
            value: u.value.to("hsl").toGamut().h ?? 0,
            type: "range",
            min: "0",
            max: "360",
            step: "1",
            onKeydown: H,
            onInput: o[0] || (o[0] = (n) => R(n, "h"))
          }, null, 40, we)
        ], 8, be),
        t.alphaChannel === "show" ? (g(), b("label", {
          key: 0,
          class: "vacp-range-input-label vacp-range-input-label--alpha",
          for: `${t.id}-alpha-slider`
        }, [
          s("span", xe, [
            $(e.$slots, "alpha-range-input-label", {}, () => [
              o[3] || (o[3] = U("Alpha", -1))
            ])
          ]),
          s("input", {
            id: `${t.id}-alpha-slider`,
            class: "vacp-range-input vacp-range-input--alpha",
            value: u.value.alpha,
            type: "range",
            min: "0",
            max: "1",
            step: "0.01",
            onKeydown: H,
            onInput: o[1] || (o[1] = (n) => R(n, "alpha"))
          }, null, 40, Ce)
        ], 8, ye)) : O("", !0)
      ]),
      s("div", $e, [
        s("button", {
          class: "vacp-copy-button",
          type: "button",
          onClick: z
        }, [
          $(e.$slots, "copy-button", {}, () => [
            o[4] || (o[4] = s("span", { class: "vacp-visually-hidden" }, "Copy color", -1)),
            o[5] || (o[5] = s("svg", {
              class: "vacp-icon",
              xmlns: "http://www.w3.org/2000/svg",
              "aria-hidden": "true",
              width: "24",
              height: "24",
              viewBox: "0 0 32 32"
            }, [
              s("path", {
                d: "M25.313 28v-18.688h-14.625v18.688h14.625zM25.313 6.688c1.438 0 2.688 1.188 2.688 2.625v18.688c0 1.438-1.25 2.688-2.688 2.688h-14.625c-1.438 0-2.688-1.25-2.688-2.688v-18.688c0-1.438 1.25-2.625 2.688-2.625h14.625zM21.313 1.313v2.688h-16v18.688h-2.625v-18.688c0-1.438 1.188-2.688 2.625-2.688h16z",
                fill: "currentColor"
              })
            ], -1))
          ])
        ]),
        $(e.$slots, "actions")
      ]),
      s("div", Ne, [
        s("div", Fe, [
          p.value === "hex" ? (g(), b("label", {
            key: 0,
            class: "vacp-color-input-label",
            for: `${t.id}-color-hex`
          }, [
            o[6] || (o[6] = s("span", { class: "vacp-color-input-label-text" }, " Hex ", -1)),
            s("input", {
              id: `${t.id}-color-hex`,
              class: "vacp-color-input",
              type: "text",
              value: Q.value,
              onChange: te
            }, null, 40, Ae)
          ], 8, ke)) : (g(!0), b(ie, { key: 1 }, ce(J.value, ({ value: n, channel: i, label: c }) => (g(), b("label", {
            id: `${t.id}-color-${p.value}-${i}-label`,
            key: `${t.id}-color-${p.value}-${i}-label`,
            class: "vacp-color-input-label",
            for: `${t.id}-color-${p.value}-${i}`
          }, [
            s("span", Ve, he(c), 1),
            s("input", {
              id: `${t.id}-color-${p.value}-${i}`,
              class: "vacp-color-input",
              type: "text",
              value: n,
              onChange: oe
            }, null, 40, Ie)
          ], 8, Te))), 128))
        ]),
        t.visibleFormats.length > 1 ? (g(), b("button", {
          key: 0,
          class: "vacp-format-switch-button",
          type: "button",
          onClick: W
        }, [
          $(e.$slots, "format-switch-button", {}, () => [
            o[7] || (o[7] = s("span", { class: "vacp-visually-hidden" }, "Switch format", -1)),
            o[8] || (o[8] = s("svg", {
              class: "vacp-icon",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "15"
            }, [
              s("path", {
                d: "M8 15l5-5-1-1-4 2-4-2-1 1zm4-9l1-1-5-5-5 5 1 1 4-2z",
                fill: "currentColor"
              })
            ], -1))
          ])
        ])) : O("", !0)
      ])
    ], 4));
  }
}), Me = {
  install(t) {
    t.component("ColorPicker", Ee);
  }
};
export {
  Ee as ColorPicker,
  Me as default
};
