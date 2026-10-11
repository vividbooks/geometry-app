/**
 * Kružítko vymodelované v Blenderu a převedené na vektorové snímky:
 * public/kruzitko/kruzitko.json — 51 snímků, polovina úhlu ramen `h` 0° → 75° po 1,5°
 * (snímek 0 = zavřené, hroty se dotýkají; kamera se zároveň pokládá z pohledu shora do boku).
 * Každý snímek: polygony [barva z palety, x0, y0, x1, y1, …] v jednotkách `unit` px snímku 700×700,
 * hrot jehly `j` a hrot tuhy `t` v px snímku.
 *
 * Kreslení: snímek podle rozevření (h ≈ asin(w / 2·armLen)), měřítko tak, aby vzdálenost hrotů = w,
 * otočení tak, aby jehla→tuha mířila po ose +x, posun hrotu jehly do (0,0).
 * Data se načtou líně při prvním kreslení; do té doby se kružítko nekreslí.
 */

type Frame = { h: number; j: [number, number]; t: [number, number]; p: number[][] };
type Data = { unit: number; stroke: number; pal: string[]; frames: Frame[] };
type Built = {
  h: number;
  J: { x: number; y: number };
  /** vzdálenost hrotů v px snímku */
  D: number;
  /** úhel vektoru jehla→tuha ve snímku */
  ang: number;
  /** zdánlivá délka ramene v px snímku (D = 2·g·sin h) */
  g: number;
  src: number[][];
  paths: { fill: string; path: Path2D }[] | null;
};

/** Podíl výšky kresby a délky ramene (typicky 0,8–0,9 ve střední části rozevírání). */
const HEIGHT_PER_ARM = 0.85;
/** Nejmenší polovina úhlu ramen při volbě velikosti (pro malé r se kružítko spíš zmenší). */
const MIN_HALF_DEG = 10;
/** Krok snímků (polovina úhlu ramen, °). */
const STEP_DEG = 1.5;

const deg = Math.PI / 180;
let frames: Built[] | null = null;
let palette: string[] = [];
let unit = 0.1;
let stroke = 0.6;
let loading: Promise<void> | null = null;

/** Spustí (jednou) načtení snímků. */
export function loadCompassArt(): Promise<void> {
  if (loading) return loading;
  const base: string = (import.meta as any).env?.BASE_URL ?? '/';
  loading = fetch(`${base.replace(/\/?$/, '/')}kruzitko/kruzitko.json`)
    .then(r => {
      if (!r.ok) throw new Error(`kruzitko.json ${r.status}`);
      return r.json() as Promise<Data>;
    })
    .then(d => {
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
          ang: D > 1e-6 ? Math.atan2(dy, dx) : 0,
          g: f.h > 0 ? D / (2 * Math.sin(f.h * deg)) : 0,
          src: f.p,
          paths: null,
        };
      });
      if (list.length > 1 && !list[0].g) list[0].g = list[1].g;
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
    f.paths = f.src.map(p => {
      const path = new Path2D();
      path.moveTo(p[1] * unit, p[2] * unit);
      for (let k = 3; k < p.length; k += 2) path.lineTo(p[k] * unit, p[k + 1] * unit);
      path.closePath();
      return { fill: palette[p[0]], path };
    });
    f.src = [];
  }
  return f.paths;
};

/** Snímek a měřítko pro rozevření w, rameno armLen a přesnost exact. */
const pose = (w: number, armLen: number, exact: number) => {
  const list = frames!;
  const sin = Math.min(1, Math.max(0, w / (2 * Math.max(armLen, 1e-6))));
  const k = Math.max(0, Math.min(list.length - 1, Math.round(Math.asin(sin) / deg / STEP_DEG)));
  const f = list[k];
  const sL = armLen / f.g;
  let s = sL;
  if (f.D > 1e-6 && w > 0) s = sL * Math.pow(w / f.D / sL, Math.max(0, Math.min(1, exact)));
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
  ctx.save();
  ctx.scale(s, s);
  ctx.rotate(-f.ang);
  ctx.translate(-f.J.x, -f.J.y);
  ctx.lineJoin = 'round';
  ctx.lineWidth = stroke;
  for (const p of pathsOf(f)) {
    ctx.fillStyle = p.fill;
    ctx.strokeStyle = p.fill;
    ctx.fill(p.path);
    ctx.stroke(p.path);
  }
  ctx.restore();
  return true;
}

/** Ladění: snímek, měřítko a poloha hrotu tuhy (lokálně, jehla v 0,0) pro dané w, armLen, exact. */
export function compassPoseDebug(w: number, armLen: number, exact = 1) {
  if (!frames) return null;
  const { f, k, s } = pose(w, armLen, exact);
  return { k, h: f.h, scale: s, lead: { x: s * f.D, y: 0 } };
}
