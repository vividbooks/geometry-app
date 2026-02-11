# Geometrické konstrukce - Kompletní dokumentace aplikace

## Přehled aplikace

Interaktivní vzdělávací aplikace pro step-by-step zobrazení geometrických konstrukcí. Aplikace umožňuje procvičování různých geometrických konstrukcí s animovaným průvodcem, interaktivním plátnem a profesionálními rýsovacími nástroji.

## Technologie

- **Framework**: React (TypeScript)
- **Styling**: Tailwind CSS v4.0
- **Ikony**: lucide-react
- **UI komponenty**: Vlastní knihovna založená na Radix UI primitives
- **Font**: Fenomen Sans Book (načítán z URL)

## Klíčové vlastnosti

1. **Interaktivní plátno**: Nekonečné canvas s možností posouvání a zoomování
2. **Animované konstrukce**: Step-by-step průvodce s animací rýsování
3. **Profesionální nástroje**: Vizualizace pravítka a kružítka při rýsování
4. **Žluté neonové podsvícení**: Čáry, které se právě rýsují
5. **Dynamické body**: Přesouvatelné body pro experimentování
6. **Dark mode**: Přepínání mezi světlým a tmavým režimem
7. **Responsivní design**: Optimalizováno pro desktop i mobilní zařízení
8. **České značení**: Pravý úhel podle českých norem

## Struktura projektu

```
/
├── App.tsx                                  # Hlavní vstupní bod aplikace
├── styles/
│   └── globals.css                          # Globální styly, font, CSS proměnné
└── components/
    ├── GeometryMenu.tsx                     # Menu s výběrem konstrukcí
    ├── ConstructionControlPanel.tsx         # Sdílený ovládací panel pro všechny konstrukce
    ├── BisectorConstruction.tsx             # Konstrukce osy úsečky
    ├── TriangleConstruction.tsx             # Konstrukce trojúhelníku SSS
    ├── InteractiveTriangleConstruction.tsx  # Vlastní trojúhelník s uživatelským zadáním
    ├── AngleTriangleConstruction.tsx        # Konstrukce trojúhelníku z úhlů
    ├── AxialSymmetryConstruction.tsx        # Osově souměrný obraz trojúhelníku
    ├── BigNumberInput.tsx                   # Velký číselný input s šipkami
    └── ui/
        ├── use-mobile.ts                    # Hook pro detekci mobilních zařízení
        ├── slider.tsx                       # Slider komponenta pro zoom
        ├── button.tsx                       # Základní tlačítka
        └── ... (další UI komponenty)
```

## Hlavní komponenty

### 1. App.tsx

Hlavní komponenta řídící navigaci mezi různými konstrukcemi.

**Props**: Žádné (root komponenta)

**Stav**:
- `selectedConstruction`: Aktuálně vybraná konstrukce ('menu' | 'bisector' | 'triangle' | 'custom-triangle' | 'angle-triangle' | 'axial-symmetry')
- `darkMode`: Boolean pro dark mode

**Funkce**:
- Řízení navigace mezi menu a jednotlivými konstrukcemi
- Předávání dark mode stavu do child komponent

### 2. GeometryMenu.tsx

Menu s přehledem dostupných geometrických konstrukcí.

**Props**:
- `onSelect: (construction: string) => void` - Callback při výběru konstrukce
- `darkMode: boolean` - Stav dark mode

**Konstrukce v menu**:
1. **Osa úsečky** (2. ročník)
2. **Osově souměrný obraz** (6. ročník)
3. **Trojúhelník SSS** (7. ročník)
4. **Vlastní trojúhelník** (7. ročník)
5. **Trojúhelník z úhlů** (7. ročník)

### 3. ConstructionControlPanel.tsx

Sdílený ovládací panel používaný všemi konstrukcemi. Zajišťuje jednotný UX napříč aplikací.

**Props**:
- `currentStep: number` - Aktuální krok konstrukce
- `totalSteps: number` - Celkový počet kroků
- `scale: number` - Úroveň přiblížení (0.15 - 2.25)
- `showCaptions: boolean` - Zobrazení popisků a nástrojů
- `darkMode: boolean` - Stav dark mode
- `isMobile: boolean` - Detekce mobilního zařízení
- `onStepChange: (step: number) => void` - Změna kroku
- `onPlayStep: () => void` - Přehrát krok znovu
- `onRestart: () => void` - Restart na začátek
- `onZoomChange: (value: number[]) => void` - Změna zoomu
- `onToggleCaptions: () => void` - Přepnutí popisků
- `onToggleDarkMode: () => void` - Přepnutí dark mode

