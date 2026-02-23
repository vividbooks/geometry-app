import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas3DViewer } from './Canvas3DViewer';
import { ObjectControls } from './ObjectControls';
import { ArrowLeft, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getObjectDef } from '../../data/objects';
import { getWireframeDimensions } from '../geometry/wireframeDimensions';
import type { FaceData } from '../geometry/shared';

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
}

export function ObjectPage() {
  const { objectId } = useParams<{ objectId: string }>();
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const isDesktop = !isMobile;

  const def = getObjectDef(objectId || '');

  // Build param state from defaults
  const [params, setParams] = useState<Record<string, number>>(() => {
    if (!def) return {};
    const p: Record<string, number> = {};
    for (const d of def.parameterDefs) p[d.id] = d.defaultValue;
    return p;
  });

  const [unfoldProgress, setUnfoldProgress] = useState(0);
  const [isWireframe, setIsWireframe] = useState(false);

  // Reset when object changes
  useEffect(() => {
    if (!def) return;
    const p: Record<string, number> = {};
    for (const d of def.parameterDefs) p[d.id] = d.defaultValue;
    setParams(p);
    setUnfoldProgress(0);
    setIsWireframe(false);
  }, [objectId]);

  const handleParamChange = useCallback((id: string, value: number) => {
    setParams((prev) => ({ ...prev, [id]: value }));
  }, []);

  // Memoize computeFaces so Canvas3DViewer doesn't re-create every render
  const computeFaces = useCallback(
    (progress: number): FaceData[] => {
      if (!def) return [];
      return def.computeFaces(params, progress);
    },
    [def, params]
  );

  if (!def) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#EFF1F8' }}>
        <div className="text-center">
          <p className="text-slate-600 text-lg mb-4">Těleso "{objectId}" nebylo nalezeno.</p>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="h-4 w-4" /> Zpět na rozcestník
          </button>
        </div>
      </div>
    );
  }

  const mathProperties = def.computeProperties(params);

  const sidebarWidth = isDesktop ? 320 : 280;
  const gap = isMobile ? 8 : 16;
  const marginFromEdge = isMobile ? 8 : 16;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        padding: isMobile ? `${marginFromEdge}px ${marginFromEdge}px ${marginFromEdge}px ${marginFromEdge}px` : 0,
      }}
    >
      {/* Levý panel – bílá lišta s odsazením od kraje */}
      <div
        style={{
          ...(isMobile
            ? {
                position: 'relative',
                width: '100%',
                height: '40%',
                minHeight: 0,
              }
            : {
                position: 'absolute',
                top: 0,
                left: marginFromEdge,
                bottom: 0,
                width: sidebarWidth,
              }),
          background: '#ffffff',
          boxShadow: 'none',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: '12px 12px 0 0',
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
          style={{
            flexShrink: 0,
            width: 40,
            height: 40,
            margin: isMobile ? 8 : 12,
            borderRadius: '50%',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
          }}
          title="Zpět na rozcestník"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <div style={{ flex: 1, overflowY: 'auto', padding: `0 ${isMobile ? 8 : 12}px ${isMobile ? 8 : 12}px` }}>
          <ObjectControls
            objectId={objectId}
            objectName={def.name}
            shapeBadge={def.badge}
            params={params}
            parameterDefs={def.parameterDefs}
            onParamChange={handleParamChange}
            unfoldProgress={unfoldProgress}
            onUnfoldProgressChange={setUnfoldProgress}
            isWireframe={isWireframe}
            onWireframeToggle={setIsWireframe}
            hasUnfold={def.hasUnfold}
            mathProperties={mathProperties}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0, margin: `0 ${isMobile ? 8 : 12}px ${isMobile ? 8 : 12}px` }}>
          {(['objem', 'povrch'] as const).map((taskType) => (
            <Link
              key={taskType}
              to={`/cviceni/${objectId}/${taskType}`}
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '11px 14px',
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                background: '#fff',
                transition: 'all 200ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = taskType === 'objem' ? '#4d49f3' : '#0ea5e9'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                padding: '4px 10px', borderRadius: 9999, fontSize: '12px', fontWeight: 600,
                background: taskType === 'objem' ? '#4d49f3' : '#0ea5e9', color: '#fff', flexShrink: 0,
              }}>
                {taskType === 'objem' ? 'Objem' : 'Povrch'}
              </span>
              <span style={{ flex: 1, fontSize: '0.875rem', fontWeight: 400, color: '#334155' }}>
                Cvičení
              </span>
              <Calculator size={14} style={{ color: '#94a3b8', flexShrink: 0 }} />
            </Link>
          ))}
        </div>
      </div>

      {/* Pravá oblast – zaoblená světle modrá plocha pro 3D náhled */}
      <div
        style={{
          ...(isMobile
            ? {
                position: 'relative',
                width: '100%',
                flex: 1,
                minHeight: 0,
                marginTop: gap,
              }
            : {
                position: 'absolute',
                top: gap,
                left: marginFromEdge + sidebarWidth + gap,
                right: gap,
                bottom: gap,
              }),
          borderRadius: 16,
          background: '#E0E7FF',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <Canvas3DViewer
          computeFaces={computeFaces}
          unfoldProgress={unfoldProgress}
          isWireframe={isWireframe}
          offsetCenterX={0}
          backgroundColor="#E0E7FF"
          wireframeDimensions={objectId ? getWireframeDimensions(objectId, params) : undefined}
        />
      </div>
    </div>
  );
}
