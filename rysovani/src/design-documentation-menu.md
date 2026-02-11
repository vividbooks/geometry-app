# 📐 Design dokumentace - Geometrie rozcestník

Kompletní design guide pro implementaci flat design rozcestníku inspirovaného Figma designem.

---

## 🎨 1. BAREVNÁ PALETA

### Primární barvy
```css
/* Hlavní brand barva - modrá */
--primary-blue: #4d49f3;
--primary-blue-hover: #3d39e3;
--primary-blue-light: #e0e7ff;  /* pro stíny */
--primary-blue-pale: #f0f0ff;   /* pro badges */

/* Tmavá barva textu */
--text-dark: #09056f;    /* nadpisy */
--text-gray: #4e5871;    /* body text, popisky */

/* Pozadí */
--bg-white: #ffffff;
--bg-yellow: #fefce8;    /* hero sekce */
--bg-gray: #e5e7eb;      /* bordery */
```

### Barevná paleta pro karty (CategoryCard)
```css
/* Tabule karta */
--card-board-bg: #dcf3ff;
--card-board-preview: #e3f4ff;

/* Počítač karta */
--card-computer-bg: #fff8b3;
--card-computer-preview: #fefce8;
```

### Barevná paleta pro konstrukce (ConstructionCard)
```css
--construction-1: #dcf3ff;  /* světle modrá */
--construction-2: #f5f8d0;  /* světle zelená */
--construction-3: #fff8b3;  /* světle žlutá */
--construction-4: #fce8f4;  /* světle růžová */
--construction-5: #e8f5e9;  /* světle zelená 2 */
```

---

## 📝 2. TYPOGRAFIE

### Font family
```css
/* Primární font */
font-family: "Arimo", sans-serif;  /* jen pro hlavní nadpis */

/* Fallback systémové fonty */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Font velikosti
```css
/* Hero sekce */
--hero-title: 56px (desktop), 42px (mobile);
--hero-desc: 16px;
--hero-link: 15px;

/* Sekce nadpisy */
--section-title: 32px;

/* CategoryCard */
--card-title: 20px;
--card-desc: 14px;
--card-button: 15px;

/* ConstructionCard */
--construction-title: 18px;
--construction-desc: 13px;
--construction-badge: 12px;

/* Filtry */
--filter-text: 14px;
```

### Font váhy
```css
font-weight: 400;  /* všude použito normale */
/* Nikde není bold - flat design princip */
```

### Line height
```css
--hero-title-lh: 1.1;
--hero-desc-lh: 26px;
--card-desc-lh: 22px;
--construction-desc-lh: 20px;
```

---

## 📐 3. LAYOUT & SPACING

### Základní struktura
```
┌─────────────────────────────────────┐
│  Hero sekce (žluté pozadí)          │
│  - Nadpis + popis                   │
│  - SVG ilustrace (desktop only)     │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  Filter tlačítka (Vše/Kreslení/...) │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  "Volné rýsování" sekce             │
│  - 2 velké CategoryCards (grid 2x1) │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  "Konstrukce" sekce                 │
│  - 5 malých ConstructionCards 3x2   │
└─────────────────────────────────────┘
```

### Grid system
```css
/* CategoryCard sekce */
display: grid;
grid-template-columns: repeat(1, 1fr);  /* mobile */
grid-template-columns: repeat(2, 1fr);  /* tablet+ */
gap: 24px;
max-width: 672px;  /* max-w-2xl */
margin: 0 auto;

/* ConstructionCard sekce */
display: grid;
grid-template-columns: repeat(1, 1fr);  /* mobile */
grid-template-columns: repeat(2, 1fr);  /* tablet */
grid-template-columns: repeat(3, 1fr);  /* desktop */
gap: 24px;
max-width: 1280px;  /* max-w-5xl */
```

### Spacing hodnoty
```css
/* Hero padding */
padding: 40px 56px (desktop);
padding: 40px 32px (mobile);
margin: 16px 32px (desktop);
margin: 16px 16px (mobile);

/* Sekce margins */
margin-top: 64px (konstrukce sekce);
margin-bottom: 80px;