**Vlastnosti**:
- Plovoucí panel dole uprostřed obrazovky
- Desktop: Horizontální layout s oddělovači
- Mobilní: Vertikální layout ve dvou řadách
- Jednotný design napříč aplikací

### 4. BisectorConstruction.tsx

Konstrukce osy úsečky pomocí kružnic. Referenční implementace s kompletním UX.

**Props**:
- `onBack: () => void` - Návrat do menu
- `darkMode: boolean` - Stav dark mode
- `onDarkModeChange: (dark: boolean) => void` - Změna dark mode

**Kroky konstrukce**:
1. Narýsuj úsečku AB
2. Zapíchni kružítko do bodu A
3. Narýsuj kružnici z bodu A
4. Zapíchni kružítko do bodu B
5. Narýsuj kružnici z bodu B
6. Označ průsečíky X a Y
7. Narýsuj osu úsečky

**Interaktivní prvky**:
- Body A, B lze přesouvat myší/dotykem
- Poloměr kružnic se přepočítává automaticky (70% délky AB)
- Hover efekt na bodech

**Canvas funkce**:
- Double buffering pro plynulé vykreslování
- Mřížka na pozadí
- Animované vykreslování s pravítkem/kružítkem
- Neonové žluté podsvícení při rýsování
- Body vykresleny nad všemi čarami

### 5. TriangleConstruction.tsx

Konstrukce trojúhelníku ze tří zadaných stran (SSS).

**Props**:
- `onBack: () => void`
- `darkMode: boolean`
- `onDarkModeChange: (dark: boolean) => void`
- `customSides?: { ab: number; ac: number; bc: number }` - Volitelné vlastní délky stran

**Kroky konstrukce**:
1. Narýsuj stranu AB
2. Zapíchni kružítko do bodu A
3. Narýsuj kružnici z bodu A (poloměr AC)
4. Zapíchni kružítko do bodu B
5. Narýsuj kružnici z bodu B (poloměr BC)
6. Označ průsečík jako bod C
7. Dorýsuj trojúhelník
8. Opsat trojúhelník (přidat popisky délek)

**Výchozí hodnoty**:
- AB = 5 cm
- AC = 4 cm
- BC = 3 cm

**Zobrazení**:
- Popisky délek na všech stranách
- Automatický přepočet poloměrů při přesouvání bodů
- Průsečík kružnic jako vrchol C

### 6. InteractiveTriangleConstruction.tsx

Vlastní trojúhelník - uživatel zadává délky stran přes velký numerický input.

**Props**:
- `onBack: () => void`
- `darkMode: boolean`
- `onDarkModeChange: (dark: boolean) => void`

**Uživatelské zadání**:
- Velký vizuální input pro délky AB, AC, BC (BigNumberInput)
- Validace trojúhelníkové nerovnosti
- Zobrazení chybové hlášky při neplatném trojúhelníku
- Tlačítko "Začít konstrukci"

**Průběh**:
1. Zadání parametrů (overlay přes canvas)
2. Po potvrzení → stejný průběh jako TriangleConstruction
3. Použití zadaných délek místo výchozích

### 7. AngleTriangleConstruction.tsx

Konstrukce trojúhelníku ze strany a dvou úhlů (SAS variant).

**Props**:
- `onBack: () => void`
- `darkMode: boolean`
- `onDarkModeChange: (dark: boolean) => void`

**Uživatelské zadání**:
- Délka základny AB (cm)
- Úhel α při vrcholu A (stupně)
- Úhel β při vrcholu B (stupně)
- Validace: součet úhlů < 180°

**Kroky konstrukce**:
1. Narýsuj základnu AB
2. Vyznač úhel α u bodu A (úhloměr)
3. Narýsuj rameno z A pod úhlem α
4. Vyznač úhel β u bodu B (úhloměr)
5. Narýsuj rameno z B pod úhlem β
6. Označ průsečík ramen jako bod C
7. Zvýrazni trojúhelník ABC
8. Opsat trojúhelník (přidat popisky úhlů)

