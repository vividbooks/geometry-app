import React, { useState, useEffect } from 'react';
import { Prism3D } from './Prism3D';
import { MathControls } from './MathControls';

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
}

export function MathEducationApp() {
  const [sides, setSides] = useState(6);
  const [height, setHeight] = useState(15); // 15 cm
  const [edgeLength, setEdgeLength] = useState(8); // 8 cm délka hrany
  const [unfoldProgress, setUnfoldProgress] = useState(0); // 0.0 = 3D, 1.0 = plochá síť
  const [isWireframe, setIsWireframe] = useState(false);
  const windowWidth = useWindowWidth();

  const handleReset = () => {
    setSides(6);
    setHeight(15);
    setEdgeLength(8);
    setUnfoldProgress(0);
    setIsWireframe(false);
  };

  const isDesktop = windowWidth >= 900;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EFF1F8' }}>
      <div className="max-w-7xl mx-auto p-6">
        <div className={`${isDesktop ? 'flex-row' : 'flex-col'} flex gap-6 h-screen`}>
          {/* 3D Viewer - Takes remaining space, always first */}
          <div className={`${isDesktop ? 'flex-1' : 'w-full flex-1'} h-full min-h-96 order-1`}>
            <Prism3D
              sides={sides}
              height={height}
              edgeLength={edgeLength}
              unfoldProgress={unfoldProgress}
              isWireframe={isWireframe}
            />
          </div>

          {/* Controls - Right on desktop (900px+), bottom on mobile */}
          <div className={`${isDesktop ? 'w-80' : 'w-full'} ${isDesktop ? 'h-full' : 'h-auto'} overflow-y-auto flex-shrink-0 order-2`}>
            <MathControls
              sides={sides}
              height={height}
              edgeLength={edgeLength}
              unfoldProgress={unfoldProgress}
              isWireframe={isWireframe}
              onSidesChange={setSides}
              onHeightChange={setHeight}
              onEdgeLengthChange={setEdgeLength}
              onUnfoldProgressChange={setUnfoldProgress}
              onWireframeToggle={setIsWireframe}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>
    </div>
  );
}