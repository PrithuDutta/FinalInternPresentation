import { Badge } from '../components/Badge';

const AGENTS = [
  {
    role: '1. AMA Discovery Agent',
    tech: 'Static AST Analysis',
    task: 'Parses legacy Java EE codebase, extracts EJB/JMS dependency graphs, and generates execution DAG.',
    badge: 'Planner',
  },
  {
    role: '2. Bob Execution Agent',
    tech: 'Code Refactoring Subagent',
    task: 'Applies targeted Java 25 & Jakarta EE transformations, edits pom.xml, and synthesizes server.xml.',
    badge: 'Executor',
  },
  {
    role: '3. Liberty Runtime Agent',
    tech: 'Container Execution Engine',
    task: 'Deploys application to OpenLiberty test container, captures messages.log, and verifies HTTP endpoints.',
    badge: 'Tester',
  },
  {
    role: '4. MCP Evaluator Agent',
    tech: 'LiteLLM + CWWK MCP Server',
    task: 'Extracts runtime stack traces, queries CWWK MCP server for remediations, and drives autonomous feedback loop.',
    badge: 'Evaluator',
  },
];

export function Slide10_MultiAgentPipeline() {
  return (
    <div className="w-full h-full bg-white p-8 sm:p-10 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
        <div>
          <div className="text-[0.62rem] font-mono font-bold tracking-[2px] uppercase text-[#0f62fe]">
            ACT 4 // INNOVATION & TOOLING · MULTI-AGENT ARCHITECTURE
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#161616] tracking-tight font-sans">
            Workstream 05: Multi-Agent Modernization Pipeline
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="LangChain" variant="blue" size="sm" />
          <Badge label="LiteLLM" variant="dark" size="sm" />
          <Badge label="In Collaboration with Dan" variant="outline" size="sm" />
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
                  AGENT 0{idx + 1}
                </span>
                <Badge label={a.badge} variant="blue" size="sm" />
              </div>
              <h3 className="text-xs font-bold text-[#161616] mb-1">{a.role}</h3>
              <div className="text-[0.62rem] font-mono text-[#0f62fe] mb-2">{a.tech}</div>
              <p className="text-[0.68rem] text-[#525252] leading-relaxed">{a.task}</p>
            </div>

            <div className="mt-3 pt-2 border-t border-[#e0e0e0] text-[0.58rem] font-mono text-[#525252] text-center">
              {idx < 3 ? 'AUTOMATIC HANDOFF ──►' : 'AUTONOMOUS VERIFIED ✓'}
            </div>
          </div>
        ))}
      </div>

      {/* Architecture Highlights */}
      <div className="p-3 bg-[#edf5ff] border border-[#a6c8ff] flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#0f62fe]" />
          <span className="text-[#161616] font-semibold">
            LiteLLM Router manages model fallback; CWWK MCP server grounds agent self-healing loops
          </span>
        </div>
        <div className="text-[#525252] text-[0.65rem] hidden md:block">
          SVT AUTOMATION ARCHITECTURE
        </div>
      </div>
    </div>
  );
}

