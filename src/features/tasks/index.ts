/**
 * Veřejný vstup pro blok „Úkoly“ — stejná DB / tabulky jako Elobvod.
 */
export { TasksSheet, type TasksSheetProps } from '@/app/components/tasks/TasksSheet';
export {
  TASK_LIBRARY,
  resolveLibraryImageSrc,
  resolveStudentLink,
  type TaskLibraryEntry,
} from '@/app/components/tasks/taskLibrary';
export { CIRCUIT_ASSIGNMENTS_TABLE, CIRCUIT_SUBMISSIONS_TABLE } from '@/lib/circuitTables';
export { parseAssignmentIdFromUrlOrUuid } from '@/app/utils/assignmentUrl';
