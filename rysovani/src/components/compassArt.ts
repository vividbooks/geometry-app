/**
 * Kružítko z Vítkovy kresby (kruzitko.svg, viewBox 0 0 461.14 368.82) beze změny tvarů,
 * rozdělené na hlavu (+ držátko), rameno s jehlou (+ kolečko) a rameno s tuhou (+ objímka, tuha).
 * Vrstvy: rameno s jehlou vzadu, rameno s tuhou vpředu, hlava navrchu.
 * Rozevírání = otočení ramene kolem jeho čepu v nakloněné rovině kresby: afinní
 * M = S·R(θ)·S⁻¹, S = diag(1, f), f = COMPASS_PLANE_F (svislý směr kresby je zkrácený).
 * Kružítko se nikdy nezavírá pod COMPASS_MIN_OPEN (podíl rozevření kresby).
 */

const C0 = '#a3c6d3';
const C1 = '#4f6f84';
const C2 = '#383e7f';

type Part = { fill: string; d?: string; ell?: [number, number, number, number, number]; shadow?: boolean };

/** Rameno s jehlou (vlevo) — polygon jehly, rameno, šroub s kolečkem. */
const LEFT: Part[] = [
  { fill: C0, d: 'M73.73 277.46L2.92 363.75L1.6 362.61L63.2 268.28Z', shadow: true },
  { fill: C0, d: 'M81.6,265l-29.4,7.73.13-18.24c.03-4.53,1.52-8.9,4.21-12.35l124.26-159.47,39.32,4.14-138.52,178.18Z', shadow: true },
  { fill: C1, d: 'M72.38,290.17h0c-6.89-.06-13.23-4.12-16.64-10.65l-3.54-6.79L180.62,107.92l39.32,4.14-132.68,170.66c-3.7,4.76-9.16,7.49-14.88,7.44Z' },
  { fill: C1, d: 'M122.53 252.5L58.98 251.97L59.07 239.26L122.64 236.07Z' },
  { fill: C1, d: 'M122.31,235.63c-1.94-6.05-9.19-11.17-18.77-13.59-.02.05-.05.1-.07.14-3.83-1-8.06-1.57-12.5-1.61-17.55-.15-31.83,8.1-31.9,18.42-.07,10.32,14.09,18.8,31.64,18.95,17.55.15,31.83-8.1,31.91-18.42,0-1.32.13-2.65-.3-3.9Z' },
  { fill: C0, d: 'M90.62,271.63c17.55.15,31.84-9.07,31.92-20.59s-14.08-20.98-31.62-21.12c-17.55-.15-31.84,9.07-31.92,20.59s14.08,20.98,31.62,21.12Z' },
  { fill: C1, d: 'M90.71,257.94c6.21.05,11.28-3.21,11.3-7.29s-4.99-7.43-11.2-7.48c-6.21-.05-11.28,3.21-11.31,7.29s4.99,7.43,11.2,7.48Z' },
];

/** Rameno s tuhou (vpravo) — tuha, rameno, držák tuhy. */
const RIGHT: Part[] = [
  { fill: C1, d: 'M425.76,339.45l17.51,23.73c.66.84,3.33.86,4,.03l2.7-3.79v-.48s-14.86-20.96-14.86-20.96c-.33-.48-1.66-.73-3-.5l-5.34,1.03c-1,.23-1.34.58-1.01.94Z', shadow: true },
  { fill: C1, d: 'M432.1,338.91l-2.67.33c-3.34.33-7-.3-7.99-1.5l-27.16-25.71c-1.32-1.32.69-2.73,4.36-3.06l17.69-1.64c3.67-.33,7.67.54,8.32,1.98l12.48,27.02c0,1.07-2.02,2.25-5.02,2.58Z' },
  { fill: C1, ell: [408.8, 309.24, 7.46, 15.82, -89.5] },
  { fill: C0, d: 'M373.33,253.64l4.06-6.41c-10.34.87-20.67-1.37-23.64-5.08l-109.66-149.3c-2.64-3.71,3.39-7.35,13.73-8.34l2.34-.22c10.34-.87,20.67,1.36,23.64,5.08l109.66,149.3c.33.46.53.93.59,1.38.05.36-.1,25.7-.2,26.05-.78,2.76-12.49-13.23-20.53-12.47Z', shadow: true },
  { fill: C0, d: 'M366.98,240.92l-17.73,1.54,49.05,66.69,17.4-2-48.71-66.23Z' },
  { fill: C1, d: 'M379.55,272.26l-2.34.22c-10.34.87-20.67-1.37-23.64-5.08l-109.66-149.3c-2.64-3.71,3.39-7.35,13.73-8.34l2.34-.22c10.34-.87,20.67,1.36,23.64,5.08l109.66,149.3c2.64,3.71-3.39,7.35-13.73,8.34Z' },
  { fill: C0, d: 'M417.13,309.31c0,.9-4.23,1.59-9.43,1.54-5.2-.04-9.41-.81-9.4-1.7s4.23-1.59,9.43-1.54c4.42.04,6.22-2.18,7.23-1.46.07.05,2.03,2.87,2.07,2.92.07.08.11.16.11.25Z' },
];

