import{c,E as m,j as o,r as y}from"./index-PjJdv2Bp.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],E=c("chevron-left",g);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],I=c("chevron-right",S);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],j=c("eye",d);function N({assignmentId:t,text:e}){const s=m(t,e);return s?o.jsx(o.Fragment,{children:s.map((n,r)=>n.sub?o.jsx("sub",{className:"italic",children:n.text},r):n.italic?o.jsx("i",{children:n.text},r):o.jsx(y.Fragment,{children:n.text},r))}):o.jsx(o.Fragment,{children:e})}const i="geo:v1:",a="geo:v2:";function l(t){return btoa(unescape(encodeURIComponent(t))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function p(t){const e=t.length%4===0?"":"=".repeat(4-t.length%4),s=t.replace(/-/g,"+").replace(/_/g,"/")+e;return decodeURIComponent(escape(atob(s)))}function f(t){if(!t||typeof t!="object")return!1;const e=t;return!(!Array.isArray(e.points)||!Array.isArray(e.shapes))}function u(t){return{points:t.points,shapes:t.shapes,freehandPaths:Array.isArray(t.freehandPaths)?t.freehandPaths:[]}}function A(t){const e={v:1,points:t.points,shapes:t.shapes,freehandPaths:t.freehandPaths};return`${i}${l(JSON.stringify(e))}`}function P(t){const e={v:2,steps:t.map(u)};return`${a}${l(JSON.stringify(e))}`}function v(t){if(t.startsWith(a))try{const s=p(t.slice(a.length)),n=JSON.parse(s);if(!n||n.v!==2||!Array.isArray(n.steps)||n.steps.length===0)return null;const r=[];for(const h of n.steps){if(!f(h))return null;r.push(u(h))}return{version:2,steps:r}}catch{return null}const e=x(t);return e?{version:1,snapshot:e}:null}function x(t){const e=t.startsWith(a)?v(t):null;if(e?.version===2)return e.steps[0]??null;if(!t.startsWith(i))return null;const s=t.slice(i.length);try{const n=p(s),r=JSON.parse(n);return!r||r.v!==1||!f(r)?null:u(r)}catch{return null}}function b(t){return t?t.points.length===0&&t.shapes.length===0&&(!t.freehandPaths||t.freehandPaths.length===0):!0}export{I as C,j as E,N as I,A as a,E as b,P as f,b as g,v as p};
