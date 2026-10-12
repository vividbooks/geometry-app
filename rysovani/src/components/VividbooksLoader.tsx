import loadingGif from '../assets/vividbooks-loading.gif';

/**
 * Načítací obrazovka jako ve Vividbooks Ultra (LoadingScreen: „kuličky“ loading-new.gif na bílé).
 * V tmavém režimu tmavé pozadí; GIF má průhledné pozadí.
 */
export function VividbooksLoader({ darkMode = false, label = 'Načítání' }: { darkMode?: boolean; label?: string }) {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center"
      style={{ background: darkMode ? '#1a1b26' : '#ffffff' }}
      role="status"
      aria-live="polite"
    >
      <img src={loadingGif} alt={label} className="h-24 w-auto" />
    </div>
  );
}