/** Hlava (pevná) — držátko, ozubená hlava, šroubky čepů. */
const HEAD: Part[] = [
  { fill: C0, d: 'M275.11,46.21c3.67.03,6.66,1.13,6.65,2.44l-.24,34.29c-1.4,9.87-24.83,22.06-53.51,21.82-28.68-.24-51.93-12.7-53.2-22.72l.24-34.29c0-1.31,3.02-2.36,6.69-2.32l93.37.79Z', shadow: true },
  { fill: C1, d: 'M229.28,67.85h-.38c-3.43.1-6.78-1.26-9.27-3.85-.08-.08-.15-.16-.23-.25-5.76-6.08-8.96-14.49-8.9-23.22l.17-24.21c.02-2.62,2.85-4.63,6.47-4.6l23.72.2c3.62.03,6.42,2.09,6.4,4.71l-.16,22.8c-.07,9.27-3.34,18.16-9.16,24.91l-.57.46c-2.34,1.9-5.16,2.96-8.08,3.04Z', shadow: true },
  { fill: C2, d: 'M274.89,77.04c3.67.03,6.66,1.13,6.65,2.44l-.24,34.29c-1.4,9.87-24.83,22.06-53.51,21.82-28.68-.24-51.93-12.7-53.2-22.72l.24-34.29c0-1.31,3.02-2.36,6.69-2.32l93.37.79Z', shadow: true },
  { fill: C1, d: 'M205.7,98.13c8.1.07,14.69-2.22,14.71-5.12s-6.53-5.29-14.63-5.36-14.69,2.22-14.71,5.12,6.53,5.29,14.64,5.36Z' },
  { fill: C1, d: 'M249.72,98.5c8.1.07,14.69-2.22,14.71-5.12.02-2.89-6.53-5.29-14.64-5.36-8.1-.07-14.69,2.22-14.71,5.12s6.53,5.29,14.64,5.36Z' },
  { fill: C1, ell: [228.97, 15.32, 13.73, 18.29, -89.42] },
  { fill: C0, ell: [228.97, 15.32, 7.83, 10.43, -89.42] },
];

const NEEDLE = { x: 2.2, y: 363.2 };
const LEAD = { x: 447.5, y: 363.5 };
const PIVOT_N = { x: 205.75, y: 93.1 };
const PIVOT_L = { x: 249.75, y: 93.1 };
/** Výška kresby (jednotky SVG). */
const ART_HEIGHT = 368.82;
/** Rozevření v kresbě (vzdálenost hrotů, jednotky SVG). */
const ART_OPEN = Math.hypot(LEAD.x - NEEDLE.x, LEAD.y - NEEDLE.y);
/** Délka ramene v jednotkách kresby (čep → hrot). */
export const COMPASS_ART_ARM =
  (Math.hypot(NEEDLE.x - PIVOT_N.x, NEEDLE.y - PIVOT_N.y) + Math.hypot(LEAD.x - PIVOT_L.x, LEAD.y - PIVOT_L.y)) / 2;
/** Zkrácení nakloněné roviny ramen. */
export const COMPASS_PLANE_F = 0.8;
/** Nejmenší rozevření (podíl rozevření kresby) — složené kružítko nevypadá dobře. */
export const COMPASS_MIN_OPEN = 0.25;

type Built = { path: Path2D; fill: string };
let cache: { head: Built[]; left: Built[]; right: Built[] } | null = null;
const build = (list: Part[]): Built[] =>
  list.map(p => {
    let path: Path2D;
    if (p.ell) {
      const [cx, cy, rx, ry, deg] = p.ell;
      path = new Path2D();
      path.ellipse(cx, cy, rx, ry, (deg * Math.PI) / 180, 0, Math.PI * 2);
    } else path = new Path2D(p.d!);
    return { path, fill: p.fill };
  });
const parts = () => (cache ??= { head: build(HEAD), left: build(LEFT), right: build(RIGHT) });

