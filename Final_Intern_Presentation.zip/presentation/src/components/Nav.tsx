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
}: NavProps) {
  return (
    <footer className="statusbar-2010 h-7 px-3 flex items-center justify-between shrink-0 select-none z-30">
      {/* Left: 2010s Enterprise System Status */}
      <div className="flex items-center gap-3 text-[10.5px]">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#198038] border border-[#0e5c24]" />
          <span className="font-semibold text-[#1e293b]">SVT Cluster:</span>
          <span className="font-mono text-[#475569]">ONLINE (svt-rhel-node01)</span>
        </div>
        <span className="text-[#cbd5e1]">|</span>
        <div className="hidden md:flex items-center gap-1">
          <span className="font-semibold text-[#1e293b]">Target:</span>
          <span className="font-mono text-[#475569]">Liberty Java 21 / Jakarta 11</span>
        </div>
        <span className="text-[#cbd5e1] hidden md:inline">|</span>
        <div className="hidden lg:flex items-center gap-1">
          <span className="font-semibold text-[#1e293b]">DB2:</span>
          <span className="font-mono text-[#475569]">svtdb:50000 (TRADEDB)</span>
        </div>
      </div>

      {/* Center / Right: 2010s Segmented Slide Jump Bar & Controls */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onPrev}
          disabled={current === 0}
          className="btn-2010-default px-2 py-0.5 text-[10.5px] disabled:opacity-40 disabled:pointer-events-none"
          title="Previous Slide (Arrow Left)"
        >
          ◄ Prev
        </button>

        {/* Numbered Jump Buttons */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: total }).map((_, i) => {
            const isActive = i === current;
            return (
              <button
                key={i}
                onClick={() => onGoTo(i)}
                className={`px-1.5 py-0.5 text-[10px] font-mono ${
                  isActive ? 'btn-2010-primary' : 'btn-2010-default'
                }`}
                title={`Slide ${i + 1}: ${slideTitles[i]}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        <button
          onClick={onNext}
          disabled={current === total - 1}
          className="btn-2010-primary px-2.5 py-0.5 text-[10.5px] disabled:opacity-40 disabled:pointer-events-none"
          title="Next Slide (Space / Arrow Right)"
        >
          Next ►
        </button>
      </div>
    </footer>
  );
}
