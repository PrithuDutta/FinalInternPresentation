import { Badge } from '../components/Badge';

const COHORTS = [
  {
    name: '1. Plain Bob Blind',
    tag: 'Baseline AI',
    variant: 'red' as const,
    desc: 'Standard unassisted LLM agent with no domain scaffolding, no prior issue hints, and no static AST roadmap.',
    protocol: 'Developer provides raw DayTrader codebase and error stack traces iteratively without architectural guidance.',
  },
  {
    name: '2. Bob PP + AMA Guided',
    tag: 'Enterprise Workflow',
    variant: 'blue' as const,
    desc: 'Bob Premium Package orchestrated with Application Modernization Accelerator (AMA) rulebooks and AST analysis.',
    protocol: 'AMA pre-scans codebase, generates task DAG, enforces atomic git commits, and provides Liberty migration rules.',
  },
  {
    name: '3. Plain Bob Informed',
    tag: 'Specialist Scaffolding',
    variant: 'green' as const,
    desc: 'Standard LLM guided by an engineer who already understands container lifecycle and server.xml feature dependencies.',
    protocol: 'Developer provides targeted prompts instructing Bob to inject specific features and configure shared libraries.',
  },
];

const DIMENSIONS = [
  'Total Wall-Clock Time',
  'Bob Token Coin Consumption',
  'Human Retry / Iteration Count',
  'Compliance & Audit Artifacts',
  'Git Commit & Branch Hygiene',
  'LLM Hallucination Frequency',
  'Enterprise Portfolio Scalability',
];

export function Slide07_BenchmarkMethodology() {
  return (
    <div className="w-full h-full bg-white p-8 sm:p-10 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
        <div>
          <div className="text-[0.62rem] font-mono font-bold tracking-[2px] uppercase text-[#0f62fe]">
            ACT 3 // EMPIRICAL BENCHMARK · METHODOLOGY
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#161616] tracking-tight font-sans">
            Workstream 03: 3-Way AI Migration Benchmark Design
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="Identical Codebase" variant="blue" size="sm" />
          <Badge label="Controlled Empirical Study" variant="dark" size="sm" />
        </div>
      </div>

      {/* 3 Cohorts Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto py-2">
        {COHORTS.map(c => (
          <div
            key={c.name}
            className="p-4 bg-[#f4f4f4] border border-[#e0e0e0] flex flex-col justify-between hover:border-[#0f62fe] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2 border-b border-[#e0e0e0] pb-1.5">
                <Badge label={c.tag} variant={c.variant} size="sm" />
                <span className="text-[0.58rem] font-mono text-[#525252]">COHORT</span>
              </div>
              <h3 className="text-sm font-bold text-[#161616] mb-2">{c.name}</h3>
              <p className="text-[0.7rem] text-[#525252] leading-relaxed mb-3">{c.desc}</p>
            </div>

            <div className="pt-2 border-t border-[#e0e0e0] text-[0.65rem] text-[#161616] bg-white p-2.5 border border-[#e0e0e0]">
              <span className="font-bold text-[#0f62fe]">Protocol: </span>
              {c.protocol}
            </div>
          </div>
        ))}
      </div>

      {/* 7 Dimensions Bar */}
      <div className="p-3 bg-[#f4f4f4] border border-[#e0e0e0] space-y-1.5">
        <div className="text-[0.6rem] font-mono font-bold text-[#0f62fe] uppercase">
          7 MEASURED DIMENSIONS (EMPIRICAL MATRIX)
        </div>
        <div className="flex flex-wrap gap-1.5">
          {DIMENSIONS.map(d => (
            <span
              key={d}
              className="text-[0.65rem] font-mono px-2 py-0.5 bg-white border border-[#e0e0e0] text-[#161616]"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