type M6 = [number, number, number, number, number, number];
/** Otočení o θ kolem P v rovině zkrácené faktorem f (matice pro ctx.transform). */
const rotM = (P: { x: number; y: number }, th: number, f: number): M6 => {
  const c = Math.cos(th);
  const s = Math.sin(th);
  const a = c, b = f * s, cc = -s / f, d = c;
  return [a, b, cc, d, P.x - (a * P.x + cc * P.y), P.y - (b * P.x + d * P.y)];
};
const apply = (m: M6, q: { x: number; y: number }) => ({ x: m[0] * q.x + m[2] * q.y + m[4], y: m[1] * q.x + m[3] * q.y + m[5] });
const tipsFor = (th: number, f: number) => ({ n: apply(rotM(PIVOT_N, th, f), NEEDLE), l: apply(rotM(PIVOT_L, -th, f), LEAD) });
const tipDist = (th: number, f: number) => { const t = tipsFor(th, f); return Math.hypot(t.l.x - t.n.x, t.l.y - t.n.y); };
/** θ ramen pro vzdálenost hrotů d (jednotky SVG); θ < 0 přivírá, θ > 0 rozevírá. */
const thetaFor = (d: number, f: number) => {
  let lo = -0.55; // přivřené (minimum vzdálenosti hrotů je kolem −0,59 při f = 0,8)
  let hi = 0.8;
  if (d <= tipDist(lo, f)) return lo;
  if (d >= tipDist(hi, f)) return hi;
  for (let i = 0; i < 40; i++) {
    const m = (lo + hi) / 2;
    if (tipDist(m, f) > d) hi = m;
    else lo = m;
  }
  return (lo + hi) / 2;
};
const thetaCache = new Map<number, number>();
const thetaCached = (d: number) => {
  const k = Math.round(d * 4) / 4;
  let v = thetaCache.get(k);
  if (v === undefined) {
    v = thetaFor(k, COMPASS_PLANE_F);
    if (thetaCache.size > 4000) thetaCache.clear();
    thetaCache.set(k, v);
  }
  return v;
};

/** Nejmenší rozevření (vzdálenost hrotů) kružítka s ramenem armLen. */
export const compassMinOpen = (armLen: number) => COMPASS_MIN_OPEN * ART_OPEN * (armLen / COMPASS_ART_ARM);

/**
 * Délka ramene (světové px) pro poloměr r: ~0,8·r, aspoň minArm. Když by r vyžadovalo menší
 * rozevření než COMPASS_MIN_OPEN, kružítko se zmenší — ale ne pod floorArm
 * (pak zůstane minimální rozevření a tuha mírně přesáhne).
 */
export const compassArmLength = (r: number, minArm: number, floorArm = 0) => {
  let L = Math.max(r * 0.8, minArm);
  const maxForR = r / (COMPASS_MIN_OPEN * ART_OPEN / COMPASS_ART_ARM);
  if (L > maxForR) L = Math.max(maxForR, floorArm);
  return L;
};
/** Délka ramene, při které je kružítko vysoké `px` (pro spodní mez velikosti). */
export const compassArmForHeight = (px: number) => (px * COMPASS_ART_ARM) / ART_HEIGHT;

/**
 * Vykreslí kružítko v lokálních souřadnicích: hrot jehly v (0,0), hrot tuhy v (w,0),
 * hlava na straně záporného y. `armLen` = délka ramene ve stejných jednotkách.
 * Pod minimálním rozevřením zůstane na minimu. Volající nastaví translate/rotate/globalAlpha.
 */
export function drawCompassArt(ctx: CanvasRenderingContext2D, w: number, armLen: number) {
  const s = armLen / COMPASS_ART_ARM;
  const d = Math.max(COMPASS_MIN_OPEN * ART_OPEN, w / s);
  const th = thetaCached(d);
  const f = COMPASS_PLANE_F;
  const mN = rotM(PIVOT_N, th, f);
  const mL = rotM(PIVOT_L, -th, f);
  const tN = apply(mN, NEEDLE);
  const tL = apply(mL, LEAD);
  const ang = Math.atan2(tL.y - tN.y, tL.x - tN.x);
  const P = parts();
  ctx.save();
  ctx.scale(s, s);
  ctx.rotate(-ang);
  ctx.translate(-tN.x, -tN.y);
  const set = (list: Built[], m: M6 | null) => {
    ctx.save();
    if (m) ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
    for (const p of list) {
      ctx.fillStyle = p.fill;
      ctx.fill(p.path);
    }
    ctx.restore();
  };
  set(P.left, mN);
  set(P.right, mL);
  set(P.head, null);
  ctx.restore();
}
