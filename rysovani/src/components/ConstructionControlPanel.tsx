import { ChevronLeft, ChevronRight, PlayCircle, RotateCcw, Info, Sun, Moon } from 'lucide-react';
import { Slider } from './ui/slider';

interface ControlPanelProps {
  currentStep: number;
  totalSteps: number;
  scale: number;
  showCaptions: boolean;
  darkMode: boolean;
  isMobile: boolean;
  onStepChange: (step: number) => void;
  onPlayStep: () => void;
  onRestart: () => void;
  onZoomChange: (value: number[]) => void;
  onToggleCaptions: () => void;
  onToggleDarkMode: () => void;
}

export function ConstructionControlPanel({
  currentStep,
  totalSteps,
  scale,
  showCaptions,
  darkMode,
  isMobile,
  onStepChange,
  onPlayStep,
  onRestart,
  onZoomChange,
  onToggleCaptions,
  onToggleDarkMode,
}: ControlPanelProps) {
  const changeStep = (newStep: number) => {
    if (newStep >= 0 && newStep < totalSteps) {
      onStepChange(newStep);
    }
  };

  if (isMobile) {
    // Mobilní verze - vertikální layout
    return (
      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-10 rounded-xl shadow-2xl border p-2 w-[calc(100%-2rem)] max-w-sm ${
        darkMode 
          ? 'bg-[#374151] border-gray-600' 
          : 'bg-white border-border'
      }`} style={{ fontFamily: 'var(--font-family)' }}>
        <div className="flex flex-col gap-2">
          {/* První řádek - navigace */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={onPlayStep}
              className={`p-2 rounded-lg transition-colors shrink-0 ${
                darkMode 
                  ? 'bg-gray-600 hover:bg-gray-500 text-gray-100' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              style={{ fontFamily: 'var(--font-family)' }}
              title="Přehrát krok znovu"
            >
              <PlayCircle className="size-5" />
            </button>
            
            <button
              onClick={onRestart}
              className={`p-2 rounded-lg transition-colors shrink-0 ${
                darkMode 
                  ? 'bg-gray-600 hover:bg-gray-500 text-gray-100' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              style={{ fontFamily: 'var(--font-family)' }}
              title="Restart na začátek"
            >
              <RotateCcw className="size-5" />
            </button>
            
            <button
              onClick={() => changeStep(currentStep - 1)}
              disabled={currentStep === 0}
              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#2563eb] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1d4ed8] transition-colors flex-1"
              style={{ fontFamily: 'var(--font-family)' }}
            >
              <ChevronLeft className="size-5" />
              <span>Zpět</span>
            </button>
            
            <button
              onClick={() => changeStep(currentStep + 1)}
              disabled={currentStep === totalSteps - 1}
              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#2563eb] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1d4ed8] transition-colors flex-1"
              style={{ fontFamily: 'var(--font-family)' }}
            >
              <span>Další</span>
              <ChevronRight className="size-5" />
            </button>
          </div>
          
          {/* Druhý řádek - zoom a tlačítka */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 flex-1">
              <span className={`text-sm shrink-0 ${darkMode ? 'text-gray-300' : 'text-muted-foreground'}`} style={{ fontFamily: 'var(--font-family)' }}>Zoom</span>
              <Slider
                value={[scale * 100]}
                onValueChange={onZoomChange}
                min={15}
                max={225}
                step={5}
                className="flex-1"
              />
            </div>
            
            <button
              onClick={onToggleCaptions}
              className={`p-2 rounded-lg transition-colors shrink-0 ${
                darkMode 
                  ? 'bg-gray-600 hover:bg-gray-500 text-gray-100' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              style={{ fontFamily: 'var(--font-family)' }}
              title={showCaptions ? 'Skrýt nápovědu a pravítko' : 'Zobrazit nápovědu a pravítko'}
            >
              <Info className={`size-5 ${!showCaptions ? 'opacity-50' : ''}`} />
            </button>
            
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-lg transition-colors shrink-0 ${
                darkMode 
                  ? 'bg-gray-600 hover:bg-gray-500 text-gray-100' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              style={{ fontFamily: 'var(--font-family)' }}
              title={darkMode ? 'Světlý režim' : 'Tmavý režim'}
            >
              {darkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop verze - horizontální layout
  return (
    <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 rounded-xl shadow-lg border p-2.5 ${
      darkMode 
        ? 'bg-[#374151] border-gray-600' 
        : 'bg-white border-border'
    }`} style={{ fontFamily: 'var(--font-family)' }}>
      <div className="flex items-center gap-2">
        {/* Restart tlačítko */}
        <button
          onClick={onPlayStep}
          className={`p-1.5 rounded-lg transition-colors shrink-0 ${
            darkMode 
              ? 'bg-gray-600 hover:bg-gray-500 text-gray-100' 
              : 'hover:bg-muted'
          }`}
          style={{ fontFamily: 'var(--font-family)' }}
          title="Přehrát krok znovu"
        >
          <PlayCircle className="size-[18px]" />
        </button>
        
        <button
          onClick={onRestart}
          className={`p-1.5 rounded-lg transition-colors shrink-0 ${
            darkMode 
              ? 'bg-gray-600 hover:bg-gray-500 text-gray-100' 
              : 'hover:bg-muted'
          }`}
          style={{ fontFamily: 'var(--font-family)' }}
          title="Restart na začátek"
        >
          <RotateCcw className="size-[18px]" />
        </button>
        
        <div className={`h-6 w-px ${darkMode ? 'bg-gray-500' : 'bg-border'}`}></div>
        
        {/* Navigace kroků */}
        <button
          onClick={() => changeStep(currentStep - 1)}
          disabled={currentStep === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1d4ed8] transition-colors shrink-0"
          style={{ fontFamily: 'var(--font-family)' }}
        >
          <ChevronLeft className="size-[18px]" />
          <span className="text-[15px]" style={{ fontFamily: 'var(--font-family)' }}>Zpět</span>
        </button>
        
        <button
          onClick={() => changeStep(currentStep + 1)}
          disabled={currentStep === totalSteps - 1}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1d4ed8] transition-colors shrink-0"
          style={{ fontFamily: 'var(--font-family)' }}
        >
          <span className="text-[15px]" style={{ fontFamily: 'var(--font-family)' }}>Další</span>
          <ChevronRight className="size-[18px]" />
        </button>
        
        <div className={`h-6 w-px ${darkMode ? 'bg-gray-500' : 'bg-border'}`}></div>
        
        {/* Zoom ovládání */}
        <div className="flex items-center gap-2 w-[140px] shrink-0">
          <span className={`text-[14px] ${darkMode ? 'text-gray-300' : 'text-muted-foreground'}`} style={{ fontFamily: 'var(--font-family)' }}>Zoom</span>
          <Slider
            value={[scale * 100]}
            onValueChange={onZoomChange}
            min={15}
            max={225}
            step={5}
            className="flex-1"
          />
        </div>
        
        <div className={`h-6 w-px ${darkMode ? 'bg-gray-500' : 'bg-border'}`}></div>
        
        {/* Tlačítka nápovědy a dark mode */}
        <button
          onClick={onToggleCaptions}
          className={`p-1.5 rounded-lg transition-colors shrink-0 ${
            darkMode 
              ? 'bg-gray-600 hover:bg-gray-500 text-gray-100' 
              : 'hover:bg-muted'
          }`}
          style={{ fontFamily: 'var(--font-family)' }}
          title={showCaptions ? 'Skrýt nápovědu a pravítko' : 'Zobrazit nápovědu a pravítko'}
        >
          <Info className={`size-[18px] ${!showCaptions ? 'opacity-50' : ''}`} />
        </button>
        
        <button
          onClick={onToggleDarkMode}
          className={`p-1.5 rounded-lg transition-colors shrink-0 ${
            darkMode 
              ? 'bg-gray-600 hover:bg-gray-500 text-gray-100' 
              : 'hover:bg-muted'
          }`}
          style={{ fontFamily: 'var(--font-family)' }}
          title={darkMode ? 'Světlý režim' : 'Tmavý režim'}
        >
          {darkMode ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
        </button>
      </div>
    </div>
  );
}
