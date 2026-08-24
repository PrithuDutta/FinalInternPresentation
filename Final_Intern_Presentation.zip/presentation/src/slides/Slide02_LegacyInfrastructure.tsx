import { Badge } from '../components/Badge';

const PROVISIONING_POINTS = [
  {
    title: 'Automated tWAS & SSL Trust Chains',
    desc: 'Automated enterprise tWAS deployment on remote Linux VMs via IBM Installation Manager (./imcl), resolving intermediate and root SSL certificate trust chains.',
    badge: './imcl Linux',
  },
  {
    title: 'Dmgr Node Federation Topology',
    desc: 'Federated application servers, managed nodes, and node agents into a centralized Deployment Manager (Dmgr) architecture.',
    badge: 'Dmgr Topology',
  },
  {
    title: 'Ephemeral DB2 Container (Podman)',
    desc: 'Orchestrated IBM DB2 container (svtdb, port 50000, TRADEDB) using Podman, verifying local connectivity and isolating user credentials (db2inst1).',
    badge: 'svtdb:50000',
  },
];

const MESSAGING_POINTS = [
  {
    title: 'WebSphere SIBus / TradeBus',
    desc: 'Configured WebSphere Service Integration Bus (SIBus / TradeBus) with explicit bus members to support asynchronous messaging infrastructure.',
    badge: 'SIBus Engine',
  },
  {
    title: 'JNDI Messaging Primitives',
    desc: 'Defined jms/TradeBrokerQueue, jms/TradeBrokerQCF, jms/TradeStreamerTCF, and jms/TradeStreamerTopic connection factories and destinations.',
    badge: 'JNDI Bindings',
  },
  {
    title: 'MDB Activation Specifications',
    desc: 'Bound eis/TradeBrokerMDB and eis/TradeStreamerMDB activation specs to stabilize server startup lifecycles; resolved J2C authentication aliases.',
    badge: 'MDB Specs & J2C',
  },
];

export function Slide02_LegacyInfrastructure() {
  return (
    <div className="slide-surface select-none font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-2">
        <div>
          <div className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-[#0066cc]">
            SLIDE 02 // MONOLITH BASELINE
          </div>
          <h2>
            Legacy Infrastructure &amp; Monolith Modernization (DayTrader 7)
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="tWAS v8.5.5" variant="blue" size="sm" />
          <Badge label="Podman DB2" variant="blue" size="sm" />
          <Badge label="SIBus / JMS" variant="dark" size="sm" />
        </div>
      </div>

      {/* 2 Main Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-auto py-0.5">
        {/* Column 1: tWAS Setup & Linux Provisioning */}
        <div className="panel-2010 flex flex-col justify-between">
          <div>
            <div className="panel-2010-heading flex items-center justify-between">
              <span className="text-[#004480]">01. tWAS BASELINE &amp; LINUX PROVISIONING</span>
              <Badge label="Infrastructure" variant="blue" size="sm" />
            </div>
            <div className="p-2 space-y-1.5 bg-[#f8fafc]">
              {PROVISIONING_POINTS.map(p => (
                <div key={p.title} className="p-2 bg-white border border-[#cbd5e1] rounded-[2px] shadow-xs">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[11.5px] font-bold text-[#1e293b]">{p.title}</span>
                    <Badge label={p.badge} variant="outline" size="sm" />
                  </div>
                  <p className="text-[10.5px] text-[#475569] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Messaging & Persistence Topology */}
        <div className="panel-2010 flex flex-col justify-between">
          <div>
            <div className="panel-2010-heading flex items-center justify-between">
              <span className="text-[#004480]">02. ENTERPRISE MESSAGING &amp; PERSISTENCE</span>
              <Badge label="Topology" variant="dark" size="sm" />
            </div>
            <div className="p-2 space-y-1.5 bg-[#f8fafc]">
              {MESSAGING_POINTS.map(p => (
                <div key={p.title} className="p-2 bg-white border border-[#cbd5e1] rounded-[2px] shadow-xs">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[11.5px] font-bold text-[#1e293b]">{p.title}</span>
                    <Badge label={p.badge} variant="outline" size="sm" />
                  </div>
                  <p className="text-[10.5px] text-[#475569] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Log Terminal */}
      <div className="code-box-2010 text-[10px] space-y-0.5">
        <div className="flex items-center justify-between text-[9px] text-[#64748b] pb-0.5 border-b border-[#cbd5e1]">
          <span className="font-bold text-[#334155]">tWAS 8.5.5 SIBUS ENGINE &amp; PODMAN DB2 LOG // SVT NODE</span>
          <span className="text-[#198038] font-bold">STATUS: PORT 9081 &amp; 50000 LISTENING [OK]</span>
        </div>
        <div className="text-[#0066cc]">
          [wsadmin] Initializing TradeBus SIBus Messaging Engine: jms/TradeBrokerQueue bound to AppServer01.
        </div>
        <div className="text-[#198038]">
          [J2CA0027I] J2C authentication alias (db2inst1) resolved to Podman container svtdb (TRADEDB:50000).
        </div>
      </div>
    </div>
  );
}