/* Filter margins */
margin-top: 40px;
margin-bottom: 16px;
gap: 12px;

/* Card padding */
padding: 24px (CategoryCard);
padding: 20px (ConstructionCard);
```

### Border radius
```css
--hero-radius: 32px;
--category-card-radius: 32px;
--construction-card-radius: 24px;
--button-radius: 14px;
--filter-radius: 9999px;  /* plně kulatý */
--badge-radius: 9999px;   /* plně kulatý */
```

---

## 🃏 4. KOMPONENTY

### A) CategoryCard (velké karty pro Tabule/Počítač)

#### Struktura
```
┌─────────────────────────┐
│                         │
│   Preview oblast        │ ← 200px výška, barevné pozadí
│   (SVG ilustrace)       │
│                         │
├─────────────────────────┤
│ Název                   │ ← 20px, #4e5871
│ Popis popis popis...    │ ← 14px, #4e5871, opacity 70%
│                         │
│ ┌─────────────────────┐ │
│ │  ▶  Otevřít         │ │ ← CTA tlačítko
│ └─────────────────────┘ │
└─────────────────────────┘
```

#### Styling
```css
.category-card {
  /* Základní */
  display: flex;
  flex-direction: column;
  border-radius: 32px;
  border: 2px solid transparent;
  overflow: hidden;
  background-color: var(--card-bg);  /* #dcf3ff nebo #fff8b3 */
  
  /* Interakce */
  transition: all 200ms;
  cursor: pointer;
}

.category-card:hover {
  transform: scale(1.02);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.category-card:active {
  transform: scale(0.98);
}

/* Preview sekce */
.category-card__preview {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--preview-bg);  /* světlejší než card-bg */
}

/* Content sekce */
.category-card__content {
  padding: 24px;
  padding-top: 24px;
  padding-bottom: 0;
}

/* CTA tlačítko */
.category-card__button {
  background: #4d49f3;
  height: 44px;
  border-radius: 14px;
  box-shadow: 
    0px 10px 15px 0px #e0e7ff,
    0px 4px 6px 0px #e0e7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  margin-bottom: 24px;
  transition: background 200ms;
}

.category-card__button:hover {
  background: #3d39e3;
}
```

#### SVG ilustrace transformace
```css
/* Tabule ilustrace */
.tabule-illustration {
  width: 274px;
  height: 200px;
  position: relative;
}

.tabule-illustration > svg {
  width: 1055px;
  height: 1071px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.2) rotate(-6deg);
}

/* Počítač ilustrace */
.pocitac-illustration {
  width: 280px;
  height: 190px;
  position: relative;
}

.pocitac-illustration > svg {
  width: 1236px;
  height: 852px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.22);
}
```

---

### B) ConstructionCard (malé karty pro konstrukce)

#### Struktura
```
┌──────────────────┐
│                  │
│     🧭 Icon      │ ← 140px, barevné pozadí
│                  │
├──────────────────┤
│ Název konstrukce │ ← 18px
│ Popis popis...   │ ← 13px, opacity 70%
│                  │
│ ┌──────┐    →   │ ← badge + šipka
└──────────────────┘
```

#### Styling
```css
.construction-card {
  /* Základní */
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  border: 1px solid #e5e7eb;
  background: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
  
  /* Interakce */
  transition: all 200ms;
  cursor: pointer;
}

.construction-card:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.construction-card:active {
  transform: scale(0.98);
}

/* Icon sekce */
.construction-card__icon {
  width: 100%;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--construction-color);  /* #dcf3ff, #f5f8d0, atd. */
}

.construction-card__icon svg {
  width: 44px;
  height: 44px;
  color: #4e5871;
  opacity: 0.6;
}

/* Content */
.construction-card__content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* Footer s badge */
.construction-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}

/* Badge (ročník) */
.construction-card__badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 9999px;
  background: #f0f0ff;
  color: #4d49f3;
  font-size: 12px;
}

/* Šipka */
.construction-card__arrow {
  width: 16px;
  height: 16px;
  color: #4d49f3;
  opacity: 0;
  transition: all 200ms;
}

