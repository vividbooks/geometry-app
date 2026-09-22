import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Návrat do menu — po chybě je to jediná jistá cesta ven. */
  onBack?: () => void;
}

interface State {
  error: Error | null;
}

/**
 * Bez tohohle záchytného bodu sebrala jedna výjimka v plátně celou stránku:
 * učitel zůstal na bílém okně bez bočního panelu a ani tlačítko zpět
 * nepomohlo (React odmountoval celý strom). Teď zůstane obrazovka, ze které
 * se dá vrátit do menu nebo nástroj zkusit znovu.
 */
export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Rýsování] Plátno spadlo:', error, info.componentStack);
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
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => this.setState({ error: null })}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all"
            >
              Zkusit znovu
            </button>
            {this.props.onBack && (
              <button
                onClick={() => {
                  this.setState({ error: null });
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
