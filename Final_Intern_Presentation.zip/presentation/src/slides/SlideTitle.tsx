import { Badge } from '../components/Badge';

const META = [
  { label: 'Intern',   value: 'Prithu Dutta' },
  { label: 'Team',     value: 'SVT — Systems Verification Testing' },
  { label: 'Role',     value: 'Application Modernization & AI Tooling' },
  { label: 'Duration', value: '12 Weeks · Summer 2025 · IBM' },
];

const TAGS = ['DayTrader 7', 'Jakarta EE 11', 'OpenLiberty', 'Bob AI', 'AMA', 'DB2 · Podman', 'LangChain'];

export function SlideTitle() {
  return (
    <div
      className="w-full h-full flex flex-col justify-between px-16 py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #0a0c10 0%, #0d1832 60%, #0a0c10 100%)' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Top bar */}
      <div className="relative flex items-center justify-between">
        <span className="text-[0.62rem] font-black tracking-[4px] uppercase text-white/20">IBM · SVT · 2025</span>
        <div className="flex gap-2">
          {TAGS.map(t => <Badge key={t} label={t} variant="dark" />)}
        </div>
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex flex-col justify-center gap-6 max-w-3xl">
        <div className="w-10 h-[3px] bg-[#0f62fe] rounded-full" />
        <div>
          <p className="text-[0.7rem] font-bold tracking-[3px] uppercase text-[#4589ff] mb-3">
            Final Internship Presentation
          </p>
          <h1 className="text-[3.8rem] font-bold text-white leading-[1.0] tracking-tight">
            Application<br />Modernization
          </h1>
        </div>
        <p className="text-[1.05rem] text-white/50 leading-relaxed max-w-xl">
          Replatforming legacy Java 8 tWAS workloads to Java 25 WebSphere Liberty —
          benchmarking AI-assisted migration paths and building tooling that ships.
        </p>

        {/* Meta row */}
        <div className="flex gap-8 pt-2 border-t border-white/10">
          {META.map(m => (
            <div key={m.label}>
              <div className="text-[0.56rem] font-bold tracking-[1.5px] uppercase text-white/30 mb-1">{m.label}</div>
              <div className="text-[0.8rem] font-medium text-white/75">{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom decorative accent */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#0f62fe]/40 to-transparent" />
    </div>
  );
}
