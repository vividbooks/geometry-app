import React, { useRef, useEffect, useMemo } from 'react';
import type { Point3D, FaceData } from '../geometry/shared';
import { rotateXGlobal, rotateYGlobal } from '../geometry/shared';
import type { ObjectDef } from '../../data/objects';

/** Z barvy dlaždice vygeneruje paletu odstínů pro 3D objekt (stejný tón, různé světlosti/sytosti) */
function paletteFromTileColor(hex: string): string[] {
  const h = hex.replace(/^#/, '');
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  }
  let hue = 0;
  if (max !== min) {
    const d = max - min;
    if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) hue = ((b - r) / d + 2) / 6;
    else hue = ((r - g) / d + 4) / 6;
  }
  hue *= 360;
  const hsl = (h: number, s: number, l: number) => {
    const hh = ((h % 360) + 360) % 360 / 360;
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const t = (c: number) => {
      let t = c;
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const rr = Math.round(t(hh + 1/3) * 255);
    const gg = Math.round(t(hh) * 255);
    const bb = Math.round(t(hh - 1/3) * 255);
    return `rgb(${rr},${gg},${bb})`;
  };
  const baseS = Math.min(1, s * 1.4);
  const baseL = l;
  return [
    hsl(hue, baseS * 0.5, Math.min(0.95, baseL + 0.15)),
    hsl(hue, baseS * 0.7, Math.min(0.9, baseL + 0.08)),
    hsl(hue, baseS, baseL),
    hsl(hue, Math.min(1, baseS * 1.1), Math.max(0.2, baseL - 0.08)),
    hsl(hue, Math.min(1, baseS * 1.2), Math.max(0.15, baseL - 0.15)),
    hsl(hue, baseS * 0.8, Math.max(0.25, baseL - 0.1)),
    hsl(hue, baseS * 0.6, Math.min(0.85, baseL + 0.1)),
    hsl(hue, baseS * 0.9, Math.max(0.3, baseL - 0.05)),
  ];
}

interface Props {
  object: ObjectDef;
  /** Výška oblasti v px */
  height: number;
  /** Barva pozadí (např. object.color) – podle ní se ladí barvy 3D objektu */
  backgroundColor: string;
}

export function Tile3DPreview({ object, height, backgroundColor }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef({ x: 0.35, y: 0.5 });
  const rafRef = useRef<number>();

  const colorPalette = useMemo(
    () => paletteFromTileColor(backgroundColor),
    [backgroundColor]
  );

  const defaultParams = useMemo(
    () =>
      object.parameterDefs.reduce(
        (acc, d) => ({ ...acc, [d.id]: d.defaultValue }),
        {} as Record<string, number>
      ),
    [object.parameterDefs]
  );

  const facesData = useMemo(
    () => object.computeFaces(defaultParams, 0),
    [object, defaultParams]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = canvas.parentElement;
    const setSize = () => {
      if (container) {
        const w = container.clientWidth || 280;
        const h = container.clientHeight || height;
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
      }
    };
    setSize();
    const ro = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(setSize)
      : null;
    if (ro && container) ro.observe(container);

    let cw = canvas.width;
    let ch = canvas.height;

    const draw = () => {
      if (!canvasRef.current || !ctx) return;
      cw = canvas.width;
      ch = canvas.height;
      if (cw === 0 || ch === 0) return;

      const rot = rotationRef.current;
      const effRotX = rot.x;
      const effRotY = rot.y;

      const rotatedFaces = facesData.map((face: FaceData) => ({
        colorIndex: face.colorIndex,
        verts: face.vertices.map((v) => rotateYGlobal(rotateXGlobal(v, effRotX), effRotY)),
      }));

      let cx3 = 0, cy3 = 0, cz3 = 0, count = 0;
      for (const f of facesData) {
        for (const v of f.vertices) {
          cx3 += v.x; cy3 += v.y; cz3 += v.z; count++;
        }
      }
      if (count === 0) return;
      cx3 /= count; cy3 /= count; cz3 /= count;

      const REF_RADIUS = 50;
      const baseScale = Math.min(cw, ch) * 0.26 / REF_RADIUS;
      const centroid = rotateYGlobal(rotateXGlobal({ x: cx3, y: cy3, z: cz3 }, effRotX), effRotY);
      const centerX = cw / 2;
      const centerY = ch / 2;
      const project = (p: Point3D) => ({
        x: centerX + (p.x - centroid.x) * baseScale,
        y: centerY + (p.y - centroid.y) * baseScale,
      });

      const sorted = rotatedFaces
        .map((f) => ({ ...f, avgZ: f.verts.reduce((s, v) => s + v.z, 0) / f.verts.length }))
        .sort((a, b) => b.avgZ - a.avgZ);

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, cw, ch);

      for (const { verts, colorIndex } of sorted) {
        const proj = verts.map((v) => project(v));
        ctx.beginPath();
        ctx.moveTo(proj[0].x, proj[0].y);
        for (let i = 1; i < proj.length; i++) ctx.lineTo(proj[i].x, proj[i].y);
        ctx.closePath();
        ctx.fillStyle = colorPalette[colorIndex % colorPalette.length];
        ctx.fill();
        ctx.strokeStyle = 'rgba(78, 88, 113, 0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const animate = () => {
      rotationRef.current.y += 0.004;
      draw();
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (ro && container) ro.disconnect();
    };
  }, [facesData, backgroundColor, height, colorPalette]);

  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ height, backgroundColor, position: 'relative', overflow: 'hidden' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height,
          display: 'block',
        }}
      />
    </div>
  );
}
