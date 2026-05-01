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
    key: 'dbe1f182-36d1-4d49-995a-6e91bba5a2f6',
    title: 'Úkol',
    assignmentId: 'dbe1f182-36d1-4d49-995a-6e91bba5a2f6',
  },
  {
    key: '541e27b8-25cc-49e8-ad8c-122346200d30',
    title: 'Úkol',
    assignmentId: '541e27b8-25cc-49e8-ad8c-122346200d30',
  },
  {
    key: '0b929f76-a736-4002-82e5-92383547a88c',
    title: 'Úkol',
    assignmentId: '0b929f76-a736-4002-82e5-92383547a88c',
  },
  {
    key: '4eebb8f0-07fb-4859-bcfb-13df932c27e4',
    title: 'Úkol',
    assignmentId: '4eebb8f0-07fb-4859-bcfb-13df932c27e4',
  },
  {
    key: 'f5b65da4-c347-4517-85ea-a5dbf43ba982',
    title: 'Úkol',
    assignmentId: 'f5b65da4-c347-4517-85ea-a5dbf43ba982',
  },
  {
    key: '27578f58-d5fa-40bb-90b3-6046a143671d',
    title: 'Úkol',
    assignmentId: '27578f58-d5fa-40bb-90b3-6046a143671d',
  },
  {
    key: 'abff5488-ac09-4cf7-8a17-81d2303b025e',
    title: 'Úkol',
    assignmentId: 'abff5488-ac09-4cf7-8a17-81d2303b025e',
  },
  {
    key: '11a2a50a-a149-4a8a-8fc0-c87cd6e39d87',
    title: 'Úkol',
    assignmentId: '11a2a50a-a149-4a8a-8fc0-c87cd6e39d87',
  },
  {
    key: 'd046caea-a938-4f51-9fe0-b312f2f88df0',
    title: 'Úkol',
    assignmentId: 'd046caea-a938-4f51-9fe0-b312f2f88df0',
  },
  {
    key: '4a21b4c8-0f76-4404-914b-5207ee6fa7e0',
    title: 'Úkol',
    assignmentId: '4a21b4c8-0f76-4404-914b-5207ee6fa7e0',
  },
  {
    key: '6fe2b87a-b21e-4fc8-b362-e21ccd2d52d7',
    title: 'Úkol 1',
    assignmentId: '6fe2b87a-b21e-4fc8-b362-e21ccd2d52d7',
  },
  {
    key: 'c596a498-a022-4941-9f72-6650fd3a24b9',
    title: 'Úkol',
    assignmentId: 'c596a498-a022-4941-9f72-6650fd3a24b9',
  },
  {
    key: '159169ae-480a-4c9e-964f-62b81cf11376',
    title: 'Úkol',
    assignmentId: '159169ae-480a-4c9e-964f-62b81cf11376',
  },
  {
    key: '98662fb0-80ba-4549-b675-8b1e97000dfc',
    title: 'Úkol',
    assignmentId: '98662fb0-80ba-4549-b675-8b1e97000dfc',
  },
  {
    key: '8e9975f0-3f7a-4b77-8cae-79f5ff93d10e',
    title: 'Osová souměrnost 1',
    assignmentId: '8e9975f0-3f7a-4b77-8cae-79f5ff93d10e',
  },
  {
    key: '9415e7a8-5cdb-499c-a1a2-b4873816ec57',
    title: 'Osová souměrnost 2',
    assignmentId: '9415e7a8-5cdb-499c-a1a2-b4873816ec57',
  },
  {
    key: '8e7c1435-66a7-4890-9fe1-eeda0cde8beb',
    title: 'Osová souměrnost 3',
    assignmentId: '8e7c1435-66a7-4890-9fe1-eeda0cde8beb',
  },
  {
    key: 'f9a4741a-b4c0-4ef7-b290-2c3a65118d75',
    title: 'Středová souměrnost 1',
    assignmentId: 'f9a4741a-b4c0-4ef7-b290-2c3a65118d75',
  },
  {
    key: 'cc0c2450-e4fc-4d2a-b11a-fe25a3571d80',
    title: 'Středová souměrnost 2',
    assignmentId: 'cc0c2450-e4fc-4d2a-b11a-fe25a3571d80',
  },
  {
    key: 'e9ce3925-a2c9-4086-b579-15280cff2375',
    title: 'Středová souměrnost 3',
    assignmentId: 'e9ce3925-a2c9-4086-b579-15280cff2375',
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
