import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { Landing } from './components/landing/Landing';
import { CviceniPage } from './components/landing/CviceniPage';
import { CviceniSetupPage } from './components/landing/CviceniSetupPage';
import { ObjectPage } from './components/viewer/ObjectPage';
import { ObjectExercisePage } from './components/viewer/ObjectExercisePage';
import { FlatObjectPage } from './components/viewer/FlatObjectPage';
import { RysovaniPage } from './components/rysovani/RysovaniPage';
import { getObjectDef } from './data/objects';

/** Wrapper that routes to 3D or 2D page */
function SmartObjectPage() {
  const { objectId } = useParams<{ objectId: string }>();
  const def = getObjectDef(objectId || '');
  if (def?.is2D) return <FlatObjectPage />;
  return <ObjectPage />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/rysovani" element={<RysovaniPage />} />
        <Route path="/cviceni" element={<CviceniPage />} />
        <Route path="/cviceni/:objectId/:taskType" element={<CviceniSetupPage />} />
        <Route path="/:objectId/cviceni/:taskType" element={<ObjectExercisePage />} />
        <Route path="/:objectId" element={<SmartObjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}
