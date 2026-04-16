import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Routes, Route, useParams } from 'react-router-dom';
import { Crossroads } from './components/landing/Crossroads';
import { Landing } from './components/landing/Landing';
import { CviceniSetupPage } from './components/landing/CviceniSetupPage';
import { ObjectPage } from './components/viewer/ObjectPage';
import { ObjectExercisePage } from './components/viewer/ObjectExercisePage';
import { FlatObjectPage } from './components/viewer/FlatObjectPage';
import { RysovaniPage } from './components/rysovani/RysovaniPage';
import { TutorialPage } from './components/tutorial/TutorialPage';
import { getObjectDef } from './data/objects';
import { AuthGate } from './components/auth/AuthGate';
import { Toaster } from './components/ui/sonner';

const StudentAssignmentPage = lazy(() => import('./app/pages/StudentAssignmentPage'));
const SubmissionViewPage = lazy(() => import('./app/pages/SubmissionViewPage'));

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center text-zinc-500 text-sm">
      Načítám…
    </div>
  );
}

/** Wrapper that routes to 3D or 2D page */
function SmartObjectPage() {
  const { objectId } = useParams<{ objectId: string }>();
  const def = getObjectDef(objectId || '');
  if (def?.is2D) return <FlatObjectPage />;
  return <ObjectPage />;
}

export default function App() {
  const routerBase = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <AuthGate>
      <Toaster position="bottom-center" />
      <BrowserRouter basename={routerBase}>
        <Routes>
          <Route path="/" element={<Crossroads />} />
          <Route path="/menu-rysovani" element={<Landing mode="rysovani-app" />} />
          <Route path="/menu-telesa" element={<Landing mode="telesa-app" />} />
          <Route path="/rysovani-app" element={<Navigate to="/menu-rysovani" replace />} />
          <Route path="/telesa-app" element={<Navigate to="/menu-telesa" replace />} />
          <Route path="/rysovani" element={<RysovaniPage />} />
          <Route path="/tutorial/:tutorialId" element={<TutorialPage />} />
          <Route
            path="/ukol/:assignmentId"
            element={
              <Suspense fallback={<RouteFallback />}>
                <StudentAssignmentPage />
              </Suspense>
            }
          />
          <Route
            path="/odpoved/:submissionId"
            element={
              <Suspense fallback={<RouteFallback />}>
                <SubmissionViewPage />
              </Suspense>
            }
          />
          <Route path="/cviceni" element={<Navigate to="/menu-telesa?tab=cviceni" replace />} />
          <Route path="/cviceni/:objectId/:taskType" element={<CviceniSetupPage />} />
          <Route path="/:objectId/cviceni/:taskType" element={<ObjectExercisePage />} />
          <Route path="/:objectId" element={<SmartObjectPage />} />
        </Routes>
      </BrowserRouter>
    </AuthGate>
  );
}
