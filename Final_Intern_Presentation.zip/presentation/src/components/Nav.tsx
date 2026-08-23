interface NavProps {
  current: number;
  total: number;
  slideTitles: string[];
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
  onToggleFullscreen: () => void;
}

export function Nav({
  current,
  total,
  slideTitles,
  onPrev,
  onNext,
  onGoTo,
  onToggleFullscreen,
}: NavProps) {
  const progressPercent = ((current + 1) / total) * 100;

  return (
    <footer className="w-full h-12 bg-white border-t border-[#e0e0e0] px-6 flex items-center justify-between shrink-0 select-none z-30 relative">
      {/* Top progress line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#f4f4f4]">
        <div
          className="h-full bg-[#0f62fe] transition-all duration-200 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Prev button */}
      <button
        onClick={onPrev}
        disabled={current === 0}
        className="flex items-center gap-2 px-3 py-1.5 text-[0.72rem] font-mono font-semibold text-[#161616] bg-[#f4f4f4] hover:bg-[#e0e0e0] border border-[#e0e0e0] transition-colors disabled:opacity-30 disabled:pointer-events-none"
        title="Previous Slide (Arrow Left)"
      >
        <span>←</span>
        <span>PREV</span>
      </button>

      {/* Slide Navigation Numbered Matrix */}
      <div className="flex items-center gap-1 overflow-x-auto py-1">
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i === current;
          return (
            <button
              key={i}
              onClick={() => onGoTo(i)}
              className={`h-7 px-2.5 flex items-center justify-center font-mono text-[0.68rem] transition-colors ${
                isActive
                  ? 'bg-[#0f62fe] text-white font-bold'
                  : 'bg-[#f4f4f4] text-[#525252] hover:text-[#161616] hover:bg-[#e0e0e0] border border-[#e0e0e0]'
              }`}
              title={`Slide ${i + 1}: ${slideTitles[i]}`}
            >
              {(i + 1).toString().padStart(2, '0')}
            </button>
          );
        })}
      </div>

      {/* Right controls: Next button + Fullscreen */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleFullscreen}
          className="px-2 py-1.5 text-[#525252] hover:text-[#161616] bg-[#f4f4f4] hover:bg-[#e0e0e0] border border-[#e0e0e0] transition-colors text-[0.68rem] font-mono"
          title="Toggle Fullscreen (F)"
        >
          [F]
        </button>

        <button
          onClick={onNext}
          disabled={current === total - 1}
          className="flex items-center gap-2 px-4 py-1.5 text-[0.72rem] font-mono font-bold text-white bg-[#0f62fe] hover:bg-[#0043ce] transition-colors disabled:opacity-30 disabled:pointer-events-none"
          title="Next Slide (Space / Arrow Right)"
        >
          <span>NEXT</span>
          <span>→</span>
        </button>
      </div>
    </footer>
  );
}

