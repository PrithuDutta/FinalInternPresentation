import { BENCHMARK_METRICS } from '../data';
import type { CellStyle } from '../types';

function getCellClass(style: CellStyle): string {
  switch (style) {
    case 'best':
      return 'text-[#0f62fe] font-bold bg-[#edf5ff]';
    case 'good':
      return 'text-[#198038] font-semibold bg-[#defbe6]';
    case 'dim':
      return 'text-[#8d8d8d]';
    case 'warn':
      return 'text-[#8c6c00] bg-[#fdf4d6] font-medium';
    default:
      return 'text-[#161616]';
  }
}

export function Slide08_BenchmarkResults() {
  return (
    <div className="w-full h-full bg-white p-8 sm:p-10 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
        <div>
          <div className="text-[0.62rem] font-mono font-bold tracking-[2px] uppercase text-[#0f62fe]">
            ACT 3 // EMPIRICAL BENCHMARK · RESULTS
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#161616] tracking-tight font-sans">
            Workstream 03: Benchmark Findings & Unit Economics
          </h2>
        </div>
        <div className="text-[0.65rem] font-mono text-[#525252] hidden sm:block">
          DELIVERED TO BOB PM TEAM
        </div>
      </div>

      {/* Structured Comparative Table */}
      <div className="overflow-hidden border border-[#e0e0e0] bg-white my-auto">
        <table className="w-full text-left border-collapse text-[0.72rem]">
          <thead>
            <tr className="border-b border-[#e0e0e0] bg-[#f4f4f4] font-mono text-[0.65rem] uppercase text-[#525252]">
              <th className="p-2.5 w-[25%] border-r border-[#e0e0e0]">Metric / Dimension</th>
              <th className="p-2.5 w-[25%] border-r border-[#e0e0e0] text-[#da1e28]">Plain Bob (Blind)</th>
              <th className="p-2.5 w-[25%] border-r border-[#e0e0e0] text-[#0f62fe] font-bold">Bob PP + AMA (Guided)</th>
              <th className="p-2.5 w-[25%] text-[#198038]">Plain Bob (Informed)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0e0e0]">
            {BENCHMARK_METRICS.map(row => (
              <tr key={row.label} className="hover:bg-[#f4f4f4] transition-colors">
                <td className="p-2 font-mono font-semibold text-[#161616] border-r border-[#e0e0e0]">
                  {row.label}
                </td>
                <td className={`p-2 font-mono border-r border-[#e0e0e0] ${getCellClass(row.blindStyle)}`}>
                  {row.blind}
                </td>
                <td className={`p-2 font-mono border-r border-[#e0e0e0] ${getCellClass(row.ppStyle)}`}>
                  {row.pp}
                </td>
                <td className={`p-2 font-mono ${getCellClass(row.informedStyle)}`}>
                  {row.informed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Core Insight Callout */}
      <div className="p-3 bg-[#edf5ff] border border-[#a6c8ff] flex items-start gap-3">
        <div className="w-1.5 h-8 bg-[#0f62fe] shrink-0 mt-0.5" />
        <div className="text-[0.72rem] text-[#161616] leading-relaxed font-normal">
          <strong className="text-[#0f62fe] font-semibold">Key Finding Delivered to PMs: </strong>
          Both Plain Bob and Bob PP share the exact same underlying LLM and exhibit identical model hallucinations (e.g. injecting DerbyDB). Bob PP's 80% cost reduction and 95% time reduction stem entirely from workflow orchestration, AST decomposition, and automated Git checkpoints.
        </div>
      </div>
    </div>
  );
}

