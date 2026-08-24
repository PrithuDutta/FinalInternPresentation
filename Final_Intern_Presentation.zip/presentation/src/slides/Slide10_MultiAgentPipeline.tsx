import { Badge } from '../components/Badge';

const AGENTS = [
  {
    role: '1. Senior Developer Agent',
    tech: 'LangChain · Architectural Planner',
    task: 'Performs static AST discovery, constructs dependency migration DAG, and formulates high-level refactoring plan.',
    badge: 'Senior Mode',
  },
  {
    role: '2. Junior Developer Agent (Bob)',
    tech: 'LiteLLM · Code Execution Subagent',
    task: 'Executes targeted Java 21 / Jakarta 10 code rewrites, updates pom.xml dependencies, and adjusts server.xml configuration.',
    badge: 'Junior Mode',
  },
  {
    role: '3. Docker Sandbox Engine',
    tech: 'Parallel Container Sandboxes',
    task: 'Deploys application into isolated Open Liberty container, verifies HTTP health endpoints, and checks messages.log.',
    badge: 'Closed-Loop Test',
  },
  {
    role: '4. PostgreSQL Telemetry & MCP',
    tech: 'Postgres · CWWK MCP Feedback',
    task: 'Logs state transitions and token economics; queries MCP server on runtime failure to drive autonomous self-healing loops.',
    badge: 'Telemetry & Fix',
  },
];

export function Slide10_MultiAgentPipeline() {
  return (
    <div className="w-full h-full bg-white p-8 sm:p-10 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
        <div>
          <div className="text-[0.62rem] font-mono font-bold tracking-[2px] uppercase text-[#0f62fe]">
            ACT 4 // INNOVATION & TOOLING · DISTRIBUTED ENGINE
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#161616] tracking-tight font-sans">
            Workstream 05: Distributed AI Orchestration Engine (Bob)
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="LangChain · LiteLLM" variant="blue" size="sm" />
          <Badge label="Senior & Junior Modes" variant="dark" size="sm" />
          <Badge label="Docker & PostgreSQL" variant="blue" size="sm" />
        </div>
      </div>

      {/* 4 Agent Flow Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 my-auto py-2">
        {AGENTS.map((a, idx) => (
          <div
            key={a.role}
            className="p-4 bg-[#f4f4f4] border border-[#e0e0e0] flex flex-col justify-between hover:border-[#0f62fe] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2 border-b border-[#e0e0e0] pb-1.5">
                <span className="text-[0.62rem] font-mono font-bold text-[#0f62fe]">
                  MODULE 0{idx + 1}
                </span>
                <Badge label={a.badge} variant="blue" size="sm" />
              </div>
              <h3 className="text-xs font-bold text-[#161616] mb-1">{a.role}</h3>
              <div className="text-[0.62rem] font-mono text-[#0f62fe] mb-2">{a.tech}</div>
              <p className="text-[0.68rem] text-[#525252] leading-relaxed">{a.task}</p>
            </div>

            <div className="mt-3 pt-2 border-t border-[#e0e0e0] text-[0.58rem] font-mono text-[#525252] text-center">
              {idx < 3 ? 'AUTOMATIC HANDOFF ──►' : 'CLOSED-LOOP VERIFIED ✓'}
            </div>
          </div>
        ))}
      </div>

      {/* Architecture Highlights */}
      <div className="p-3 bg-[#edf5ff] border border-[#a6c8ff] flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#0f62fe]" />
          <span className="text-[#161616] font-semibold">
            Senior mode plans; Junior mode refactors; parallel Docker sandboxes execute closed-loop verification; PostgreSQL records telemetry
          </span>
        </div>
        <div className="text-[#525252] text-[0.65rem] hidden md:block">
          SVT DISTRIBUTED AI ARCHITECTURE
        </div>
      </div>
    </div>
  );
}


