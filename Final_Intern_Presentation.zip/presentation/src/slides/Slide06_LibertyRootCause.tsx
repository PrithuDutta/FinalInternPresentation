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
            Workstream 02: Liberty Container Forensics & EJB Root Cause
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="OpenLiberty 25.0" variant="blue" size="sm" />
          <Badge label="Approved by Monica ✓" variant="green" size="sm" />
        </div>
      </div>

      {/* 2-Column Forensic Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-auto py-2">
        {/* Left: The Symptom & Misleading Failure */}
        <div className="p-4 bg-[#fff1f1] border border-[#ff8389] flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2 border-b border-[#ff8389]/40 pb-1.5">
              <span className="text-[0.62rem] font-mono font-bold text-[#da1e28] uppercase">
                ▲ THE MISLEADING SYMPTOM (19 BLIND ITERATIONS)
              </span>
              <Badge label="Frontend Crash" variant="red" size="sm" />
            </div>

            <h3 className="text-xs font-bold text-[#161616] mb-2">
              NullPointerException at tradehome.jsp:47
            </h3>

            <div className="p-2.5 bg-white border border-[#ff8389] font-mono text-[0.65rem] text-[#da1e28] space-y-1 mb-3">
              <div>java.lang.NullPointerException</div>
              <div className="text-[#525252] pl-2">at org.apache.jsp.tradehome_jsp._jspService</div>
              <div className="text-[#525252] pl-2">at com.ibm.websphere.samples.daytrader.web.TradeAction.login()</div>
              <div className="text-[#da1e28] font-bold pl-2">&gt;&gt; TradeSLSBBean was NULL during CDI injection</div>
            </div>

            <p className="text-[0.7rem] text-[#525252] leading-relaxed">
              Bob AI attempted to rewrite the JSP and Java controllers 19 times without success. It hallucinated null checks because it could not inspect Liberty container lifecycle logs.
            </p>
          </div>
        </div>

        {/* Right: The Actual Root Cause & Solution */}
        <div className="p-4 bg-[#defbe6] border border-[#6fdc8c] flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2 border-b border-[#6fdc8c]/40 pb-1.5">
              <span className="text-[0.62rem] font-mono font-bold text-[#198038] uppercase">
                ▼ THE TRUE ROOT CAUSE & LIBERTY RESOLUTION
              </span>
              <Badge label="Resolved ✓" variant="green" size="sm" />
            </div>

            <h3 className="text-xs font-bold text-[#161616] mb-2">
              Container EJB Lifecycle Aborted by Missing Feature
            </h3>

            <ul className="space-y-2 text-[0.7rem] text-[#161616]">
              <li className="flex items-start gap-2">
                <span className="text-[#198038] font-bold font-mono">1.</span>
                <span>
                  <strong>Missing messagingClient-3.0:</strong> Liberty could not resolve JMS connection factory resources injected into <code className="text-[#0f62fe] font-mono">TradeSLSBBean</code>, causing CDI to abort bean initialization.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#198038] font-bold font-mono">2.</span>
                <span>
                  <strong>CNTR0154E Remote Collision:</strong> Stripped duplicate remote/local interface annotations injected by automated LLM tools.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#198038] font-bold font-mono">3.</span>
                <span>
                  <strong>Driver Binding:</strong> Copied <code className="text-[#0f62fe] font-mono">db2jcc4.jar</code> into Liberty <code className="text-[#0f62fe] font-mono">lib/</code> directory and removed spurious <code className="text-[#da1e28] font-mono">appSecurity-5.0</code>.
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
            OpenLiberty Replatforming Fully Verified: All DT7 trading operations active on Java 25
          </span>
        </div>
        <div className="text-[#198038] font-bold">
          DEPLOYMENT APPROVED BY MONICA ✓
        </div>
      </div>
    </div>
  );
}

