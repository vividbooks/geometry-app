import { useState, useEffect, lazy, Suspense } from 'react';
import { GeometryMenu } from './components/GeometryMenu';
import { projectId, publicAnonKey } from './utils/supabase/info';

// Lazy load těžké komponenty pro lepší performance na starších zařízeních
const BisectorConstruction = lazy(() => import('./components/BisectorConstruction').then(m => ({ default: m.BisectorConstruction })));
const TriangleConstruction = lazy(() => import('./components/TriangleConstruction').then(m => ({ default: m.TriangleConstruction })));
const InteractiveTriangleConstruction = lazy(() => import('./components/InteractiveTriangleConstruction').then(m => ({ default: m.InteractiveTriangleConstruction })));
const AngleTriangleConstruction = lazy(() => import('./components/AngleTriangleConstruction').then(m => ({ default: m.AngleTriangleConstruction })));
const AxialSymmetryConstruction = lazy(() => import('./components/AxialSymmetryConstruction').then(m => ({ default: m.AxialSymmetryConstruction })));
const FreeGeometryEditor = lazy(() => import('./components/FreeGeometryEditor').then(m => ({ default: m.FreeGeometryEditor })));

type View = 'menu' | 'bisector' | 'triangle' | 'custom-triangle' | 'interactive-triangle' | 'angle-triangle' | 'axial-symmetry' | 'free-editor-board' | 'free-editor-computer' | 'shared-recording';

interface SharedRecording {
  id: string;
  name: string;
  deviceType: 'board' | 'computer';
  steps: any[];
}

export default function App() {
  const [view, setView] = useState<View>('menu');
  const [darkMode, setDarkMode] = useState(false);
  const [sharedRecording, setSharedRecording] = useState<SharedRecording | null>(null);
  const [loadingRecording, setLoadingRecording] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Check URL for ?view=X or ?recording=ID on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // ?view= auto-navigates to a specific view (used by the main landing page)
    const viewParam = params.get('view');
    const validViews: View[] = [
      'bisector', 'triangle', 'custom-triangle', 'interactive-triangle',
      'angle-triangle', 'axial-symmetry', 'free-editor-board', 'free-editor-computer',
    ];
    if (viewParam && validViews.includes(viewParam as View)) {
      setView(viewParam as View);
      return;
    }

    const recordingId = params.get('recording');
    if (recordingId) {
      loadSharedRecording(recordingId);
    }
  }, []);

  const loadSharedRecording = async (id: string) => {
    setLoadingRecording(true);
    setLoadError(null);
    try {
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b149bbbb/recordings/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          }
        }
      );
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Recording not found (${res.status})`);
      }
      const data = await res.json();
      setSharedRecording({
        id: data.id,
        name: data.name,
        deviceType: data.deviceType || 'computer',
        steps: data.steps
      });
      setView('shared-recording');
    } catch (e: any) {
      console.error('Failed to load shared recording:', e);
      setLoadError(e.message || 'Failed to load recording');
    } finally {
      setLoadingRecording(false);
    }
  };

  const handleBackFromShared = () => {
    // Clear URL param
    const url = new URL(window.location.href);
    url.searchParams.delete('recording');
    window.history.replaceState({}, '', url.toString());
    setSharedRecording(null);
    setView('menu');
  };

  // Loading screen for shared recording
  if (loadingRecording) {
    return (
      <div className="min-h-screen bg-[#1a1b26] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-[#565f89]" />
            <div className="absolute inset-0 rounded-full border-4 border-t-[#7aa2f7] animate-spin" />
          </div>
          <p className="text-[#c0caf5] text-lg font-medium">Nacitam zaznam...</p>
        </div>
      </div>
    );
  }

  // Error screen
  if (loadError) {
    return (
      <div className="min-h-screen bg-[#1a1b26] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-[#c0caf5] text-xl font-bold mb-2">Zaznam nenalezen</h2>
          <p className="text-[#565f89] mb-6">{loadError}</p>
          <button
            onClick={() => {
              setLoadError(null);
              handleBackFromShared();
            }}
            className="px-6 py-3 rounded-xl bg-[#7aa2f7] text-white font-bold hover:bg-[#7aa2f7]/80 transition-all"
          >
            Zpet do menu
          </button>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (view) {
      case 'menu':
        return <GeometryMenu onSelect={setView} darkMode={darkMode} onDarkModeChange={setDarkMode} />;
      case 'bisector':
        return <Suspense fallback={<div>Loading...</div>}>
          <BisectorConstruction onBack={() => setView('menu')} darkMode={darkMode} onDarkModeChange={setDarkMode} />
        </Suspense>;
      case 'triangle':
        return <Suspense fallback={<div>Loading...</div>}>
          <TriangleConstruction onBack={() => setView('menu')} darkMode={darkMode} onDarkModeChange={setDarkMode} />
        </Suspense>;
      case 'interactive-triangle':
        return <Suspense fallback={<div>Loading...</div>}>
          <InteractiveTriangleConstruction onBack={() => setView('menu')} darkMode={darkMode} onDarkModeChange={setDarkMode} />
        </Suspense>;
      case 'angle-triangle':
        return <Suspense fallback={<div>Loading...</div>}>
          <AngleTriangleConstruction onBack={() => setView('menu')} darkMode={darkMode} onDarkModeChange={setDarkMode} />
        </Suspense>;
      case 'axial-symmetry':
        return <Suspense fallback={<div>Loading...</div>}>
          <AxialSymmetryConstruction onBack={() => setView('menu')} darkMode={darkMode} onDarkModeChange={setDarkMode} />
        </Suspense>;
      case 'custom-triangle':
        return <Suspense fallback={<div>Loading...</div>}>
          <InteractiveTriangleConstruction onBack={() => setView('menu')} darkMode={darkMode} onDarkModeChange={setDarkMode} />
        </Suspense>;
      case 'free-editor-board':
        return <Suspense fallback={<div>Loading...</div>}>
          <FreeGeometryEditor onBack={() => setView('menu')} darkMode={darkMode} onDarkModeChange={setDarkMode} deviceType="board" />
        </Suspense>;
      case 'free-editor-computer':
        return <Suspense fallback={<div>Loading...</div>}>
          <FreeGeometryEditor onBack={() => setView('menu')} darkMode={darkMode} onDarkModeChange={setDarkMode} deviceType="computer" />
        </Suspense>;
      case 'shared-recording':
        return sharedRecording ? (
          <Suspense fallback={<div>Loading...</div>}>
            <FreeGeometryEditor
              onBack={handleBackFromShared}
              darkMode={darkMode}
              onDarkModeChange={setDarkMode}
              deviceType={sharedRecording.deviceType}
              sharedRecording={{
                name: sharedRecording.name,
                steps: sharedRecording.steps
              }}
            />
          </Suspense>
        ) : (
          <GeometryMenu onSelect={setView} darkMode={darkMode} onDarkModeChange={setDarkMode} />
        );
      default:
        return <GeometryMenu onSelect={setView} darkMode={darkMode} onDarkModeChange={setDarkMode} />;
    }
  };

  return <>{renderView()}</>;
}