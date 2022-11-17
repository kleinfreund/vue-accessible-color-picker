import{ref as e,reactive as a,computed as r,watch as t,onMounted as n,onBeforeUnmount as o,openBlock as c,createElementBlock as i,createElementVNode as l,renderSlot as s,createTextVNode as p,createCommentVNode as u,unref as v,Fragment as h,renderList as d,toDisplayString as f}from"vue";function g(e,a,r){return Math.max(a,Math.min(e,r))}function b(e,a=2){return e.toFixed(a).replace(/\.?0+$/,"")}function m(e){if(e.endsWith("."))return NaN;return(parseFloat(e)%360+360)%360/360}function w(e){return b(360*e)}function x(e){if(!e.endsWith("%"))return NaN;const a=e.substring(0,e.length-1);if(a.endsWith("."))return NaN;const r=parseFloat(a);return Number.isNaN(r)?NaN:g(r,0,100)/100}function y(e){return b(100*e)+"%"}function k(e){if(e.endsWith("%"))return x(e);if(e.endsWith("."))return NaN;const a=parseFloat(e);return Number.isNaN(a)?NaN:g(a,0,255)/255}function $(e){return b(255*e)}function z(e){return e.endsWith("%")?x(e):g(parseFloat(e),0,1)}function C(e){return String(e)}const N={hsl:{h:{to:w,from:m},s:{to:y,from:x},l:{to:y,from:x},a:{to:C,from:z}},hwb:{h:{to:w,from:m},w:{to:y,from:x},b:{to:y,from:x},a:{to:C,from:z}},rgb:{r:{to:$,from:k},g:{to:$,from:k},b:{to:$,from:k},a:{to:C,from:z}}};function S(e){const a=e.replace(/^#/,""),r=[],t=a.length>4?2:1;for(let e=0;e<a.length;e+=t){const n=a.slice(e,e+t);r.push(n.repeat(t%2+1))}3===r.length&&r.push("ff");const n=r.map((e=>parseInt(e,16)/255));return{r:n[0],g:n[1],b:n[2],a:n[3]}}function A(e){const a=e.l<.5?e.l*(1+e.s):e.l+e.s-e.l*e.s,r=2*e.l-a;return{r:M(r,a,e.h+1/3),g:M(r,a,e.h),b:M(r,a,e.h-1/3),a:e.a}}function M(e,a,r){return r<0?r+=1:r>1&&(r-=1),r<1/6?e+6*(a-e)*r:r<.5?a:r<2/3?e+(a-e)*(2/3-r)*6:e}function F(e){return{r:E(5,e),g:E(3,e),b:E(1,e),a:e.a}}function E(e,a){const r=(e+6*a.h)%6;return a.v-a.v*a.s*Math.max(0,Math.min(r,4-r,1))}function L(e){return{h:e.h,s:1===e.b?0:1-e.w/(1-e.b),v:1-e.b,a:e.a}}function I(e){const a=Math.min(e.r,e.g,e.b),r=Math.max(e.r,e.g,e.b);let t;return t=r===a?0:r===e.r?(0+(e.g-e.b)/(r-a))/6:r===e.g?(2+(e.b-e.r)/(r-a))/6:(4+(e.r-e.g)/(r-a))/6,t<0&&(t+=1),{h:t,w:a,b:1-r,a:e.a}}function j(e){const a=I(e),r=a.w,t=1-a.b,n=(t+r)/2;let o;return o=0===t||1===r?0:(t-n)/Math.min(n,1-n),{h:a.h,s:o,l:n,a:e.a}}function P(e){return"#"+Object.values(e).map((e=>{const a=255*e,r=Math.round(a).toString(16);return 1===r.length?"0"+r:r})).join("")}const T={hex:[["hsl",e=>O(e,[S,j])],["hsv",e=>O(e,[S,I,L])],["hwb",e=>O(e,[S,I])],["rgb",S]],hsl:[["hex",e=>O(e,[A,P])],["hsv",function(e){const a=e.l+e.s*Math.min(e.l,1-e.l),r=0===a?0:2-2*e.l/a;return{h:e.h,s:r,v:a,a:e.a}}],["hwb",e=>O(e,[A,I])],["rgb",A]],hsv:[["hex",e=>O(e,[F,P])],["hsl",function(e){const a=e.v-e.v*e.s/2,r=Math.min(a,1-a),t=0===r?0:(e.v-a)/r;return{h:e.h,s:t,l:a,a:e.a}}],["hwb",function(e){return{h:e.h,w:(1-e.s)*e.v,b:1-e.v,a:e.a}}],["rgb",F]],hwb:[["hex",e=>O(e,[L,F,P])],["hsl",e=>O(e,[L,F,j])],["hsv",L],["rgb",e=>O(e,[L,F])]],rgb:[["hex",P],["hsl",j],["hsv",e=>O(e,[I,L])],["hwb",I]]};function O(e,a){return a.reduce(((e,a)=>a(e)),e)}function H(e){const a={};for(const r in e)a[r]=e[r];return a}const _={hex:(e,a)=>a&&[5,9].includes(e.length)?e.substring(0,e.length-(e.length-1)/4):e,hsl:(e,a)=>`hsl(${b(360*e.h)} ${b(100*e.s)}% ${b(100*e.l)}%`+(a?")":` / ${b(e.a)})`),hwb:(e,a)=>`hwb(${b(360*e.h)} ${b(100*e.w)}% ${b(100*e.b)}%`+(a?")":` / ${b(e.a)})`),rgb:(e,a)=>`rgb(${b(255*e.r)} ${b(255*e.g)} ${b(255*e.b)}`+(a?")":` / ${b(e.a)})`)};function D(e,a,r){return _[a](e,r)}function U(e){return/^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(e)}function W(e){if("string"!=typeof e){const a=function(e){return Object.prototype.hasOwnProperty.call(e,"r")?"rgb":Object.prototype.hasOwnProperty.call(e,"w")?"hwb":Object.prototype.hasOwnProperty.call(e,"v")?"hsv":"hsl"}(e);return{format:a,color:e}}if(U(e))return{format:"hex",color:e};if(!e.includes("(")){const a=document.createElement("canvas").getContext("2d");a.fillStyle=e;const r=a.fillStyle;return"#000000"===r&&"black"!==e?null:{format:"hex",color:r}}const[a,r]=e.split("("),t=a.substring(0,3),n=r.replace(/[,/)]/g," ").replace(/\s+/g," ").trim().split(" ");3===n.length&&n.push("1");const o=t.split("").concat("a"),c=Object.fromEntries(o.map(((e,a)=>[e,N[t][e].from(n[a])])));return{format:t,color:c}}const q=["hex","hsl","hwb","rgb"],B=["show","hide"],K={class:"vacp-range-input-group"},R=["for"],X={class:"vacp-range-input-label-text vacp-range-input-label-text--hue"},Y=["id","value"],G=["for"],J={class:"vacp-range-input-label-text vacp-range-input-label-text--alpha"},Q=["id","value"],V=l("span",{class:"vacp-visually-hidden"},"Copy color",-1),Z=l("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",width:"24",height:"24",viewBox:"0 0 32 32"},[l("path",{d:"M25.313 28v-18.688h-14.625v18.688h14.625zM25.313 6.688c1.438 0 2.688 1.188 2.688 2.625v18.688c0 1.438-1.25 2.688-2.688 2.688h-14.625c-1.438 0-2.688-1.25-2.688-2.688v-18.688c0-1.438 1.25-2.625 2.688-2.625h14.625zM21.313 1.313v2.688h-16v18.688h-2.625v-18.688c0-1.438 1.188-2.688 2.625-2.688h16z",fill:"currentColor"})],-1),ee={class:"vacp-color-inputs"},ae={class:"vacp-color-input-group"},re=["for"],te=l("span",{class:"vacp-color-input-label-text"}," Hex ",-1),ne=["id","value"],oe=["id","for","onInput"],ce={class:"vacp-color-input-label-text"},ie=["id","value","onInput"],le=l("span",{class:"vacp-visually-hidden"},"Switch format",-1),se=l("svg",{class:"vacp-icon","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"15"},[l("path",{d:"M8 15l5-5-1-1-4 2-4-2-1 1zm4-9l1-1-5-5-5 5 1 1 4-2z",fill:"currentColor"})],-1);var pe={__name:"ColorPicker",props:{color:{type:[String,Object],required:!1,default:"#ffffffff"},id:{type:String,required:!1,default:"color-picker"},visibleFormats:{type:Array,required:!1,default:()=>q,validator:e=>e.length>0&&e.every((e=>q.includes(e)))},defaultFormat:{type:String,required:!1,default:"hsl",validator:e=>q.includes(e)},alphaChannel:{type:String,required:!1,default:"show",validator:e=>B.includes(e)}},emits:["color-change"],setup(b,{emit:m}){const w=b,x=e(null),y=e(null),k=e(null),$=e(!1),z=e(w.visibleFormats.includes(w.defaultFormat)?w.defaultFormat:w.visibleFormats[0]),C=a({hex:"#ffffffff",hsl:{h:0,s:0,l:1,a:1},hsv:{h:0,s:0,v:1,a:1},hwb:{h:0,w:1,b:0,a:1},rgb:{r:1,g:1,b:1,a:1}}),S=r((function(){const e=Object.keys(C[z.value]);return"hex"!==z.value&&"hide"===w.alphaChannel?e.slice(0,3):e})),A=r((function(){return"hide"===w.alphaChannel&&[5,9].includes(C.hex.length)?C.hex.substring(0,C.hex.length-(C.hex.length-1)/4):C.hex}));function M(){const e=(w.visibleFormats.findIndex((e=>e===z.value))+1)%w.visibleFormats.length;z.value=w.visibleFormats[e]}function F(e){$.value=!0,I(e)}function E(e){$.value=!0,j(e)}function L(){$.value=!1}function I(e){1===e.buttons&&!1!==$.value&&y.value instanceof HTMLElement&&P(y.value,e.clientX,e.clientY)}function j(e){if(!1===$.value||!(y.value instanceof HTMLElement))return;e.preventDefault();const a=e.touches[0];P(y.value,a.clientX,a.clientY)}function P(e,a,r){const t=function(e,a,r){const t=e.getBoundingClientRect(),n=a-t.left,o=r-t.top;return{x:g(n/t.width,0,1),y:g(1-o/t.height,0,1)}}(e,a,r),n=H(C.hsv);n.s=t.x,n.v=t.y,ue("hsv",n)}function O(e){if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(e.key))return;e.preventDefault();const a=["ArrowLeft","ArrowDown"].includes(e.key)?-1:1,r=["ArrowLeft","ArrowRight"].includes(e.key)?"s":"v",t=e.shiftKey?10:1,n=C.hsv[r]+a*t*.01,o=H(C.hsv);o[r]=g(n,0,1),ue("hsv",o)}function _(e){const a=W(e);null!==a&&ue(a.format,a.color)}function q(e,a){const r=e.currentTarget,t=H(C.hsv);t[a]=parseInt(r.value)/parseInt(r.max),ue("hsv",t)}function B(e){const a=e.target;U(a.value)&&ue("hex",a.value)}function pe(e,a){const r=e.target,t=H(C[z.value]),n=N[z.value][a].from(r.value);Number.isNaN(n)||void 0===n||(t[a]=n,ue(z.value,t))}function ue(e,a){let r=a;if("hide"===w.alphaChannel)if("string"!=typeof a)a.a=1,r=a;else if([5,9].includes(a.length)){const e=(a.length-1)/4;r=a.substring(0,a.length-e)+"f".repeat(e)}else[4,7].includes(a.length)&&(r=a+"f".repeat((a.length-1)/3));if(!function(e,a){if("string"==typeof e||"string"==typeof a)return e===a;for(const r in e)if(e[r]!==a[r])return!1;return!0}(C[e],r)){!function(e,a){C[e]=a;for(const[a,r]of T[e])C[a]=r(C[e])}(e,r);const a=function(){const e="hide"===w.alphaChannel,a=D(C[z.value],z.value,e);return{colors:C,cssColor:a}}();m("color-change",a)}!function(){if(!(x.value instanceof HTMLElement&&y.value instanceof HTMLElement&&k.value instanceof HTMLElement))return;x.value.style.setProperty("--vacp-hsl-h",String(C.hsl.h)),x.value.style.setProperty("--vacp-hsl-s",String(C.hsl.s)),x.value.style.setProperty("--vacp-hsl-l",String(C.hsl.l)),x.value.style.setProperty("--vacp-hsl-a",String(C.hsl.a)),y.value.style.position="relative",y.value.style.backgroundColor="hsl(calc(var(--vacp-hsl-h) * 360) 100% 50%)",y.value.style.backgroundImage="linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",k.value.style.boxSizing="border-box",k.value.style.position="absolute",k.value.style.left=100*C.hsv.s+"%",k.value.style.bottom=100*C.hsv.v+"%"}()}async function ve(){const e=C[z.value],a="hide"===w.alphaChannel,r=D(e,z.value,a);await window.navigator.clipboard.writeText(r)}function he(e,a){return N[e][a].to(C[e][a])}function de(e){if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(e.key)||!e.shiftKey)return;const a=e.currentTarget,r=parseFloat(a.step),t=["ArrowLeft","ArrowDown"].includes(e.key)?-1:1,n=g(parseFloat(a.value)+t*r*10,parseInt(a.min),parseInt(a.max));a.value=String(n-t*r)}return t((()=>w.color),_),n((function(){document.addEventListener("mousemove",I,{passive:!1}),document.addEventListener("touchmove",j,{passive:!1}),document.addEventListener("mouseup",L),document.addEventListener("touchend",L),_(w.color)})),o((function(){document.removeEventListener("mousemove",I),document.removeEventListener("touchmove",j),document.removeEventListener("mouseup",L),document.removeEventListener("touchend",L)})),(e,a)=>(c(),i("div",{ref_key:"colorPicker",ref:x,class:"vacp-color-picker"},[l("div",{ref_key:"colorSpace",ref:y,class:"vacp-color-space",onMousedown:F,onTouchstart:E},[l("div",{ref_key:"thumb",ref:k,class:"vacp-color-space-thumb",tabindex:"0","aria-label":"Color space thumb",onKeydown:O},null,544)],544),l("div",K,[l("label",{class:"vacp-range-input-label vacp-range-input-label--hue",for:`${b.id}-hue-slider`},[l("span",X,[s(e.$slots,"hue-range-input-label",{},(()=>[p("Hue")]))]),l("input",{id:`${b.id}-hue-slider`,class:"vacp-range-input vacp-range-input--hue",value:360*C.hsv.h,type:"range",min:"0",max:"360",step:"1",onKeydownPassive:de,onInput:a[0]||(a[0]=e=>q(e,"h"))},null,40,Y)],8,R),"show"===b.alphaChannel?(c(),i("label",{key:0,class:"vacp-range-input-label vacp-range-input-label--alpha",for:`${b.id}-alpha-slider`},[l("span",J,[s(e.$slots,"alpha-range-input-label",{},(()=>[p("Alpha")]))]),l("input",{id:`${b.id}-alpha-slider`,class:"vacp-range-input vacp-range-input--alpha",value:100*C.hsv.a,type:"range",min:"0",max:"100",step:"1",onKeydownPassive:de,onInput:a[1]||(a[1]=e=>q(e,"a"))},null,40,Q)],8,G)):u("v-if",!0)]),l("button",{class:"vacp-copy-button",type:"button",onClick:ve},[s(e.$slots,"copy-button",{},(()=>[V,Z]))]),l("div",ee,[l("div",ae,["hex"===z.value?(c(),i("label",{key:0,class:"vacp-color-input-label",for:`${b.id}-color-hex`},[te,l("input",{id:`${b.id}-color-hex`,class:"vacp-color-input",type:"text",value:v(A),onInput:B},null,40,ne)],8,re)):(c(!0),i(h,{key:1},d(v(S),(e=>(c(),i("label",{id:`${b.id}-color-${z.value}-${e}`,key:`${b.id}-color-${z.value}-${e}`,class:"vacp-color-input-label",for:`${b.id}-color-value-${z.value}-${e}`,onInput:a=>pe(a,e)},[l("span",ce,f(e.toUpperCase()),1),l("input",{id:`${b.id}-color-value-${z.value}-${e}`,class:"vacp-color-input",type:"text",value:he(z.value,e),onInput:a=>pe(a,e)},null,40,ie)],40,oe)))),128))]),b.visibleFormats.length>1?(c(),i("button",{key:0,class:"vacp-format-switch-button",type:"button",onClick:M},[s(e.$slots,"format-switch-button",{},(()=>[le,se]))])):u("v-if",!0)])],512))}};!function(e,a){void 0===a&&(a={});var r=a.insertAt;if(e&&"undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css","top"===r&&t.firstChild?t.insertBefore(n,t.firstChild):t.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}}(".vacp-color-picker{--vacp-color:hsl(calc(var(--vacp-hsl-h)*360) calc(var(--vacp-hsl-s)*100%) calc(var(--vacp-hsl-l)*100%)/var(--vacp-hsl-a));--vacp-focus-color:#19f;--vacp-focus-outline:2px solid var(--vacp-focus-color);--vacp-border-width:1px;--vacp-border-color:#000;--vacp-border:var(--vacp-border-width) solid var(--vacp-border-color);--vacp-color-space-width:300px;--vacp-spacing:6px;grid-gap:var(--vacp-spacing);background-color:#fff;display:grid;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;font-size:.8em;grid-template-columns:1fr min-content;max-width:var(--vacp-color-space-width);padding:var(--vacp-spacing)}.vacp-color-picker *,.vacp-color-picker :after,.vacp-color-picker :before{box-sizing:border-box}.vacp-color-picker button::-moz-focus-inner{border:none;padding:0}.vacp-color-picker :focus{outline:var(--vacp-focus-outline)}.vacp-color-space{grid-column:1/-1;height:calc(var(--vacp-color-space-width)*.6);overflow:hidden}.vacp-color-space-thumb{--vacp-thumb-size:calc(var(--vacp-spacing)*4);border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 var(--vacp-border-width) var(--vacp-border-color);height:var(--vacp-thumb-size);margin-bottom:calc(var(--vacp-thumb-size)*-1/2);margin-left:calc(var(--vacp-thumb-size)*-1/2);width:var(--vacp-thumb-size)}.vacp-color-space-thumb:focus{box-shadow:0 0 0 var(--vacp-border-width) var(--vacp-border-color),0 0 0 3px var(--vacp-focus-color);outline-color:transparent}.vacp-range-input-label{--vacp-slider-track-width:100%;--vacp-slider-track-height:calc(var(--vacp-spacing)*3);display:block}.vacp-range-input-group{display:flex;flex-direction:column;justify-content:center}.vacp-range-input-group>:not(:first-child){margin-top:var(--vacp-spacing)}.vacp-range-input,.vacp-range-input::-webkit-slider-thumb{-webkit-appearance:none}.vacp-range-input{background:none;border:none;display:block;height:var(--vacp-slider-track-height);margin-bottom:calc(var(--vacp-spacing)/2 + 1px);margin-left:0;margin-right:0;margin-top:calc(var(--vacp-spacing)/2 + 1px);padding:0;width:var(--vacp-slider-track-width)}.vacp-range-input:focus{outline:none}.vacp-range-input::-moz-focus-outer{border:none}.vacp-range-input--alpha{background-color:#fff;background-image:linear-gradient(45deg,#eee 25%,transparent 0,transparent 75%,#eee 0,#eee),linear-gradient(45deg,#eee 25%,transparent 0,transparent 75%,#eee 0,#eee);background-position:0 0,var(--vacp-spacing) var(--vacp-spacing);background-size:calc(var(--vacp-spacing)*2) calc(var(--vacp-spacing)*2)}.vacp-range-input::-moz-range-track{border:var(--vacp-border);box-sizing:content-box;height:var(--vacp-slider-track-height);width:var(--vacp-slider-track-width)}.vacp-range-input::-webkit-slider-runnable-track{border:var(--vacp-border);box-sizing:content-box;height:var(--vacp-slider-track-height);width:var(--vacp-slider-track-width)}.vacp-range-input::-ms-track{border:var(--vacp-border);box-sizing:content-box;height:var(--vacp-slider-track-height);width:var(--vacp-slider-track-width)}.vacp-range-input:focus::-moz-range-track{outline:var(--vacp-focus-outline)}.vacp-range-input:focus::-webkit-slider-runnable-track{outline:var(--vacp-focus-outline)}.vacp-range-input:focus::-ms-track{outline:var(--vacp-focus-outline)}.vacp-range-input--alpha::-moz-range-track{background-image:linear-gradient(to right,transparent,var(--vacp-color))}.vacp-range-input--alpha::-webkit-slider-runnable-track{background-image:linear-gradient(to right,transparent,var(--vacp-color))}.vacp-range-input--alpha::-ms-track{background-image:linear-gradient(to right,transparent,var(--vacp-color))}.vacp-range-input--hue::-moz-range-track{background-image:linear-gradient(90deg,red 0,#ff0 16.66667%,#0f0 33.33333%,#0ff 50%,#00f 66.66667%,#f0f 83.33333%,red 100%)}.vacp-range-input--hue::-webkit-slider-runnable-track{background-image:linear-gradient(90deg,red 0,#ff0 16.66667%,#0f0 33.33333%,#0ff 50%,#00f 66.66667%,#f0f 83.33333%,red 100%)}.vacp-range-input--hue::-ms-track{background-image:linear-gradient(90deg,red 0,#ff0 16.66667%,#0f0 33.33333%,#0ff 50%,#00f 66.66667%,#f0f 83.33333%,red 100%)}.vacp-range-input::-moz-range-thumb{background-color:transparent;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 var(--vacp-border-width) var(--vacp-border-color);box-sizing:content-box;height:var(--vacp-slider-track-height);isolation:isolate;width:var(--vacp-slider-track-height)}.vacp-range-input::-webkit-slider-thumb{background-color:transparent;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 var(--vacp-border-width) var(--vacp-border-color);box-sizing:content-box;height:var(--vacp-slider-track-height);isolation:isolate;margin-top:calc((var(--vacp-spacing)/2)*-1);width:var(--vacp-slider-track-height)}.vacp-range-input::-ms-thumb{background-color:transparent;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 var(--vacp-border-width) var(--vacp-border-color);box-sizing:content-box;height:var(--vacp-slider-track-height);isolation:isolate;margin-top:calc((var(--vacp-spacing)/2)*-1);width:var(--vacp-slider-track-height)}.vacp-copy-button{align-items:center;align-self:center;background-color:#fff;border:var(--vacp-border-width) solid transparent;border-radius:50%;display:flex;height:calc(var(--vacp-spacing)*6);justify-content:center;justify-self:center;overflow:hidden;position:relative;width:calc(var(--vacp-spacing)*6)}.vacp-copy-button:enabled:focus{border-color:var(--vacp-border-color);box-shadow:0 0 0 2px var(--vacp-focus-color);outline:none}.vacp-copy-button:enabled:hover{background-color:#0002}.vacp-color-inputs{align-items:center;display:flex;grid-column:1/-1}.vacp-color-inputs>:not(:first-child){margin-left:var(--vacp-spacing)}.vacp-color-input-group{column-gap:var(--vacp-spacing);display:grid;flex-grow:1;grid-auto-flow:column}.vacp-color-input-label{text-align:center}.vacp-color-input{border:var(--vacp-border);margin:0;margin-top:calc(var(--vacp-spacing)/2);text-align:center;width:100%}.vacp-color-input,.vacp-format-switch-button{background-color:#fff;color:inherit;font:inherit;padding:var(--vacp-spacing)}.vacp-format-switch-button{align-items:center;border:var(--vacp-border-width) solid transparent;border-radius:50%;display:flex;justify-content:center;margin:0}.vacp-format-switch-button:enabled:focus{border-color:var(--vacp-border-color)}.vacp-format-switch-button:enabled:hover{background-color:#0002}.vacp-visually-hidden{clip:rect(0 0 0 0);border:0;height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}"),pe.__file="src/ColorPicker.vue";const ue={install(e){e.component("ColorPicker",pe)}};export{pe as ColorPicker,ue as default};
