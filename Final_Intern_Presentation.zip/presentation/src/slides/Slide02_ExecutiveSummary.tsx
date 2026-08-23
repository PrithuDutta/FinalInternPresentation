import { Badge } from '../components/Badge';

const PILLARS = [
  {
    num: '01',
    title: 'The Modernization Challenge',
    tag: 'Problem Space',
    variant: 'blue' as const,
    points: [
      'Enterprises run mission-critical legacy Java 8 workloads on traditional WebSphere (tWAS).',
      'Migrating to container-native OpenLiberty on Java 25 / Jakarta EE 11 is essential for hybrid cloud agility.',
      'DayTrader 7 is the ultimate enterprise benchmark: 35k+ LOC spanning EJB 3.2, JMS SIBus, CDI, MDBs, and DB2.',
    ],
  },
  {
    num: '02',
    title: 'Four Core Workstreams',
    tag: 'Execution Scope',
    variant: 'dark' as const,
    points: [
      'Established full tWAS 8.5.5 reference environment with Podman DB2 & JMS broker topology.',
      'Replatformed DayTrader 7 to OpenLiberty 25.0; root-caused CDI/EJB container failures.',
      'Conducted first empirical 3-way AI migration benchmark (Plain Bob vs Bob PP + AMA).',
      'Engineered CWWK diagnostic MCP server for WatsonX & Bob AI real-time runtime grounding.',
    ],
  },
  {
    num: '03',
    title: 'Tangible Business Value',
    tag: 'Enterprise Impact',
    variant: 'green' as const,
    points: [
      'Proved Bob PP delivers 80% token savings & 95% time reduction at enterprise portfolio scale.',
      'Filed 10+ reproducible defect reports directly against IBM AMA migration toolchain.',
      'Delivered written PM unit economics evaluation to Bob AI engineering leadership.',
      'Created open diagnostic tooling that outlasts the internship for SVT automated testing.',
    ],
  },
];

const METRICS_SUMMARY = [
  { label: 'APPLICATION REPLATFORMED', value: 'DayTrader 7 (35k+ LOC)' },
  { label: 'MIGRATION RUNTIME', value: 'Java 8 tWAS -> Java 25 Liberty' },
  { label: 'AI BENCHMARK SPEEDUP', value: '40 hrs -> 54 min (95% Cut)' },
  { label: 'TOKEN COST REDUCTION', value: '80% (90 -> 18 Bob Coins)' },
  { label: 'AMA DEFECTS FILED', value: '10+ GitHub Issues' },
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

