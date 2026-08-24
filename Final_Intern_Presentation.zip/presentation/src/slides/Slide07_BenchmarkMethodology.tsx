import { Badge } from '../components/Badge';

const COHORTS = [
  {
    name: '1. Plain Unassisted AI',
    tag: 'Blind Baseline',
    variant: 'red' as const,
    desc: 'Unassisted LLM agent with no domain scaffolding, no prior issue hints, and no static AST decomposition.',
    protocol: 'Developer provides raw DayTrader codebase and error stack traces iteratively without architectural guidance.',
  },
  {
    name: '2. Enterprise AI Package',
    tag: 'Guided Workflow',
    variant: 'blue' as const,
    desc: 'Orchestrated modernization package with AST analysis, task decomposition DAG, and automated Git checkpoints.',
    protocol: 'Pre-scans codebase, generates task DAG, enforces atomic git commits, and applies Liberty migration rulebooks.',
  },
  {
    name: '3. Context-Informed AI',
    tag: 'Specialist Scaffolding',
    variant: 'green' as const,
    desc: 'Standard LLM guided by an engineer who already understands container lifecycle and server.xml feature dependencies.',
    protocol: 'Developer provides targeted prompts instructing the agent to inject specific features and configure shared libraries.',
  },
];

const INFRASTRUCTURE_PILLARS = [
  {
    label: 'Deterministic State Machine',
    desc: 'Controls transitions across discovery, refactoring, compilation, and runtime verification.',
  },
  {
    label: 'Parallel Docker Sandboxes',
    desc: 'Provides isolated Open Liberty container runtimes for closed-loop test execution.',
  },
  {
    label: 'PostgreSQL Telemetry Engine',
    desc: 'Captures token consumption, wall-clock time, retry counts, and error stack traces in real time.',
  },
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
            Workstream 03: AI Benchmark Design & Telemetry Engine
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="Parallel Docker Sandboxes" variant="blue" size="sm" />
          <Badge label="PostgreSQL Telemetry" variant="dark" size="sm" />
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
                <span className="text-[0.58rem] font-mono text-[#525252]">EVALUATION COHORT</span>
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

      {/* Infrastructure Telemetry Bar */}
      <div className="p-3 bg-[#f4f4f4] border border-[#e0e0e0] grid grid-cols-1 sm:grid-cols-3 gap-3">
        {INFRASTRUCTURE_PILLARS.map(p => (
          <div key={p.label} className="text-xs">
            <div className="font-mono font-bold text-[#0f62fe] uppercase text-[0.62rem] mb-0.5">
              {p.label}
            </div>
            <div className="text-[0.68rem] text-[#525252] leading-snug">{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


