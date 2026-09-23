import{c as i}from"./index-ZrgxTs2A.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],_=i("chevron-left",f);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],d=i("chevron-right",y);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],I=i("eye",m),a="geo:v1:",o="geo:v2:";function u(t){return btoa(unescape(encodeURIComponent(t))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function p(t){const e=t.length%4===0?"":"=".repeat(4-t.length%4),s=t.replace(/-/g,"+").replace(/_/g,"/")+e;return decodeURIComponent(escape(atob(s)))}function l(t){if(!t||typeof t!="object")return!1;const e=t;return!(!Array.isArray(e.points)||!Array.isArray(e.shapes))}function c(t){return{points:t.points,shapes:t.shapes,freehandPaths:Array.isArray(t.freehandPaths)?t.freehandPaths:[]}}function A(t){const e={v:1,points:t.points,shapes:t.shapes,freehandPaths:t.freehandPaths};return`${a}${u(JSON.stringify(e))}`}function E(t){const e={v:2,steps:t.map(c)};return`${o}${u(JSON.stringify(e))}`}function g(t){if(t.startsWith(o))try{const s=p(t.slice(o.length)),n=JSON.parse(s);if(!n||n.v!==2||!Array.isArray(n.steps)||n.steps.length===0)return null;const r=[];for(const h of n.steps){if(!l(h))return null;r.push(c(h))}return{version:2,steps:r}}catch{return null}const e=S(t);return e?{version:1,snapshot:e}:null}function S(t){const e=t.startsWith(o)?g(t):null;if(e?.version===2)return e.steps[0]??null;if(!t.startsWith(a))return null;const s=t.slice(a.length);try{const n=p(s),r=JSON.parse(n);return!r||r.v!==1||!l(r)?null:c(r)}catch{return null}}function N(t){return t?t.points.length===0&&t.shapes.length===0&&(!t.freehandPaths||t.freehandPaths.length===0):!0}export{d as C,I as E,A as a,_ as b,E as f,N as g,g as p};
