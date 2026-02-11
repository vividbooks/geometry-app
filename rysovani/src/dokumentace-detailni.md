# Geometrické konstrukce - Detailní kompletní dokumentace

## Obsah

1. [Přehled aplikace](#přehled-aplikace)
2. [Technický stack](#technický-stack)
3. [Architektura aplikace](#architektura-aplikace)
4. [Detailní popis konstrukcí](#detailní-popis-konstrukcí)
5. [Technická implementace](#technická-implementace)
6. [Canvas rendering systém](#canvas-rendering-systém)
7. [Externí assety a závislosti](#externí-assety-a-závislosti)
8. [Integrace do jiné aplikace](#integrace-do-jiné-aplikace)
9. [Příklady kódu](#příklady-kódu)

---

## Přehled aplikace

**Geometrické konstrukce** je interaktivní vzdělávací webová aplikace určená pro výuku geometrických konstrukcí na základních a středních školách. Aplikace umožňuje studentům sledovat krok za krokem, jak se provádějí klasické geometrické konstrukce pomocí kružítka a pravítka.

### Klíčové vlastnosti

- ✅ **Step-by-step animace** - každá konstrukce rozdělena do logických kroků
- ✅ **Interaktivní plátno** - nekonečné canvas s pan & zoom
- ✅ **Profesionální nástroje** - vizualizace pravítka, kružítka a úhloměru
- ✅ **Žluté neonové podsvícení** - zvýraznění čar, které se právě rýsují
- ✅ **Dynamické body** - studenti mohou přesouvat body a vidět, jak se konstrukce mění
- ✅ **Dark mode** - šetrný k očím při práci večer
- ✅ **Responsivní design** - funguje na desktopu i na tabletech/mobilech
- ✅ **České značení** - pravé úhly, kolmice podle českých norem
- ✅ **Touch gestures** - pinch-to-zoom, drag na touch zařízeních

---

## Technický stack

### Framework a knihovny

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "lucide-react": "latest",
    "@radix-ui/react-slider": "latest",
    "@radix-ui/react-*": "latest (různé UI primitives)"
  },
  "devDependencies": {
    "tailwindcss": "^4.0.0",
    "@types/react": "^18.0.0",
    "@types/node": "^20.0.0"
  }
}
```

### Technologie

- **React 18** - využití Hooks (useState, useEffect, useRef)
- **TypeScript** - type safety, lepší developer experience
- **Tailwind CSS v4.0** - utility-first styling, CSS variables
- **Canvas API** - nativní HTML5 canvas pro kreslení
- **Lucide React** - moderní SVG ikony
- **Radix UI** - headless UI komponenty (slider, button, atd.)

### Proč tyto technologie?

- **Canvas API** - nejvýkonnější způsob pro složité geometrické kreslení
- **React** - komponentová architektura, snadná správa stavu
- **TypeScript** - prevence chyb při práci s geometrickými výpočty
- **Tailwind** - rychlý vývoj, konzistentní design

---

## Architektura aplikace

### Struktura souborů

```
/
├── App.tsx                                  # Root komponenta, router
├── styles/
│   └── globals.css                          # Globální CSS, font, tokeny
│
├── components/
│   ├── GeometryMenu.tsx                     # Výběr konstrukce
│   ├── ConstructionControlPanel.tsx         # Sdílený ovládací panel
│   │
│   ├── BisectorConstruction.tsx             # Osa úsečky
│   ├── TriangleConstruction.tsx             # Trojúhelník SSS
│   ├── InteractiveTriangleConstruction.tsx  # Vlastní trojúhelník
│   ├── AngleTriangleConstruction.tsx        # Trojúhelník z úhlů
│   ├── AxialSymmetryConstruction.tsx        # Osová souměrnost
│   │
│   ├── BigNumberInput.tsx                   # Velký číselný input
│   │
│   └── ui/
│       ├── use-mobile.ts                    # Hook pro mobile detection
│       ├── slider.tsx                       # Zoom slider
│       ├── button.tsx                       # Tlačítka
│       └── ... (další UI komponenty)
│
└── public/
    └── assets/                              # (doporučeno přidat)
        ├── pravitko4.svg
        ├── kruzitko.svg
        └── uhlo.svg
```

### Tok dat

```
App.tsx
  ├─ stav: selectedConstruction (menu | bisector | triangle | ...)
  ├─ stav: darkMode
  └─ render podle vybrané konstrukce
      │
      ├─ GeometryMenu
      │   └─ onClick → změna selectedConstruction
      │
      └─ [Specific]Construction (např. BisectorConstruction)
          ├─ props: onBack, darkMode, onDarkModeChange
          ├─ interní stav: currentStep, scale, offset, animProgress
          ├─ canvas rendering logic
          ├─ event handlers (myš, touch, keyboard)
          └─ ConstructionControlPanel
              └─ callbacks: onStepChange, onZoomChange, ...
```

### Sdílený design pattern

Všechny konstrukce (`*Construction.tsx`) dodržují **jednotný pattern**:

1. **Stejný layout**:
   - Fullscreen canvas přes celou obrazovku
   - Tlačítko "Menu" vlevo nahoře (ArrowLeft)
   - Plovoucí control panel dole uprostřed
   - Nadpis a popisek vykreslené jako součást canvasu

2. **Stejný interní stav**:
   ```typescript
   const [currentStep, setCurrentStep] = useState(0);
   const [scale, setScale] = useState(isMobile ? 0.15 : 0.5);
   const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
   const [animProgress, setAnimProgress] = useState(0);
   const [isAnimating, setIsAnimating] = useState(true);
   const [showCaptions, setShowCaptions] = useState(true);
   ```

3. **Stejné event handlery**:
   - `handleMouseDown`, `handleMouseMove`, `handleMouseUp`
   - `handleWheel` (zoom)
   - `handleTouchStart`, `handleTouchMove`, `handleTouchEnd`
   - `handleKeyDown` (klávesnice)

4. **Stejný rendering pipeline**:
   ```
   useEffect → requestAnimationFrame → renderToBuffer → copy to main canvas
   ```

---

## Detailní popis konstrukcí

### 1. Osa úsečky (BisectorConstruction)

#### Geometrický postup

**Zadání**: Máme úsečku AB, chceme najít její osu (kolmici procházející středem).

**Postup**:
1. Narýsuj úsečku AB
2. Zapíchni kružítko do bodu A, nastav poloměr větší než |AB|/2
3. Narýsuj kružnici k₁(A, r)
4. Zapíchni kružítko do bodu B, ponechej stejný poloměr r
5. Narýsuj kružnici k₂(B, r)
6. Kružnice k₁ a k₂ se protnou ve dvou bodech X a Y
7. Narýsuj přímku XY - to je osa úsečky AB

**Matematika**:
- Poloměr: r = 0.7 × |AB| (musí být > |AB|/2, aby se kružnice protly)
- Průsečíky dvou kružnic:
  ```
  Střed A: (x₁, y₁), poloměr r
  Střed B: (x₂, y₂), poloměr r
  Vzdálenost středů: d = |AB|
  
  Bod na spojnici AB ve vzdálenosti a od A:
    a = d/2 (protože r₁ = r₂)
  
  Výška kolmice z tohoto bodu:
    h = √(r² - a²)
  
  Průsečíky X, Y:
    směr kolmice: perp = (-dy/d, dx/d)
    X = midpoint + h × perp
    Y = midpoint - h × perp
  ```

#### Kroky v aplikaci

**Krok 0: Narýsuj úsečku AB**
- Úsečka AB se animovaně vykresluje s pravítkem
- Timeline: 0.0-0.15 fade in pravítka, 0.15-0.85 kreslení, 0.85-1.0 fade out
- Neonové žluté podsvícení (10× tlustší než hlavní čára) během kreslení
- Koncové značky (kolmé čárky) na bodech A, B
- Popisky "A" a "B" s šedým kruhovým pozadím
- **Interaktivita**: Body A a B lze přesouvat myší!

**Krok 1: Zapíchni kružítko do bodu A**
- Statické zobrazení úsečky AB
- Bod A je červeně zvýrazněný (highlight color)
- Kružítko se zobrazuje staticky zapíchnuté v bodě A
- Popisek: "Zapíchneme kružítko do bodu A a vezmeme do něj délku větší než polovina úsečky AB"
- Animace kružítka: fade in (0.0-0.15)

**Krok 2: Narýsuj kružnici z bodu A**
- Kružnice se animovaně vykresluje po obvodu (0° → 360°)
- Kružítko se otáčí synchronně s kreslením kružnice
- Žluté neonové podsvícení následuje špičku kružítka
- Barva kružnice: modrá (#3b82f6 light, #93c5fd dark)
- Šířka čáry: 4px (během kreslení 6px)

**Krok 3: Zapíchni kružítko do bodu B**
- První kružnice zůstává viditelná
- Bod B je červeně zvýrazněný
- Kružítko se přesune k bodu B (staticky)
- Popisek: "Teď zapíchneme kružítko do bodu B. Velikost (poloměr) v kružítku NEMĚNÍME!"
- Důraz na zachování poloměru!

**Krok 4: Narýsuj kružnici z bodu B**
- Druhá kružnice se animovaně vykresluje se stejným poloměrem
- Kružítko se opět otáčí
- Viditelné jsou už obě kružnice + úsečka AB

**Krok 5: Označ průsečíky X a Y**
- Průsečíky kružnic se zvýrazní s fade-in animací
- Body X (nahoře) a Y (dole) vykresleny jako červené body
- Světlý halo efekt kolem bodů (10px)
- Hlavní bod 7px s bílým okrajem 2px
- Popisky "X" a "Y"
- **Body jsou vykresleny NAD všemi čarami** (poslední ve z-order)

**Krok 6: Narýsuj osu úsečky**
- Přímka XY se animovaně vykresluje s pravítkem
- Přímka je prodloužena o 50px za oba průsečíky
- Modrá barva (#60a5fa)
- Popisek: "Spojíme body X a Y přímkou. Tato přímka je OSA úsečky AB"

**Krok 7: Gotovo!**
- Kompletní konstrukce
- Všechny prvky viditelné
- Shrnutí: "Osa úsečky je kolmá na AB a prochází jejím středem"

#### Interaktivní prvky

**Přesouvání bodů A, B**:
- Hover efekt: kurzor "move", světlý kruh kolem bodu
- Během draggingu: kurzor "grabbing"
- Průběžný přepočet:
  - Nová délka úsečky |AB|
  - Nový poloměr r = 0.7 × |AB|
  - Nové průsečíky X, Y
- Konstrukce zůstává korektní při jakékoliv pozici A, B

**Zobrazení délek**:
- Při showCaptions=true: popisek "6 cm" uprostřed úsečky
- Popisek rotovaný podle úhlu úsečky
- Vždy čitelný (white background)

#### Technické detaily

**SVG pravítko**:
```typescript
const ruler = rulerImageRef.current;
const rulerLength = 800;
const rulerWidth = 400;

// Umístění: vycentrované nad úsečkou
ctx.translate(pointA.x, pointA.y);
ctx.rotate(angle); // úhel úsečky AB
ctx.drawImage(ruler, 
  lineLength/2 - rulerLength/2,  // X: centrováno
  -rulerWidth,                    // Y: nad čárou
  rulerLength, 
  rulerWidth
);
```

**SVG kružítko**:
```typescript
const compass = compassImageRef.current;
const compassWidth = radius;  // velikost podle poloměru
const compassHeight = radius;

// Hrot kružítka je v levém dolním rohu SVG
ctx.translate(center.x, center.y);
ctx.rotate(angle); // otáčení při rýsování
ctx.drawImage(compass, 
  0,              // X: hrot na středu
  -compassHeight, // Y: dolní okraj na středu
  compassWidth, 
  compassHeight
);
```

---

### 2. Trojúhelník SSS (TriangleConstruction)

#### Geometrický postup

**Zadání**: Narýsuj trojúhelník ABC, když jsou dány délky všech tří stran:
- |AB| = c (například 5 cm)
- |AC| = b (například 4 cm)
- |BC| = a (například 3 cm)

**Podmínka existence**: Trojúhelníková nerovnost musí platit:
```
a + b > c
b + c > a
c + a > b
```

**Postup**:
1. Narýsuj základnu AB délky c
2. Zapíchni kružítko do bodu A, nastav poloměr b (= |AC|)
3. Narýsuj kružnici k₁(A, b)
4. Zapíchni kružítko do bodu B, nastav poloměr a (= |BC|)
5. Narýsuj kružnici k₂(B, a)
6. Kružnice se protnou v bodě C (použijeme horní průsečík)
7. Spoj body A-C a B-C
8. Trojúhelník ABC je hotový

**Matematika průsečíků**:
```
Kružnice k₁: střed A(x₁, y₁), poloměr r₁ = b
Kružnice k₂: střed B(x₂, y₂), poloměr r₂ = a
Vzdálenost středů: d = |AB| = c

Bod na spojnici AB ve vzdálenosti α od A:
  α = (d² + r₁² - r₂²) / (2d)
  α = (c² + b² - a²) / (2c)

Výška kolmice:
  h = √(r₁² - α²) = √(b² - α²)

Střed kolmice:
  M = A + α × (B - A) / d

Průsečíky:
  C_top = M + h × perp
  C_bottom = M - h × perp
  kde perp = (-dy/d, dx/d) je jednotkový vektor kolmý na AB
```

#### Kroky v aplikaci

**Krok 0: Narýsuj stranu AB**
- Úsečka AB = základna trojúhelníku
- Výchozí délka: 5 cm (nebo vlastní zadání)
- Animace s pravítkem
- Popisek délky "5cm" zobrazený po narýsování (progress > 0.85)
- Body A, B jsou přesouvatelné

**Krok 1: Zapíchni kružítko do bodu A**
- Bod A červeně zvýrazněn
- Kružítko statické v bodě A
- Popisek: "Zapíchneme kružítko do bodu A a vezmeme do něj délku strany AC = 4 cm"
- Délka AC je zobrazena jako informace

**Krok 2: Narýsuj kružnici z bodu A**
- Kružnice s poloměrem AC = 4 cm
- Modrá barva
- Animované vykreslování s otáčejícím se kružítkem
- Popisek délky AB stále viditelný

**Krok 3: Zapíchni kružítko do bodu B**
- Bod B červeně zvýrazněn
- První kružnice zůstává
- Popisek: "Teď zapíchneme kružítko do bodu B a vezmeme do něj délku strany BC = 3 cm"

**Krok 4: Narýsuj kružnici z bodu B**
- Druhá kružnice s poloměrem BC = 3 cm
- Obě kružnice nyní viditelné
- Průsečík kružnic bude třetí vrchol C

**Krok 5: Označ průsečík jako bod C**
- Horní průsečík kružnic označen jako bod C
- Červený bod s popiskem "C"
- Fade-in animace bodu
- Všechny tři vrcholy trojúhelníku jsou nyní určeny

**Krok 6: Dorýsuj trojúhelník**
- Animované vykreslení strany AC (zelená barva)
- Pak animované vykreslení strany BC (zelená barva)
- Používá se halfProgress: první polovina → AC, druhá polovina → BC
- Pravítko se objevuje při každé straně
- Po narýsování (progress > 0.85): popisky délek "4cm" a "3cm"

**Krok 7: Opsat trojúhelník**
- Všechny tři popisky délek se postupně objevují s fade-in
- Progress 0.0-0.3: "5cm" (AB)
- Progress 0.3-0.6: "4cm" (AC)
- Progress 0.6-1.0: "3cm" (BC)
- Finální trojúhelník je kompletní s popisky

#### Vlastní zadání (customSides)

Komponenta přijímá volitelný prop `customSides`:
```typescript
interface customSides {
  ab: number;  // délka základny v cm
  ac: number;  // délka strany AC v cm
  bc: number;  // délka strany BC v cm
}
```

Pokud je zadán, používají se tyto hodnoty místo výchozích (5, 4, 3).

#### Přepočet při přesouvání bodů

```typescript
useEffect(() => {
  if (draggedPoint === 'A' || draggedPoint === 'B') {
    // Měřítko: kolik cm je 1 pixel (původně)
    const cmPerPixel = initialSides.ab / initialSegmentLength;
    
    // Aktuální délka AB v pixelech
    const currentABpx = Math.sqrt(
      (pointB.x - pointA.x)² + (pointB.y - pointA.y)²
    );
    
    // Nové délky v cm
    const newAB = currentABpx * cmPerPixel;
    const newAC = sides.ac * (newAB / sides.ab);  // proporcionálně
    const newBC = sides.bc * (newAB / sides.ab);
    
    setSides({ ab: newAB, ac: newAC, bc: newBC });
  }
}, [pointA, pointB, draggedPoint]);
```

---

### 3. Vlastní trojúhelník (InteractiveTriangleConstruction)

#### Koncept

Stejná konstrukce jako TriangleConstruction, ale s **interaktivním vstupem délek** od uživatele.

#### Uživatelské rozhraní

**Vstupní overlay**:
```
┌─────────────────────────────────────┐
│  Zadej délky stran trojúhelníku     │
│                                     │
│  ┌──────────────┐                  │
│  │  cm  ⬆ ⬆    │  Délka AB        │
│  │      05      │                  │
│  │      ⬇ ⬇    │                  │
│  └──────────────┘                  │
│                                     │
│  ┌──────────────┐                  │
│  │  cm  ⬆ ⬆    │  Délka AC        │
│  │      04      │                  │
│  │      ⬇ ⬇    │                  │
│  └──────────────┘                  │
│                                     │
│  ┌──────────────┐                  │
│  │  cm  ⬆ ⬆    │  Délka BC        │
│  │      03      │                  │
│  │      ⬇ ⬇    │                  │
│  └──────────────┘                  │
│                                     │
│  [Začít konstrukci]                │
│                                     │
│  ⚠️ Chyba: Trojúhelník neexistuje! │
│     (zobrazí se při neplatných     │
│      hodnotách)                     │
└─────────────────────────────────────┘
```

**BigNumberInput komponenta**:
- Velké číslice (100px font size)
- 2 číslice pro cm (00-99)
- Šipky ⬆⬇ pro každou číslici zvlášť
- Kliknutí na šipku: +1 nebo -1 na dané pozici (jednotky/desítky)
- Přímé zadání z klávesnice
- Touch friendly na mobilech

#### Validace

```typescript
const validateTriangle = (a: number, b: number, c: number): boolean => {
  // Trojúhelníková nerovnost
  if (a + b <= c) return false;
  if (b + c <= a) return false;
  if (c + a <= b) return false;
  
  // Všechny strany musí být > 0
  if (a <= 0 || b <= 0 || c <= 0) return false;
  
  return true;
};

// Při neplatném trojúhelníku:
setInputError('Trojúhelník s těmito délkami nelze narýsovat! ' +
              'Zkontroluj, že součet každých dvou stran je větší než třetí strana.');
```

#### Chybové hlášky

- **"Trojúhelník nelze narýsovat"** - neplatí trojúhelníková nerovnost
- **"Všechny délky musí být větší než 0"** - záporná nebo nulová hodnota
- Červený rámeček kolem inputu s chybou
- Tlačítko "Začít konstrukci" je disabled

#### Průběh po zadání

1. Uživatel vyplní AB, AC, BC
2. Klikne "Začít konstrukci"
3. Validace projde → `setWaitingForInput(false)`
4. Overlay zmizí (fade out)
5. Spustí se stejná konstrukce jako TriangleConstruction s těmito délkami
6. Délky jsou předány jako `customSides` prop

---

### 4. Trojúhelník z úhlů (AngleTriangleConstruction)

#### Geometrický postup

**Zadání**: Narýsuj trojúhelník ABC, když jsou dány:
- Délka základny |AB| = c (například 6 cm)
- Úhel α při vrcholu A (například 60°)
- Úhel β při vrcholu B (například 50°)

**Podmínka existence**: α + β < 180° (třetí úhel γ = 180° - α - β musí být kladný)

**Postup**:
1. Narýsuj základnu AB délky c
2. V bodě A změř úhel α pomocí úhloměru od strany AB
3. Narýsuj polopřímku z A pod úhlem α (rameno trojúhelníku)
4. V bodě B změř úhel β pomocí úhloměru od strany BA (opačný směr!)
5. Narýsuj polopřímku z B pod úhlem β
6. Průsečík těchto dvou polopřímek je vrchol C
7. Zvýrazni trojúhelník ABC

**Matematika výpočtu bodu C**:
```
Základna AB: od A(x₁, y₁) do B(x₂, y₂)
Úhel základny vůči horizontále: θ = atan2(y₂ - y₁, x₂ - x₁)

Paprsek z bodu A:
  směr: θ + α (v radiánech)
  parametrická rovnice: P = A + t × (cos(θ+α), sin(θ+α))

Paprsek z bodu B:
  směr: θ + π - β (opačný směr základny, pak -β)
  parametrická rovnice: P = B + s × (cos(θ+π-β), sin(θ+π-β))

Řešení soustavy:
  A.x + t × cos(θ+α) = B.x + s × cos(θ+π-β)
  A.y + t × sin(θ+α) = B.y + s × sin(θ+π-β)

Výpočet průsečíku pomocí determinantu:
  dir_A = (cos(θ+α), sin(θ+α))
  dir_B = (cos(θ+π-β), sin(θ+π-β))
  
  determinant = dir_A.x × dir_B.y - dir_A.y × dir_B.x
  
  t = ((B.x - A.x) × dir_B.y - (B.y - A.y) × dir_B.x) / determinant
  
  C = A + t × dir_A
```

#### Kroky v aplikaci

**Krok 0: Narýsuj základnu AB**
- Úsečka AB výchozí délky (6 cm)
- Animace s pravítkem
- Body přesouvatelné

**Krok 1: Vyznač úhel α u bodu A**
- Zobrazí se úhloměr (půlkruhový SVG)
- Úhloměr umístěn v bodě A
- Střed úhloměru na bodě A, nula úhloměru směřuje podél AB
- Červená značka na úhloměru ukazuje úhel α
- Popisek: "Úhel α = 60°"

**Krok 2: Narýsuj rameno z A pod úhlem α**
- Polopřímka z bodu A pod úhlem α
- Zelená barva (konstrukce trojúhelníku)
- Animace s pravítkem
- Rameno prodlouženo dostatečně daleko (200px)

**Krok 3: Vyznač úhel β u bodu B**
- Úhloměr se přesune k bodu B
- **Důležité**: Úhloměr je otočený, protože měříme od BA (opačný směr)
- Červená značka ukazuje úhel β
- Popisek: "Úhel β = 50°"

**Krok 4: Narýsuj rameno z B pod úhlem β**
- Polopřímka z bodu B
- Zelená barva
- Křižuje se s ramenem z A

**Krok 5: Označ průsečík jako bod C**
- Průsečík obou ramen = vrchol C
- Červený bod s popiskem "C"
- Fade-in animace

**Krok 6: Zvýrazni trojúhelník ABC**
- Všechny tři strany trochu ztmavnou (nebo zesílí)
- Trojúhelník je kompletní
- Polopřímky za body zůstávají viditelné (konstrukce)

**Krok 7: Opsat trojúhelník**
- Popisky úhlů α, β, γ u jednotlivých vrcholů
- Postupné zobrazení (fade-in)
- γ = 180° - α - β je vypočítaný třetí úhel
- Finální stav s všemi popisky

#### SVG úhloměr

```typescript
const protractor = protractorImageRef.current;
const protractorRadius = 150;  // pevná velikost

// Umístění: střed na bodu, nula směřuje podél AB
ctx.translate(point.x, point.y);
ctx.rotate(baseAngle);  // rotace podle úhlu AB

// Vykreslení úhloměru
ctx.drawImage(protractor, 
  -protractorRadius,        // X: centrováno
  -protractorRadius,        // Y: centrováno
  protractorRadius * 2, 
  protractorRadius * 2
);

// Vykreslení červené značky pro úhel
ctx.rotate(angle);  // dodatečná rotace o měřený úhel
ctx.strokeStyle = 'red';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(protractorRadius * 0.8, 0);
ctx.stroke();
```

#### Přepočet při změně AB

```typescript
useEffect(() => {
  if (draggedPoint && initialSideAB && initialSegmentLength) {
    // Nová délka AB v cm
    const cmPerPixel = initialSideAB / initialSegmentLength;
    const newSideAB = segmentLengthAB * cmPerPixel;
    
    setSideAB(newSideAB);
    
    // Úhly zůstávají stejné!
    // Bod C se přepočítá podle nové délky AB a stejných úhlů
  }
}, [pointA, pointB, draggedPoint]);
```

---

### 5. Osově souměrný obraz (AxialSymmetryConstruction)

#### Geometrický postup

**Zadání**: 
- Trojúhelník ABC (libovolný)
- Osa souměrnosti o (svislá červená čára)

**Úkol**: Narýsuj obrazový trojúhelník A'B'C' v osové souměrnosti podle osy o.

**Vlastnosti osové souměrnosti**:
- Každý bod a jeho obraz leží na přímce kolmé k ose
- Bod a jeho obraz jsou ve stejné vzdálenosti od osy
- Osa je osou úsečky spojující bod a jeho obraz

**Postup pro jeden bod (např. A → A')**:
1. Z bodu A spusť kolmici na osu o
2. Označ průsečík kolmice s osou jako P_A
3. Změř vzdálenost |AP_A|
4. Na kolmici na druhé straně osy vyznač bod A' tak, že |A'P_A| = |AP_A|
5. Opakuj pro body B a C

**Matematika**:
```
Osa souměrnosti: svislá přímka x = axisX

Pro bod A(x_A, y_A):
  Kolmice na osu: horizontální přímka y = y_A
  Průsečík s osou: P_A(axisX, y_A)
  Vzdálenost: d = |x_A - axisX|
  Obraz: A'(axisX + d, y_A)   pokud x_A < axisX
         A'(axisX - d, y_A)   pokud x_A > axisX
  
  Jednodušeji: A'(2×axisX - x_A, y_A)
```

#### Prvky konstrukce

**Původní trojúhelník ABC**:
- Modrá barva
- Vrcholy A, B, C jsou přesouvatelné
- Strany AB, BC, CA

**Osa souměrnosti o**:
- Svislá červená čára
- Pevná poloha: x = 1400 (vpravo od trojúhelníku)
- Nekonečná (přes celou výšku canvasu)
- Tečkovaná nebo plná červená čára

**Obrazové body A', B', C'**:
- Červená barva (odlišení od originálu)
- Vypočítané podle vzorce zrcadlení
- Popisky s apostrofem (A', B', C')

**Obrazový trojúhelník A'B'C'**:
- Červená barva
- Stejný tvar jako ABC (souměrný)

**Kolmice a vzdálenosti** (zobrazeny během konstrukce):
- Kolmice z A na osu (tečkovaná)
- Značka pravého úhlu (čtverec □)
- Popisek vzdálenosti |AP_A|

#### Kroky v aplikaci

**Krok 0: Narýsuj trojúhelník ABC**
- Animované vykreslení stran AB, BC, CA
- Modrá barva
- Popisky A, B, C
- Body jsou přesouvatelné

**Krok 1: Narýsuj osu souměrnosti o**
- Svislá červená čára se animovaně vykresluje zdola nahoru
- Popisek "o" nahoře u osy
- Tučnější čára (5px) pro viditelnost

**Krok 2: Kolmice z bodu A na osu o**
- Horizontální tečkovaná čára z A na osu
- Animace s pravítkem
- Průsečík s osou označen jako P_A

**Krok 3: Změř vzdálenost A od osy**
- Úsečka AP_A se zvýrazní
- Popisek vzdálenosti (např. "3.2 cm")
- Značka pravého úhlu v bodě P_A:
  ```
  Český způsob: malý čtvereček □
  Velikost: 15×15px
  Barva: stejná jako kolmice
  ```

**Krok 4: Označ bod A' na druhé straně**
- Na prodloužení kolmice za osu se objeví bod A'
- Ve stejné vzdálenosti od osy: |A'P_A| = |AP_A|
- Červená barva
- Animace: fade-in + krátká čára ukazující vzdálenost
- Popisek "A'"

**Krok 5: Opakuj pro bod B**
- Kolmice z B
- Značka pravého úhlu
- Bod B' se objeví
- Stejná animace

**Krok 6: Opakuj pro bod C**
- Kolmice z C
- Značka pravého úhlu
- Bod C' se objeví

**Krok 7: Dorýsuj obrazový trojúhelník A'B'C'**
- Animované vykreslení stran A'B', B'C', C'A'
- Červená barva
- Trojúhelník A'B'C' je souměrný s ABC podle osy o

**Krok 8: Zvýrazni souměrnost**
- Přerušované čáry spojující A-A', B-B', C-C'
- Šedá barva
- Vizualizace, že každý bod a jeho obraz leží na kolmici k ose
- Finální stav: kompletní konstrukce s původním i obrazovým trojúhelníkem

#### České značení pravého úhlu

```typescript
const drawRightAngle = (
  ctx: CanvasRenderingContext2D,
  vertex: Point,      // vrchol pravého úhlu
  side1: Point,       // bod na prvním rameni
  side2: Point,       // bod na druhém rameni
  size: number = 15   // velikost značky
) => {
  // Směry ramen
  const dir1 = normalize(subtract(side1, vertex));
  const dir2 = normalize(subtract(side2, vertex));
  
  // Čtvereček
  const corner1 = add(vertex, scale(dir1, size));
  const corner2 = add(vertex, scale(dir2, size));
  const corner3 = add(add(vertex, scale(dir1, size)), scale(dir2, size));
  
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(corner1.x, corner1.y);
  ctx.lineTo(corner3.x, corner3.y);
  ctx.lineTo(corner2.x, corner2.y);
  ctx.stroke();
};
```

#### Přepočet při přesouvání bodů

```typescript
// Bod A se posunul → přepočítat A'
const mirrorPoint = (point: Point, axisX: number): Point => {
  return {
    x: 2 * axisX - point.x,  // zrcadlení podle svislé osy
    y: point.y                // y se nemění
  };
};

// V každém renderu:
const pointAPrime = mirrorPoint(pointA, axisX);
const pointBPrime = mirrorPoint(pointB, axisX);
const pointCPrime = mirrorPoint(pointC, axisX);
```

---

## Technická implementace

### Canvas rendering systém

#### Double buffering

**Proč?** Eliminace flickeringu při složitých animacích.

```typescript
// Inicializace
const bufferCanvasRef = useRef<HTMLCanvasElement | null>(null);

useEffect(() => {
  if (!bufferCanvasRef.current) {
    bufferCanvasRef.current = document.createElement('canvas');
  }
}, []);

// V render funkci
const renderToBuffer = () => {
  const bufferCanvas = bufferCanvasRef.current;
  const bufferCtx = bufferCanvas.getContext('2d');
  
  // Vyčistit buffer
  bufferCtx.clearRect(0, 0, width, height);
  
  // Nakreslit vše do bufferu
  drawGrid(bufferCtx);
  drawConstructionSteps(bufferCtx);
  drawPoints(bufferCtx);
  drawLabels(bufferCtx);
  
  return bufferCanvas;
};

// Kopírovat do hlavního canvasu
const canvas = canvasRef.current;
const ctx = canvas.getContext('2d');
const buffer = renderToBuffer();
ctx.clearRect(0, 0, width, height);
ctx.drawImage(buffer, 0, 0);
```

#### HiDPI / Retina support

```typescript
useEffect(() => {
  const canvas = canvasRef.current;
  const bufferCanvas = bufferCanvasRef.current;
  if (!canvas || !bufferCanvas) return;

  const dpr = window.devicePixelRatio || 1;
  
  // Fyzické rozlišení (skutečné pixely)
  canvas.width = canvasSize.width * dpr;
  canvas.height = canvasSize.height * dpr;
  bufferCanvas.width = canvasSize.width * dpr;
  bufferCanvas.height = canvasSize.height * dpr;
  
  // CSS rozlišení (logické pixely)
  canvas.style.width = `${canvasSize.width}px`;
  canvas.style.height = `${canvasSize.height}px`;
  
  // Scale context
  const ctx = canvas.getContext('2d');
  const bufferCtx = bufferCanvas.getContext('2d');
  ctx.scale(dpr, dpr);
  bufferCtx.scale(dpr, dpr);
}, [canvasSize]);
```

#### Souřadnicové systémy

**Tři souřadnicové systémy**:

1. **World coordinates** (geometrický prostor):
   - Bod A = (860, 840)
   - Nezávislé na velikosti obrazovky
   - Používá se pro geometrické výpočty

2. **Screen coordinates** (CSS pixely):
   - Pixel na obrazovce
   - Závisí na scroll position a zoom

3. **Physical pixels** (skutečné pixely):
   - Násobek screen coordinates × DPR
   - Pro HiDPI displaye

**Transformace World → Screen**:
```typescript
const worldToScreen = (worldPoint: Point): Point => {
  return {
    x: worldPoint.x * scale + offset.x,
    y: worldPoint.y * scale + offset.y
  };
};
```

**Transformace Screen → World**:
```typescript
const screenToWorld = (screenPoint: Point): Point => {
  return {
    x: (screenPoint.x - offset.x) / scale,
    y: (screenPoint.y - offset.y) / scale
  };
};
```

**Canvas transformace**:
```typescript
// Pro geometrii (úsečky, kružnice)
ctx.save();
ctx.translate(offset.x, offset.y);
ctx.scale(scale, scale);
// ... kreslit v world coordinates
ctx.restore();

// Pro text a UI (popisky)
ctx.save();
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);  // reset + DPR
// ... kreslit v screen coordinates
ctx.restore();
```

### Animační systém

#### Request Animation Frame loop

```typescript
useEffect(() => {
  if (isAnimating && animProgress < 1) {
    animationFrameRef.current = requestAnimationFrame(() => {
      let increment = 0.008;  // výchozí rychlost
      
      // Různé rychlosti podle typu kroku
      if (currentStep === 1 || currentStep === 3) {
        increment = 0.002;  // statické nástroje (4× pomalejší)
      } else if (currentStep === 2 || currentStep === 4) {
        increment = 0.005;  // rýsování kružnic
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

#### Timeline animace nástroje

**Fáze animace pravítka/kružítka**:
```
0.00 ──┬─── 0.15 ──┬─── 0.85 ──┬─── 1.00
       │           │           │
    Fade in    Rýsování    Fade out
   (opacity   (progress    (opacity
   0 → 1)     0 → 1)       1 → 0)
```

**Implementace**:
```typescript
const drawSegmentWithRuler = (
  ctx: CanvasRenderingContext2D,
  p1: Point,
  p2: Point,
  progress: number
) => {
  // Fade in pravítka (0.0 - 0.15)
  let rulerAlpha = 0;
  if (progress < 0.15) {
    rulerAlpha = progress / 0.15;
  } else if (progress >= 0.15 && progress <= 0.85) {
    rulerAlpha = 1;
  } else if (progress > 0.85 && progress < 1) {
    rulerAlpha = (1 - progress) / 0.15;
  }
  
  // Kreslení úsečky (0.15 - 0.85)
  let drawProgress = 0;
  if (progress <= 0.15) {
    drawProgress = 0;
  } else if (progress >= 0.85) {
    drawProgress = 1;
  } else {
    drawProgress = (progress - 0.15) / 0.7;
  }
  
  // Aktuální koncový bod
  const currentP2 = {
    x: p1.x + (p2.x - p1.x) * drawProgress,
    y: p1.y + (p2.y - p1.y) * drawProgress
  };
  
  // Vykreslit pravítko
  if (rulerAlpha > 0) {
    ctx.globalAlpha = rulerAlpha;
    drawRulerImage(ctx, p1, p2);
    ctx.globalAlpha = 1.0;
  }
  
  // Vykreslit úsečku s neonovým podsvícením
  const isDrawing = drawProgress < 1;
  if (isDrawing && drawProgress > 0) {
    // Neonové podsvícení
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.5)';
    ctx.lineWidth = 6 * 10;  // 10× tlustší
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(currentP2.x, currentP2.y);
    ctx.stroke();
  }
  
  // Hlavní čára
  if (drawProgress > 0) {
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = isDrawing ? 9 : 6;  // tlustší během kreslení
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(currentP2.x, currentP2.y);
    ctx.stroke();
  }
};
```

#### Neonové podsvícení

**Efekt**: Žlutá záře pod čárou, která se právě rýsuje.

```typescript
// Parametry
const GLOW_COLOR = 'rgba(251, 191, 36, 0.5)';  // žlutá, 50% průhlednost
const GLOW_WIDTH_MULTIPLIER = 10;              // 10× tlustší než hlavní čára

// Vykreslení
if (isDrawing && drawProgress > 0) {
  ctx.save();
  ctx.strokeStyle = GLOW_COLOR;
  ctx.lineWidth = mainLineWidth * GLOW_WIDTH_MULTIPLIER;
  ctx.lineCap = 'round';  // zaoblené konce pro hezčí záři
  ctx.lineJoin = 'round';
  
  // Nakreslit čáru
  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(currentPoint.x, currentPoint.y);
  ctx.stroke();
  
  ctx.restore();
}

// Pak hlavní čára (nakreslená NAD zářením)
ctx.strokeStyle = mainColor;
ctx.lineWidth = mainLineWidth;
// ... kreslit hlavní čáru
```

### Interaktivní ovládání

#### Event handling structure

```typescript
// Stav pro tracking interakcí
const [isDragging, setIsDragging] = useState(false);
const [dragStart, setDragStart] = useState<Point>({ x: 0, y: 0 });
const [draggedPoint, setDraggedPoint] = useState<'A' | 'B' | null>(null);
const [hoveredPoint, setHoveredPoint] = useState<'A' | 'B' | null>(null);

// Myš down
const handleMouseDown = (e: React.MouseEvent) => {
  const rect = canvasRef.current.getBoundingClientRect();
  const screenX = e.clientX - rect.left;
  const screenY = e.clientY - rect.top;
  const worldPos = screenToWorld(screenX, screenY);
  
  // Zjistit, zda je myš nad nějakým bodem
  if (isPointHovered(pointA, worldPos, 15)) {
    setDraggedPoint('A');
    setIsDragging(true);
  } else if (isPointHovered(pointB, worldPos, 15)) {
    setDraggedPoint('B');
    setIsDragging(true);
  } else {
    // Dragování celého plátna
    setIsDragging(true);
    setDragStart({ x: screenX, y: screenY });
  }
};

// Myš move
const handleMouseMove = (e: React.MouseEvent) => {
  const rect = canvasRef.current.getBoundingClientRect();
  const screenX = e.clientX - rect.left;
  const screenY = e.clientY - rect.top;
  const worldPos = screenToWorld(screenX, screenY);
  
  if (isDragging) {
    if (draggedPoint === 'A') {
      setPointA(worldPos);
    } else if (draggedPoint === 'B') {
      setPointB(worldPos);
    } else {
      // Posun plátna
      const dx = screenX - dragStart.x;
      const dy = screenY - dragStart.y;
      setOffset(prev => ({
        x: prev.x + dx,
        y: prev.y + dy
      }));
      setDragStart({ x: screenX, y: screenY });
    }
  } else {
    // Aktualizovat hover stav
    if (isPointHovered(pointA, worldPos, 15)) {
      setHoveredPoint('A');
    } else if (isPointHovered(pointB, worldPos, 15)) {
      setHoveredPoint('B');
    } else {
      setHoveredPoint(null);
    }
  }
};

// Myš up
const handleMouseUp = () => {
  setIsDragging(false);
  setDraggedPoint(null);
};
```

#### Touch handling (pinch-to-zoom)

```typescript
const [isPinching, setIsPinching] = useState(false);
const [initialPinchDistance, setInitialPinchDistance] = useState(0);
const [initialPinchScale, setInitialPinchScale] = useState(1);
const [pinchCenter, setPinchCenter] = useState<Point>({ x: 0, y: 0 });

const getTouchDistance = (touch1: Touch, touch2: Touch): number => {
  const dx = touch2.clientX - touch1.clientX;
  const dy = touch2.clientY - touch1.clientY;
  return Math.sqrt(dx * dx + dy * dy);
};

const getTouchCenter = (touch1: Touch, touch2: Touch): Point => {
  return {
    x: (touch1.clientX + touch2.clientX) / 2,
    y: (touch1.clientY + touch2.clientY) / 2
  };
};

const handleTouchStart = (e: React.TouchEvent) => {
  if (e.touches.length === 2) {
    // Začátek pinch
    setIsPinching(true);
    setInitialPinchDistance(getTouchDistance(e.touches[0], e.touches[1]));
    setInitialPinchScale(scale);
    
    const rect = canvasRef.current.getBoundingClientRect();
    const center = getTouchCenter(e.touches[0], e.touches[1]);
    setPinchCenter({
      x: center.x - rect.left,
      y: center.y - rect.top
    });
  }
};

const handleTouchMove = (e: React.TouchEvent) => {
  if (isPinching && e.touches.length === 2) {
    e.preventDefault();
    
    const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
    const distanceRatio = currentDistance / initialPinchDistance;
    
    // Nový scale
    let newScale = initialPinchScale * distanceRatio;
    newScale = Math.max(0.15, Math.min(2.25, newScale));  // omezení
    
    // Zoom do středu pinch gestu
    const worldCenter = screenToWorld(pinchCenter.x, pinchCenter.y);
    
    // Přepočítat offset tak, aby worldCenter zůstal na stejném místě
    setOffset(prev => ({
      x: pinchCenter.x - worldCenter.x * newScale,
      y: pinchCenter.y - worldCenter.y * newScale
    }));
    
    setScale(newScale);
  }
};

const handleTouchEnd = (e: React.TouchEvent) => {
  if (e.touches.length < 2) {
    setIsPinching(false);
  }
};
```

#### Wheel zoom (desktop)

```typescript
const handleWheel = (e: React.WheelEvent) => {
  e.preventDefault();
  
  const rect = canvasRef.current.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  
  // World souřadnice bodu pod myší (před zoomem)
  const worldPos = screenToWorld(mouseX, mouseY);
  
  // Změna scale
  const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
  let newScale = scale * zoomFactor;
  newScale = Math.max(0.15, Math.min(2.25, newScale));
  
  // Přepočítat offset tak, aby worldPos zůstal pod myší
  setOffset({
    x: mouseX - worldPos.x * newScale,
    y: mouseY - worldPos.y * newScale
  });
  
  setScale(newScale);
};
```

#### Kurzory

```typescript
// V CSS (nebo jako inline style)
const getCursor = (): string => {
  if (hoveredPoint) {
    return 'move';  // nad bodem
  } else if (isDragging) {
    return draggedPoint ? 'grabbing' : 'grabbing';  // během draggingu
  } else {
    return 'grab';  // výchozí nad plátnem
  }
};

// V JSX
<canvas
  ref={canvasRef}
  style={{ cursor: getCursor() }}
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}
  onWheel={handleWheel}
  // ...
/>
```

### Z-order (pořadí vykreslování)

**Důležité**: Body musí být vykresleny NAD všemi čarami, aby byly vždy viditelné a klikatelné.

```typescript
const renderToBuffer = () => {
  const ctx = bufferCtx;
  
  // 1. Pozadí
  ctx.fillStyle = darkMode ? '#111827' : '#ffffff';
  ctx.fillRect(0, 0, width, height);
  
  // 2. Mřížka
  drawGrid(ctx);
  
  // 3. Geometrické konstrukce (čáry, kružnice)
  ctx.save();
  ctx.translate(offset.x, offset.y);
  ctx.scale(scale, scale);
  
  // Animované vykreslení podle aktuálního kroku
  steps[currentStep].draw(ctx, scale, offset, pointA, pointB, ...);
  
  ctx.restore();
  
  // 4. Pravítko/kružítko (pokud showCaptions)
  if (showCaptions) {
    drawToolImages(ctx);
  }
  
  // 5. Body (VŽDY NAKONEC!)
  ctx.save();
  ctx.translate(offset.x, offset.y);
  ctx.scale(scale, scale);
  
  drawPoint(ctx, pointA, 'A', colorA);
  drawPoint(ctx, pointB, 'B', colorB);
  if (pointC) {
    drawPoint(ctx, pointC, 'C', colorC);
  }
  
  ctx.restore();
  
  // 6. Popisky (v screen space, nad vším)
  drawLabels(ctx);
  
  // 7. Nadpis a popisek kroku
  drawStepTitle(ctx);
};
```

---

## Externí assety a závislosti

### ⚠️ KRITICKÉ: Externí soubory

Aplikace **vyžaduje** následující externí soubory pro plnou funkčnost:

#### 1. Pravítko (`pravitko4.svg`)

**Aktuální URL**:
```
https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/pravitko4.svg
```

**Použití**:
- Vizualizace při rýsování úseček a přímek
- Komponenty: BisectorConstruction, TriangleConstruction, InteractiveTriangleConstruction, AxialSymmetryConstruction

**Načítání**:
```typescript
useEffect(() => {
  const img = new Image();
  img.crossOrigin = 'anonymous';  // pro CORS
  img.onload = () => {
    rulerImageRef.current = img;
    setRulerLoaded(true);
  };
  img.onerror = () => {
    console.error('Failed to load ruler image');
  };
  img.src = 'https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/pravitko4.svg';
}, []);
```

**Technické požadavky**:
- Formát: SVG
- Rozměry: 800×400px (nebo poměr 2:1)
- Orientace: Horizontální, měřítko podél delší strany
- Umístění: Dolní hrana pravítka leží na rýsované čáře

#### 2. Kružítko (`kruzitko.svg`)

**Aktuální URL**:
```
https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/kruzitko.svg
```

**Použití**:
- Vizualizace při rýsování kružnic
- Komponenty: BisectorConstruction, TriangleConstruction, InteractiveTriangleConstruction, AxialSymmetryConstruction

**Načítání**: Stejný pattern jako pravítko

**Technické požadavky**:
- Formát: SVG
- Rozměry: Čtvercový (např. 500×500px)
- **Klíčové**: Hrot kružítka musí být v **levém dolním rohu** SVG
- Orientace: Kružítko otevřené doprava
- Velikost při zobrazení: = poloměr kružnice (dynamicky škálováno)

**Rotace**: Kružítko se otáčí podle aktuální fáze rýsování kružnice

#### 3. Úhloměr (`uhlo.svg`)

**Aktuální URL**:
```
https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/uhlo.svg
```

**Použití**:
- Vizualizace při měření úhlů
- Komponenta: AngleTriangleConstruction

**Technické požadavky**:
- Formát: SVG
- Tvar: Půlkruh (180° úhloměr)
- Střed: V levém středu SVG
- Stupnice: 0°-180° po obvodu
- Velikost: Fixní (např. 300px průměr)

#### 4. Font Fenomen Sans Book

**Aktuální URL**:
```
https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/Fenomen%20Sans%20Book.otf
```

**Použití**:
- Veškerý text v aplikaci
- Načítán přes @font-face v `styles/globals.css`

**Deklarace**:
```css
@font-face {
  font-family: 'Fenomen Sans';
  src: url('https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/Fenomen%20Sans%20Book.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

:root {
  --font-family: 'Fenomen Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

**Fallback**: Pokud font neselhá načtení, použije se systémový font (Arial/Helvetica)

### Řešení pro vlastní projekt

#### Možnost A: Použít existující URL ✅ Nejjednodušší

**Výhody**:
- Žádné změny v kódu
- Okamžitě funkční
- Automatické updaty (pokud se soubory na serveru změní)

**Nevýhody**:
- Závislost na externím serveru (Supabase)
- Možné CORS problémy
- Latence při načítání
- Pokud server vypadne → assety nedostupné

**Kdy použít**: Pro rychlý prototyp nebo testování

#### Možnost B: Stáhnout a hostovat lokálně ⭐ Doporučeno

**Postup**:

1. **Stáhnout soubory** z URL do lokálního projektu:
   ```
   mkdir -p public/assets
   cd public/assets
   
   curl -O "https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/pravitko4.svg"
   curl -O "https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/kruzitko.svg"
   curl -O "https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/uhlo.svg"
   curl -O "https://jjpiguuubvmiobmixwgh.supabase.co/storage/v1/object/public/Admin%20math/Fenomen%20Sans%20Book.otf"
   ```

2. **Upravit URL v kódu**:

   **V každé konstrukci (`*Construction.tsx`)**:
   ```typescript
   // components/BisectorConstruction.tsx (řádky ~116)
   // ZMĚNA:
   // img.src = 'https://jjpiguuubvmiobmixwgh.supabase.co/.../pravitko4.svg';
   img.src = '/assets/pravitko4.svg';
   
   // components/BisectorConstruction.tsx (řádky ~130)
   // ZMĚNA:
   // img.src = 'https://jjpiguuubvmiobmixwgh.supabase.co/.../kruzitko.svg';
   img.src = '/assets/kruzitko.svg';
   ```

   **Soubory k úpravě** (hledej řetězec `jjpiguuubvmiobmixwgh.supabase.co`):
   - `components/BisectorConstruction.tsx`
   - `components/TriangleConstruction.tsx`
   - `components/InteractiveTriangleConstruction.tsx`
   - `components/AngleTriangleConstruction.tsx` (včetně úhloměru)
   - `components/AxialSymmetryConstruction.tsx`

   **V CSS (`styles/globals.css`)**:
   ```css
   @font-face {
     font-family: 'Fenomen Sans';
     /* ZMĚNA: */
     /* src: url('https://jjpiguuubvmiobmixwgh.supabase.co/.../Fenomen%20Sans%20Book.otf'); */
     src: url('/assets/Fenomen-Sans-Book.otf') format('opentype');
     font-weight: 400;
     font-style: normal;
     font-display: swap;
   }
   ```

3. **Vyzkoušet**:
   - Zkontrolovat Developer Console pro chyby 404
   - Ověřit, že se pravítko/kružítko zobrazuje
   - Ověřit, že font je načtený (inspektovat v DevTools → Fonts)

**Výhody**:
- ✅ Nezávislost na externím serveru
- ✅ Rychlejší načítání (lokální soubory)
- ✅ Žádné CORS problémy
- ✅ Kontrola nad assety

**Nevýhody**:
- Mírně složitější setup
- Nutnost manually updatovat soubory

#### Možnost C: Vlastní SVG ilustrace

Pokud chcete vytvořit vlastní grafiku (např. pro jiný vizuální styl):

**Pravítko**:
```svg
<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
  <!-- Tělo pravítka -->
  <rect x="0" y="300" width="800" height="100" fill="#f0f0f0" stroke="#333" stroke-width="2"/>
  
  <!-- Rysky na měřítku -->
  <g stroke="#333" stroke-width="1">
    <line x1="0" y1="300" x2="0" y2="320" />
    <line x1="100" y1="300" x2="100" y2="320" />
    <line x1="200" y1="300" x2="200" y2="320" />
    <!-- atd. každých 100px (= 1cm) -->
  </g>
  
  <!-- Čísla -->
  <text x="0" y="340" font-size="16" text-anchor="middle">0</text>
  <text x="100" y="340" font-size="16" text-anchor="middle">1</text>
  <!-- atd. -->
</svg>
```

**Kružítko**:
```svg
<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
  <!-- Ramena kružítka -->
  <line x1="0" y1="500" x2="250" y2="0" stroke="#333" stroke-width="8" />
  <line x1="0" y1="500" x2="500" y2="500" stroke="#333" stroke-width="8" />
  
  <!-- Kloub -->
  <circle cx="0" cy="500" r="20" fill="#666" />
  
  <!-- Hrot (v levém dolním rohu = 0,500) -->
  <circle cx="0" cy="500" r="5" fill="red" />
  
  <!-- Tužka (na konci pravého ramena) -->
  <circle cx="500" cy="500" r="10" fill="#333" />
</svg>
```

**Důležité**: Zachovat proporce a umístění klíčových bodů (hrot kružítka, dolní hrana pravítka).

---

## Integrace do jiné aplikace

### Standalone aplikace (fullscreen)

```tsx
// index.tsx nebo main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Geometrické konstrukce</title>
</head>
<body>
  <div id="root" class="w-full h-screen overflow-hidden"></div>
</body>
</html>
```

### Vložená komponenta (v existující aplikaci)

#### Jako samostatná stránka (React Router)

```tsx
// App.tsx (vaše hlavní aplikace)
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GeometryApp from './geometry/App';  // importovaná aplikace
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/geometry/*" element={<GeometryApp />} />
      </Routes>
    </BrowserRouter>
  );
}
```

#### Jako embed komponenta (fixní výška)

```tsx
// MyPage.tsx
import { BisectorConstruction } from './geometry/components/BisectorConstruction';
import { useState } from 'react';

function MyPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [showGeometry, setShowGeometry] = useState(false);
  
  return (
    <div className="container mx-auto p-4">
      <h1>Moje vzdělávací platforma</h1>
      <p>Text, obsah...</p>
      
      <button onClick={() => setShowGeometry(!showGeometry)}>
        {showGeometry ? 'Skrýt' : 'Zobrazit'} konstrukci
      </button>
      
      {showGeometry && (
        <div className="w-full h-[600px] border-2 border-gray-300 rounded-lg overflow-hidden">
          <BisectorConstruction
            onBack={() => setShowGeometry(false)}
            darkMode={darkMode}
            onDarkModeChange={setDarkMode}
          />
        </div>
      )}
      
      <p>Další obsah...</p>
    </div>
  );
}
```

#### Jako modal/overlay

```tsx
// GeometryModal.tsx
import { useState } from 'react';
import { BisectorConstruction } from './geometry/components/BisectorConstruction';

interface GeometryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function GeometryModal({ isOpen, onClose }: GeometryModalProps) {
  const [darkMode, setDarkMode] = useState(false);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-[95vw] h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden">
        <BisectorConstruction
          onBack={onClose}
          darkMode={darkMode}
          onDarkModeChange={setDarkMode}
        />
      </div>
    </div>
  );
}

// Použití
function MyApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Otevřít geometrii
      </button>
      
      <GeometryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
```

### Předávání parametrů

```tsx
// Vlastní trojúhelník s předanými délkami
<InteractiveTriangleConstruction
  onBack={() => navigate('/menu')}
  darkMode={darkMode}
  onDarkModeChange={setDarkMode}
  // Parametry se zadají přímo v kódu
/>

// Nebo použít TriangleConstruction s customSides
<TriangleConstruction
  onBack={() => navigate('/menu')}
  darkMode={darkMode}
  onDarkModeChange={setDarkMode}
  customSides={{
    ab: 7,
    ac: 5,
    bc: 4
  }}
/>
```

### Stylování

**Důležité**: Aplikace používá Tailwind CSS v4.0 a vyžaduje:

1. **Tailwind config** není potřeba (v4.0 používá `@theme` v CSS)
2. **globals.css** MUSÍ být importován (obsahuje CSS proměnné)
3. **Fullscreen wrapper**:
   ```tsx
   <div className="w-full h-screen">
     <App />
   </div>
   ```

4. **Pokud integrujete do existující aplikace s Tailwind**:
   - Možná kolize CSS proměnných (--color-*, --radius)
   - Řešení: Obalit do samostatného kontextu nebo přejmenovat proměnné

---

## Příklady kódu

### Výpočet průsečíků dvou kružnic

```typescript
/**
 * Vypočítá průsečíky dvou kružnic.
 * @param center1 Střed první kružnice
 * @param radius1 Poloměr první kružnice
 * @param center2 Střed druhé kružnice
 * @param radius2 Poloměr druhé kružnice
 * @returns Dva průsečíky nebo null pokud se neprotínají
 */
function calculateCircleIntersections(
  center1: Point,
  radius1: number,
  center2: Point,
  radius2: number
): { top: Point; bottom: Point } | null {
  // Vzdálenost středů
  const dx = center2.x - center1.x;
  const dy = center2.y - center1.y;
  const d = Math.sqrt(dx * dx + dy * dy);
  
  // Kontrola existence průsečíků
  if (d > radius1 + radius2) {
    // Kružnice se nedotýkají (příliš daleko)
    return null;
  }
  if (d < Math.abs(radius1 - radius2)) {
    // Jedna kružnice uvnitř druhé
    return null;
  }
  if (d === 0 && radius1 === radius2) {
    // Stejné kružnice
    return null;
  }
  
  // Bod na spojnici center1-center2 ve vzdálenosti a od center1
  const a = (d * d + radius1 * radius1 - radius2 * radius2) / (2 * d);
  
  // Výška kolmice z tohoto bodu na průsečíky
  const h = Math.sqrt(radius1 * radius1 - a * a);
  
  // Bod na spojnici
  const midX = center1.x + (a / d) * dx;
  const midY = center1.y + (a / d) * dy;
  
  // Jednotkový vektor kolmý na spojnici
  const perpX = -dy / d;
  const perpY = dx / d;
  
  // Průsečíky
  return {
    top: {
      x: midX + h * perpX,
      y: midY + h * perpY
    },
    bottom: {
      x: midX - h * perpX,
      y: midY - h * perpY
    }
  };
}
```

### Výpočet průsečíku dvou polopřímek (pro trojúhelník z úhlů)

```typescript
/**
 * Vypočítá průsečík dvou polopřímek.
 * @param origin1 Počátek první polopřímky
 * @param direction1 Směr první polopřímky (nemusí být jednotkový)
 * @param origin2 Počátek druhé polopřímky
 * @param direction2 Směr druhé polopřímky
 * @returns Průsečík nebo null pokud jsou rovnoběžné
 */
function calculateRayIntersection(
  origin1: Point,
  direction1: Point,
  origin2: Point,
  direction2: Point
): Point | null {
  // Determinant (cross product 2D)
  const det = direction1.x * direction2.y - direction1.y * direction2.x;
  
  if (Math.abs(det) < 1e-10) {
    // Rovnoběžné nebo totožné
    return null;
  }
  
  // Parametr t pro první polopřímku
  const dx = origin2.x - origin1.x;
  const dy = origin2.y - origin1.y;
  const t = (dx * direction2.y - dy * direction2.x) / det;
  
  // Parametr s pro druhou polopřímku
  const s = (dx * direction1.y - dy * direction1.x) / det;
  
  // Kontrola, že průsečík leží na obou polopřímkách (t >= 0, s >= 0)
  if (t < 0 || s < 0) {
    return null;
  }
  
  // Průsečík
  return {
    x: origin1.x + t * direction1.x,
    y: origin1.y + t * direction1.y
  };
}
```

### Plynulé vycentrování konstrukce

```typescript
/**
 * Vycentruje konstrukci do středu canvasu.
 */
const centerView = () => {
  if (!canvasSize.width || !canvasSize.height) return;
  
  // Geometrický střed konstrukce (např. střed úsečky AB)
  const centerX = (pointA.x + pointB.x) / 2;
  const centerY = (pointA.y + pointB.y) / 2;
  
  // Střed canvasu
  const canvasCenterX = canvasSize.width / 2;
  const canvasCenterY = canvasSize.height / 2;
  
  // Vypočítat offset tak, aby geometrický střed byl ve středu canvasu
  setOffset({
    x: canvasCenterX - centerX * scale,
    y: canvasCenterY - centerY * scale
  });
};

// Volat při inicializaci a při změně velikosti okna
useEffect(() => {
  if (canvasSize.width > 0 && canvasSize.height > 0 && !isInitialized) {
    centerView();
    setIsInitialized(true);
  }
}, [canvasSize.width, canvasSize.height, isInitialized]);
```

### Vykreslení bodu s halo efektem

```typescript
/**
 * Vykreslí bod s halo efektem a popiskem.
 * @param ctx Canvas context (ve world coordinates)
 * @param p Pozice bodu (world coordinates)
 * @param label Text popisku (např. "A")
 * @param color Barva bodu
 * @param isHovered Je myš nad bodem?
 */
const drawPoint = (
  ctx: CanvasRenderingContext2D,
  p: Point,
  label: string,
  color: string,
  isHovered: boolean = false
) => {
  // Halo efekt (světlé pozadí)
  ctx.fillStyle = darkMode ? 'rgba(75, 85, 99, 0.4)' : 'rgba(200, 200, 200, 0.3)';
  ctx.beginPath();
  ctx.arc(p.x, p.y, isHovered ? 12 : 10, 0, Math.PI * 2);
  ctx.fill();
  
  // Hlavní bod
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
  ctx.fill();
  
  // Bílý okraj pro kontrast
  ctx.strokeStyle = darkMode ? '#111827' : '#ffffff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
  ctx.stroke();
  
  // Hover efekt (extra kruh)
  if (isHovered) {
    ctx.strokeStyle = darkMode ? 'rgba(96, 165, 250, 0.5)' : 'rgba(59, 130, 246, 0.3)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 15, 0, Math.PI * 2);
    ctx.stroke();
  }
};
```

### Vykreslení popisku (vždy stejná velikost)

```typescript
/**
 * Vykreslí popisek, který má vždy stejnou velikost bez ohledu na zoom.
 * @param ctx Canvas context
 * @param p Pozice v world coordinates
 * @param label Text
 * @param color Barva textu
 * @param offsetX Offset v screen space
 * @param offsetY Offset v screen space
 * @param dpr Device pixel ratio
 */
const drawLabel = (
  ctx: CanvasRenderingContext2D,
  p: Point,
  label: string,
  color: string = '#000',
  offsetX: number = 12,
  offsetY: number = -12,
  dpr: number = 1
) => {
  // Uložit aktuální transformaci
  ctx.save();
  
  // Resetovat transformaci, ponechat jen DPR scaling
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  
  // Převést world → screen coordinates
  const screenX = p.x * scale + offset.x;
  const screenY = p.y * scale + offset.y;
  
  // Nastavit font (vždy 22px bez ohledu na zoom)
  ctx.font = '600 22px Arial, sans-serif';
  ctx.fillStyle = color;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  
  // Změřit text pro pozadí
  const metrics = ctx.measureText(label);
  const textWidth = metrics.width;
  
  // Šedé kruhové pozadí
  const bgX = screenX + offsetX + textWidth / 2;
  const bgY = screenY + offsetY - 8;
  const bgRadius = Math.max(textWidth, 16) / 2 + 6;
  
  ctx.fillStyle = darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(200, 200, 200, 0.35)';
  ctx.beginPath();
  ctx.arc(bgX, bgY, bgRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Text
  ctx.fillStyle = color;
  ctx.fillText(label, screenX + offsetX, screenY + offsetY);
  
  // Obnovit transformaci
  ctx.restore();
};
```

---

## Závěr

Tato dokumentace poskytuje kompletní technický přehled aplikace Geometrické konstrukce. Aplikace je navržena jako modulární, rozšiřitelný systém s jednotným UX napříč všemi konstrukcemi.

### Klíčové principy:

1. **Jednotný design pattern** - všechny konstrukce sdílejí stejný layout, ovládání a vizuální styl
2. **Interaktivita** - studenti mohou experimentovat přesouváním bodů
3. **Vizuální feedback** - animace, neonové podsvícení, profesionální nástroje
4. **Responsivní** - funguje na všech zařízeních
5. **Modulární** - snadné přidání nových konstrukcí

### Pro přidání nové konstrukce:

1. Vytvořte nový soubor `components/NovaKonstrukce.tsx`
2. Zkopírujte strukturu z `BisectorConstruction.tsx`
3. Implementujte kroky konstrukce v `steps` array
4. Přidejte do menu v `GeometryMenu.tsx`
5. Přidejte route v `App.tsx`
6. **Použijte sdílený** `ConstructionControlPanel` místo vlastního

Aplikace je připravena k integraci do jiných projektů a k rozšíření o další geometrické konstrukce!