**Specifika**:
- Geometrický výpočet průsečíku paprsků
- Vizualizace úhloměru při zadávání úhlů
- Zobrazení hodnot úhlů v popisku

### 8. AxialSymmetryConstruction.tsx

Konstrukce osově souměrného obrazu trojúhelníku.

**Props**:
- `onBack: () => void`
- `darkMode: boolean`
- `onDarkModeChange: (dark: boolean) => void`

**Prvky**:
- Původní trojúhelník ABC (přesouvatelné body)
- Svislá osa souměrnosti (červená čára)
- Obrazové body A', B', C'

**Kroky konstrukce**:
1. Narýsuj trojúhelník ABC
2. Narýsuj osu souměrnosti o
3. Kolmice z bodu A na osu o
4. Změř vzdálenost A od osy
5. Označ bod A' (stejná vzdálenost na druhé straně)
6. Opakuj pro body B a C
7. Dorýsuj obrazový trojúhelník A'B'C'
8. Zvýrazni souměrnost (přerušované spojnice)

**České značení**:
- Pravý úhel značen čtverečkem
- Kolmice označena značkou ⊥
- Osová souměrnost značena o

### 9. BigNumberInput.tsx

Velký vizuální input pro zadávání čísel s šipkami nahoru/dolů.

**Props**:
- `value: number | null` - Aktuální hodnota
- `onChange: (value: number) => void` - Callback při změně
- `min?: number` - Minimální hodnota (default: 0)
- `max?: number` - Maximální hodnota (default: 999)
- `step?: number` - Krok změny (default: 1)
- `unit: 'cm' | '°'` - Jednotka (cm nebo stupně)
- `darkMode?: boolean` - Dark mode
- `label?: string` - Volitelný popisek

**Vlastnosti**:
- Velké číslice (100px)
- Tlačítka + / - pro každou číslici
- 2 číslice pro cm, 3 pro stupně
- Automatické omezení na min/max
- Podpora touch a keyboard input

## Sdílené funkce a koncepty

### Canvas rendering systém

Všechny konstrukce používají podobný rendering systém:

**Double buffering**:
```typescript
const bufferCanvasRef = useRef<HTMLCanvasElement | null>(null);
// Kreslení do buffer canvasu
// Kopírování do hlavního canvasu
```

**DPI scaling**:
```typescript
const dpr = window.devicePixelRatio || 1;
canvas.width = canvasSize.width * dpr;
canvas.height = canvasSize.height * dpr;
```

**Transformace souřadnic**:
```typescript
// World → Screen
const screenX = point.x * scale + offset.x;
const screenY = point.y * scale + offset.y;

// Screen → World
const worldX = (screenX - offset.x) / scale;
const worldY = (screenY - offset.y) / scale;
```

### Animační systém

**Timeline animace** (pravítko/kružítko):
- 0.00 - 0.15: Fade in nástroje
- 0.15 - 0.85: Rýsování s nástrojem
- 0.85 - 1.00: Fade out nástroje

**Neonové podsvícení**:
```typescript
// Žlutá záře pod čárou při rýsování
if (isDrawing && drawProgress > 0) {
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.5)';
  ctx.lineWidth = width * 10;
  // ... kreslení
}
```

**Rychlosti animace**:
- Statické nástroje (krok 1, 3): 0.002 (4x pomalejší)
- Rýsování kružnic (krok 2, 4): 0.005
- Rýsování čar (výchozí): 0.008

### Kreslící funkce

Každá konstrukce implementuje tyto základní funkce:

**drawPoint()**: Vykreslení bodu s popiskem
- Světlé pozadí (halo efekt)
- Hlavní bod (7px)
- Bílý/tmavý okraj pro kontrast
- Popisek s šedým kruhovým pozadím

**drawSegment()**: Vykreslení úsečky s animací
- Progresivní kreslení od začátku do konce
- Neonové podsvícení při rýsování
- Silnější čára během kreslení (1.5x)
- Koncové značky (kolmé čárky)

**drawCircle()**: Vykreslení kružnice s animací
- Kreslení po obvodu (0 → 2π)
- Neonové podsvícení
- Synchronizace s rotací kružítka

**drawLine()**: Nekonečná přímka
- Prodloužení za oba body o 50px
- Stejná animace jako úsečka

