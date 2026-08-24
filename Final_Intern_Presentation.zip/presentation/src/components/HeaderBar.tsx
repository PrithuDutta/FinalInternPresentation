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
  onToggleFullscreen: () => void;
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
  onToggleFullscreen,
}: HeaderBarProps) {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder.toString().padStart(2, '0')}`;
  };

  const isPacingOver = elapsedSeconds > targetSeconds + 30;

  return (
    <div className="w-full flex flex-col shrink-0 select-none z-30">
      {/* Primary 2010s Enterprise Top Navbar */}
      <header className="navbar-2010 h-10 px-4 flex items-center justify-between">
        {/* Left: IBM Corporate Brand & Portal Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-3.5 ibm-stripes shadow-sm" title="IBM Corporation" />
            <span className="text-[14px] font-bold tracking-wide text-white font-sans drop-shadow-sm">
              IBM
            </span>
          </div>
          <span className="text-[#64748b] text-[13px]">|</span>
          <span className="text-[11.5px] font-semibold text-[#cbd5e1] font-sans hidden sm:inline">
            Systems Verification Testing (SVT) · Modernization Portal
          </span>
        </div>

        {/* Right: Presentation Telemetry & Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Pacing Clock */}
          <div
            className={`flex items-center gap-1.5 px-2 py-0.5 border rounded-[3px] text-[10.5px] font-mono shadow-inner ${
              isPacingOver
                ? 'bg-[#ffebee] border-[#ef5350] text-[#c62828] font-bold'
                : 'bg-[#151c24] border-[#2d3a4b] text-[#93c5fd]'
            }`}
            title="Elapsed Time / Target Pacing (15-20 min)"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
            <span>{formatTime(elapsedSeconds)}</span>
            <span className="text-[#64748b]">/ 18:00</span>
          </div>

          {/* 2010s Glossy Action Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={onToggleOverview}
              className="btn-2010-default px-2 py-0.5 text-[11px]"
              title="Slide Overview Matrix (Key: O or Esc)"
            >
              Overview [O]
            </button>
            <button
              onClick={onToggleTelemetry}
              className={`px-2 py-0.5 text-[11px] ${
                isTelemetryOpen ? 'btn-2010-primary' : 'btn-2010-default'
              }`}
              title="Diagnostic Telemetry (Key: D)"
            >
              Diagnostics [D]
            </button>
            <button
              onClick={onTogglePresenter}
              className={`px-2 py-0.5 text-[11px] ${
                isPresenterOpen ? 'btn-2010-primary' : 'btn-2010-default'
              }`}
              title="Speaker Prompter & Talking Points (Key: P)"
            >
              Prompter [P]
            </button>
            <button
              onClick={onToggleFullscreen}
              className="btn-2010-default px-2 py-0.5 text-[11px]"
              title="Fullscreen Mode (Key: F)"
            >
              ⛶ Fullscreen
            </button>
          </div>
        </div>
      </header>

      {/* Secondary 2010s Breadcrumb Sub-Bar */}
      <div className="breadcrumb-2010 h-6 px-4 flex items-center justify-between text-[11px] text-[#4b5563]">
        <div className="flex items-center gap-1.5 truncate">
          <span className="text-[#0066cc] font-semibold hover:underline cursor-pointer">
            IBM SVT
          </span>
          <span className="text-[#9ca3af]">&gt;</span>
          <span className="text-[#0066cc] font-semibold hover:underline cursor-pointer">
            DayTrader 7
          </span>
          <span className="text-[#9ca3af]">&gt;</span>
          <span className="font-bold text-[#1f2937]">{section}</span>
          <span className="text-[#9ca3af]">&gt;</span>
          <span className="text-[#374151] truncate max-w-[320px]">{slideTitle}</span>
        </div>

        <div className="font-mono text-[10.5px] font-bold text-[#1f2937] shrink-0 pl-2">
          Slide {currentSlide + 1} of {totalSlides}
        </div>
      </div>
    </div>
  );
}
