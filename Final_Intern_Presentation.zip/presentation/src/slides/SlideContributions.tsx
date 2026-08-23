import { CONTRIBUTIONS, GOALS } from '../data';

export function SlideContributions() {
  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ background: '#0e1117' }}
    >
      {/* Header */}
      <div className="shrink-0 px-12 pt-9 pb-5 flex items-end justify-between">
        <div>
          <p className="text-[0.62rem] font-bold tracking-[3px] uppercase text-[#4589ff] mb-2">Impact</p>
          <h2 className="text-[1.8rem] font-bold text-white leading-tight">Contributions</h2>
          <div className="mt-2 w-8 h-[2px] bg-[#0f62fe] rounded-full" />
        </div>

        {/* Goals status inline */}
        <div className="flex items-center gap-4">
          {GOALS.map(g => (
            <div key={g.label} className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[0.55rem] font-black shrink-0 ${
                  g.done
                    ? 'bg-[#198038]/20 text-[#42be65] ring-1 ring-[#198038]/40'
                    : 'bg-white/5 text-white/20 ring-1 ring-white/10'
                }`}
              >
                {g.done ? '✓' : '·'}
              </div>
              <span className={`text-[0.62rem] ${g.done ? 'text-white/50' : 'text-white/25'}`}>{g.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4 contribution items — list layout */}
      <div className="flex-1 flex flex-col px-12 pb-8 gap-0 justify-evenly">
        {CONTRIBUTIONS.map((c) => (
          <div key={c.title} className="flex gap-6 items-start py-4 border-b border-white/6 last:border-b-0">
            {/* Color accent dot */}
            <div
              className="w-2 h-2 rounded-full mt-1.5 shrink-0"
              style={{ background: c.color, boxShadow: `0 0 8px ${c.color}66` }}
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="text-[0.88rem] font-bold text-white/85 mb-1.5">{c.title}</div>
              <p className="text-[0.72rem] text-white/40 leading-relaxed">{c.description}</p>
            </div>

            {/* Tags */}
            <div className="shrink-0 flex flex-wrap gap-1 justify-end max-w-[180px]">
              {c.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[0.56rem] font-semibold px-1.5 py-0.5 rounded text-white/40 bg-white/5 border border-white/8"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom takeaway */}
      <div className="shrink-0 px-12 pb-7">
        <div className="h-px w-full bg-gradient-to-r from-[#0f62fe]/30 via-transparent to-transparent mb-4" />
        <p className="text-[0.7rem] text-white/30 leading-relaxed max-w-2xl">
          <span className="text-white/50 font-semibold">Key takeaway — </span>
          AI dramatically accelerates modernization, but it does not replace engineering judgment.
          Root-cause analysis, feature dependency resolution, and knowing when the model is hallucinating
          remain the highest-value contributions a developer brings to an AI-assisted workflow.
        </p>
      </div>
    </div>
  );
}
