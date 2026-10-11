/**
 * Kružítko vymodelované v Blenderu a převedené na vektorové snímky:
 * public/kruzitko/kruzitko.json (formát v2) — 151 snímků, polovina úhlu ramen `h` 0° → 75° po 0,5°
 * (snímek 0 = zavřené, hroty se dotýkají; kamera se zároveň pokládá z pohledu shora do boku).
 * Snímek: `p` = skupiny polygonů stejné barvy v pořadí kreslení [barva, n1, x,y, dx,dy, …, n2, dx,dy, …]
 * (desetiny px snímku 700×700, delta od předchozího bodu skupiny), hrot jehly `j` a tuhy `t` v px snímku.
 *
 * Kreslení: snímek nejbližší k h = asin(w / 2·armLen), měřítko tak, aby vzdálenost hrotů = w,
 * otočení tak, aby jehla→tuha mířila po ose +x, posun hrotu jehly do (0,0).
 * Data se načtou líně při prvním kreslení; do té doby se kružítko nekreslí.
 */

type Frame = { h: number; j: [number, number]; t: [number, number]; p: number[][] };
type Data = { v: number; unit: number; stroke: number; pal: string[]; frames: Frame[] };
type Built = {
  h: number;
  J: { x: number; y: number };
  /** vzdálenost hrotů v px snímku */
  D: number;
  /** cos/sin úhlu vektoru jehla→tuha ve snímku */
  ca: number;
  sa: number;
  /** zdánlivá délka ramene v px snímku (D = 2·g·sin h) */
  g: number;
  src: number[][];
  /** předpočítané cesty (jedna na skupinu stejné barvy) */
  paths: { fill: string; path: Path2D }[] | null;
};

/** Podíl výšky kresby a délky ramene (typicky 0,8–0,9 ve střední části rozevírání). */
const HEIGHT_PER_ARM = 0.85;
/** Nejmenší polovina úhlu ramen při volbě velikosti (pro malé r se kružítko spíš zmenší). */
const MIN_HALF_DEG = 10;

const deg = Math.PI / 180;
let frames: Built[] | null = null;
let stepDeg = 0.5;
let palette: string[] = [];
let unit = 0.1;
let stroke = 0.6;
let loading: Promise<void> | null = null;

/** Spustí (jednou) načtení snímků. */
export function loadCompassArt(): Promise<void> {
  if (loading) return loading;
  const base: string = (import.meta as any).env?.BASE_URL ?? '/';
  loading = fetch(`${base.replace(/\/?$/, '/')}kruzitko/kruzitko.json?v=2`)
    .then(r => {
      if (!r.ok) throw new Error(`kruzitko.json ${r.status}`);
      return r.json() as Promise<Data>;
    })
    .then(d => {
      if (d.v !== 2) throw new Error(`kruzitko.json: neznámá verze ${d.v}`);
      palette = d.pal;
      unit = d.unit;
      stroke = d.stroke;
      const list: Built[] = d.frames.map(f => {
        const dx = f.t[0] - f.j[0];
        const dy = f.t[1] - f.j[1];
        const D = Math.hypot(dx, dy);
        return {
          h: f.h,
          J: { x: f.j[0], y: f.j[1] },
          D,
          ca: D > 1e-6 ? dx / D : 1,
          sa: D > 1e-6 ? dy / D : 0,
          g: f.h > 0 ? D / (2 * Math.sin(f.h * deg)) : 0,
          src: f.p,
          paths: null,
        };
      });
      if (list.length > 1 && !list[0].g) list[0].g = list[1].g;
      if (list.length > 1) stepDeg = list[1].h - list[0].h;
      frames = list;
    })
    .catch(e => {
      console.warn('Kružítko: snímky se nenačetly', e);
      loading = null;
    });
  return loading;
}

const pathsOf = (f: Built) => {
  if (!f.paths) {
    f.paths = f.src.map(g => {
      const path = new Path2D();
      let i = 1;
      let x = 0;
      let y = 0;
      while (i < g.length) {
        const n = g[i++];
        for (let k = 0; k < n; k++) {
          x += g[i++];
          y += g[i++];
          if (k === 0) path.moveTo(x * unit, y * unit);
          else path.lineTo(x * unit, y * unit);
        }
        path.closePath();
      }
      return { fill: palette[g[0]], path };
    });
    f.src = [];
  }
  return f.paths;
};

