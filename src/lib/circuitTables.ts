/**
 * Geometrie online – vlastní tabulky v Supabase (viz supabase/geometry_circuit_schema.sql).
 * Oddělené od Elobvodu (`circuit_assignments` / `circuit_submissions`) i od LMS `assignments`.
 */
export const CIRCUIT_ASSIGNMENTS_TABLE = 'geometry_circuit_assignments' as const;
export const CIRCUIT_SUBMISSIONS_TABLE = 'geometry_circuit_submissions' as const;
