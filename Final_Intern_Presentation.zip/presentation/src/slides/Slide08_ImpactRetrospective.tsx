import { Badge } from '../components/Badge';

const LESSONS = [
  {
    num: '01',
    title: 'AI is an Accelerator, Not an Oracle',
    lesson:
      'LLMs can quickly convert Java syntax, but fail at container runtime semantics. Deep understanding of WebSphere classloading, EJB lifecycle, and CDI injection is irreplaceable when debugging container startup failures.',
  },
  {
    num: '02',
    title: 'Closed-Loop Telemetry Beats Prompting',
    lesson:
      'Brute-force prompting without runtime diagnostic context leads to infinite hallucination loops. Grounding AI agents in deterministic Docker sandboxes and CWWK error codes via MCP yields 10x higher migration success.',
  },
  {
    num: '03',
    title: 'Modernization is an End-to-End System',
    lesson:
      'Replatforming is never just changing Java code: it requires aligning DB2 container drivers, SIBus JMS message brokers, J2C credentials, and runtime XML descriptors into a harmonious system.',
  },
];

const AUDIENCES = [
  'IBM Cloud Product Managers',
  'OpenShift Development Teams',
  'GPU Infrastructure Groups',
  'Bob AI Product Leadership',
];

export function Slide08_ImpactRetrospective() {
  return (
    <div className="slide-surface select-none font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-2">
        <div>
          <div className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-[#0066cc]">
            SLIDE 08 // IMPACT &amp; RETROSPECTIVE
          </div>
          <h2>
            Cross-Functional Impact, Engineering Lessons &amp; Q&amp;A
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="6 PM Presentations" variant="blue" size="sm" />
          <Badge label="IBM SVT Team" variant="outline" size="sm" />
        </div>
      </div>

      {/* 3 Core Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-auto py-0.5">
        {LESSONS.map(l => (
          <div
            key={l.num}
            className="panel-2010 flex flex-col justify-between hover:border-[#0066cc] transition-colors shadow-xs"
          >
            <div>
              <div className="panel-2010-heading flex items-center justify-between">
                <span className="text-base font-mono font-bold text-[#0066cc]">
                  LESSON {l.num}
                </span>
                <span className="badge-2010 badge-2010-outline text-[9px]">
                  SYSTEMS ENGINEERING
                </span>
              </div>
              <div className="p-2.5 space-y-1 bg-[#ffffff]">
                <h3 className="text-[11.5px] font-bold text-[#1e293b]">{l.title}</h3>
                <p className="text-[10.5px] text-[#475569] leading-relaxed">{l.lesson}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cross-Functional Review Audiences Bar */}
      <div className="p-2 bg-[#f1f5f9] border border-[#cbd5e1] rounded-[3px] flex flex-wrap items-center justify-between gap-1.5 text-xs font-mono">
        <span className="text-[10px] font-bold text-[#0066cc] uppercase">
          6 CROSS-FUNCTIONAL PRESENTATIONS DELIVERED TO:
        </span>
        <div className="flex flex-wrap gap-1">
          {AUDIENCES.map(a => (
            <span key={a} className="text-[10px] px-2 py-0.5 bg-white border border-[#cbd5e1] text-[#1e293b] rounded-[2px] shadow-2xs font-sans font-semibold">
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Acknowledgments & Q&A Callout */}
      <div className="callout-2010-info flex flex-col sm:flex-row items-center justify-between gap-2 text-xs py-1.5 px-3">
        <div>
          <div className="font-bold text-[#1e293b] mb-0.5 text-[11.5px]">
            Special thanks to mentors Monica, Dan, Brian, Jag and the IBM SVT team!
          </div>
          <div className="text-[10px] text-[#64748b] font-mono">
            Press [D] for Diagnostic Telemetry &amp; Schematics · Press [P] for Speaker Prompter
          </div>
        </div>

        <button className="btn-2010-primary px-3 py-1 font-mono font-bold text-[11px] tracking-wider">
          QUESTIONS &amp; DISCUSSION
        </button>
      </div>
    </div>
  );
}
