# Detailní popis kreslení a animace nástrojů

## Obsah
1. [Přehled animačního systému](#přehled-animačního-systému)
2. [Timeline animace](#timeline-animace)
3. [SVG assety a jejich načítání](#svg-assety-a-jejich-načítání)
4. [Kreslení úsečky s pravítkem](#kreslení-úsečky-s-pravítkem)
5. [Kreslení kružnice s kružítkem](#kreslení-kružnice-s-kružítkem)
6. [Frame-by-frame analýza](#frame-by-frame-analýza)
7. [Kompletní implementace](#kompletní-implementace)
8. [Debugging a ladění](#debugging-a-ladění)

---

## Přehled animačního systému

### Základní koncept

Každý krok konstrukce má **animační progress** od 0.0 do 1.0. Tento progress řídí:
- Opacity (průhlednost) nástroje
- Délka narýsované čáry/kružnice
- Rotaci kružítka
- Neonové podsvícení

### Animační smyčka

```typescript
useEffect(() => {
  if (isAnimating && animProgress < 1) {
    animationFrameRef.current = requestAnimationFrame(() => {
      let increment = 0.008;  // základní rychlost
      
      // Různé rychlosti podle typu kroku
      if (currentStep === 1 || currentStep === 3) {
        // Statické nástroje (jen fade in/out)
        increment = 0.002;  // 4× pomalejší = čekání
      } else if (currentStep === 2 || currentStep === 4) {
        // Rýsování kružnic
        increment = 0.005;  // střední rychlost
      } else if (currentStep === 0) {
        // Rýsování úseček
        increment = 0.008;  // základní rychlost
      }
      
      setAnimProgress(prev => Math.min(prev + increment, 1));
    });
  } else if (animProgress >= 1) {
    setIsAnimating(false);
  }
  
  return () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };
}, [isAnimating, animProgress, currentStep]);
```

**Důvod různých rychlostí**:
- **Statické nástroje** (krok 1, 3): Studenti si prohlížejí, kde je kružítko → pomalé (0.002)
- **Rýsování kružnic**: Komplexní pohyb → střední rychlost (0.005)
- **Rýsování úseček**: Jednoduchý pohyb → rychlejší (0.008)

### Výpočet FPS

```
60 FPS = 1 frame každých ~16.67 ms

Při increment = 0.008:
  1.0 / 0.008 = 125 framů
  125 × 16.67 ms = ~2.08 sekundy

Při increment = 0.002:
  1.0 / 0.002 = 500 framů
  500 × 16.67 ms = ~8.33 sekundy
```

---

## Timeline animace

### Struktura timeline

Každá animace je rozdělena na **tři fáze**:

```
Progress:  0.00        0.15        0.85        1.00
           │           │           │           │
Fáze:      ├───────────┼───────────┼───────────┤
           │  Fade In  │  Rýsování │  Fade Out │
           │  nástroje │           │  nástroje │
           └───────────┴───────────┴───────────┘
```

### Fáze 1: Fade In (0.00 → 0.15)

**Co se děje**:
- Nástroj (pravítko/kružítko) se **objevuje**
- Opacity nástroje: 0 → 1
- **ŽÁDNÉ kreslení** čáry/kružnice ještě neprobíhá
- Nástroj je statický v počáteční pozici

**Důvod**: Student vidí, KDE se nástroj přikládá, než začne rýsování.

**Výpočet opacity**:
```typescript
let toolOpacity = 0;

if (progress < 0.15) {
  // Lineární interpolace 0 → 1
  toolOpacity = progress / 0.15;
}
// progress = 0.00 → opacity = 0.0
// progress = 0.05 → opacity = 0.33
// progress = 0.10 → opacity = 0.67
// progress = 0.15 → opacity = 1.0
```

### Fáze 2: Rýsování (0.15 → 0.85)

**Co se děje**:
- Nástroj je **plně viditelný** (opacity = 1.0)
- Čára/kružnice se **vykresluje** postupně
- **Neonové žluté podsvícení** sleduje špičku nástroje
- Kružítko se **otáčí** synchronně s kružnicí

**Výpočet drawing progress**:
```typescript
let drawProgress = 0;

if (progress <= 0.15) {
  drawProgress = 0;  // ještě se nekresli
} else if (progress >= 0.85) {
  drawProgress = 1;  // už hotové
} else {
  // Lineární interpolace v rozmezí 0.15 - 0.85
  drawProgress = (progress - 0.15) / 0.7;
}

// progress = 0.15 → drawProgress = 0.0 (začátek kreslení)
// progress = 0.50 → drawProgress = 0.5 (polovina)
// progress = 0.85 → drawProgress = 1.0 (konec kreslení)
```

**Šířka rýsované čáry**:
```
70% této fáze = 0.7 × (0.85 - 0.15) = 0.49
Takže z celkového progress 0.15 - 0.85 se skutečně kresli
```

### Fáze 3: Fade Out (0.85 → 1.00)

**Co se děje**:
- Čára/kružnice je **kompletně narýsovaná** (100%)
- Nástroj se **schovává**
- Opacity nástroje: 1 → 0
- Neonové podsvícení **zmizelo**

**Důvod**: Student vidí hotový výsledek bez rušivých nástrojů.

**Výpočet opacity**:
```typescript
let toolOpacity = 0;

if (progress > 0.85 && progress < 1.0) {
  // Lineární interpolace 1 → 0
  toolOpacity = (1 - progress) / 0.15;
}
// progress = 0.85 → opacity = 1.0
// progress = 0.90 → opacity = 0.67
// progress = 0.95 → opacity = 0.33
// progress = 1.00 → opacity = 0.0
```

### Proč tato struktura?

**Pedagogický důvod**:
1. Student **vidí kde** se nástroj přikládá (fade in)
2. Student **sleduje jak** se rýsuje (rýsování)
3. Student **vidí výsledek** čistě (fade out)

**Technický důvod**:
- Oddělení vizualizace nástroje od samotného kreslení
- Plynulý přechod bez "skoků"
- Synchronizace více animací (nástroj + čára + podsvícení)

---

## SVG assety a jejich načítání

### Načítání SVG

Pro načtení SVG assetů používáme `useRef` a `useEffect`:

```typescript
const rulerImageRef = useRef<HTMLImageElement>(null);
const compassImageRef = useRef<HTMLImageElement>(null);
const [rulerLoaded, setRulerLoaded] = useState(false);
const [compassLoaded, setCompassLoaded] = useState(false);

useEffect(() => {
  const rulerImage = new Image();
  rulerImage.src = '/path/to/ruler.svg';
  rulerImage.onload = () => setRulerLoaded(true);
  rulerImageRef.current = rulerImage;
  
  const compassImage = new Image();
  compassImage.src = '/path/to/compass.svg';
  compassImage.onload = () => setCompassLoaded(true);
  compassImageRef.current = compassImage;
}, []);
```

### Použití SVG v kreslení

Při kreslení používáme `drawImage`:

```typescript
const drawRuler = (
  ctx: CanvasRenderingContext2D,
  p1: Point,      // bod A
  p2: Point,      // bod B
  progress: number
) => {
  // 1. Kontrola, zda máme pravítko načtené
  if (!rulerImageRef.current || !rulerLoaded) return;
  
  // 2. Výpočet opacity podle timeline
  let rulerAlpha = 0;
  
  if (progress < 0.15) {
    // FADE IN
    rulerAlpha = progress / 0.15;
  } else if (progress >= 0.15 && progress <= 0.85) {
    // PLNĚ VIDITELNÉ
    rulerAlpha = 1.0;
  } else if (progress > 0.85 && progress < 1.0) {
    // FADE OUT
    rulerAlpha = (1 - progress) / 0.15;
  } else {
    // SKRYTÉ (po dokončení)
    return;
  }
  
  // 3. Výpočet pozice a rotace
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const lineLength = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);
  
  // 4. Nastavit transformaci
  ctx.save();
  
  // Přesunout do bodu A (počátek úsečky)
  ctx.translate(p1.x, p1.y);
  
  // Rotovat podle úhlu úsečky
  ctx.rotate(angle);
  
  // Nastavit průhlednost
  ctx.globalAlpha = rulerAlpha;
  
  // 5. Vypočítat offset pro centrování
  // Pravítko má být vycentrované nad úsečkou
  const rulerOffsetX = lineLength / 2 - rulerLength / 2;
  const rulerOffsetY = -rulerWidth;  // nad úsečkou
  
  // 6. Vykreslit pravítko
  const ruler = rulerImageRef.current;
  ctx.drawImage(
    ruler,
    rulerOffsetX,   // X pozice
    rulerOffsetY,   // Y pozice (nad úsečkou)
    rulerLength,    // šířka
    rulerWidth      // výška
  );
  
  // 7. Obnovit transformaci
  ctx.globalAlpha = 1.0;
  ctx.restore();
};
```

---

## SVG assety a jejich načítání

### Přehled potřebných SVG souborů

Aplikace vyžaduje **3 SVG soubory** pro vizualizaci nástrojů:

1. **Pravítko** (`pravitko4.svg`) - pro úsečky a přímky
2. **Kružítko** (`kruzitko.svg`) - pro kružnice
3. **Úhloměr** (`uhlo.svg`) - pro úhly (pouze AngleTriangleConstruction)

### Aktuální URL (Supabase storage)

```typescript
// PRAVÍTKO
const RULER_URL = 'https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/pravitko4.svg';

// KRUŽÍTKO
const COMPASS_URL = 'https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/kruzitko.svg';

// ÚHLOMĚR
const PROTRACTOR_URL = 'https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/uhlo.svg';
```

### Kompletní příklad načítání v komponentě

```typescript
import { useEffect, useRef, useState } from 'react';

// Refs pro obrázky
const rulerImageRef = useRef<HTMLImageElement | null>(null);
const compassImageRef = useRef<HTMLImageElement | null>(null);

// State pro tracking načtení
const [rulerLoaded, setRulerLoaded] = useState(false);
const [compassLoaded, setCompassLoaded] = useState(false);

// NAČTENÍ PRAVÍTKA
useEffect(() => {
  const img = new Image();
  img.crossOrigin = 'anonymous';  // Důležité pro CORS!
  
  img.onload = () => {
    rulerImageRef.current = img;
    setRulerLoaded(true);
    console.log('✅ Pravítko načteno');
  };
  
  img.onerror = (error) => {
    console.error('❌ Chyba při načítání pravítka:', error);
  };
  
  img.src = 'https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/pravitko4.svg';
}, []);

// NAČTENÍ KRUŽÍTKA
useEffect(() => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  
  img.onload = () => {
    compassImageRef.current = img;
    setCompassLoaded(true);
    console.log('✅ Kružítko načteno');
  };
  
  img.onerror = (error) => {
    console.error('❌ Chyba při načítání kružítka:', error);
  };
  
  img.src = 'https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/kruzitko.svg';
}, []);
```

### Použití v draw funkcích

```typescript
const drawRuler = (
  ctx: CanvasRenderingContext2D,
  p1: Point,
  p2: Point,
  progress: number
) => {
  // ⚠️ DŮLEŽITÁ KONTROLA - vždy před použitím
  if (!rulerImageRef.current || !rulerLoaded) {
    return;  // SVG ještě není načtené → přeskočit
  }
  
  // ... zbytek kódu pro vykreslení
  const ruler = rulerImageRef.current;
  ctx.drawImage(ruler, x, y, width, height);
};
```

### Lokální hostování (doporučeno)

**Krok 1: Stáhnout soubory**
```bash
mkdir -p public/assets
cd public/assets
curl -O "https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/pravitko4.svg"
curl -O "https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/kruzitko.svg"
curl -O "https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/uhlo.svg"
```

**Krok 2: Změnit URL v kódu**
```typescript
// Změnit ze:
img.src = 'https://jjpiguuubvmiobmixwgh.supabase.co/.../pravitko4.svg';

// Na:
img.src = '/assets/pravitko4.svg';
```

**Soubory k úpravě**:
- `components/BisectorConstruction.tsx` (řádek ~116 a ~130)
- `components/TriangleConstruction.tsx` (řádek ~140 a ~150)
- `components/InteractiveTriangleConstruction.tsx`
- `components/AngleTriangleConstruction.tsx`
- `components/AxialSymmetryConstruction.tsx`

---

## Kreslení úsečky s pravítkem

### Geometrie pravítka

**SVG pravítko**:
```
Rozměry: 800 × 400 px
Orientace: Horizontální
Reference point: Levý dolní roh (0, 400)
Měřítko: Podél dolní hrany
```

**Umístění pravítka**:
```
      ┌────────────────────────────────┐
      │                                │ 400px výška
      │         PRAVÍTKO               │
      │                                │
  A ──┴────────────────────────────────┴── B
      ├────────────────┬───────────────┤
      400px vlevo     střed      400px vpravo
```

### Krok za krokem: Kreslení úsečky AB

#### 1. Příprava (před kreslením)

```typescript
// Body úsečky
const pointA = { x: 860, y: 840 };
const pointB = { x: 1460, y: 840 };

// Výpočet úhlu úsečky
const dx = pointB.x - pointA.x;  // 600
const dy = pointB.y - pointA.y;  // 0
const angle = Math.atan2(dy, dx);  // 0 rad (horizontální)
const length = Math.sqrt(dx * dx + dy * dy);  // 600 px

// Parametry pravítka
const rulerLength = 800;
const rulerWidth = 400;
```

#### 2. Vykreslení pravítka (animované)

```typescript
const drawRuler = (
  ctx: CanvasRenderingContext2D,
  p1: Point,      // bod A
  p2: Point,      // bod B
  progress: number
) => {
  // 1. Kontrola, zda máme pravítko načtené
  if (!rulerImageRef.current || !rulerLoaded) return;
  
  // 2. Výpočet opacity podle timeline
  let rulerAlpha = 0;
  
  if (progress < 0.15) {
    // FADE IN
    rulerAlpha = progress / 0.15;
  } else if (progress >= 0.15 && progress <= 0.85) {
    // PLNĚ VIDITELNÉ
    rulerAlpha = 1.0;
  } else if (progress > 0.85 && progress < 1.0) {
    // FADE OUT
    rulerAlpha = (1 - progress) / 0.15;
  } else {
    // SKRYTÉ (po dokončení)
    return;
  }
  
  // 3. Výpočet pozice a rotace
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const lineLength = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);
  
  // 4. Nastavit transformaci
  ctx.save();
  
  // Přesunout do bodu A (počátek úsečky)
  ctx.translate(p1.x, p1.y);
  
  // Rotovat podle úhlu úsečky
  ctx.rotate(angle);
  
  // Nastavit průhlednost
  ctx.globalAlpha = rulerAlpha;
  
  // 5. Vypočítat offset pro centrování
  // Pravítko má být vycentrované nad úsečkou
  const rulerOffsetX = lineLength / 2 - rulerLength / 2;
  const rulerOffsetY = -rulerWidth;  // nad úsečkou
  
  // 6. Vykreslit pravítko
  const ruler = rulerImageRef.current;
  ctx.drawImage(
    ruler,
    rulerOffsetX,   // X pozice
    rulerOffsetY,   // Y pozice (nad úsečkou)
    rulerLength,    // šířka
    rulerWidth      // výška
  );
  
  // 7. Obnovit transformaci
  ctx.globalAlpha = 1.0;
  ctx.restore();
};
```

**Vizualizace umístění**:
```
Před rotací (angle = 0):
        
        rulerOffsetY = -400
        ↓
        ┌─────────────────┐
        │   PRAVÍTKO      │ 400px
        │                 │
  A ────┴─────────────────┴──── B
        ↑                 ↑
    rulerOffsetX      rulerLength
    = (600/2 - 800/2)
    = -100
```

#### 3. Vykreslení úsečky (animované)

```typescript
const drawSegment = (
  ctx: CanvasRenderingContext2D,
  p1: Point,
  p2: Point,
  color: string,
  width: number,
  progress: number
) => {
  // 1. Výpočet drawing progress (0.15 - 0.85)
  let drawProgress = 0;
  
  if (progress <= 0.15) {
    drawProgress = 0;  // ještě se nekresli
  } else if (progress >= 0.85) {
    drawProgress = 1;  // už hotové
  } else {
    drawProgress = (progress - 0.15) / 0.7;
  }
  
  // 2. Výpočet aktuálního koncového bodu
  const currentP2 = {
    x: p1.x + (p2.x - p1.x) * drawProgress,
    y: p1.y + (p2.y - p1.y) * drawProgress
  };
  
  // 3. Detekce, zda se právě rýsuje
  const isDrawing = drawProgress > 0 && drawProgress < 1;
  
  // 4. NEONOVÉ PODSVÍCENÍ (pouze při rýsování)
  if (isDrawing) {
    ctx.save();
    
    // Žlutá záře
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.5)';
    ctx.lineWidth = width * 10;  // 10× tlustší!
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(currentP2.x, currentP2.y);
    ctx.stroke();
    
    ctx.restore();
  }
  
  // 5. HLAVNÍ ČÁRA (vždy nakreslena NAD podsvícením)
  if (drawProgress > 0) {
    ctx.save();
    
    ctx.strokeStyle = color;
    // Tlustší během kreslení (1.5×)
    ctx.lineWidth = isDrawing ? width * 1.5 : width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(currentP2.x, currentP2.y);
    ctx.stroke();
    
    ctx.restore();
  }
};
```

#### 4. Kompletní rendering (v jednom framu)

```typescript
const renderSegmentWithRuler = (ctx, pointA, pointB, progress) => {
  // NEJDŘÍV pravítko (pod čárou)
  drawRuler(ctx, pointA, pointB, progress);
  
  // PAK neonové podsvícení
  // PAK hlavní čára
  drawSegment(ctx, pointA, pointB, '#1f2937', 6, progress);
  
  // NAKONEC body A, B (nad vším)
  drawPoint(ctx, pointA, 'A', '#1f2937');
  drawPoint(ctx, pointB, 'B', '#1f2937');
};
```

### Příklad: Frame-by-frame pro úsečku

**Frame 1** (progress = 0.00):
```
- Pravítko: opacity = 0.0 (neviditelné)
- Úsečka: drawProgress = 0.0 (nic)
- Výsledek: Prázdné plátno
```

**Frame 10** (progress = 0.08, čas ~0.16s):
```
- Pravítko: opacity = 0.53 (poloprůhledné, objevuje se)
- Úsečka: drawProgress = 0.0 (ještě nic)
- Výsledek: Poloprůhledné pravítko nad body A, B
```

**Frame 19** (progress = 0.15, konec fade in):
```
- Pravítko: opacity = 1.0 (plně viditelné)
- Úsečka: drawProgress = 0.0 (právě začíná)
- Výsledek: Jasné pravítko, žádná čára
```

**Frame 30** (progress = 0.24):
```
- Pravítko: opacity = 1.0
- Úsečka: drawProgress = 0.13 (13% délky)
  - currentP2 = A + 0.13 × (B - A)
  - Neonové podsvícení: ANO (žlutá záře)
  - Šířka: 9px (1.5 × 6)
- Výsledek: Pravítko + krátká silnější čára se zářením
```

**Frame 60** (progress = 0.48, polovina):
```
- Pravítko: opacity = 1.0
- Úsečka: drawProgress = 0.47 (47% délky)
- Výsledek: Čára je narýsovaná do poloviny
```

**Frame 107** (progress = 0.85, konec rýsování):
```
- Pravítko: opacity = 1.0 (právě začne mizet)
- Úsečka: drawProgress = 1.0 (kompletní)
  - Neonové podsvícení: NE (už hotovo)
  - Šířka: 6px (normální)
- Výsledek: Celá úsečka, pravítko začíná blednout
```

**Frame 120** (progress = 0.96):
```
- Pravítko: opacity = 0.27 (téměř zmizelo)
- Úsečka: drawProgress = 1.0
- Výsledek: Celá úsečka, pravítko skoro neviditelné
```

**Frame 125** (progress = 1.00, konec):
```
- Pravítko: opacity = 0.0 (zmizelo)
- Úsečka: drawProgress = 1.0
- Výsledek: Jen čistá úsečka AB s body
```

---

## Kreslení kružnice s kružítkem

### Geometrie kružítka

**SVG kružítko**:
```
Rozměry: Čtvercový (dynamická velikost)
Hrot: Levý dolní roh (0, height) v SVG souřadnicích
Tužka: Pravý dolní roh (width, height)
Otevření: Odpovídá poloměru kružnice
```

**Orientace kružítka**:
```
        Tužka (radius, 0)
         ●
        /│
       / │
      /  │
     /   │ radius
    /    │
   /     │
  ●──────┘
 Hrot    
(0, 0)
```

### Krok za krokem: Kreslení kružnice

#### 1. Příprava

```typescript
// Střed kružnice
const center = { x: 860, y: 840 };  // bod A

// Poloměr
const radius = 420;  // 0.7 × délka AB

// Parametry kružítka
const compassWidth = radius;   // šířka = poloměr
const compassHeight = radius;  // výška = poloměr
```

#### 2. Výpočet úhlu rotace kružítka

**Klíčový princip**: Kružítko se otáčí **synchronně** s rýsovanou kružnicí.

```typescript
// Drawing progress v rozmezí 0.0 - 1.0
const drawProgress = (progress - 0.15) / 0.7;

// Úhel na kružnici (v radiánech)
// 0 → 2π (úplná otáčka)
const currentAngle = Math.PI * 2 * drawProgress;

// progress = 0.15 → drawProgress = 0.0 → angle = 0 (start)
// progress = 0.50 → drawProgress = 0.5 → angle = π (půlka)
// progress = 0.85 → drawProgress = 1.0 → angle = 2π (konec)
```

**Kde je tužka kružítka v daném okamžiku**:
```typescript
const pencilPosition = {
  x: center.x + radius * Math.cos(currentAngle),
  y: center.y + radius * Math.sin(currentAngle)
};
```

**Kde je hrot kružítka**: Vždy ve středu (center).

#### 3. Vykreslení kružítka (animované)

```typescript
const drawCompass = (
  ctx: CanvasRenderingContext2D,
  center: Point,
  radius: number,
  progress: number
) => {
  // 1. Kontrola načtení
  if (!compassImageRef.current || !compassLoaded) return;
  
  // 2. Výpočet opacity (stejně jako pravítko)
  let compassAlpha = 0;
  
  if (progress < 0.15) {
    compassAlpha = progress / 0.15;
  } else if (progress >= 0.15 && progress <= 0.85) {
    compassAlpha = 1.0;
  } else if (progress > 0.85 && progress < 1.0) {
    compassAlpha = (1 - progress) / 0.15;
  } else {
    return;
  }
  
  // 3. Výpočet úhlu rotace
  let drawProgress = 0;
  if (progress > 0.15 && progress < 0.85) {
    drawProgress = (progress - 0.15) / 0.7;
  } else if (progress >= 0.85) {
    drawProgress = 1.0;
  }
  
  const rotationAngle = Math.PI * 2 * drawProgress;
  
  // 4. Nastavit transformaci
  ctx.save();
  
  // Přesunout do středu kružnice (bod A)
  ctx.translate(center.x, center.y);
  
  // Rotovat podle aktuálního úhlu
  ctx.rotate(rotationAngle);
  
  // Nastavit průhlednost
  ctx.globalAlpha = compassAlpha;
  
  // 5. Velikost kružítka = poloměr kružnice
  const compassWidth = radius;
  const compassHeight = radius;
  
  // 6. Vykreslit kružítko
  // DŮLEŽITÉ: Hrot musí být na (0, 0) = center
  const compass = compassImageRef.current;
  ctx.drawImage(
    compass,
    0,              // X: hrot na středu
    -compassHeight, // Y: dolní okraj na středu (hrot je dole)
    compassWidth,
    compassHeight
  );
  
  // 7. Obnovit transformaci
  ctx.globalAlpha = 1.0;
  ctx.restore();
};
```

**Vizualizace transformace**:

**Před rotací** (rotationAngle = 0):
```
      Tužka
       ●
      /
     / compassHeight
    /
   ● Center (0, 0)
  Hrot
  
  Souřadnice v canvas:
  - Hrot: (0, 0)
  - Tužka: (radius, 0)
```

**Po rotaci 45°** (rotationAngle = π/4):
```
       Tužka
         ●
        /
       /  45°
      /
     ● Center
    Hrot
```

**Po rotaci 180°** (rotationAngle = π):
```
     ● Center
    Hrot
      \
       \
        \
         ●
       Tužka
```

#### 4. Vykreslení kružnice (animované)

```typescript
const drawCircle = (
  ctx: CanvasRenderingContext2D,
  center: Point,
  radius: number,
  color: string,
  width: number,
  progress: number
) => {
  // 1. Výpočet drawing progress
  let drawProgress = 0;
  
  if (progress <= 0.15) {
    drawProgress = 0;
  } else if (progress >= 0.85) {
    drawProgress = 1;
  } else {
    drawProgress = (progress - 0.15) / 0.7;
  }
  
  // 2. Koncový úhel kružnice
  const endAngle = Math.PI * 2 * drawProgress;
  
  // 3. Detekce rýsování
  const isDrawing = drawProgress > 0 && drawProgress < 1;
  
  // 4. NEONOVÉ PODSVÍCENÍ
  if (isDrawing) {
    ctx.save();
    
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.5)';
    ctx.lineWidth = width * 10;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.arc(
      center.x,
      center.y,
      radius,
      0,           // start angle (vždy 0)
      endAngle     // end angle (postupně do 2π)
    );
    ctx.stroke();
    
    ctx.restore();
  }
  
  // 5. HLAVNÍ KRUŽNICE
  if (drawProgress > 0) {
    ctx.save();
    
    ctx.strokeStyle = color;
    ctx.lineWidth = isDrawing ? width * 1.5 : width;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.arc(
      center.x,
      center.y,
      radius,
      0,
      endAngle
    );
    ctx.stroke();
    
    ctx.restore();
  }
};
```

#### 5. Kompletní rendering (v jednom framu)

```typescript
const renderCircleWithCompass = (ctx, center, radius, progress) => {
  // 1. Existující geometrie (úsečka AB, body)
  drawSegment(ctx, pointA, pointB, '#1f2937', 6, 1.0);
  drawPoint(ctx, pointA, 'A', '#1f2937');
  drawPoint(ctx, pointB, 'B', '#1f2937');
  
  // 2. Neonové podsvícení kružnice
  // 3. Hlavní kružnice
  drawCircle(ctx, center, radius, '#3b82f6', 4, progress);
  
  // 4. Kružítko (NAD kružnicí)
  drawCompass(ctx, center, radius, progress);
  
  // 5. Body znovu (nad vším)
  drawPoint(ctx, pointA, 'A', '#1f2937');
  drawPoint(ctx, pointB, 'B', '#1f2937');
};
```

### Příklad: Frame-by-frame pro kružnici

**Frame 1** (progress = 0.00):
```
- Kružítko: opacity = 0.0, angle = 0
- Kružnice: endAngle = 0 (nic)
- Výsledek: Jen úsečka AB s body
```

**Frame 10** (progress = 0.08):
```
- Kružítko: 
  - opacity = 0.53 (objevuje se)
  - angle = 0 (statické v pozici "3 hodiny")
- Kružnice: endAngle = 0
- Výsledek: Poloprůhledné kružítko zapíchnuté v A
```

**Frame 19** (progress = 0.15):
```
- Kružítko: 
  - opacity = 1.0 (plně viditelné)
  - angle = 0 (statické)
- Kružnice: endAngle = 0 (právě začíná)
- Výsledek: Jasné kružítko, žádná kružnice
```

**Frame 25** (progress = 0.20):
```
- Kružítko:
  - opacity = 1.0
  - angle = 0.09 rad ≈ 5° (začalo se otáčet)
- Kružnice:
  - endAngle = 0.09 rad
  - Neonové podsvícení: ANO
  - Šířka: 6px (1.5 × 4)
- Výsledek: Kružítko začalo rýsovat malý oblouk
```

**Frame 40** (progress = 0.32):
```
- Kružítko:
  - angle = 0.34 rad ≈ 20°
  - Tužka kružítka je na pozici:
    x = center.x + radius × cos(20°)
    y = center.y + radius × sin(20°)
- Kružnice:
  - endAngle = 0.34 rad (20° oblouk)
  - Žluté podsvícení následuje tužku
```

**Frame 63** (progress = 0.50, polovina):
```
- Kružítko:
  - angle = π (180°)
  - Tužka je na opačné straně od hrotu
- Kružnice:
  - endAngle = π (půlkruh)
```

**Frame 85** (progress = 0.68):
```
- Kružítko:
  - angle = 4.24 rad ≈ 243°
  - Kružítko pokračuje v otáčení
- Kružnice:
  - endAngle = 4.24 rad (270° oblouk)
```

**Frame 107** (progress = 0.85, konec):
```
- Kružítko:
  - opacity = 1.0 (začne blednout)
  - angle = 2π (360°, zpět na začátku)
- Kružnice:
  - endAngle = 2π (úplná kružnice)
  - Podsvícení: NE
  - Šířka: 4px (normální)
```

**Frame 120** (progress = 0.96):
```
- Kružítko: opacity = 0.27 (téměř zmizelo)
- Kružnice: endAngle = 2π (kompletní)
```

**Frame 125** (progress = 1.00):
```
- Kružítko: opacity = 0.0
- Kružnice: endAngle = 2π
- Výsledek: Jen čistá modrá kružnice
```

---

## Frame-by-frame analýza

### Synchronizace kružítka a kružnice

**Klíčové**: Špička tužky kružítka MUSÍ být přesně na místě, kde končí narýsovaná kružnice.

```typescript
// Pozice tužky
const pencilX = center.x + radius * Math.cos(currentAngle);
const pencilY = center.y + radius * Math.sin(currentAngle);

// Konec kružnice
const arcEndX = center.x + radius * Math.cos(currentAngle);
const arcEndY = center.y + radius * Math.sin(currentAngle);

// → Identické!
```

**Vizualizace synchronizace**:

```
Progress = 0.30 (angle = 67.5°):

         Tužka
           ● ← Zde končí neonové podsvícení
          /│
         / │
        /  │ kružítko
       /   │
      ●────┘
     Center
      │╲
      │ ╲ 67.5°
      │  ╲____
      │   ╲   ╲
      │    ╲___╲● Konec oblouku
      │         
```

### Důležité timing momenty

**Moment 1: První pixel** (progress ≈ 0.151):
```
- Právě začalo rýsování
- Kružítko se "drží" na pozici 0°
- První malý bod kružnice se objevil
- Neonové podsvícení zapnuto
```

**Moment 2: Čtvrtina** (progress = 0.325):
```
- Kružítko v pozici 90° (nahoře)
- Čtvrtina kružnice narýsovaná
- Žluté podsvícení jasně viditelné
```

**Moment 3: Polovina** (progress = 0.50):
```
- Kružítko v pozici 180° (vlevo)
- Půlkruh dokončen
```

**Moment 4: Tři čtvrtiny** (progress = 0.675):
```
- Kružítko v pozici 270° (dole)
- Tři čtvrtě kružnice hotové
```

**Moment 5: Téměř hotovo** (progress = 0.849):
```
- Kružítko v pozici 359°
- Téměř úplná kružnice
- Poslední malý oblouk s podsvícením
```

**Moment 6: Dokončeno** (progress = 0.850):
```
- Kružnice KOMPLETNÍ (360°)
- Podsvícení VYPNUTO
- Kružítko začíná blednout
```

---

## Kompletní implementace

### Hlavní render funkce

```typescript
const renderToBuffer = () => {
  const bufferCanvas = bufferCanvasRef.current;
  if (!bufferCanvas) return;
  
  const ctx = bufferCanvas.getContext('2d');
  if (!ctx) return;
  
  const dpr = window.devicePixelRatio || 1;
  
  // 1. VYMAZAT CANVAS
  ctx.clearRect(0, 0, canvasSize.width * dpr, canvasSize.height * dpr);
  
  // 2. POZADÍ
  ctx.fillStyle = darkMode ? '#111827' : '#ffffff';
  ctx.fillRect(0, 0, canvasSize.width * dpr, canvasSize.height * dpr);
  
  // 3. MŘÍŽKA
  drawGrid(ctx);
  
  // 4. GEOMETRIE (v world coordinates)
  ctx.save();
  ctx.translate(offset.x, offset.y);
  ctx.scale(scale, scale);
  
  // Vykreslit aktuální krok konstrukce
  steps[currentStep].draw(
    ctx,
    scale,
    offset,
    pointA,
    pointB,
    radius,
    intersections,
    animProgress,
    currentStep,
    currentStep
  );
  
  ctx.restore();
  
  // 5. BODY (NAD geometrií, ale ve world coordinates)
  ctx.save();
  ctx.translate(offset.x, offset.y);
  ctx.scale(scale, scale);
  
  drawPoint(ctx, pointA, 'A', segmentColor);
  drawPoint(ctx, pointB, 'B', segmentColor);
  
  ctx.restore();
  
  // 6. POPISKY (ve screen coordinates)
  ctx.save();
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  
  if (showCaptions) {
    drawStepTitle(ctx, steps[currentStep].title);
    drawStepDescription(ctx, steps[currentStep].description);
  }
  
  ctx.restore();
};
```

### Definice kroků (příklad pro osa úsečky)

```typescript
const steps: ConstructionStep[] = [
  // KROK 0: Narýsuj úsečku AB
  {
    id: 0,
    title: 'Narýsuj úsečku AB',
    description: 'Začneme s úsečkou AB o délce 6 cm.',
    draw: (ctx, scale, offset, pA, pB, r, inter, progress) => {
      const dpr = window.devicePixelRatio || 1;
      const angle = Math.atan2(pB.y - pA.y, pB.x - pA.x);
      const color = darkMode ? '#e5e7eb' : '#1f2937';
      
      // Pravítko (pokud showCaptions)
      if (showCaptions) {
        drawRuler(ctx, pA, pB, progress);
      }
      
      // Úsečka s animací
      drawSegment(ctx, pA, pB, color, 6, progress);
      
      // Koncové značky
      drawEndpointMark(ctx, pA, angle, color);
      drawEndpointMark(ctx, pB, angle, color);
      
      // Popisky bodů (ve screen space, takže mimo transformaci)
      // Vykreslí se v kroku 5 (body)
    }
  },
  
  // KROK 1: Zapíchni kružítko do A
  {
    id: 1,
    title: 'Zapíchni kružítko do bodu A',
    description: 'Zapíchneme kružítko do bodu A...',
    draw: (ctx, scale, offset, pA, pB, r, inter, progress) => {
      // Úsečka (hotová)
      drawSegment(ctx, pA, pB, color, 6, 1.0);
      
      // Kružítko STATICKÉ (angle = 0)
      if (showCaptions) {
        drawCompass(ctx, pA, r, progress, 0);
      }
      
      // Bod A červeně zvýrazněný
      // (vykresli se v kroku 5)
    }
  },
  
  // KROK 2: Narýsuj kružnici z A
  {
    id: 2,
    title: 'Narýsuj kružnici z bodu A',
    description: 'Narýsujeme kružnici s poloměrem...',
    draw: (ctx, scale, offset, pA, pB, r, inter, progress) => {
      const circleColor = darkMode ? '#93c5fd' : '#3b82f6';
      
      // Úsečka (hotová)
      drawSegment(ctx, pA, pB, segmentColor, 6, 1.0);
      
      // Kružnice s animací
      drawCircle(ctx, pA, r, circleColor, 4, progress);
      
      // Kružítko ROTUJÍCÍ
      if (showCaptions) {
        // Výpočet úhlu podle progress
        let angle = 0;
        if (progress > 0.15 && progress < 0.85) {
          const drawProg = (progress - 0.15) / 0.7;
          angle = Math.PI * 2 * drawProg;
        } else if (progress >= 0.85) {
          angle = Math.PI * 2;
        }
        
        drawCompass(ctx, pA, r, progress, angle);
      }
    }
  },
  
  // ... další kroky
];
```

### Helper funkce: drawCompass s rotací

```typescript
const drawCompass = (
  ctx: CanvasRenderingContext2D,
  center: Point,
  radius: number,
  progress: number,
  angle: number  // explicitní úhel nebo null pro automatický
) => {
  if (!showCaptions || !compassLoaded || !compassImageRef.current) return;
  
  // Opacity podle timeline
  let compassAlpha = 0;
  if (progress < 0.15) {
    compassAlpha = progress / 0.15;
  } else if (progress >= 0.15 && progress <= 0.85) {
    compassAlpha = 1.0;
  } else if (progress > 0.85 && progress < 1.0) {
    compassAlpha = (1 - progress) / 0.15;
  } else {
    return;  // skryté
  }
  
  const compass = compassImageRef.current;
  const compassWidth = radius;
  const compassHeight = radius;
  
  ctx.save();
  
  // Transformace
  ctx.translate(center.x, center.y);
  ctx.rotate(angle);  // použít zadaný úhel
  ctx.globalAlpha = compassAlpha;
  
  // Vykreslení
  ctx.drawImage(
    compass,
    0,
    -compassHeight,
    compassWidth,
    compassHeight
  );
  
  ctx.globalAlpha = 1.0;
  ctx.restore();
};
```

---

## Debugging a ladění

### Vizualizace pro debugging

```typescript
// Přidat do render funkce (pouze při vývoji)
const DEBUG = false;

if (DEBUG && showCaptions) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);  // screen space
  
  // Timeline info
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fillRect(10, 10, 300, 120);
  ctx.fillStyle = '#fff';
  ctx.font = '14px monospace';
  ctx.fillText(`Progress: ${animProgress.toFixed(3)}`, 20, 30);
  ctx.fillText(`Step: ${currentStep}`, 20, 50);
  
  // Fáze
  let phase = '';
  if (animProgress < 0.15) phase = 'FADE IN';
  else if (animProgress < 0.85) phase = 'DRAWING';
  else if (animProgress < 1.0) phase = 'FADE OUT';
  else phase = 'DONE';
  ctx.fillText(`Phase: ${phase}`, 20, 70);
  
  // Drawing progress
  const drawProg = Math.max(0, Math.min(1, (animProgress - 0.15) / 0.7));
  ctx.fillText(`Draw Progress: ${drawProg.toFixed(3)}`, 20, 90);
  
  // Angle (pro kružnici)
  const angle = Math.PI * 2 * drawProg;
  ctx.fillText(`Angle: ${(angle * 180 / Math.PI).toFixed(1)}°`, 20, 110);
  
  ctx.restore();
  
  // Vizualizovat pozici tužky (pro kružnici)
  if (currentStep === 2 || currentStep === 4) {
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);
    
    const angle = Math.PI * 2 * drawProg;
    const pencilX = pointA.x + radius * Math.cos(angle);
    const pencilY = pointA.y + radius * Math.sin(angle);
    
    // Červený křížek na pozici tužky
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(pencilX - 10, pencilY);
    ctx.lineTo(pencilX + 10, pencilY);
    ctx.moveTo(pencilX, pencilY - 10);
    ctx.lineTo(pencilX, pencilY + 10);
    ctx.stroke();
    
    ctx.restore();
  }
}
```

### Testování různých rychlostí

```typescript
// V useEffect animační smyčky
const SPEED_MULTIPLIER = 1.0;  // změnit pro testování

let increment = 0.008 * SPEED_MULTIPLIER;

// SPEED_MULTIPLIER = 2.0 → 2× rychlejší
// SPEED_MULTIPLIER = 0.5 → 2× pomalejší
// SPEED_MULTIPLIER = 10.0 → velmi rychlé (pro debugging)
```

### Kontrola synchronizace

```typescript
// Přidat do drawCircle a drawCompass
const DEBUG_SYNC = false;

if (DEBUG_SYNC) {
  console.log({
    progress: progress.toFixed(3),
    drawProgress: drawProgress.toFixed(3),
    circleEndAngle: (endAngle * 180 / Math.PI).toFixed(1) + '°',
    compassAngle: (angle * 180 / Math.PI).toFixed(1) + '°',
    difference: Math.abs(endAngle - angle).toFixed(6)
  });
  
  // Difference by měl být vždy ~0.000000
}
```

### Časté problémy a řešení

#### Problém 1: Kružítko se neotáčí správně

**Příznaky**: Kružítko je statické nebo skáče.

**Řešení**:
```typescript
// Zkontrolovat výpočet úhlu
let angle = 0;
if (progress > 0.15 && progress < 0.85) {
  const drawProgress = (progress - 0.15) / 0.7;
  angle = Math.PI * 2 * drawProgress;  // ← 2π, ne π!
}
```

#### Problém 2: Hrot kružítka není ve středu

**Příznaky**: Kružítko se "plazí" po plátně.

**Řešení**:
```typescript
// SVG kružítko MUSÍ mít hrot v levém dolním rohu
// Při vykreslení:
ctx.drawImage(
  compass,
  0,              // ← X musí být 0!
  -compassHeight, // ← Y musí být -height!
  compassWidth,
  compassHeight
);
```

#### Problém 3: Neonové podsvícení přetéká

**Příznaky**: Žlutá záře je vidět i po dokončení.

**Řešení**:
```typescript
// Kontrola isDrawing
const isDrawing = drawProgress > 0 && drawProgress < 1;

// Kreslit podsvícení POUZE když:
if (isDrawing && drawProgress > 0) {
  // ... neonové podsvícení
}
```

#### Problém 4: Pravítko není vycentrované

**Příznaky**: Pravítko je moc nalevo/napravo.

**Řešení**:
```typescript
// Offset musí centrovat pravítko nad úsečku
const lineLength = Math.sqrt(
  (p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2
);
const rulerLength = 800;

// Správně:
const rulerOffsetX = lineLength / 2 - rulerLength / 2;

// ← Střed úsečky minus polovina pravítka
```

---

## Závěr

Animační systém je navržen tak, aby:

1. **Pedagogicky**: Student vidí KDE, JAK a CO se rýsuje
2. **Technicky**: Plynulá synchronizace nástroje a čáry
3. **Vizuálně**: Neonové podsvícení zvýrazňuje aktivní místo

### Klíčové principy:

- **Timeline 0.15 - 0.85**: Oddělení fade in/out od samotného kreslení
- **Synchronizace**: Úhel rotace kružítka = úhel narýsované kružnice
- **Z-order**: Podsvícení → čára → nástroj → body
- **Rychlosti**: Různé incrementy pro různé typy kroků

### Pro přidání nového typu animace:

1. Definujte timeline (fade in, drawing, fade out)
2. Vypočítejte drawing progress
3. Implementujte drawingFunction s progress parametrem
4. Synchronizujte nástroj s geometrií
5. Přidejte neonové podsvícení během isDrawing

Tento systém zajišťuje konzistentní a plynulou animaci napříč všemi konstrukcemi! 🎯