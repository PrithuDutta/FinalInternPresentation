import { TIMELINE_PHASES } from '../data';

export function Slide04_RoadmapTimeline() {
  return (
    <div className="w-full h-full bg-white p-8 sm:p-10 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
        <div>
          <div className="text-[0.62rem] font-mono font-bold tracking-[2px] uppercase text-[#0f62fe]">
            ACT 1 // EXECUTION ROADMAP
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#161616] tracking-tight font-sans">
            12-Week Internship Execution Roadmap
          </h2>
        </div>
        <div className="text-[0.65rem] font-mono text-[#525252] hidden sm:block">
          5 STRUCTURED DELIVERY PHASES
        </div>
      </div>

      {/* 5 Phase Timeline Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 my-auto py-2">
        {TIMELINE_PHASES.map(p => (
          <div
            key={p.phaseCode}
            className="p-3.5 bg-[#f4f4f4] border border-[#e0e0e0] flex flex-col justify-between hover:border-[#0f62fe] transition-colors relative"
          >
            <div>
              <div className="flex items-center justify-between mb-2 border-b border-[#e0e0e0] pb-1">
                <span className="text-[0.62rem] font-mono font-bold text-[#0f62fe]">
                  {p.phaseCode}
                </span>
                <span className="text-[0.58rem] font-mono text-[#525252]">
                  {p.week}
                </span>
              </div>

              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-2 h-2 bg-[#198038]" />
                <h3 className="text-xs font-bold text-[#161616] leading-tight">
                  {p.title}
                </h3>
              </div>

              <ul className="space-y-1.5 my-2">
                {p.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-start gap-1.5 text-[0.65rem] text-[#525252] leading-relaxed">
                    <span className="text-[#0f62fe] font-bold shrink-0 font-mono">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Deliverable */}
            <div className="pt-2 border-t border-[#e0e0e0] space-y-0.5">
              <div className="text-[0.55rem] font-mono font-bold text-[#198038] uppercase">
                DELIVERABLE:
              </div>
              <div className="text-[0.62rem] text-[#161616] font-medium line-clamp-2">
                {p.deliverable}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Summary Bar */}
      <div className="p-3 bg-[#f4f4f4] border border-[#e0e0e0] flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#198038]" />
          <span className="text-[#161616] font-semibold">
            All 5 Milestone Deliverables Successfully Completed & Verified
          </span>
        </div>
        <div className="text-[#525252] hidden md:block">
          SVT Systems Verification Testing · IBM 2025
        </div>
      </div>
    </div>
  );
}

