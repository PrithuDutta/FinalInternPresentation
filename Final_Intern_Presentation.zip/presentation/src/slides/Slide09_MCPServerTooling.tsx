import { Badge } from '../components/Badge';

const MCP_PILLARS = [
  {
    title: '1. Python / BS4 Web Scraper',
    tech: 'Python · BeautifulSoup4',
    desc: 'Targeted official Open Liberty documentation. Parsed 1,300+ runtime error codes (CWWK, CNTR, J2CA) and thousands of server property configuration files.',
    badge: '1,300+ Codes & Configs',
  },
  {
    title: '2. Structured SQLite Store',
    tech: 'SQLite · Relational DB',
    desc: 'Normalized error metadata into local SQLite store: error code, severity level (INFO/WARN/ERROR), subsystem component, description, and remediation XML.',
    badge: 'Sub-ms Query',
  },
  {
    title: '3. Model Context Protocol',
    tech: 'MCP Server · JSON-RPC',
    desc: 'Integrated with internal AI assistant via live MCP tool endpoints to deliver sub-second, natural-language server diagnostics during autonomous migration.',
    badge: 'Internal AI Assistant',
  },
];

export function Slide09_MCPServerTooling() {
  return (
    <div className="w-full h-full bg-white p-8 sm:p-10 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
        <div>
          <div className="text-[0.62rem] font-mono font-bold tracking-[2px] uppercase text-[#0f62fe]">
            ACT 4 // INNOVATION & TOOLING · MCP SERVER
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#161616] tracking-tight font-sans">
            Workstream 04: CWWK Diagnostic MCP Server
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="WatsonX Challenge" variant="dark" size="sm" />
          <Badge label="1,300+ Codes Indexed" variant="blue" size="sm" />
          <Badge label="Sub-Second Latency" variant="green" size="sm" />
        </div>
      </div>

      {/* 3 Architecture Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto py-2">
        {MCP_PILLARS.map(p => (
          <div
            key={p.title}
            className="p-4 bg-[#f4f4f4] border border-[#e0e0e0] flex flex-col justify-between hover:border-[#0f62fe] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2 border-b border-[#e0e0e0] pb-1.5">
                <span className="text-[0.62rem] font-mono text-[#0f62fe] font-bold">
                  {p.tech}
                </span>
                <Badge label={p.badge} variant="outline" size="sm" />
              </div>
              <h3 className="text-xs font-bold text-[#161616] mb-2">{p.title}</h3>
              <p className="text-[0.7rem] text-[#525252] leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Terminal Snippet */}
      <div className="p-3 bg-[#f4f4f4] border border-[#e0e0e0] font-mono text-[0.68rem] space-y-1">
        <div className="flex items-center justify-between text-[0.6rem] text-[#525252] pb-1 border-b border-[#e0e0e0]">
          <span>INTERNAL AI ASSISTANT // MCP SERVER DIAGNOSTIC CONSOLE</span>
          <span className="text-[#198038] font-bold">QUERY LATENCY: 12ms [200 OK]</span>
        </div>
        <div className="text-[#0f62fe]">
          &gt; query_mcp(tool="diagnose_liberty_error", prompt="Login failing with tradehome.jsp NPE after Liberty container boot")
        </div>
        <div className="text-[#198038] pl-2">
          &lt; &#123;"matched_code": "CWWKC2271E", "component": "JMS Client", "remediation": "Add &lt;feature&gt;messagingClient-3.0&lt;/feature&gt; to server.xml"&#125;
        </div>
        <div className="text-[#525252] text-[0.62rem] pt-1">
          Provides sub-second natural language server diagnostics grounded in 1,300+ Open Liberty codes and property configs.
        </div>
      </div>
    </div>
  );
}


