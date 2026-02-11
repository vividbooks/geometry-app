import { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useIsMobile } from './ui/use-mobile';
import { ConstructionControlPanel } from './ConstructionControlPanel';

interface Point {
  x: number;
  y: number;
}

interface ConstructionStep {
  id: number;
  title: string;
  description: string;
  draw: (ctx: CanvasRenderingContext2D, scale: number, offset: Point, pointA: Point, pointB: Point, pointC: Point, animProgress: number, currentStep: number, drawingStepId: number) => void;
}

interface AxialSymmetryConstructionProps {
  onBack: () => void;
  darkMode: boolean;
  onDarkModeChange: (dark: boolean) => void;
}

export function AxialSymmetryConstruction({ onBack, darkMode, onDarkModeChange }: AxialSymmetryConstructionProps) {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bufferCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const [currentStep, setCurrentStep] = useState(0);
  const [scale, setScale] = useState(isMobile ? 0.15 : 0.5);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Point>({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 1920, height: 1080 });
  const [animProgress, setAnimProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);
  
  // Dynamické body trojúhelníku ABC
  const [pointA, setPointA] = useState<Point>({ x: 600, y: 700 });
  const [pointB, setPointB] = useState<Point>({ x: 1100, y: 900 });
  const [pointC, setPointC] = useState<Point>({ x: 800, y: 400 });
  const [draggedPoint, setDraggedPoint] = useState<'A' | 'B' | 'C' | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<'A' | 'B' | 'C' | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Osa souměrnosti x - svislá červená čára napravo od trojúhelníka
  const axisX = 1400;
  
  // Pinch-to-zoom state
  const [isPinching, setIsPinching] = useState(false);
  const [initialPinchDistance, setInitialPinchDistance] = useState(0);
  const [initialPinchScale, setInitialPinchScale] = useState(1);
  const [pinchCenter, setPinchCenter] = useState<Point>({ x: 0, y: 0 });

  // Inicializace buffer canvasu
  useEffect(() => {
    if (!bufferCanvasRef.current) {
      bufferCanvasRef.current = document.createElement('canvas');
    }
  }, []);

  // Pravítko
  const rulerImageRef = useRef<HTMLImageElement | null>(null);
  const [rulerLoaded, setRulerLoaded] = useState(false);

  // Načtení SVG pravítka
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      rulerImageRef.current = img;
      setRulerLoaded(true);
    };
    img.onerror = () => {
      console.error('Failed to load ruler image');
    };
    img.src = 'https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/pravitko4.svg';
  }, []);

  // Kružítko
  const compassImageRef = useRef<HTMLImageElement | null>(null);
  const [compassLoaded, setCompassLoaded] = useState(false);

  // Načtení SVG kružítka
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      compassImageRef.current = img;
      setCompassLoaded(true);
    };
    img.onerror = () => {
      console.error('Failed to load compass image');
    };
    img.src = 'https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/kruzitko.svg';
  }, []);

  // Převod souřadnic z canvas na world souřadnice
  const screenToWorld = (screenX: number, screenY: number): Point => {
    return {
      x: (screenX - offset.x) / scale,
      y: (screenY - offset.y) / scale
    };
  };

  // Zjištění, zda je myš nad bodem
  const isPointHovered = (point: Point, mouseWorld: Point, threshold: number = 15): boolean => {
    const dx = point.x - mouseWorld.x;
    const dy = point.y - mouseWorld.y;
    return Math.sqrt(dx * dx + dy * dy) < threshold;
  };

  // Zjištění, zda je myš nad labelem bodu (v screen space)
  const isLabelHovered = (point: Point, mouseScreen: Point, labelOffset: { x: number, y: number }): boolean => {
    const screenX = point.x * scale + offset.x;
    const screenY = point.y * scale + offset.y;
    
    const labelX = screenX + labelOffset.x;
    const labelY = screenY + labelOffset.y;
    
    const labelRadius = 20;
    
    const dx = mouseScreen.x - labelX;
    const dy = mouseScreen.y - (labelY - 8);
    return Math.sqrt(dx * dx + dy * dy) < labelRadius;
  };

  // Funkce pro vycentrování konstrukce - centrovat osu x
  const centerView = () => {
    if (!canvasSize.width || !canvasSize.height) return;
    
    // Střed canvasu
    const canvasCenterX = canvasSize.width / 2;
    const canvasCenterY = canvasSize.height / 2;
    
    // Střed scény po Y je průměr Y souřadnic trojúhelníku
    const centerY = (pointA.y + pointB.y + pointC.y) / 3;
    
    // Vypočítat offset tak, aby osa x byla ve středu canvasu horizontálně
    setOffset({
      x: canvasCenterX - axisX * scale,
      y: canvasCenterY - centerY * scale
    });
  };

  // Resize canvas při změně velikosti okna
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setCanvasSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Vycentrovat view při první inicializaci a při změně velikosti canvasu
  useEffect(() => {
    if (canvasSize.width > 0 && canvasSize.height > 0) {
      centerView();
      if (!isInitialized) {
        setIsInitialized(true);
      }
    }
  }, [canvasSize.width, canvasSize.height, isInitialized]);

  // Nastavit fyzické rozlišení canvasu (oddělené pro HiDPI)
  useEffect(() => {
    const canvas = canvasRef.current;
    const bufferCanvas = bufferCanvasRef.current;
    if (!canvas || !bufferCanvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasSize.width * dpr;
    canvas.height = canvasSize.height * dpr;
    bufferCanvas.width = canvasSize.width * dpr;
    bufferCanvas.height = canvasSize.height * dpr;
  }, [canvasSize]);

  // Animace
  useEffect(() => {
    if (!isAnimating) return;

    const animate = () => {
      setAnimProgress(prev => {
        if (prev >= 1) {
          setIsAnimating(false);
          return 1;
        }
        
        let increment = 0.008;
        
        return Math.min(prev + increment, 1);
      });
    };

    if (animProgress < 1) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else if (animProgress >= 1) {
      setIsAnimating(false);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAnimating, animProgress, currentStep]);

  // Kreslení mřížky
  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const gridSize = 20;
    // Méně výrazná mřížka
    ctx.strokeStyle = darkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(229, 231, 235, 0.5)';
    ctx.lineWidth = 1;

    // Vertikální čáry
    for (let x = 0; x <= canvasSize.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasSize.height);
      ctx.stroke();
    }

    // Horizontální čáry
    for (let y = 0; y <= canvasSize.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasSize.width, y);
      ctx.stroke();
    }
  };

  // Pomocné funkce pro kreslení
  const drawLabel = (
    ctx: CanvasRenderingContext2D,
    p: Point,
    label: string,
    color: string = '#000',
    offsetX: number = 12,
    offsetY: number = -12,
    dpr: number = 1
  ) => {
    ctx.save();
    
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    
    const screenX = p.x * scale + offset.x;
    const screenY = p.y * scale + offset.y;
    
    ctx.font = '600 22px Arial, sans-serif';
    const metrics = ctx.measureText(label);
    const textWidth = metrics.width;
    
    const bgX = screenX + offsetX + textWidth / 2;
    const bgY = screenY + offsetY - 8;
    const bgRadius = Math.max(textWidth, 16) / 2 + 6;
    
    ctx.fillStyle = darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(200, 200, 200, 0.35)';
    ctx.beginPath();
    ctx.arc(bgX, bgY, bgRadius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = color;
    ctx.fillText(label, screenX + offsetX, screenY + offsetY);
    
    ctx.restore();
  };

  const drawPoint = (
    ctx: CanvasRenderingContext2D,
    p: Point,
    label: string,
    color: string = '#000'
  ) => {
    ctx.fillStyle = darkMode ? 'rgba(75, 85, 99, 0.4)' : 'rgba(200, 200, 200, 0.3)';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = darkMode ? '#111827' : '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
    ctx.stroke();
  };

  const drawSegment = (
    ctx: CanvasRenderingContext2D,
    p1: Point,
    p2: Point,
    color: string = '#000',
    width: number = 2,
    progress: number = 1,
    withGlow: boolean = false
  ) => {
    let drawProgress = 0;
    if (progress <= 0.15) {
      drawProgress = 0;
    } else if (progress >= 0.85) {
      drawProgress = 1;
    } else {
      drawProgress = (progress - 0.15) / 0.7;
    }
    
    const currentP2 = {
      x: p1.x + (p2.x - p1.x) * drawProgress,
      y: p1.y + (p2.y - p1.y) * drawProgress
    };
    
    const isDrawing = drawProgress < 1;
    
    // Žluté neonové podsvícení při kreslení
    if (withGlow && isDrawing && drawProgress > 0) {
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.5)';
      ctx.lineWidth = width * 10;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(currentP2.x, currentP2.y);
      ctx.stroke();
    }
    
    // Hlavní čára
    ctx.strokeStyle = color;
    ctx.lineWidth = isDrawing && withGlow ? width * 1.5 : width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(currentP2.x, currentP2.y);
    ctx.stroke();
  };

  // Funkce pro vykreslení kružítka
  // Funkce pro vykreslení pravítka
  const drawRuler = (
    ctx: CanvasRenderingContext2D,
    p1: Point,
    p2: Point,
    progress: number,
    rulerImage: HTMLImageElement | null
  ) => {
    if (!showCaptions || !rulerImage) return;
    
    let rulerAlpha = 0;
    
    if (progress < 0.15) {
      rulerAlpha = progress / 0.15;
    } else if (progress >= 0.15 && progress <= 0.85) {
      rulerAlpha = 1;
    } else if (progress > 0.85 && progress < 1) {
      rulerAlpha = (1 - progress) / 0.15;
    } else {
      return;
    }
    
    const rulerLength = 800;
    const rulerWidth = 400;
    
    ctx.save();
    
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    
    ctx.translate(midX, midY);
    ctx.rotate(angle);
    ctx.globalAlpha = rulerAlpha;
    
    ctx.drawImage(
      rulerImage,
      -rulerLength / 2,
      -rulerWidth / 2,
      rulerLength,
      rulerWidth
    );
    
    ctx.restore();
  };

  // Funkce pro vykreslení kružítka s fade in/out
  const drawCompass = (
    ctx: CanvasRenderingContext2D,
    center: Point,
    r: number,
    progress: number,
    angle: number
  ) => {
    if (!showCaptions || !compassLoaded || !compassImageRef.current) return;
    
    let compassAlpha = 0;
    
    if (progress < 0.15) {
      compassAlpha = progress / 0.15;
    } else if (progress >= 0.15 && progress <= 0.85) {
      compassAlpha = 1;
    } else if (progress > 0.85 && progress < 1) {
      compassAlpha = (1 - progress) / 0.15;
    } else {
      return;
    }
    
    const compass = compassImageRef.current;
    
    const compassWidth = r;
    const compassHeight = r;
    
    ctx.save();
    
    ctx.translate(center.x, center.y);
    ctx.rotate(angle);
    ctx.globalAlpha = compassAlpha;
    
    ctx.drawImage(compass, 0, -compassHeight, compassWidth, compassHeight);
    
    ctx.restore();
  };

  // Funkce pro vykreslení kružnice
  const drawCircle = (
    ctx: CanvasRenderingContext2D,
    center: Point,
    radius: number,
    color: string = '#000',
    width: number = 2,
    progress: number = 1,
    withGlow: boolean = false
  ) => {
    let drawProgress = 0;
    if (progress <= 0.15) {
      drawProgress = 0;
    } else if (progress >= 0.85) {
      drawProgress = 1;
    } else {
      drawProgress = (progress - 0.15) / 0.7;
    }

    const isDrawing = drawProgress > 0 && drawProgress < 1;
    const endAngle = drawProgress * Math.PI * 2;

    if (withGlow && isDrawing && drawProgress > 0) {
      ctx.strokeStyle = `rgba(250, 204, 21, 0.5)`;
      ctx.lineWidth = width * 10;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius, 0, endAngle);
      ctx.stroke();
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = isDrawing && withGlow ? width * 1.5 : width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, endAngle);
    ctx.stroke();
  };

  // Definice kroků konstrukce (11 kroků: 0-10)
  const steps: ConstructionStep[] = [
    {
      id: 0,
      title: 'Zadání úlohy',
      description: 'Máme trojúhelník ABC a osu souměrnosti x. Najdeme obraz trojúhelníku v osové souměrnosti. Body můžeš přesouvat myší!',
      draw: (ctx, s, off, pA, pB, pC, progress, currentStep, drawingStepId) => {
        const dpr = window.devicePixelRatio || 1;
        const triangleColor = darkMode ? '#e5e7eb' : '#1f2937';
        const axisColor = darkMode ? '#fca5a5' : '#ef4444'; // Červená barva pro osu
        
        // Osa souměrnosti x (nekonečná svislá čára)
        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'butt';
        ctx.beginPath();
        ctx.moveTo(axisX, -5000); // Začátek daleko nahoře
        ctx.lineTo(axisX, 5000);   // Konec daleko dole
        ctx.stroke();
        
        // Popisek osy
        drawLabel(ctx, { x: axisX, y: 200 }, 'x', axisColor, 15, 0, dpr);
        
        // Trojúhelník ABC
        drawSegment(ctx, pA, pB, triangleColor, 4);
        drawSegment(ctx, pB, pC, triangleColor, 4);
        drawSegment(ctx, pC, pA, triangleColor, 4);
        
        // Body
        drawPoint(ctx, pA, 'A', triangleColor);
        drawPoint(ctx, pB, 'B', triangleColor);
        drawPoint(ctx, pC, 'C', triangleColor);
        
        // Popisky bodů
        drawLabel(ctx, pA, 'A', triangleColor, -25, -12, dpr);
        drawLabel(ctx, pB, 'B', triangleColor, 12, 12, dpr);
        drawLabel(ctx, pC, 'C', triangleColor, -25, -12, dpr);
      }
    },
    {
      id: 1,
      title: 'Narýsuj kolmici od bodu A',
      description: 'Od bodu A narýsuj vodorovnou čáru kolmou na osu x.',
      draw: (ctx, s, off, pA, pB, pC, progress, currentStep, drawingStepId) => {
        const dpr = window.devicePixelRatio || 1;
        const triangleColor = darkMode ? '#e5e7eb' : '#1f2937';
        const axisColor = darkMode ? '#fca5a5' : '#ef4444';
        const perpendicularColor = darkMode ? '#4ade80' : '#22c55e'; // Zelená
        
        // Osa souměrnosti x
        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'butt';
        ctx.beginPath();
        ctx.moveTo(axisX, -5000);
        ctx.lineTo(axisX, 5000);
        ctx.stroke();
        
        // Popisek osy
        drawLabel(ctx, { x: axisX, y: 200 }, 'x', axisColor, 15, 0, dpr);
        
        // Trojúhelník ABC
        drawSegment(ctx, pA, pB, triangleColor, 4, 1, false);
        drawSegment(ctx, pB, pC, triangleColor, 4, 1, false);
        drawSegment(ctx, pC, pA, triangleColor, 4, 1, false);
        
        // Kolmice od A - začíná v A, jde doprava do nekonečna
        const pARight = { x: 5000, y: pA.y };
        drawSegment(ctx, pA, pARight, perpendicularColor, 3, progress, true);
        
        // Pravítko na ose X - dolní strana na pA.y (výška pravítka je 400px, střed -200px)
        const rulerY = pA.y - 200;
        const rulerP1 = { x: axisX - 400, y: rulerY };
        const rulerP2 = { x: axisX + 400, y: rulerY };
        
        drawRuler(ctx, rulerP1, rulerP2, progress, rulerImageRef.current);
        
        // Body
        drawPoint(ctx, pA, 'A', triangleColor);
        drawPoint(ctx, pB, 'B', triangleColor);
        drawPoint(ctx, pC, 'C', triangleColor);
        
        // Popisky bodů
        drawLabel(ctx, pA, 'A', triangleColor, -25, -12, dpr);
        drawLabel(ctx, pB, 'B', triangleColor, 12, 12, dpr);
        drawLabel(ctx, pC, 'C', triangleColor, -25, -12, dpr);
      }
    },
    {
      id: 2,
      title: 'Narýsuj kolmici od bodu B',
      description: 'Od bodu B narýsuj vodorovnou čáru kolmou na osu x.',
      draw: (ctx, s, off, pA, pB, pC, progress, currentStep, drawingStepId) => {
        const dpr = window.devicePixelRatio || 1;
        const triangleColor = darkMode ? '#e5e7eb' : '#1f2937';
        const axisColor = darkMode ? '#fca5a5' : '#ef4444';
        const perpendicularColor = darkMode ? '#4ade80' : '#22c55e'; // Zelená
        
        // Osa souměrnosti x
        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'butt';
        ctx.beginPath();
        ctx.moveTo(axisX, -5000);
        ctx.lineTo(axisX, 5000);
        ctx.stroke();
        
        // Popisek osy
        drawLabel(ctx, { x: axisX, y: 200 }, 'x', axisColor, 15, 0, dpr);
        
        // Trojúhelník ABC
        drawSegment(ctx, pA, pB, triangleColor, 4, 1, false);
        drawSegment(ctx, pB, pC, triangleColor, 4, 1, false);
        drawSegment(ctx, pC, pA, triangleColor, 4, 1, false);
        
        // Kolmice od A - hotová
        const pARight = { x: 5000, y: pA.y };
        drawSegment(ctx, pA, pARight, perpendicularColor, 3, 1, false);
        
        // Kolmice od B - kreslí se
        const pBRight = { x: 5000, y: pB.y };
        drawSegment(ctx, pB, pBRight, perpendicularColor, 3, progress, true);
        
        // Pravítko
        const rulerY = pB.y - 200;
        const rulerP1 = { x: axisX - 400, y: rulerY };
        const rulerP2 = { x: axisX + 400, y: rulerY };
        drawRuler(ctx, rulerP1, rulerP2, progress, rulerImageRef.current);
        
        // Body
        drawPoint(ctx, pA, 'A', triangleColor);
        drawPoint(ctx, pB, 'B', triangleColor);
        drawPoint(ctx, pC, 'C', triangleColor);
        
        // Popisky bodů
        drawLabel(ctx, pA, 'A', triangleColor, -25, -12, dpr);
        drawLabel(ctx, pB, 'B', triangleColor, 12, 12, dpr);
        drawLabel(ctx, pC, 'C', triangleColor, -25, -12, dpr);
      }
    },
    {
      id: 3,
      title: 'Narýsuj kolmici od bodu C',
      description: 'Od bodu C narýsuj vodorovnou čáru kolmou na osu x.',
      draw: (ctx, s, off, pA, pB, pC, progress, currentStep, drawingStepId) => {
        const dpr = window.devicePixelRatio || 1;
        const triangleColor = darkMode ? '#e5e7eb' : '#1f2937';
        const axisColor = darkMode ? '#fca5a5' : '#ef4444';
        const perpendicularColor = darkMode ? '#4ade80' : '#22c55e'; // Zelená
        
        // Osa souměrnosti x
        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'butt';
        ctx.beginPath();
        ctx.moveTo(axisX, -5000);
        ctx.lineTo(axisX, 5000);
        ctx.stroke();
        
        // Popisek osy
        drawLabel(ctx, { x: axisX, y: 200 }, 'x', axisColor, 15, 0, dpr);
        
        // Trojúhelník ABC
        drawSegment(ctx, pA, pB, triangleColor, 4, 1, false);
        drawSegment(ctx, pB, pC, triangleColor, 4, 1, false);
        drawSegment(ctx, pC, pA, triangleColor, 4, 1, false);
        
        // Kolmice od A - hotová
        const pARight = { x: 5000, y: pA.y };
        drawSegment(ctx, pA, pARight, perpendicularColor, 3, 1, false);
        
        // Kolmice od B - hotová
        const pBRight = { x: 5000, y: pB.y };
        drawSegment(ctx, pB, pBRight, perpendicularColor, 3, 1, false);
        
        // Kolmice od C - kreslí se
        const pCRight = { x: 5000, y: pC.y };
        drawSegment(ctx, pC, pCRight, perpendicularColor, 3, progress, true);
        
        // Pravítko
        const rulerY = pC.y - 200;
        const rulerP1 = { x: axisX - 400, y: rulerY };
        const rulerP2 = { x: axisX + 400, y: rulerY };
        drawRuler(ctx, rulerP1, rulerP2, progress, rulerImageRef.current);
        
        // Body
        drawPoint(ctx, pA, 'A', triangleColor);
        drawPoint(ctx, pB, 'B', triangleColor);
        drawPoint(ctx, pC, 'C', triangleColor);
        
        // Popisky bodů
        drawLabel(ctx, pA, 'A', triangleColor, -25, -12, dpr);
        drawLabel(ctx, pB, 'B', triangleColor, 12, 12, dpr);
        drawLabel(ctx, pC, 'C', triangleColor, -25, -12, dpr);
      }
    },
    {
      id: 4,
      title: 'Změř vzdálenost bodu A od osy',
      description: 'Nastav kružítko na vzdálenost od bodu A k ose x.',
      draw: (ctx, s, off, pA, pB, pC, progress, currentStep, drawingStepId) => {
        const dpr = window.devicePixelRatio || 1;
        const triangleColor = darkMode ? '#e5e7eb' : '#1f2937';
        const axisColor = darkMode ? '#fca5a5' : '#ef4444';
        const perpendicularColor = darkMode ? '#4ade80' : '#22c55e'; // Zelená
        
        // Osa souměrnosti x
        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'butt';
        ctx.beginPath();
        ctx.moveTo(axisX, -5000);
        ctx.lineTo(axisX, 5000);
        ctx.stroke();
        
        // Popisek osy
        drawLabel(ctx, { x: axisX, y: 200 }, 'x', axisColor, 15, 0, dpr);
        
        // Trojúhelník ABC
        drawSegment(ctx, pA, pB, triangleColor, 4, 1, false);
        drawSegment(ctx, pB, pC, triangleColor, 4, 1, false);
        drawSegment(ctx, pC, pA, triangleColor, 4, 1, false);
        
        // Všechny kolmice hotové
        const pARight = { x: 5000, y: pA.y };
        drawSegment(ctx, pA, pARight, perpendicularColor, 3, 1, false);
        const pBRight = { x: 5000, y: pB.y };
        drawSegment(ctx, pB, pBRight, perpendicularColor, 3, 1, false);
        const pCRight = { x: 5000, y: pC.y };
        drawSegment(ctx, pC, pCRight, perpendicularColor, 3, 1, false);
        
        // Průsečík A s osou
        const circleCenterA = { x: axisX, y: pA.y };
        const radiusA = Math.abs(pA.x - axisX);
        
        // Kružítko měřící - hrot v bodě A, směřuje k ose (statické)
        const compassAngle = Math.atan2(circleCenterA.y - pA.y, circleCenterA.x - pA.x);
        drawCompass(ctx, pA, radiusA, progress, compassAngle);
        
        // Body
        drawPoint(ctx, pA, 'A', triangleColor);
        drawPoint(ctx, pB, 'B', triangleColor);
        drawPoint(ctx, pC, 'C', triangleColor);
        
        // Popisky bodů
        drawLabel(ctx, pA, 'A', triangleColor, -25, -12, dpr);
        drawLabel(ctx, pB, 'B', triangleColor, 12, 12, dpr);
        drawLabel(ctx, pC, 'C', triangleColor, -25, -12, dpr);
      }
    },
    {
      id: 5,
      title: 'Přenes vzdálenost a vytvoř bod A\'',
      description: 'Zapíchni kružítko do průsečíku na ose a přenes vzdálenost na druhou stranu. Vytvoř bod A\'.',
      draw: (ctx, s, off, pA, pB, pC, progress, currentStep, drawingStepId) => {
        const dpr = window.devicePixelRatio || 1;
        const triangleColor = darkMode ? '#e5e7eb' : '#1f2937';
        const axisColor = darkMode ? '#fca5a5' : '#ef4444';
        const perpendicularColor = darkMode ? '#4ade80' : '#22c55e'; // Zelená
        const mirroredColor = darkMode ? '#60a5fa' : '#3b82f6'; // Modrá pro zrcadlený trojúhelník
        
        // Osa souměrnosti x
        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'butt';
        ctx.beginPath();
        ctx.moveTo(axisX, -5000);
        ctx.lineTo(axisX, 5000);
        ctx.stroke();
        
        // Popisek osy
        drawLabel(ctx, { x: axisX, y: 200 }, 'x', axisColor, 15, 0, dpr);
        
        // Trojúhelník ABC
        drawSegment(ctx, pA, pB, triangleColor, 4, 1, false);
        drawSegment(ctx, pB, pC, triangleColor, 4, 1, false);
        drawSegment(ctx, pC, pA, triangleColor, 4, 1, false);
        
        // Všechny kolmice hotové
        const pARight = { x: 5000, y: pA.y };
        drawSegment(ctx, pA, pARight, perpendicularColor, 3, 1, false);
        const pBRight = { x: 5000, y: pB.y };
        drawSegment(ctx, pB, pBRight, perpendicularColor, 3, 1, false);
        const pCRight = { x: 5000, y: pC.y };
        drawSegment(ctx, pC, pCRight, perpendicularColor, 3, 1, false);
        
        // Průsečík A s osou
        const circleCenterA = { x: axisX, y: pA.y };
        const radiusA = Math.abs(pA.x - axisX);
        
        // Bod A' - zrcadlený obraz (napravo od osy)
        const pAPrime = { x: axisX + (axisX - pA.x), y: pA.y };
        
        // Zrcadlené kružítko - hrot na ose, směřuje napravo k bodu A'
        const compassAngle2 = Math.atan2(pAPrime.y - circleCenterA.y, pAPrime.x - circleCenterA.x);
        drawCompass(ctx, circleCenterA, radiusA, progress, compassAngle2);
        
        // Body
        drawPoint(ctx, pA, 'A', triangleColor);
        drawPoint(ctx, pB, 'B', triangleColor);
        drawPoint(ctx, pC, 'C', triangleColor);
        if (progress > 0.5) {
          drawPoint(ctx, pAPrime, 'A\'', mirroredColor);
        }
        
        // Popisky bodů
        drawLabel(ctx, pA, 'A', triangleColor, -25, -12, dpr);
        drawLabel(ctx, pB, 'B', triangleColor, 12, 12, dpr);
        drawLabel(ctx, pC, 'C', triangleColor, -25, -12, dpr);
        if (progress > 0.5) {
          drawLabel(ctx, pAPrime, 'A\'', mirroredColor, 12, -12, dpr);
        }
      }
    },
    {
      id: 6,
      title: 'Změř vzdálenost bodu B od osy',
      description: 'Nastav kružítko na vzdálenost od bodu B k ose x.',
      draw: (ctx, s, off, pA, pB, pC, progress, currentStep, drawingStepId) => {
        const dpr = window.devicePixelRatio || 1;
        const triangleColor = darkMode ? '#e5e7eb' : '#1f2937';
        const axisColor = darkMode ? '#fca5a5' : '#ef4444';
        const perpendicularColor = darkMode ? '#4ade80' : '#22c55e'; // Zelená
        const mirroredColor = darkMode ? '#60a5fa' : '#3b82f6'; // Modrá pro zrcadlený trojúhelník
        
        // Osa souměrnosti x
        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'butt';
        ctx.beginPath();
        ctx.moveTo(axisX, -5000);
        ctx.lineTo(axisX, 5000);
        ctx.stroke();
        
        // Popisek osy
        drawLabel(ctx, { x: axisX, y: 200 }, 'x', axisColor, 15, 0, dpr);
        
        // Trojúhelník ABC
        drawSegment(ctx, pA, pB, triangleColor, 4, 1, false);
        drawSegment(ctx, pB, pC, triangleColor, 4, 1, false);
        drawSegment(ctx, pC, pA, triangleColor, 4, 1, false);
        
        // Všechny kolmice hotové
        const pARight = { x: 5000, y: pA.y };
        drawSegment(ctx, pA, pARight, perpendicularColor, 3, 1, false);
        const pBRight = { x: 5000, y: pB.y };
        drawSegment(ctx, pB, pBRight, perpendicularColor, 3, 1, false);
        const pCRight = { x: 5000, y: pC.y };
        drawSegment(ctx, pC, pCRight, perpendicularColor, 3, 1, false);
        
        // Bod A' - už máme
        const pAPrime = { x: axisX + (axisX - pA.x), y: pA.y };
        drawPoint(ctx, pAPrime, 'A\'', mirroredColor);
        
        // Průsečík B s osou
        const circleCenterB = { x: axisX, y: pB.y };
        const radiusB = Math.abs(pB.x - axisX);
        
        // Kružítko měřící - hrot v bodě B, směřuje k ose (statické)
        const compassAngleB = Math.atan2(circleCenterB.y - pB.y, circleCenterB.x - pB.x);
        drawCompass(ctx, pB, radiusB, progress, compassAngleB);
        
        // Body
        drawPoint(ctx, pA, 'A', triangleColor);
        drawPoint(ctx, pB, 'B', triangleColor);
        drawPoint(ctx, pC, 'C', triangleColor);
        
        // Popisky bodů
        drawLabel(ctx, pA, 'A', triangleColor, -25, -12, dpr);
        drawLabel(ctx, pB, 'B', triangleColor, 12, 12, dpr);
        drawLabel(ctx, pC, 'C', triangleColor, -25, -12, dpr);
        drawLabel(ctx, pAPrime, 'A\'', mirroredColor, 12, -12, dpr);
      }
    },
    {
      id: 7,
      title: 'Přenes vzdálenost a vytvoř bod B\'',
      description: 'Zapíchni kružítko do průsečíku na ose a přenes vzdálenost na druhou stranu. Vytvoř bod B\'.',
      draw: (ctx, s, off, pA, pB, pC, progress, currentStep, drawingStepId) => {
        const dpr = window.devicePixelRatio || 1;
        const triangleColor = darkMode ? '#e5e7eb' : '#1f2937';
        const axisColor = darkMode ? '#fca5a5' : '#ef4444';
        const perpendicularColor = darkMode ? '#4ade80' : '#22c55e'; // Zelená
        const mirroredColor = darkMode ? '#60a5fa' : '#3b82f6'; // Modrá pro zrcadlený trojúhelník
        
        // Osa souměrnosti x
        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'butt';
        ctx.beginPath();
        ctx.moveTo(axisX, -5000);
        ctx.lineTo(axisX, 5000);
        ctx.stroke();
        
        // Popisek osy
        drawLabel(ctx, { x: axisX, y: 200 }, 'x', axisColor, 15, 0, dpr);
        
        // Trojúhelník ABC
        drawSegment(ctx, pA, pB, triangleColor, 4, 1, false);
        drawSegment(ctx, pB, pC, triangleColor, 4, 1, false);
        drawSegment(ctx, pC, pA, triangleColor, 4, 1, false);
        
        // Kolmice od A - hotová
        const pARight = { x: 5000, y: pA.y };
        drawSegment(ctx, pA, pARight, perpendicularColor, 3, 1, false);
        
        // Kolmice od B - hotová
        const pBRight = { x: 5000, y: pB.y };
        drawSegment(ctx, pB, pBRight, perpendicularColor, 3, 1, false);
        
        // Kolmice od C - aktuálně se kreslí
        const pCRight = { x: 5000, y: pC.y };
        drawSegment(ctx, pC, pCRight, perpendicularColor, 3, 1, false);
        
        const pAPrime = { x: axisX + (axisX - pA.x), y: pA.y };
        drawPoint(ctx, pAPrime, 'A\'', axisColor);
        
        const circleCenterB = { x: axisX, y: pB.y };
        const radiusB = Math.abs(pB.x - axisX);
        const pBPrime = { x: axisX + (axisX - pB.x), y: pB.y };
        const compassAngleB2 = Math.atan2(pBPrime.y - circleCenterB.y, pBPrime.x - circleCenterB.x);
        drawCompass(ctx, circleCenterB, radiusB, progress, compassAngleB2);
        
        if (progress > 0.5) {
          drawPoint(ctx, pBPrime, 'B\'', mirroredColor);
        }
        
        drawPoint(ctx, pA, 'A', triangleColor);
        drawPoint(ctx, pB, 'B', triangleColor);
        drawPoint(ctx, pC, 'C', triangleColor);
        
        drawLabel(ctx, pA, 'A', triangleColor, -25, -12, dpr);
        drawLabel(ctx, pB, 'B', triangleColor, 12, 12, dpr);
        drawLabel(ctx, pC, 'C', triangleColor, -25, -12, dpr);
        drawLabel(ctx, pAPrime, 'A\'', mirroredColor, 12, -12, dpr);
        if (progress > 0.5) {
          drawLabel(ctx, pBPrime, 'B\'', mirroredColor, 12, -12, dpr);
        }
      }
    },
    {
      id: 8,
      title: 'Změř vzdálenost bodu C od osy',
      description: 'Nastav kružítko na vzdálenost od bodu C k ose x.',
      draw: (ctx, s, off, pA, pB, pC, progress, currentStep, drawingStepId) => {
        const dpr = window.devicePixelRatio || 1;
        const triangleColor = darkMode ? '#e5e7eb' : '#1f2937';
        const axisColor = darkMode ? '#fca5a5' : '#ef4444';
        const perpendicularColor = darkMode ? '#4ade80' : '#22c55e'; // Zelená
        const mirroredColor = darkMode ? '#60a5fa' : '#3b82f6'; // Modrá pro zrcadlený trojúhelník
        
        // Osa souměrnosti x
        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'butt';
        ctx.beginPath();
        ctx.moveTo(axisX, -5000);
        ctx.lineTo(axisX, 5000);
        ctx.stroke();
        
        // Popisek osy
        drawLabel(ctx, { x: axisX, y: 200 }, 'x', axisColor, 15, 0, dpr);
        
        // Trojúhelník ABC
        drawSegment(ctx, pA, pB, triangleColor, 4, 1, false);
        drawSegment(ctx, pB, pC, triangleColor, 4, 1, false);
        drawSegment(ctx, pC, pA, triangleColor, 4, 1, false);
        
        // Všechny kolmice hotové
        const pARight = { x: 5000, y: pA.y };
        drawSegment(ctx, pA, pARight, perpendicularColor, 3, 1, false);
        const pBRight = { x: 5000, y: pB.y };
        drawSegment(ctx, pB, pBRight, perpendicularColor, 3, 1, false);
        const pCRight = { x: 5000, y: pC.y };
        drawSegment(ctx, pC, pCRight, perpendicularColor, 3, 1, false);
        
        // Body A' a B' - už máme
        const pAPrime = { x: axisX + (axisX - pA.x), y: pA.y };
        const pBPrime = { x: axisX + (axisX - pB.x), y: pB.y };
        drawPoint(ctx, pAPrime, 'A\'', mirroredColor);
        drawPoint(ctx, pBPrime, 'B\'', mirroredColor);
        
        // Průsečík C s osou
        const circleCenterC = { x: axisX, y: pC.y };
        const radiusC = Math.abs(pC.x - axisX);
        
        // Kružítko měřící - hrot v bodě C, směřuje k ose (statické)
        const compassAngleC = Math.atan2(circleCenterC.y - pC.y, circleCenterC.x - pC.x);
        drawCompass(ctx, pC, radiusC, progress, compassAngleC);
        
        // Body
        drawPoint(ctx, pA, 'A', triangleColor);
        drawPoint(ctx, pB, 'B', triangleColor);
        drawPoint(ctx, pC, 'C', triangleColor);
        
        // Popisky bodů
        drawLabel(ctx, pA, 'A', triangleColor, -25, -12, dpr);
        drawLabel(ctx, pB, 'B', triangleColor, 12, 12, dpr);
        drawLabel(ctx, pC, 'C', triangleColor, -25, -12, dpr);
        drawLabel(ctx, pAPrime, 'A\'', mirroredColor, 12, -12, dpr);
        drawLabel(ctx, pBPrime, 'B\'', mirroredColor, 12, -12, dpr);
      }
    },
    {
      id: 9,
      title: 'Přenes vzdálenost a vytvoř bod C\'',
      description: 'Zapíchni kružítko do průsečíku na ose a přenes vzdálenost na druhou stranu. Vytvoř bod C\'.',
      draw: (ctx, s, off, pA, pB, pC, progress, currentStep, drawingStepId) => {
        const dpr = window.devicePixelRatio || 1;
        const triangleColor = darkMode ? '#e5e7eb' : '#1f2937';
        const axisColor = darkMode ? '#fca5a5' : '#ef4444';
        const perpendicularColor = darkMode ? '#4ade80' : '#22c55e'; // Zelená
        const mirroredColor = darkMode ? '#60a5fa' : '#3b82f6'; // Modrá pro zrcadlený trojúhelník
        
        // Osa souměrnosti x
        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'butt';
        ctx.beginPath();
        ctx.moveTo(axisX, -5000);
        ctx.lineTo(axisX, 5000);
        ctx.stroke();
        
        // Popisek osy
        drawLabel(ctx, { x: axisX, y: 200 }, 'x', axisColor, 15, 0, dpr);
        
        // Trojúhelník ABC
        drawSegment(ctx, pA, pB, triangleColor, 4, 1, false);
        drawSegment(ctx, pB, pC, triangleColor, 4, 1, false);
        drawSegment(ctx, pC, pA, triangleColor, 4, 1, false);
        
        // Všechny kolmice hotové
        const pARight = { x: 5000, y: pA.y };
        drawSegment(ctx, pA, pARight, perpendicularColor, 3, 1, false);
        const pBRight = { x: 5000, y: pB.y };
        drawSegment(ctx, pB, pBRight, perpendicularColor, 3, 1, false);
        const pCRight = { x: 5000, y: pC.y };
        drawSegment(ctx, pC, pCRight, perpendicularColor, 3, 1, false);
        
        // Body A' a B' - už máme
        const pAPrime = { x: axisX + (axisX - pA.x), y: pA.y };
        const pBPrime = { x: axisX + (axisX - pB.x), y: pB.y };
        drawPoint(ctx, pAPrime, 'A\'', mirroredColor);
        drawPoint(ctx, pBPrime, 'B\'', mirroredColor);
        
        // Průsečík C s osou
        const circleCenterC = { x: axisX, y: pC.y };
        const radiusC = Math.abs(pC.x - axisX);
        
        // Bod C' - zrcadlený obraz (napravo od osy)
        const pCPrime = { x: axisX + (axisX - pC.x), y: pC.y };
        
        // Zrcadlené kružítko - hrot na ose, směřuje napravo k bodu C'
        const compassAngleC2 = Math.atan2(pCPrime.y - circleCenterC.y, pCPrime.x - circleCenterC.x);
        drawCompass(ctx, circleCenterC, radiusC, progress, compassAngleC2);
        
        // Body
        drawPoint(ctx, pA, 'A', triangleColor);
        drawPoint(ctx, pB, 'B', triangleColor);
        drawPoint(ctx, pC, 'C', triangleColor);
        if (progress > 0.5) {
          drawPoint(ctx, pCPrime, 'C\'', mirroredColor);
        }
        
        // Popisky bodů
        drawLabel(ctx, pA, 'A', triangleColor, -25, -12, dpr);
        drawLabel(ctx, pB, 'B', triangleColor, 12, 12, dpr);
        drawLabel(ctx, pC, 'C', triangleColor, -25, -12, dpr);
        drawLabel(ctx, pAPrime, 'A\'', mirroredColor, 12, -12, dpr);
        drawLabel(ctx, pBPrime, 'B\'', mirroredColor, 12, -12, dpr);
        if (progress > 0.5) {
          drawLabel(ctx, pCPrime, 'C\'', mirroredColor, 12, -12, dpr);
        }
      }
    },
    {
      id: 10,
      title: 'Spoj body A\'B\'C\'',
      description: 'Spoj body A\', B\' a C\' a vznikne zrcadlený trojúhelník.',
      draw: (ctx, s, off, pA, pB, pC, progress, currentStep, drawingStepId) => {
        const dpr = window.devicePixelRatio || 1;
        const triangleColor = darkMode ? '#e5e7eb' : '#1f2937';
        const axisColor = darkMode ? '#fca5a5' : '#ef4444';
        const perpendicularColor = darkMode ? '#4ade80' : '#22c55e'; // Zelená
        const mirroredColor = darkMode ? '#60a5fa' : '#3b82f6'; // Modrá pro zrcadlený trojúhelník
        
        // Osa souměrnosti x
        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'butt';
        ctx.beginPath();
        ctx.moveTo(axisX, -5000);
        ctx.lineTo(axisX, 5000);
        ctx.stroke();
        
        // Popisek osy
        drawLabel(ctx, { x: axisX, y: 200 }, 'x', axisColor, 15, 0, dpr);
        
        // Trojúhelník ABC
        drawSegment(ctx, pA, pB, triangleColor, 4, 1, false);
        drawSegment(ctx, pB, pC, triangleColor, 4, 1, false);
        drawSegment(ctx, pC, pA, triangleColor, 4, 1, false);
        
        // Zrcadlené body
        const pAPrime = { x: axisX + (axisX - pA.x), y: pA.y };
        const pBPrime = { x: axisX + (axisX - pB.x), y: pB.y };
        const pCPrime = { x: axisX + (axisX - pC.x), y: pC.y };
        
        // Zrcadlený trojúhelník A'B'C' - kreslí se postupně
        let segmentProgress = 0;
        if (progress < 0.33) {
          segmentProgress = progress / 0.33;
          drawSegment(ctx, pAPrime, pBPrime, mirroredColor, 4, segmentProgress, true);
        } else if (progress < 0.66) {
          drawSegment(ctx, pAPrime, pBPrime, mirroredColor, 4, 1, false);
          segmentProgress = (progress - 0.33) / 0.33;
          drawSegment(ctx, pBPrime, pCPrime, mirroredColor, 4, segmentProgress, true);
        } else {
          drawSegment(ctx, pAPrime, pBPrime, mirroredColor, 4, 1, false);
          drawSegment(ctx, pBPrime, pCPrime, mirroredColor, 4, 1, false);
          segmentProgress = (progress - 0.66) / 0.34;
          drawSegment(ctx, pCPrime, pAPrime, mirroredColor, 4, segmentProgress, true);
        }
        
        // Body ABC
        drawPoint(ctx, pA, 'A', triangleColor);
        drawPoint(ctx, pB, 'B', triangleColor);
        drawPoint(ctx, pC, 'C', triangleColor);
        
        // Body A'B'C'
        drawPoint(ctx, pAPrime, 'A\'', mirroredColor);
        drawPoint(ctx, pBPrime, 'B\'', mirroredColor);
        drawPoint(ctx, pCPrime, 'C\'', mirroredColor);
        
        // Popisky bodů ABC
        drawLabel(ctx, pA, 'A', triangleColor, -25, -12, dpr);
        drawLabel(ctx, pB, 'B', triangleColor, 12, 12, dpr);
        drawLabel(ctx, pC, 'C', triangleColor, -25, -12, dpr);
        
        // Popisky bodů A'B'C'
        drawLabel(ctx, pAPrime, 'A\'', mirroredColor, 12, -12, dpr);
        drawLabel(ctx, pBPrime, 'B\'', mirroredColor, 12, -12, dpr);
        drawLabel(ctx, pCPrime, 'C\'', mirroredColor, 12, -12, dpr);
      }
    }
  ];

  // Funkce pro vykreslení scény do bufferu
  const renderToBuffer = (bufferCtx: CanvasRenderingContext2D, progress: number) => {
    const dpr = window.devicePixelRatio || 1;

    if (!bufferCanvasRef.current || bufferCanvasRef.current.width === 0 || bufferCanvasRef.current.height === 0) {
      return;
    }

    bufferCtx.clearRect(0, 0, bufferCanvasRef.current.width, bufferCanvasRef.current.height);
    
    bufferCtx.save();
    bufferCtx.scale(dpr, dpr);
    
    // Nakreslit mřížku
    drawGrid(bufferCtx);
    
    // Nakreslit titulky pouze když jsou zapnuté
    if (showCaptions) {
      const isMobileView = canvasSize.width < 768;
      
      // Nakreslit nadpis na střed nahoře
      bufferCtx.fillStyle = darkMode ? '#e5e7eb' : '#1f2937';
      bufferCtx.font = isMobileView ? '600 20px Arial, sans-serif' : '600 28px Arial, sans-serif';
      bufferCtx.textAlign = 'center';
      bufferCtx.fillText('Osově souměrný obraz', canvasSize.width / 2, isMobileView ? 40 : 60);
      
      // Nakreslit popisek kroku
      bufferCtx.font = isMobileView ? '400 13px Arial, sans-serif' : '400 16px Arial, sans-serif';
      const descriptionText = steps[currentStep].description;
      const textMetrics = bufferCtx.measureText(descriptionText);
      const textWidth = textMetrics.width;
      const textHeight = isMobileView ? 18 : 22;
      const padding = isMobileView ? 12 : 16;
      
      // Pozice popisku - vyšší na mobilu kvůli panelu
      const bottomMargin = isMobileView ? 180 : 120;
      
      // Na mobilu zalamovat text, pokud je moc dlouhý
      if (isMobileView && textWidth > canvasSize.width - 40) {
        const maxWidth = canvasSize.width - 40;
        const words = descriptionText.split(' ');
        const lines: string[] = [];
        let currentLine = '';
        
        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const testMetrics = bufferCtx.measureText(testLine);
          
          if (testMetrics.width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) {
          lines.push(currentLine);
        }
        
        // Pozadí pro víceřádkový text
        const maxLineWidth = Math.max(...lines.map(line => bufferCtx.measureText(line).width));
        const totalHeight = lines.length * (textHeight + 4);
        const bgX = canvasSize.width / 2 - maxLineWidth / 2 - padding;
        const bgY = canvasSize.height - bottomMargin - totalHeight - padding / 2;
        const bgWidth = maxLineWidth + padding * 2;
        const bgHeight = totalHeight + padding;
        
        bufferCtx.fillStyle = darkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)';
        bufferCtx.beginPath();
        bufferCtx.roundRect(bgX, bgY, bgWidth, bgHeight, 8);
        bufferCtx.fill();
        
        // Vykreslit každý řádek
        bufferCtx.fillStyle = darkMode ? '#9ca3af' : '#4b5563';
        lines.forEach((line, index) => {
          const yPos = canvasSize.height - bottomMargin - totalHeight + index * (textHeight + 4) + textHeight;
          bufferCtx.fillText(line, canvasSize.width / 2, yPos);
        });
      } else {
        // Jednořádkový text (desktop nebo krátký text)
        const bgX = canvasSize.width / 2 - textWidth / 2 - padding;
        const bgY = canvasSize.height - bottomMargin - textHeight - padding / 2;
        const bgWidth = textWidth + padding * 2;
        const bgHeight = textHeight + padding;
        
        bufferCtx.fillStyle = darkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)';
        bufferCtx.beginPath();
        bufferCtx.roundRect(bgX, bgY, bgWidth, bgHeight, 8);
        bufferCtx.fill();
        
        bufferCtx.fillStyle = darkMode ? '#9ca3af' : '#4b5563';
        bufferCtx.fillText(descriptionText, canvasSize.width / 2, canvasSize.height - bottomMargin);
      }
      
      bufferCtx.textAlign = 'left';
    }
    
    // Aplikovat transformace
    bufferCtx.translate(offset.x, offset.y);
    bufferCtx.scale(scale, scale);

    // Vykreslit všechny předchozí kroky jako statické
    for (let i = 0; i < currentStep; i++) {
      steps[i].draw(bufferCtx, scale, offset, pointA, pointB, pointC, 1, currentStep, steps[i].id);
    }
    
    // Vykreslit aktuální krok s animací
    steps[currentStep].draw(bufferCtx, scale, offset, pointA, pointB, pointC, progress, currentStep, steps[currentStep].id);

    bufferCtx.restore();
  };

  // Render
  const render = () => {
    if (!canvasRef.current || !bufferCanvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferCtx = bufferCanvasRef.current.getContext('2d');
    if (bufferCtx) {
      renderToBuffer(bufferCtx, animProgress);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = darkMode ? '#1f2937' : '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(bufferCanvasRef.current, 0, 0);
  };

  useEffect(() => {
    render();
  }, [animProgress, currentStep, scale, offset, darkMode, showCaptions, canvasSize, pointA, pointB, pointC, hoveredPoint]);

  // Změna kroku
  const changeStep = (newStep: number) => {
    setCurrentStep(newStep);
    setAnimProgress(0);
    setIsAnimating(true);
  };

  const handlePlayStep = () => {
    setAnimProgress(0);
    setIsAnimating(true);
  };

  const handleRestart = () => {
    changeStep(0);
    centerView();
  };

  const handleZoomChange = (value: number[]) => {
    const newScale = value[0] / 100;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const worldCenter = screenToWorld(centerX, centerY);
    
    setScale(newScale);
    setOffset({
      x: centerX - worldCenter.x * newScale,
      y: centerY - worldCenter.y * newScale
    });
  };

  // Mouse eventy
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const mouseWorld = screenToWorld(mouseX, mouseY);
    const mouseScreen = { x: mouseX, y: mouseY };

    if (isPointHovered(pointA, mouseWorld) || isLabelHovered(pointA, mouseScreen, { x: -25, y: -12 })) {
      setDraggedPoint('A');
      e.preventDefault();
      return;
    }

    if (isPointHovered(pointB, mouseWorld) || isLabelHovered(pointB, mouseScreen, { x: 12, y: 12 })) {
      setDraggedPoint('B');
      e.preventDefault();
      return;
    }

    if (isPointHovered(pointC, mouseWorld) || isLabelHovered(pointC, mouseScreen, { x: -25, y: -12 })) {
      setDraggedPoint('C');
      e.preventDefault();
      return;
    }

    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const mouseWorld = screenToWorld(mouseX, mouseY);
    const mouseScreen = { x: mouseX, y: mouseY };

    if (draggedPoint === 'A') {
      setPointA(mouseWorld);
      return;
    }

    if (draggedPoint === 'B') {
      setPointB(mouseWorld);
      return;
    }

    if (draggedPoint === 'C') {
      setPointC(mouseWorld);
      return;
    }

    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
      return;
    }

    if (isPointHovered(pointA, mouseWorld) || isLabelHovered(pointA, mouseScreen, { x: -25, y: -12 })) {
      setHoveredPoint('A');
    } else if (isPointHovered(pointB, mouseWorld) || isLabelHovered(pointB, mouseScreen, { x: 12, y: 12 })) {
      setHoveredPoint('B');
    } else if (isPointHovered(pointC, mouseWorld) || isLabelHovered(pointC, mouseScreen, { x: -25, y: -12 })) {
      setHoveredPoint('C');
    } else {
      setHoveredPoint(null);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedPoint(null);
  };

  const getTouchDistance = (touch1: React.Touch, touch2: React.Touch): number => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getTouchCenter = (touch1: React.Touch, touch2: React.Touch): Point => {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2
    };
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      const center = getTouchCenter(e.touches[0], e.touches[1]);

      setIsPinching(true);
      setInitialPinchDistance(distance);
      setInitialPinchScale(scale);
      setPinchCenter(center);

      e.preventDefault();
      return;
    }

    if (e.touches.length !== 1) return;

    const touch = e.touches[0];
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;
    const touchWorld = screenToWorld(touchX, touchY);
    const touchScreen = { x: touchX, y: touchY };

    if (isPointHovered(pointA, touchWorld) || isLabelHovered(pointA, touchScreen, { x: -25, y: -12 })) {
      setDraggedPoint('A');
      e.preventDefault();
      return;
    }

    if (isPointHovered(pointB, touchWorld) || isLabelHovered(pointB, touchScreen, { x: 12, y: 12 })) {
      setDraggedPoint('B');
      e.preventDefault();
      return;
    }

    if (isPointHovered(pointC, touchWorld) || isLabelHovered(pointC, touchScreen, { x: -25, y: -12 })) {
      setDraggedPoint('C');
      e.preventDefault();
      return;
    }

    setIsDragging(true);
    setDragStart({ x: touch.clientX - offset.x, y: touch.clientY - offset.y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (isPinching && e.touches.length === 2) {
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      const newScale = Math.max(0.15, Math.min(2.25, initialPinchScale * (distance / initialPinchDistance)));

      const worldCenter = screenToWorld(pinchCenter.x, pinchCenter.y);

      setScale(newScale);
      setOffset({
        x: pinchCenter.x - worldCenter.x * newScale,
        y: pinchCenter.y - worldCenter.y * newScale
      });

      e.preventDefault();
      return;
    }

    if (e.touches.length !== 1) return;

    const touch = e.touches[0];
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;
    const touchWorld = screenToWorld(touchX, touchY);

    if (draggedPoint === 'A') {
      setPointA(touchWorld);
      e.preventDefault();
      return;
    }

    if (draggedPoint === 'B') {
      setPointB(touchWorld);
      e.preventDefault();
      return;
    }

    if (draggedPoint === 'C') {
      setPointC(touchWorld);
      e.preventDefault();
      return;
    }

    if (isDragging) {
      setOffset({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setDraggedPoint(null);
    setIsPinching(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const worldPos = screenToWorld(mouseX, mouseY);

    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.15, Math.min(2.25, scale * zoomFactor));

    setScale(newScale);
    setOffset({
      x: mouseX - worldPos.x * newScale,
      y: mouseY - worldPos.y * newScale
    });
  };

  return (
    <div className="size-full flex flex-col relative">
      {/* Canvas plátno */}
      <div ref={containerRef} className={`flex-1 ${darkMode ? 'bg-[#111827]' : 'bg-[#f9fafb]'}`}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ 
            cursor: draggedPoint ? 'grabbing' : hoveredPoint ? 'move' : isDragging ? 'grabbing' : 'grab',
            touchAction: 'none'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onWheel={handleWheel}
        />
      </div>

      <ConstructionControlPanel
        currentStep={currentStep}
        totalSteps={steps.length}
        scale={scale}
        showCaptions={showCaptions}
        darkMode={darkMode}
        isMobile={isMobile}
        onStepChange={changeStep}
        onPlayStep={handlePlayStep}
        onRestart={handleRestart}
        onZoomChange={handleZoomChange}
        onToggleCaptions={() => setShowCaptions(!showCaptions)}
        onToggleDarkMode={() => onDarkModeChange(!darkMode)}
      />
      
      {/* Tlačítko zpět do menu - vlevo nahoře */}
      <button
        onClick={onBack}
        className={`absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg transition-colors ${
          darkMode
            ? 'bg-[#374151] hover:bg-[#404c5e] text-gray-100 border border-gray-600'
            : 'bg-white hover:bg-gray-50 border border-gray-200'
        }`}
      >
        <ArrowLeft className="size-5" />
        <span>Menu</span>
      </button>
    </div>
  );
}
