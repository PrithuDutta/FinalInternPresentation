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
    title: 'Observability Beats Prompting',
    lesson:
      'Brute-force prompting without runtime diagnostic context leads to infinite hallucination loops. Grounding AI agents in live container logs and CWWK error codes via MCP yields 10x higher migration success.',
  },
  {
    num: '03',
    title: 'Modernization is an End-to-End System',
    lesson:
      'Replatforming is never just changing Java code: it requires aligning DB2 container drivers, SIBus JMS message brokers, J2C credentials, and runtime XML descriptors into a harmonious system.',
  },
];

export function Slide12_RetrospectiveQnA() {
  return (
    <div className="w-full h-full bg-white p-8 sm:p-10 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
        <div>
          <div className="text-[0.62rem] font-mono font-bold tracking-[2px] uppercase text-[#0f62fe]">
            ACT 5 // RETROSPECTIVE & DISCUSSION
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#161616] tracking-tight font-sans">
            Engineering Retrospective & Q&A
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="Summer 2025" variant="blue" size="sm" />
          <Badge label="IBM SVT Team" variant="outline" size="sm" />
        </div>
      </div>

      {/* 3 Core Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto py-2">
        {LESSONS.map(l => (
          <div
            key={l.num}
            className="p-5 bg-[#f4f4f4] border border-[#e0e0e0] flex flex-col justify-between hover:border-[#0f62fe] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2 border-b border-[#e0e0e0] pb-1.5">
                <span className="text-xl font-mono font-bold text-[#0f62fe]">
                  {l.num}
                </span>
                <span className="text-[0.58rem] font-mono font-bold text-[#525252] uppercase">
                  CORE LEARNING
                </span>
              </div>
              <h3 className="text-xs font-bold text-[#161616] mb-2">{l.title}</h3>
              <p className="text-[0.7rem] text-[#525252] leading-relaxed">{l.lesson}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Acknowledgments & Q&A Callout */}
      <div className="p-3.5 bg-[#edf5ff] border border-[#a6c8ff] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div>
          <div className="font-bold text-[#161616] mb-0.5">
            Special thanks to mentors Monica & Dan and the IBM SVT team!
          </div>
          <div className="text-[0.68rem] text-[#525252] font-mono">
            Press [D] for Diagnostic Telemetry & Schematics · Press [P] for Speaker Prompter
          </div>
        </div>

        <div className="px-4 py-2 bg-[#0f62fe] text-white font-mono font-bold text-xs tracking-wider">
          QUESTIONS & DISCUSSION
        </div>
      </div>
    </div>
  );
}

