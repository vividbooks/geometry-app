import { assignmentPublicUrl } from '@/app/utils/appUrl';

/**
 * Knihovna úkolů (přednastavené položky). Doplň po vytvoření zadání v `geometry_circuit_assignments`.
 * Položka: `title` + `assignmentId` (UUID řádku v této tabulce), volitelně `studentUrl`.
 *
 * Náhled: z DB (`instruction_image`), pokud existuje; `imageUrl` může přebít statickým obrázkem.
 */
export type TaskLibraryEntry = {
  key: string;
  title: string;
  assignmentId?: string;
  studentUrl?: string;
  imageUrl?: string;
};

/** Výchozí prázdná knihovna — doplň položky s `assignmentId` z `geometry_circuit_assignments`. */
export const TASK_LIBRARY: TaskLibraryEntry[] = [
  {
    key: '6fe2b87a-b21e-4fc8-b362-e21ccd2d52d7',
    title: 'Úkol 1',
    assignmentId: '6fe2b87a-b21e-4fc8-b362-e21ccd2d52d7',
  },
];

/** Absolutni src pro <img> (Vite base + relativni cesta z public). */
export function resolveLibraryImageSrc(imageUrl: string | undefined): string | null {
  if (!imageUrl?.trim()) return null;
  const u = imageUrl.trim();
  if (u.startsWith('http://') || u.startsWith('https://') || u.startsWith('data:')) return u;
  const base = import.meta.env.BASE_URL;
  const path = u.startsWith('/') ? u.slice(1) : u;
  const baseNorm = base.endsWith('/') ? base : `${base}/`;
  return `${baseNorm}${path}`;
}

/**
 * Odkaz pro studenty z položky knihovny.
 * `getAssignmentPublicUrl` umožní hostitelské aplikaci (jiný base path / doména) bez úprav tohoto souboru.
 */
export function resolveStudentLink(
  entry: TaskLibraryEntry,
  getAssignmentPublicUrl: (assignmentId: string) => string = assignmentPublicUrl,
): string | null {
  if (entry.studentUrl?.trim()) return entry.studentUrl.trim();
  if (entry.assignmentId?.trim()) return getAssignmentPublicUrl(entry.assignmentId.trim());
  return null;
}
