import { Badge } from '../components/Badge';

const TIERS = [
  {
    tier: '1. SERVLET / PRESENTATION LAYER',
    tech: 'JSP · Servlets · HTTP :9080',
    desc: 'Handles user logins, stock quotes, and trading web actions via tradehome.jsp and TradeAppServlet.',
    challenge: 'Surfaced deceptive NullPointerExceptions during login when backend beans failed to inject.',
    badge: 'Presentation',
  },
  {
    tier: '2. BUSINESS LOGIC LAYER',
    tech: 'TradeAction Facade · CDI Injection',
    desc: 'Provides business methods for account balances, market orders, and trading operations via @Inject proxies.',
    challenge: 'CDI proxy was null at runtime because container aborted the underlying EJB lifecycle.',
    badge: 'Business Facade',
  },
  {
    tier: '3. EJB CONTAINER LAYER',
    tech: 'EJB 3.2 · JMS SIBus · DB2 Datasource',
    desc: 'TradeSLSBBean stateless session bean injecting JMS ConnectionFactory, TradeBrokerQueue, and DB2 connection pools.',
    challenge: 'Container failed bean creation because the messaging feature was omitted in server.xml.',
    badge: 'EJB Container',
  },
];

export function Slide03_ArchitectureChallenge() {
  return (
    <div className="w-full h-full bg-white p-8 sm:p-10 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
        <div>
          <div className="text-[0.62rem] font-mono font-bold tracking-[2px] uppercase text-[#0f62fe]">
            ACT 1 // ARCHITECTURAL ANATOMY
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#161616] tracking-tight font-sans">
            3-Layer Request Lifecycle & The EJB Modernization Gap
          </h2>
        </div>
        <div className="text-[0.65rem] font-mono text-[#525252] hidden sm:block">
          DAYTRADER 7 ENTERPRISE LAYERS
        </div>
      </div>

      {/* 3 Tier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto py-2">
        {TIERS.map((t, idx) => (
          <div
            key={t.tier}
            className="p-4 bg-[#f4f4f4] border border-[#e0e0e0] flex flex-col justify-between hover:border-[#0f62fe] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2 border-b border-[#e0e0e0] pb-1.5">
                <span className="text-[0.62rem] font-mono font-bold text-[#0f62fe]">
                  LAYER 0{idx + 1}
                </span>
                <Badge label={t.badge} variant="outline" size="sm" />
              </div>
              <h3 className="text-xs font-bold text-[#161616] mb-1">{t.tier}</h3>
              <div className="text-[0.65rem] font-mono text-[#0f62fe] mb-2">{t.tech}</div>
              <p className="text-[0.7rem] text-[#525252] leading-relaxed mb-3">{t.desc}</p>
            </div>

            <div className="pt-2 border-t border-[#e0e0e0] text-[0.65rem] text-[#161616] bg-[#fdf4d6] p-2 border border-[#f1c21b]">
              <span className="font-bold text-[#8c6c00]">Failure Mode: </span>
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
            THE ROOT CAUSE OF MIGRATION FAILURE
          </div>
          <p className="text-xs text-[#161616] leading-relaxed font-normal">
            Tracing the request lifecycle across all 3 layers revealed that the frontend login crash was masked by deceptive NullPointerExceptions in <code className="text-[#0f62fe] font-mono">tradehome.jsp</code>. The true root cause was an EJB container dependency injection failure triggered by a missing messaging feature (<code className="text-[#0f62fe] font-mono">&lt;feature&gt;messagingClient-3.0&lt;/feature&gt;</code>) in <code className="text-[#0f62fe] font-mono">server.xml</code>.
          </p>
        </div>
      </div>
    </div>
  );
}


