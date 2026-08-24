import { Badge } from '../components/Badge';

const AI_COMPARISON_ROWS = [
  {
    dimension: 'Token / Coin Cost',
    plainBob: '27 Bob Coins',
    plainStyle: 'text-[#475569]',
    bobPP: '18 Bob Coins (33% efficiency gain)',
    ppStyle: 'text-[#2e7d32] font-bold bg-[#e8f5e9]',
  },
  {
    dimension: 'Model Weights & Core Flaws',
    plainBob: 'Hallucinated DerbyDB; missed messagingClient-3.0',
    plainStyle: 'text-[#c62828] bg-[#ffebee]',
    bobPP: 'Identical hallucinations (shared backend LLM)',
    ppStyle: 'text-[#e65100] bg-[#fff3e0] font-medium',
  },
  {
    dimension: 'Configuration UX',
    plainBob: 'Emitted dummy variables directly into code',
    plainStyle: 'text-[#475569]',
    bobPP: 'Upfront UI prompts for real environment variables',
    ppStyle: 'text-[#0066cc] font-semibold bg-[#eaf4fd]',
  },
  {
    dimension: 'Licensing Friction',
    plainBob: 'Included in baseline Bob license',
    plainStyle: 'text-[#2e7d32] font-semibold bg-[#e8f5e9]',
    bobPP: 'Requires separate AMA license purchase',
    ppStyle: 'text-[#c62828] bg-[#ffebee] font-medium',
  },
  {
    dimension: 'Target Deployment Fit',
    plainBob: 'Ideal for ad-hoc, small-scale developer refactoring',
    plainStyle: 'text-[#475569]',
    bobPP: 'Built for scaled, automated enterprise portfolio pipelines',
    ppStyle: 'text-[#0066cc] font-bold bg-[#eaf4fd]',
  },
];

export function Slide05_AIEvaluation() {
  return (
    <div className="slide-surface select-none font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-2">
        <div>
          <div className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-[#0066cc]">
            SLIDE 05 // AI TOOLCHAIN BENCHMARK
          </div>
          <h2>
            Enterprise AI Evaluation: Plain Bob vs. Bob Premium Package
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="40+ Hours Telemetry" variant="dark" size="sm" />
          <Badge label="33% Token Savings" variant="green" size="sm" />
        </div>
      </div>

      {/* Structured 2010s Comparison Table */}
      <div className="overflow-hidden my-auto">
        <table className="table-2010">
          <thead>
            <tr>
              <th className="w-[24%]">Metric / Dimension</th>
              <th className="w-[38%] text-[#1e293b]">Plain Bob AI (Standard LLM)</th>
              <th className="w-[38%] text-[#0066cc] font-bold">Bob Premium Package (Bob PP + AMA)</th>
            </tr>
          </thead>
          <tbody>
            {AI_COMPARISON_ROWS.map(row => (
              <tr key={row.dimension}>
                <td className="font-mono font-semibold text-[#1e293b]">
                  {row.dimension}
                </td>
                <td className={`font-mono ${row.plainStyle}`}>
                  {row.plainBob}
                </td>
                <td className={`font-mono ${row.bobPP}`}>
                  {row.bobPP}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Strategic Recommendation Callout Box */}
      <div className="callout-2010-info flex items-start gap-2.5">
        <div className="w-1.5 h-8 bg-[#0066cc] rounded-full shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <div className="text-[10.5px] font-mono font-bold text-[#004480] uppercase">
            STRATEGIC RECOMMENDATION DELIVERED TO PRODUCT LEADERSHIP
          </div>
          <p className="text-[10.5px] text-[#1e293b] leading-relaxed font-normal">
            Advised PMs that Bob PP’s double-licensing overhead invalidates ROI for small teams since developers can prompt standard Bob 2.0 to achieve identical technical outputs. Validated that Bob PP’s true value proposition lies in UI standardization, deterministic variable input, and lower token burn for automated enterprise pipelines.
          </p>
        </div>
      </div>
    </div>
  );
}
