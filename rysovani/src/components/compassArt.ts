/**
 * Kružítko jako 3D model (Blender → kruzitko-model.json) promítané za běhu v Canvas 2D — bez snímků,
 * bez WebGL. Vzhled odpovídá SVG exportéru modelu (model.py: export_svg + VRSTVA):
 * - rameno s jehlou se otáčí o +half kolem svého čepu (osa Y), rameno s tuhou o −half (Blender, Z nahoru);
 * - ortografická kamera míří na `camera.target`, sklon pitch = pitchClosed + (pitchOpen − pitchClosed)·half/halfMax
 *   (zavřené víc shora, rozevřené víc z boku); směr ke kameře k = (0, −cos p, sin p), osa obrazu nahoru (0, sin p, cos p);
 * - odvrácené plochy pryč (n·k ≤ 1e-4), barva ze 3 odstínů materiálu podle n·světlo (prahy thresholds);
 * - pořadí: objekty podle vrstvy, pak podle hloubky středu, uvnitř objektu plochy odzadu (malířův algoritmus).
 * Umístění: promítnutý hrot jehly do (0,0), hrot tuhy do (w,0) — měřítko + otočení, hroty sedí přesně.
 */
import MODEL from './kruzitko-model.json';

type ModelObj = { name: string; group: 'hlava' | 'jehla' | 'tuha'; layer: number; mat: string; v: number[][]; f: number[][] };
type Model = {
  L: number;
  pivots: { jehla: number[]; tuha: number[] };
  tips: { jehla: number[]; tuha: number[] };
  camera: { target: number[]; pitchClosed: number; pitchOpen: number; halfMax: number; orthoScale: number };
  light: number[];
  thresholds: number[];
  palette: Record<string, string[]>;
  objects: ModelObj[];
};

const M = MODEL as unknown as Model;
const deg = Math.PI / 180;

/** Velikost kružítka v animacích (1 = původní: rameno ~0,8·r, min. 4 cm, strop 220 px, spodní mez 120 px). */
export const COMPASS_SIZE = 1.3;
/** Podíl výšky kresby a délky ramene (typicky 0,8–0,9 ve střední části rozevírání). */
const HEIGHT_PER_ARM = 0.85;
/** Nejmenší polovina úhlu ramen při volbě velikosti (pro malé r se kružítko spíš zmenší). */
const MIN_HALF_DEG = 10;
/** Tah stejnou barvou proti švům mezi plochami (0,6 px obrazu 700 px jako v SVG exportu) → jednotky modelu. */
const SEAM = (0.6 * M.camera.orthoScale) / 700;

type Prep = {
  sign: number; // 0 hlava, +1 jehla, −1 tuha
  P: number[]; // čep
  layer: number;
  pal: string[];
  n: number;
  vx: Float64Array; vy: Float64Array; vz: Float64Array;
  faces: Int32Array[];
  fnx: Float64Array; fny: Float64Array; fnz: Float64Array; // normály ploch v klidu
  cx: number; cy: number; cz: number; // střed objektu v klidu
  // pracovní pole (promítnutí)
  sx: Float64Array; sy: Float64Array; sd: Float64Array;
};

const prep: Prep[] = M.objects.map(o => {
  const n = o.v.length;
  const vx = new Float64Array(n), vy = new Float64Array(n), vz = new Float64Array(n);
  let cx = 0, cy = 0, cz = 0;
  o.v.forEach((p, i) => { vx[i] = p[0]; vy[i] = p[1]; vz[i] = p[2]; cx += p[0]; cy += p[1]; cz += p[2]; });
  const faces = o.f.map(f => Int32Array.from(f));
  const fnx = new Float64Array(faces.length), fny = new Float64Array(faces.length), fnz = new Float64Array(faces.length);
  faces.forEach((f, j) => {
    // Newellova normála (CCW = ven)
    let nx = 0, ny = 0, nz = 0;
    for (let a = 0; a < f.length; a++) {
      const i = f[a], k = f[(a + 1) % f.length];
      nx += (vy[i] - vy[k]) * (vz[i] + vz[k]);
      ny += (vz[i] - vz[k]) * (vx[i] + vx[k]);
      nz += (vx[i] - vx[k]) * (vy[i] + vy[k]);
    }
    const l = Math.hypot(nx, ny, nz) || 1;
    fnx[j] = nx / l; fny[j] = ny / l; fnz[j] = nz / l;
  });
  return {
    sign: o.group === 'jehla' ? 1 : o.group === 'tuha' ? -1 : 0,
    P: o.group === 'tuha' ? M.pivots.tuha : M.pivots.jehla,
    layer: o.layer,
    pal: M.palette[o.mat],
    n, vx, vy, vz, faces, fnx, fny, fnz,
    cx: cx / n, cy: cy / n, cz: cz / n,
    sx: new Float64Array(n), sy: new Float64Array(n), sd: new Float64Array(n),
  };
});