**drawLabel()**: Popisek v screen space
- Vždy stejná velikost (22px Arial)
- Šedé kruhové pozadí
- Reset transformace pro stálou velikost

**drawRuler()**: Vizualizace pravítka
- SVG načtené z URL
- 800x400px velikost
- Fade in/out podle timeline
- Rotace podle úhlu čáry

**drawCompass()**: Vizualizace kružítka
- SVG načtené z URL
- Velikost = poloměr kružnice
- Rotace podle fáze rýsování
- Hrot v bodě středu

### Interaktivní ovládání

**Myš/Touch interakce**:
- Drag canvas pro posun (levé tlačítko / jeden prst)
- Drag bodu pro přemístění (detekce hover)
- Scroll wheel pro zoom
- Pinch-to-zoom na mobilech

**Klávesnice**:
- Šipky doleva/doprava: Navigace kroky
- +/- : Zoom
- Space: Přehrát krok
- R: Restart

**Hover efekty**:
- Kurzor "grab" nad plátnem
- Kurzor "grabbing" při draggingu
- Kurzor "move" nad bodem
- Světlý kruh kolem bodu při hoveru

### Responsive design

**Breakpoint**: 768px (komponenta useIsMobile)

**Desktop**:
- Výchozí zoom: 0.5
- Horizontální control panel
- Tlačítko "Menu" vlevo nahoře
- Hover efekty

**Mobilní**:
- Výchozí zoom: 0.15 (více oddáleno)
- Vertikální control panel (2 řady)
- Větší touch targets
- Pinch-to-zoom support

## Styly a design

### Font

Fenomen Sans Book načítán z Supabase storage:
```css
@font-face {
  font-family: 'Fenomen Sans';
  src: url('https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/Fenomen%20Sans%20Book.otf');
}
```

### Barevná schémata

**Light mode**:
- Pozadí: `#f9fafb` (menu), bílá (canvas)
- Čáry: `#1f2937` (tmavě šedá)
- Kružnice: `#3b82f6` (modrá)
- Body/průsečíky: `#ef4444` (červená)
- Trojúhelník: `#10b981` (zelená)
- Mřížka: `rgba(229, 231, 235, 0.5)`

**Dark mode**:
- Pozadí: `#111827`
- Čáry: `#e5e7eb` (světle šedá)
- Kružnice: `#93c5fd` (světle modrá)
- Body/průsečíky: `#fca5a5` (světle červená)
- Trojúhelník: `#6ee7b7` (světle zelená)
- Mřížka: `rgba(31, 41, 55, 0.3)`

**Konstanty**:
- Neonové podsvícení: `rgba(251, 191, 36, 0.5)` (žlutá)
- Control panel modré tlačítko: `#2563eb`

### CSS proměnné

V `/styles/globals.css`:
- `--font-family`: Fenomen Sans fallback stack
- `--radius`: 0.625rem (zaoblení rohů)
- Barevné tokeny pro light/dark mode
- Typografické proměnné

## Externí zdroje

### Obrázky nástrojů

**Pravítko**:
```
https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/pravitko4.svg
```

**Kružítko**:
```
https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/kruzitko.svg
```

**Úhloměr** (použito v AngleTriangleConstruction):
```
https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/uhlo.svg
```

## Jak integrovat do jiné aplikace

### ⚠️ DŮLEŽITÉ: Externí assety

Aplikace **vyžaduje** přístup k následujícím SVG souborům:

1. **Pravítko** (`pravitko4.svg`) - používáno při rýsování úseček a přímek
2. **Kružítko** (`kruzitko.svg`) - používáno při rýsování kružnic
3. **Úhloměr** (`uhlo.svg`) - používáno při konstrukci úhlů
4. **Font Fenomen Sans Book** (`.otf`) - vlastní font aplikace

**Tyto soubory jsou momentálně načítány z externího Supabase storage.**

### Možnosti řešení pro vlastní aplikaci:

#### Možnost 1: Použít existující URL (nejjednodušší)
Soubory zůstanou načítané z původních URL. Aplikace bude fungovat, ale bude závislá na dostupnosti externího serveru.

#### Možnost 2: Stáhnout a hostovat lokálně (doporučeno)
1. Stáhnout SVG soubory z URL
2. Umístit je do složky `/public/assets/` ve vašem projektu
3. Upravit URL v kódu:

