import React, { useRef, useEffect, useState, useCallback } from 'react';

// ===================== Types =====================

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface FaceData {
  vertices: Point3D[];
  colorIndex: number;
}

interface Props {
  sides: number;
  height: number;
  edgeLength: number;
  unfoldProgress: number; // 0.0 = 3D hranol, 1.0 = plochá síť
  isWireframe: boolean;
  onRotationChange?: (rotationX: number, rotationY: number) => void;
}

// ===================== Vector Math =====================

function sub(a: Point3D, b: Point3D): Point3D {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function vecNormalize(v: Point3D): Point3D {
  const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  if (len < 1e-10) return { x: 0, y: 0, z: 0 };
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}

function vecDot(a: Point3D, b: Point3D): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function vecCross(a: Point3D, b: Point3D): Point3D {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

/**
 * Rodrigues rotation: rotate `point` around an axis defined by
 * `origin` (point on axis) and `dir` (unit direction) by `angle` radians.
 */
function rotateAroundAxis(
  point: Point3D,
  origin: Point3D,
  dir: Point3D,
  angle: number
): Point3D {
  if (Math.abs(angle) < 1e-10) return { ...point };
  const p = sub(point, origin);
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const d = vecDot(p, dir);
  const cr = vecCross(dir, p);
  return {
    x: p.x * cosA + cr.x * sinA + dir.x * d * (1 - cosA) + origin.x,
    y: p.y * cosA + cr.y * sinA + dir.y * d * (1 - cosA) + origin.y,
    z: p.z * cosA + cr.z * sinA + dir.z * d * (1 - cosA) + origin.z,
  };
}

/** Global rotation around X axis (camera) */
function rotateXGlobal(point: Point3D, angle: number): Point3D {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: point.x, y: point.y * c - point.z * s, z: point.y * s + point.z * c };
}

/** Global rotation around Y axis (camera) */
function rotateYGlobal(point: Point3D, angle: number): Point3D {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: point.x * c + point.z * s, y: point.y, z: -point.x * s + point.z * c };
}

// ===================== Geometry: unfold faces =====================

/**
 * Compute all face geometries with unfolding applied.
 *
 * Layout: bottom base is the anchor (stays in place).
 * Each side face hinges around its shared bottom edge and swings outward.
 * The top base chain-unfolds through side face 0:
 *   Step A – rotate with side face 0 around its bottom hinge
 *   Step B – rotate around the (now moved) top edge of side face 0
 */
function computeUnfoldedFaces(
  sides: number,
  height: number,
  edgeLength: number,
  unfoldProgress: number
): FaceData[] {
  const baseRadius = edgeLength / (2 * Math.sin(Math.PI / sides));
  const SCALE = 8; // model-space units per cm
  const R = baseRadius * SCALE;
  const H = height * SCALE;

  // Generate bottom (y = +H/2) and top (y = -H/2) vertices
  const bottom: Point3D[] = [];
  const top: Point3D[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides;
    const cx = Math.cos(angle) * R;
    const cz = Math.sin(angle) * R;
    bottom.push({ x: cx, y: H / 2, z: cz });
    top.push({ x: cx, y: -H / 2, z: cz });
  }

  const unfoldAngle = unfoldProgress * (Math.PI / 2);
  const faces: FaceData[] = [];

  // --- 1. Bottom base (anchor – unchanged) ---
  faces.push({ vertices: bottom.map((v) => ({ ...v })), colorIndex: 0 });

  // --- 2. Side faces ---
  for (let i = 0; i < sides; i++) {
    const next = (i + 1) % sides;
    const hingeOrigin = bottom[i];
    const hingeDir = vecNormalize(sub(bottom[next], bottom[i]));

    const uTopI = rotateAroundAxis(top[i], hingeOrigin, hingeDir, unfoldAngle);
    const uTopNext = rotateAroundAxis(top[next], hingeOrigin, hingeDir, unfoldAngle);

    faces.push({
      vertices: [bottom[i], bottom[next], uTopNext, uTopI],
      colorIndex: i + 2,
    });
  }

  // --- 3. Top base (chain unfold via side face 0) ---
  // Step A: rotate all top-base vertices around side face 0's bottom hinge
  const h0Origin = bottom[0];
  const h0Dir = vecNormalize(sub(bottom[1], bottom[0]));
  const topAfterA = top.map((v) => rotateAroundAxis(v, h0Origin, h0Dir, unfoldAngle));

  // Step B: rotate around the unfolded top edge of side face 0
  const hBOrigin = topAfterA[0];
  const hBDir = vecNormalize(sub(topAfterA[1], topAfterA[0]));
  const topFinal = topAfterA.map((v) => rotateAroundAxis(v, hBOrigin, hBDir, unfoldAngle));

  // Top face (reversed winding for consistent rendering)
  faces.push({ vertices: topFinal.slice().reverse(), colorIndex: 1 });

  return faces;
}

// ===================== Component =====================