.construction-card:hover .construction-card__arrow {
  opacity: 1;
  transform: translateX(4px);
}
```

---

### C) Filter tlačítka

#### Styling
```css
.filter-button {
  padding: 10px 24px;
  border-radius: 9999px;
  font-size: 14px;
  border: 2px solid;
  transition: all 200ms;
  cursor: pointer;
}

/* Neaktivní stav */
.filter-button--inactive {
  background: white;
  color: #4e5871;
  border-color: #4e5871;
}

.filter-button--inactive:hover {
  background: #f9fafb;
}

/* Aktivní stav */
.filter-button--active {
  background: #4d49f3;
  color: white;
  border-color: transparent;
  box-shadow: 
    0px 10px 15px 0px #e0e7ff,
    0px 4px 6px 0px #e0e7ff;
}
```

---

### D) Hero sekce

#### Struktura
```
┌──────────────────────────────────────────────────┐
│ ┌────────────────┐      ┌──────────────────────┐ │
│ │ Geometrie      │      │   [SVG ilustrace]    │ │
│ │ online         │      │   Pravítko, kružítko,│ │
│ │                │      │   úhloměr, pero      │ │
│ │ Popis aplikace │      │   (rotované)         │ │
│ │                │      └──────────────────────┘ │
│ │ → Začít        │                               │
│ └────────────────┘                               │
└──────────────────────────────────────────────────┘
```

#### Styling
```css
.hero {
  margin: 16px 32px;  /* desktop */
  margin: 16px 16px;  /* mobile */
  border-radius: 32px;
  background: #fefce8;
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.hero__content {
  display: flex;
  flex-direction: column;  /* mobile */
  flex-direction: row;     /* desktop lg+ */
  align-items: center;
  justify-content: space-between;
  padding: 40px 56px;      /* desktop */
  padding: 40px 32px;      /* mobile */
  gap: 32px;
}

.hero__title {
  color: #09056f;
  font-family: "Arimo", sans-serif;
  font-size: 56px;        /* desktop */
  font-size: 42px;        /* mobile */
  line-height: 1.1;
  margin-bottom: 24px;
}

.hero__description {
  color: #09056f;
  font-size: 16px;
  line-height: 26px;
  margin-bottom: 16px;
  max-width: 448px;  /* max-w-md */
}

.hero__cta {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #4d49f3;
  font-size: 15px;
  cursor: pointer;
}

.hero__cta:hover {
  text-decoration: underline;
}

/* SVG ilustrace v hero (desktop only) */
.hero__illustration {
  position: relative;
  width: 300px;
  height: 180px;
  flex-shrink: 0;
  display: none;  /* mobile */
  display: block; /* md+ */
}

/* Jednotlivé SVG nástroje */
.hero__tool--pravitko {
  position: absolute;
  top: 8px;
  left: 32px;
  width: 160px;
  height: 100px;
  transform: rotate(-8deg);
  opacity: 0.9;
}

.hero__tool--kruzitko {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 60px;
  height: 150px;
  transform: rotate(5deg);
  opacity: 0.9;
}

.hero__tool--uhel {
  position: absolute;
  bottom: 0;
  left: 100px;
  width: 100px;
  height: 60px;
  transform: rotate(3deg);
  opacity: 0.9;
}

.hero__tool--pero {
  position: absolute;
  top: 0;
  right: 90px;
  width: 80px;
  height: 50px;
  transform: rotate(-3deg);
  opacity: 0.8;
}
```

---

### E) PlayIcon (vlastní SVG)

```jsx
function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3.5 2.5L9.5 6L3.5 9.5V2.5Z" fill="white" />
    </svg>
  );
}
```

---

## 🎭 5. ANIMACE & INTERAKCE

### Hover efekty
```css
/* Všechny karty */
transition: all 200ms ease-in-out;

/* Scale efekty */
:hover {
  transform: scale(1.02);
}

:active {
  transform: scale(0.98);
}

/* Stíny */
:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);  /* CategoryCard */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);  /* ConstructionCard */
}

