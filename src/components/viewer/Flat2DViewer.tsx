import React, { useRef, useEffect, useState, useCallback } from 'react';

interface Props {
  vertices: { x: number; y: number }[];
  params: Record<string, number>;
  paramIds: string[];
  /** Barva výplně (pastel) */
  fillColor?: string;
  /** Barva pozadí */
  backgroundColor?: string;
  /** Je to kruh? */
  isCircle?: boolean;
}

/**
 * 2D canvas prohlížeč rovinných útvarů.
 * Vykreslí tvar s výplní, okrajem a popisky rozměrů na hranách.
 */
export function Flat2DViewer({
  vertices,
  params,
  paramIds,
  fillColor = '#c7d2fe',
  backgroundColor = '#E0E7FF',
  isCircle = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dims, setDims] = useState({ w: 600, h: 400 });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, cw, ch);

    if (vertices.length < 2) return;

    // Bounding box
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const v of vertices) {
      if (v.x < minX) minX = v.x;
      if (v.y < minY) minY = v.y;
      if (v.x > maxX) maxX = v.x;
      if (v.y > maxY) maxY = v.y;
    }
    const shapeW = maxX - minX || 1;
    const shapeH = maxY - minY || 1;

    // Scale to fit canvas with padding
    const pad = 60;
    const scaleX = (cw - pad * 2) / shapeW;
    const scaleY = (ch - pad * 2) / shapeH;
    const scale = Math.min(scaleX, scaleY);

    const ox = (cw - shapeW * scale) / 2 - minX * scale;
    const oy = ch - (ch - shapeH * scale) / 2 + minY * scale; // flip Y

    const tx = (x: number) => ox + x * scale;
    const ty = (y: number) => oy - y * scale;

    // Draw grid
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
    ctx.lineWidth = 1;
    const gridSize = Math.max(1, Math.round(shapeW / 8));
    for (let gx = Math.floor(minX / gridSize) * gridSize; gx <= maxX + gridSize; gx += gridSize) {
      ctx.beginPath();
      ctx.moveTo(tx(gx), 0);
      ctx.lineTo(tx(gx), ch);
      ctx.stroke();
    }
    for (let gy = Math.floor(minY / gridSize) * gridSize; gy <= maxY + gridSize; gy += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, ty(gy));
      ctx.lineTo(cw, ty(gy));
      ctx.stroke();
    }

    // Draw shape
    ctx.beginPath();
    ctx.moveTo(tx(vertices[0].x), ty(vertices[0].y));
    for (let i = 1; i < vertices.length; i++) {
      ctx.lineTo(tx(vertices[i].x), ty(vertices[i].y));
    }
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = '#4338ca';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw vertices
    for (const v of vertices.slice(0, isCircle ? 0 : vertices.length)) {
      ctx.beginPath();
      ctx.arc(tx(v.x), ty(v.y), 4, 0, Math.PI * 2);
      ctx.fillStyle = '#4338ca';
      ctx.fill();
    }

    // Draw dimension labels
    if (!isCircle) {
      ctx.font = '600 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const drawn = new Set<string>();
      for (let i = 0; i < vertices.length; i++) {
        const a = vertices[i];
        const b = vertices[(i + 1) % vertices.length];
        const dist = Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
        const label = dist >= 10 ? `${Math.round(dist)} cm` : `${dist.toFixed(1)} cm`;
        if (drawn.has(label)) continue;
        drawn.add(label);
        const mx = (tx(a.x) + tx(b.x)) / 2;
        const my = (ty(a.y) + ty(b.y)) / 2;
        // Offset label outward
        const dx = ty(b.y) - ty(a.y);
        const dy = tx(b.x) - tx(a.x);
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const off = 18;
        const lx = mx + (dx / len) * off;
        const ly = my - (dy / len) * off;

        const tm = ctx.measureText(label);
        const bw = tm.width + 12;
        const bh = 20;
        ctx.fillStyle = 'rgba(255,255,255,0.92)';
        ctx.strokeStyle = 'rgba(67, 56, 202, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') ctx.roundRect(lx - bw / 2, ly - bh / 2, bw, bh, 4);
        else ctx.rect(lx - bw / 2, ly - bh / 2, bw, bh);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#312e81';
        ctx.fillText(label, lx, ly);
      }
    } else {
      // Circle: show radius line + label
      const r = params.r ?? 7;
      const cx = tx(r);
      const cy = ty(r);
      const rx = tx(2 * r);
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = '#4338ca';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(rx, cy);
      ctx.stroke();
      ctx.setLineDash([]);
      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#4338ca';
      ctx.fill();
      // Label
      const lx = (cx + rx) / 2;
      const ly = cy - 18;
      const label = `r = ${r >= 10 ? Math.round(r) : r.toFixed(1)} cm`;
      ctx.font = '600 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const tm = ctx.measureText(label);
      const bw = tm.width + 12;
      const bh = 20;
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.strokeStyle = 'rgba(67, 56, 202, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') ctx.roundRect(lx - bw / 2, ly - bh / 2, bw, bh, 4);
      else ctx.rect(lx - bw / 2, ly - bh / 2, bw, bh);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#312e81';
      ctx.fillText(label, lx, ly);
    }
  }, [vertices, params, paramIds, fillColor, backgroundColor, isCircle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;
    const resize = () => {
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 400;
      canvas.width = w;
      canvas.height = h;
      setDims({ w, h });
    };
    resize();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(container);
    return () => { if (ro) ro.disconnect(); };
  }, []);

  useEffect(() => { draw(); }, [draw, dims]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
