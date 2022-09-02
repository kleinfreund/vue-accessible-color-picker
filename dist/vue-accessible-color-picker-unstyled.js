import{ref as t,reactive as e,computed as n,watch as r,onMounted as o,onBeforeUnmount as a,openBlock as l,createElementBlock as s,createElementVNode as u,renderSlot as i,createCommentVNode as c,unref as h,Fragment as p,renderList as f,toDisplayString as v,createTextVNode as d}from"vue";function g(t,e,n){return Math.max(e,Math.min(t,n))}function b(t,e=2){return t.toFixed(e).replace(/\.?0+$/,"")}function m(t){if(t.endsWith("."))return NaN;return(parseFloat(t)%360+360)%360/360}function y(t){return b(360*t)}function w(t){if(!t.endsWith("%"))return NaN;const e=t.substring(0,t.length-1);if(e.endsWith("."))return NaN;const n=parseFloat(e);return Number.isNaN(n)?NaN:g(n,0,100)/100}function x(t){return b(100*t)+"%"}function $(t){if(t.endsWith("%"))return w(t);if(t.endsWith("."))return NaN;const e=parseFloat(t);return Number.isNaN(e)?NaN:g(e,0,255)/255}function k(t){return b(255*t)}function N(t){return t.endsWith("%")?w(t):g(parseFloat(t),0,1)}function A(t){return String(t)}const C={hsl:{h:{to:y,from:m},s:{to:x,from:w},l:{to:x,from:w},a:{to:A,from:N}},hwb:{h:{to:y,from:m},w:{to:x,from:w},b:{to:x,from:w},a:{to:A,from:N}},rgb:{r:{to:k,from:$},g:{to:k,from:$},b:{to:k,from:$},a:{to:A,from:N}}};function L(t){const e=t.replace(/^#/,""),n=[],r=e.length>4?2:1;for(let t=0;t<e.length;t+=r){const o=e.slice(t,t+r);n.push(o.repeat(r%2+1))}3===n.length&&n.push("ff");const o=n.map((t=>parseInt(t,16)/255));return{r:o[0],g:o[1],b:o[2],a:o[3]}}function F(t){const e=t.l<.5?t.l*(1+t.s):t.l+t.s-t.l*t.s,n=2*t.l-e;return{r:M(n,e,t.h+1/3),g:M(n,e,t.h),b:M(n,e,t.h-1/3),a:t.a}}function M(t,e,n){return n<0?n+=1:n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+(e-t)*(2/3-n)*6:t}function E(t){return{r:S(5,t),g:S(3,t),b:S(1,t),a:t.a}}function S(t,e){const n=(t+6*e.h)%6;return e.v-e.v*e.s*Math.max(0,Math.min(n,4-n,1))}function I(t){return{h:t.h,s:1===t.b?0:1-t.w/(1-t.b),v:1-t.b,a:t.a}}function P(t){const e=Math.min(t.r,t.g,t.b),n=Math.max(t.r,t.g,t.b);let r;return r=n===e?0:n===t.r?(0+(t.g-t.b)/(n-e))/6:n===t.g?(2+(t.b-t.r)/(n-e))/6:(4+(t.r-t.g)/(n-e))/6,r<0&&(r+=1),{h:r,w:e,b:1-n,a:t.a}}function O(t){const e=P(t),n=e.w,r=1-e.b,o=(r+n)/2;let a;return a=0===r||1===n?0:(r-o)/Math.min(o,1-o),{h:e.h,s:a,l:o,a:t.a}}function T(t){return"#"+Object.values(t).map((t=>{const e=255*t,n=Math.round(e).toString(16);return 1===n.length?"0"+n:n})).join("")}const j={hex:[["hsl",t=>H(t,[L,O])],["hsv",t=>H(t,[L,P,I])],["hwb",t=>H(t,[L,P])],["rgb",L]],hsl:[["hex",t=>H(t,[F,T])],["hsv",function(t){const e=t.l+t.s*Math.min(t.l,1-t.l),n=0===e?0:2-2*t.l/e;return{h:t.h,s:n,v:e,a:t.a}}],["hwb",t=>H(t,[F,P])],["rgb",F]],hsv:[["hex",t=>H(t,[E,T])],["hsl",function(t){const e=t.v-t.v*t.s/2,n=Math.min(e,1-e),r=0===n?0:(t.v-e)/n;return{h:t.h,s:r,l:e,a:t.a}}],["hwb",function(t){return{h:t.h,w:(1-t.s)*t.v,b:1-t.v,a:t.a}}],["rgb",E]],hwb:[["hex",t=>H(t,[I,E,T])],["hsl",t=>H(t,[I,E,O])],["hsv",I],["rgb",t=>H(t,[I,E])]],rgb:[["hex",T],["hsl",O],["hsv",t=>H(t,[P,I])],["hwb",P]]};function H(t,e){return e.reduce(((t,e)=>e(t)),t)}function D(t){const e={};for(const n in t)e[n]=t[n];return e}const W={hex:(t,e)=>e&&[5,9].includes(t.length)?t.substring(0,t.length-(t.length-1)/4):t,hsl:(t,e)=>`hsl(${b(360*t.h)} ${b(100*t.s)}% ${b(100*t.l)}%`+(e?")":` / ${b(t.a)})`),hwb:(t,e)=>`hwb(${b(360*t.h)} ${b(100*t.w)}% ${b(100*t.b)}%`+(e?")":` / ${b(t.a)})`),rgb:(t,e)=>`rgb(${b(255*t.r)} ${b(255*t.g)} ${b(255*t.b)}`+(e?")":` / ${b(t.a)})`)};function q(t,e,n){return W[e](t,n)}function K(t){return/^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t)}function _(t){if("string"!=typeof t){const e=function(t){return Object.prototype.hasOwnProperty.call(t,"r")?"rgb":Object.prototype.hasOwnProperty.call(t,"w")?"hwb":Object.prototype.hasOwnProperty.call(t,"v")?"hsv":"hsl"}(t);return{format:e,color:t}}if(K(t))return{format:"hex",color:t};if(!t.includes("(")){const e=document.createElement("canvas").getContext("2d");e.fillStyle=t;const n=e.fillStyle;return"#000000"===n&&"black"!==t?null:{format:"hex",color:n}}const[e,n]=t.split("("),r=e.substring(0,3),o=n.replace(/[,/)]/g," ").replace(/\s+/g," ").trim().split(" ");3===o.length&&o.push("1");const a=r.split("").concat("a"),l=Object.fromEntries(a.map(((t,e)=>[t,C[r][t].from(o[e])])));return{format:r,color:l}}const R=["hex","hsl","hwb","rgb"],U=["show","hide"],X={class:"vacp-range-input-group"},Y=["for"],z={class:"vacp-range-input-label-text vacp-range-input-label-text--hue"},B=d("Hue"),G=["id","value"],J=["for"],Q={class:"vacp-range-input-label-text vacp-range-input-label-text--alpha"},V=d("Alpha"),Z=["id","value"],tt=d(" Copy color "),et={class:"vacp-color-inputs"},nt={class:"vacp-color-input-group"},rt=["for"],ot=u("span",{class:"vacp-color-input-label-text"}," Hex ",-1),at=["id","value"],lt=["id","for","onInput"],st={class:"vacp-color-input-label-text"},ut=["id","value","onInput"],it=d(" Switch format ");var ct={__name:"ColorPicker",props:{color:{type:[String,Object],required:!1,default:"#ffffffff"},id:{type:String,required:!1,default:"color-picker"},visibleFormats:{type:Array,required:!1,default:()=>R,validator:t=>t.length>0&&t.every((t=>R.includes(t)))},defaultFormat:{type:String,required:!1,default:"hsl",validator:t=>R.includes(t)},alphaChannel:{type:String,required:!1,default:"show",validator:t=>U.includes(t)}},emits:["color-change"],setup(d,{emit:b}){const m=d,y=t(null),w=t(null),x=t(null),$=t(!1),k=t(m.defaultFormat),N=e({hex:"#ffffffff",hsl:{h:0,s:0,l:1,a:1},hsv:{h:0,s:0,v:1,a:1},hwb:{h:0,w:1,b:0,a:1},rgb:{r:1,g:1,b:1,a:1}}),A=n((function(){const t=Object.keys(N[k.value]);return"hex"!==k.value&&"hide"===m.alphaChannel?t.slice(0,3):t})),L=n((function(){return"hide"===m.alphaChannel&&[5,9].includes(N.hex.length)?N.hex.substring(0,N.hex.length-(N.hex.length-1)/4):N.hex}));function F(){const t=(m.visibleFormats.findIndex((t=>t===k.value))+1)%m.visibleFormats.length;k.value=m.visibleFormats[t]}function M(t){$.value=!0,I(t)}function E(t){$.value=!0,P(t)}function S(){$.value=!1}function I(t){1===t.buttons&&!1!==$.value&&w.value instanceof HTMLElement&&O(w.value,t.clientX,t.clientY)}function P(t){if(!1===$.value||!(w.value instanceof HTMLElement))return;t.preventDefault();const e=t.touches[0];O(w.value,e.clientX,e.clientY)}function O(t,e,n){const r=function(t,e,n){const r=t.getBoundingClientRect(),o=e-r.left,a=n-r.top;return{x:g(o/r.width,0,1),y:g(1-a/r.height,0,1)}}(t,e,n),o=D(N.hsv);o.s=r.x,o.v=r.y,ct("hsv",o)}function T(t){if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key))return;t.preventDefault();const e=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,n=["ArrowLeft","ArrowRight"].includes(t.key)?"s":"v",r=t.shiftKey?10:1,o=N.hsv[n]+e*r*.01,a=D(N.hsv);a[n]=g(o,0,1),ct("hsv",a)}function H(t){const e=_(t);null!==e&&ct(e.format,e.color)}function W(t){const e=t.currentTarget,n=D(N.hsv);n.h=parseInt(e.value)/360,ct("hsv",n)}function R(t){const e=t.currentTarget,n=D(N.hsv);n.a=parseInt(e.value)/100,ct("hsv",n)}function U(t,e){const n=t.target,r=D(N[k.value]),o=C[k.value][e].from(n.value);Number.isNaN(o)||void 0===o||(r[e]=o,ct(k.value,r))}function ct(t,e){let n=e;if("hide"===m.alphaChannel)if("string"!=typeof e)e.a=1,n=e;else if([5,9].includes(e.length)){const t=(e.length-1)/4;n=e.substring(0,e.length-t)+"f".repeat(t)}else[4,7].includes(e.length)&&(n=e+"f".repeat((e.length-1)/3));if(!function(t,e){if("string"==typeof t||"string"==typeof e)return t===e;for(const n in t)if(t[n]!==e[n])return!1;return!0}(N[t],n)){!function(t,e){N[t]=e;for(const[e,n]of j[t])N[e]=n(N[t])}(t,n);const e=function(){const t="hide"===m.alphaChannel,e=q(N[k.value],k.value,t);return{colors:N,cssColor:e}}();b("color-change",e)}!function(){if(!(y.value instanceof HTMLElement&&w.value instanceof HTMLElement&&x.value instanceof HTMLElement))return;y.value.style.setProperty("--vacp-hsl-h",String(N.hsl.h)),y.value.style.setProperty("--vacp-hsl-s",String(N.hsl.s)),y.value.style.setProperty("--vacp-hsl-l",String(N.hsl.l)),y.value.style.setProperty("--vacp-hsl-a",String(N.hsl.a)),w.value.setAttribute("style","\n    position: relative;\n    background-color: hsl(calc(var(--vacp-hsl-h) * 360) 100% 50%); /* 1. */\n    background-image:\n      linear-gradient(to top, #000, transparent),  /* 2. */\n      linear-gradient(to right, #fff, transparent) /* 2. */\n    ;\n  "),x.value.setAttribute("style",`\n    box-sizing: border-box;\n    position: absolute;\n    left: ${100*N.hsv.s}%;   /* 3. */\n    bottom: ${100*N.hsv.v}%; /* 3. */\n  `)}()}async function ht(){const t=N[k.value],e="hide"===m.alphaChannel,n=q(t,k.value,e);await window.navigator.clipboard.writeText(n)}function pt(t,e){return C[t][e].to(N[t][e])}function ft(t){if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key)||!t.shiftKey)return;const e=t.currentTarget,n=parseFloat(e.step),r=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,o=g(parseFloat(e.value)+r*n*10,parseInt(e.min),parseInt(e.max));e.value=String(o-r*n)}return r((()=>m.color),H),o((function(){document.addEventListener("mousemove",I,{passive:!1}),document.addEventListener("touchmove",P,{passive:!1}),document.addEventListener("mouseup",S),document.addEventListener("touchend",S),H(m.color)})),a((function(){document.removeEventListener("mousemove",I),document.removeEventListener("touchmove",P),document.removeEventListener("mouseup",S),document.removeEventListener("touchend",S)})),(t,e)=>(l(),s("div",{ref_key:"colorPicker",ref:y,class:"vacp-color-picker"},[u("div",{ref_key:"colorSpace",ref:w,class:"vacp-color-space",onMousedown:M,onTouchstart:E},[u("div",{ref_key:"thumb",ref:x,class:"vacp-color-space-thumb",tabindex:"0","aria-label":"Color space thumb",onKeydown:T},null,544)],544),u("div",X,[u("label",{class:"vacp-range-input-label vacp-range-input-label--hue",for:`${d.id}-hue-slider`},[u("span",z,[i(t.$slots,"hue-range-input-label",{},(()=>[B]))]),u("input",{id:`${d.id}-hue-slider`,class:"vacp-range-input vacp-range-input--hue",value:360*N.hsv.h,type:"range",min:"0",max:"360",step:"1",onKeydownPassive:ft,onInput:W},null,40,G)],8,Y),"show"===d.alphaChannel?(l(),s("label",{key:0,class:"vacp-range-input-label vacp-range-input-label--alpha",for:`${d.id}-alpha-slider`},[u("span",Q,[i(t.$slots,"alpha-range-input-label",{},(()=>[V]))]),u("input",{id:`${d.id}-alpha-slider`,class:"vacp-range-input vacp-range-input--alpha",value:100*N.hsv.a,type:"range",min:"0",max:"100",step:"1",onKeydownPassive:ft,onInput:R},null,40,Z)],8,J)):c("",!0)]),u("button",{class:"vacp-copy-button",type:"button",onClick:ht},[i(t.$slots,"copy-button",{},(()=>[tt]))]),u("div",et,[u("div",nt,["hex"===k.value?(l(),s("label",{key:0,class:"vacp-color-input-label",for:`${d.id}-color-hex`},[ot,u("input",{id:`${d.id}-color-hex`,class:"vacp-color-input",type:"text",value:h(L),onInput:e[0]||(e[0]=t=>function(t){const e=t.target;K(e.value)&&ct("hex",e.value)}(t))},null,40,at)],8,rt)):(l(!0),s(p,{key:1},f(h(A),(t=>(l(),s("label",{id:`${d.id}-color-${k.value}-${t}`,key:`${d.id}-color-${k.value}-${t}`,class:"vacp-color-input-label",for:`${d.id}-color-${k.value}`,onInput:e=>U(e,t)},[u("span",st,v(t.toUpperCase()),1),u("input",{id:`${d.id}-color-${k.value}`,class:"vacp-color-input",type:"text",value:pt(k.value,t),onInput:e=>U(e,t)},null,40,ut)],40,lt)))),128))]),d.visibleFormats.length>1?(l(),s("button",{key:0,class:"vacp-format-switch-button",type:"button",onClick:F},[i(t.$slots,"format-switch-button",{},(()=>[it]))])):c("",!0)])],512))}};const ht={install(t){t.component("ColorPicker",ct)}};export{ct as ColorPicker,ht as default};
