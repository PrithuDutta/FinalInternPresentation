import { Badge } from '../components/Badge';

const PACKAGING_PILLARS = [
  {
    title: 'Parameterized Configuration as Code',
    desc: 'Refactored AI-generated Maven pom.xml and OpenLiberty server.xml files, eliminating hardcoded user paths and replacing them with parameterized environment variables (${env.DB2_HOST:-localhost}).',
    badge: 'Config as Code',
  },
  {
    title: 'CNTR0154E EJB Interface Separation',
    desc: 'Resolved fatal EJB remote interface mismatch warnings (CNTR0154E) on TradeSLSBBean and TradeSLSBRemote by separating duplicate method annotations into discrete interface tiers.',
    badge: 'CNTR0154E Fix',
  },
  {
    title: 'Stripped Dead Security Artifacts',
    desc: 'Stripped unnecessary, auto-injected security artifacts (appSecurity-5.0) to eliminate artificial authentication bottlenecks during high-throughput benchmarking workloads.',
    badge: 'appSecurity Stripped',
  },
];

const DRIVER_PILLARS = [
  {
    title: 'Podman DB2 Driver Extraction',
    desc: 'Extracted native DB2 JDBC driver (db2jcc4.jar) directly from active Podman containers (/opt/ibm/db2/V12.1/java/db2jcc4.jar) and injected it into Liberty library (${server.config.dir}/lib/db2jcc4.jar).',
    badge: 'db2jcc4.jar',
  },
  {
    title: 'Preserved Java SE JDBC Namespaces',
    desc: 'Preserved standard Java SE JDBC API packages (javax.sql.ConnectionPoolDataSource) against incorrect automated AST conversions into non-existent jakarta.sql namespaces.',
    badge: 'javax.sql Integrity',
  },
];

export function Slide04_CloudDeployment() {
  return (
    <div className="slide-surface select-none font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-2">
        <div>
          <div className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-[#0066cc]">
            SLIDE 04 // CLOUD PACKAGING
          </div>
          <h2>
            Remote Cloud-Native Deployment &amp; AST Sanitization
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="Maven & Liberty Config" variant="blue" size="sm" />
          <Badge label="AST Sanitized" variant="dark" size="sm" />
        </div>
      </div>

      {/* 2 Main Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-auto py-0.5">
        {/* Left: Configuration as Code & Packaging */}
        <div className="panel-2010 flex flex-col justify-between">
          <div>
            <div className="panel-2010-heading flex items-center justify-between">
              <span className="text-[#004480]">01. CONFIGURATION AS CODE &amp; PACKAGING</span>
              <Badge label="Build & Config" variant="blue" size="sm" />
            </div>
            <div className="p-2 space-y-1.5 bg-[#f8fafc]">
              {PACKAGING_PILLARS.map(p => (
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

        {/* Right: Container Driver Injection & Namespace Integrity */}
        <div className="panel-2010 flex flex-col justify-between">
          <div>
            <div className="panel-2010-heading flex items-center justify-between">
              <span className="text-[#004480]">02. DRIVER INJECTION &amp; NAMESPACE INTEGRITY</span>
              <Badge label="Runtime Libs" variant="dark" size="sm" />
            </div>
            <div className="p-2 space-y-1.5 bg-[#f8fafc]">
              {DRIVER_PILLARS.map(p => (
                <div key={p.title} className="p-2 bg-white border border-[#cbd5e1] rounded-[2px] shadow-xs">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[11.5px] font-bold text-[#1e293b]">{p.title}</span>
                    <Badge label={p.badge} variant="outline" size="sm" />
                  </div>
                  <p className="text-[10.5px] text-[#475569] leading-relaxed">{p.desc}</p>
                </div>
              ))}

              {/* XML Snippet */}
              <div className="code-box-2010 text-[9.5px]">
                <div className="text-[9px] text-[#0066cc] font-bold pb-0.5 mb-0.5 border-b border-[#cbd5e1]">
                  SERVER.XML // EXTRACTED DB2 SHARED LIBRARY
                </div>
                <div className="text-[#64748b]">&lt;library id="DB2Lib"&gt;</div>
                <div className="text-[#198038] pl-2">&lt;fileset dir="$&#123;server.config.dir&#125;/lib" includes="db2jcc4.jar"/&gt;</div>
                <div className="text-[#64748b]">&lt;/library&gt;</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="callout-2010-info flex items-center justify-between text-xs font-mono py-1.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#198038]" />
          <span className="text-[#1e293b] font-semibold text-[11px]">
            All AI-generated artifacts sanitized; verified reproducible build on OpenLiberty.
          </span>
        </div>
        <div className="text-[#64748b] text-[10.5px] hidden sm:block">
          SVT CLOUD-NATIVE DEPLOYMENT
        </div>
      </div>
    </div>
  );
}
