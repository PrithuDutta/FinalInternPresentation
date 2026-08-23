interface NavProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

const SLIDE_TITLES = [
  'Overview',
  'Journey',
  'Projects',
  'Metrics',
  'Impact',
];

export function Nav({ current, total, onPrev, onNext }: NavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-11 bg-[#05060a]/95 backdrop-blur-md border-t border-white/[0.06] flex items-center justify-between px-6">
      {/* Prev */}
      <button
        onClick={onPrev}
        disabled={current === 0}
        className="flex items-center gap-2 text-[0.72rem] font-semibold text-white/40 hover:text-white/80 transition-colors disabled:opacity-0 disabled:pointer-events-none"
      >
        <span className="text-[0.65rem]">←</span>
        Back
      </button>

      {/* Center: dots + slide name */}
      <div className="flex items-center gap-3">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              /* handled externally — dots are visual only, parent passes goTo via onPrev/onNext */
            }}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-12 h-[3px] bg-[#0f62fe]'
                : 'w-[6px] h-[6px] bg-white/15 hover:bg-white/30'
            }`}
          />
        ))}
        <span className="text-[0.65rem] text-white/25 font-mono ml-1">
          {SLIDE_TITLES[current]}
        </span>
      </div>

      {/* Next */}
      <button
        onClick={onNext}
        disabled={current === total - 1}
        className="flex items-center gap-2 text-[0.72rem] font-semibold text-white/40 hover:text-white/80 transition-colors disabled:opacity-0 disabled:pointer-events-none"
      >
        Next
        <span className="text-[0.65rem]">→</span>
      </button>
    </div>
  );
}
