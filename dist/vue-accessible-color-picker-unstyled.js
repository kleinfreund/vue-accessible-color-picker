import{ref as t,reactive as e,computed as n,watch as r,onMounted as o,onBeforeUnmount as a,openBlock as l,createElementBlock as s,createElementVNode as u,renderSlot as i,unref as c,createCommentVNode as h,Fragment as p,renderList as f,toDisplayString as v,createTextVNode as d}from"vue";function b(t,e,n){return Math.max(e,Math.min(t,n))}function m(t,e=2){return t.toFixed(e).replace(/0+$/,"").replace(/\.$/,"")}function g(t){if(t.endsWith("."))return NaN;return(parseFloat(t)%360+360)%360/360}function y(t){return m(360*t)}function w(t){if(!t.endsWith("%"))return NaN;const e=t.substring(0,t.length-1);if(e.endsWith("."))return NaN;const n=parseFloat(e);return Number.isNaN(n)?NaN:b(n,0,100)/100}function x(t){return m(100*t)+"%"}function $(t){if(t.endsWith("%"))return w(t);if(t.endsWith("."))return NaN;const e=parseFloat(t);return Number.isNaN(e)?NaN:b(e,0,255)/255}function k(t){return m(255*t)}function C(t){return t.endsWith("%")?w(t):b(parseFloat(t),0,1)}function N(t){return String(t)}const A={hsl:{h:{to:y,from:g},s:{to:x,from:w},l:{to:x,from:w},a:{to:N,from:C}},hwb:{h:{to:y,from:g},w:{to:x,from:w},b:{to:x,from:w},a:{to:N,from:C}},rgb:{r:{to:k,from:$},g:{to:k,from:$},b:{to:k,from:$},a:{to:N,from:C}}};function L(t){const e=t.replace(/^#/,""),n=[],r=e.length>4?2:1;for(let t=0;t<e.length;t+=r){const o=e.slice(t,t+r);n.push(o.repeat(r%2+1))}3===n.length&&n.push("ff");const o=n.map((t=>parseInt(t,16)/255));return{r:o[0],g:o[1],b:o[2],a:o[3]}}function S(t){const e=t.l<.5?t.l*(1+t.s):t.l+t.s-t.l*t.s,n=2*t.l-e;return{r:E(n,e,t.h+1/3),g:E(n,e,t.h),b:E(n,e,t.h-1/3),a:t.a}}function E(t,e,n){return n<0?n+=1:n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+(e-t)*(2/3-n)*6:t}function M(t){return{r:F(5,t),g:F(3,t),b:F(1,t),a:t.a}}function F(t,e){const n=(t+6*e.h)%6;return e.v-e.v*e.s*Math.max(0,Math.min(n,4-n,1))}function I(t){return{h:t.h,s:1===t.b?0:1-t.w/(1-t.b),v:1-t.b,a:t.a}}function P(t){const e=Math.min(t.r,t.g,t.b),n=Math.max(t.r,t.g,t.b);let r;return r=n===e?0:n===t.r?(0+(t.g-t.b)/(n-e))/6:n===t.g?(2+(t.b-t.r)/(n-e))/6:(4+(t.r-t.g)/(n-e))/6,r<0&&(r+=1),{h:r,w:e,b:1-n,a:t.a}}function O(t){const e=P(t),n=e.w,r=1-e.b,o=(r+n)/2;let a;return a=0===r||1===n?0:(r-o)/Math.min(o,1-o),{h:e.h,s:a,l:o,a:t.a}}function T(t){return"#"+Object.values(t).map((t=>{const e=255*t,n=Math.round(e).toString(16);return 1===n.length?"0"+n:n})).join("")}const j={hex:[["hsl",t=>q(t,[L,O])],["hsv",t=>q(t,[L,P,I])],["hwb",t=>q(t,[L,P])],["rgb",L]],hsl:[["hex",t=>q(t,[S,T])],["hsv",function(t){const e=t.l+t.s*Math.min(t.l,1-t.l),n=0===e?0:2-2*t.l/e;return{h:t.h,s:n,v:e,a:t.a}}],["hwb",t=>q(t,[S,P])],["rgb",S]],hsv:[["hex",t=>q(t,[M,T])],["hsl",function(t){const e=t.v-t.v*t.s/2,n=Math.min(e,1-e),r=0===n?0:(t.v-e)/n;return{h:t.h,s:r,l:e,a:t.a}}],["hwb",function(t){return{h:t.h,w:(1-t.s)*t.v,b:1-t.v,a:t.a}}],["rgb",M]],hwb:[["hex",t=>q(t,[I,M,T])],["hsl",t=>q(t,[I,M,O])],["hsv",I],["rgb",t=>q(t,[I,M])]],rgb:[["hex",T],["hsl",O],["hsv",t=>q(t,[P,I])],["hwb",P]]};function q(t,e){return e.reduce(((t,e)=>e(t)),t)}function H(t){const e={};for(const n in t)e[n]=t[n];return e}const W={hex:(t,e)=>e?t.substring(0,t.length-(t.length-1)/4):t,hsl:(t,e)=>`hsl(${m(360*t.h)} ${m(100*t.s)}% ${m(100*t.l)}%`+(e?")":` / ${m(t.a)})`),hwb:(t,e)=>`hwb(${m(360*t.h)} ${m(100*t.w)}% ${m(100*t.b)}%`+(e?")":` / ${m(t.a)})`),rgb:(t,e)=>`rgb(${m(255*t.r)} ${m(255*t.g)} ${m(255*t.b)}`+(e?")":` / ${m(t.a)})`)};function D(t,e,n){return W[e](t,n)}function K(t){return!!t.startsWith("#")&&(!![3,4,6,8].includes(t.length-1)&&/^#[0-9A-Fa-f]+$/.test(t))}function R(t){if("string"!=typeof t){const e=function(t){return Object.prototype.hasOwnProperty.call(t,"r")?"rgb":Object.prototype.hasOwnProperty.call(t,"w")?"hwb":Object.prototype.hasOwnProperty.call(t,"v")?"hsv":"hsl"}(t);return{format:e,color:t}}if(K(t))return{format:"hex",color:t};if(!t.includes("(")){const e=document.createElement("canvas").getContext("2d");e.fillStyle=t;const n=e.fillStyle;return"#000000"===n&&"black"!==t?null:{format:"hex",color:n}}const[e,n]=t.split("("),r=e.substring(0,3),o=n.replace(/[,/)]/g," ").replace(/\s+/g," ").trim().split(" ");3===o.length&&o.push("1");const a=r.split("").concat("a"),l=Object.fromEntries(a.map(((t,e)=>[t,A[r][t].from(o[e])])));return{format:r,color:l}}const U=["hex","hsl","hwb","rgb"],_=["show","hide"],X={class:"vacp-range-input-group"},Y=["for"],z={class:"vacp-range-input-label-text vacp-range-input-label-text--hue"},B=d("Hue"),G=["id","value"],J=["for"],Q={class:"vacp-range-input-label-text vacp-range-input-label-text--alpha"},V=d("Alpha"),Z=["id","value"],tt=d(" Copy color "),et={class:"vacp-color-inputs"},nt={class:"vacp-color-input-group"},rt=["for"],ot=u("span",{class:"vacp-color-input-label-text"}," Hex ",-1),at=["id","value"],lt=["id","for","onInput"],st={class:"vacp-color-input-label-text"},ut=["id","value","onInput"],it=d(" Switch format ");var ct={props:{color:{type:[String,Object],required:!1,default:null},id:{type:String,required:!1,default:"color-picker"},visibleFormats:{type:Array,required:!1,default:()=>U,validator:t=>t.length>0&&t.every((t=>U.includes(t)))},defaultFormat:{type:String,required:!1,default:"hsl",validator:t=>U.includes(t)},alphaChannel:{type:String,required:!1,default:"show",validator:t=>_.includes(t)}},emits:["color-change"],setup(d,{emit:m}){const g=d,y=t(null),w=t(null),x=t(null),$=t(!1),k=t(g.defaultFormat),C=e({hex:"#ffffffff",hsl:{h:0,s:0,l:1,a:1},hsv:{h:0,s:0,v:1,a:1},hwb:{h:0,w:1,b:0,a:1},rgb:{r:1,g:1,b:1,a:1}}),N=n((()=>{const t=Object.keys(C[k.value]);return"hex"!==k.value&&"hide"===g.alphaChannel?t.slice(0,3):t})),L=n((()=>"hide"===g.alphaChannel&&[5,7].includes(C.hex.length)?C.hex.substring(0,C.hex.length-(C.hex.length-1)/4):C.hex));function S(){const t=g.visibleFormats.findIndex((t=>t===k.value)),e=t===g.visibleFormats.length-1?0:t+1;k.value=g.visibleFormats[e]}function E(t){$.value=!0,I(t)}function M(t){$.value=!0,P(t)}function F(){$.value=!1}function I(t){1===t.buttons&&!1!==$.value&&w.value instanceof HTMLElement&&O(w.value,t.clientX,t.clientY)}function P(t){if(!1===$.value||!(w.value instanceof HTMLElement))return;t.preventDefault();const e=t.touches[0];O(w.value,e.clientX,e.clientY)}function O(t,e,n){const r=function(t,e,n){const r=t.getBoundingClientRect(),o=e-r.left,a=n-r.top;return{x:b(o/r.width,0,1),y:b(1-a/r.height,0,1)}}(t,e,n),o=H(C.hsv);o.s=r.x,o.v=r.y,ct("hsv",o)}function T(t){if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key))return;t.preventDefault();const e=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,n=["ArrowLeft","ArrowRight"].includes(t.key)?"s":"v",r=t.shiftKey?10:1,o=C.hsv[n]+e*r*.01,a=H(C.hsv);a[n]=b(o,0,1),ct("hsv",a)}function q(t){if(null===t)return;const e=R(t);null!==e&&ct(e.format,e.color)}function W(t){const e=t.currentTarget,n=H(C.hsv);n.h=parseInt(e.value)/360,ct("hsv",n)}function U(t){const e=t.currentTarget,n=H(C.hsv);n.a=parseInt(e.value)/100,ct("hsv",n)}function _(t,e,n){const r=t.target,o=H(C[e]),a=A[e][n].from(r.value);Number.isNaN(a)||void 0===a||(o[n]=a,ct(e,o))}function ct(t,e){let n=e;if("hide"===g.alphaChannel)if("string"!=typeof e)e.a=1,n=e;else if([5,9].includes(e.length)){const t=(e.length-1)/4;n=e.substring(0,e.length-t)+"f".repeat(t)}if(!function(t,e){if("string"==typeof t||"string"==typeof e)return t===e;for(const n in t)if(t[n]!==e[n])return!1;return!0}(C[t],n)){C[t]=n;const e=function(t){for(const[e,n]of j[t])C[e]=n(C[t]);y.value instanceof HTMLElement&&w.value instanceof HTMLElement&&x.value instanceof HTMLElement&&function(t,e,n,r){t.style.setProperty("--vacp-hsl-h",String(r.hsl.h)),t.style.setProperty("--vacp-hsl-s",String(r.hsl.s)),t.style.setProperty("--vacp-hsl-l",String(r.hsl.l)),t.style.setProperty("--vacp-hsl-a",String(r.hsl.a)),e.setAttribute("style","\n    position: relative;\n    background-color: hsl(calc(var(--vacp-hsl-h) * 360) 100% 50%); /* 1. */\n    background-image:\n      linear-gradient(to top, #000, transparent),  /* 2. */\n      linear-gradient(to right, #fff, transparent) /* 2. */\n    ;\n  "),n.setAttribute("style",`\n    box-sizing: border-box;\n    position: absolute;\n    left: ${100*r.hsv.s}%;   /* 3. */\n    bottom: ${100*r.hsv.v}%; /* 3. */\n  `)}(y.value,w.value,x.value,C);return function(t,e){const n="hide"===g.alphaChannel;return{colors:t,cssColor:D(t[e],e,n)}}(C,k.value)}(t);m("color-change",e)}}function ht(){const t=C[k.value],e="hide"===g.alphaChannel;!function(t){if("function"!=typeof document.queryCommandSupported||!document.queryCommandSupported("copy"))return!1;const e=document.createElement("textarea");let n;e.textContent=t,e.style.position="fixed",document.body.appendChild(e),e.select();try{n=document.execCommand("copy")}catch{n=!1}finally{document.body.removeChild(e)}}(D(t,k.value,e))}function pt(t,e){return A[t][e].to(C[t][e])}function ft(t){if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key)||!t.shiftKey)return;const e=t.currentTarget,n=parseFloat(e.step),r=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,o=b(parseFloat(e.value)+r*n*10,parseInt(e.min),parseInt(e.max));e.value=String(o-r*n)}return r((()=>g.color),(t=>{q(t)})),o((()=>{document.addEventListener("mousemove",I,{passive:!1}),document.addEventListener("touchmove",P,{passive:!1}),document.addEventListener("mouseup",F),document.addEventListener("touchend",F),q(g.color)})),a((()=>{document.removeEventListener("mousemove",I),document.removeEventListener("touchmove",P),document.removeEventListener("mouseup",F),document.removeEventListener("touchend",F)})),(t,e)=>(l(),s("div",{ref_key:"colorPicker",ref:y,class:"vacp-color-picker"},[u("div",{ref_key:"colorSpace",ref:w,class:"vacp-color-space",onMousedown:E,onTouchstart:M},[u("div",{ref_key:"thumb",ref:x,class:"vacp-color-space-thumb",tabindex:"0","aria-label":"Color space thumb",onKeydown:T},null,544)],544),u("div",X,[u("label",{class:"vacp-range-input-label vacp-range-input-label--hue",for:`${d.id}-hue-slider`},[u("span",z,[i(t.$slots,"hue-range-input-label",{},(()=>[B]))]),u("input",{id:`${d.id}-hue-slider`,class:"vacp-range-input vacp-range-input--hue",value:360*c(C).hsv.h,type:"range",min:"0",max:"360",step:"1",onKeydownPassive:ft,onInput:W},null,40,G)],8,Y),"show"===d.alphaChannel?(l(),s("label",{key:0,class:"vacp-range-input-label vacp-range-input-label--alpha",for:`${d.id}-alpha-slider`},[u("span",Q,[i(t.$slots,"alpha-range-input-label",{},(()=>[V]))]),u("input",{id:`${d.id}-alpha-slider`,class:"vacp-range-input vacp-range-input--alpha",value:100*c(C).hsv.a,type:"range",min:"0",max:"100",step:"1",onKeydownPassive:ft,onInput:U},null,40,Z)],8,J)):h("",!0)]),u("button",{class:"vacp-copy-button",type:"button",onClick:ht},[i(t.$slots,"copy-button",{},(()=>[tt]))]),u("div",et,[u("div",nt,["hex"===k.value?(l(),s("label",{key:0,class:"vacp-color-input-label",for:`${d.id}-color-hex`},[ot,u("input",{id:`${d.id}-color-hex`,class:"vacp-color-input",type:"text",value:c(L),onInput:e[0]||(e[0]=t=>function(t){const e=t.target;K(e.value)&&ct("hex",e.value)}(t))},null,40,at)],8,rt)):(l(!0),s(p,{key:1},f(c(N),(t=>(l(),s("label",{id:`${d.id}-color-${k.value}-${t}`,key:`${d.id}-color-${k.value}-${t}`,class:"vacp-color-input-label",for:`${d.id}-color-${k.value}`,onInput:e=>_(e,k.value,t)},[u("span",st,v(t.toUpperCase()),1),u("input",{id:`${d.id}-color-${k.value}`,class:"vacp-color-input",type:"text",value:pt(k.value,t),onInput:e=>_(e,k.value,t)},null,40,ut)],40,lt)))),128))]),d.visibleFormats.length>1?(l(),s("button",{key:0,class:"vacp-format-switch-button",type:"button",onClick:S},[i(t.$slots,"format-switch-button",{},(()=>[it]))])):h("",!0)])],512))}};const ht={install(t){t.component("ColorPicker",ct)}};export{ct as ColorPicker,ht as default};
