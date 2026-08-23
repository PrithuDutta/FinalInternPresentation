interface SlideOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide: number;
  slides: Array<{
    id: string;
    slideNum: number;
    section: string;
    title: string;
    subtitle: string;
  }>;
  onSelectSlide: (index: number) => void;
}

export function SlideOverviewModal({
  isOpen,
  onClose,
  currentSlide,
  slides,
  onSelectSlide,
}: SlideOverviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6">
      <div className="w-full max-w-5xl max-h-[90vh] bg-white border border-[#c6c6c6] shadow-2xl flex flex-col overflow-hidden select-none">
        {/* Header */}
        <div className="h-12 bg-[#f4f4f4] border-b border-[#e0e0e0] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0f62fe]">
              SLIDE DECK INDEX (12 SLIDES)
            </span>
            <span className="text-[#525252] text-xs font-mono">
              — Linear 5-Act Presentation Structure
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#525252] hover:text-[#161616] hover:bg-[#e0e0e0] text-xs font-mono"
            title="Close [Esc / G]"
          >
            ✕ [Esc]
          </button>
        </div>

        {/* Grid of slides */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 bg-white">
          {slides.map((s, idx) => {
            const isSelected = idx === currentSlide;
            return (
              <button
                key={s.id}
                onClick={() => {
                  onSelectSlide(idx);
                  onClose();
                }}
                className={`p-3 text-left flex flex-col justify-between h-28 border transition-colors ${
                  isSelected
                    ? 'bg-[#edf5ff] border-[#0f62fe] ring-1 ring-[#0f62fe]'
                    : 'bg-[#f4f4f4] border-[#e0e0e0] hover:border-[#0f62fe] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[0.62rem] font-mono font-bold text-[#0f62fe]">
                    SLIDE {s.slideNum.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[0.55rem] font-mono uppercase px-1.5 py-0.5 bg-white text-[#525252] border border-[#e0e0e0]">
                    {s.section}
                  </span>
                </div>

                <div className="my-1">
                  <div className="text-xs font-bold text-[#161616] line-clamp-1">
                    {s.title}
                  </div>
                  <div className="text-[0.65rem] text-[#525252] line-clamp-2">
                    {s.subtitle}
                  </div>
                </div>

                <div className="text-[0.58rem] font-mono text-[#8d8d8d] text-right">
                  {isSelected ? '● CURRENT' : 'SELECT'}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

