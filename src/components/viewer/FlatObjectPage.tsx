import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calculator } from 'lucide-react';
import { getObjectDef } from '../../data/objects';
import { Flat2DViewer } from './Flat2DViewer';
import { ObjectControls } from './ObjectControls';

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
}

const TRIANGLE_PRESETS: { label: string; params: Record<string, number> }[] = [
  { label: 'Rovnostranný', params: { a: 7, b: 7, c: 7 } },
  { label: 'Pravoúhlý',    params: { a: 5, b: 3, c: 4 } },
  { label: 'Rovnoramenný', params: { a: 6, b: 6, c: 8 } },
  { label: 'Ostroúhlý',    params: { a: 6, b: 7, c: 8 } },
  { label: 'Tupoúhlý',     params: { a: 9, b: 4, c: 8 } },
  { label: 'Obecný',       params: { a: 8, b: 6, c: 7 } },
];

function TriangleExtras({
  params,
  onPreset,
}: {
  params: Record<string, number>;
  onPreset: (p: Record<string, number>) => void;
}) {
  const a = params.a ?? 7;
  const b = params.b ?? 6;
  const c = params.c ?? 5;
  const valid = a + b > c && a + c > b && b + c > a;

  return (
    <div style={{ marginTop: 16 }}>
      {!valid && (
        <div style={{
          padding: '10px 12px',
          background: '#fef2f2',
          border: '1px solid #fca5a5',
          borderRadius: 10,
          color: '#dc2626',
          fontSize: 13,
          marginBottom: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span>⚠️</span>
          <span>Tyto strany nedávají dohromady trojúhelník.</span>
        </div>
      )}
      <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        Typy trojúhelníku
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {TRIANGLE_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => onPreset(preset.params)}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              background: '#f8fafc',
              color: '#334155',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 150ms',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#eef2ff';
              e.currentTarget.style.borderColor = '#4d49f3';
              e.currentTarget.style.color = '#4d49f3';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.color = '#334155';
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function FlatObjectPage() {
  const { objectId } = useParams<{ objectId: string }>();
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= 900;
  const isMobile = windowWidth < 768;
  const def = getObjectDef(objectId || '');

  const [params, setParams] = useState<Record<string, number>>(() => {
    if (!def) return {};
    const p: Record<string, number> = {};
    for (const d of def.parameterDefs) p[d.id] = d.defaultValue;
    return p;
  });

  useEffect(() => {
    if (!def) return;
    const p: Record<string, number> = {};
    for (const d of def.parameterDefs) p[d.id] = d.defaultValue;
    setParams(p);
  }, [objectId]);

  const handleParamChange = useCallback((id: string, value: number) => {
    setParams((prev) => ({ ...prev, [id]: value }));
  }, []);

  if (!def || !def.is2D || !def.computeVertices2D) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#EFF1F8' }}>
        <div className="text-center">
          <p className="text-slate-600 text-lg mb-4">Útvar „{objectId}" nebyl nalezen.</p>
          <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline flex items-center gap-2 mx-auto">
            <ArrowLeft className="h-4 w-4" /> Zpět
          </button>
        </div>
      </div>
    );
  }

  const mathProperties = def.computeProperties(params);
  const vertices = def.computeVertices2D(params);
  const isCircle = objectId === 'kruh2d';
  const isTriangle = objectId === 'trojuhelnik';
  const isRhombus = objectId === 'kosoctverec';
  const rhombusInvalid = isRhombus && (params.va ?? 0) >= (params.a ?? 0);
  const isParallelogram = objectId === 'kosodelnik';
  const parallelogramInvalid = isParallelogram && (params.va ?? 0) >= (params.b ?? 0);

  const sidebarWidth = isDesktop ? 320 : 280;
  const gap = 16;
  const marginFromEdge = isMobile ? 8 : 16;

  const exerciseLinks = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0, margin: '0 12px 12px' }}>
      {(['obvod', 'obsah'] as const).map((taskType) => (
        <Link
          key={taskType}
          to={`/cviceni/${objectId}/${taskType}`}
          style={{
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10,
            padding: '11px 14px', borderRadius: 12, border: '1px solid #e2e8f0',
            background: '#fff', transition: 'all 200ms',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#4d49f3'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            padding: '4px 10px', borderRadius: 9999, fontSize: '12px', fontWeight: 600,
            background: '#4d49f3', color: '#fff', flexShrink: 0,
          }}>
            {taskType === 'obvod' ? 'Obvod' : 'Obsah'}
          </span>
          <span style={{ flex: 1, fontSize: '0.875rem', fontWeight: 400, color: '#334155' }}>
            Cvičení
          </span>
          <Calculator size={14} style={{ color: '#94a3b8', flexShrink: 0 }} />
        </Link>
      ))}
    </div>
  );

  if (isMobile) {
    return (
      <div style={{ position: 'fixed', inset: 0, backgroundColor: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            width: '100%',
            maxHeight: '40vh',
            background: '#ffffff',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: '12px 12px 0 0',
            margin: `${marginFromEdge}px ${marginFromEdge}px 0 ${marginFromEdge}px`,
          }}
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
            style={{ flexShrink: 0, width: 40, height: 40, margin: 12, borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0' }}
            title="Zpět"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 12px' }}>
            <ObjectControls
              objectId={objectId}
              objectName={def.name}
              shapeBadge={def.badge}
              params={params}
              parameterDefs={def.parameterDefs}
              onParamChange={handleParamChange}
              unfoldProgress={0}
              onUnfoldProgressChange={() => {}}
              isWireframe={false}
              onWireframeToggle={() => {}}
              hasUnfold={false}
              mathProperties={mathProperties}
              is2D={true}
            />
            {isTriangle && <TriangleExtras params={params} onPreset={setParams} />}
            {rhombusInvalid && (
              <div style={{
                marginTop: 12, padding: '10px 12px', background: '#fef2f2',
                border: '1px solid #fca5a5', borderRadius: 10, color: '#dc2626',
                fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span>⚠️</span>
                <span>Výška nemůže být větší než délka strany.</span>
              </div>
            )}
            {parallelogramInvalid && (
              <div style={{
                marginTop: 12, padding: '10px 12px', background: '#fef2f2',
                border: '1px solid #fca5a5', borderRadius: 10, color: '#dc2626',
                fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span>⚠️</span>
                <span>Výška nemůže být větší nebo rovna délce strany b.</span>
              </div>
            )}
          </div>
          {exerciseLinks}
        </div>

        <div
          style={{
            flex: 1,
            margin: `${gap}px ${marginFromEdge}px ${marginFromEdge}px ${marginFromEdge}px`,
            borderRadius: 16,
            background: '#E0E7FF',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <Flat2DViewer
            vertices={vertices}
            params={params}
            paramIds={def.parameterDefs.map((d) => d.id)}
            fillColor={def.color}
            backgroundColor="#E0E7FF"
            isCircle={isCircle}
          />
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: '#fff', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: marginFromEdge,
          bottom: 0,
          width: sidebarWidth,
          background: '#ffffff',
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
          style={{ flexShrink: 0, width: 40, height: 40, margin: 12, borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0' }}
          title="Zpět"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 12px' }}>
          <ObjectControls
            objectId={objectId}
            objectName={def.name}
            shapeBadge={def.badge}
            params={params}
            parameterDefs={def.parameterDefs}
            onParamChange={handleParamChange}
            unfoldProgress={0}
            onUnfoldProgressChange={() => {}}
            isWireframe={false}
            onWireframeToggle={() => {}}
            hasUnfold={false}
            mathProperties={mathProperties}
            is2D={true}
          />
          {isTriangle && <TriangleExtras params={params} onPreset={setParams} />}
          {rhombusInvalid && (
            <div style={{
              marginTop: 12, padding: '10px 12px', background: '#fef2f2',
              border: '1px solid #fca5a5', borderRadius: 10, color: '#dc2626',
              fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span>⚠️</span>
              <span>Výška nemůže být větší než délka strany.</span>
            </div>
          )}
          {parallelogramInvalid && (
            <div style={{
              marginTop: 12, padding: '10px 12px', background: '#fef2f2',
              border: '1px solid #fca5a5', borderRadius: 10, color: '#dc2626',
              fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span>⚠️</span>
              <span>Výška nemůže být větší nebo rovna délce strany b.</span>
            </div>
          )}
        </div>
        {exerciseLinks}
      </div>

      <div
        style={{
          position: 'absolute',
          top: gap,
          left: marginFromEdge + sidebarWidth + gap,
          right: gap,
          bottom: gap,
          borderRadius: 16,
          background: '#E0E7FF',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <Flat2DViewer
          vertices={vertices}
          params={params}
          paramIds={def.parameterDefs.map((d) => d.id)}
          fillColor={def.color}
          backgroundColor="#E0E7FF"
          isCircle={isCircle}
        />
      </div>
    </div>
  );
}