type FaceRec = { key: number; d: number; col: string; o: Prep; f: Int32Array };
const recs: FaceRec[] = [];
for (const o of prep) for (const f of o.faces) recs.push({ key: 0, d: 0, col: '', o, f });
const visible: FaceRec[] = [];
const byDepth = (a: FaceRec, b: FaceRec) => a.key - b.key || a.d - b.d;

/**
 * Seskupení ploch stejné barvy do jedné cesty: plocha se smí přesunout dřív k ploše stejné barvy jen tehdy,
 * když se její obdélník (+ tah) nepřekrývá s ničím, co se kreslí mezi tím — pořadí viditelně nezmění.
 * Přední plochy mají v obraze stejnou orientaci, takže sjednocení v jedné cestě (nonzero) nedělá díry.
 */
type Slot = { col: string; faces: FaceRec[]; x0: number; y0: number; x1: number; y1: number };
const slots: Slot[] = [];
let slotCount = 0;
function groupSlots() {
  slotCount = 0;
  const m = SEAM * 2;
  for (const rec of visible) {
    const { o, f } = rec;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (let a = 0; a < f.length; a++) {
      const x = o.sx[f[a]], y = o.sy[f[a]];
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
    x0 -= m; y0 -= m; x1 += m; y1 += m;
    let target: Slot | null = null;
    for (let q = slotCount - 1; q >= 0; q--) {
      const sl = slots[q];
      if (sl.col === rec.col) { target = sl; break; }
      if (sl.x0 <= x1 && x0 <= sl.x1 && sl.y0 <= y1 && y0 <= sl.y1) break;
    }
    if (!target) {
      target = slots[slotCount] ??= { col: '', faces: [], x0: 0, y0: 0, x1: 0, y1: 0 };
      slotCount++;
      target.col = rec.col; target.faces.length = 0;
      target.x0 = x0; target.y0 = y0; target.x1 = x1; target.y1 = y1;
    } else {
      if (x0 < target.x0) target.x0 = x0; if (y0 < target.y0) target.y0 = y0;
      if (x1 > target.x1) target.x1 = x1; if (y1 > target.y1) target.y1 = y1;
    }
    target.faces.push(rec);
  }
}

/** Kamera pro polovinu úhlu `half` (°). */
const camFor = (half: number) => {
  const c = M.camera;
  const p = (c.pitchClosed + (c.pitchOpen - c.pitchClosed) * (half / c.halfMax)) * deg;
  return { ky: -Math.cos(p), kz: Math.sin(p), uy: Math.sin(p), uz: Math.cos(p), T: c.target };
};
type Cam = ReturnType<typeof camFor>;

/** Bod v klidu → otočený (podle skupiny) → obraz: x vpravo, y dolů (jednotky modelu), d = ke kameře. */
const projPoint = (q: number[], sign: number, P: number[], cs: number, sn: number, cam: Cam) => {
  let x = q[0], z = q[2];
  if (sign) {
    const dx = x - P[0], dz = z - P[2];
    const s = sign * sn;
    x = P[0] + cs * dx + s * dz;
    z = P[2] - s * dx + cs * dz;
  }
  x -= cam.T[0];
  const y = q[1] - cam.T[1];
  z -= cam.T[2];
  return { x, y: -(y * cam.uy + z * cam.uz), d: y * cam.ky + z * cam.kz };
};

/** Promítne model pro `half` a seřadí viditelné plochy (do `visible`). Vrací hroty v obraze. */
function project(half: number) {
  const cam = camFor(half);
  const cs = Math.cos(half * deg), sn = Math.sin(half * deg);
  const L0 = M.light[0], L1 = M.light[1], L2 = M.light[2];
  const t0 = M.thresholds[0], t1 = M.thresholds[1];
  const T0 = cam.T[0], T1 = cam.T[1], T2 = cam.T[2];
  for (const o of prep) {
    const s = o.sign * sn;
    const P = o.P;
    for (let i = 0; i < o.n; i++) {
      let x = o.vx[i], z = o.vz[i];
      if (o.sign) {
        const dx = x - P[0], dz = z - P[2];
        x = P[0] + cs * dx + s * dz;
        z = P[2] - s * dx + cs * dz;
      }
      const y = o.vy[i] - T1;
      z -= T2;
      o.sx[i] = x - T0;
      o.sy[i] = -(y * cam.uy + z * cam.uz);
      o.sd[i] = y * cam.ky + z * cam.kz;
    }
  }
  visible.length = 0;
  let r = 0;
  for (const o of prep) {
    const s = o.sign * sn;
    // hloubka středu objektu (exportér: vrstva·1000 − vzdálenost středu, zaokrouhleno na 4 místa)
    const c = projPoint([o.cx, o.cy, o.cz], o.sign, o.P, cs, sn, cam);
    const key = Math.round((o.layer * 1000 + c.d) * 1e4);
    for (let j = 0; j < o.faces.length; j++, r++) {
      let nx = o.fnx[j], nz = o.fnz[j];
      const ny = o.fny[j];
      if (o.sign) { const ax = cs * nx + s * nz; nz = -s * nx + cs * nz; nx = ax; }
      if (ny * cam.ky + nz * cam.kz <= 1e-4) continue;
      const rec = recs[r];
      const f = rec.f;
      let d = 0;
      for (let a = 0; a < f.length; a++) d += o.sd[f[a]];
      const v = Math.max(0, nx * L0 + ny * L1 + nz * L2);
      rec.key = key;
      rec.d = d / f.length;
      rec.col = o.pal[v < t0 ? 0 : v < t1 ? 1 : 2];
      visible.push(rec);
    }
  }
  visible.sort(byDepth);
  groupSlots();
  const tN = projPoint(M.tips.jehla, 1, M.pivots.jehla, cs, sn, cam);
  const tT = projPoint(M.tips.tuha, -1, M.pivots.tuha, cs, sn, cam);
  return { tN, tT };
}

/** Polovina úhlu ramen (°) pro rozevření w a délku ramene armLen (spojitě, nejvýš halfMax). */
const halfFor = (w: number, armLen: number) =>
  Math.min(M.camera.halfMax, Math.asin(Math.min(1, Math.max(0, w / (2 * Math.max(armLen, 1e-6))))) / deg);

/**
 * Délka ramene (světové px) pro poloměr r: ~0,8·COMPASS_SIZE·r, aspoň minArm (volající ho už násobí COMPASS_SIZE). Když by r vyžadovalo menší rozevření
 * než MIN_HALF_DEG, kružítko se zmenší — ale ne pod floorArm (pak je prostě víc přivřené).
 */
export const compassArmLength = (r: number, minArm: number, floorArm = 0) => {
  let L = Math.max(r * 0.8 * COMPASS_SIZE, minArm);
  const maxForR = r / (2 * Math.sin(MIN_HALF_DEG * deg));
  if (L > maxForR) L = Math.max(maxForR, floorArm);
  return L;
};
/** Délka ramene, při které je kružítko vysoké `px` (pro spodní mez velikosti). */
export const compassArmForHeight = (px: number) => px / HEIGHT_PER_ARM;
/** Výška kružítka nad spojnicí hrotů (podíl délky ramene, s rezervou) — pro záběr kamery. */
export const COMPASS_HEAD_PER_ARM = 0.95;

/** Umístění: měřítko a otočení tak, aby hrot jehly byl v (0,0) a hrot tuhy v (w,0). */
const placement = (w: number, armLen: number, tN: { x: number; y: number }, tT: { x: number; y: number }) => {
  const dx = tT.x - tN.x, dy = tT.y - tN.y;
  const D = Math.hypot(dx, dy);
  if (D < 1e-9 || w <= 0) return { s: armLen / M.L, ca: 1, sa: 0 };
  return { s: w / D, ca: dx / D, sa: dy / D };
};

/**
 * Vykreslí kružítko v lokálních souřadnicích: hrot jehly v (0,0), hrot tuhy v (w,0), hlava na straně záporného y.
 * `armLen` = délka ramene ve stejných jednotkách (určuje úhel rozevření). Volající nastaví translate/rotate/globalAlpha.
 */
type Pose = { half: number; tN: { x: number; y: number }; tT: { x: number; y: number }; paths: { col: string; path: Path2D }[] };
/** Posledních pár póz (polovina úhlu → hotové cesty): v klidu a při opisování se nic nepřepočítává. */
const poseCache: Pose[] = [];
const POSE_CACHE = 4;

const poseFor = (half: number): Pose => {
  for (const p of poseCache) if (p.half === half) return p;
  const { tN, tT } = project(half);
  const paths: Pose['paths'] = [];
  for (let q = 0; q < slotCount; q++) {
    const sl = slots[q];
    const path = new Path2D();
    for (let i = 0; i < sl.faces.length; i++) {
      const { o, f } = sl.faces[i];
      path.moveTo(o.sx[f[0]], o.sy[f[0]]);
      for (let k = 1; k < f.length; k++) path.lineTo(o.sx[f[k]], o.sy[f[k]]);
      path.closePath();
    }
    paths.push({ col: sl.col, path });
  }
  const pose = { half, tN, tT, paths };
  poseCache.unshift(pose);
  if (poseCache.length > POSE_CACHE) poseCache.pop();
  return pose;
};

export function drawCompassArt(ctx: CanvasRenderingContext2D, w: number, armLen: number): boolean {
  const { tN, tT, paths } = poseFor(halfFor(w, armLen));
  const { s, ca, sa } = placement(w, armLen, tN, tT);
  // lokální matice: scale(s) · rotate(−úhel jehla→tuha) · translate(−hrot jehly), složená s maticí volajícího
  const a = s * ca, b = -s * sa, c = s * sa, d = s * ca;
  const e = -(a * tN.x + c * tN.y);
  const g = -(b * tN.x + d * tN.y);
  const C = ctx.getTransform();
  ctx.setTransform(
    C.a * a + C.c * b, C.b * a + C.d * b,
    C.a * c + C.c * d, C.b * c + C.d * d,
    C.a * e + C.c * g + C.e, C.b * e + C.d * g + C.f,
  );
  ctx.lineJoin = 'round';
  ctx.lineWidth = SEAM;
  for (const p of paths) {
    ctx.fillStyle = p.col;
    ctx.strokeStyle = p.col;
    ctx.fill(p.path);
    ctx.stroke(p.path);
  }
  ctx.setTransform(C);
  return true;
}

/** Ladění: hroty v normalizovaných souřadnicích kamery (x zleva, y zdola, jako meta.json exportéru). */
export function compassTipsNormalized(half: number) {
  const { tN, tT } = project(half);
  const o = M.camera.orthoScale;
  const nrm = (q: { x: number; y: number }) => [q.x / o + 0.5, -q.y / o + 0.5];
  return { jehla: nrm(tN), tuha: nrm(tT), faces: visible.length };
}

/** Ladění: kam padnou hroty po umístění (lokálně, jehla má být v 0,0 a tuha v w,0). */
export function compassPoseDebug(w: number, armLen: number) {
  const half = halfFor(w, armLen);
  const { tN, tT } = project(half);
  const { s, ca, sa } = placement(w, armLen, tN, tT);
  const loc = (q: { x: number; y: number }) => {
    const x = q.x - tN.x, y = q.y - tN.y;
    return { x: s * (ca * x + sa * y), y: s * (-sa * x + ca * y) };
  };
  return { half, scale: s, needle: loc(tN), lead: loc(tT) };
}