/**
 * Snímek a měřítko pro rozevření w, rameno armLen a přesnost exact.
 * Měřítko se odvozuje ze vzdálenosti hrotů interpolované mezi sousedními snímky (plynulá velikost
 * i poloha tuhy při přepnutí snímku); exact = 1 doladí měřítko na hroty zobrazeného snímku (tuha přesně v w).
 */
const pose = (w: number, armLen: number, exact: number) => {
  const list = frames!;
  const last = list.length - 1;
  const sin = Math.min(1, Math.max(0, w / (2 * Math.max(armLen, 1e-6))));
  const u = Math.min(last, Math.asin(sin) / deg / stepDeg);
  const k = Math.round(u);
  const f = list[k];
  const k0 = Math.floor(u);
  const k1 = Math.min(last, k0 + 1);
  const t = u - k0;
  const Dint = list[k0].D * (1 - t) + list[k1].D * t;
  let s = armLen / f.g;
  if (w > 0 && Dint > 1e-6) {
    // za posledním snímkem (víc než 75°) se kružítko prostě zvětší
    const sI = sin >= Math.sin(list[last].h * deg) ? w / list[last].D : w / Dint;
    const sW = f.D > 1e-6 ? w / f.D : sI;
    const e = Math.max(0, Math.min(1, exact));
    s = sI + (sW - sI) * e;
  }
  return { f, k, s };
};

/**
 * Délka ramene (světové px) pro poloměr r: ~0,8·r, aspoň minArm. Když by r vyžadovalo menší rozevření
 * než MIN_HALF_DEG, kružítko se zmenší — ale ne pod floorArm (pak je prostě víc přivřené).
 */
export const compassArmLength = (r: number, minArm: number, floorArm = 0) => {
  let L = Math.max(r * 0.8, minArm);
  const maxForR = r / (2 * Math.sin(MIN_HALF_DEG * deg));
  if (L > maxForR) L = Math.max(maxForR, floorArm);
  return L;
};
/** Délka ramene, při které je kružítko vysoké `px` (pro spodní mez velikosti). */
export const compassArmForHeight = (px: number) => px / HEIGHT_PER_ARM;

/**
 * Vykreslí kružítko v lokálních souřadnicích: hrot jehly v (0,0), hrot tuhy v (w,0), hlava na straně záporného y.
 * `armLen` = délka ramene ve stejných jednotkách (určuje snímek, tj. úhel rozevření).
 * `exact` ∈ [0,1]: 1 = měřítko přesně podle hrotů (tuha přesně v (w,0)); 0 = měřítko podle délky ramene
 * (průběh rozevírání — u malých úhlů by přeskakování snímků jinak měnilo velikost).
 * Volající nastaví translate/rotate/globalAlpha. Vrací false, dokud nejsou snímky načtené.
 */
export function drawCompassArt(ctx: CanvasRenderingContext2D, w: number, armLen: number, exact = 1): boolean {
  if (!frames) {
    void loadCompassArt();
    return false;
  }
  const { f, s } = pose(w, armLen, exact);
  // lokální matice: scale(s) · rotate(−úhel jehla→tuha) · translate(−J), složená s maticí volajícího
  const a = s * f.ca;
  const b = -s * f.sa;
  const c = s * f.sa;
  const d = s * f.ca;
  const e = -(a * f.J.x + c * f.J.y);
  const g = -(b * f.J.x + d * f.J.y);
  const M = ctx.getTransform();
  ctx.setTransform(
    M.a * a + M.c * b, M.b * a + M.d * b,
    M.a * c + M.c * d, M.b * c + M.d * d,
    M.a * e + M.c * g + M.e, M.b * e + M.d * g + M.f,
  );
  ctx.lineJoin = 'round';
  ctx.lineWidth = stroke;
  for (const p of pathsOf(f)) {
    ctx.fillStyle = p.fill;
    ctx.strokeStyle = p.fill;
    ctx.fill(p.path);
    ctx.stroke(p.path);
  }
  ctx.setTransform(M);
  return true;
}

/** Ladění: snímek, měřítko a poloha hrotu tuhy (lokálně, jehla v 0,0) pro dané w, armLen, exact. */
export function compassPoseDebug(w: number, armLen: number, exact = 1) {
  if (!frames) return null;
  const { f, k, s } = pose(w, armLen, exact);
  return { k, h: f.h, scale: s, lead: { x: s * f.D, y: 0 } };
}
