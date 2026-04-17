# Integrace bloku Úkoly do jiné aplikace

> **Hostitel „Geometrie online“:** používá tabulky `geometry_circuit_assignments` a `geometry_circuit_submissions` (viz `supabase/geometry_circuit_schema.sql` v tomto repu) — stejné sloupce jako Elobvod, ale oddělená data. Elobvod dál používá `circuit_*`.

Cíl (obecně): **stejný nebo sdílený Supabase projekt**, tabulky pro zadání a odevzdání, stejné sloupce a RLS. V tomto projektu jsou názvy tabulek s prefixem `geometry_circuit_*`.

## 1. Databáze

- **Geometrie online:** spusť `supabase/geometry_circuit_schema.sql` (tabulky `geometry_circuit_*`, komentáře v DB označují aplikaci).
- **Čistý Elobvod / fork bez prefixu:** `supabase/schema.sql` z repa vividbooks/elobvod — `circuit_assignments`, `circuit_submissions`.
- Názvy v kódu: `CIRCUIT_ASSIGNMENTS_TABLE` / `CIRCUIT_SUBMISSIONS_TABLE` v `src/lib/circuitTables.ts`.
- Pro tento blok stačí obvykle **SELECT + INSERT** na tabulku zadání (vytvoření, načtení knihovny / draft). Úprava existujícího řádku přes UI bývá **nový insert** po načtení draftu.

## 2. Proměnné prostředí

Host musí mít stejné veřejné Supabase proměnné jako tato aplikace (viz `src/lib/supabase.ts`):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Nebo vlastní inicializace `getSupabase()` kompatibilní s `@/lib/supabase` — `TasksSheet` volá `getSupabase()` z tohoto projektu.

## 3. Odkazy pro studenty (`/ukol/:id`)

Výchozí chování používá `assignmentPublicUrl` z `src/app/utils/appUrl.ts` (`origin` + Vite `BASE_URL` + `/ukol/:uuid`).

V **jiné aplikaci** předej vlastní builder:

```tsx
import { TasksSheet } from '@/features/tasks';

<TasksSheet
  open={open}
  onOpenChange={setOpen}
  resolveAssignmentPublicUrl={(id) =>
    `${window.location.origin}/tvoje-cesta/ukol/${id}`
  }
/>
```

Knihovna úkolů (`TASK_LIBRARY` v `taskLibrary.ts`) bere stejný builder přes `resolveStudentLink(entry, getUrl)` — uvnitř `TasksSheet` se to propojuje automaticky.

## 4. Co zkopírovat / závislosti

Minimálně související moduly z tohoto repozitáře:

- `src/app/components/tasks/**`
- `src/app/utils/instructionSteps.ts`
- `src/app/utils/appUrl.ts` (nebo vlastní URL logika + `resolveAssignmentPublicUrl`)
- `src/lib/supabase.ts`, `src/lib/supabasePublicDefaults.ts` (pokud používáš výchozí klient)
- `src/lib/circuitTables.ts`
- UI: komponenty z `src/app/components/ui/*` používané v `TasksSheet` (sheet, dialog, button, …)
- **Editor kreslení v dialogu** tahá `CircuitCanvas` + `ComponentPalette` — buď je zkopíruj se závislostmi, nebo ten dialog v hostu zjednoduš / nahraď.

Alias `@` → `src` (viz `vite.config.ts`).

## 5. Import z tohoto monorepa

```ts
import {
  TasksSheet,
  TASK_LIBRARY,
  resolveStudentLink,
  CIRCUIT_ASSIGNMENTS_TABLE,
} from '@/features/tasks';
```

## 6. Kontrolní seznam

- [ ] Stejné tabulky a sloupce jako ve `schema.sql`
- [ ] RLS politiky umožňují potřebné operace (select/insert na assignments)
- [ ] Env Supabase v hostu
- [ ] `resolveAssignmentPublicUrl` odpovídá routě, kde student vidí úkol
- [ ] `import.meta.env.BASE_URL` v hostu sedí s veřejnými odkazy (nebo vždy vlastní builder)
- [ ] Zkopírovány / nahrazeny závislosti: canvas, shadcn UI, `sonner`, `lucide-react`

## 7. Tento projekt (geometry-app)

- **Mount:** z úvodu (`Crossroads`) tlačítko **Úkoly** otevře `TasksSheet` (knihovna / vytvořit / editovat) — stejné UI jako v Elobvodu, bez samostatné stránky editoru obvodu.
- **Routy:** `/ukol/:assignmentId` (student), `/odpoved/:submissionId` (náhled odevzdání); globální `<Toaster />` v `App.tsx`.
- **Supabase:** stejný výchozí projekt jako Elobvod (`supabasePublicDefaults.ts`), ale **tabulky** `geometry_circuit_assignments` / `geometry_circuit_submissions` — nejdřív spusť `supabase/geometry_circuit_schema.sql` v SQL Editoru.
- **Knihovna:** `taskLibrary.ts` má prázdné `TASK_LIBRARY`; po vytvoření zadání doplň UUID z `geometry_circuit_assignments`.
- **Vlastní cesta / segment:** předej `resolveAssignmentPublicUrl` a shodný `assignmentUrlPathSegment` a doplň odpovídající `<Route>` v `App.tsx`.
- **Parsování odkazu:** `parseAssignmentIdFromUrlOrUuid(vstup, pathSegment?)` z `@/features/tasks`.
