import { Badge } from '../components/Badge';

export function Slide03_ContainerForensics() {
  return (
    <div className="slide-surface select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#d0d5dd] pb-2.5">
        <div>
          <div className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-[#0f62fe]">
            SLIDE 03 // SYSTEMS FORENSICS
          </div>
          <h2>
            Deep Systems Debugging: EJB Container Lifecycle & CDI Faults
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="EJB 3.2 Interception" variant="blue" size="sm" />
          <Badge label="Root Cause Isolated ✓" variant="green" size="sm" />
        </div>
      </div>

      {/* 2 Main Forensic Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-auto py-1">
        {/* Left Column: The Bug & Request Flow */}
        <div className="p-3.5 bg-[#fff5f5] border border-[#ffcccc] flex flex-col justify-between space-y-2.5">
          <div>
            <div className="flex items-center justify-between mb-1.5 border-b border-[#ffcccc] pb-1">
              <span className="text-[11px] font-mono font-bold text-[#d9534f] uppercase">
                ▲ THE BUG: CASCADING FAILURES & NPE RED HERRINGS
              </span>
              <Badge label="Login Crash" variant="red" size="sm" />
            </div>

            <div className="p-2 bg-white border border-[#ffcccc] font-mono text-[9.5px] text-[#d9534f] space-y-0.5 mb-2">
              <div>java.lang.NullPointerException</div>
              <div className="text-[#555555] pl-2">at org.apache.jsp._error_jsp._jspService (_error.jsp:32)</div>
              <div className="text-[#555555] pl-2">at com.ibm.websphere.samples.daytrader.web.TradeServletAction.doLogin()</div>
              <div className="text-[#d9534f] font-bold pl-2">&gt;&gt; Exception object passed to _error.jsp was NULL (NPE on printStackTrace)</div>
            </div>

            <h4 className="text-[11.5px] font-bold text-[#161616] mb-1">
              Request Flow Across 3 Tiers:
            </h4>
            <div className="p-2 bg-white border border-[#d0d5dd] font-mono text-[10px] text-[#161616] space-y-0.5">
              <div className="text-[#0f62fe]">1. TradeServletAction.doLogin() <span className="text-[#555555]">[Presentation]</span></div>
              <div className="text-[#0f62fe] pl-3">↳ 2. TradeAction.login() <span className="text-[#555555]">[Business Facade]</span></div>
              <div className="text-[#d9534f] font-bold pl-6">↳ 3. TradeSLSBBean.login() <span className="text-[#d9534f]">[EJB Container Abort]</span></div>
            </div>

            <p className="text-[10.5px] text-[#555555] leading-relaxed mt-2">
              AI-assisted migration initially blamed application-level Java code and tried to refactor standard source files, failing to recognize container interception.
            </p>
          </div>
        </div>

        {/* Right Column: The Mechanism & Root Cause */}
        <div className="p-3.5 bg-[#f4fbf6] border border-[#c3e6cb] flex flex-col justify-between space-y-2.5">
          <div>
            <div className="flex items-center justify-between mb-1.5 border-b border-[#c3e6cb] pb-1">
              <span className="text-[11px] font-mono font-bold text-[#28a745] uppercase">
                ▼ THE MECHANISM & ISOLATED ROOT CAUSE
              </span>
              <Badge label="Resolved ✓" variant="green" size="sm" />
            </div>

            <div className="space-y-1.5 text-[10.5px] text-[#161616]">
              <div className="p-2 bg-white border border-[#c3e6cb]">
                <strong className="text-[#28a745]">EJB Container Interception:</strong> TradeSLSBBean is a Stateless Session Bean with 4 class-level <code className="text-[#0f62fe] font-mono">@Resource</code> JMS injections (including <code className="text-[#0f62fe] font-mono">jms/TopicConnectionFactory</code>). OpenLiberty intercepts method calls and resolves all JNDI bindings <em>before</em> bean execution.
              </div>

              <div className="p-2 bg-white border border-[#c3e6cb]">
                <strong className="text-[#28a745]">The True Root Cause:</strong> <code className="text-[#0f62fe] font-mono">server.xml</code> included <code className="text-[#0f62fe] font-mono">messagingServer-3.0</code> but omitted <code className="text-[#0f62fe] font-mono">messagingClient-3.0</code>. The missing client feature caused JNDI lookups to fail, throwing a <code className="text-[#d9534f] font-mono">jakarta.ejb.EJBException</code> and aborting bean provisioning before line 1 of <code className="text-[#0f62fe] font-mono">login()</code> ever ran.
              </div>

              <div className="p-2 bg-white border border-[#c3e6cb]">
                <strong className="text-[#28a745]">Socket Collision Diagnosis:</strong> Diagnosed silent JMS messaging engine aborts during <code className="text-[#0f62fe] font-mono">mvn liberty:dev</code> hot-reloads caused by orphaned background Java processes locking <code className="text-[#d9534f] font-mono">JMSPort 7276</code>.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="p-2.5 bg-[#edf5ff] border border-[#a6c8ff] flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#0f62fe]" />
          <span className="text-[#161616] font-semibold text-[11px]">
            Adding &lt;feature&gt;messagingClient-3.0&lt;/feature&gt; restored EJB container injection and resolved login sequence.
          </span>
        </div>
        <div className="text-[#198038] font-bold text-[11px]">
        </div>
      </div>
    </div>
  );
}
