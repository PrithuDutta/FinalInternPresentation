import { Badge } from '../components/Badge';

const MISSION_PILLARS = [
  {
    title: 'Enterprise Workload Modernization',
    desc: 'Modernized mission-critical enterprise workloads from legacy Java EE 7 running on traditional WebSphere (tWAS) to Jakarta EE 11 on cloud-native OpenLiberty / WebSphere Liberty.',
    badge: 'tWAS -> Jakarta EE 11',
  },
  {
    title: 'AI Toolchain Benchmark & Audit',
    desc: "Benchmarked and audited IBM's enterprise AI modernization toolchains: Application Modernization Accelerator (AMA Dev Tools), Plain Bob AI, and Bob Premium Package (Bob PP).",
    badge: 'AMA · Plain Bob · Bob PP',
  },
  {
    title: 'Autonomous AI Diagnostic Infrastructure',
    desc: 'Built custom AI diagnostic infrastructure (CWWK MCP server) and architected an autonomous multi-agent modernization engine with closed-loop Docker verification.',
    badge: 'MCP · LiteLLM · LangChain',
  },
];

const IMPACT_METRICS = [
  {
    metric: '33% Token-Cost Reduction',
    detail: 'Discovered & quantified token-cost savings between Plain Bob AI (27 Bob coins) and Bob Premium Package (18 Bob coins).',
    category: 'UNIT ECONOMICS',
    badge: '33% Gain',
  },
  {
    metric: '1,300+ Error Codes Structured',
    detail: 'Scraped and indexed the complete OpenLiberty diagnostic catalog into an optimized SQLite database for real-time AI agent consumption.',
    category: 'AI INFRASTRUCTURE',
    badge: '1,300+ Codes',
  },
  {
    metric: '5+ Critical Integration Fixes',
    detail: 'Solved foundational CDI, JDBC, SIBus, and JNDI container crashes to achieve fully validated cloud-native deployments.',
    category: 'SYSTEMS ENGINEERING',
    badge: 'Container Validated',
  },
  {
    metric: '6 Cross-Functional Reviews',
    detail: 'Presented migration telemetry and product viability analyses directly to PMs and engineers across IBM Cloud, OpenShift, and GPU teams.',
    category: 'LEADERSHIP IMPACT',
    badge: '6 PM Reviews',
  },
];

export function Slide01_ExecutiveSummary() {
  return (
    <div className="slide-surface select-none font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-2">
        <div>
          <div className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-[#0066cc]">
            SLIDE 01 // OVERVIEW
          </div>
          <h2>
            Executive Summary &amp; Project Landscape
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="IBM SVT Modernization" variant="blue" size="sm" />
          <Badge label="Summer 2025" variant="dark" size="sm" />
        </div>
      </div>

      {/* The Mission Section */}
      <div className="panel-2010">
        <div className="panel-2010-heading flex items-center justify-between">
          <span className="text-[#004480] uppercase">THE MODERNIZATION MANDATE &amp; MISSION</span>
          <span className="badge-2010 badge-2010-blue">3 Core Objectives</span>
        </div>
        <div className="p-2.5 bg-[#f8fafc] grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {MISSION_PILLARS.map(p => (
            <div key={p.title} className="p-2.5 bg-white border border-[#cbd5e1] rounded-[3px] shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-[11.5px] font-bold text-[#1e293b] mb-1">{p.title}</div>
                <p className="text-[10.5px] text-[#475569] leading-relaxed mb-2">{p.desc}</p>
              </div>
              <div>
                <Badge label={p.badge} variant="outline" size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Level Impact Metrics */}
      <div>
        <div className="text-[10px] font-mono font-bold text-[#0066cc] uppercase mb-1.5">
          HIGH-LEVEL IMPACT METRICS
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {IMPACT_METRICS.map(m => (
            <div
              key={m.metric}
              className="p-2.5 bg-white border border-[#cbd5e1] rounded-[3px] shadow-xs flex flex-col justify-between hover:border-[#0066cc] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-1 border-b border-[#e2e8f0] pb-1">
                  <span className="text-[9px] font-mono font-bold text-[#0066cc] uppercase">
                    {m.category}
                  </span>
                  <Badge label={m.badge} variant="blue" size="sm" />
                </div>
                <div className="text-[11.5px] font-bold text-[#1e293b] mb-1 leading-snug">
                  {m.metric}
                </div>
                <p className="text-[10px] text-[#475569] leading-relaxed">{m.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
