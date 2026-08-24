import { Badge } from '../components/Badge';

export function Slide06_LibertyRootCause() {
  return (
    <div className="w-full h-full bg-white p-8 sm:p-10 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
        <div>
          <div className="text-[0.62rem] font-mono font-bold tracking-[2px] uppercase text-[#0f62fe]">
            ACT 2 // HANDS-ON REPLATFORMING · LIBERTY FORENSICS
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#161616] tracking-tight font-sans">
            Workstream 02: 3-Layer Request Lifecycle Tracing & EJB Root Cause
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="WebSphere Liberty (Java 21)" variant="blue" size="sm" />
          <Badge label="Jakarta EE 10" variant="blue" size="sm" />
        </div>
      </div>

      {/* 2-Column Forensic Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-auto py-2">
        {/* Left: The Symptom & Misleading Failure */}
        <div className="p-4 bg-[#fff1f1] border border-[#ff8389] flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2 border-b border-[#ff8389]/40 pb-1.5">
              <span className="text-[0.62rem] font-mono font-bold text-[#da1e28] uppercase">
                ▲ LAYER 1 & 2: THE MISLEADING SYMPTOM (19 BLIND ATTEMPTS)
              </span>
              <Badge label="Login & Messaging Crash" variant="red" size="sm" />
            </div>

            <h3 className="text-xs font-bold text-[#161616] mb-2">
              NullPointerException at tradehome.jsp:47 on Login
            </h3>

            <div className="p-2.5 bg-white border border-[#ff8389] font-mono text-[0.65rem] text-[#da1e28] space-y-1 mb-3">
              <div>java.lang.NullPointerException</div>
              <div className="text-[#525252] pl-2">at org.apache.jsp.tradehome_jsp._jspService (tradehome.jsp:47)</div>
              <div className="text-[#525252] pl-2">at com.ibm.websphere.samples.daytrader.web.TradeAction.login()</div>
              <div className="text-[#da1e28] font-bold pl-2">&gt;&gt; Injected TradeSLSBBean was NULL during CDI proxy execution</div>
            </div>

            <p className="text-[0.7rem] text-[#525252] leading-relaxed">
              Standard AI models attempted 19 failed code refactorings on the JSP and Java controllers. The exception trace pointed to the presentation layer, but the code itself was valid.
            </p>
          </div>
        </div>

        {/* Right: The Actual Root Cause & Solution */}
        <div className="p-4 bg-[#defbe6] border border-[#6fdc8c] flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2 border-b border-[#6fdc8c]/40 pb-1.5">
              <span className="text-[0.62rem] font-mono font-bold text-[#198038] uppercase">
                ▼ LAYER 3: EJB CONTAINER INJECTION & ISOLATED ROOT CAUSE
              </span>
              <Badge label="Isolated & Resolved ✓" variant="green" size="sm" />
            </div>

            <h3 className="text-xs font-bold text-[#161616] mb-2">
              Missing Messaging Feature in Server Configuration
            </h3>

            <ul className="space-y-2 text-[0.7rem] text-[#161616]">
              <li className="flex items-start gap-2">
                <span className="text-[#198038] font-bold font-mono">1.</span>
                <span>
                  <strong>Missing Messaging Feature:</strong> The EJB container aborted bean instantiation because <code className="text-[#0f62fe] font-mono">&lt;feature&gt;messagingClient-3.0&lt;/feature&gt;</code> was omitted in <code className="text-[#0f62fe] font-mono">server.xml</code>, preventing JMS ConnectionFactory injection.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#198038] font-bold font-mono">2.</span>
                <span>
                  <strong>CNTR0154E Remote Conflict:</strong> Separated duplicate <code className="text-[#0f62fe] font-mono">@Remote</code> and <code className="text-[#0f62fe] font-mono">@Local</code> interface declarations on <code className="text-[#0f62fe] font-mono">TradeSLSBBean</code>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#198038] font-bold font-mono">3.</span>
                <span>
                  <strong>DB2 Shared Lib:</strong> Bound <code className="text-[#0f62fe] font-mono">db2jcc4.jar</code> in Liberty shared library and verified full order execution on Java 21 / Jakarta 10.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Verification Note */}
      <div className="p-3 bg-[#edf5ff] border border-[#a6c8ff] flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#198038]" />
          <span className="text-[#161616] font-semibold">
            Replatforming Verified: Request lifecycle traced across all 3 layers; full trading active on Java 21
          </span>
        </div>
        <div className="text-[#198038] font-bold">
        </div>
      </div>
    </div>
  );
}


