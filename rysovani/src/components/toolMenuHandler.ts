// Helper for handling tool menu clicks
export const handleToolMenuClick = (
  toolId: string,
  setCircleInput: (fn: (prev: any) => any) => void,
  setActiveTool: (tool: any) => void,
  setSelectedPointId: (id: string | null) => void,
  setActiveGroup: (id: string | null) => void,
  setSegmentInput?: (fn: (prev: any) => any) => void,
  setPerpTabletState?: (fn: (prev: any) => any) => void,
  isTabletMode?: boolean,
  setCircleTabletState?: (state: any) => void
) => {
  if (toolId.startsWith('__popup__')) {
    // Special popup triggers
    if (toolId === '__popup__circle_fixed') {
      setCircleInput(prev => ({
        ...prev,
        visible: true,
        fixedRadius: true,
        center: null,
        isDraggingCenter: false,
        isDraggingHandle: false,
        mode: 'circle',
      }));
      // Reset tablet circle state to avoid conflicts
      if (setCircleTabletState) {
        setCircleTabletState({ active: false, centerId: null, center: null, radius: 150, isDraggingHandle: false, handlePos: null });
      }
    } else if (toolId === '__popup__segment_fixed') {
      if (setSegmentInput) {
        setSegmentInput(prev => ({ ...prev, visible: true }));
      }
    }
  } else {
    setActiveTool(toolId);

    // Circle tool: always show compass immediately (no "pick center first" step).
    if (toolId === 'circle') {
      setCircleInput(prev => ({
        ...prev,
        visible: true,
        fixedRadius: false,
        center: null,
        isDraggingCenter: false,
        isDraggingHandle: false,
        mode: 'circle',
        freeDrawMode: 'idle',
        arcDraw: null,
        arcCrosshair: null,
      }));
    } else {
      // Leaving the circle tool: hide compass UI so it doesn't intercept clicks.
      setCircleInput(prev => ({
        ...prev,
        visible: false,
        fixedRadius: false,
        center: null,
        isDraggingCenter: false,
        isDraggingHandle: false,
        freeDrawMode: 'idle',
        arcDraw: null,
        arcCrosshair: null,
      }));
    }
    
    // Reset perpTabletState when switching tools
    if (setPerpTabletState) {
      setPerpTabletState({ step: 'idle', selectedLineId: null, currentPos: null });
    }
    
    // Reset circleTabletState when switching tools
    if (setCircleTabletState) {
      setCircleTabletState({ active: false, centerId: null, center: null, radius: 150, isDraggingHandle: false, handlePos: null });
    }
    
    // If switching to perpendicular in tablet mode, activate selectLine step
    if (toolId === 'perpendicular' && isTabletMode) {
      if (setPerpTabletState) {
        setPerpTabletState({ step: 'selectLine', selectedLineId: null, currentPos: null });
      }
    }
  }
  setSelectedPointId(null);
  setActiveGroup(null);
};