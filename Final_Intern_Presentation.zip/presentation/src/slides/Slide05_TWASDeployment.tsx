import { Badge } from '../components/Badge';

const TWAS_STEPS = [
  {
    title: 'Linux VM & GSA Infrastructure',
    code: 'STEP 01',
    points: [
      'Configured remote Red Hat enterprise VM environment.',
      'Navigated complex IBM GSA internal certificate chains to enable IBM Installation Manager.',
      'Constructed tWAS v8.5.5 profile topology (Dmgr, ManagedNode, AppServer01).',
    ],
    badge: 'Red Hat Linux',
  },
  {
    title: 'DB2 in Podman & JNDI Resolution',
    code: 'STEP 02',
    points: [
      'Containerized IBM DB2 in Podman listening on port 50000.',
      'Created J2C authentication alias credentials (db2inst1/password).',
      'Diagnosed & fixed JNDI naming case sensitivity bug (jdbc/TradeDataSource vs JDBC/TradeDataSource).',
    ],
    badge: 'Podman DB2',
  },
  {
    title: 'SIBus JMS Broker & EAR Manifest Patch',
    code: 'STEP 03',
    points: [
      'Constructed Service Integration Bus: TradeBus, TradeBrokerQueue, and TradeStreamerTopic.',
      'Defined MDB activation specs (eis/TradeBrokerMDB, eis/TradeStreamerMDB).',
      'Patched DT7 EAR manifest directly via VIM to add missing @Resource annotation on ManagedScheduledExecutorService.',
    ],
    badge: 'JMS / SIBus',
  },
];

export function Slide05_TWASDeployment() {
  return (
    <div className="w-full h-full bg-white p-8 sm:p-10 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
        <div>
          <div className="text-[0.62rem] font-mono font-bold tracking-[2px] uppercase text-[#0f62fe]">
            ACT 2 // HANDS-ON REPLATFORMING · BASELINE
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#161616] tracking-tight font-sans">
            Workstream 01: Baseline tWAS Reference Deployment
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="tWAS v8.5.5" variant="blue" size="sm" />
          <Badge label="DB2 Podman" variant="blue" size="sm" />
          <Badge label="Verified Baseline ✓" variant="green" size="sm" />
        </div>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto py-2">
        {TWAS_STEPS.map(s => (
          <div
            key={s.code}
            className="p-4 bg-[#f4f4f4] border border-[#e0e0e0] flex flex-col justify-between hover:border-[#0f62fe] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2 border-b border-[#e0e0e0] pb-1.5">
                <span className="text-[0.62rem] font-mono font-bold text-[#0f62fe]">
                  {s.code}
                </span>
                <Badge label={s.badge} variant="outline" size="sm" />
              </div>
              <h3 className="text-xs font-bold text-[#161616] mb-2">{s.title}</h3>
              <ul className="space-y-1.5">
                {s.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-[0.68rem] text-[#525252] leading-relaxed">
                    <span className="text-[#0f62fe] font-bold shrink-0 font-mono">▸</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Telemetry Log Terminal */}
      <div className="p-3 bg-[#f4f4f4] border border-[#e0e0e0] font-mono text-[0.68rem] space-y-1 text-[#161616]">
        <div className="flex items-center justify-between text-[0.6rem] text-[#525252] pb-1 border-b border-[#e0e0e0]">
          <span>tWAS 8.5.5 SYSTEMOUT.LOG // SVT REFERENCE NODE</span>
          <span className="text-[#198038] font-bold">STATUS: PORT 9081 LISTENING [OK]</span>
        </div>
        <div className="text-[#0f62fe]">
          [wsadmin] Initializing TradeBus SIBus Messaging Engine on Node01/AppServer01...
        </div>
        <div className="text-[#198038]">
          [J2CA0027I] Datasource jdbc/TradeDataSource bound successfully to Podman DB2 (TRADEDB:50000).
        </div>
        <div className="text-[#525252]">
          [DT7-INIT] Trade population script executed: 500 users, 1,000 quotes created. Baseline verified.
        </div>
      </div>
    </div>
  );
}

