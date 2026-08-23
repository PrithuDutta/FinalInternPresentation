import { Badge } from '../components/Badge';
import { CONTRIBUTIONS, GOALS } from '../data';

export function Slide11_ContributionsImpact() {
  return (
    <div className="w-full h-full bg-white p-8 sm:p-10 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
        <div>
          <div className="text-[0.62rem] font-mono font-bold tracking-[2px] uppercase text-[#0f62fe]">
            ACT 5 // RESULTS & DELIVERABLES
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#161616] tracking-tight font-sans">
            Key Contributions & Tangible Impact
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="4 Core Deliverables" variant="blue" size="sm" />
          <Badge label="All Goals Achieved ✓" variant="green" size="sm" />
        </div>
      </div>

      {/* 4 Contribution Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto py-2">
        {CONTRIBUTIONS.map(c => (
          <div
            key={c.title}
            className="p-3.5 bg-[#f4f4f4] border border-[#e0e0e0] flex flex-col justify-between hover:border-[#0f62fe] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5 border-b border-[#e0e0e0] pb-1">
                <span className="text-[0.6rem] font-mono font-bold text-[#0f62fe] uppercase">
                  {c.category}
                </span>
                <span className="text-[0.62rem] font-mono px-2 py-0.5 bg-white text-[#161616] font-bold border border-[#e0e0e0]">
                  {c.metric}
                </span>
              </div>
              <h3 className="text-xs font-bold text-[#161616] mb-1.5">{c.title}</h3>
              <p className="text-[0.68rem] text-[#525252] leading-relaxed mb-2">
                {c.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1 pt-2 border-t border-[#e0e0e0]">
              {c.tags.map(t => (
                <span
                  key={t}
                  className="text-[0.55rem] font-mono px-1.5 py-0.5 bg-white border border-[#e0e0e0] text-[#525252]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Goal Sign-Off Bar */}
      <div className="p-3 bg-[#f4f4f4] border border-[#e0e0e0] flex flex-wrap items-center justify-between gap-2 text-[0.65rem] font-mono">
        <div className="text-[#0f62fe] font-bold uppercase">MILESTONE SIGN-OFFS:</div>
        {GOALS.slice(0, 4).map(g => (
          <div key={g.label} className="flex items-center gap-1.5">
            <span className="text-[#198038] font-bold">✓</span>
            <span className="text-[#161616]">{g.label.split(' ')[0]} ({g.signoff})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

