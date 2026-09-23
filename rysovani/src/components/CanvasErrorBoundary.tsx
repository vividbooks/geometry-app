import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Návrat do menu — po chybě je to jediná jistá cesta ven. */
  onBack?: () => void;
}

interface State {
  error: Error | null;
  /** Nejbližší komponenta z React stacku — z fotky učitele pozná, kde to spadlo. */
  where: string;
}

/**
 * Bez tohohle záchytného bodu sebrala jedna výjimka v plátně celou stránku:
 * učitel zůstal na bílém okně bez bočního panelu a ani tlačítko zpět
 * nepomohlo (React odmountoval celý strom). Teď zůstane obrazovka, ze které
 * se dá vrátit do menu nebo nástroj zkusit znovu.
 */
export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { error: null, where: '' };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Rýsování] Plátno spadlo:', error, info.componentStack);
    const where = String(info.componentStack || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 3)
      .join(' ← ');
    this.setState({ where });
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h2 className="text-gray-800 text-xl font-bold mb-2">Nástroj se zasekl</h2>
          <p className="text-gray-500 mb-6">
            Rýsování přerušila chyba. Zkuste to prosím znovu — rozdělaná konstrukce
            se bohužel nezachová.
          </p>
          {/* Chybu u sebe nevyvoláme — učitel nám posílá fotku obrazovky,
              tak ať na ní je, co přesně spadlo. */}
          <p className="mb-6 break-words font-mono text-[11px] leading-snug text-gray-400 select-all">
            {error.name}: {error.message}
            {this.state.where ? ` — ${this.state.where}` : ''}
            {typeof navigator !== 'undefined' ? ` — ${navigator.userAgent}` : ''}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => this.setState({ error: null, where: '' })}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all"
            >
              Zkusit znovu
            </button>
            {this.props.onBack && (
              <button
                onClick={() => {
                  this.setState({ error: null, where: '' });
                  this.props.onBack?.();
                }}
                className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-all"
              >
                Zpět do menu
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
