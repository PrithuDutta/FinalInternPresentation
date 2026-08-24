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
      <div className="w-full max-w-5xl max-h-[90vh] bg-[#f8f9fa] border border-[#718096] rounded-[4px] shadow-2xl flex flex-col overflow-hidden select-none font-sans">
        {/* Header */}
        <div className="panel-2010-heading-blue h-10 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[12.5px] text-white drop-shadow-sm">
              SLIDE DECK THUMBNAIL MATRIX // ({slides.length} SLIDES TOTAL)
            </span>
          </div>
          <button
            onClick={onClose}
            className="btn-2010-default px-2 py-0.5 text-[11px] font-bold text-[#111111]"
            title="Close [Esc / O]"
          >
            ✕ Close
          </button>
        </div>

        {/* Grid of slides */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 bg-[#fbfcfd]">
          {slides.map((s, idx) => {
            const isSelected = idx === currentSlide;
            return (
              <button
                key={s.id}
                onClick={() => {
                  onSelectSlide(idx);
                  onClose();
                }}
                className={`p-3 text-left flex flex-col justify-between h-28 border rounded-[3px] transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#eaf4fd] border-[#0066cc] shadow-md ring-1 ring-[#0066cc]'
                    : 'bg-white border-[#cbd5e1] hover:border-[#0066cc] hover:bg-[#f8fafc] shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-mono font-bold text-[#0066cc]">
                    SLIDE {(s.slideNum - 1).toString().padStart(2, '0')}
                  </span>
                  <span className="badge-2010 badge-2010-outline text-[9px]">
                    {s.section}
                  </span>
                </div>

                <div className="my-1">
                  <div className="text-[12px] font-bold text-[#1e293b] line-clamp-1">
                    {s.title}
                  </div>
                  <div className="text-[10.5px] text-[#64748b] line-clamp-2 leading-snug">
                    {s.subtitle}
                  </div>
                </div>

                <div className="text-[9.5px] font-mono text-[#0066cc] font-bold">
                  {isSelected ? '▶ Currently Viewing' : 'Click to View →'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="h-8 bg-[#e9ecef] border-t border-[#ced4da] px-4 flex items-center justify-between shrink-0 text-[10.5px] text-[#6c757d]">
          <span>Select any thumbnail to jump to slide</span>
          <span>Shortcut: Press [O] or [Esc] to toggle matrix</span>
        </div>
      </div>
    </div>
  );
}
