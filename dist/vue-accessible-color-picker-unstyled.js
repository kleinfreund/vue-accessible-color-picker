!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("vue")):"function"==typeof define&&define.amd?define(["exports","vue"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).AccessibleColorPicker={},e.vue)}(this,(function(e,t){"use strict";function n(e,t,n){return Math.max(t,Math.min(e,n))}function o(e,t=2){return e.toFixed(t).replace(/0+$/,"").replace(/\.$/,"")}function r(e){if(e.endsWith("."))return NaN;return(parseFloat(e)%360+360)%360/360}function a(e){return o(360*e)}function l(e){if(!e.endsWith("%"))return NaN;const t=e.substring(0,e.length-1);if(t.endsWith("."))return NaN;const o=parseFloat(t);return Number.isNaN(o)?NaN:n(o,0,100)/100}function c(e){return o(100*e)+"%"}function u(e){if(e.endsWith("%"))return l(e);if(e.endsWith("."))return NaN;const t=parseFloat(e);return Number.isNaN(t)?NaN:n(t,0,255)/255}function s(e){return o(255*e)}function i(e){return e.endsWith("%")?l(e):n(parseFloat(e),0,1)}function p(e){return String(e)}const h={hsl:{h:{to:a,from:r},s:{to:c,from:l},l:{to:c,from:l},a:{to:p,from:i}},hwb:{h:{to:a,from:r},w:{to:c,from:l},b:{to:c,from:l},a:{to:p,from:i}},rgb:{r:{to:s,from:u},g:{to:s,from:u},b:{to:s,from:u},a:{to:p,from:i}}};function f(e){const t=e.replace(/^#/,""),n=[],o=t.length>4?2:1;for(let e=0;e<t.length;e+=o){const r=t.slice(e,e+o);n.push(r.repeat(o%2+1))}3===n.length&&n.push("ff");const r=n.map((e=>parseInt(e,16)/255));return{r:r[0],g:r[1],b:r[2],a:r[3]}}function d(e){const t=e.l<.5?e.l*(1+e.s):e.l+e.s-e.l*e.s,n=2*e.l-t;return{r:v(n,t,e.h+1/3),g:v(n,t,e.h),b:v(n,t,e.h-1/3),a:e.a}}function v(e,t,n){return n<0?n+=1:n>1&&(n-=1),n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function m(e){return{r:b(5,e),g:b(3,e),b:b(1,e),a:e.a}}function b(e,t){const n=(e+6*t.h)%6;return t.v-t.v*t.s*Math.max(0,Math.min(n,4-n,1))}function g(e){return{h:e.h,s:1===e.b?0:1-e.w/(1-e.b),v:1-e.b,a:e.a}}function y(e){const t=Math.min(e.r,e.g,e.b),n=Math.max(e.r,e.g,e.b);let o;o=n===t?0:n===e.r?(0+(e.g-e.b)/(n-t))/6:n===e.g?(2+(e.b-e.r)/(n-t))/6:(4+(e.r-e.g)/(n-t))/6,o<0&&(o+=1);const r=(n+t)/2;let a;return a=0===n||1===t?0:(n-r)/Math.min(r,1-r),{h:o,s:a,l:r,a:e.a}}function w(e){const t=Math.min(e.r,e.g,e.b),n=Math.max(e.r,e.g,e.b);let o,r;o=n===t?0:n===e.r?(0+(e.g-e.b)/(n-t))/6:n===e.g?(2+(e.b-e.r)/(n-t))/6:(4+(e.r-e.g)/(n-t))/6,o<0&&(o+=1),r=0===n?0:(n-t)/n;return{h:o,s:r,v:n,a:e.a}}function x(e){return"#"+Object.values(e).map((e=>{const t=255*e,n=Math.round(t).toString(16);return 1===n.length?"0"+n:n})).join("")}function N(e){const t=Math.min(e.r,e.g,e.b),n=Math.max(e.r,e.g,e.b);let o;return o=n===t?0:n===e.r?(0+(e.g-e.b)/(n-t))/6:n===e.g?(2+(e.b-e.r)/(n-t))/6:(4+(e.r-e.g)/(n-t))/6,o<0&&(o+=1),{h:o,w:t,b:1-n,a:e.a}}const $={hex:[["hsl",function(e){return y(f(e))}],["hsv",function(e){return w(f(e))}],["hwb",function(e){return N(f(e))}],["rgb",f]],hsl:[["hex",function(e){return x(d(e))}],["hsv",function(e){const t=e.l+e.s*Math.min(e.l,1-e.l),n=0===t?0:2-2*e.l/t;return{h:e.h,s:n,v:t,a:e.a}}],["hwb",function(e){return N(d(e))}],["rgb",d]],hsv:[["hex",function(e){return x(m(e))}],["hsl",function(e){const t=e.v-e.v*e.s/2,n=Math.min(t,1-t),o=0===n?0:(e.v-t)/n;return{h:e.h,s:o,l:t,a:e.a}}],["hwb",function(e){return{h:e.h,w:(1-e.s)*e.v,b:1-e.v,a:e.a}}],["rgb",m]],hwb:[["hex",function(e){return x(C(e))}],["hsl",function(e){return y(C(e))}],["hsv",g],["rgb",C]],rgb:[["hex",x],["hsl",y],["hsv",w],["hwb",N]]};function C(e){return m(g(e))}const k={hex:e=>e,hsl:e=>`hsl(${o(360*e.h)} ${o(100*e.s)}% ${o(100*e.l)}% / ${o(e.a)})`,hwb:e=>`hwb(${o(360*e.h)} ${o(100*e.w)}% ${o(100*e.b)}% / ${o(e.a)})`,rgb:e=>`rgb(${o(255*e.r)} ${o(255*e.g)} ${o(255*e.b)} / ${o(e.a)})`};function V(e,t){return k[t](e)}function F(e){return!!e.startsWith("#")&&(!![3,4,6,8].includes(e.length-1)&&/^#[0-9A-Fa-f]+$/.test(e))}function A(e){if("string"!=typeof e){return{format:function(e){return Object.prototype.hasOwnProperty.call(e,"r")?"rgb":Object.prototype.hasOwnProperty.call(e,"w")?"hwb":Object.prototype.hasOwnProperty.call(e,"v")?"hsv":"hsl"}(e),color:e}}if(F(e))return{format:"hex",color:e};if(!e.includes("(")){const t=document.createElement("span");if(t.style.display="none",t.style.color=e,""===t.style.color)return null;document.body.appendChild(t),e=getComputedStyle(t).color,t.remove()}const[t,n]=e.split("("),o=t.substring(0,3),r=n.replace(/[,/)]/g," ").replace(/\s+/g," ").trim().split(" ");3===r.length&&r.push("1");const a=o.split("").concat("a"),l=Object.fromEntries(a.map(((e,t)=>[e,h[o][e].from(r[t])])));return{format:o,color:l}}const M=["hex","hsl","hwb","rgb"];var T={name:"ColorPicker",props:{color:{type:[String,Object],required:!1,default:null},id:{type:String,required:!1,default:"color-picker"},visibleFormats:{type:Array,required:!1,default:()=>M,validator:e=>e.length>0&&e.every((e=>M.includes(e)))},defaultFormat:{type:String,required:!1,default:"hsl",validator:e=>M.includes(e)}},emits:["color-change"],setup(e,o){const r=t.ref(null),a=t.ref(null),l=t.ref(null),c=t.ref(!1),u=t.ref(e.defaultFormat),s=t.reactive({hex:"#ffffffff",hsl:{h:0,s:0,l:1,a:1},hsv:{h:0,s:0,v:1,a:1},hwb:{h:0,w:1,b:0,a:1},rgb:{r:1,g:1,b:1,a:1}});function i(){c.value=!1}function p(e){1===e.buttons&&!1!==c.value&&a.value instanceof HTMLElement&&d(a.value,e.clientX,e.clientY)}function f(e){!1!==c.value&&a.value instanceof HTMLElement&&(e.preventDefault(),d(a.value,e.touches[0].clientX,e.touches[0].clientY))}function d(e,t,o){const r=function(e,t,o){const r=e.getBoundingClientRect(),a=t-r.left,l=o-r.top;return{x:n(a/r.width,0,1),y:n(1-l/r.height,0,1)}}(e,t,o),a={...s.hsv};a.s=r.x,a.v=r.y,m("hsv",a)}function v(e){if(null===e)return;const t=A(e);null!==t&&m(t.format,t.color)}function m(e,t){if(!function(e,t){if("string"==typeof e||"string"==typeof t)return e===t;for(const n in e)if(e[n]!==t[n])return!1;return!0}(s[e],t)){s[e]=t;const n=function(e){for(const[t,n]of $[e])s[t]=n(s[e]);r.value instanceof HTMLElement&&a.value instanceof HTMLElement&&l.value instanceof HTMLElement&&function(e,t,n,o){e.style.setProperty("--vacp-hsl-h",String(o.hsl.h)),e.style.setProperty("--vacp-hsl-s",String(o.hsl.s)),e.style.setProperty("--vacp-hsl-l",String(o.hsl.l)),e.style.setProperty("--vacp-hsl-a",String(o.hsl.a)),t.setAttribute("style","\n    position: relative;\n    background-color: hsl(calc(var(--vacp-hsl-h) * 360) 100% 50%); /* 1. */\n    background-image:\n      linear-gradient(to top, #000, transparent),  /* 2. */\n      linear-gradient(to right, #fff, transparent) /* 2. */\n    ;\n  "),n.setAttribute("style",`\n    box-sizing: border-box;\n    position: absolute;\n    left: ${100*o.hsv.s}%;   /* 3. */\n    bottom: ${100*o.hsv.v}%; /* 3. */\n  `)}(r.value,a.value,l.value,s);return function(e,t){return{colors:{...e},cssColor:V(e[t],t)}}(s,u.value)}(e);o.emit("color-change",n)}}return t.watch((()=>e.color),(e=>{v(e)})),t.onMounted((()=>{document.addEventListener("mousemove",p,{passive:!1}),document.addEventListener("touchmove",f,{passive:!1}),document.addEventListener("mouseup",i),document.addEventListener("touchend",i),v(e.color)})),t.onBeforeUnmount((()=>{document.removeEventListener("mousemove",p),document.removeEventListener("touchmove",f),document.removeEventListener("mouseup",i),document.removeEventListener("touchend",i)})),{colorPicker:r,colorSpace:a,thumb:l,activeFormat:u,colors:s,pointerOriginatedInColorSpace:c,supportedFormats:["hex","hsl","hsv","hwb","rgb"],startMovingThumb:function(){c.value=!0},moveThumbWithArrows:function(e){if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(e.key))return;e.preventDefault();const t=["ArrowLeft","ArrowDown"].includes(e.key)?-1:1,o=["ArrowLeft","ArrowRight"].includes(e.key)?"s":"v",r=e.shiftKey?10:1,a=s.hsv[o]+t*r*.01,l={...s.hsv};l[o]=n(a,0,1),m("hsv",l)},changeInputValue:S,copyColor:function(){!function(e){if("function"!=typeof document.queryCommandSupported||!document.queryCommandSupported("copy"))return!1;const t=document.createElement("textarea");let n;t.textContent=e,t.style.position="fixed",document.body.appendChild(t),t.select();try{n=document.execCommand("copy")}catch{n=!1}finally{document.body.removeChild(t)}}(V(s[u.value],u.value))},updateHue:function(e){const t=e.currentTarget,n={...s.hsv};n.h=parseInt(t.value)/360,m("hsv",n)},updateAlpha:function(e){const t=e.currentTarget,n={...s.hsv};n.a=parseInt(t.value)/100,m("hsv",n)},updateColorValue:function(e,t,n){const o=e.target,r={...s[t]},a=h[t][n].from(o.value);Number.isNaN(a)||void 0===a||(r[n]=a,m(t,r))},updateHexColorValue:function(e){const t=e.target;F(t.value)&&m("hex",t.value)},switchFormat:function(){const t=e.visibleFormats.findIndex((e=>e===u.value)),n=t===e.visibleFormats.length-1?0:t+1;u.value=e.visibleFormats[n]},getChannelAsCssValue:function(e,t){return h[e][t].to(s[e][t])}}}};function S(e){if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(e.key)||!e.shiftKey)return;const t=e.currentTarget,o=parseFloat(t.step),r=["ArrowLeft","ArrowDown"].includes(e.key)?-1:1,a=n(parseFloat(t.value)+r*o*10,parseInt(t.min),parseInt(t.max));t.value=String(a-r*o)}const I={ref:"colorPicker",class:"vacp-color-picker"},L={class:"vacp-range-input-label-text vacp-range-input-label-text--hue"},E=t.createTextVNode("Hue"),P={class:"vacp-range-input-label-text vacp-range-input-label-text--alpha"},B=t.createTextVNode("Alpha"),H=t.createTextVNode(" Copy color "),O={class:"vacp-color-inputs"},j={class:"vacp-color-input-group"},W=t.createVNode("span",{class:"vacp-color-input-label-text"}," Hex ",-1),q={class:"vacp-color-input-label-text"},D=t.createTextVNode(" Switch format ");T.render=function(e,n,o,r,a,l){return t.openBlock(),t.createBlock("div",I,[t.createVNode("div",{ref:"colorSpace",class:"vacp-color-space",onMousedown:n[2]||(n[2]=(...e)=>r.startMovingThumb&&r.startMovingThumb(...e)),onTouchstart:n[3]||(n[3]=(...e)=>r.startMovingThumb&&r.startMovingThumb(...e))},[t.createVNode("div",{ref:"thumb",class:"vacp-color-space-thumb",tabindex:"0","aria-label":"Color space thumb",onKeydown:n[1]||(n[1]=(...e)=>r.moveThumbWithArrows&&r.moveThumbWithArrows(...e))},null,544)],544),t.createVNode("label",{class:"vacp-range-input-label vacp-range-input-label--hue",for:`${o.id}-hue-slider`},[t.createVNode("span",L,[t.renderSlot(e.$slots,"hue-range-input-label",{},(()=>[E]))]),t.createVNode("input",{id:`${o.id}-hue-slider`,class:"vacp-range-input vacp-range-input--hue",value:360*r.colors.hsv.h,type:"range",min:"0",max:"360",step:"1",onKeydownPassive:n[4]||(n[4]=(...e)=>r.changeInputValue&&r.changeInputValue(...e)),onInput:n[5]||(n[5]=(...e)=>r.updateHue&&r.updateHue(...e))},null,40,["id","value"])],8,["for"]),t.createVNode("label",{class:"vacp-range-input-label vacp-range-input-label--alpha",for:`${o.id}-alpha-slider`},[t.createVNode("span",P,[t.renderSlot(e.$slots,"alpha-range-input-label",{},(()=>[B]))]),t.createVNode("input",{id:`${o.id}-alpha-slider`,class:"vacp-range-input vacp-range-input--alpha",value:100*r.colors.hsv.a,type:"range",min:"0",max:"100",step:"1",onKeydownPassive:n[6]||(n[6]=(...e)=>r.changeInputValue&&r.changeInputValue(...e)),onInput:n[7]||(n[7]=(...e)=>r.updateAlpha&&r.updateAlpha(...e))},null,40,["id","value"])],8,["for"]),t.createVNode("button",{class:"vacp-copy-button",type:"button",onClick:n[8]||(n[8]=(...e)=>r.copyColor&&r.copyColor(...e))},[t.renderSlot(e.$slots,"copy-button",{},(()=>[H]))]),t.createVNode("div",O,[t.createVNode("div",j,["hex"===r.activeFormat?(t.openBlock(),t.createBlock("label",{key:0,class:"vacp-color-input-label",for:`${o.id}-color-hex`},[W,t.createVNode("input",{id:`${o.id}-color-hex`,class:"vacp-color-input",type:"text",value:r.colors.hex,onInput:n[9]||(n[9]=e=>r.updateHexColorValue(e))},null,40,["id","value"])],8,["for"])):(t.openBlock(!0),t.createBlock(t.Fragment,{key:1},t.renderList(Object.keys(r.colors[r.activeFormat]),(e=>(t.openBlock(),t.createBlock("label",{id:`${o.id}-color-${r.activeFormat}-${e}`,key:`${o.id}-color-${r.activeFormat}-${e}`,class:"vacp-color-input-label",for:`${o.id}-color-${r.activeFormat}`,onInput:t=>r.updateColorValue(t,r.activeFormat,e)},[t.createVNode("span",q,t.toDisplayString(e.toUpperCase()),1),t.createVNode("input",{id:`${o.id}-color-${r.activeFormat}`,class:"vacp-color-input",type:"text",value:r.getChannelAsCssValue(r.activeFormat,e),onInput:t=>r.updateColorValue(t,r.activeFormat,e)},null,40,["id","value","onInput"])],40,["id","for","onInput"])))),128))]),o.visibleFormats.length>1?(t.openBlock(),t.createBlock("button",{key:0,class:"vacp-format-switch-button",type:"button",onClick:n[10]||(n[10]=(...e)=>r.switchFormat&&r.switchFormat(...e))},[t.renderSlot(e.$slots,"format-switch-button",{},(()=>[D]))])):t.createCommentVNode("",!0)])],512)};var K={install(e){e.component("ColorPicker",T)}};e.ColorPicker=T,e.default=K,Object.defineProperty(e,"__esModule",{value:!0})}));
