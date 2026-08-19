/**
 * Veřejný vstup pro blok „Úkoly“ — stejná DB / tabulky jako Elobvod.
 */
export { TasksSheet, type TasksSheetProps } from '@/app/components/tasks/TasksSheet';
export {
  TASK_LIBRARY,
  TASK_LIBRARY_GRADES,
  formatTaskLibraryGradeLabel,
  resolveLibraryImageSrc,
  resolveStudentLink,
  taskLibraryEntriesForGrade,
  taskLibraryGradeOf,
  type TaskLibraryEntry,
  type TaskLibraryGrade,
} from '@/app/components/tasks/taskLibrary';
export { CIRCUIT_ASSIGNMENTS_TABLE, CIRCUIT_SUBMISSIONS_TABLE } from '@/lib/circuitTables';
export { parseAssignmentIdFromUrlOrUuid } from '@/app/utils/assignmentUrl';
