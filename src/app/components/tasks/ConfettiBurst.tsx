import { useEffect, useRef } from 'react';

const GREENS = ['#16a34a', '#22c55e', '#4ade80', '#86efac', '#15803d', '#bbf7d0'];
const DURATION_MS = 2200;

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  w: number;
  h: number;
  color: string;
  round: boolean;
};

/**
 * Výbuch zelených konfet přes celou stránku. Spustí se při každé změně `burstId`
 * (0 = nic). Konfety nezachytávají klikání a při „omezit pohyb“ se nevykreslí.
 */
export function ConfettiBurst({ burstId, origin }: { burstId: number; origin: () => { x: number; y: number } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originRef = useRef(origin);
  originRef.current = origin;

  useEffect(() => {
    if (!burstId) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();

    const { x: ox, y: oy } = originRef.current();
    const pieces: Piece[] = Array.from({ length: 160 }, () => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.6;
      const speed = 7 + Math.random() * 11;
      return {
        x: ox,
        y: oy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.35,
        w: 6 + Math.random() * 6,
        h: 4 + Math.random() * 5,
        color: GREENS[Math.floor(Math.random() * GREENS.length)]!,
        round: Math.random() < 0.25,
      };
    });

    const start = performance.now();
    let last = start;
    let frame = 0;
    const tick = (now: number) => {
      const dt = Math.min(2, (now - last) / 16.67);
      last = now;
      const t = (now - start) / DURATION_MS;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (t >= 1) return;
      ctx.globalAlpha = t < 0.7 ? 1 : 1 - (t - 0.7) / 0.3;
      for (const p of pieces) {
        p.vx *= 0.985 ** dt;
        p.vy = p.vy * 0.985 ** dt + 0.32 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.round) {
          ctx.beginPath();
          ctx.arc(0, 0, p.h / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Kosinus natočení dává dojem, že se lísteček otáčí v prostoru.
          ctx.fillRect(-p.w / 2, (-p.h / 2) * Math.abs(Math.cos(p.rot * 2)), p.w, p.h * Math.abs(Math.cos(p.rot * 2)));
        }
        ctx.restore();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [burstId]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
