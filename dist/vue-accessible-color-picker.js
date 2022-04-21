import{ref as n,reactive as e,computed as t,watch as a,onMounted as r,onBeforeUnmount as o,openBlock as c,createElementBlock as i,createElementVNode as l,renderSlot as s,unref as u,createCommentVNode as p,Fragment as v,renderList as h,toDisplayString as d,createTextVNode as f}from"vue";function g(n,e,t){return Math.max(e,Math.min(n,t))}function b(n,e=2){return n.toFixed(e).replace(/0+$/,"").replace(/\.$/,"")}function m(n){if(n.endsWith("."))return NaN;return(parseFloat(n)%360+360)%360/360}function y(n){return b(360*n)}function x(n){if(!n.endsWith("%"))return NaN;const e=n.substring(0,n.length-1);if(e.endsWith("."))return NaN;const t=parseFloat(e);return Number.isNaN(t)?NaN:g(t,0,100)/100}function w(n){return b(100*n)+"%"}function k(n){if(n.endsWith("%"))return x(n);if(n.endsWith("."))return NaN;const e=parseFloat(n);return Number.isNaN(e)?NaN:g(e,0,255)/255}function $(n){return b(255*n)}function C(n){return n.endsWith("%")?x(n):g(parseFloat(n),0,1)}function z(n){return String(n)}const S={hsl:{h:{to:y,from:m},s:{to:w,from:x},l:{to:w,from:x},a:{to:z,from:C}},hwb:{h:{to:y,from:m},w:{to:w,from:x},b:{to:w,from:x},a:{to:z,from:C}},rgb:{r:{to:$,from:k},g:{to:$,from:k},b:{to:$,from:k},a:{to:z,from:C}}};function N(n){const e=n.replace(/^#/,""),t=[],a=e.length>4?2:1;for(let n=0;n<e.length;n+=a){const r=e.slice(n,n+a);t.push(r.repeat(a%2+1))}3===t.length&&t.push("ff");const r=t.map((n=>parseInt(n,16)/255));return{r:r[0],g:r[1],b:r[2],a:r[3]}}function A(n){const e=n.l<.5?n.l*(1+n.s):n.l+n.s-n.l*n.s,t=2*n.l-e;return{r:E(t,e,n.h+1/3),g:E(t,e,n.h),b:E(t,e,n.h-1/3),a:n.a}}function E(n,e,t){return t<0?t+=1:t>1&&(t-=1),t<1/6?n+6*(e-n)*t:t<.5?e:t<2/3?n+(e-n)*(2/3-t)*6:n}function T(n){return{r:L(5,n),g:L(3,n),b:L(1,n),a:n.a}}function L(n,e){const t=(n+6*e.h)%6;return e.v-e.v*e.s*Math.max(0,Math.min(t,4-t,1))}function F(n){return{h:n.h,s:1===n.b?0:1-n.w/(1-n.b),v:1-n.b,a:n.a}}function M(n){const e=Math.min(n.r,n.g,n.b),t=Math.max(n.r,n.g,n.b);let a;return a=t===e?0:t===n.r?(0+(n.g-n.b)/(t-e))/6:t===n.g?(2+(n.b-n.r)/(t-e))/6:(4+(n.r-n.g)/(t-e))/6,a<0&&(a+=1),{h:a,w:e,b:1-t,a:n.a}}function I(n){const e=M(n),t=e.w,a=1-e.b,r=(a+t)/2;let o;return o=0===a||1===t?0:(a-r)/Math.min(r,1-r),{h:e.h,s:o,l:r,a:n.a}}function j(n){return"#"+Object.values(n).map((n=>{const e=255*n,t=Math.round(e).toString(16);return 1===t.length?"0"+t:t})).join("")}const P={hex:[["hsl",function(n){return I(N(n))}],["hsv",function(n){return W(N(n))}],["hwb",function(n){return M(N(n))}],["rgb",N]],hsl:[["hex",function(n){return j(A(n))}],["hsv",function(n){const e=n.l+n.s*Math.min(n.l,1-n.l),t=0===e?0:2-2*n.l/e;return{h:n.h,s:t,v:e,a:n.a}}],["hwb",function(n){return M(A(n))}],["rgb",A]],hsv:[["hex",function(n){return j(T(n))}],["hsl",function(n){const e=n.v-n.v*n.s/2,t=Math.min(e,1-e),a=0===t?0:(n.v-e)/t;return{h:n.h,s:a,l:e,a:n.a}}],["hwb",function(n){return{h:n.h,w:(1-n.s)*n.v,b:1-n.v,a:n.a}}],["rgb",T]],hwb:[["hex",function(n){return j(O(n))}],["hsl",function(n){return I(O(n))}],["hsv",F],["rgb",O]],rgb:[["hex",j],["hsl",I],["hsv",W],["hwb",M]]};function O(n){return T(F(n))}function W(n){return F(M(n))}function q(n){const e={};for(const t in n)e[t]=n[t];return e}const D={hex:(n,e)=>e?n.substring(0,n.length-(n.length-1)/4):n,hsl:(n,e)=>`hsl(${b(360*n.h)} ${b(100*n.s)}% ${b(100*n.l)}%`+(e?")":` / ${b(n.a)})`),hwb:(n,e)=>`hwb(${b(360*n.h)} ${b(100*n.w)}% ${b(100*n.b)}%`+(e?")":` / ${b(n.a)})`),rgb:(n,e)=>`rgb(${b(255*n.r)} ${b(255*n.g)} ${b(255*n.b)}`+(e?")":` / ${b(n.a)})`)};function H(n,e,t){return D[e](n,t)}function R(n){return!!n.startsWith("#")&&(!![3,4,6,8].includes(n.length-1)&&/^#[0-9A-Fa-f]+$/.test(n))}function U(n){if("string"!=typeof n){const e=function(n){return Object.prototype.hasOwnProperty.call(n,"r")?"rgb":Object.prototype.hasOwnProperty.call(n,"w")?"hwb":Object.prototype.hasOwnProperty.call(n,"v")?"hsv":"hsl"}(n);return{format:e,color:n}}if(R(n))return{format:"hex",color:n};if(!n.includes("(")){const e=document.createElement("canvas").getContext("2d");e.fillStyle=n;const t=e.fillStyle;return"#000000"===t&&"black"!==n?null:{format:"hex",color:t}}const[e,t]=n.split("("),a=e.substring(0,3),r=t.replace(/[,/)]/g," ").replace(/\s+/g," ").trim().split(" ");3===r.length&&r.push("1");const o=a.split("").concat("a"),c=Object.fromEntries(o.map(((n,e)=>[n,S[a][n].from(r[e])])));return{format:a,color:c}}const K=["hex","hsl","hwb","rgb"],B=["show","hide"],_={class:"vacp-range-input-group"},X=["for"],Y={class:"vacp-range-input-label-text vacp-range-input-label-text--hue"},J=f("Hue"),G=["id","value"],Q=["for"],V={class:"vacp-range-input-label-text vacp-range-input-label-text--alpha"},Z=f("Alpha"),nn=["id","value"],en=f(" Copy color "),tn={class:"vacp-color-inputs"},an={class:"vacp-color-input-group"},rn=["for"],on=l("span",{class:"vacp-color-input-label-text"}," Hex ",-1),cn=["id","value"],ln=["id","for","onInput"],sn={class:"vacp-color-input-label-text"},un=["id","value","onInput"],pn=f(" Switch format ");var vn={props:{color:{type:[String,Object],required:!1,default:null},id:{type:String,required:!1,default:"color-picker"},visibleFormats:{type:Array,required:!1,default:()=>K,validator:n=>n.length>0&&n.every((n=>K.includes(n)))},defaultFormat:{type:String,required:!1,default:"hsl",validator:n=>K.includes(n)},alphaChannel:{type:String,required:!1,default:"show",validator:n=>B.includes(n)}},emits:["color-change"],setup(f,{emit:b}){const m=f,y=n(null),x=n(null),w=n(null),k=n(!1),$=n(m.defaultFormat),C=e({hex:"#ffffffff",hsl:{h:0,s:0,l:1,a:1},hsv:{h:0,s:0,v:1,a:1},hwb:{h:0,w:1,b:0,a:1},rgb:{r:1,g:1,b:1,a:1}}),z=t((()=>{const n=Object.keys(C[$.value]);return"hex"!==$.value&&"hide"===m.alphaChannel?n.slice(0,3):n})),N=t((()=>"hide"===m.alphaChannel&&[5,7].includes(C.hex.length)?C.hex.substring(0,C.hex.length-(C.hex.length-1)/4):C.hex));function A(){const n=m.visibleFormats.findIndex((n=>n===$.value)),e=n===m.visibleFormats.length-1?0:n+1;$.value=m.visibleFormats[e]}function E(n){k.value=!0,F(n)}function T(n){k.value=!0,M(n)}function L(){k.value=!1}function F(n){1===n.buttons&&!1!==k.value&&x.value instanceof HTMLElement&&I(x.value,n.clientX,n.clientY)}function M(n){if(!1===k.value||!(x.value instanceof HTMLElement))return;n.preventDefault();const e=n.touches[0];I(x.value,e.clientX,e.clientY)}function I(n,e,t){const a=function(n,e,t){const a=n.getBoundingClientRect(),r=e-a.left,o=t-a.top;return{x:g(r/a.width,0,1),y:g(1-o/a.height,0,1)}}(n,e,t),r=q(C.hsv);r.s=a.x,r.v=a.y,B("hsv",r)}function j(n){if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(n.key))return;n.preventDefault();const e=["ArrowLeft","ArrowDown"].includes(n.key)?-1:1,t=["ArrowLeft","ArrowRight"].includes(n.key)?"s":"v",a=n.shiftKey?10:1,r=C.hsv[t]+e*a*.01,o=q(C.hsv);o[t]=g(r,0,1),B("hsv",o)}function O(n){if(null===n)return;const e=U(n);null!==e&&B(e.format,e.color)}function W(n){const e=n.currentTarget,t=q(C.hsv);t.h=parseInt(e.value)/360,B("hsv",t)}function D(n){const e=n.currentTarget,t=q(C.hsv);t.a=parseInt(e.value)/100,B("hsv",t)}function K(n,e,t){const a=n.target,r=q(C[e]),o=S[e][t].from(a.value);Number.isNaN(o)||void 0===o||(r[t]=o,B(e,r))}function B(n,e){let t=e;if("hide"===m.alphaChannel)if("string"!=typeof e)e.a=1,t=e;else if([5,9].includes(e.length)){const n=(e.length-1)/4;t=e.substring(0,e.length-n)+"f".repeat(n)}if(!function(n,e){if("string"==typeof n||"string"==typeof e)return n===e;for(const t in n)if(n[t]!==e[t])return!1;return!0}(C[n],t)){C[n]=t;const e=function(n){for(const[e,t]of P[n])C[e]=t(C[n]);y.value instanceof HTMLElement&&x.value instanceof HTMLElement&&w.value instanceof HTMLElement&&function(n,e,t,a){n.style.setProperty("--vacp-hsl-h",String(a.hsl.h)),n.style.setProperty("--vacp-hsl-s",String(a.hsl.s)),n.style.setProperty("--vacp-hsl-l",String(a.hsl.l)),n.style.setProperty("--vacp-hsl-a",String(a.hsl.a)),e.setAttribute("style","\n    position: relative;\n    background-color: hsl(calc(var(--vacp-hsl-h) * 360) 100% 50%); /* 1. */\n    background-image:\n      linear-gradient(to top, #000, transparent),  /* 2. */\n      linear-gradient(to right, #fff, transparent) /* 2. */\n    ;\n  "),t.setAttribute("style",`\n    box-sizing: border-box;\n    position: absolute;\n    left: ${100*a.hsv.s}%;   /* 3. */\n    bottom: ${100*a.hsv.v}%; /* 3. */\n  `)}(y.value,x.value,w.value,C);return function(n,e){const t="hide"===m.alphaChannel;return{colors:n,cssColor:H(n[e],e,t)}}(C,$.value)}(n);b("color-change",e)}}function vn(){const n=C[$.value],e="hide"===m.alphaChannel;!function(n){if("function"!=typeof document.queryCommandSupported||!document.queryCommandSupported("copy"))return!1;const e=document.createElement("textarea");let t;e.textContent=n,e.style.position="fixed",document.body.appendChild(e),e.select();try{t=document.execCommand("copy")}catch{t=!1}finally{document.body.removeChild(e)}}(H(n,$.value,e))}function hn(n,e){return S[n][e].to(C[n][e])}function dn(n){if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(n.key)||!n.shiftKey)return;const e=n.currentTarget,t=parseFloat(e.step),a=["ArrowLeft","ArrowDown"].includes(n.key)?-1:1,r=g(parseFloat(e.value)+a*t*10,parseInt(e.min),parseInt(e.max));e.value=String(r-a*t)}return a((()=>m.color),(n=>{O(n)})),r((()=>{document.addEventListener("mousemove",F,{passive:!1}),document.addEventListener("touchmove",M,{passive:!1}),document.addEventListener("mouseup",L),document.addEventListener("touchend",L),O(m.color)})),o((()=>{document.removeEventListener("mousemove",F),document.removeEventListener("touchmove",M),document.removeEventListener("mouseup",L),document.removeEventListener("touchend",L)})),(n,e)=>(c(),i("div",{ref_key:"colorPicker",ref:y,class:"vacp-color-picker"},[l("div",{ref_key:"colorSpace",ref:x,class:"vacp-color-space",onMousedown:E,onTouchstart:T},[l("div",{ref_key:"thumb",ref:w,class:"vacp-color-space-thumb",tabindex:"0","aria-label":"Color space thumb",onKeydown:j},null,544)],544),l("div",_,[l("label",{class:"vacp-range-input-label vacp-range-input-label--hue",for:`${f.id}-hue-slider`},[l("span",Y,[s(n.$slots,"hue-range-input-label",{},(()=>[J]))]),l("input",{id:`${f.id}-hue-slider`,class:"vacp-range-input vacp-range-input--hue",value:360*u(C).hsv.h,type:"range",min:"0",max:"360",step:"1",onKeydownPassive:dn,onInput:W},null,40,G)],8,X),"show"===f.alphaChannel?(c(),i("label",{key:0,class:"vacp-range-input-label vacp-range-input-label--alpha",for:`${f.id}-alpha-slider`},[l("span",V,[s(n.$slots,"alpha-range-input-label",{},(()=>[Z]))]),l("input",{id:`${f.id}-alpha-slider`,class:"vacp-range-input vacp-range-input--alpha",value:100*u(C).hsv.a,type:"range",min:"0",max:"100",step:"1",onKeydownPassive:dn,onInput:D},null,40,nn)],8,Q)):p("",!0)]),l("button",{class:"vacp-copy-button",type:"button",onClick:vn},[s(n.$slots,"copy-button",{},(()=>[en]))]),l("div",tn,[l("div",an,["hex"===$.value?(c(),i("label",{key:0,class:"vacp-color-input-label",for:`${f.id}-color-hex`},[on,l("input",{id:`${f.id}-color-hex`,class:"vacp-color-input",type:"text",value:u(N),onInput:e[0]||(e[0]=n=>function(n){const e=n.target;R(e.value)&&B("hex",e.value)}(n))},null,40,cn)],8,rn)):(c(!0),i(v,{key:1},h(u(z),(n=>(c(),i("label",{id:`${f.id}-color-${$.value}-${n}`,key:`${f.id}-color-${$.value}-${n}`,class:"vacp-color-input-label",for:`${f.id}-color-${$.value}`,onInput:e=>K(e,$.value,n)},[l("span",sn,d(n.toUpperCase()),1),l("input",{id:`${f.id}-color-${$.value}`,class:"vacp-color-input",type:"text",value:hn($.value,n),onInput:e=>K(e,$.value,n)},null,40,un)],40,ln)))),128))]),f.visibleFormats.length>1?(c(),i("button",{key:0,class:"vacp-format-switch-button",type:"button",onClick:A},[s(n.$slots,"format-switch-button",{},(()=>[pn]))])):p("",!0)])],512))}};!function(n,e){void 0===e&&(e={});var t=e.insertAt;if(n&&"undefined"!=typeof document){var a=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css","top"===t&&a.firstChild?a.insertBefore(r,a.firstChild):a.appendChild(r),r.styleSheet?r.styleSheet.cssText=n:r.appendChild(document.createTextNode(n))}}('\n/*\nThis style block is unscoped intentionally.\n\nThis is done to have a lower specificity for its selectors which in turn makes it easier to override their styles.\n\nThe specificity for `.vacp-color-space[data-v-76c97bd2]` is 20 while the specificity for `.vacp-color-space` is 10.\n*/\n.vacp-color-picker {\n  --vacp-color: hsl(\n    calc(var(--vacp-hsl-h) * 360)\n    calc(var(--vacp-hsl-s) * 100%)\n    calc(var(--vacp-hsl-l) * 100%)\n    / var(--vacp-hsl-a)\n  );\n  --vacp-focus-color: dodgerblue;\n  --vacp-color-space-width: 300px;\n  --vacp-spacing: 6px;\n  --vacp-tiled-background-image: linear-gradient(\n      45deg,\n      #eee 25%,\n      transparent 25%,\n      transparent 75%,\n      #eee 75%,\n      #eee\n    ),\n    linear-gradient(\n      45deg,\n      #eee 25%,\n      transparent 25%,\n      transparent 75%,\n      #eee 75%,\n      #eee\n    )\n  ;\n\n  max-width: var(--vacp-color-space-width);\n  padding: var(--vacp-spacing);\n  display: grid;\n  grid-gap: var(--vacp-spacing);\n  grid-template-columns: 1fr min-content;\n  grid-template-areas:\n    "color-space  color-space"\n    "range-inputs copy-button"\n    "color-inputs color-inputs"\n  ;\n  font-size: 0.8em;\n  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n  background-color: #fff;\n}\n.vacp-color-picker *,\n.vacp-color-picker *::before,\n.vacp-color-picker *::after {\n  box-sizing: border-box;\n}\n.vacp-color-picker button::-moz-focus-inner {\n  border: none;\n  padding: 0;\n}\n.vacp-color-picker :focus {\n  outline: 2px solid var(--vacp-focus-color);\n}\n.vacp-color-space {\n  grid-area: color-space;\n\n  overflow: hidden;\n  height: calc(var(--vacp-color-space-width) * 0.6);\n}\n.vacp-color-space-thumb {\n  --vacp-thumb-size: calc(var(--vacp-spacing) * 4);\n\n  width: var(--vacp-thumb-size);\n  height: var(--vacp-thumb-size);\n  margin-left: calc(-1 * var(--vacp-thumb-size) / 2);\n  margin-bottom: calc(-1 * var(--vacp-thumb-size) / 2);\n  border: 3px solid #fff;\n  border-radius: 50%;\n  box-shadow: 0 0 0 1px #000;\n}\n\n/*\n1. Don’t fully remove a focus outline or border. This is important to maintain a focus style in Windows’ high contrast mode.\n*/\n.vacp-color-space-thumb:focus {\n  outline-color: transparent; /* 1. */\n  box-shadow: 0 0 0 1px #000, 0 0 0 3px var(--vacp-focus-color);\n}\n.vacp-range-input-label {\n  --vacp-slider-track-width: 100%;\n  --vacp-slider-track-height: calc(var(--vacp-spacing) * 3);\n  --vacp-slider-thumb-size: calc(var(--vacp-slider-track-height) + var(--vacp-spacing));\n\n  display: block;\n}\n.vacp-range-input-group {\n  grid-area: range-inputs;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.vacp-range-input-group > :not(:first-child) {\n  margin-top: var(--vacp-spacing);\n}\n.vacp-range-input,\n.vacp-range-input::-webkit-slider-thumb {\n  -webkit-appearance: none;\n}\n.vacp-range-input {\n  display: block;\n  width: var(--vacp-slider-track-width);\n  height: var(--vacp-slider-track-height);\n  margin-right: 0;\n  margin-left: 0;\n  margin-top: calc(var(--vacp-spacing) / 2);\n  margin-bottom: calc(var(--vacp-spacing) / 2);\n  padding: 0;\n  border: none;\n  background: none;\n}\n.vacp-range-input:focus {\n  outline: none;\n}\n\n/* Resets one of these annoying custom focus styles in Firefox. */\n.vacp-range-input::-moz-focus-outer {\n  border: none;\n}\n.vacp-range-input--alpha {\n  background-color: #fff;\n  background-image: var(--vacp-tiled-background-image);\n  background-size: calc(var(--vacp-spacing) * 2) calc(var(--vacp-spacing) * 2);\n  background-position: 0 0, var(--vacp-spacing) var(--vacp-spacing);\n}\n\n/*\nRange input: Tracks\n*/\n.vacp-range-input::-moz-range-track {\n  display: block;\n  box-sizing: border-box;\n  height: var(--vacp-slider-track-height);\n  border: none;\n}\n.vacp-range-input::-webkit-slider-runnable-track {\n  width: var(--vacp-slider-track-width);\n  height: var(--vacp-slider-track-height);\n  border: none;\n}\n.vacp-range-input::-ms-track {\n  width: var(--vacp-slider-track-width);\n  height: var(--vacp-slider-track-height);\n  border: none;\n}\n.vacp-range-input:focus::-moz-range-track {\n  border: 1px solid var(--vacp-focus-color);\n  outline: 2px solid var(--vacp-focus-color);\n}\n.vacp-range-input:focus::-webkit-slider-runnable-track {\n  border: 1px solid var(--vacp-focus-color);\n  outline: 2px solid var(--vacp-focus-color);\n}\n.vacp-range-input:focus::-ms-track {\n  border: 1px solid var(--vacp-focus-color);\n  outline: 2px solid var(--vacp-focus-color);\n}\n.vacp-range-input--alpha::-moz-range-track {\n  background-image: linear-gradient(to right, transparent, var(--vacp-color));\n}\n.vacp-range-input--alpha::-webkit-slider-runnable-track {\n  background-image: linear-gradient(to right, transparent, var(--vacp-color));\n}\n.vacp-range-input--alpha::-ms-track {\n  background-image: linear-gradient(to right, transparent, var(--vacp-color));\n}\n.vacp-range-input--hue::-moz-range-track {\n  background-image: linear-gradient(\n    to right,\n    /*   0° */ #f00 calc(100% *   0/360),\n    /*  60° */ #ff0 calc(100% *  60/360),\n    /* 120° */ #0f0 calc(100% * 120/360),\n    /* 180° */ #0ff calc(100% * 180/360),\n    /* 240° */ #00f calc(100% * 240/360),\n    /* 300° */ #f0f calc(100% * 300/360),\n    /* 360° */ #f00 calc(100% * 360/360)\n  );\n}\n.vacp-range-input--hue::-webkit-slider-runnable-track {\n  background-image: linear-gradient(\n    to right,\n    /*   0° */ #f00 calc(100% *   0/360),\n    /*  60° */ #ff0 calc(100% *  60/360),\n    /* 120° */ #0f0 calc(100% * 120/360),\n    /* 180° */ #0ff calc(100% * 180/360),\n    /* 240° */ #00f calc(100% * 240/360),\n    /* 300° */ #f0f calc(100% * 300/360),\n    /* 360° */ #f00 calc(100% * 360/360)\n  );\n}\n.vacp-range-input--hue::-ms-track {\n  background-image: linear-gradient(\n    to right,\n    /*   0° */ #f00 calc(100% *   0/360),\n    /*  60° */ #ff0 calc(100% *  60/360),\n    /* 120° */ #0f0 calc(100% * 120/360),\n    /* 180° */ #0ff calc(100% * 180/360),\n    /* 240° */ #00f calc(100% * 240/360),\n    /* 300° */ #f0f calc(100% * 300/360),\n    /* 360° */ #f00 calc(100% * 360/360)\n  );\n}\n\n/*\nRange input: thumbs\n*/\n.vacp-range-input::-moz-range-thumb {\n  box-sizing: border-box;\n  width: var(--vacp-slider-thumb-size);\n  height: var(--vacp-slider-thumb-size);\n  border: 3px solid #fff;\n  border-radius: 50%;\n  background-color: transparent;\n  box-shadow: 0 0 0 1px #000;\n  transform: rotate(0);\n}\n.vacp-range-input::-webkit-slider-thumb {\n  width: var(--vacp-slider-thumb-size);\n  height: var(--vacp-slider-thumb-size);\n  margin-top: calc((var(--vacp-slider-track-height) - var(--vacp-slider-thumb-size)) / 2);\n  border: 3px solid #fff;\n  border-radius: 50%;\n  background-color: transparent;\n  box-shadow: 0 0 0 1px #000;\n  transform: rotate(0);\n}\n.vacp-range-input::-ms-thumb {\n  width: var(--vacp-slider-thumb-size);\n  height: var(--vacp-slider-thumb-size);\n  margin-top: 0;\n  border: 3px solid #fff;\n  border-radius: 50%;\n  background-color: transparent;\n  box-shadow: 0 0 0 1px #000;\n  transform: rotate(0);\n}\n.vacp-copy-button {\n  grid-area: copy-button;\n  justify-self: center;\n  align-self: center;\n\n  position: relative;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: calc(var(--vacp-spacing) * 6);\n  height: calc(var(--vacp-spacing) * 6);\n  border: 1px solid transparent;\n  border-radius: 50%;\n  color: #fff;\n\n  /* Tiled background */\n  background-color: #fff;\n  background-image:\n    linear-gradient(var(--vacp-color), var(--vacp-color)),\n    var(--vacp-tiled-background-image)\n  ;\n  background-size: calc(var(--vacp-spacing) * 2) calc(var(--vacp-spacing) * 2);\n  background-position: 0 0, var(--vacp-spacing) var(--vacp-spacing);\n}\n.vacp-copy-button:enabled:not(:hover) svg {\n  display: none;\n}\n\n/*\n1. Justification for removing the outline: The focus styles are maintained using a solid border style. This maintains a focus style in Windows’ high contrast mode which would be lost with a combination of `outline: none` and a box shadow because box shadows are removed in high contrast mode.\n*/\n.vacp-copy-button:enabled:focus {\n  outline: none; /* 1. */\n  box-shadow: 0 0 0 2px var(--vacp-focus-color);\n  border-color: var(--vacp-focus-color);\n}\n.vacp-copy-button:enabled:hover {\n  background-color: var(--vacp-color);\n  background-image: linear-gradient(rgb(0 0 0 / 0.25), rgb(0 0 0 / 0.25));\n}\n.vacp-color-inputs {\n  grid-area: color-inputs;\n  display: flex;\n  align-items: center;\n}\n.vacp-color-inputs > :not(:first-child) {\n  margin-left: var(--vacp-spacing);\n}\n.vacp-color-input-group {\n  flex-grow: 1;\n  display: flex;\n}\n.vacp-color-input-label {\n  flex-grow: 1;\n  text-align: center;\n}\n.vacp-color-input-label:not(:first-child) {\n  margin-left: var(--vacp-spacing);\n}\n.vacp-color-input {\n  width: 100%;\n  margin: 0;\n  margin-top: calc(var(--vacp-spacing) / 2);\n  padding: var(--vacp-spacing);\n  border: 1px solid #ccc;\n  font: inherit;\n  text-align: center;\n  color: inherit;\n  background-color: #fff;\n}\n.vacp-color-input:enabled:focus {\n  border-color: var(--vacp-focus-color);\n}\n.vacp-format-switch-button {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin: 0;\n  padding: var(--vacp-spacing);\n  border: 1px solid transparent;\n  font: inherit;\n  color: inherit;\n  background-color: #fff;\n}\n.vacp-format-switch-button:enabled:focus {\n  border-color: var(--vacp-focus-color);\n}\n.vacp-format-switch-button:enabled:hover {\n  background-color: #eee;\n}\n');const hn={install(n){n.component("ColorPicker",vn)}};export{vn as ColorPicker,hn as default};
