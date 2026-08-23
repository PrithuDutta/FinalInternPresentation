import { Badge } from '../components/Badge';

const DOSSIER = [
  { label: 'INTERN ENGINEER', value: 'Prithu Dutta' },
  { label: 'ORGANIZATION', value: 'IBM Systems Verification Testing (SVT)' },
  { label: 'MENTORS', value: 'Monica & Dan' },
  { label: 'TARGET RUNTIME', value: 'OpenLiberty 25.0 · Jakarta EE 11' },
  { label: 'SOURCE BASELINE', value: 'WebSphere Application Server v8.5.5' },
  { label: 'DURATION', value: '12 Weeks · Summer 2025' },
];

const STACK_BADGES = [
  'WebSphere Liberty 25.0',
  'tWAS 8.5.5',
  'Jakarta EE 11',
  'Bob AI & PP',
  'AMA Toolchain',
  'IBM DB2',
  'LangChain / LiteLLM',
  'MCP Protocol',
];

export function Slide01_Title() {
  return (
    <div className="w-full h-full bg-white p-8 sm:p-12 flex flex-col justify-between select-none">
      {/* Top Corporate Header */}
      <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-4 ibm-stripes" />
          <div>
            <div className="text-[0.65rem] font-mono font-bold tracking-[2px] uppercase text-[#0f62fe]">
              IBM SYSTEMS VERIFICATION TESTING · FINAL PRESENTATION
            </div>
            <div className="text-[0.58rem] font-mono text-[#525252]">
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
      <div className="my-auto max-w-4xl py-6 space-y-4">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#edf5ff] border border-[#a6c8ff]">
          <span className="w-1.5 h-1.5 bg-[#0f62fe]" />
          <span className="text-[0.65rem] font-mono font-bold text-[#0f62fe] tracking-wider uppercase">
            ENTERPRISE APPLICATION MODERNIZATION & AI TOOLING
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#161616] leading-tight font-sans">
          Replatforming Legacy Java EE
          <br />
          <span className="text-[#0f62fe]">to WebSphere Liberty</span> with AI
        </h1>

        <p className="text-sm sm:text-base text-[#525252] leading-relaxed max-w-3xl font-normal">
          An empirical investigation into migrating complex Java 8 tWAS workloads (DayTrader 7) to
          Java 25 OpenLiberty — diagnosing EJB container failures, benchmarking AI migration economics,
          and building diagnostic tooling that ships.
        </p>
      </div>

      {/* Bottom Dossier Grid */}
      <div className="pt-4 border-t border-[#e0e0e0] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {DOSSIER.map(item => (
          <div key={item.label} className="p-3 bg-[#f4f4f4] border border-[#e0e0e0]">
            <div className="text-[0.58rem] font-mono font-bold text-[#0f62fe] tracking-wider uppercase mb-1">
              {item.label}
            </div>
            <div className="text-[0.72rem] font-semibold text-[#161616] truncate">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