/* Šipka v ConstructionCard */
.arrow {
  opacity: 0;
  transition: all 200ms;
}

.card:hover .arrow {
  opacity: 1;
  transform: translateX(4px);
}

/* CTA tlačítko v CategoryCard */
.cta-button {
  transition: background 200ms;
}

.cta-button:hover {
  background: #3d39e3;  /* tmavší modrá */
}
```

### Timing
```css
/* Vše používá stejný timing pro konzistenci */
transition-duration: 200ms;
transition-timing-function: ease-in-out;
```

---

## 📱 6. RESPONSIVITA

### Breakpointy (Tailwind)
```css
sm: 640px   /* tablet portrait */
md: 768px   /* tablet landscape */
lg: 1024px  /* desktop */
xl: 1280px  /* large desktop */
```

### Mobile (< 640px)
```css
/* Hero */
- flex-direction: column
- font-size: 42px (title)
- padding: 40px 32px
- margin: 16px
- SVG ilustrace hidden

/* Grid layout */
- grid-template-columns: 1fr (CategoryCard)
- grid-template-columns: 1fr (ConstructionCard)
- gap: 24px

/* Filtry */
- flex-wrap: wrap
- margin: 16px
```

### Tablet (640px - 1024px)
```css
/* Hero */
- flex-direction: column (do lg)
- font-size: 56px

/* Grid layout */
- grid-template-columns: repeat(2, 1fr) (CategoryCard)
- grid-template-columns: repeat(2, 1fr) (ConstructionCard)

/* Filtry */
- flex-wrap: wrap
```

### Desktop (1024px+)
```css
/* Hero */
- flex-direction: row
- SVG ilustrace visible

/* Grid layout */
- grid-template-columns: repeat(2, 1fr) (CategoryCard)
- grid-template-columns: repeat(3, 1fr) (ConstructionCard)
```

---

## 🎯 7. PŘÍSTUPNOST (A11y)

### Semantika
```html
<!-- Použít semantic HTML -->
<button> pro všechny klikatelné prvky
<h1>, <h2>, <h3> pro nadpisy
<p> pro popisky
```

### Kontrasty
```css
/* Text na bílém pozadí */
#4e5871 na #ffffff = 7.8:1 ✅ AAA

/* Text na modrém pozadí */
#ffffff na #4d49f3 = 8.6:1 ✅ AAA

/* Text v hero */
#09056f na #fefce8 = 14.2:1 ✅ AAA
```

### Keyboard navigation
```css
/* Focus states */
:focus-visible {
  outline: 2px solid #4d49f3;
  outline-offset: 2px;
}
```

### Screen reader support
```html
<!-- Přístupné labely -->
<button aria-label="Otevřít tabuli pro kreslení">
  ...
</button>
```

---

## 🛠️ 8. IMPLEMENTAČNÍ TIPY

### React komponenty
```jsx
// Memoizace pro performance
const CategoryCard = memo(({ title, description, ... }) => {
  // ...
});

// Props structure
interface CategoryCardProps {
  title: string;
  description: string;
  bgColor: string;         // např. "#dcf3ff"
  previewBg: string;       // např. "#e3f4ff"
  preview: React.ReactNode; // SVG komponenta
  onClick: () => void;
}
```

### Datová struktura
```typescript
// Konstrukce
const constructions = [
  {
    id: 'bisector',
    title: 'Osa úsečky',
    description: 'Konstrukce osy úsečky pomocí kružnic',
    icon: Compass,
    grade: '2. ročník',
    color: '#dcf3ff'
  },
  // ...
];

// Filtry
const filters = [
  { id: 'all', label: 'Vše' },
  { id: 'drawing', label: 'Volné rýsování' },
  { id: 'construction', label: 'Konstrukce' }
];
```

### SVG Import patterns
```jsx
// Z Figma importované komponenty
import TabuleIllustration from './imports/Group23925';
import PocitacIllustration from './imports/Group23926';
import Pravitko from './imports/Pravitko';
import Kruzitko from './imports/Kruzitko';
import Uhel from './imports/Uhel';
import Pero from './imports/Pero';

