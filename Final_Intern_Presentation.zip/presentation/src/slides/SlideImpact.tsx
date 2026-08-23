import type { CellStyle } from '../types';
import { METRICS } from '../data';

function cellClass(style: CellStyle): string {
  switch (style) {
    case 'best': return 'text-[#4589ff] font-bold';
    case 'good': return 'text-[#42be65] font-semibold';
    case 'dim':  return 'text-white/25';
    default:     return 'text-white/60';
  }
}

export function SlideMetrics() {
  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ background: '#0e1117' }}
    >
      {/* Header */}
      <div className="shrink-0 px-12 pt-9 pb-5 flex items-end justify-between">
        <div>
          <p className="text-[0.62rem] font-bold tracking-[3px] uppercase text-[#4589ff] mb-2">Benchmark</p>
          <h2 className="text-[1.8rem] font-bold text-white leading-tight">Migration Path Comparison</h2>
          <div className="mt-2 w-8 h-[2px] bg-[#0f62fe] rounded-full" />
        </div>
        <p className="text-[0.7rem] text-white/30 max-w-sm text-right leading-relaxed">
          Same codebase · same target · three different approaches
        </p>
      </div>

      {/* Table */}
      <div className="flex-1 px-12 pb-6 flex flex-col overflow-hidden">
        <table className="w-full border-collapse text-[0.8rem] flex-1">
          <thead>
            <tr className="border-b border-white/10">
              <th className="pb-3 text-left text-[0.6rem] font-bold tracking-[1px] uppercase text-white/30 w-[22%]">
                Metric
              </th>
              <th className="pb-3 text-left text-[0.6rem] font-bold tracking-[1px] uppercase text-white/30 w-[26%]">
                Plain Bob
                <div className="text-[0.62rem] font-normal normal-case tracking-normal text-white/20 mt-0.5">
                  Blind — first run
                </div>
              </th>
              <th className="pb-3 text-left text-[0.6rem] font-bold tracking-[1px] uppercase text-[#4589ff] w-[26%]">
                Bob PP + AMA
                <div className="text-[0.62rem] font-normal normal-case tracking-normal text-white/20 mt-0.5">
                  Guided run
                </div>
              </th>
              <th className="pb-3 text-left text-[0.6rem] font-bold tracking-[1px] uppercase text-white/30 w-[26%]">
                Plain Bob
                <div className="text-[0.62rem] font-normal normal-case tracking-normal text-white/20 mt-0.5">
                  Informed — third run
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {METRICS.map((row) => (
              <tr key={row.label} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="py-2.5 text-[0.72rem] font-semibold text-white/55">{row.label}</td>
                <td className={`py-2.5 text-[0.75rem] font-mono ${cellClass(row.blindStyle)}`}>{row.blind}</td>
                <td className={`py-2.5 text-[0.75rem] font-mono ${cellClass(row.ppStyle)}`}>{row.pp}</td>
                <td className={`py-2.5 text-[0.75rem] font-mono ${cellClass(row.informedStyle)}`}>{row.informed}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Key insight */}
        <div className="shrink-0 mt-4 pt-4 border-t border-white/8 flex gap-4 items-start">
          <div className="w-1 h-10 bg-[#0f62fe] rounded-full shrink-0 mt-0.5" />
          <p className="text-[0.72rem] text-white/40 leading-relaxed">
            <span className="text-white/70 font-semibold">Key finding: </span>
            Both paths share the same underlying LLM — Bob PP does not improve model accuracy.
            Its value is workflow structure, automated auditability, and token efficiency at enterprise scale.
            For individual developers with strong prompting, plain Bob informed is the leaner path.
          </p>
        </div>
      </div>
    </div>
  );
}
