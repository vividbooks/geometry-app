import{c as a}from"./index-Bw6T0Saf.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],f=a("chevron-left",o);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],l=a("chevron-right",c),s="geo:v1:";function i(e){return btoa(unescape(encodeURIComponent(e))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function h(e){const n=e.length%4===0?"":"=".repeat(4-e.length%4),r=e.replace(/-/g,"+").replace(/_/g,"/")+n;return decodeURIComponent(escape(atob(r)))}function d(e){const n={v:1,points:e.points,shapes:e.shapes,freehandPaths:e.freehandPaths};return`${s}${i(JSON.stringify(n))}`}function p(e){return e.startsWith(s)}function m(e){if(!p(e))return null;const n=e.slice(s.length);try{const r=h(n),t=JSON.parse(r);return!t||t.v!==1||!Array.isArray(t.points)||!Array.isArray(t.shapes)?null:{points:t.points,shapes:t.shapes,freehandPaths:Array.isArray(t.freehandPaths)?t.freehandPaths:[]}}catch{return null}}export{l as C,f as a,d as f,m as p};
