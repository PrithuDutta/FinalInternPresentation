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
  const ppHoursPerApp = 0.9;
  const hoursSaved = (blindHoursPerApp - ppHoursPerApp) * portfolioSize;
  const blindCoins = 27 * portfolioSize;
  const ppCoins = 18 * portfolioSize;
  const coinsSaved = blindCoins - ppCoins;
  const dollarSaved = hoursSaved * 120;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[85vh] bg-[#f8f9fa] border border-[#718096] rounded-[4px] shadow-2xl flex flex-col overflow-hidden select-text font-sans">
        {/* Classic 2010s Window Titlebar */}
        <div className="panel-2010-heading-blue h-10 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#60a5fa] border border-[#2563eb]" />
            <span className="font-bold text-[12.5px] tracking-wide text-white drop-shadow-sm">
              IBM WebSphere Application Server // Diagnostic Telemetry &amp; MCP Console
            </span>
          </div>

          {/* 2010s Segmented Window Tabs */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('mcp')}
              className={`px-2.5 py-0.5 text-[11px] ${
                activeTab === 'mcp' ? 'btn-2010-primary' : 'btn-2010-default'
              }`}
            >
              1. CWWK MCP Server
            </button>
            <button
              onClick={() => setActiveTab('topology')}
              className={`px-2.5 py-0.5 text-[11px] ${
                activeTab === 'topology' ? 'btn-2010-primary' : 'btn-2010-default'
              }`}
            >
              2. SIBus Topology
            </button>
            <button
              onClick={() => setActiveTab('diffs')}
              className={`px-2.5 py-0.5 text-[11px] ${
                activeTab === 'diffs' ? 'btn-2010-primary' : 'btn-2010-default'
              }`}
            >
              3. server.xml Diffs
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-2.5 py-0.5 text-[11px] ${
                activeTab === 'calculator' ? 'btn-2010-primary' : 'btn-2010-default'
              }`}
            >
              4. 33% ROI Calculator
            </button>
          </div>

          <button
            onClick={onClose}
            className="btn-2010-default px-2 py-0.5 text-[11px] font-bold text-[#111111]"
            title="Close [Esc]"
          >
            ✕ Close
          </button>
        </div>

        {/* Window Body */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#fbfcfd]">
          {/* TAB 1: CWWK MCP SERVER */}
          {activeTab === 'mcp' && (
            <div className="space-y-3">
              <div className="callout-2010-info flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[12px] text-[#004480]">
                    Open Liberty CWWK* &amp; CNTR* Diagnostic MCP Server
                  </h4>
                  <p className="text-[11px] text-[#334155]">
                    1,300+ diagnostic error codes scraped and indexed into SQLite database (<code className="font-mono bg-white px-1 border border-[#bce8f1]">liberty_errors.sqlite</code>) with real-time MCP protocol endpoint.
                  </p>
                </div>
                <div className="font-mono text-[10px] font-bold px-2 py-1 bg-white border border-[#bce8f1] text-[#0066cc] rounded-[3px]">
                  STATUS: MCP ACTIVE (PORT 8000)
                </div>
              </div>

              {/* 2010s Search Toolbar */}
              <div className="p-2.5 bg-[#edf2f7] border border-[#cbd5e1] rounded-[3px] flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#334155]">Search Codes / Symptoms:</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="e.g. CNTR0154E, CWWKC2271E, J2CA0027E, JMS, EJB..."
                  className="flex-1 px-2.5 py-1 text-[11.5px] font-mono bg-white border border-[#94a3b8] rounded-[2px] focus:outline-none focus:border-[#0066cc]"
                />
                <span className="text-[10.5px] font-mono text-[#64748b]">
                  Showing {filteredCodes.length} of {CWWK_CODES.length} samples (1,300+ indexed)
                </span>
              </div>

              {/* Results Table */}
              <table className="table-2010">
                <thead>
                  <tr>
                    <th className="w-[12%]">Error Code</th>
                    <th className="w-[10%]">Severity</th>
                    <th className="w-[16%]">Subsystem</th>
                    <th className="w-[30%]">Runtime Symptom</th>
                    <th className="w-[32%]">Remediation XML / Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCodes.map(c => (
                    <tr key={c.code}>
                      <td className="font-mono font-bold text-[#0066cc]">{c.code}</td>
                      <td>
                        <span
                          className={`badge-2010 ${
                            c.severity === 'ERROR'
                              ? 'badge-2010-red'
                              : c.severity === 'WARNING'
                              ? 'badge-2010-yellow'
                              : 'badge-2010-blue'
                          }`}
                        >
                          {c.severity}
                        </span>
                      </td>
                      <td className="font-semibold text-[#334155]">{c.component}</td>
                      <td className="text-[11px] leading-relaxed text-[#222222]">{c.description}</td>
                      <td className="text-[11px] font-mono text-[#005599] leading-relaxed bg-[#f8fafc]">
                        {c.solution}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: SIBUS TOPOLOGY */}
          {activeTab === 'topology' && (
            <div className="space-y-3">
              <div className="callout-2010-info">
                <h4 className="font-bold text-[12px] text-[#004480]">
                  3-Tier Request Lifecycle &amp; WebSphere SIBus Architecture
                </h4>
                <p className="text-[11px] text-[#334155]">
                  Request lifecycle tracing isolating the root cause behind login &amp; messaging failures on WebSphere Liberty.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="panel-2010">
                  <div className="panel-2010-heading">
                    TIER 1: WEB PRESENTATION (JSP/SERVLET)
                  </div>
                  <div className="panel-2010-body space-y-1.5 text-[11px]">
                    <div className="p-1.5 bg-[#f8fafc] border border-[#e2e8f0] font-mono text-[10.5px]">
                      TradeServletAction.doLogin()
                    </div>
                    <p className="text-[#555555]">
                      Receives HTTP login credentials, performs initial validation, and dispatches to business facade layer.
                    </p>
                    <div className="badge-2010 badge-2010-blue">Servlet 6.0 Container</div>
                  </div>
                </div>

                <div className="panel-2010">
                  <div className="panel-2010-heading">
                    TIER 2: BUSINESS LOGIC FACADE (CDI)
                  </div>
                  <div className="panel-2010-body space-y-1.5 text-[11px]">
                    <div className="p-1.5 bg-[#f8fafc] border border-[#e2e8f0] font-mono text-[10.5px]">
                      TradeAction.login()
                    </div>
                    <p className="text-[#555555]">
                      CDI-managed application facade orchestrating trade account verification and persistence lookups.
                    </p>
                    <div className="badge-2010 badge-2010-blue">CDI 4.0 Injection</div>
                  </div>
                </div>

                <div className="panel-2010">
                  <div className="panel-2010-heading" style={{ color: '#c62828' }}>
                    TIER 3: EJB CONTAINER &amp; SIBUS JMS
                  </div>
                  <div className="panel-2010-body space-y-1.5 text-[11px]">
                    <div className="p-1.5 bg-[#ffebee] border border-[#ffcdd2] font-mono text-[10.5px] text-[#c62828] font-bold">
                      TradeSLSBBean.login()
                    </div>
                    <p className="text-[#555555]">
                      Stateless Session Bean with 4 class-level <code className="font-mono">@Resource</code> JMS injections. Container interceptor failed due to missing <code className="font-mono text-[#0066cc]">messagingClient-3.0</code> feature.
                    </p>
                    <div className="badge-2010 badge-2010-red">Root Cause Isolated</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SERVER.XML DIFFS */}
          {activeTab === 'diffs' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-[12px] font-bold text-[#1e293b]">
                  Select Configuration Artifact:
                </div>
                <div className="flex items-center gap-1">
                  {CONFIG_DIFFS.map((diff, idx) => (
                    <button
                      key={diff.file}
                      onClick={() => setSelectedDiffIndex(idx)}
                      className={`px-2.5 py-0.5 text-[11px] ${
                        selectedDiffIndex === idx ? 'btn-2010-primary' : 'btn-2010-default'
                      }`}
                    >
                      {diff.file}
                    </button>
                  ))}
                </div>
              </div>

              <div className="callout-2010-info text-[11px]">
                <strong className="text-[#004480]">Context: </strong>
                {CONFIG_DIFFS[selectedDiffIndex].context}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="panel-2010">
                  <div className="panel-2010-heading" style={{ color: '#b94a48' }}>
                    ▲ FAILING AI-GENERATED CONFIGURATION
                  </div>
                  <pre className="code-box-2010 text-[10px] text-[#b94a48] m-0 border-0 rounded-none bg-[#fffafa]">
                    {CONFIG_DIFFS[selectedDiffIndex].legacyCode}
                  </pre>
                </div>

                <div className="panel-2010">
                  <div className="panel-2010-heading" style={{ color: '#2e7d32' }}>
                    ▼ VERIFIED CLOUD-NATIVE RESOLUTION (JAKARTA 11)
                  </div>
                  <pre className="code-box-2010 text-[10px] text-[#2e7d32] m-0 border-0 rounded-none bg-[#f8fdf9]">
                    {CONFIG_DIFFS[selectedDiffIndex].modernCode}
                  </pre>
                </div>
              </div>

              <div className="callout-2010-success text-[11px]">
                <strong className="text-[#2e7d32]">Root Cause Explanation: </strong>
                {CONFIG_DIFFS[selectedDiffIndex].explanation}
              </div>
            </div>
          )}

          {/* TAB 4: 33% ROI CALCULATOR */}
          {activeTab === 'calculator' && (
            <div className="space-y-3">
              <div className="callout-2010-info">
                <h4 className="font-bold text-[12px] text-[#004480]">
                  Portfolio-Scale AI Modernization Unit Economics Calculator
                </h4>
                <p className="text-[11px] text-[#334155]">
                  Calculates token burn reduction and developer time savings based on our empirical 33% token-cost reduction (27 Bob coins down to 18 coins).
                </p>
              </div>

              <div className="p-3 bg-[#f1f5f9] border border-[#cbd5e1] rounded-[3px] flex items-center gap-3">
                <span className="font-bold text-[11.5px] text-[#1e293b]">Enterprise Application Portfolio Size:</span>
                <input
                  type="range"
                  min="1"
                  max="200"
                  value={portfolioSize}
                  onChange={e => setPortfolioSize(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="font-mono font-bold text-sm text-[#0066cc] bg-white px-2 py-0.5 border border-[#cbd5e1] rounded-[2px]">
                  {portfolioSize} Applications
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 text-center">
                <div className="panel-2010 p-2.5">
                  <div className="text-[10px] font-bold text-[#475569] uppercase">Standard Bob Burn</div>
                  <div className="text-base font-bold font-mono text-[#c62828] mt-1">
                    {blindCoins.toLocaleString()} Coins
                  </div>
                  <div className="text-[9.5px] text-[#64748b]">27 coins / app</div>
                </div>

                <div className="panel-2010 p-2.5">
                  <div className="text-[10px] font-bold text-[#475569] uppercase">Bob PP Burn (33% Gain)</div>
                  <div className="text-base font-bold font-mono text-[#2e7d32] mt-1">
                    {ppCoins.toLocaleString()} Coins
                  </div>
                  <div className="text-[9.5px] text-[#64748b]">18 coins / app</div>
                </div>

                <div className="panel-2010 p-2.5">
                  <div className="text-[10px] font-bold text-[#475569] uppercase">Net Token Savings</div>
                  <div className="text-base font-bold font-mono text-[#0066cc] mt-1">
                    {coinsSaved.toLocaleString()} Coins
                  </div>
                  <div className="text-[9.5px] text-[#64748b]">33.3% token reduction</div>
                </div>

                <div className="panel-2010 p-2.5">
                  <div className="text-[10px] font-bold text-[#475569] uppercase">Estimated Labor Savings</div>
                  <div className="text-base font-bold font-mono text-[#0066cc] mt-1">
                    ${dollarSaved.toLocaleString()}
                  </div>
                  <div className="text-[9.5px] text-[#64748b]">{hoursSaved.toFixed(0)} dev hours</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="h-9 bg-[#e9ecef] border-t border-[#ced4da] px-4 flex items-center justify-between shrink-0 text-[11px] text-[#495057]">
          <span>IBM Systems Verification Testing · Internal Engineering Telemetry</span>
          <button
            onClick={onClose}
            className="btn-2010-default px-3 py-0.5 text-[11px]"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
