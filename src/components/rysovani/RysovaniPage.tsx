import { useState, useEffect, lazy, Suspense } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// Import rysovani CSS (Tailwind utility classes used by rysovani components)
import '../../../rysovani/src/index.css';

import { projectId, publicAnonKey } from '../../../rysovani/src/utils/supabase/info';

// Lazy load the heavy rysovani components
const BisectorConstruction = lazy(() =>
  import('../../../rysovani/src/components/BisectorConstruction').then((m) => ({
    default: m.BisectorConstruction,
  }))
);
const TriangleConstruction = lazy(() =>
  import('../../../rysovani/src/components/TriangleConstruction').then((m) => ({
    default: m.TriangleConstruction,
  }))
);
const InteractiveTriangleConstruction = lazy(() =>
  import('../../../rysovani/src/components/InteractiveTriangleConstruction').then((m) => ({
    default: m.InteractiveTriangleConstruction,
  }))
);
const AngleTriangleConstruction = lazy(() =>
  import('../../../rysovani/src/components/AngleTriangleConstruction').then((m) => ({
    default: m.AngleTriangleConstruction,
  }))
);
const AxialSymmetryConstruction = lazy(() =>
  import('../../../rysovani/src/components/AxialSymmetryConstruction').then((m) => ({
    default: m.AxialSymmetryConstruction,
  }))
);
const FreeGeometryEditor = lazy(() =>
  import('../../../rysovani/src/components/FreeGeometryEditor').then((m) => ({
    default: m.FreeGeometryEditor,
  }))
);

type RysovaniView =
  | 'menu'
  | 'bisector'
  | 'triangle'
  | 'custom-triangle'
  | 'interactive-triangle'
  | 'angle-triangle'
  | 'axial-symmetry'
  | 'free-editor-board'
  | 'free-editor-computer'
  | 'shared-recording';

interface SharedRecording {
  id: string;
  name: string;
  deviceType: 'board' | 'computer';
  steps: any[];
}

const VALID_VIEWS: RysovaniView[] = [
  'bisector',
  'triangle',
  'custom-triangle',
  'interactive-triangle',
  'angle-triangle',
  'axial-symmetry',
  'free-editor-board',
  'free-editor-computer',
];

export function RysovaniPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const viewParam = searchParams.get('view');
  const recordingParam = searchParams.get('recording');
  const initialView: RysovaniView =
    viewParam && VALID_VIEWS.includes(viewParam as RysovaniView)
      ? (viewParam as RysovaniView)
      : 'menu';

  const [view, setView] = useState<RysovaniView>(initialView);

  // If no valid view and no recording, redirect to main landing page
  useEffect(() => {
    if (view === 'menu' && !recordingParam) {
      navigate('/?tab=rysovani', { replace: true });
    }
  }, [view, recordingParam, navigate]);
  const [darkMode, setDarkMode] = useState(false);
  const [sharedRecording, setSharedRecording] = useState<SharedRecording | null>(null);
  const [loadingRecording, setLoadingRecording] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Check URL for ?recording=ID on mount
  useEffect(() => {
    const recordingId = searchParams.get('recording');
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
        { headers: { Authorization: `Bearer ${publicAnonKey}` } }
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
        steps: data.steps,
      });
      setView('shared-recording');
    } catch (e: any) {
      console.error('Failed to load shared recording:', e);
      setLoadError(e.message || 'Failed to load recording');
    } finally {
      setLoadingRecording(false);
    }
  };

  const CONSTRUCTION_VIEWS: RysovaniView[] = ['bisector', 'triangle', 'custom-triangle', 'interactive-triangle', 'angle-triangle', 'axial-symmetry'];

  const handleBack = () => {
    // Go back to the appropriate tab on the landing page
    if (CONSTRUCTION_VIEWS.includes(view)) {
      navigate('/?tab=konstrukce');
    } else {
      navigate('/?tab=rysovani');
    }
  };

  const handleBackFromShared = () => {
    setSharedRecording(null);
    navigate('/?tab=rysovani');
  };

  // Loading screen
  if (loadingRecording) {
    return (
      <div className="min-h-screen bg-[#1a1b26] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-[#565f89]" />
            <div className="absolute inset-0 rounded-full border-4 border-t-[#7aa2f7] animate-spin" />
          </div>
          <p className="text-[#c0caf5] text-lg font-medium">Načítám záznam...</p>
        </div>
      </div>
    );
  }

  // Error screen
  if (loadError) {
    return (
      <div className="min-h-screen bg-[#1a1b26] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h2 className="text-[#c0caf5] text-xl font-bold mb-2">Záznam nenalezen</h2>
          <p className="text-[#565f89] mb-6">{loadError}</p>
          <button
            onClick={() => {
              setLoadError(null);
              handleBackFromShared();
            }}
            className="px-6 py-3 rounded-xl bg-[#7aa2f7] text-white font-bold hover:bg-[#7aa2f7]/80 transition-all"
          >
            Zpět do menu
          </button>
        </div>
      </div>
    );
  }

  const fallback = (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p style={{ color: '#4e5871' }}>Načítání...</p>
    </div>
  );

  // Wrapper that provides explicit height for components using size-full / h-full
  const fullHeightStyle: React.CSSProperties = { height: '100vh', width: '100%' };

  const renderContent = () => {
    switch (view) {
      case 'menu':
        // Redirected via useEffect above; show nothing while redirecting
        return null;
      case 'bisector':
        return (
          <Suspense fallback={fallback}>
            <BisectorConstruction onBack={handleBack} darkMode={darkMode} onDarkModeChange={setDarkMode} />
          </Suspense>
        );
      case 'triangle':
        return (
          <Suspense fallback={fallback}>
            <TriangleConstruction onBack={handleBack} darkMode={darkMode} onDarkModeChange={setDarkMode} />
          </Suspense>
        );
      case 'interactive-triangle':
      case 'custom-triangle':
        return (
          <Suspense fallback={fallback}>
            <InteractiveTriangleConstruction onBack={handleBack} darkMode={darkMode} onDarkModeChange={setDarkMode} />
          </Suspense>
        );
      case 'angle-triangle':
        return (
          <Suspense fallback={fallback}>
            <AngleTriangleConstruction onBack={handleBack} darkMode={darkMode} onDarkModeChange={setDarkMode} />
          </Suspense>
        );
      case 'axial-symmetry':
        return (
          <Suspense fallback={fallback}>
            <AxialSymmetryConstruction onBack={handleBack} darkMode={darkMode} onDarkModeChange={setDarkMode} />
          </Suspense>
        );
      case 'free-editor-board':
        return (
          <Suspense fallback={fallback}>
            <FreeGeometryEditor onBack={handleBack} darkMode={darkMode} onDarkModeChange={setDarkMode} deviceType="board" />
          </Suspense>
        );
      case 'free-editor-computer':
        return (
          <Suspense fallback={fallback}>
            <FreeGeometryEditor onBack={handleBack} darkMode={darkMode} onDarkModeChange={setDarkMode} deviceType="computer" />
          </Suspense>
        );
      case 'shared-recording':
        return sharedRecording ? (
          <Suspense fallback={fallback}>
            <FreeGeometryEditor
              onBack={handleBackFromShared}
              darkMode={darkMode}
              onDarkModeChange={setDarkMode}
              deviceType={sharedRecording.deviceType}
              sharedRecording={{
                name: sharedRecording.name,
                steps: sharedRecording.steps,
              }}
            />
          </Suspense>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div style={fullHeightStyle}>
      {renderContent()}
    </div>
  );
}
