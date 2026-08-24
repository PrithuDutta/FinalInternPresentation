import { Badge } from '../components/Badge';

const DOSSIER = [
  { label: 'SVT INTERN TEAM', value: 'Prithu Dutta, Alan Yuen, Mars Huang' },
  { label: 'ORGANIZATION', value: 'IBM Systems Verification Testing (SVT)' },
  { label: 'MENTORS', value: 'Monica, Dan, Brian, Jag' },
  { label: 'TARGET RUNTIME', value: 'WebSphere Liberty (Jakarta EE 11)' },
  { label: 'SOURCE BASELINE', value: 'DayTrader 7 (Java EE 7 on tWAS)' },
  { label: 'DURATION', value: '12 Weeks · Summer 2025' },
];

const STACK_BADGES = [
  'WebSphere Liberty (Java 21)',
  'Jakarta EE 11',
  'LiteLLM / LangChain',
  'Parallel Sandboxes',
  'PostgreSQL Telemetry',
  'MCP Server (1,300+ Codes)',
  'IBM DB2',
];

export function Slide00_Title() {
  return (
    <div className="slide-surface select-none">
      {/* Top Corporate Header */}
      <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-2.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-4 ibm-stripes shadow-xs" />
          <div>
            <div className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-[#0066cc]">
              IBM SYSTEMS VERIFICATION TESTING · FINAL PRESENTATION
            </div>
            <div className="text-[10px] font-mono text-[#64748b]">
              DOCUMENT ID: SVT-MOD-2025-FINAL // CLASSIFICATION: IBM INTERNAL
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 hidden md:flex">
          {STACK_BADGES.slice(0, 4).map(b => (
            <Badge key={b} label={b} variant="blue" size="sm" />
          ))}
        </div>
      </div>

      {/* Main Title Content */}
      <div className="my-auto max-w-4xl py-3 space-y-3">
        <div className="callout-2010-info inline-flex items-center gap-2 py-1 px-3">
          <span className="w-2 h-2 rounded-full bg-[#0066cc]" />
          <span className="text-[11px] font-mono font-bold text-[#004480] tracking-wider uppercase">
            ENTERPRISE APPLICATION MODERNIZATION &amp; AI TOOLING
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1e293b] leading-tight font-sans">
          Replatforming Legacy Java EE 7
          <br />
          <span className="text-[#0066cc]">to WebSphere Liberty</span> with AI Tooling
        </h1>

        <p className="text-sm text-[#475569] leading-relaxed max-w-3xl font-normal">
          Upgrading DayTrader 7 to WebSphere Liberty (Jakarta EE 11) — 3-tier EJB container forensics, auditing IBM AI toolchains (33% token-cost reduction), building a 1,300+ error code MCP diagnostic server, and architecting an autonomous multi-agent modernization engine.
        </p>
      </div>

      {/* Bottom Dossier Grid */}
      <div className="pt-2.5 border-t border-[#cbd5e1] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {DOSSIER.map(item => (
          <div key={item.label} className="p-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-[3px] shadow-xs">
            <div className="text-[9px] font-mono font-bold text-[#0066cc] tracking-wider uppercase mb-0.5">
              {item.label}
            </div>
            <div className="text-[11px] font-semibold text-[#1e293b] truncate" title={item.value}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
