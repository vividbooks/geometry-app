import React, { useRef, useEffect, useMemo } from 'react';
import type { ObjectDef } from '../../data/objects';

interface Props {
  object: ObjectDef;
  height: number;
  backgroundColor: string;
}

/**
 * Statický 2D náhled rovinného útvaru pro dlaždice na hlavní stránce.
 */
export function Tile2DPreview({ object, height, backgroundColor }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const defaultParams = useMemo(
    () => object.parameterDefs.reduce((acc, d) => ({ ...acc, [d.id]: d.defaultValue }), {} as Record<string, number>),
    [object.parameterDefs]
  );

  const vertices = useMemo(
    () => (object.computeVertices2D ? object.computeVertices2D(defaultParams) : []),
    [object, defaultParams]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || vertices.length < 2) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth || 280;
      canvas.height = container.clientHeight || height;
    }

    const cw = canvas.width;
    const ch = canvas.height;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, cw, ch);

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const v of vertices) {
      if (v.x < minX) minX = v.x;
      if (v.y < minY) minY = v.y;
      if (v.x > maxX) maxX = v.x;
      if (v.y > maxY) maxY = v.y;
    }
    const sw = maxX - minX || 1;
    const sh = maxY - minY || 1;
    const pad = 24;
    const scale = Math.min((cw - pad * 2) / sw, (ch - pad * 2) / sh);
    const ox = (cw - sw * scale) / 2 - minX * scale;
    const oy = ch - (ch - sh * scale) / 2 + minY * scale;
    const tx = (x: number) => ox + x * scale;
    const ty = (y: number) => oy - y * scale;

    ctx.beginPath();
    ctx.moveTo(tx(vertices[0].x), ty(vertices[0].y));
    for (let i = 1; i < vertices.length; i++) ctx.lineTo(tx(vertices[i].x), ty(vertices[i].y));
    ctx.closePath();
    ctx.fillStyle = 'rgba(99, 102, 241, 0.18)';
    ctx.fill();
    ctx.strokeStyle = '#4338ca';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [vertices, backgroundColor, height]);

  return (
    <div className="w-full flex items-center justify-center" style={{ height, backgroundColor, overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height, display: 'block' }} />
    </div>
  );
}
