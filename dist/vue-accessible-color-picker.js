import{ref as n,reactive as e,computed as a,watch as t,onMounted as r,onBeforeUnmount as o,openBlock as c,createElementBlock as i,createElementVNode as l,renderSlot as s,createCommentVNode as p,unref as u,Fragment as v,renderList as h,toDisplayString as d,createTextVNode as f}from"vue";function g(n,e,a){return Math.max(e,Math.min(n,a))}function b(n,e=2){return n.toFixed(e).replace(/0+$/,"").replace(/\.$/,"")}function m(n){if(n.endsWith("."))return NaN;return(parseFloat(n)%360+360)%360/360}function y(n){return b(360*n)}function x(n){if(!n.endsWith("%"))return NaN;const e=n.substring(0,n.length-1);if(e.endsWith("."))return NaN;const a=parseFloat(e);return Number.isNaN(a)?NaN:g(a,0,100)/100}function w(n){return b(100*n)+"%"}function k(n){if(n.endsWith("%"))return x(n);if(n.endsWith("."))return NaN;const e=parseFloat(n);return Number.isNaN(e)?NaN:g(e,0,255)/255}function $(n){return b(255*n)}function C(n){return n.endsWith("%")?x(n):g(parseFloat(n),0,1)}function z(n){return String(n)}const S={hsl:{h:{to:y,from:m},s:{to:w,from:x},l:{to:w,from:x},a:{to:z,from:C}},hwb:{h:{to:y,from:m},w:{to:w,from:x},b:{to:w,from:x},a:{to:z,from:C}},rgb:{r:{to:$,from:k},g:{to:$,from:k},b:{to:$,from:k},a:{to:z,from:C}}};function N(n){const e=n.replace(/^#/,""),a=[],t=e.length>4?2:1;for(let n=0;n<e.length;n+=t){const r=e.slice(n,n+t);a.push(r.repeat(t%2+1))}3===a.length&&a.push("ff");const r=a.map((n=>parseInt(n,16)/255));return{r:r[0],g:r[1],b:r[2],a:r[3]}}function A(n){const e=n.l<.5?n.l*(1+n.s):n.l+n.s-n.l*n.s,a=2*n.l-e;return{r:E(a,e,n.h+1/3),g:E(a,e,n.h),b:E(a,e,n.h-1/3),a:n.a}}function E(n,e,a){return a<0?a+=1:a>1&&(a-=1),a<1/6?n+6*(e-n)*a:a<.5?e:a<2/3?n+(e-n)*(2/3-a)*6:n}function T(n){return{r:L(5,n),g:L(3,n),b:L(1,n),a:n.a}}function L(n,e){const a=(n+6*e.h)%6;return e.v-e.v*e.s*Math.max(0,Math.min(a,4-a,1))}function F(n){return{h:n.h,s:1===n.b?0:1-n.w/(1-n.b),v:1-n.b,a:n.a}}function M(n){const e=Math.min(n.r,n.g,n.b),a=Math.max(n.r,n.g,n.b);let t;return t=a===e?0:a===n.r?(0+(n.g-n.b)/(a-e))/6:a===n.g?(2+(n.b-n.r)/(a-e))/6:(4+(n.r-n.g)/(a-e))/6,t<0&&(t+=1),{h:t,w:e,b:1-a,a:n.a}}function I(n){const e=M(n),a=e.w,t=1-e.b,r=(t+a)/2;let o;return o=0===t||1===a?0:(t-r)/Math.min(r,1-r),{h:e.h,s:o,l:r,a:n.a}}function j(n){return"#"+Object.values(n).map((n=>{const e=255*n,a=Math.round(e).toString(16);return 1===a.length?"0"+a:a})).join("")}const P={hex:[["hsl",n=>O(n,[N,I])],["hsv",n=>O(n,[N,M,F])],["hwb",n=>O(n,[N,M])],["rgb",N]],hsl:[["hex",n=>O(n,[A,j])],["hsv",function(n){const e=n.l+n.s*Math.min(n.l,1-n.l),a=0===e?0:2-2*n.l/e;return{h:n.h,s:a,v:e,a:n.a}}],["hwb",n=>O(n,[A,M])],["rgb",A]],hsv:[["hex",n=>O(n,[T,j])],["hsl",function(n){const e=n.v-n.v*n.s/2,a=Math.min(e,1-e),t=0===a?0:(n.v-e)/a;return{h:n.h,s:t,l:e,a:n.a}}],["hwb",function(n){return{h:n.h,w:(1-n.s)*n.v,b:1-n.v,a:n.a}}],["rgb",T]],hwb:[["hex",n=>O(n,[F,T,j])],["hsl",n=>O(n,[F,T,I])],["hsv",F],["rgb",n=>O(n,[F,T])]],rgb:[["hex",j],["hsl",I],["hsv",n=>O(n,[M,F])],["hwb",M]]};function O(n,e){return e.reduce(((n,e)=>e(n)),n)}function W(n){const e={};for(const a in n)e[a]=n[a];return e}const q={hex:(n,e)=>e&&[5,9].includes(n.length)?n.substring(0,n.length-(n.length-1)/4):n,hsl:(n,e)=>`hsl(${b(360*n.h)} ${b(100*n.s)}% ${b(100*n.l)}%`+(e?")":` / ${b(n.a)})`),hwb:(n,e)=>`hwb(${b(360*n.h)} ${b(100*n.w)}% ${b(100*n.b)}%`+(e?")":` / ${b(n.a)})`),rgb:(n,e)=>`rgb(${b(255*n.r)} ${b(255*n.g)} ${b(255*n.b)}`+(e?")":` / ${b(n.a)})`)};function D(n,e,a){return q[e](n,a)}function H(n){return!!n.startsWith("#")&&(!![3,4,6,8].includes(n.length-1)&&/^#[0-9A-Fa-f]+$/.test(n))}function R(n){if("string"!=typeof n){const e=function(n){return Object.prototype.hasOwnProperty.call(n,"r")?"rgb":Object.prototype.hasOwnProperty.call(n,"w")?"hwb":Object.prototype.hasOwnProperty.call(n,"v")?"hsv":"hsl"}(n);return{format:e,color:n}}if(H(n))return{format:"hex",color:n};if(!n.includes("(")){const e=document.createElement("canvas").getContext("2d");e.fillStyle=n;const a=e.fillStyle;return"#000000"===a&&"black"!==n?null:{format:"hex",color:a}}const[e,a]=n.split("("),t=e.substring(0,3),r=a.replace(/[,/)]/g," ").replace(/\s+/g," ").trim().split(" ");3===r.length&&r.push("1");const o=t.split("").concat("a"),c=Object.fromEntries(o.map(((n,e)=>[n,S[t][n].from(r[e])])));return{format:t,color:c}}const U=["hex","hsl","hwb","rgb"],K=["show","hide"],_={class:"vacp-range-input-group"},B=["for"],X={class:"vacp-range-input-label-text vacp-range-input-label-text--hue"},Y=f("Hue"),J=["id","value"],G=["for"],Q={class:"vacp-range-input-label-text vacp-range-input-label-text--alpha"},V=f("Alpha"),Z=["id","value"],nn=f(" Copy color "),en={class:"vacp-color-inputs"},an={class:"vacp-color-input-group"},tn=["for"],rn=l("span",{class:"vacp-color-input-label-text"}," Hex ",-1),on=["id","value"],cn=["id","for","onInput"],ln={class:"vacp-color-input-label-text"},sn=["id","value","onInput"],pn=f(" Switch format ");var un={__name:"ColorPicker",props:{color:{type:[String,Object],required:!1,default:null},id:{type:String,required:!1,default:"color-picker"},visibleFormats:{type:Array,required:!1,default:()=>U,validator:n=>n.length>0&&n.every((n=>U.includes(n)))},defaultFormat:{type:String,required:!1,default:"hsl",validator:n=>U.includes(n)},alphaChannel:{type:String,required:!1,default:"show",validator:n=>K.includes(n)}},emits:["color-change"],setup(f,{emit:b}){const m=f,y=n(null),x=n(null),w=n(null),k=n(!1),$=n(m.defaultFormat),C=e({hex:"#ffffffff",hsl:{h:0,s:0,l:1,a:1},hsv:{h:0,s:0,v:1,a:1},hwb:{h:0,w:1,b:0,a:1},rgb:{r:1,g:1,b:1,a:1}}),z=a((()=>{const n=Object.keys(C[$.value]);return"hex"!==$.value&&"hide"===m.alphaChannel?n.slice(0,3):n})),N=a((()=>"hide"===m.alphaChannel&&[5,9].includes(C.hex.length)?C.hex.substring(0,C.hex.length-(C.hex.length-1)/4):C.hex));function A(){const n=m.visibleFormats.findIndex((n=>n===$.value)),e=n===m.visibleFormats.length-1?0:n+1;$.value=m.visibleFormats[e]}function E(n){k.value=!0,F(n)}function T(n){k.value=!0,M(n)}function L(){k.value=!1}function F(n){1===n.buttons&&!1!==k.value&&x.value instanceof HTMLElement&&I(x.value,n.clientX,n.clientY)}function M(n){if(!1===k.value||!(x.value instanceof HTMLElement))return;n.preventDefault();const e=n.touches[0];I(x.value,e.clientX,e.clientY)}function I(n,e,a){const t=function(n,e,a){const t=n.getBoundingClientRect(),r=e-t.left,o=a-t.top;return{x:g(r/t.width,0,1),y:g(1-o/t.height,0,1)}}(n,e,a),r=W(C.hsv);r.s=t.x,r.v=t.y,un("hsv",r)}function j(n){if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(n.key))return;n.preventDefault();const e=["ArrowLeft","ArrowDown"].includes(n.key)?-1:1,a=["ArrowLeft","ArrowRight"].includes(n.key)?"s":"v",t=n.shiftKey?10:1,r=C.hsv[a]+e*t*.01,o=W(C.hsv);o[a]=g(r,0,1),un("hsv",o)}function O(n){if(null===n)return;const e=R(n);null!==e&&un(e.format,e.color)}function q(n){const e=n.currentTarget,a=W(C.hsv);a.h=parseInt(e.value)/360,un("hsv",a)}function U(n){const e=n.currentTarget,a=W(C.hsv);a.a=parseInt(e.value)/100,un("hsv",a)}function K(n,e,a){const t=n.target,r=W(C[e]),o=S[e][a].from(t.value);Number.isNaN(o)||void 0===o||(r[a]=o,un(e,r))}function un(n,e){let a=e;if("hide"===m.alphaChannel)if("string"!=typeof e)e.a=1,a=e;else if([5,9].includes(e.length)){const n=(e.length-1)/4;a=e.substring(0,e.length-n)+"f".repeat(n)}else[4,7].includes(e.length)&&(a=e+"f".repeat((e.length-1)/3));if(!function(n,e){if("string"==typeof n||"string"==typeof e)return n===e;for(const a in n)if(n[a]!==e[a])return!1;return!0}(C[n],a)){C[n]=a;const e=function(n){for(const[e,a]of P[n])C[e]=a(C[n]);return function(n,e){const a="hide"===m.alphaChannel;return{colors:n,cssColor:D(n[e],e,a)}}(C,$.value)}(n);b("color-change",e)}y.value instanceof HTMLElement&&x.value instanceof HTMLElement&&w.value instanceof HTMLElement&&function(n,e,a,t){n.style.setProperty("--vacp-hsl-h",String(t.hsl.h)),n.style.setProperty("--vacp-hsl-s",String(t.hsl.s)),n.style.setProperty("--vacp-hsl-l",String(t.hsl.l)),n.style.setProperty("--vacp-hsl-a",String(t.hsl.a)),e.setAttribute("style","\n    position: relative;\n    background-color: hsl(calc(var(--vacp-hsl-h) * 360) 100% 50%); /* 1. */\n    background-image:\n      linear-gradient(to top, #000, transparent),  /* 2. */\n      linear-gradient(to right, #fff, transparent) /* 2. */\n    ;\n  "),a.setAttribute("style",`\n    box-sizing: border-box;\n    position: absolute;\n    left: ${100*t.hsv.s}%;   /* 3. */\n    bottom: ${100*t.hsv.v}%; /* 3. */\n  `)}(y.value,x.value,w.value,C)}function vn(){const n=C[$.value],e="hide"===m.alphaChannel;!function(n){if("function"!=typeof document.queryCommandSupported||!document.queryCommandSupported("copy"))return!1;const e=document.createElement("textarea");let a;e.textContent=n,e.style.position="fixed",document.body.appendChild(e),e.select();try{a=document.execCommand("copy")}catch{a=!1}finally{document.body.removeChild(e)}}(D(n,$.value,e))}function hn(n,e){return S[n][e].to(C[n][e])}function dn(n){if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(n.key)||!n.shiftKey)return;const e=n.currentTarget,a=parseFloat(e.step),t=["ArrowLeft","ArrowDown"].includes(n.key)?-1:1,r=g(parseFloat(e.value)+t*a*10,parseInt(e.min),parseInt(e.max));e.value=String(r-t*a)}return t((()=>m.color),(n=>{O(n)})),r((()=>{document.addEventListener("mousemove",F,{passive:!1}),document.addEventListener("touchmove",M,{passive:!1}),document.addEventListener("mouseup",L),document.addEventListener("touchend",L),O(m.color)})),o((()=>{document.removeEventListener("mousemove",F),document.removeEventListener("touchmove",M),document.removeEventListener("mouseup",L),document.removeEventListener("touchend",L)})),(n,e)=>(c(),i("div",{ref_key:"colorPicker",ref:y,class:"vacp-color-picker"},[l("div",{ref_key:"colorSpace",ref:x,class:"vacp-color-space",onMousedown:E,onTouchstart:T},[l("div",{ref_key:"thumb",ref:w,class:"vacp-color-space-thumb",tabindex:"0","aria-label":"Color space thumb",onKeydown:j},null,544)],544),l("div",_,[l("label",{class:"vacp-range-input-label vacp-range-input-label--hue",for:`${f.id}-hue-slider`},[l("span",X,[s(n.$slots,"hue-range-input-label",{},(()=>[Y]))]),l("input",{id:`${f.id}-hue-slider`,class:"vacp-range-input vacp-range-input--hue",value:360*C.hsv.h,type:"range",min:"0",max:"360",step:"1",onKeydownPassive:dn,onInput:q},null,40,J)],8,B),"show"===f.alphaChannel?(c(),i("label",{key:0,class:"vacp-range-input-label vacp-range-input-label--alpha",for:`${f.id}-alpha-slider`},[l("span",Q,[s(n.$slots,"alpha-range-input-label",{},(()=>[V]))]),l("input",{id:`${f.id}-alpha-slider`,class:"vacp-range-input vacp-range-input--alpha",value:100*C.hsv.a,type:"range",min:"0",max:"100",step:"1",onKeydownPassive:dn,onInput:U},null,40,Z)],8,G)):p("",!0)]),l("button",{class:"vacp-copy-button",type:"button",onClick:vn},[s(n.$slots,"copy-button",{},(()=>[nn]))]),l("div",en,[l("div",an,["hex"===$.value?(c(),i("label",{key:0,class:"vacp-color-input-label",for:`${f.id}-color-hex`},[rn,l("input",{id:`${f.id}-color-hex`,class:"vacp-color-input",type:"text",value:u(N),onInput:e[0]||(e[0]=n=>function(n){const e=n.target;H(e.value)&&un("hex",e.value)}(n))},null,40,on)],8,tn)):(c(!0),i(v,{key:1},h(u(z),(n=>(c(),i("label",{id:`${f.id}-color-${$.value}-${n}`,key:`${f.id}-color-${$.value}-${n}`,class:"vacp-color-input-label",for:`${f.id}-color-${$.value}`,onInput:e=>K(e,$.value,n)},[l("span",ln,d(n.toUpperCase()),1),l("input",{id:`${f.id}-color-${$.value}`,class:"vacp-color-input",type:"text",value:hn($.value,n),onInput:e=>K(e,$.value,n)},null,40,sn)],40,cn)))),128))]),f.visibleFormats.length>1?(c(),i("button",{key:0,class:"vacp-format-switch-button",type:"button",onClick:A},[s(n.$slots,"format-switch-button",{},(()=>[pn]))])):p("",!0)])],512))}};!function(n,e){void 0===e&&(e={});var a=e.insertAt;if(n&&"undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css","top"===a&&t.firstChild?t.insertBefore(r,t.firstChild):t.appendChild(r),r.styleSheet?r.styleSheet.cssText=n:r.appendChild(document.createTextNode(n))}}('\n/*\nThis style block is unscoped intentionally.\n\nThis is done to have a lower specificity for its selectors which in turn makes it easier to override their styles.\n\nThe specificity for `.vacp-color-space[data-v-76c97bd2]` is 20 while the specificity for `.vacp-color-space` is 10.\n*/\n.vacp-color-picker {\n  --vacp-color: hsl(\n    calc(var(--vacp-hsl-h) * 360)\n    calc(var(--vacp-hsl-s) * 100%)\n    calc(var(--vacp-hsl-l) * 100%)\n    / var(--vacp-hsl-a)\n  );\n  --vacp-focus-color: dodgerblue;\n  --vacp-color-space-width: 300px;\n  --vacp-spacing: 6px;\n  --vacp-tiled-background-image: linear-gradient(\n      45deg,\n      #eee 25%,\n      transparent 25%,\n      transparent 75%,\n      #eee 75%,\n      #eee\n    ),\n    linear-gradient(\n      45deg,\n      #eee 25%,\n      transparent 25%,\n      transparent 75%,\n      #eee 75%,\n      #eee\n    )\n  ;\n\n  max-width: var(--vacp-color-space-width);\n  padding: var(--vacp-spacing);\n  display: grid;\n  grid-gap: var(--vacp-spacing);\n  grid-template-columns: 1fr min-content;\n  grid-template-areas:\n    "color-space  color-space"\n    "range-inputs copy-button"\n    "color-inputs color-inputs"\n  ;\n  font-size: 0.8em;\n  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n  background-color: #fff;\n}\n.vacp-color-picker *,\n.vacp-color-picker *::before,\n.vacp-color-picker *::after {\n  box-sizing: border-box;\n}\n.vacp-color-picker button::-moz-focus-inner {\n  border: none;\n  padding: 0;\n}\n.vacp-color-picker :focus {\n  outline: 2px solid var(--vacp-focus-color);\n}\n.vacp-color-space {\n  grid-area: color-space;\n\n  overflow: hidden;\n  height: calc(var(--vacp-color-space-width) * 0.6);\n}\n.vacp-color-space-thumb {\n  --vacp-thumb-size: calc(var(--vacp-spacing) * 4);\n\n  width: var(--vacp-thumb-size);\n  height: var(--vacp-thumb-size);\n  margin-left: calc(-1 * var(--vacp-thumb-size) / 2);\n  margin-bottom: calc(-1 * var(--vacp-thumb-size) / 2);\n  border: 3px solid #fff;\n  border-radius: 50%;\n  box-shadow: 0 0 0 1px #000;\n}\n\n/*\n1. Don’t fully remove a focus outline or border. This is important to maintain a focus style in Windows’ high contrast mode.\n*/\n.vacp-color-space-thumb:focus {\n  outline-color: transparent; /* 1. */\n  box-shadow: 0 0 0 1px #000, 0 0 0 3px var(--vacp-focus-color);\n}\n.vacp-range-input-label {\n  --vacp-slider-track-width: 100%;\n  --vacp-slider-track-height: calc(var(--vacp-spacing) * 3);\n  --vacp-slider-thumb-size: calc(var(--vacp-slider-track-height) + var(--vacp-spacing));\n\n  display: block;\n}\n.vacp-range-input-group {\n  grid-area: range-inputs;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.vacp-range-input-group > :not(:first-child) {\n  margin-top: var(--vacp-spacing);\n}\n.vacp-range-input,\n.vacp-range-input::-webkit-slider-thumb {\n  -webkit-appearance: none;\n}\n.vacp-range-input {\n  display: block;\n  width: var(--vacp-slider-track-width);\n  height: var(--vacp-slider-track-height);\n  margin-right: 0;\n  margin-left: 0;\n  margin-top: calc(var(--vacp-spacing) / 2);\n  margin-bottom: calc(var(--vacp-spacing) / 2);\n  padding: 0;\n  border: none;\n  background: none;\n}\n.vacp-range-input:focus {\n  outline: none;\n}\n\n/* Resets one of these annoying custom focus styles in Firefox. */\n.vacp-range-input::-moz-focus-outer {\n  border: none;\n}\n.vacp-range-input--alpha {\n  background-color: #fff;\n  background-image: var(--vacp-tiled-background-image);\n  background-size: calc(var(--vacp-spacing) * 2) calc(var(--vacp-spacing) * 2);\n  background-position: 0 0, var(--vacp-spacing) var(--vacp-spacing);\n}\n\n/*\nRange input: Tracks\n*/\n.vacp-range-input::-moz-range-track {\n  display: block;\n  box-sizing: border-box;\n  height: var(--vacp-slider-track-height);\n  border: none;\n}\n.vacp-range-input::-webkit-slider-runnable-track {\n  width: var(--vacp-slider-track-width);\n  height: var(--vacp-slider-track-height);\n  border: none;\n}\n.vacp-range-input::-ms-track {\n  width: var(--vacp-slider-track-width);\n  height: var(--vacp-slider-track-height);\n  border: none;\n}\n.vacp-range-input:focus::-moz-range-track {\n  border: 1px solid var(--vacp-focus-color);\n  outline: 2px solid var(--vacp-focus-color);\n}\n.vacp-range-input:focus::-webkit-slider-runnable-track {\n  border: 1px solid var(--vacp-focus-color);\n  outline: 2px solid var(--vacp-focus-color);\n}\n.vacp-range-input:focus::-ms-track {\n  border: 1px solid var(--vacp-focus-color);\n  outline: 2px solid var(--vacp-focus-color);\n}\n.vacp-range-input--alpha::-moz-range-track {\n  background-image: linear-gradient(to right, transparent, var(--vacp-color));\n}\n.vacp-range-input--alpha::-webkit-slider-runnable-track {\n  background-image: linear-gradient(to right, transparent, var(--vacp-color));\n}\n.vacp-range-input--alpha::-ms-track {\n  background-image: linear-gradient(to right, transparent, var(--vacp-color));\n}\n.vacp-range-input--hue::-moz-range-track {\n  background-image: linear-gradient(\n    to right,\n    /*   0° */ #f00 calc(100% *   0/360),\n    /*  60° */ #ff0 calc(100% *  60/360),\n    /* 120° */ #0f0 calc(100% * 120/360),\n    /* 180° */ #0ff calc(100% * 180/360),\n    /* 240° */ #00f calc(100% * 240/360),\n    /* 300° */ #f0f calc(100% * 300/360),\n    /* 360° */ #f00 calc(100% * 360/360)\n  );\n}\n.vacp-range-input--hue::-webkit-slider-runnable-track {\n  background-image: linear-gradient(\n    to right,\n    /*   0° */ #f00 calc(100% *   0/360),\n    /*  60° */ #ff0 calc(100% *  60/360),\n    /* 120° */ #0f0 calc(100% * 120/360),\n    /* 180° */ #0ff calc(100% * 180/360),\n    /* 240° */ #00f calc(100% * 240/360),\n    /* 300° */ #f0f calc(100% * 300/360),\n    /* 360° */ #f00 calc(100% * 360/360)\n  );\n}\n.vacp-range-input--hue::-ms-track {\n  background-image: linear-gradient(\n    to right,\n    /*   0° */ #f00 calc(100% *   0/360),\n    /*  60° */ #ff0 calc(100% *  60/360),\n    /* 120° */ #0f0 calc(100% * 120/360),\n    /* 180° */ #0ff calc(100% * 180/360),\n    /* 240° */ #00f calc(100% * 240/360),\n    /* 300° */ #f0f calc(100% * 300/360),\n    /* 360° */ #f00 calc(100% * 360/360)\n  );\n}\n\n/*\nRange input: thumbs\n*/\n.vacp-range-input::-moz-range-thumb {\n  box-sizing: border-box;\n  width: var(--vacp-slider-thumb-size);\n  height: var(--vacp-slider-thumb-size);\n  border: 3px solid #fff;\n  border-radius: 50%;\n  background-color: transparent;\n  box-shadow: 0 0 0 1px #000;\n  transform: rotate(0);\n}\n.vacp-range-input::-webkit-slider-thumb {\n  width: var(--vacp-slider-thumb-size);\n  height: var(--vacp-slider-thumb-size);\n  margin-top: calc((var(--vacp-slider-track-height) - var(--vacp-slider-thumb-size)) / 2);\n  border: 3px solid #fff;\n  border-radius: 50%;\n  background-color: transparent;\n  box-shadow: 0 0 0 1px #000;\n  transform: rotate(0);\n}\n.vacp-range-input::-ms-thumb {\n  width: var(--vacp-slider-thumb-size);\n  height: var(--vacp-slider-thumb-size);\n  margin-top: 0;\n  border: 3px solid #fff;\n  border-radius: 50%;\n  background-color: transparent;\n  box-shadow: 0 0 0 1px #000;\n  transform: rotate(0);\n}\n.vacp-copy-button {\n  grid-area: copy-button;\n  justify-self: center;\n  align-self: center;\n\n  position: relative;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: calc(var(--vacp-spacing) * 6);\n  height: calc(var(--vacp-spacing) * 6);\n  border: 1px solid transparent;\n  border-radius: 50%;\n  color: #fff;\n\n  /* Tiled background */\n  background-color: #fff;\n  background-image:\n    linear-gradient(var(--vacp-color), var(--vacp-color)),\n    var(--vacp-tiled-background-image)\n  ;\n  background-size: calc(var(--vacp-spacing) * 2) calc(var(--vacp-spacing) * 2);\n  background-position: 0 0, var(--vacp-spacing) var(--vacp-spacing);\n}\n.vacp-copy-button:enabled:not(:hover) svg {\n  display: none;\n}\n\n/*\n1. Justification for removing the outline: The focus styles are maintained using a solid border style. This maintains a focus style in Windows’ high contrast mode which would be lost with a combination of `outline: none` and a box shadow because box shadows are removed in high contrast mode.\n*/\n.vacp-copy-button:enabled:focus {\n  outline: none; /* 1. */\n  box-shadow: 0 0 0 2px var(--vacp-focus-color);\n  border-color: var(--vacp-focus-color);\n}\n.vacp-copy-button:enabled:hover {\n  background-color: var(--vacp-color);\n  background-image: linear-gradient(rgb(0 0 0 / 0.25), rgb(0 0 0 / 0.25));\n}\n.vacp-color-inputs {\n  grid-area: color-inputs;\n  display: flex;\n  align-items: center;\n}\n.vacp-color-inputs > :not(:first-child) {\n  margin-left: var(--vacp-spacing);\n}\n.vacp-color-input-group {\n  flex-grow: 1;\n  display: flex;\n}\n.vacp-color-input-label {\n  flex-grow: 1;\n  text-align: center;\n}\n.vacp-color-input-label:not(:first-child) {\n  margin-left: var(--vacp-spacing);\n}\n.vacp-color-input {\n  width: 100%;\n  margin: 0;\n  margin-top: calc(var(--vacp-spacing) / 2);\n  padding: var(--vacp-spacing);\n  border: 1px solid #ccc;\n  font: inherit;\n  text-align: center;\n  color: inherit;\n  background-color: #fff;\n}\n.vacp-color-input:enabled:focus {\n  border-color: var(--vacp-focus-color);\n}\n.vacp-format-switch-button {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin: 0;\n  padding: var(--vacp-spacing);\n  border: 1px solid transparent;\n  font: inherit;\n  color: inherit;\n  background-color: #fff;\n}\n.vacp-format-switch-button:enabled:focus {\n  border-color: var(--vacp-focus-color);\n}\n.vacp-format-switch-button:enabled:hover {\n  background-color: #eee;\n}\n');const vn={install(n){n.component("ColorPicker",un)}};export{un as ColorPicker,vn as default};
