import { assignmentPublicUrl } from '@/app/utils/appUrl';

/**
 * Knihovna úkolů (přednastavené položky). Doplň po vytvoření zadání v `geometry_circuit_assignments`.
 * Položka: `title` + `assignmentId` (UUID řádku v této tabulce), volitelně `studentUrl`.
 *
 * Náhled: z DB (`instruction_image`), pokud existuje; `imageUrl` může přebít statickým obrázkem.
 */
export type TaskLibraryGrade = 6 | 7 | 8 | 9;

export const TASK_LIBRARY_GRADES: TaskLibraryGrade[] = [6, 7, 8, 9];

export type TaskLibraryEntry = {
  key: string;
  title: string;
  assignmentId?: string;
  studentUrl?: string;
  imageUrl?: string;
  /** Ročník ZŠ; výchozí 6. */
  grade?: TaskLibraryGrade;
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
  {
    key: '7c3e9b12-4f8a-4d6e-9c21-8b5a0e17d4f3',
    title: 'Konstrukce trojúhelníků',
    assignmentId: '7c3e9b12-4f8a-4d6e-9c21-8b5a0e17d4f3',
    grade: 7,
  },
  {
    key: 'e5f1a8c3-2d47-4b9e-91c0-8a3f6d2e5b17',
    title: 'Konstrukce trojúhelníků 2',
    assignmentId: 'e5f1a8c3-2d47-4b9e-91c0-8a3f6d2e5b17',
    grade: 7,
  },
  {
    key: 'c4d8e2a1-7b3f-4c9e-a812-6f0d5b47e9c3',
    title: 'Střední příčky',
    assignmentId: 'c4d8e2a1-7b3f-4c9e-a812-6f0d5b47e9c3',
    grade: 7,
  },
  {
    key: 'a7c3e19b-4d52-48f0-b6e1-9c8a2d4f0b31',
    title: 'Těžnice',
    assignmentId: 'a7c3e19b-4d52-48f0-b6e1-9c8a2d4f0b31',
    grade: 7,
  },
  {
    key: 'd2b9f4e6-1a38-4c7d-8e05-3f7a1c9b6d24',
    title: 'Výšky',
    assignmentId: 'd2b9f4e6-1a38-4c7d-8e05-3f7a1c9b6d24',
    grade: 7,
  },
  {
    key: 'c60a96b6-06d7-44be-99b9-d591bc65384b',
    title: 'Sečny',
    assignmentId: 'c60a96b6-06d7-44be-99b9-d591bc65384b',
    grade: 8,
  },
  {
    key: '27cc796f-e013-4838-90a0-59ab02470062',
    title: 'Tečny',
    assignmentId: '27cc796f-e013-4838-90a0-59ab02470062',
    grade: 8,
  },
  {
    key: 'b03b566b-83c4-4efe-9dd1-f3eac24e5ae0',
    title: 'Vzdálenost bodů',
    assignmentId: 'b03b566b-83c4-4efe-9dd1-f3eac24e5ae0',
    grade: 8,
  },
  {
    key: '01b99ac9-00ba-401c-bb64-13276890c918',
    title: 'Vzdálenost bodu od přímky',
    assignmentId: '01b99ac9-00ba-401c-bb64-13276890c918',
    grade: 8,
  },
  {
    key: '4468a8e9-cb79-4dd7-9063-36734bd9ea4e',
    title: 'Kružnice trojúhelníku opsaná',
    assignmentId: '4468a8e9-cb79-4dd7-9063-36734bd9ea4e',
    grade: 8,
  },
  {
    key: '7b382a2c-ec8c-486b-a2bd-e5aa46d830e9',
    title: 'Kružnice trojúhelníku vepsaná',
    assignmentId: '7b382a2c-ec8c-486b-a2bd-e5aa46d830e9',
    grade: 8,
  },
  {
    key: '001f723d-8258-4b60-96ea-b6734d70bca3',
    title: 'Kružnice trojúhelníku vepsaná 2',
    assignmentId: '001f723d-8258-4b60-96ea-b6734d70bca3',
    grade: 8,
  },
];

export function taskLibraryGradeOf(entry: TaskLibraryEntry): TaskLibraryGrade {
  return entry.grade ?? 6;
}

export function taskLibraryEntriesForGrade(
  entries: TaskLibraryEntry[],
  grade: TaskLibraryGrade,
): TaskLibraryEntry[] {
  return entries.filter(entry => taskLibraryGradeOf(entry) === grade);
}

export function formatTaskLibraryGradeLabel(grade: TaskLibraryGrade): string {
  return `${grade}. ročník`;
}

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
