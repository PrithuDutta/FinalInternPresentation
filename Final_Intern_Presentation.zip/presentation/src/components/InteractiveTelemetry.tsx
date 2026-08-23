import { useState } from 'react';
import { CWWK_CODES, CONFIG_DIFFS } from '../data';

interface InteractiveTelemetryProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'mcp' | 'topology' | 'diffs' | 'calculator';

export function InteractiveTelemetry({ isOpen, onClose }: InteractiveTelemetryProps) {
  const [activeTab, setActiveTab] = useState<TabType>('mcp');
  const [searchQuery, setSearchQuery] = useState('');
  const [portfolioSize, setPortfolioSize] = useState(50);
  const [selectedDiffIndex, setSelectedDiffIndex] = useState(0);

  if (!isOpen) return null;

  const filteredCodes = CWWK_CODES.filter(
    c =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.component.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ROI Calculator Math
  const blindHoursPerApp = 35;
  const ppHoursPerApp = 0.9; // 54 min
  const hoursSaved = (blindHoursPerApp - ppHoursPerApp) * portfolioSize;
  const blindCoins = 90 * portfolioSize;
  const ppCoins = 18 * portfolioSize;
  const coinsSaved = blindCoins - ppCoins;
  const dollarSaved = hoursSaved * 120; // $120/hr enterprise dev cost

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[85vh] bg-white border border-[#c6c6c6] shadow-2xl flex flex-col overflow-hidden select-text">
        {/* Modal Header */}
        <div className="h-12 bg-[#f4f4f4] border-b border-[#e0e0e0] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#0f62fe]" />
            <span className="font-mono font-bold text-xs tracking-wider text-[#161616] uppercase">
              IBM SVT // DIAGNOSTIC & TELEMETRY MODULE
            </span>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 font-mono text-xs">
            <button
              onClick={() => setActiveTab('mcp')}
              className={`px-3 py-1.5 transition-colors ${
                activeTab === 'mcp'
                  ? 'bg-[#0f62fe] text-white font-bold'
                  : 'bg-white text-[#525252] hover:text-[#161616] border border-[#e0e0e0]'
              }`}
            >
              1. CWWK MCP Server
            </button>
            <button
              onClick={() => setActiveTab('topology')}
              className={`px-3 py-1.5 transition-colors ${
                activeTab === 'topology'
                  ? 'bg-[#0f62fe] text-white font-bold'
                  : 'bg-white text-[#525252] hover:text-[#161616] border border-[#e0e0e0]'
              }`}
            >
              2. SIBus Topology
            </button>
            <button
              onClick={() => setActiveTab('diffs')}
              className={`px-3 py-1.5 transition-colors ${
                activeTab === 'diffs'
                  ? 'bg-[#0f62fe] text-white font-bold'
                  : 'bg-white text-[#525252] hover:text-[#161616] border border-[#e0e0e0]'
              }`}
            >
              3. server.xml Diffs
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3 py-1.5 transition-colors ${
                activeTab === 'calculator'
                  ? 'bg-[#0f62fe] text-white font-bold'
                  : 'bg-white text-[#525252] hover:text-[#161616] border border-[#e0e0e0]'
              }`}
            >
              4. ROI Calculator
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#525252] hover:text-[#161616] hover:bg-[#e0e0e0] text-xs font-mono"
            title="Close [Esc]"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {/* TAB 1: CWWK MCP SERVER SIMULATOR */}
          {activeTab === 'mcp' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
                <div>
                  <h4 className="text-sm font-bold text-[#161616]">
                    Liberty Diagnostic Knowledge Base (MCP Protocol Endpoint)
                  </h4>
                  <p className="text-xs text-[#525252]">
                    Structured database queried by Bob AI and WatsonX to ground runtime code refactorings.
                  </p>
                </div>
                <div className="w-72">
                  <input
                    type="text"
                    placeholder="Search error code (e.g. CNTR, CWWK, J2CA)..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#f4f4f4] border border-[#c6c6c6] text-[#161616] text-xs font-mono placeholder:text-[#8d8d8d] focus:outline-none focus:border-[#0f62fe]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredCodes.map(item => (
                  <div
                    key={item.code}
                    className="p-3 bg-[#f4f4f4] border border-[#e0e0e0] space-y-2 hover:border-[#0f62fe] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#0f62fe]">
                          {item.code}
                        </span>
                        <span
                          className={`text-[0.6rem] px-1.5 py-0.5 font-mono font-bold ${
                            item.severity === 'ERROR'
                              ? 'bg-[#fff1f1] text-[#da1e28] border border-[#ff8389]'
                              : 'bg-[#defbe6] text-[#198038] border border-[#6fdc8c]'
                          }`}
                        >
                          {item.severity}
                        </span>
                      </div>
                      <span className="text-[0.65rem] font-mono text-[#525252]">
                        {item.component}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-[#161616]">{item.title}</div>
                    <div className="text-[0.72rem] text-[#161616] font-mono bg-white p-2 border border-[#e0e0e0]">
                      {item.description}
                    </div>

                    <div className="text-[0.72rem] text-[#198038] bg-[#defbe6] p-2 border border-[#6fdc8c]">
                      <span className="font-bold">MCP Remediation: </span>
                      {item.solution}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SIBUS ARCHITECTURE TOPOLOGY */}
          {activeTab === 'topology' && (
            <div className="space-y-6">
              <div className="border-b border-[#e0e0e0] pb-3">
                <h4 className="text-sm font-bold text-[#161616]">
                  DayTrader 7 Enterprise Topology (tWAS & OpenLiberty)
                </h4>
                <p className="text-xs text-[#525252]">
                  Container messaging, EJB transaction boundaries, and DB2 connection pooling.
                </p>
              </div>

              {/* Visual Block Topology */}
              <div className="grid grid-cols-5 gap-3 font-mono text-xs text-center">
                <div className="p-4 bg-[#f4f4f4] border border-[#e0e0e0] flex flex-col justify-center items-center">
                  <div className="text-[#0f62fe] font-bold mb-1">[ Web Tier ]</div>
                  <div className="text-[0.7rem] text-[#161616]">JSP & Servlets</div>
                  <div className="text-[0.6rem] text-[#525252] mt-1">HTTP /:9080</div>
                </div>

                <div className="flex items-center justify-center text-[#0f62fe] text-lg font-bold">
                  ──► CDI ──►
                </div>

                <div className="p-4 bg-[#edf5ff] border border-[#a6c8ff] flex flex-col justify-center items-center">
                  <div className="text-[#0f62fe] font-bold mb-1">[ EJB Container ]</div>
                  <div className="text-[0.7rem] text-[#161616] font-semibold">TradeSLSBBean</div>
                  <div className="text-[0.6rem] text-[#198038] mt-1">Stateless Session</div>
                </div>

                <div className="flex items-center justify-center text-[#0f62fe] text-lg font-bold">
                  ──► JMS ──►
                </div>

                <div className="p-4 bg-[#f4f4f4] border border-[#e0e0e0] flex flex-col justify-center items-center">
                  <div className="text-[#161616] font-bold mb-1">[ SIBus / MDB ]</div>
                  <div className="text-[0.7rem] text-[#161616]">TradeBrokerQueue</div>
                  <div className="text-[0.6rem] text-[#525252] mt-1">eis/TradeBrokerMDB</div>
                </div>
              </div>

              <div className="p-4 bg-[#edf5ff] border border-[#a6c8ff] space-y-2">
                <div className="text-xs font-mono font-bold text-[#0f62fe] uppercase">
                  CONTAINER DEPENDENCY INSIGHT
                </div>
                <p className="text-xs text-[#161616] leading-relaxed">
                  When migrating from tWAS to Liberty, the EJB container performs JNDI resolution of all injected <code className="text-[#0f62fe] font-mono">@Resource QueueConnectionFactory</code> references. If <code className="text-[#0f62fe] font-mono">&lt;feature&gt;messagingClient-3.0&lt;/feature&gt;</code> is absent from <code className="text-[#0f62fe] font-mono">server.xml</code>, bean initialization fails silently, setting the injected bean proxy to <code className="text-[#da1e28] font-mono">null</code>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CONFIG DIFFS */}
          {activeTab === 'diffs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
                <div>
                  <h4 className="text-sm font-bold text-[#161616]">
                    Runtime Configuration Diff Inspector
                  </h4>
                  <p className="text-xs text-[#525252]">
                    Comparing Bob AI generated configs against final verified production configs.
                  </p>
                </div>
                <div className="flex gap-2">
                  {CONFIG_DIFFS.map((diff, idx) => (
                    <button
                      key={diff.file}
                      onClick={() => setSelectedDiffIndex(idx)}
                      className={`px-3 py-1 text-xs font-mono ${
                        selectedDiffIndex === idx
                          ? 'bg-[#0f62fe] text-white font-bold'
                          : 'bg-[#f4f4f4] text-[#161616] border border-[#e0e0e0]'
                      }`}
                    >
                      {diff.file.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-mono font-bold text-[#da1e28] mb-1">
                    ▲ BEFORE (AI Model Incomplete Config)
                  </div>
                  <pre className="p-3 bg-[#fff1f1] border border-[#ff8389] text-[0.7rem] text-[#da1e28] font-mono overflow-x-auto whitespace-pre-wrap">
                    {CONFIG_DIFFS[selectedDiffIndex].legacyCode}
                  </pre>
                </div>

                <div>
                  <div className="text-xs font-mono font-bold text-[#198038] mb-1">
                    ▼ AFTER (Verified Production Deployment)
                  </div>
                  <pre className="p-3 bg-[#defbe6] border border-[#6fdc8c] text-[0.7rem] text-[#198038] font-mono overflow-x-auto whitespace-pre-wrap">
                    {CONFIG_DIFFS[selectedDiffIndex].modernCode}
                  </pre>
                </div>
              </div>

              <div className="p-3 bg-[#edf5ff] border border-[#a6c8ff] text-xs text-[#161616]">
                <span className="font-bold text-[#0f62fe]">Root Cause & Fix: </span>
                {CONFIG_DIFFS[selectedDiffIndex].explanation}
              </div>
            </div>
          )}

          {/* TAB 4: ROI CALCULATOR */}
          {activeTab === 'calculator' && (
            <div className="space-y-6 max-w-2xl mx-auto py-2">
              <div className="text-center border-b border-[#e0e0e0] pb-3">
                <h4 className="text-base font-bold text-[#161616]">
                  Enterprise Modernization ROI Simulator
                </h4>
                <p className="text-xs text-[#525252]">
                  Projecting Bob Premium Package time & token savings across enterprise application portfolios.
                </p>
              </div>

              <div className="p-4 bg-[#f4f4f4] border border-[#e0e0e0] space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#161616] font-semibold">Portfolio Application Count:</span>
                  <span className="text-base font-bold text-[#0f62fe]">
                    {portfolioSize} Applications
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="300"
                  step="5"
                  value={portfolioSize}
                  onChange={e => setPortfolioSize(Number(e.target.value))}
                  className="w-full accent-[#0f62fe]"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 text-center font-mono">
                <div className="p-4 bg-[#f4f4f4] border border-[#e0e0e0]">
                  <div className="text-xs text-[#525252] uppercase font-semibold">Dev Time Saved</div>
                  <div className="text-2xl font-bold text-[#198038] my-1">
                    {hoursSaved.toLocaleString()} hrs
                  </div>
                  <div className="text-[0.65rem] text-[#8d8d8d]">~{(hoursSaved / 160).toFixed(1)} Man-Months</div>
                </div>

                <div className="p-4 bg-[#f4f4f4] border border-[#e0e0e0]">
                  <div className="text-xs text-[#525252] uppercase font-semibold">Bob Coins Saved</div>
                  <div className="text-2xl font-bold text-[#0f62fe] my-1">
                    {coinsSaved.toLocaleString()}
                  </div>
                  <div className="text-[0.65rem] text-[#8d8d8d]">80% Token Reduction</div>
                </div>

                <div className="p-4 bg-[#f4f4f4] border border-[#e0e0e0]">
                  <div className="text-xs text-[#525252] uppercase font-semibold">Cost Equivalent</div>
                  <div className="text-2xl font-bold text-[#161616] my-1">
                    ${(dollarSaved / 1000).toFixed(0)}k
                  </div>
                  <div className="text-[0.65rem] text-[#8d8d8d]">At $120/hr blended rate</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="h-10 bg-[#f4f4f4] border-t border-[#e0e0e0] px-6 flex items-center justify-between text-[0.7rem] font-mono text-[#525252] shrink-0">
          <span>IBM Systems Verification Testing · Telemetry Demonstration</span>
          <span>Press [Esc] or [D] to exit</span>
        </div>
      </div>
    </div>
  );
}

