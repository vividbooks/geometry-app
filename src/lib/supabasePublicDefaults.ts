/**
 * Výchozí připojení ke stejnému Supabase projektu jako aplikace Elobvod (vividbooks/elobvod).
 * Úkoly v této aplikaci čtou a zapisují tabulky `geometry_circuit_assignments` a `geometry_circuit_submissions` (viz supabase/geometry_circuit_schema.sql).
 * Anon klíč je veřejný – přístup řídí RLS v databázi.
 *
 * Přepsání jen pokud nechceš sdílet DB s Elobvodem: VITE_SUPABASE_URL a VITE_SUPABASE_ANON_KEY v .env.
 */
export const SUPABASE_PUBLIC_URL = 'https://jjpiguuubvmiobmixwgh.supabase.co';

export const SUPABASE_PUBLIC_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqcGlndXV1YnZtaW9ibWl4d2doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzODIxNjksImV4cCI6MjA3MTk1ODE2OX0.0gn-vUWjEv9wVuoBblTgJ7JW9z65yrYaOTROCPoykHo';
