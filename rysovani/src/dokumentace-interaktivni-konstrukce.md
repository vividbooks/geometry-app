# Interaktivní konstrukce - Detailní dokumentace

## Obsah
1. [Přehled interaktivních konstrukcí](#přehled-interaktivních-konstrukcí)
2. [Vlastní trojúhelník (InteractiveTriangleConstruction)](#vlastní-trojúhelník)
3. [Trojúhelník z úhlů (AngleTriangleConstruction)](#trojúhelník-z-úhlů)
4. [BigNumberInput komponenta](#bignumberinput-komponenta)
5. [Validace a error handling](#validace-a-error-handling)
6. [Geometrické výpočty](#geometrické-výpočty)

---

## Přehled interaktivních konstrukcí

Interaktivní konstrukce se liší od běžných konstrukcí tím, že **uživatel nejdřív zadává parametry** před spuštěním animace.

### Porovnání typů konstrukcí

| Typ | Parametry | Zadávání | Příklad |
|-----|-----------|----------|---------|
| **Běžná konstrukce** | Pevné | Žádné | TriangleConstruction (5, 4, 3 cm) |
| **Interaktivní konstrukce** | Uživatelské | Před animací | InteractiveTriangleConstruction |
| **Parametrizovaná konstrukce** | Props | Z rodičovské komponenty | TriangleConstruction s customSides |

### Workflow interaktivní konstrukce

```
1. Uživatel vidí INPUT OVERLAY
   ├─ Velké číselné inputy (BigNumberInput)
   ├─ Validace v reálném čase
   └─ Tlačítko "Začít konstrukci"
   
2. Po vyplnění a validaci
   ├─ Overlay se SCHOVÀ (fade out)
   ├─ Parametry se předají konstrukci
   └─ Spustí se animace (stejně jako běžná konstrukce)
   
3. Během animace
   └─ Konstrukce běží s uživatelskými parametry
```

---

## Vlastní trojúhelník

### Koncept

**InteractiveTriangleConstruction** = Uživatel zadává délky všech tří stran trojúhelníku.

**Pedagogický účel**:
- Student si může vyzkoušet **jakékoliv** rozměry trojúhelníku
- Okamžitá **validace** - student vidí, proč některé kombinace nefungují
- Experimentování s **trojúhelníkovou nerovností**

### Struktura komponenty

```typescript
export function InteractiveTriangleConstruction({
  onBack,
  darkMode,
  onDarkModeChange
}: InteractiveTriangleConstructionProps) {
  // === STATE PRO VSTUPY ===
  const [sideAB, setSideAB] = useState<number | null>(null);
  const [sideAC, setSideAC] = useState<number | null>(null);
  const [sideBC, setSideBC] = useState<number | null>(null);
  const [inputError, setInputError] = useState('');
  const [waitingForInput, setWaitingForInput] = useState(true);
  
  // === STATE PRO KONSTRUKCI ===
  const [currentStep, setCurrentStep] = useState(0);
  const [animProgress, setAnimProgress] = useState(0);
  const [pointA, setPointA] = useState<Point>({ x: 860, y: 900 });
  const [pointB, setPointB] = useState<Point>({ x: 1460, y: 900 });
  
  // ... canvas state, refs, atd.
}
```

### UI - Input Overlay

#### Layout

```
┌───────────────────────────────────────────────┐
│                                               │
│         Zadej délky stran trojúhelníku        │
│                                               │
│   ┌─────────────────────────────────────┐   │
│   │        cm                            │   │
│   │        ⬆                             │   │
│   │       ╔═╗  ╔═╗                       │   │ ← Délka AB
│   │       ║0║  ║5║                       │   │
│   │       ╚═╝  ╚═╝                       │   │
│   │        ⬇                             │   │
│   │                          Délka AB    │   │
│   └─────────────────────────────────────┘   │
│                                               │
│   ┌─────────────────────────────────────┐   │
│   │        cm                            │   │
│   │        ⬆                             │   │
│   │       ╔═╗  ╔═╗                       │   │ ← Délka AC
│   │       ║0║  ║4║                       │   │
│   │       ╚═╝  ╚═╝                       │   │
│   │        ⬇                             │   │
│   │                          Délka AC    │   │
│   └─────────────────────────────────────┘   │
│                                               │
│   ┌─────────────────────────────────────┐   │
│   │        cm                            │   │
│   │        ⬆                             │   │
│   │       ╔═╗  ╔═╗                       │   │ ← Délka BC
│   │       ║0║  ║3║                       │   │
│   │       ╚═╝  ╚═╝                       │   │
│   │        ⬇                             │   │
│   │                          Délka BC    │   │
│   └─────────────────────────────────────┘   │
│                                               │
│   ┌─────────────────────────────────────┐   │
│   │      Začít konstrukci               │   │ ← Tlačítko
│   └─────────────────────────────────────┘   │
│                                               │
│   ⚠️ Trojúhelník nelze narýsovat!            │ ← Error (pokud)
│   Součet dvou stran musí být větší než       │
│   třetí strana.                               │
│                                               │
└───────────────────────────────────────────────┘
```

#### Implementace JSX

```tsx
// Overlay je absolutně pozicionovaný přes canvas
{waitingForInput && (
  <div className={`absolute inset-0 z-20 flex items-center justify-center ${ 
    darkMode ? 'bg-[#111827]' : 'bg-[#f9fafb]'
  }`}>
    <div className="w-full max-w-2xl p-8 space-y-8">
      {/* Nadpis */}
      <div className="text-center">
        <h2 className={`mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Zadej délky stran trojúhelníku
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Zkus různé kombinace a uč se, kdy trojúhelník existuje!
        </p>
      </div>
      
      {/* Input AB */}
      <BigNumberInput
        value={sideAB}
        onChange={setSideAB}
        min={1}
        max={99}
        unit="cm"
        darkMode={darkMode}
        label="Délka strany AB"
      />
      
      {/* Input AC */}
      <BigNumberInput
        value={sideAC}
        onChange={setSideAC}
        min={1}
        max={99}
        unit="cm"
        darkMode={darkMode}
        label="Délka strany AC"
      />
      
      {/* Input BC */}
      <BigNumberInput
        value={sideBC}
        onChange={setSideBC}
        min={1}
        max={99}
        unit="cm"
        darkMode={darkMode}
        label="Délka strany BC"
      />
      
      {/* Error message */}
      {inputError && (
        <div className={`p-4 rounded-lg ${
          darkMode 
            ? 'bg-red-900/20 border border-red-800 text-red-300' 
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Trojúhelník nelze narýsovat!</p>
              <p className="text-sm mt-1">{inputError}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Tlačítko start */}
      <button
        onClick={handleStartConstruction}
        disabled={!canStartConstruction()}
        className={`w-full py-4 rounded-xl font-medium text-lg transition-all ${
          canStartConstruction()
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {canStartConstruction() ? 'Začít konstrukci' : 'Vyplň všechny délky'}
      </button>
      
      {/* Tlačítko zpět */}
      <button
        onClick={onBack}
        className={`w-full py-3 rounded-xl transition-colors ${
          darkMode
            ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        Zpět do menu
      </button>
    </div>
  </div>
)}
```

### Validace vstupu

#### Trojúhelníková nerovnost

**Matematická podmínka**:
```
Pro existenci trojúhelníku se stranami a, b, c musí platit:
  a + b > c
  b + c > a
  c + a > b
  
A zároveň:
  a > 0
  b > 0
  c > 0
```

**Implementace**:
```typescript
const validateTriangle = (
  ab: number | null,
  ac: number | null,
  bc: number | null
): { valid: boolean; error: string } => {
  // 1. Kontrola, že jsou všechny hodnoty vyplněné
  if (ab === null || ac === null || bc === null) {
    return {
      valid: false,
      error: 'Vyplň všechny tři délky stran.'
    };
  }
  
  // 2. Kontrola, že jsou všechny hodnoty kladné
  if (ab <= 0 || ac <= 0 || bc <= 0) {
    return {
      valid: false,
      error: 'Všechny délky musí být větší než 0 cm.'
    };
  }
  
  // 3. Trojúhelníková nerovnost
  if (ab + ac <= bc) {
    return {
      valid: false,
      error: `Strana AB (${ab} cm) + strana AC (${ac} cm) = ${ab + ac} cm ` +
             `není větší než strana BC (${bc} cm). ` +
             `Součet dvou stran musí být vždy větší než třetí strana.`
    };
  }
  
  if (ab + bc <= ac) {
    return {
      valid: false,
      error: `Strana AB (${ab} cm) + strana BC (${bc} cm) = ${ab + bc} cm ` +
             `není větší než strana AC (${ac} cm).`
    };
  }
  
  if (ac + bc <= ab) {
    return {
      valid: false,
      error: `Strana AC (${ac} cm) + strana BC (${bc} cm) = ${ac + bc} cm ` +
             `není větší než strana AB (${ab} cm).`
    };
  }
  
  // 4. Vše OK!
  return {
    valid: true,
    error: ''
  };
};
```

#### Validace v reálném čase

```typescript
// useEffect při každé změně hodnoty
useEffect(() => {
  if (sideAB !== null && sideAC !== null && sideBC !== null) {
    const validation = validateTriangle(sideAB, sideAC, sideBC);
    setInputError(validation.error);
  } else {
    setInputError('');
  }
}, [sideAB, sideAC, sideBC]);
```

#### Povolení startu konstrukce

```typescript
const canStartConstruction = (): boolean => {
  // Musí být vyplněné všechny hodnoty
  if (sideAB === null || sideAC === null || sideBC === null) {
    return false;
  }
  
  // Musí projít validací
  const validation = validateTriangle(sideAB, sideAC, sideBC);
  return validation.valid;
};
```

### Spuštění konstrukce

```typescript
const handleStartConstruction = () => {
  // 1. Finální validace
  if (!canStartConstruction()) {
    return;
  }
  
  // 2. Schovej overlay
  setWaitingForInput(false);
  
  // 3. Inicializuj animaci
  setCurrentStep(0);
  setAnimProgress(0);
  setIsAnimating(true);
  
  // 4. Konstrukce teď běží s parametry sideAB, sideAC, sideBC
  // (stejně jako TriangleConstruction s customSides)
};
```

### Průběh konstrukce

Po spuštění běží **identická konstrukce** jako TriangleConstruction:

**Kroky**:
1. Narýsuj stranu AB (délka = sideAB)
2. Zapíchni kružítko do bodu A
3. Narýsuj kružnici z A (poloměr = sideAC)
4. Zapíchni kružítko do bodu B
5. Narýsuj kružnici z B (poloměr = sideBC)
6. Označ průsečík jako bod C
7. Dorýsuj trojúhelník ABC
8. Opsat trojúhelník (přidat popisky délek)

**Výpočet poloměrů**:
```typescript
// Výchozí délka AB v pixelech
const segmentLengthAB = Math.sqrt(
  Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
);

// Poloměry kružnic podle uživatelských hodnot
const radiusAC = segmentLengthAB * (sideAC / sideAB);
const radiusBC = segmentLengthAB * (sideBC / sideAB);

// Příklad:
// sideAB = 5 cm, sideAC = 4 cm, sideBC = 3 cm
// segmentLengthAB = 600 px
// radiusAC = 600 × (4/5) = 480 px
// radiusBC = 600 × (3/5) = 360 px
```

### Zobrazení vlastních hodnot

```typescript
// V draw funkci každého kroku
if (showCaptions && progress > 0.85) {
  // Zobrazit popisek s uživatelskou hodnotou
  drawLengthLabel(ctx, pointA, pointB, sideAB, dpr);
  drawLengthLabel(ctx, pointA, pointC, sideAC, dpr);
  drawLengthLabel(ctx, pointB, pointC, sideBC, dpr);
}
```

### Kompletní příklad hodnot

**Platný trojúhelník**:
```
AB = 7 cm
AC = 5 cm
BC = 4 cm

Kontrola:
  7 + 5 = 12 > 4 ✓
  7 + 4 = 11 > 5 ✓
  5 + 4 = 9 > 7 ✓
→ Trojúhelník EXISTUJE
```

**Neplatný trojúhelník**:
```
AB = 10 cm
AC = 3 cm
BC = 2 cm

Kontrola:
  3 + 2 = 5 < 10 ✗
→ Trojúhelník NEEXISTUJE
Error: "Strana AC (3 cm) + strana BC (2 cm) = 5 cm 
        není větší než strana AB (10 cm)."
```

---

## Trojúhelník z úhlů

### Koncept

**AngleTriangleConstruction** = Uživatel zadává základnu (délka) a dva úhly.

**Typ konstrukce**: **USU** (Úhel-Strana-Úhel)
- Základna AB (délka c)
- Úhel α při vrcholu A
- Úhel β při vrcholu B

**Pedagogický účel**:
- Student vidí, jak se trojúhelník určuje **ze dvou úhlů**
- Pochopení, že **součet úhlů = 180°**
- Vizualizace s **úhloměrem**

### Struktura komponenty

```typescript
export function AngleTriangleConstruction({
  onBack,
  darkMode,
  onDarkModeChange
}: AngleTriangleConstructionProps) {
  // === STATE PRO VSTUPY ===
  const [sideAB, setSideAB] = useState<number | null>(null);
  const [angleAlpha, setAngleAlpha] = useState<number | null>(null);  // úhel při A
  const [angleBeta, setAngleBeta] = useState<number | null>(null);    // úhel při B
  const [inputError, setInputError] = useState('');
  const [waitingForInput, setWaitingForInput] = useState(true);
  
  // === STATE PRO KONSTRUKCI ===
  const [currentStep, setCurrentStep] = useState(0);
  const [pointA, setPointA] = useState<Point>({ x: 860, y: 900 });
  const [pointB, setPointB] = useState<Point>({ x: 1460, y: 900 });
  const [pointC, setPointC] = useState<Point | null>(null);
  
  // === SVG ASSETS ===
  const protractorImageRef = useRef<HTMLImageElement | null>(null);
  const [protractorLoaded, setProtractorLoaded] = useState(false);
  
  // ... další state
}
```

### UI - Input Overlay

#### Layout

```
┌───────────────────────────────────────────────┐
│                                               │
│    Zadej základnu a úhly trojúhelníku         │
│                                               │
│   ┌─────────────────────────────────────┐   │
│   │        cm                            │   │
│   │        ⬆                             │   │
│   │       ╔═╗  ╔═╗                       │   │ ← Délka AB
│   │       ║0║  ║6║                       │   │
│   │       ╚═╝  ╚═╝                       │   │
│   │        ⬇                             │   │
│   │                   Délka základny AB  │   │
│   └─────────────────────────────────────┘   │
│                                               │
│   ┌─────────────────────────────────────┐   │
│   │        °                             │   │
│   │        ⬆                             │   │
│   │      ╔═╗  ╔═╗  ╔═╗                  │   │ ← Úhel α
│   │      ║0║  ║6║  ║0║                  │   │
│   │      ╚═╝  ╚═╝  ╚═╝                  │   │
│   │        ⬇                             │   │
│   │                   Úhel α při bodu A  │   │
│   └─────────────────────────────────────┘   │
│                                               │
│   ┌─────────────────────────────────────┐   │
│   │        °                             │   │
│   │        ⬆                             │   │
│   │      ╔═╗  ╔═╗  ╔═╗                  │   │ ← Úhel β
│   │      ║0║  ║5║  ║0║                  │   │
│   │      ╚═╝  ╚═╝  ╚═╝                  │   │
│   │        ⬇                             │   │
│   │                   Úhel β při bodu B  │   │
│   └─────────────────────────────────────┘   │
│                                               │
│   📐 Zbývající úhel γ = 70°                  │ ← Info o γ
│                                               │
│   ┌─────────────────────────────────────┐   │
│   │      Začít konstrukci               │   │
│   └─────────────────────────────────────┘   │
│                                               │
│   ⚠️ Součet úhlů musí být menší než 180°!   │ ← Error
│                                               │
└───────────────────────────────────────────────┘
```

#### Implementace JSX

```tsx
{waitingForInput && (
  <div className={`absolute inset-0 z-20 flex items-center justify-center ${
    darkMode ? 'bg-[#111827]' : 'bg-[#f9fafb]'
  }`}>
    <div className="w-full max-w-2xl p-8 space-y-8">
      {/* Nadpis */}
      <div className="text-center">
        <h2 className={`mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Zadej základnu a úhly trojúhelníku
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Trojúhelník se dá určit ze strany a dvou úhlů!
        </p>
      </div>
      
      {/* Input AB */}
      <BigNumberInput
        value={sideAB}
        onChange={setSideAB}
        min={1}
        max={99}
        unit="cm"
        darkMode={darkMode}
        label="Délka základny AB"
      />
      
      {/* Input α */}
      <BigNumberInput
        value={angleAlpha}
        onChange={setAngleAlpha}
        min={1}
        max={179}
        unit="°"
        darkMode={darkMode}
        label="Úhel α při vrcholu A"
      />
      
      {/* Input β */}
      <BigNumberInput
        value={angleBeta}
        onChange={setAngleBeta}
        min={1}
        max={179}
        unit="°"
        darkMode={darkMode}
        label="Úhel β při vrcholu B"
      />
      
      {/* Info o třetím úhlu */}
      {angleAlpha !== null && angleBeta !== null && angleAlpha + angleBeta < 180 && (
        <div className={`p-4 rounded-lg flex items-center gap-3 ${
          darkMode
            ? 'bg-blue-900/20 border border-blue-800 text-blue-300'
            : 'bg-blue-50 border border-blue-200 text-blue-700'
        }`}>
          <Info className="size-5 shrink-0" />
          <p>
            Třetí úhel γ při vrcholu C bude: <strong>{180 - angleAlpha - angleBeta}°</strong>
            <br />
            <span className="text-sm opacity-80">
              (součet úhlů v trojúhelníku je vždy 180°)
            </span>
          </p>
        </div>
      )}
      
      {/* Error */}
      {inputError && (
        <div className={`p-4 rounded-lg ${
          darkMode
            ? 'bg-red-900/20 border border-red-800 text-red-300'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Trojúhelník nelze narýsovat!</p>
              <p className="text-sm mt-1">{inputError}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Tlačítko start */}
      <button
        onClick={handleStartConstruction}
        disabled={!canStartConstruction()}
        className={`w-full py-4 rounded-xl font-medium text-lg transition-all ${
          canStartConstruction()
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {canStartConstruction() ? 'Začít konstrukci' : 'Vyplň všechny hodnoty'}
      </button>
    </div>
  </div>
)}
```

### Validace vstupu

#### Podmínka existence

**Matematická podmínka**:
```
Pro existenci trojúhelníku musí platit:
  α + β < 180°
  
A zároveň:
  α > 0°
  β > 0°
  c > 0  (délka základny)
```

**Implementace**:
```typescript
const validateAngleTriangle = (
  ab: number | null,
  alpha: number | null,
  beta: number | null
): { valid: boolean; error: string } => {
  // 1. Kontrola vyplnění
  if (ab === null || alpha === null || beta === null) {
    return {
      valid: false,
      error: 'Vyplň délku základny a oba úhly.'
    };
  }
  
  // 2. Kontrola kladných hodnot
  if (ab <= 0) {
    return {
      valid: false,
      error: 'Délka základny musí být větší než 0 cm.'
    };
  }
  
  if (alpha <= 0 || beta <= 0) {
    return {
      valid: false,
      error: 'Úhly musí být větší než 0°.'
    };
  }
  
  // 3. Součet úhlů
  if (alpha + beta >= 180) {
    const gamma = 180 - alpha - beta;
    return {
      valid: false,
      error: `Součet úhlů α (${alpha}°) + β (${beta}°) = ${alpha + beta}° ` +
             `je větší nebo roven 180°. ` +
             `Třetí úhel by musel být ${gamma}° nebo záporný, což není možné. ` +
             `Součet dvou úhlů musí být menší než 180°.`
    };
  }
  
  // 4. Kontrola rozumných hodnot (optional)
  if (alpha > 170 || beta > 170) {
    return {
      valid: false,
      error: 'Úhly jsou příliš velké. Trojúhelník by byl téměř úsečka.'
    };
  }
  
  // 5. Vše OK!
  return {
    valid: true,
    error: ''
  };
};
```

#### Výpočet třetího úhlu

```typescript
const calculateGamma = (): number | null => {
  if (angleAlpha === null || angleBeta === null) {
    return null;
  }
  
  const gamma = 180 - angleAlpha - angleBeta;
  return gamma > 0 ? gamma : null;
};

// V JSX
const gamma = calculateGamma();
```

### Geometrický výpočet bodu C

Nejsložitější část - vypočítat průsečík dvou polopřímek.

#### Princip

```
        C (průsečík)
        ●
       /│\
      / │ \
     /  │  \
    / α │ β \
   /    │    \
  ●─────┴─────●
  A     AB    B
```

**Kroky**:
1. Známe body A a B (základna)
2. Z bodu A vytvoříme **polopřímku** pod úhlem α
3. Z bodu B vytvoříme **polopřímku** pod úhlem β
4. Průsečík těchto polopřímek = bod C

#### Matematika

**Směr polopřímky z A**:
```typescript
// Úhel základny AB vůči horizontále
const baseAngle = Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x);

// Úhel α se měří od základny AB (proti směru hodinových ručiček)
const rayAAngle = baseAngle + (angleAlpha * Math.PI / 180);

// Směrový vektor polopřímky z A
const dirA = {
  x: Math.cos(rayAAngle),
  y: Math.sin(rayAAngle)
};
```

**Směr polopřímky z B**:
```typescript
// Úhel β se měří od BA (opačný směr než AB)
// BA má úhel baseAngle + π
const rayBAngle = (baseAngle + Math.PI) - (angleBeta * Math.PI / 180);

// Směrový vektor polopřímky z B
const dirB = {
  x: Math.cos(rayBAngle),
  y: Math.sin(rayBAngle)
};
```

**Průsečík polopřímek**:
```typescript
const calculatePointCFromAngles = (): Point | null => {
  if (!angleAlpha || !angleBeta || !sideAB) return null;
  
  // Kontrola součtu úhlů
  if (angleAlpha + angleBeta >= 180) return null;
  
  // Úhel základny AB
  const dx = pointB.x - pointA.x;
  const dy = pointB.y - pointA.y;
  const baseAngle = Math.atan2(dy, dx);
  
  // Převod úhlů na radiány
  const alphaRad = (angleAlpha * Math.PI) / 180;
  const betaRad = (angleBeta * Math.PI) / 180;
  
  // Úhly paprsků
  const rayAAngle = baseAngle + alphaRad;
  const rayBAngle = baseAngle + Math.PI - betaRad;
  
  // Směrové vektory
  const dirAx = Math.cos(rayAAngle);
  const dirAy = Math.sin(rayAAngle);
  const dirBx = Math.cos(rayBAngle);
  const dirBy = Math.sin(rayBAngle);
  
  // Parametrické rovnice:
  // Přímka z A: P = A + t × dirA
  // Přímka z B: P = B + s × dirB
  //
  // Soustava:
  // A.x + t × dirAx = B.x + s × dirBx
  // A.y + t × dirAy = B.y + s × dirBy
  
  // Determinant (cross product)
  const det = dirAx * dirBy - dirAy * dirBx;
  
  if (Math.abs(det) < 1e-10) {
    // Polopřímky jsou rovnoběžné → žádný průsečík
    return null;
  }
  
  // Výpočet parametru t
  const t = ((pointB.x - pointA.x) * dirBy - (pointB.y - pointA.y) * dirBx) / det;
  
  // Kontrola, že t >= 0 (průsečík na polopřímce, ne za bodem A)
  if (t < 0) return null;
  
  // Bod C
  return {
    x: pointA.x + t * dirAx,
    y: pointA.y + t * dirAy
  };
};
```

**Vizualizace výpočtu**:
```
Příklad: AB = 6 cm, α = 60°, β = 50°

Krok 1: baseAngle = 0° (horizontální základna)

Krok 2: rayAAngle = 0° + 60° = 60°
        dirA = (cos(60°), sin(60°)) = (0.5, 0.866)

Krok 3: rayBAngle = 180° - 50° = 130°
        dirB = (cos(130°), sin(130°)) = (-0.643, 0.766)

Krok 4: Řešení soustavy
        Determinant: 0.5 × 0.766 - 0.866 × (-0.643) = 0.940
        t = ... (výpočet)
        
Krok 5: C = A + t × dirA
```

### Průběh konstrukce

**Kroky konstrukce s úhloměrem**:

**Krok 0: Narýsuj základnu AB**
```typescript
{
  id: 0,
  title: 'Narýsuj základnu AB',
  description: `Začneme základnou AB délky ${sideAB} cm.`,
  draw: (ctx, ..., progress) => {
    // Úsečka s pravítkem
    drawSegment(ctx, pointA, pointB, color, 6, progress);
    drawRuler(ctx, pointA, pointB, progress);
    
    // Popisek délky
    if (showCaptions && progress > 0.85) {
      drawLengthLabel(ctx, pointA, pointB, sideAB, dpr);
    }
  }
}
```

**Krok 1: Vyznač úhel α u bodu A**
```typescript
{
  id: 1,
  title: 'Vyznač úhel α u bodu A',
  description: `Změříme úhel α = ${angleAlpha}° při vrcholu A.`,
  draw: (ctx, ..., progress) => {
    // Hotová základna
    drawSegment(ctx, pointA, pointB, color, 6, 1.0);
    
    // ÚHLOMĚR v bodě A
    if (showCaptions) {
      drawProtractor(ctx, pointA, baseAngle, angleAlpha, progress);
    }
    
    // Bod A zvýrazněn
  }
}
```

**Krok 2: Narýsuj paprsek z A pod úhlem α**
```typescript
{
  id: 2,
  title: 'Narýsuj paprsek z bodu A',
  description: `Z bodu A narýsujeme polopřímku pod úhlem ${angleAlpha}°.`,
  draw: (ctx, ..., progress) => {
    // Základna
    drawSegment(ctx, pointA, pointB, color, 6, 1.0);
    
    // Vypočítat koncový bod polopřímky (dostatečně daleko)
    const rayAAngle = baseAngle + (angleAlpha * Math.PI / 180);
    const rayLength = 400;  // 400 px mimo obraz
    const rayAEnd = {
      x: pointA.x + rayLength * Math.cos(rayAAngle),
      y: pointA.y + rayLength * Math.sin(rayAAngle)
    };
    
    // Polopřímka s pravítkem (zelená)
    drawSegment(ctx, pointA, rayAEnd, greenColor, 4, progress);
    drawRuler(ctx, pointA, rayAEnd, progress);
  }
}
```

**Krok 3: Vyznač úhel β u bodu B**
```typescript
{
  id: 3,
  title: 'Vyznač úhel β u bodu B',
  description: `Změříme úhel β = ${angleBeta}° při vrcholu B.`,
  draw: (ctx, ..., progress) => {
    // Základna + paprsek z A
    drawSegment(ctx, pointA, pointB, color, 6, 1.0);
    drawSegment(ctx, pointA, rayAEnd, greenColor, 4, 1.0);
    
    // ÚHLOMĚR v bodě B (otočený!)
    if (showCaptions) {
      // Úhel β se měří od BA (baseAngle + π)
      drawProtractor(ctx, pointB, baseAngle + Math.PI, angleBeta, progress);
    }
    
    // Bod B zvýrazněn
  }
}
```

**Krok 4: Narýsuj paprsek z B pod úhlem β**
```typescript
{
  id: 4,
  title: 'Narýsuj paprsek z bodu B',
  description: `Z bodu B narýsujeme polopřímku pod úhlem ${angleBeta}°.`,
  draw: (ctx, ..., progress) => {
    // Základna + paprsek z A
    drawSegment(ctx, pointA, pointB, color, 6, 1.0);
    drawSegment(ctx, pointA, rayAEnd, greenColor, 4, 1.0);
    
    // Vypočítat koncový bod druhé polopřímky
    const rayBAngle = (baseAngle + Math.PI) - (angleBeta * Math.PI / 180);
    const rayBEnd = {
      x: pointB.x + rayLength * Math.cos(rayBAngle),
      y: pointB.y + rayLength * Math.sin(rayBAngle)
    };
    
    // Druhá polopřímka s pravítkem
    drawSegment(ctx, pointB, rayBEnd, greenColor, 4, progress);
    drawRuler(ctx, pointB, rayBEnd, progress);
  }
}
```

**Krok 5: Označ průsečík jako bod C**
```typescript
{
  id: 5,
  title: 'Označ průsečík jako bod C',
  description: 'Průsečík obou paprsků je třetí vrchol trojúhelníku.',
  draw: (ctx, ..., progress) => {
    // Všechno předchozí
    drawSegment(ctx, pointA, pointB, color, 6, 1.0);
    drawSegment(ctx, pointA, rayAEnd, greenColor, 4, 1.0);
    drawSegment(ctx, pointB, rayBEnd, greenColor, 4, 1.0);
    
    // Bod C s fade-in
    if (progress > 0) {
      ctx.globalAlpha = Math.min(progress / 0.3, 1);
      drawPoint(ctx, pointC, 'C', redColor);
      ctx.globalAlpha = 1.0;
    }
  }
}
```

**Krok 6: Zvýrazni trojúhelník**
```typescript
{
  id: 6,
  title: 'Zvýrazni trojúhelník ABC',
  description: 'Hotový trojúhelník ABC!',
  draw: (ctx, ..., progress) => {
    // Strany trojúhelníku (tlustší)
    drawSegment(ctx, pointA, pointB, triangleColor, 6, 1.0);
    drawSegment(ctx, pointA, pointC, triangleColor, 5, 1.0);
    drawSegment(ctx, pointB, pointC, triangleColor, 5, 1.0);
    
    // Polopřímky (tenčí, nebo skryté)
    if (showCaptions) {
      drawSegment(ctx, pointA, rayAEnd, grayColor, 2, 1.0);
      drawSegment(ctx, pointB, rayBEnd, grayColor, 2, 1.0);
    }
    
    // Body
    drawPoint(ctx, pointA, 'A', color);
    drawPoint(ctx, pointB, 'B', color);
    drawPoint(ctx, pointC, 'C', triangleColor);
  }
}
```

**Krok 7: Opsat trojúhelník**
```typescript
{
  id: 7,
  title: 'Opsat trojúhelník',
  description: 'Připíšeme hodnoty úhlů.',
  draw: (ctx, ..., progress) => {
    // Trojúhelník
    drawSegment(ctx, pointA, pointB, triangleColor, 6, 1.0);
    drawSegment(ctx, pointA, pointC, triangleColor, 5, 1.0);
    drawSegment(ctx, pointB, pointC, triangleColor, 5, 1.0);
    
    // Popisky úhlů s postupným fade-in
    if (showCaptions) {
      if (progress > 0) {
        ctx.globalAlpha = Math.min(progress / 0.3, 1);
        drawAngleLabel(ctx, pointA, angleAlpha, dpr);
      }
      
      if (progress > 0.3) {
        ctx.globalAlpha = Math.min((progress - 0.3) / 0.3, 1);
        drawAngleLabel(ctx, pointB, angleBeta, dpr);
      }
      
      if (progress > 0.6) {
        const gamma = 180 - angleAlpha - angleBeta;
        ctx.globalAlpha = Math.min((progress - 0.6) / 0.3, 1);
        drawAngleLabel(ctx, pointC, gamma, dpr);
      }
      
      ctx.globalAlpha = 1.0;
    }
  }
}
```

### Vykreslení úhloměru

```typescript
const drawProtractor = (
  ctx: CanvasRenderingContext2D,
  center: Point,
  baseAngle: number,
  measuredAngle: number,
  progress: number
) => {
  if (!showCaptions || !protractorLoaded || !protractorImageRef.current) {
    return;
  }
  
  // Fade in/out podle timeline
  let alpha = 0;
  if (progress < 0.15) {
    alpha = progress / 0.15;
  } else if (progress >= 0.15 && progress <= 0.85) {
    alpha = 1.0;
  } else if (progress > 0.85 && progress < 1.0) {
    alpha = (1 - progress) / 0.15;
  } else {
    return;
  }
  
  const protractor = protractorImageRef.current;
  const protractorRadius = 150;
  
  ctx.save();
  
  // Přesunout do středu (vrchol úhlu)
  ctx.translate(center.x, center.y);
  
  // Rotovat tak, aby 0° úhloměru byl podél baseAngle
  ctx.rotate(baseAngle);
  
  ctx.globalAlpha = alpha;
  
  // Vykreslit úhloměr (půlkruh, střed v levém středu SVG)
  ctx.drawImage(
    protractor,
    -protractorRadius,
    -protractorRadius,
    protractorRadius * 2,
    protractorRadius * 2
  );
  
  // Červená značka ukazující měřený úhel
  ctx.rotate(measuredAngle * Math.PI / 180);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(protractorRadius * 0.8, 0);
  ctx.stroke();
  
  ctx.globalAlpha = 1.0;
  ctx.restore();
};
```

### Popisek úhlu

```typescript
const drawAngleLabel = (
  ctx: CanvasRenderingContext2D,
  vertex: Point,
  angle: number,
  dpr: number
) => {
  ctx.save();
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  
  const screenX = vertex.x * scale + offset.x;
  const screenY = vertex.y * scale + offset.y;
  
  // Text
  const text = `${angle}°`;
  ctx.font = '600 20px Arial, sans-serif';
  ctx.fillStyle = darkMode ? '#e5e7eb' : '#1f2937';
  
  // Pozice blízko vrcholu
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Kruhové pozadí
  const metrics = ctx.measureText(text);
  const bgRadius = Math.max(metrics.width, 18) / 2 + 4;
  
  ctx.fillStyle = darkMode ? 'rgba(55, 65, 81, 0.7)' : 'rgba(200, 200, 200, 0.5)';
  ctx.beginPath();
  ctx.arc(screenX + 30, screenY - 30, bgRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Text
  ctx.fillStyle = darkMode ? '#e5e7eb' : '#1f2937';
  ctx.fillText(text, screenX + 30, screenY - 30);
  
  ctx.restore();
};
```

### Kompletní příklad hodnot

**Platný trojúhelník**:
```
AB = 6 cm
α = 60°
β = 50°
γ = 180° - 60° - 50° = 70°

Kontrola:
  60° + 50° = 110° < 180° ✓
→ Trojúhelník EXISTUJE
```

**Neplatný trojúhelník**:
```
AB = 5 cm
α = 120°
β = 70°
γ = 180° - 120° - 70° = -10° ✗

Kontrola:
  120° + 70° = 190° >= 180° ✗
→ Trojúhelník NEEXISTUJE
Error: "Součet úhlů α (120°) + β (70°) = 190° 
        je větší než 180°."
```

---

## BigNumberInput komponenta

### Koncept

Velký vizuální input s **šipkami nahoru/dolů** pro každou číslici samostatně.

**Design**:
```
     cm / °
     ⬆  ⬆
    ╔═╗ ╔═╗
    ║0║ ║5║    ← Velké číslice (100px font)
    ╚═╝ ╚═╝
     ⬇  ⬇
```

### Props interface

```typescript
interface BigNumberInputProps {
  value: number | null;           // Aktuální hodnota
  onChange: (value: number) => void;  // Callback při změně
  min?: number;                   // Minimální hodnota (default: 0)
  max?: number;                   // Maximální hodnota (default: 999)
  step?: number;                  // Krok změny (default: 1)
  unit: 'cm' | '°';              // Jednotka
  darkMode?: boolean;             // Dark mode
  label?: string;                 // Popisek (optional)
}
```

### Struktura komponenty

```typescript
export function BigNumberInput({
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  unit,
  darkMode = false,
  label
}: BigNumberInputProps) {
  const [digits, setDigits] = useState<string[]>([]);
  
  // Určit počet číslic podle jednotky
  const totalDigits = unit === 'cm' ? 2 : 3;
  //  cm → 2 číslice (00-99)
  //  ° → 3 číslice (000-179)
  
  // ... implementace
}
```

### Inicializace číslic

```typescript
useEffect(() => {
  if (value !== null && value >= 0) {
    // Převést hodnotu na string a přidat leading zeros
    const valueStr = Math.round(value).toString();
    const digitArray = valueStr.padStart(totalDigits, '0').split('');
    setDigits(digitArray);
  } else {
    // Výchozí hodnota = minimum
    const defaultValue = Math.ceil(min).toString();
    const digitArray = defaultValue.padStart(totalDigits, '0').split('');
    setDigits(digitArray);
    
    if (value === null) {
      onChange(Math.ceil(min));
    }
  }
}, [value, min, totalDigits]);

// Příklad:
// value = 5, totalDigits = 2
// → valueStr = "5"
// → padStart(2, '0') = "05"
// → split('') = ["0", "5"]
```

### Získání aktuální hodnoty

```typescript
const getCurrentValue = (): number => {
  if (digits.length === 0) return min;
  
  const digitStr = digits.join('');  // ["0", "5"] → "05"
  return parseInt(digitStr) || 0;     // "05" → 5
};
```

### Změna hodnoty

```typescript
const updateValue = (newValue: number) => {
  // Omezit na min/max
  const clampedValue = Math.max(min, Math.min(max, newValue));
  onChange(Math.round(clampedValue));
};
```

### Inkrementace/dekrementace číslice

```typescript
const incrementDigit = (index: number) => {
  const currentValue = getCurrentValue();
  
  // Pozice číslice (0 = jednotky, 1 = desítky, 2 = stovky)
  const position = digits.length - index - 1;
  
  // Hodnota na této pozici (1, 10, 100)
  const digitValue = Math.pow(10, position);
  
  // Přičíst
  updateValue(currentValue + digitValue);
};

const decrementDigit = (index: number) => {
  const currentValue = getCurrentValue();
  const position = digits.length - index - 1;
  const digitValue = Math.pow(10, position);
  
  // Odečíst
  updateValue(currentValue - digitValue);
};

// Příklad:
// digits = ["0", "5"] → value = 5
// incrementDigit(0) → index 0 = jednotky
//   position = 2 - 0 - 1 = 1 (desítky!)
//   digitValue = 10^1 = 10
//   newValue = 5 + 10 = 15
//   → digits = ["1", "5"]
```

### Přímá změna číslice

```typescript
const handleDigitChange = (index: number, newDigit: string) => {
  // Kontrola, že je to číslice
  if (!/^\d$/.test(newDigit)) return;
  
  // Nahradit číslici
  const newDigits = [...digits];
  newDigits[index] = newDigit;
  setDigits(newDigits);
  
  // Aktualizovat hodnotu
  const digitStr = newDigits.join('');
  const newValue = parseInt(digitStr) || 0;
  updateValue(newValue);
};
```

### Render

```tsx
return (
  <div className="flex flex-col items-center gap-6">
    {/* Popisek */}
    {label && (
      <h3 className={`text-center ${
        darkMode ? 'text-gray-100' : 'text-gray-900'
      }`}>
        {label}
      </h3>
    )}
    
    <div className="flex items-center gap-6">
      {/* Velká jednotka nalevo */}
      <div className={`text-[120px] leading-none select-none ${
        darkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        {unit}
      </div>
      
      {/* Číslice */}
      <div className="flex items-center gap-3">
        {digits.map((digit, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            {/* Šipka nahoru */}
            <button
              onClick={() => incrementDigit(index)}
              className={`w-16 h-16 flex items-center justify-center rounded-xl transition-all ${
                darkMode
                  ? 'bg-gray-600 hover:bg-gray-500 active:bg-gray-400'
                  : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400'
              }`}
              aria-label="Zvýšit"
            >
              <ChevronUp className={`size-10 ${
                darkMode ? 'text-gray-100' : 'text-gray-700'
              }`} />
            </button>
            
            {/* Číslice - INPUT */}
            <input
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleDigitChange(index, e.target.value.slice(-1))}
              className={`w-24 h-32 text-center text-[100px] leading-none rounded-2xl border-4 transition-all ${
                darkMode
                  ? 'bg-gray-700 border-gray-500 text-blue-400 focus:border-blue-400'
                  : 'bg-white border-gray-300 text-blue-600 focus:border-blue-500'
              } focus:outline-none`}
              maxLength={1}
            />
            
            {/* Šipka dolů */}
            <button
              onClick={() => decrementDigit(index)}
              className={`w-16 h-16 flex items-center justify-center rounded-xl transition-all ${
                darkMode
                  ? 'bg-gray-600 hover:bg-gray-500 active:bg-gray-400'
                  : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400'
              }`}
              aria-label="Snížit"
            >
              <ChevronDown className={`size-10 ${
                darkMode ? 'text-gray-100' : 'text-gray-700'
              }`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);
```

### Příklad použití

```tsx
<BigNumberInput
  value={sideAB}
  onChange={setSideAB}
  min={1}
  max={99}
  unit="cm"
  darkMode={darkMode}
  label="Délka strany AB"
/>

// Výsledek:
// User vidí: cm ⬆⬆ [0][5] ⬇⬇
// value = 5
// Klik na horní šipku u jednotek: value = 6
// Klik na horní šipku u desítek: value = 15
```

---

## Validace a error handling

### Strategie validace

1. **Validace při změně hodnoty** (real-time)
2. **Vizuální feedback** (červené error hlášky)
3. **Disable tlačítka** pokud není validní
4. **Informativní chybové zprávy**

### Trigger validace

```typescript
// Validovat při každé změně vstupů
useEffect(() => {
  if (sideAB !== null && sideAC !== null && sideBC !== null) {
    const validation = validateTriangle(sideAB, sideAC, sideBC);
    setInputError(validation.error);
  } else {
    setInputError('');
  }
}, [sideAB, sideAC, sideBC]);
```

### Formátování error zpráv

```typescript
// Špatně (nezřetelné):
error: "Invalid triangle"

// Dobře (jasné a konkrétní):
error: "Strana AB (10 cm) + strana AC (2 cm) = 12 cm " +
       "není větší než strana BC (15 cm). " +
       "Součet dvou stran musí být vždy větší než třetí strana."
```

### Vizuální zpráva

```tsx
{inputError && (
  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
    <div className="flex items-start gap-3">
      <AlertCircle className="size-5 text-red-600 mt-0.5" />
      <div>
        <p className="font-medium text-red-900">
          Trojúhelník nelze narýsovat!
        </p>
        <p className="text-sm text-red-700 mt-1">
          {inputError}
        </p>
      </div>
    </div>
  </div>
)}
```

---

## Geometrické výpočty

### Průsečík dvou kružnic (pro trojúhelník SSS)

```typescript
function calculateCircleIntersections(
  center1: Point,
  radius1: number,
  center2: Point,
  radius2: number
): { top: Point; bottom: Point } | null {
  const d = Math.sqrt(
    (center2.x - center1.x) ** 2 + 
    (center2.y - center1.y) ** 2
  );
  
  // Kontrola existence
  if (d > radius1 + radius2) return null;  // příliš daleko
  if (d < Math.abs(radius1 - radius2)) return null;  // jedna uvnitř druhé
  if (d === 0) return null;  // stejné středy
  
  // Výpočet
  const a = (d ** 2 + radius1 ** 2 - radius2 ** 2) / (2 * d);
  const h = Math.sqrt(radius1 ** 2 - a ** 2);
  
  const midX = center1.x + (a / d) * (center2.x - center1.x);
  const midY = center1.y + (a / d) * (center2.y - center1.y);
  
  const perpX = -(center2.y - center1.y) / d;
  const perpY = (center2.x - center1.x) / d;
  
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

### Průsečík dvou polopřímek (pro trojúhelník z úhlů)

Viz sekce "Geometrický výpočet bodu C" výše.

---

## Závěr

Interaktivní konstrukce rozšiřují běžné konstrukce o:
- **Uživatelský vstup** přes BigNumberInput
- **Validaci** s okamžitým feedbackem
- **Experimentování** s různými parametry
- **Pedagogickou hodnotu** - student vidí, proč některé trojúhelníky neexistují

Obě konstrukce sdílejí:
- Stejný UI pattern (overlay → animace)
- Validaci před spuštěním
- Běžný průběh konstrukce po validaci
- Zobrazení uživatelských hodnot v popisku

Jsou výborným doplňkem k základním konstrukcím a umožňují studentům aktivní učení! 🎓
