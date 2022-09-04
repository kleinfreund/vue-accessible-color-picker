import{ref as e,reactive as a,computed as r,watch as t,onMounted as n,onBeforeUnmount as o,openBlock as c,createElementBlock as i,createElementVNode as l,renderSlot as s,createCommentVNode as p,unref as u,Fragment as v,renderList as h,toDisplayString as d,createTextVNode as f}from"vue";function g(e,a,r){return Math.max(a,Math.min(e,r))}function b(e,a=2){return e.toFixed(a).replace(/\.?0+$/,"")}function m(e){if(e.endsWith("."))return NaN;return(parseFloat(e)%360+360)%360/360}function x(e){return b(360*e)}function k(e){if(!e.endsWith("%"))return NaN;const a=e.substring(0,e.length-1);if(a.endsWith("."))return NaN;const r=parseFloat(a);return Number.isNaN(r)?NaN:g(r,0,100)/100}function w(e){return b(100*e)+"%"}function y(e){if(e.endsWith("%"))return k(e);if(e.endsWith("."))return NaN;const a=parseFloat(e);return Number.isNaN(a)?NaN:g(a,0,255)/255}function $(e){return b(255*e)}function z(e){return e.endsWith("%")?k(e):g(parseFloat(e),0,1)}function A(e){return String(e)}const C={hsl:{h:{to:x,from:m},s:{to:w,from:k},l:{to:w,from:k},a:{to:A,from:z}},hwb:{h:{to:x,from:m},w:{to:w,from:k},b:{to:w,from:k},a:{to:A,from:z}},rgb:{r:{to:$,from:y},g:{to:$,from:y},b:{to:$,from:y},a:{to:A,from:z}}};function N(e){const a=e.replace(/^#/,""),r=[],t=a.length>4?2:1;for(let e=0;e<a.length;e+=t){const n=a.slice(e,e+t);r.push(n.repeat(t%2+1))}3===r.length&&r.push("ff");const n=r.map((e=>parseInt(e,16)/255));return{r:n[0],g:n[1],b:n[2],a:n[3]}}function S(e){const a=e.l<.5?e.l*(1+e.s):e.l+e.s-e.l*e.s,r=2*e.l-a;return{r:E(r,a,e.h+1/3),g:E(r,a,e.h),b:E(r,a,e.h-1/3),a:e.a}}function E(e,a,r){return r<0?r+=1:r>1&&(r-=1),r<1/6?e+6*(a-e)*r:r<.5?a:r<2/3?e+(a-e)*(2/3-r)*6:e}function L(e){return{r:F(5,e),g:F(3,e),b:F(1,e),a:e.a}}function F(e,a){const r=(e+6*a.h)%6;return a.v-a.v*a.s*Math.max(0,Math.min(r,4-r,1))}function M(e){return{h:e.h,s:1===e.b?0:1-e.w/(1-e.b),v:1-e.b,a:e.a}}function I(e){const a=Math.min(e.r,e.g,e.b),r=Math.max(e.r,e.g,e.b);let t;return t=r===a?0:r===e.r?(0+(e.g-e.b)/(r-a))/6:r===e.g?(2+(e.b-e.r)/(r-a))/6:(4+(e.r-e.g)/(r-a))/6,t<0&&(t+=1),{h:t,w:a,b:1-r,a:e.a}}function j(e){const a=I(e),r=a.w,t=1-a.b,n=(t+r)/2;let o;return o=0===t||1===r?0:(t-n)/Math.min(n,1-n),{h:a.h,s:o,l:n,a:e.a}}function P(e){return"#"+Object.values(e).map((e=>{const a=255*e,r=Math.round(a).toString(16);return 1===r.length?"0"+r:r})).join("")}const T={hex:[["hsl",e=>O(e,[N,j])],["hsv",e=>O(e,[N,I,M])],["hwb",e=>O(e,[N,I])],["rgb",N]],hsl:[["hex",e=>O(e,[S,P])],["hsv",function(e){const a=e.l+e.s*Math.min(e.l,1-e.l),r=0===a?0:2-2*e.l/a;return{h:e.h,s:r,v:a,a:e.a}}],["hwb",e=>O(e,[S,I])],["rgb",S]],hsv:[["hex",e=>O(e,[L,P])],["hsl",function(e){const a=e.v-e.v*e.s/2,r=Math.min(a,1-a),t=0===r?0:(e.v-a)/r;return{h:e.h,s:t,l:a,a:e.a}}],["hwb",function(e){return{h:e.h,w:(1-e.s)*e.v,b:1-e.v,a:e.a}}],["rgb",L]],hwb:[["hex",e=>O(e,[M,L,P])],["hsl",e=>O(e,[M,L,j])],["hsv",M],["rgb",e=>O(e,[M,L])]],rgb:[["hex",P],["hsl",j],["hsv",e=>O(e,[I,M])],["hwb",I]]};function O(e,a){return a.reduce(((e,a)=>a(e)),e)}function H(e){const a={};for(const r in e)a[r]=e[r];return a}const D={hex:(e,a)=>a&&[5,9].includes(e.length)?e.substring(0,e.length-(e.length-1)/4):e,hsl:(e,a)=>`hsl(${b(360*e.h)} ${b(100*e.s)}% ${b(100*e.l)}%`+(a?")":` / ${b(e.a)})`),hwb:(e,a)=>`hwb(${b(360*e.h)} ${b(100*e.w)}% ${b(100*e.b)}%`+(a?")":` / ${b(e.a)})`),rgb:(e,a)=>`rgb(${b(255*e.r)} ${b(255*e.g)} ${b(255*e.b)}`+(a?")":` / ${b(e.a)})`)};function U(e,a,r){return D[a](e,r)}function W(e){return/^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(e)}function q(e){if("string"!=typeof e){const a=function(e){return Object.prototype.hasOwnProperty.call(e,"r")?"rgb":Object.prototype.hasOwnProperty.call(e,"w")?"hwb":Object.prototype.hasOwnProperty.call(e,"v")?"hsv":"hsl"}(e);return{format:a,color:e}}if(W(e))return{format:"hex",color:e};if(!e.includes("(")){const a=document.createElement("canvas").getContext("2d");a.fillStyle=e;const r=a.fillStyle;return"#000000"===r&&"black"!==e?null:{format:"hex",color:r}}const[a,r]=e.split("("),t=a.substring(0,3),n=r.replace(/[,/)]/g," ").replace(/\s+/g," ").trim().split(" ");3===n.length&&n.push("1");const o=t.split("").concat("a"),c=Object.fromEntries(o.map(((e,a)=>[e,C[t][e].from(n[a])])));return{format:t,color:c}}const K=["hex","hsl","hwb","rgb"],_=["show","hide"],B={class:"vacp-range-input-group"},R=["for"],X={class:"vacp-range-input-label-text vacp-range-input-label-text--hue"},Y=f("Hue"),G=["id","value"],J=["for"],Q={class:"vacp-range-input-label-text vacp-range-input-label-text--alpha"},V=f("Alpha"),Z=["id","value"],ee=f(" Copy color "),ae={class:"vacp-color-inputs"},re={class:"vacp-color-input-group"},te=["for"],ne=l("span",{class:"vacp-color-input-label-text"}," Hex ",-1),oe=["id","value"],ce=["id","for","onInput"],ie={class:"vacp-color-input-label-text"},le=["id","value","onInput"],se=f(" Switch format ");var pe={__name:"ColorPicker",props:{color:{type:[String,Object],required:!1,default:"#ffffffff"},id:{type:String,required:!1,default:"color-picker"},visibleFormats:{type:Array,required:!1,default:()=>K,validator:e=>e.length>0&&e.every((e=>K.includes(e)))},defaultFormat:{type:String,required:!1,default:"hsl",validator:e=>K.includes(e)},alphaChannel:{type:String,required:!1,default:"show",validator:e=>_.includes(e)}},emits:["color-change"],setup(f,{emit:b}){const m=f,x=e(null),k=e(null),w=e(null),y=e(!1),$=e(m.defaultFormat),z=a({hex:"#ffffffff",hsl:{h:0,s:0,l:1,a:1},hsv:{h:0,s:0,v:1,a:1},hwb:{h:0,w:1,b:0,a:1},rgb:{r:1,g:1,b:1,a:1}}),A=r((function(){const e=Object.keys(z[$.value]);return"hex"!==$.value&&"hide"===m.alphaChannel?e.slice(0,3):e})),N=r((function(){return"hide"===m.alphaChannel&&[5,9].includes(z.hex.length)?z.hex.substring(0,z.hex.length-(z.hex.length-1)/4):z.hex}));function S(){const e=(m.visibleFormats.findIndex((e=>e===$.value))+1)%m.visibleFormats.length;$.value=m.visibleFormats[e]}function E(e){y.value=!0,M(e)}function L(e){y.value=!0,I(e)}function F(){y.value=!1}function M(e){1===e.buttons&&!1!==y.value&&k.value instanceof HTMLElement&&j(k.value,e.clientX,e.clientY)}function I(e){if(!1===y.value||!(k.value instanceof HTMLElement))return;e.preventDefault();const a=e.touches[0];j(k.value,a.clientX,a.clientY)}function j(e,a,r){const t=function(e,a,r){const t=e.getBoundingClientRect(),n=a-t.left,o=r-t.top;return{x:g(n/t.width,0,1),y:g(1-o/t.height,0,1)}}(e,a,r),n=H(z.hsv);n.s=t.x,n.v=t.y,_("hsv",n)}function P(e){if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(e.key))return;e.preventDefault();const a=["ArrowLeft","ArrowDown"].includes(e.key)?-1:1,r=["ArrowLeft","ArrowRight"].includes(e.key)?"s":"v",t=e.shiftKey?10:1,n=z.hsv[r]+a*t*.01,o=H(z.hsv);o[r]=g(n,0,1),_("hsv",o)}function O(e){const a=q(e);null!==a&&_(a.format,a.color)}function D(e,a){const r=e.currentTarget,t=H(z.hsv);t[a]=parseInt(r.value)/parseInt(r.max),_("hsv",t)}function K(e,a){const r=e.target,t=H(z[$.value]),n=C[$.value][a].from(r.value);Number.isNaN(n)||void 0===n||(t[a]=n,_($.value,t))}function _(e,a){let r=a;if("hide"===m.alphaChannel)if("string"!=typeof a)a.a=1,r=a;else if([5,9].includes(a.length)){const e=(a.length-1)/4;r=a.substring(0,a.length-e)+"f".repeat(e)}else[4,7].includes(a.length)&&(r=a+"f".repeat((a.length-1)/3));if(!function(e,a){if("string"==typeof e||"string"==typeof a)return e===a;for(const r in e)if(e[r]!==a[r])return!1;return!0}(z[e],r)){!function(e,a){z[e]=a;for(const[a,r]of T[e])z[a]=r(z[e])}(e,r);const a=function(){const e="hide"===m.alphaChannel,a=U(z[$.value],$.value,e);return{colors:z,cssColor:a}}();b("color-change",a)}!function(){if(!(x.value instanceof HTMLElement&&k.value instanceof HTMLElement&&w.value instanceof HTMLElement))return;x.value.style.setProperty("--vacp-hsl-h",String(z.hsl.h)),x.value.style.setProperty("--vacp-hsl-s",String(z.hsl.s)),x.value.style.setProperty("--vacp-hsl-l",String(z.hsl.l)),x.value.style.setProperty("--vacp-hsl-a",String(z.hsl.a)),k.value.setAttribute("style","\n    position: relative;\n    background-color: hsl(calc(var(--vacp-hsl-h) * 360) 100% 50%); /* 1. */\n    background-image:\n      linear-gradient(to top, #000, transparent),  /* 2. */\n      linear-gradient(to right, #fff, transparent) /* 2. */\n    ;\n  "),w.value.setAttribute("style",`\n    box-sizing: border-box;\n    position: absolute;\n    left: ${100*z.hsv.s}%;   /* 3. */\n    bottom: ${100*z.hsv.v}%; /* 3. */\n  `)}()}async function pe(){const e=z[$.value],a="hide"===m.alphaChannel,r=U(e,$.value,a);await window.navigator.clipboard.writeText(r)}function ue(e,a){return C[e][a].to(z[e][a])}function ve(e){if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(e.key)||!e.shiftKey)return;const a=e.currentTarget,r=parseFloat(a.step),t=["ArrowLeft","ArrowDown"].includes(e.key)?-1:1,n=g(parseFloat(a.value)+t*r*10,parseInt(a.min),parseInt(a.max));a.value=String(n-t*r)}return t((()=>m.color),O),n((function(){document.addEventListener("mousemove",M,{passive:!1}),document.addEventListener("touchmove",I,{passive:!1}),document.addEventListener("mouseup",F),document.addEventListener("touchend",F),O(m.color)})),o((function(){document.removeEventListener("mousemove",M),document.removeEventListener("touchmove",I),document.removeEventListener("mouseup",F),document.removeEventListener("touchend",F)})),(e,a)=>(c(),i("div",{ref_key:"colorPicker",ref:x,class:"vacp-color-picker"},[l("div",{ref_key:"colorSpace",ref:k,class:"vacp-color-space",onMousedown:E,onTouchstart:L},[l("div",{ref_key:"thumb",ref:w,class:"vacp-color-space-thumb",tabindex:"0","aria-label":"Color space thumb",onKeydown:P},null,544)],544),l("div",B,[l("label",{class:"vacp-range-input-label vacp-range-input-label--hue",for:`${f.id}-hue-slider`},[l("span",X,[s(e.$slots,"hue-range-input-label",{},(()=>[Y]))]),l("input",{id:`${f.id}-hue-slider`,class:"vacp-range-input vacp-range-input--hue",value:360*z.hsv.h,type:"range",min:"0",max:"360",step:"1",onKeydownPassive:ve,onInput:a[0]||(a[0]=e=>D(e,"h"))},null,40,G)],8,R),"show"===f.alphaChannel?(c(),i("label",{key:0,class:"vacp-range-input-label vacp-range-input-label--alpha",for:`${f.id}-alpha-slider`},[l("span",Q,[s(e.$slots,"alpha-range-input-label",{},(()=>[V]))]),l("input",{id:`${f.id}-alpha-slider`,class:"vacp-range-input vacp-range-input--alpha",value:100*z.hsv.a,type:"range",min:"0",max:"100",step:"1",onKeydownPassive:ve,onInput:a[1]||(a[1]=e=>D(e,"a"))},null,40,Z)],8,J)):p("",!0)]),l("button",{class:"vacp-copy-button",type:"button",onClick:pe},[s(e.$slots,"copy-button",{},(()=>[ee]))]),l("div",ae,[l("div",re,["hex"===$.value?(c(),i("label",{key:0,class:"vacp-color-input-label",for:`${f.id}-color-hex`},[ne,l("input",{id:`${f.id}-color-hex`,class:"vacp-color-input",type:"text",value:u(N),onInput:a[2]||(a[2]=e=>function(e){const a=e.target;W(a.value)&&_("hex",a.value)}(e))},null,40,oe)],8,te)):(c(!0),i(v,{key:1},h(u(A),(e=>(c(),i("label",{id:`${f.id}-color-${$.value}-${e}`,key:`${f.id}-color-${$.value}-${e}`,class:"vacp-color-input-label",for:`${f.id}-color-${$.value}`,onInput:a=>K(a,e)},[l("span",ie,d(e.toUpperCase()),1),l("input",{id:`${f.id}-color-${$.value}`,class:"vacp-color-input",type:"text",value:ue($.value,e),onInput:a=>K(a,e)},null,40,le)],40,ce)))),128))]),f.visibleFormats.length>1?(c(),i("button",{key:0,class:"vacp-format-switch-button",type:"button",onClick:S},[s(e.$slots,"format-switch-button",{},(()=>[se]))])):p("",!0)])],512))}};!function(e,a){void 0===a&&(a={});var r=a.insertAt;if(e&&"undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css","top"===r&&t.firstChild?t.insertBefore(n,t.firstChild):t.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}}('.vacp-color-picker{--vacp-color:hsl(calc(var(--vacp-hsl-h) * 360) calc(var(--vacp-hsl-s) * 100%) calc(var(--vacp-hsl-l) * 100%) / var(--vacp-hsl-a));--vacp-focus-color:dodgerblue;--vacp-color-space-width:300px;--vacp-spacing:6px;--vacp-tiled-background-image:linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee),linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee);max-width:var(--vacp-color-space-width);padding:var(--vacp-spacing);display:grid;grid-gap:var(--vacp-spacing);grid-template-columns:1fr min-content;grid-template-areas:"color-space color-space" "range-inputs copy-button" "color-inputs color-inputs";font-size:.8em;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;background-color:#fff}.vacp-color-picker *,.vacp-color-picker ::after,.vacp-color-picker ::before{box-sizing:border-box}.vacp-color-picker button::-moz-focus-inner{border:none;padding:0}.vacp-color-picker :focus{outline:2px solid var(--vacp-focus-color)}.vacp-color-space{grid-area:color-space;overflow:hidden;height:calc(var(--vacp-color-space-width) * .6)}.vacp-color-space-thumb{--vacp-thumb-size:calc(var(--vacp-spacing) * 4);width:var(--vacp-thumb-size);height:var(--vacp-thumb-size);margin-left:calc(-1 * var(--vacp-thumb-size)/ 2);margin-bottom:calc(-1 * var(--vacp-thumb-size)/ 2);border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 1px #000}.vacp-color-space-thumb:focus{outline-color:transparent;box-shadow:0 0 0 1px #000,0 0 0 3px var(--vacp-focus-color)}.vacp-range-input-label{--vacp-slider-track-width:100%;--vacp-slider-track-height:calc(var(--vacp-spacing) * 3);--vacp-slider-thumb-size:calc(var(--vacp-slider-track-height) + var(--vacp-spacing));display:block}.vacp-range-input-group{grid-area:range-inputs;display:flex;flex-direction:column;justify-content:center}.vacp-range-input-group>:not(:first-child){margin-top:var(--vacp-spacing)}.vacp-range-input,.vacp-range-input::-webkit-slider-thumb{-webkit-appearance:none}.vacp-range-input{display:block;width:var(--vacp-slider-track-width);height:var(--vacp-slider-track-height);margin-right:0;margin-left:0;margin-top:calc(var(--vacp-spacing)/ 2);margin-bottom:calc(var(--vacp-spacing)/ 2);padding:0;border:none;background:0 0}.vacp-range-input:focus{outline:0}.vacp-range-input::-moz-focus-outer{border:none}.vacp-range-input--alpha{background-color:#fff;background-image:var(--vacp-tiled-background-image);background-size:calc(var(--vacp-spacing) * 2) calc(var(--vacp-spacing) * 2);background-position:0 0,var(--vacp-spacing) var(--vacp-spacing)}.vacp-range-input::-moz-range-track{display:block;box-sizing:border-box;height:var(--vacp-slider-track-height);border:none}.vacp-range-input::-webkit-slider-runnable-track{width:var(--vacp-slider-track-width);height:var(--vacp-slider-track-height);border:none}.vacp-range-input::-ms-track{width:var(--vacp-slider-track-width);height:var(--vacp-slider-track-height);border:none}.vacp-range-input:focus::-moz-range-track{border:1px solid var(--vacp-focus-color);outline:2px solid var(--vacp-focus-color)}.vacp-range-input:focus::-webkit-slider-runnable-track{border:1px solid var(--vacp-focus-color);outline:2px solid var(--vacp-focus-color)}.vacp-range-input:focus::-ms-track{border:1px solid var(--vacp-focus-color);outline:2px solid var(--vacp-focus-color)}.vacp-range-input--alpha::-moz-range-track{background-image:linear-gradient(to right,transparent,var(--vacp-color))}.vacp-range-input--alpha::-webkit-slider-runnable-track{background-image:linear-gradient(to right,transparent,var(--vacp-color))}.vacp-range-input--alpha::-ms-track{background-image:linear-gradient(to right,transparent,var(--vacp-color))}.vacp-range-input--hue::-moz-range-track{background-image:linear-gradient(to right,red calc(100% * 0/360),#ff0 calc(100% * 60/360),#0f0 calc(100% * 120/360),#0ff calc(100% * 180/360),#00f calc(100% * 240/360),#f0f calc(100% * 300/360),red calc(100% * 360/360))}.vacp-range-input--hue::-webkit-slider-runnable-track{background-image:linear-gradient(to right,red calc(100% * 0/360),#ff0 calc(100% * 60/360),#0f0 calc(100% * 120/360),#0ff calc(100% * 180/360),#00f calc(100% * 240/360),#f0f calc(100% * 300/360),red calc(100% * 360/360))}.vacp-range-input--hue::-ms-track{background-image:linear-gradient(to right,red calc(100% * 0/360),#ff0 calc(100% * 60/360),#0f0 calc(100% * 120/360),#0ff calc(100% * 180/360),#00f calc(100% * 240/360),#f0f calc(100% * 300/360),red calc(100% * 360/360))}.vacp-range-input::-moz-range-thumb{box-sizing:border-box;width:var(--vacp-slider-thumb-size);height:var(--vacp-slider-thumb-size);border:3px solid #fff;border-radius:50%;background-color:transparent;box-shadow:0 0 0 1px #000;transform:rotate(0)}.vacp-range-input::-webkit-slider-thumb{width:var(--vacp-slider-thumb-size);height:var(--vacp-slider-thumb-size);margin-top:calc((var(--vacp-slider-track-height) - var(--vacp-slider-thumb-size))/ 2);border:3px solid #fff;border-radius:50%;background-color:transparent;box-shadow:0 0 0 1px #000;transform:rotate(0)}.vacp-range-input::-ms-thumb{width:var(--vacp-slider-thumb-size);height:var(--vacp-slider-thumb-size);margin-top:0;border:3px solid #fff;border-radius:50%;background-color:transparent;box-shadow:0 0 0 1px #000;transform:rotate(0)}.vacp-copy-button{grid-area:copy-button;justify-self:center;align-self:center;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;width:calc(var(--vacp-spacing) * 6);height:calc(var(--vacp-spacing) * 6);border:1px solid transparent;border-radius:50%;color:#fff;background-color:#fff;background-image:linear-gradient(var(--vacp-color),var(--vacp-color)),var(--vacp-tiled-background-image);background-size:calc(var(--vacp-spacing) * 2) calc(var(--vacp-spacing) * 2);background-position:0 0,var(--vacp-spacing) var(--vacp-spacing)}.vacp-copy-button:enabled:not(:hover) svg{display:none}.vacp-copy-button:enabled:focus{outline:0;box-shadow:0 0 0 2px var(--vacp-focus-color);border-color:var(--vacp-focus-color)}.vacp-copy-button:enabled:hover{background-color:var(--vacp-color);background-image:linear-gradient(rgb(0 0 0 / .25),rgb(0 0 0 / .25))}.vacp-color-inputs{grid-area:color-inputs;display:flex;align-items:center}.vacp-color-inputs>:not(:first-child){margin-left:var(--vacp-spacing)}.vacp-color-input-group{flex-grow:1;display:flex}.vacp-color-input-label{flex-grow:1;text-align:center}.vacp-color-input-label:not(:first-child){margin-left:var(--vacp-spacing)}.vacp-color-input{width:100%;margin:0;margin-top:calc(var(--vacp-spacing)/ 2);padding:var(--vacp-spacing);border:1px solid #ccc;font:inherit;text-align:center;color:inherit;background-color:#fff}.vacp-color-input:enabled:focus{border-color:var(--vacp-focus-color)}.vacp-format-switch-button{display:flex;justify-content:center;align-items:center;margin:0;padding:var(--vacp-spacing);border:1px solid transparent;font:inherit;color:inherit;background-color:#fff}.vacp-format-switch-button:enabled:focus{border-color:var(--vacp-focus-color)}.vacp-format-switch-button:enabled:hover{background-color:#eee}');const ue={install(e){e.component("ColorPicker",pe)}};export{pe as ColorPicker,ue as default};