const COLOR_PALETTE = [
  '#4263f5', // Blue       – bottom base
  '#ff5c7a', // Pink/Red   – top base
  '#00e0d1', // Turquoise  – side 0
  '#1f316f', // Dark Blue  – side 1
  '#ff9f43', // Orange     – side 2
  '#7a1f25', // Dark Red   – side 3
  '#e8b3e8', // Light Pink – side 4
  '#1f9f7a', // Green      – side 5
  '#5a9fff', // Light Blue – side 6
  '#e74c5a', // Red        – side 7
  '#4263f5', // Blue       – side 8
  '#555555', // Gray       – side 9
];

export function Prism3D({
  sides,
  height,
  edgeLength,
  unfoldProgress,
  isWireframe,
  onRotationChange,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: 0.4, y: 0.6 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const [forceRedraw, setForceRedraw] = useState(0);

  // ── Drawing ──────────────────────────────────────────────────

  const drawPrism = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;

    // Clear
    ctx.fillStyle = '#EFF1F8';
    ctx.fillRect(0, 0, cw, ch);
    if (cw === 0 || ch === 0) return;

    // 1. Compute faces with unfolding
    const facesData = computeUnfoldedFaces(sides, height, edgeLength, unfoldProgress);

    // 2. Camera: lerp between user rotation and top-down (rotX = -π/2, rotY = 0)
    const effRotX = rotation.x * (1 - unfoldProgress) + (-Math.PI / 2) * unfoldProgress;
    const effRotY = rotation.y * (1 - unfoldProgress);

    // 3. Apply camera rotation to every vertex
    const rotatedFaces = facesData.map((face) => ({
      colorIndex: face.colorIndex,
      verts: face.vertices.map((v) => rotateYGlobal(rotateXGlobal(v, effRotX), effRotY)),
    }));

    // 4. Stable scale: 3-D bounding sphere (rotation-invariant)
    let cx3 = 0;
    let cy3 = 0;
    let cz3 = 0;
    let count = 0;
    for (const f of facesData) {
      for (const v of f.vertices) {
        cx3 += v.x;
        cy3 += v.y;
        cz3 += v.z;
        count++;
      }
    }
    cx3 /= count;
    cy3 /= count;
    cz3 /= count;

    let maxR = 0;
    for (const f of facesData) {
      for (const v of f.vertices) {
        const dx = v.x - cx3;
        const dy = v.y - cy3;
        const dz = v.z - cz3;
        maxR = Math.max(maxR, Math.sqrt(dx * dx + dy * dy + dz * dz));
      }
    }
    maxR = Math.max(maxR, 1);

    const projScale = Math.min(cw, ch) * 0.38 / maxR;

    // 5. Center on the projected centroid
    const centroid = rotateYGlobal(
      rotateXGlobal({ x: cx3, y: cy3, z: cz3 }, effRotX),
      effRotY
    );

    const project = (p: Point3D) => ({
      x: cw / 2 + (p.x - centroid.x) * projScale,
      y: ch / 2 + (p.y - centroid.y) * projScale,
    });

    // 6. Sort by average depth (painter's algorithm)
    const sorted = rotatedFaces
      .map((f) => ({
        ...f,
        avgZ: f.verts.reduce((s, v) => s + v.z, 0) / f.verts.length,
      }))
      .sort((a, b) => b.avgZ - a.avgZ);

    // 7. Render
    for (const { verts, colorIndex } of sorted) {
      const proj = verts.map((v) => project(v));

      ctx.beginPath();
      ctx.moveTo(proj[0].x, proj[0].y);
      for (let i = 1; i < proj.length; i++) {
        ctx.lineTo(proj[i].x, proj[i].y);
      }
      ctx.closePath();

      if (!isWireframe) {
        ctx.fillStyle = COLOR_PALETTE[colorIndex % COLOR_PALETTE.length];
        ctx.fill();
      }

      ctx.strokeStyle = isWireframe ? '#475569' : '#334155';
      ctx.lineWidth = isWireframe ? 2 : 1.5;
      ctx.stroke();
    }
  }, [sides, height, edgeLength, rotation, unfoldProgress, isWireframe, forceRedraw]);

  // ── Mouse interaction ────────────────────────────────────────

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouse.x;
    const dy = e.clientY - lastMouse.y;
    const newRot = {
      x: rotation.x + dy * 0.008,
      y: rotation.y + dx * 0.008,
    };
    setRotation(newRot);
    setLastMouse({ x: e.clientX, y: e.clientY });
    onRotationChange?.(newRot.x, newRot.y);
  };

  const handleMouseUp = () => setIsDragging(false);

  // ── Effects ──────────────────────────────────────────────────

  useEffect(() => {
    setForceRedraw((p) => p + 1);
  }, [sides, height, edgeLength, unfoldProgress, isWireframe]);

  useEffect(() => {
    const animate = () => {
      drawPrism();
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [drawPrism]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resizeObserver = new ResizeObserver(() => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        setForceRedraw((p) => p + 1);
      }
    });
    const container = canvas.parentElement;
    if (container) {
      resizeObserver.observe(container);
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
    return () => resizeObserver.disconnect();
  }, []);

  // ── Render ───────────────────────────────────────────────────

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ minHeight: '400px', backgroundColor: '#EFF1F8' }}
    />
  );
}
