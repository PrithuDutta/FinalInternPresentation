interface HeaderBarProps {
  currentSlide: number;
  totalSlides: number;
  section: string;
  slideTitle: string;
  elapsedSeconds: number;
  targetSeconds: number;
  isPresenterOpen: boolean;
  isTelemetryOpen: boolean;
  onTogglePresenter: () => void;
  onToggleTelemetry: () => void;
  onToggleOverview: () => void;
}

export function HeaderBar({
  currentSlide,
  totalSlides,
  section,
  slideTitle,
  elapsedSeconds,
  targetSeconds,
  isPresenterOpen,
  isTelemetryOpen,
  onTogglePresenter,
  onToggleTelemetry,
  onToggleOverview,
}: HeaderBarProps) {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder.toString().padStart(2, '0')}`;
  };

  const isPacingOver = elapsedSeconds > targetSeconds + 30;

  return (
    <header className="w-full h-11 bg-white border-b border-[#e0e0e0] px-5 flex items-center justify-between shrink-0 select-none z-30">
      {/* Left: IBM Corporate Identity & Project Code */}
      <div className="flex items-center gap-3">
        {/* IBM 8-bar minimal icon */}
        <div className="w-7 h-3.5 ibm-stripes" title="IBM Systems Verification Testing" />
        <div className="flex items-center gap-2 border-l border-[#e0e0e0] pl-3">
          <span className="text-[0.78rem] font-bold tracking-wider text-[#161616] font-sans">IBM</span>
          <span className="text-[0.68rem] text-[#525252] font-mono hidden sm:inline">
            SVT // DAYTRADER-7 MODERNIZATION
          </span>
        </div>
      </div>

      {/* Center: Slide Position & Category */}
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 bg-[#edf5ff] border border-[#a6c8ff] text-[#0f62fe] text-[0.62rem] font-mono font-bold uppercase tracking-wider">
          {section}
        </span>
        <span className="text-[#8d8d8d] text-[0.7rem] font-mono">/</span>
        <span className="text-[#161616] text-[0.75rem] font-semibold max-w-[280px] truncate hidden md:inline">
          {slideTitle}
        </span>
        <span className="text-[#525252] text-[0.68rem] font-mono font-medium">
          [{(currentSlide + 1).toString().padStart(2, '0')} of {totalSlides.toString().padStart(2, '0')}]
        </span>
      </div>

      {/* Right: Telemetry, Timer & Shortcut Buttons */}
      <div className="flex items-center gap-3">
        {/* Presenter Timing Telemetry */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-0.5 border text-[0.65rem] font-mono ${
            isPacingOver
              ? 'bg-[#fff1f1] border-[#ff8389] text-[#da1e28] font-bold'
              : 'bg-[#f4f4f4] border-[#e0e0e0] text-[#161616]'
          }`}
          title="Elapsed presentation time (Target: 15–20 min)"
        >
          <span className="w-1.5 h-1.5 bg-[#0f62fe]" />
          <span>{formatTime(elapsedSeconds)}</span>
          <span className="text-[#8d8d8d]">/ 18:00</span>
        </div>

        {/* Action Tool Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleOverview}
            className="px-2 py-1 text-[0.65rem] font-mono bg-[#f4f4f4] hover:bg-[#e0e0e0] border border-[#e0e0e0] text-[#161616] transition-colors"
            title="Slide Grid Overview (Key: G)"
          >
            Grid [G]
          </button>
          <button
            onClick={onToggleTelemetry}
            className={`px-2 py-1 text-[0.65rem] font-mono border transition-colors ${
              isTelemetryOpen
                ? 'bg-[#0f62fe] text-white border-[#0f62fe] font-bold'
                : 'bg-[#f4f4f4] hover:bg-[#e0e0e0] border-[#e0e0e0] text-[#161616]'
            }`}
            title="Interactive Diagnostic Telemetry (Key: D)"
          >
            Diagnostics [D]
          </button>
          <button
            onClick={onTogglePresenter}
            className={`px-2 py-1 text-[0.65rem] font-mono border transition-colors ${
              isPresenterOpen
                ? 'bg-[#0f62fe] text-white border-[#0f62fe] font-bold'
                : 'bg-[#f4f4f4] hover:bg-[#e0e0e0] border-[#e0e0e0] text-[#161616]'
            }`}
            title="Speaker Prompter & Notes (Key: P)"
          >
            Notes [P]
          </button>
        </div>
      </div>
    </header>
  );
}

