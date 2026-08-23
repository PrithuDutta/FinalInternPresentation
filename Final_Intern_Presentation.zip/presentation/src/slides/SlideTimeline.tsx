import { TIMELINE_PHASES } from '../data';

export function SlideTimeline() {
  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ background: '#0e1117' }}
    >
      {/* Header */}
      <div className="shrink-0 px-12 pt-9 pb-6">
        <p className="text-[0.62rem] font-bold tracking-[3px] uppercase text-[#4589ff] mb-2">12 Weeks</p>
        <h2 className="text-[1.8rem] font-bold text-white leading-tight">Internship Journey</h2>
        <div className="mt-2 w-8 h-[2px] bg-[#0f62fe] rounded-full" />
      </div>

      {/* Phases — horizontal timeline */}
      <div className="flex-1 grid grid-cols-5 px-8 pb-8 gap-0 overflow-hidden">
        {TIMELINE_PHASES.map((phase, i) => (
          <div key={phase.week} className="flex flex-col relative">
            {/* Connector line */}
            {i < TIMELINE_PHASES.length - 1 && (
              <div className="absolute top-[18px] left-1/2 right-0 h-px bg-white/10" />
            )}

            {/* Dot + week label */}
            <div className="flex items-center gap-2 px-4 mb-4">
              <div
                className={`w-3 h-3 rounded-full shrink-0 ring-2 ring-offset-2 ring-offset-[#0e1117] ${
                  phase.ongoing ? 'ring-[#4589ff]/20' : 'ring-[#0f62fe]/20'
                }`}
                style={{ background: phase.ongoing ? '#4589ff' : '#0f62fe' }}
              />
              <span
                className="text-[0.58rem] font-bold tracking-[1px] uppercase"
                style={{ color: phase.ongoing ? '#4589ff' : '#4589ff99' }}
              >
                {phase.week}
              </span>
            </div>

            {/* Content */}
            <div className="px-4 flex flex-col gap-2 flex-1">
              <div className="text-[0.82rem] font-bold text-white/90 leading-snug">
                {phase.title}
              </div>

              <ul className="flex flex-col gap-1.5 flex-1">
                {phase.bullets.map((b, bi) => (
                  <li key={bi} className="flex gap-2 items-start">
                    <span className="text-[#0f62fe] mt-[3px] shrink-0 text-[0.6rem]">▸</span>
                    <span className="text-[0.67rem] text-white/45 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1 pt-2 border-t border-white/8">
                {phase.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[0.56rem] font-semibold px-1.5 py-0.5 rounded text-[#4589ff]/70 bg-[#0f62fe]/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
