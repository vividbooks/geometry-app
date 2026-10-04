/**
 * Vzorová řešení konstrukčních úloh CERMAT (sekce „CERMAT“ v knihovně úkolů) po krocích.
 * Počítají se ze stejných souřadnic jako zadání (`cermatAssignments.ts`), takže řešení
 * na plátně přesně sedí na daných bodech a přímkách. Každé řešení nese i `check` pro
 * automatickou kontrolu žákova rýsování (`constructionCheck.ts`).
 */
import type { AssignmentModelSolution } from './assignmentSolutions';
import { CERMAT_SOLUTIONS_2026 } from './cermat/solutions2026';
import { CERMAT_SOLUTIONS_2025 } from './cermat/solutions2025';
import { CERMAT_SOLUTIONS_2024 } from './cermat/solutions2024';
import { CERMAT_SOLUTIONS_2023 } from './cermat/solutions2023';
import { CERMAT_SOLUTIONS_2022 } from './cermat/solutions2022';
import { CERMAT_SOLUTIONS_2020_2021 } from './cermat/solutions2020-2021';
import { CERMAT_SOLUTIONS_2018_2019 } from './cermat/solutions2018-2019';
import { CERMAT_SOLUTIONS_2015_2017 } from './cermat/solutions2015-2017';
import { GRADE9_STYLE_SOLUTIONS_A } from './cermat/solutions9-a';
import { GRADE9_STYLE_SOLUTIONS_B } from './cermat/solutions9-b';
import { GRADE9_STYLE_SOLUTIONS_C } from './cermat/solutions9-c';
import { GRADE9_STYLE_SOLUTIONS_D } from './cermat/solutions9-d';
import { PRIJIMACKY_TEST_SOLUTIONS_A } from './cermat/solutionsPrijimacky-a';
import { PRIJIMACKY_TEST_SOLUTIONS_B } from './cermat/solutionsPrijimacky-b';
import { PRIJIMACKY_TEST_SOLUTIONS_C } from './cermat/solutionsPrijimacky-c';
import { PRIJIMACKY_TEST_SOLUTIONS_D } from './cermat/solutionsPrijimacky-d';
import { PRIJIMACKY_TEST_SOLUTIONS_E } from './cermat/solutionsPrijimacky-e';
import { PRIJIMACKY_TEST_SOLUTIONS_F } from './cermat/solutionsPrijimacky-f';
import { PRIJIMACKY_TEST_SOLUTIONS_G } from './cermat/solutionsPrijimacky-g';
import { PRIJIMACKY_TEST_SOLUTIONS_H } from './cermat/solutionsPrijimacky-h';
import { PRIJIMACKY_TEST_SOLUTIONS_I } from './cermat/solutionsPrijimacky-i';
import { PRIJIMACKY_TEST_SOLUTIONS_J } from './cermat/solutionsPrijimacky-j';
import { PRIJIMACKY_TEST_SOLUTIONS_K } from './cermat/solutionsPrijimacky-k';
import { PRIJIMACKY_TEST_SOLUTIONS_L } from './cermat/solutionsPrijimacky-l';
import { PRIJIMACKY_TEST_SOLUTIONS_M } from './cermat/solutionsPrijimacky-m';

export const CERMAT_SOLUTION_BUILDERS: [string, () => AssignmentModelSolution][] = [
  ...CERMAT_SOLUTIONS_2026,
  ...CERMAT_SOLUTIONS_2025,
  ...CERMAT_SOLUTIONS_2024,
  ...CERMAT_SOLUTIONS_2023,
  ...CERMAT_SOLUTIONS_2022,
  ...CERMAT_SOLUTIONS_2020_2021,
  ...CERMAT_SOLUTIONS_2018_2019,
  ...CERMAT_SOLUTIONS_2015_2017,
  // Úkoly 9. ročníku ve stylu CERMAT.
  ...GRADE9_STYLE_SOLUTIONS_A,
  ...GRADE9_STYLE_SOLUTIONS_B,
  ...GRADE9_STYLE_SOLUTIONS_C,
  ...GRADE9_STYLE_SOLUTIONS_D,
  // Rýsovací úlohy vlastních testů aplikace Přijímací zkoušky (v knihovně úkolů nejsou).
  ...PRIJIMACKY_TEST_SOLUTIONS_A,
  ...PRIJIMACKY_TEST_SOLUTIONS_B,
  ...PRIJIMACKY_TEST_SOLUTIONS_C,
  ...PRIJIMACKY_TEST_SOLUTIONS_D,
  ...PRIJIMACKY_TEST_SOLUTIONS_E,
  ...PRIJIMACKY_TEST_SOLUTIONS_F,
  ...PRIJIMACKY_TEST_SOLUTIONS_G,
  ...PRIJIMACKY_TEST_SOLUTIONS_H,
  ...PRIJIMACKY_TEST_SOLUTIONS_I,
  ...PRIJIMACKY_TEST_SOLUTIONS_J,
  ...PRIJIMACKY_TEST_SOLUTIONS_K,
  ...PRIJIMACKY_TEST_SOLUTIONS_L,
  ...PRIJIMACKY_TEST_SOLUTIONS_M,
];