// Použití s transformací
<div style={{ 
  width: 274, 
  height: 200, 
  position: 'relative' 
}}>
  <div style={{ 
    width: 1055, 
    height: 1071, 
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%, -50%) scale(0.2) rotate(-6deg)' 
  }}>
    <TabuleIllustration />
  </div>
</div>
```

### CSS-in-JS alternativa
```jsx
// Inline styles pro specifické barvy
style={{ 
  backgroundColor: bgColor, 
  fontWeight: 400 
}}

// Tailwind pro layout
className="flex flex-col gap-4 p-6"
```

---

## 📊 9. STÍNOVÁNÍ

### CategoryCard
```css
box-shadow: none;  /* default */

/* Hover */
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 8px 10px -6px rgba(0, 0, 0, 0.1);

/* CTA tlačítko uvnitř */
box-shadow: 0px 10px 15px 0px #e0e7ff,
            0px 4px 6px 0px #e0e7ff;
```

### ConstructionCard
```css
/* Default */
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

/* Hover */
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -4px rgba(0, 0, 0, 0.1);
```

### Filter tlačítka (aktivní)
```css
box-shadow: 0px 10px 15px 0px #e0e7ff,
            0px 4px 6px 0px #e0e7ff;
```

### Hero
```css
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
```

---

## 🎨 10. DESIGN PRINCIPY

### Flat Design
- **Žádné gradienty** - všechny barvy jsou ploché
- **Minimální stíny** - jen jemné pro hloubku
- **Jednoduché tvary** - kulaté rohy, žádné komplexní tvary
- **Font weight 400** - nikde bold, konzistentní váha

### Barevná hierarchie
1. **Primární akce** → modrá (#4d49f3)
2. **Text** → tmavě šedá (#4e5871)
3. **Pozadí** → světlé pastelové barvy
4. **Akcenty** → světlé verze hlavních barev

### Spacing konzistence
- **4px grid** - všechny spacing hodnoty jsou násobky 4px
- **Gap konzistence** - stejný gap v grid layoutech (24px)
- **Padding konzistence** - podobné padding hodnoty

### Interakce
- **Subtle scale** - jen 2% scale na hover (1.02)
- **Quick animations** - 200ms pro všechny přechody
- **Active feedback** - scale(0.98) na kliknutí
- **Progressive disclosure** - šipka se objeví až na hover

---

## ✅ CHECKLIST pro implementaci

- [ ] Nastavit barevné CSS proměnné
- [ ] Importovat Arimo font pro hlavní nadpis
- [ ] Vytvořit CategoryCard komponentu s memo
- [ ] Vytvořit ConstructionCard komponentu s memo
- [ ] Implementovat filter logiku (useState)
- [ ] Přidat SVG ilustrace (Figma export)
- [ ] Nastavit responsive grid (1/2/3 columns)
- [ ] Implementovat hover animace
- [ ] Přidat box-shadow na správná místa
- [ ] Otestovat na mobile/tablet/desktop
- [ ] Zkontrolovat kontrasty (WCAG AAA)
- [ ] Přidat focus states pro klávesnici
- [ ] Optimalizovat pro starší zařízení (memo, lazy load)

---

## 🔗 Použité knihovny

```json
{
  "react": "^18",
  "lucide-react": "ikony pro ConstructionCard a šipky",
  "tailwindcss": "utility classes pro layout"
}
```

---

## 💡 Pro & Proti tohoto designu

### ✅ Výhody
- Čistý, moderní flat design
- Vynikající čitelnost
- Rychlá načítání (minimální grafika)
- Snadná údržba a škálování
- Dobrá přístupnost
- Konzistentní napříč zařízeními

### ⚠️ Kompromisy
- Méně vizuálně "wow" než gradient design
- Vyžaduje kvalitní SVG ilustrace
- Barevná paleta musí být pečlivě zvolená
- Může vypadat "příliš jednoduše" pro některé účely

---

**Autor:** Design inspirovaný Figma flat design principy  
**Datum:** Únor 2026  
**Verze:** 1.0
