import { Badge } from '../components/Badge';

const TIERS = [
  {
    tier: 'WEB / PRESENTATION',
    tech: 'JSP · Servlets · JSF',
    desc: 'HTTP Endpoints on virtual hosts. Handles user logins, stock trading interface, portfolio views, and trade population trigger.',
    challenge: 'Misleading NPE errors surface here when backend injection fails.',
    badge: 'Port 9081 / 9080',
  },
  {
    tier: 'EJB / BUSINESS LOGIC',
    tech: 'EJB 3.2 · TradeSLSBBean · CDI',
    desc: 'Stateless session beans managing account services, quotes, and market orders. Uses @Resource and @Inject for JMS & JPA.',
    challenge: 'Container aborts bean creation if any injected JMS resource fails.',
    badge: 'Stateless Session',
  },
  {
    tier: 'MESSAGING & SIBUS',
    tech: 'JMS · SIBus · TradeBrokerMDB',
    desc: 'Asynchronous order execution via TradeBrokerQueue and TradeStreamerMDB activation specifications.',
    challenge: 'Requires messagingClient-3.0 and precise JNDI binding on Liberty.',
    badge: 'eis/TradeBrokerMDB',
  },
  {
    tier: 'PERSISTENCE & DATA',
    tech: 'IBM DB2 · JPA · J2C Auth',
    desc: 'Relational trading tables (ACCOUNT, HOLDING, ORDERS, QUOTE). DB2 in Podman with J2C auth credentials.',
    challenge: 'JNDI case sensitivity (jdbc/ vs JDBC/) and driver jar deployment.',
    badge: 'Podman Port 50000',
  },
];

export function Slide03_ArchitectureChallenge() {
  return (
    <div className="w-full h-full bg-white p-8 sm:p-10 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
        <div>
          <div className="text-[0.62rem] font-mono font-bold tracking-[2px] uppercase text-[#0f62fe]">
            ACT 1 // BASELINE ARCHITECTURE
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#161616] tracking-tight font-sans">
            DayTrader 7 Anatomy & The Modernization Gap
          </h2>
        </div>
        <div className="text-[0.65rem] font-mono text-[#525252] hidden sm:block">
          ENTERPRISE JAVA EE SUBSYSTEMS
        </div>
      </div>

      {/* 4 Tier Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 my-auto py-2">
        {TIERS.map((t, idx) => (
          <div
            key={t.tier}
            className="p-4 bg-[#f4f4f4] border border-[#e0e0e0] flex flex-col justify-between hover:border-[#0f62fe] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2 border-b border-[#e0e0e0] pb-1.5">
                <span className="text-[0.62rem] font-mono font-bold text-[#0f62fe]">
                  TIER 0{idx + 1}
                </span>
                <Badge label={t.badge} variant="outline" size="sm" />
              </div>
              <h3 className="text-xs font-bold text-[#161616] mb-1">{t.tier}</h3>
              <div className="text-[0.65rem] font-mono text-[#0f62fe] mb-2">{t.tech}</div>
              <p className="text-[0.7rem] text-[#525252] leading-relaxed mb-3">{t.desc}</p>
            </div>

            <div className="pt-2 border-t border-[#e0e0e0] text-[0.65rem] text-[#161616] bg-[#fdf4d6] p-2 border border-[#f1c21b]">
              <span className="font-bold text-[#8c6c00]">Migration Trap: </span>
              {t.challenge}
            </div>
          </div>
        ))}
      </div>

      {/* Modernization Gap Callout */}
      <div className="p-3.5 bg-[#edf5ff] border border-[#a6c8ff] flex items-start gap-4">
        <div className="w-1.5 h-10 bg-[#0f62fe] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <div className="text-xs font-mono font-bold text-[#0f62fe] uppercase">
            THE ROOT CAUSE OF AI MIGRATION FAILURE
          </div>
          <p className="text-xs text-[#161616] leading-relaxed font-normal">
            LLMs easily handle simple syntax rewrites (e.g. <code className="text-[#0f62fe] font-mono">javax.*</code> to <code className="text-[#0f62fe] font-mono">jakarta.*</code>), but fail at container runtime semantics. AI agents lack access to Liberty lifecycle events (<code className="text-[#0f62fe] font-mono">messages.log</code>) and CWWK error codes, causing them to hallucinate code changes when the real fix lies in <code className="text-[#0f62fe] font-mono">server.xml</code> feature dependencies.
          </p>
        </div>
      </div>
    </div>
  );
}

