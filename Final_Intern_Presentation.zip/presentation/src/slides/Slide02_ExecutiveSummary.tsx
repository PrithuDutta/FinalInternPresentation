import { Badge } from '../components/Badge';

const PILLARS = [
  {
    num: '01',
    title: 'Core Migration & 3-Layer Forensics',
    tag: 'Replatforming',
    variant: 'blue' as const,
    points: [
      'Upgraded DayTrader 7 (legacy Java EE 7) to WebSphere Liberty on Java 21 / Jakarta 10.',
      'Traced request lifecycle across 3 architectural layers (servlet, business logic, EJB container).',
      'Isolated true root cause behind misleading login/messaging exceptions: missing messaging feature in server.xml.',
    ],
  },
  {
    num: '02',
    title: 'AI Modernization Engine & Telemetry',
    tag: 'Distributed AI',
    variant: 'dark' as const,
    points: [
      'Architected distributed AI orchestration engine (LangChain, LiteLLM) for autonomous refactoring.',
      'Designed specific "Senior" (Architectural Planner) and "Junior" (Bob Executor) developer agent modes.',
      'Engineered deterministic state machine with parallel Docker sandboxes and PostgreSQL telemetry.',
    ],
  },
  {
    num: '03',
    title: '33% Token Gap & MCP Diagnostics',
    tag: 'Tooling & Impact',
    variant: 'green' as const,
    points: [
      'Evaluated enterprise AI migration tools; uncovered 33% token-efficiency gap and presented identical failure modes to leadership.',
      'Built Python scraper extracting 1,300+ Open Liberty error codes & property configs into SQLite.',
      'Integrated live MCP server providing sub-second natural language server diagnostics to internal AI assistant.',
    ],
  },
];

const METRICS_SUMMARY = [
  { label: 'TARGET RUNTIME', value: 'WebSphere Liberty (Java 21 / Jakarta 10)' },
  { label: 'CONTAINER FORENSICS', value: '3-Layer Request Lifecycle Traced' },
  { label: 'AI ENGINE MODES', value: 'Senior & Junior (LangChain/LiteLLM)' },
  { label: 'TOKEN EFFICIENCY GAP', value: '33% Gap Uncovered (80% Cut)' },
  { label: 'DIAGNOSTIC MCP SERVER', value: '1,300+ Error Codes in SQLite' },
];


export function Slide02_ExecutiveSummary() {
  return (
    <div className="w-full h-full bg-white p-8 sm:p-10 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
        <div>
          <div className="text-[0.62rem] font-mono font-bold tracking-[2px] uppercase text-[#0f62fe]">
            ACT 1 // CONTEXT & MANDATE
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#161616] tracking-tight font-sans">
            Executive Summary & Project Scope
          </h2>
        </div>
        <div className="text-[0.65rem] font-mono text-[#525252] hidden sm:block">
          SVT MODERNIZATION MANDATE
        </div>
      </div>

      {/* 3 Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto py-2">
        {PILLARS.map(p => (
          <div
            key={p.num}
            className="p-5 bg-[#f4f4f4] border border-[#e0e0e0] flex flex-col justify-between hover:border-[#0f62fe] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-[#e0e0e0] pb-2">
                <span className="text-xl font-bold font-mono text-[#0f62fe]">
                  {p.num}
                </span>
                <Badge label={p.tag} variant={p.variant} size="sm" />
              </div>
              <h3 className="text-sm font-bold text-[#161616] mb-3">{p.title}</h3>
              <ul className="space-y-2">
                {p.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[0.72rem] text-[#525252] leading-relaxed">
                    <span className="text-[#0f62fe] font-bold mt-0.5 font-mono">▸</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Metrics Bar */}
      <div className="pt-3 border-t border-[#e0e0e0] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {METRICS_SUMMARY.map(m => (
          <div key={m.label} className="p-2.5 bg-[#f4f4f4] border border-[#e0e0e0]">
            <div className="text-[0.55rem] font-mono font-bold text-[#0f62fe] uppercase truncate">
              {m.label}
            </div>
            <div className="text-[0.72rem] font-bold text-[#161616] mt-0.5 truncate">
              {m.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

