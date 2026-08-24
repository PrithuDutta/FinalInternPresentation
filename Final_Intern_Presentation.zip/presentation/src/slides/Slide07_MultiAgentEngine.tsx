import { Badge } from '../components/Badge';

const ENGINE_COMPONENTS = [
  {
    title: '1. Orchestrator Layer (LiteLLM / LangChain)',
    desc: 'Evaluated LiteLLM as an AI gateway coupled with LangChain to handle request routing, multi-model execution, and token rate limits.',
    badge: 'LiteLLM Gateway',
  },
  {
    title: '2. Parallel Execution Workers (3 Sandboxes)',
    desc: 'Dispatches isolated subagents across 3 concurrent sandboxes to modernize codebases under AMA DT, Plain Bob, and Bob PP workflows.',
    badge: 'Parallel Workers',
  },
  {
    title: '3. Bounded Self-Healing Build Loop',
    desc: 'Intercepts compiler output and container runtime logs; on failure, initiates a bounded "Diagnose & Patch" loop to prevent runaway token spend.',
    badge: 'Diagnose & Patch',
  },
  {
    title: '4. PostgreSQL Telemetry Schema',
    desc: 'Persists run metadata (mod_id, tool_version, latency, tokens, retry_count, error_logs, deploy_status) for live PM analytics.',
    badge: 'PostgreSQL Store',
  },
];

export function Slide07_MultiAgentEngine() {
  return (
    <div className="slide-surface select-none font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-2">
        <div>
          <div className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-[#0066cc]">
            SLIDE 07 // SYSTEM DESIGN
          </div>
          <h2>
            System Design: Autonomous Multi-Agent Modernization Engine
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="LiteLLM Gateway" variant="blue" size="sm" />
          <Badge label="LangChain Orchestrator" variant="dark" size="sm" />
          <Badge label="PostgreSQL Telemetry" variant="green" size="sm" />
        </div>
      </div>

      {/* Main Grid: Left Diagram, Right Component Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 my-auto py-0.5">
        {/* Left Diagram Panel */}
        <div className="lg:col-span-7 panel-2010 flex flex-col justify-center font-mono">
          <div className="panel-2010-heading flex items-center justify-between">
            <span className="text-[#004480]">PARALLEL SANDBOX &amp; TELEMETRY ARCHITECTURE</span>
            <span className="badge-2010 badge-2010-blue">ASCII Topology</span>
          </div>
          <pre className="p-2 text-[8.5px] text-[#1e293b] leading-tight overflow-x-auto whitespace-pre font-mono select-none bg-[#f8fafc]">
{`       +---------------------------------------------+
       |           Source Repository Ingestion       |
       +---------------------------------------------+
                              |
                              v
       +---------------------------------------------+
       |          AI Orchestrator Engine             |
       |       (LiteLLM Gateway / LangChain)         |
       +---------------------------------------------+
          /                   |                   \\
         v                    v                    v
  +--------------+     +--------------+     +--------------+
  | Sandbox 1    |     | Sandbox 2    |     | Sandbox 3    |
  | (AMA DT)     |     | (Plain Bob)  |     | (Bob PP)     |
  +--------------+     +--------------+     +--------------+
  | Modernize    |     | Modernize    |     | Modernize    |
  | Codebase     |     | Codebase     |     | Codebase     |
  +--------------+     +--------------+     +--------------+
         |                    |                    |
         v                    v                    v
  +--------------+     +--------------+     +--------------+
  | Verify Build |     | Verify Build |     | Verify Build |
  | & Test Logs  |     | & Test Logs  |     | & Test Logs  |
  +--------------+     +--------------+     +--------------+
    | Pass  ^ Fail       | Pass  ^ Fail       | Pass  ^ Fail
    |       |            |       |            |       |
    |  +---------+       |  +---------+       |  +---------+
    |  |Diagnose |       |  |Diagnose |       |  |Diagnose |
    |  |& Patch  |       |  |& Patch  |       |  |& Patch  |
    |  +---------+       |  +---------+       |  +---------+
    v                    v                    v
  +--------------+     +--------------+     +--------------+
  | Deploy Test  |     | Deploy Test  |     | Deploy Test  |
  | Instance     |     | Instance     |     | Instance     |
  +--------------+     +--------------+     +--------------+
         \\                    |                   /
          --------------------+-------------------
                              |
                              v
       +---------------------------------------------+
       |        PostgreSQL Benchmark Layer           |
       |  (mod_id, tool_version, latency, tokens,    |
       |   retry_count, error_logs, deploy_status)   |
       +---------------------------------------------+`}
          </pre>
        </div>

        {/* Right 4 Component Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-1.5">
          {ENGINE_COMPONENTS.map(c => (
            <div key={c.title} className="p-2 bg-white border border-[#cbd5e1] rounded-[3px] shadow-xs">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[11px] font-bold text-[#1e293b]">{c.title}</span>
                <Badge label={c.badge} variant="outline" size="sm" />
              </div>
              <p className="text-[10px] text-[#475569] leading-snug">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="callout-2010-info flex items-center justify-between text-xs font-mono py-1.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc]" />
          <span className="text-[#1e293b] font-semibold text-[11px]">
            LiteLLM Gateway routes multi-model requests; bounded self-healing loop prevents runaway token burn.
          </span>
        </div>
        <div className="text-[#64748b] text-[10.5px] hidden sm:block">
          SVT MULTI-AGENT DESIGN
        </div>
      </div>
    </div>
  );
}
