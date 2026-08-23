import { Badge } from '../components/Badge';

const MCP_PILLARS = [
  {
    title: '1. Python Web Crawler',
    tech: 'Python · BeautifulSoup4',
    desc: 'Targeted IBM Liberty official documentation. Scraped and parsed over 1,200+ CWWK, CNTR, J2CA, and DSRA runtime diagnostic codes.',
    badge: '1,200+ Codes',
  },
  {
    title: '2. Structured SQLite Store',
    tech: 'SQLite · Relational DB',
    desc: 'Normalized error metadata: error code, severity level (INFO/WARN/ERROR), subsystem component, error description, and actionable remediation.',
    badge: 'Sub-ms Query',
  },
  {
    title: '3. Model Context Protocol',
    tech: 'MCP Protocol · JSON-RPC',
    desc: 'Exposed live MCP tool endpoints allowing WatsonX and Bob AI to query Liberty runtime codes dynamically and ground their code changes in real IBM docs.',
    badge: 'Live MCP Tool',
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
          <Badge label="WatsonX Intern Challenge" variant="dark" size="sm" />
          <Badge label="MCP Protocol" variant="blue" size="sm" />
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
          <span>MCP PROTOCOL TOOL CALL // WATSONX AGENT CONSOLE</span>
          <span className="text-[#198038] font-bold">RESPONSE STATUS: 200 OK</span>
        </div>
        <div className="text-[#0f62fe]">
          &gt; query_mcp(tool="get_cwwk_error", args=&#123;"code": "CWWKC2271E"&#125;)
        </div>
        <div className="text-[#198038] pl-2">
          &lt; &#123;"error": "Missing JMS Messaging Client", "solution": "Add &lt;feature&gt;messagingClient-3.0&lt;/feature&gt; to server.xml"&#125;
        </div>
        <div className="text-[#525252] text-[0.62rem] pt-1">
          Grounds LLM code modifications in authoritative Liberty runtime error resolutions.
        </div>
      </div>
    </div>
  );
}

