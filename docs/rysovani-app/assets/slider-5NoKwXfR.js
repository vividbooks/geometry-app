import{c as r,r as c,y as p,z as y,j as n,E as m,F as k,G as b,H as v}from"./index-bSfz3OUX.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],z=r("file-text",f);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],N=r("moon",M);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]],j=r("rotate-cw",w);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],E=r("sun",g),s=768;function A(){const[o,t]=c.useState(void 0);return c.useEffect(()=>{const e=window.matchMedia(`(max-width: ${s-1}px)`),a=()=>{t(window.innerWidth<s)};return e.addEventListener("change",a),t(window.innerWidth<s),()=>e.removeEventListener("change",a)},[]),!!o}function d(...o){return p(y(o))}function R({className:o,defaultValue:t,value:e,min:a=0,max:i=100,...l}){const h=c.useMemo(()=>Array.isArray(e)?e:Array.isArray(t)?t:[a,i],[e,t,a,i]);return n.jsxs(m,{"data-slot":"slider",defaultValue:t,value:e,min:a,max:i,className:d("relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",o),...l,children:[n.jsx(k,{"data-slot":"slider-track",className:d("bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"),children:n.jsx(b,{"data-slot":"slider-range",className:d("bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full")})}),Array.from({length:h.length},(x,u)=>n.jsx(v,{"data-slot":"slider-thumb",className:"border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"},u))]})}export{z as F,N as M,j as R,R as S,E as a,A as u};