```typescript
// Místo:
img.src = 'https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/pravitko4.svg';

// Použít:
img.src = '/assets/pravitko4.svg';
```

**Soubory k úpravě**:
- `BisectorConstruction.tsx` (řádky ~116, ~130)
- `TriangleConstruction.tsx` (řádky ~140, ~150)
- `InteractiveTriangleConstruction.tsx`
- `AngleTriangleConstruction.tsx` (včetně úhloměru)
- `AxialSymmetryConstruction.tsx`
- `styles/globals.css` (font na řádku 5)

#### Možnost 3: Vlastní SVG
Můžete vytvořit vlastní SVG ilustrace nástrojů a použít je místo originálu. Důležité je zachovat proporce a orientaci:
- **Pravítko**: 800x400px, horizontální orientace
- **Kružítko**: čtvercový formát, hrot v levém dolním rohu
- **Úhloměr**: půlkruhový, střed v levém středu

### Jako standalone komponenta

```tsx
import App from './App';

function MyApp() {
  return (
    <div className="w-full h-screen">
      <App />
    </div>
  );
}
```

### Jako vložená komponenta

```tsx
import { BisectorConstruction } from './components/BisectorConstruction';

function MyApp() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div className="w-full h-[600px]">
      <BisectorConstruction
        onBack={() => console.log('Back clicked')}
        darkMode={darkMode}
        onDarkModeChange={setDarkMode}
      />
    </div>
  );
}
```

### Vyžadované závislosti

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "lucide-react": "latest",
    "@radix-ui/react-slider": "latest"
  }
}
```

### Vyžadované soubory

**Minimální struktura**:
```
/App.tsx
/styles/globals.css
/components/
  - GeometryMenu.tsx
  - BisectorConstruction.tsx (nebo jiná konstrukce)
  - ConstructionControlPanel.tsx
  - ui/
    - use-mobile.ts
    - slider.tsx
```

## Klíčové vlastnosti UX

### Jednotný design pattern

Všechny konstrukce dodržují stejný UX pattern zavedený v BisectorConstruction:

1. **Layout**:
   - Fullscreen canvas
   - Plovoucí control panel dole
   - Tlačítko "Menu" vlevo nahoře
   - Nadpis a popisek jako součást plátna

2. **Ovládání**:
   - Stejné klávesové zkratky
   - Stejné gesta myši/touch
   - Stejné umístění ovládacích prvků

3. **Vizualizace**:
   - Stejné animační tempo
   - Stejné kurzory
   - Stejné hover efekty
   - Stejné barevné schéma

### Optimalizace výkonu

**Double buffering**: Vykreslování do off-screen canvasu před kopírováním
**Request animation frame**: Plynulé animace
**Event throttling**: Omezení render callů při dragging
**Conditional rendering**: Pravítko/kružítko pouze při showCaptions=true

### Accessibility

- ARIA labels na všech tlačítkách
- Keyboard navigation
- Vysoký kontrast v obou režimech
- Velké touch targets na mobilu (min 44x44px)
- Focus states na všech interaktivních prvcích

## Budoucí rozšíření

### Možné nové konstrukce

1. Konstrukce rovnostranného trojúhelníku
2. Konstrukce pravidelného šestiúhelníku
3. Konstrukce tečny ke kružnici
4. Středová souměrnost
5. Konstrukce výšky trojúhelníku
6. Kružnice opsaná/vepsaná trojúhelníku

### Technické vylepšení

1. Export konstrukce jako PNG/SVG
2. Sdílení konstrukce (URL parametry)
3. Historie kroků (undo/redo)
4. Nahrávání vlastních konstrukcí
5. Průvodce hlasem (text-to-speech)
6. Kvízy a interaktivní testy

## Závěr

Aplikace je navržena jako modulární systém, kde každá konstrukce je samostatná komponenta s jednotným UX. Klíčové je dodržování design patternu z BisectorConstruction a používání sdíleného ConstructionControlPanel pro konzistentní uživatelský zážitek.

Všechny konstrukce jsou vizuálně identické v layoutu a ovládání, liší se pouze v počtu kroků a geometrické logice. To umožňuje snadné přidávání nových konstrukcí podle stejné šablony.