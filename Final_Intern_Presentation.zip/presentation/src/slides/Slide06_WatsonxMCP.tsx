import { Badge } from '../components/Badge';

const SQLITE_SCHEMA = [
  { field: 'code', type: 'TEXT PRIMARY KEY', desc: 'Indexed error prefix (e.g. CWWKB0001I, CNTR0154E)' },
  { field: 'severity', type: 'TEXT', desc: 'Warning, Error, Informational' },
  { field: 'message', type: 'TEXT', desc: 'Diagnostic summary & runtime symptom' },
  { field: 'explanation', type: 'TEXT', desc: 'Root-cause container analysis' },
  { field: 'fix', type: 'TEXT', desc: 'Recommended developer remediation XML' },
];

export function Slide06_WatsonxMCP() {
  return (
    <div className="slide-surface select-none font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-2">
        <div>
          <div className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-[#0066cc]">
            SLIDE 06 // AI DATA INFRASTRUCTURE
          </div>
          <h2>
            WatsonX Challenge: AI Data Infrastructure &amp; MCP Integration
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="Data Pod Technical Lead" variant="blue" size="sm" />
          <Badge label="1,300+ Error Codes" variant="dark" size="sm" />
          <Badge label="MCP Live Tool" variant="green" size="sm" />
        </div>
      </div>

      {/* 2 Main Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-auto py-0.5">
        {/* Left Column: Data Pod Leadership & Extraction Pipeline */}
        <div className="panel-2010 flex flex-col justify-between">
          <div>
            <div className="panel-2010-heading flex items-center justify-between">
              <span className="text-[#004480]">01. DATA POD LEADERSHIP &amp; EXTRACTION</span>
              <Badge label="Python / BS4" variant="blue" size="sm" />
            </div>

            <div className="p-2 space-y-1.5 bg-[#f8fafc]">
              <div className="p-1.5 bg-white border border-[#cbd5e1] rounded-[2px] shadow-xs">
                <span className="text-[11.5px] text-[#1e293b] font-bold">
                  Technical Lead for 3-Person Data Pod (Pair B) in 10-Person Hackathon Cohort
                </span>
              </div>

              <ul className="space-y-1 text-[10.5px] text-[#475569] leading-relaxed">
                <li className="flex items-start gap-1">
                  <span className="text-[#0066cc] font-bold font-mono">▸</span>
                  <span>Engineered automated Python/BeautifulSoup web scraper pulling <strong>1,300+ OpenLiberty CWWK*</strong> diagnostic error codes from documentation.</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-[#0066cc] font-bold font-mono">▸</span>
                  <span>Filtered, deduplicated, and normalized heterogeneous XML/HTML error tables into structured relational tables.</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-[#0066cc] font-bold font-mono">▸</span>
                  <span>Integrated dataset with an internal <strong>Model Context Protocol (MCP)</strong> server for real-time deterministic log triage by IBM’s in-house LLMs.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-2 bg-white border-t border-[#cbd5e1] font-mono text-[9.5px] text-[#1e293b]">
            <div className="text-[#0066cc] font-bold mb-0.5">MCP PROTOCOL ENDPOINT (JSON-RPC)</div>
            <div className="text-[#64748b]">&gt; query_mcp(tool="get_cwwk_error", code="CNTR0154E")</div>
            <div className="text-[#198038]">&lt; &#123;"error": "EJB Remote Conflict", "fix": "Separate @Remote and @Local"&#125;</div>
          </div>
        </div>

        {/* Right Column: Optimized SQLite Knowledge Base */}
        <div className="panel-2010 flex flex-col justify-between">
          <div>
            <div className="panel-2010-heading flex items-center justify-between">
              <span className="text-[#004480]">02. OPTIMIZED SQLITE SCHEMA (liberty_errors)</span>
              <Badge label="Sub-ms Lookup" variant="dark" size="sm" />
            </div>

            <div className="p-2 space-y-1.5 bg-[#f8fafc]">
              <p className="text-[10px] text-[#475569] leading-tight">
                Relational database designed specifically for low-latency LLM context retrieval during autonomous migration:
              </p>

              <div className="overflow-hidden">
                <table className="table-2010 text-[9.5px]">
                  <thead>
                    <tr>
                      <th className="p-1">Column</th>
                      <th className="p-1">Type</th>
                      <th className="p-1">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SQLITE_SCHEMA.map(col => (
                      <tr key={col.field}>
                        <td className="p-1 font-mono font-bold text-[#0066cc]">{col.field}</td>
                        <td className="p-1 font-mono text-[#64748b]">{col.type}</td>
                        <td className="p-1 text-[#1e293b]">{col.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="p-2 bg-[#eaf4fd] border-t border-[#bce8f1] text-[10px] text-[#1e293b]">
            <strong className="text-[#0066cc]">Architectural Value: </strong>
            Eliminates semantic RAG fuzziness by enabling deterministic primary-key lookups on exact error codes during container boot failures.
          </div>
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="callout-2010-info flex items-center justify-between text-xs font-mono py-1.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#198038]" />
          <span className="text-[#1e293b] font-semibold text-[11px]">
            1,300+ diagnostic codes indexed in SQLite; live MCP server operational for SVT automated triage.
          </span>
        </div>
        <div className="text-[#198038] font-bold text-[11px]">
          WATSONX CHALLENGE POD DELIVERABLE ✓
        </div>
      </div>
    </div>
  );
}
