import { Badge } from '../components/Badge';
import { WORKSTREAMS } from '../data';

export function SlideProjects() {
  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ background: '#0e1117' }}
    >
      {/* Header */}
      <div className="shrink-0 px-12 pt-9 pb-5 flex items-end justify-between">
        <div>
          <p className="text-[0.62rem] font-bold tracking-[3px] uppercase text-[#4589ff] mb-2">Work Done</p>
          <h2 className="text-[1.8rem] font-bold text-white leading-tight">Key Projects</h2>
          <div className="mt-2 w-8 h-[2px] bg-[#0f62fe] rounded-full" />
        </div>
        <p className="text-[0.72rem] text-white/30 max-w-xs text-right leading-relaxed">
          Every workstream produced a concrete deliverable — no simulations, all real systems.
        </p>
      </div>

      {/* 4 workstreams — 2 rows, each row is a horizontal item */}
      <div className="flex-1 flex flex-col gap-0 px-12 pb-8 justify-evenly">
        {WORKSTREAMS.map((ws, i) => (
          <div
            key={ws.num}
            className="flex gap-8 items-start py-4 border-b border-white/6 last:border-b-0"
          >
            {/* Number */}
            <div className="shrink-0 w-10">
              <span className="text-[1.6rem] font-black text-white/8 leading-none select-none">
                {ws.num}
              </span>
            </div>

            {/* Title + description */}
            <div className="flex-1 min-w-0">
              <div className="text-[0.9rem] font-bold text-white/90 mb-1.5">{ws.title}</div>
              <p className="text-[0.73rem] text-white/45 leading-relaxed">{ws.description}</p>
            </div>

            {/* Badges */}
            <div className="shrink-0 flex flex-wrap gap-1 justify-end max-w-[200px]">
              {ws.badges.map(b => (
                <Badge key={b.label} label={b.label} variant={b.variant} />
              ))}
            </div>

            {/* Side accent */}
            {i === 0 || i === 1 ? (
              <div className="absolute left-0 w-[3px] h-8 bg-[#0f62fe] rounded-r" style={{ display: 'none' }} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
