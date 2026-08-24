import type {
  TimelinePhase,
  WorkstreamCard,
  MetricRow,
  ContributionItem,
  GoalItem,
  CWWKCode,
  ConfigDiffItem,
  SpeakerNotes,
} from './types';

// ==========================================
// 1. SLIDE SPEAKER NOTES (15–20 MIN PACING)
// ==========================================
export const SLIDE_NOTES: Record<string, SpeakerNotes> = {
  title: {
    timingTarget: '1:00 min',
    targetSeconds: 60,
    keyTakeaway: 'Introduction to DayTrader 7 Modernization from tWAS (Java EE 7) to WebSphere Liberty (Jakarta EE 11) and Enterprise AI Tooling.',
    talkingPoints: [
      'Welcome mentors Monica, Dan, Brian, Jag, and members of the IBM Systems Verification Testing (SVT) team.',
      'On behalf of our SVT intern team (Prithu Dutta, Alan Yuen, Mars Huang), today we present our engineering work on modernizing DayTrader 7 from legacy Java EE 7 on traditional WebSphere (tWAS) to Jakarta EE 11 on cloud-native OpenLiberty/WebSphere Liberty.',
      'We will walk through deep EJB container forensics, remote Linux/DB2 provisioning, auditing IBM enterprise AI migration tools (Plain Bob vs Bob PP), building an MCP server for 1,300+ OpenLiberty diagnostic codes, and architecting an autonomous multi-agent modernization engine.',
    ],
    transitionCue: 'Let us start with the executive summary and project landscape.',
    anticipatedQuestions: [
      {
        q: 'What makes DayTrader 7 the ideal enterprise modernization testbed?',
        a: 'DayTrader 7 is a comprehensive enterprise monolith containing Servlets, CDI injection, EJB 3.2 Stateless Session Beans, SIBus JMS messaging MDBs, and DB2 persistence — hitting every major subsystem an enterprise migration will encounter.',
      },
    ],
  },

  summary: {
    timingTarget: '2:00 min',
    targetSeconds: 120,
    keyTakeaway: 'High-level mission and impact: 33% token-cost reduction, 1,300+ error codes indexed, 5+ critical container fixes, and 6 cross-functional presentations.',
    talkingPoints: [
      'The Mission: Modernized mission-critical enterprise workloads from legacy Java EE 7 on tWAS to Jakarta EE 11 on cloud-native OpenLiberty/WebSphere Liberty.',
      'Audited and benchmarked IBM enterprise AI modernization toolchains: AMA Dev Tools, Plain Bob AI, and Bob Premium Package.',
      '33% Token-Cost Reduction: Discovered and quantified token-cost savings between Plain Bob AI (27 Bob coins) and Bob Premium Package (18 Bob coins).',
      '1,300+ Error Codes Structured: Scraped and indexed the complete OpenLiberty diagnostic catalog into an optimized SQLite database for real-time AI agent retrieval.',
      '5+ Critical Integration Fixes: Solved foundational CDI, JDBC, SIBus, and JNDI container crashes to achieve fully validated cloud-native deployments.',
      '6 Cross-Functional Presentations: Delivered migration telemetry and product viability analyses directly to Product Managers and engineers across IBM Cloud, OpenShift, and GPU teams.',
    ],
    transitionCue: 'Let us dive into the baseline infrastructure setup on traditional WebSphere.',
    anticipatedQuestions: [
      {
        q: 'Who attended the 6 cross-functional presentations?',
        a: 'Product Managers and engineering leads across IBM Cloud, OpenShift dev teams, GPU infrastructure groups, and the Bob AI product management team.',
      },
    ],
  },

  twasBaseline: {
    timingTarget: '2:30 min',
    targetSeconds: 150,
    keyTakeaway: 'Automated tWAS provisioning on remote Linux VM, Podman DB2 (svtdb:50000), SIBus messaging topology, and JNDI MDB activation specs.',
    talkingPoints: [
      'Linux VM & Automated tWAS: Automated enterprise tWAS deployment on remote Linux virtual machines via IBM Installation Manager (./imcl), resolving intermediate and root SSL certificate trust chains.',
      'Topology Architecture: Federated application servers, managed nodes, and node agents into a centralized Deployment Manager (Dmgr) architecture.',
      'Ephemeral DB2 in Podman: Orchestrated IBM DB2 containers (container svtdb, port 50000, database TRADEDB) using Podman, verifying local connectivity and isolating user credentials (db2inst1).',
      'SIBus Messaging Infrastructure: Configured WebSphere Service Integration Bus (SIBus / TradeBus) with explicit bus members to support asynchronous order execution.',
      'JNDI Primitives: Configured jms/TradeBrokerQueue, jms/TradeBrokerQCF, jms/TradeStreamerTCF, and jms/TradeStreamerTopic.',
      'MDB Activation Specs: Bound eis/TradeBrokerMDB and eis/TradeStreamerMDB activation specifications to stabilize server startup lifecycles.',
      'J2C & JDBC: Configured J2C authentication aliases and JDBC provider classpaths (db2jcc4.jar) to resolve jdbc/TradeDataSource connection pools.',
    ],
    transitionCue: 'With the baseline verified, we migrated to OpenLiberty and hit a deceptive, multi-layer container failure.',
    anticipatedQuestions: [
      {
        q: 'Why was Podman chosen over Docker for DB2 in SVT?',
        a: 'Podman allows rootless container execution in Red Hat Enterprise Linux environments, adhering strictly to IBM corporate infrastructure security policies without requiring a root daemon.',
      },
    ],
  },

  containerForensics: {
    timingTarget: '3:00 min',
    targetSeconds: 180,
    keyTakeaway: 'Deep 3-tier request tracing isolating the missing messagingClient-3.0 root cause behind deceptive tradehome.jsp / _error.jsp NPE traces.',
    talkingPoints: [
      'The Bug & Red Herrings: Modernized DayTrader 7 crashed immediately upon the initial login sequence, generating cascading NullPointerException (NPE) traces in _error.jsp. Automated AI tools blamed the application Java code and attempted useless refactorings.',
      'Request Flow Tracing: Traced execution across 3 distinct tiers: TradeServletAction.doLogin() -> TradeAction.login() -> TradeSLSBBean.login().',
      'The EJB Mechanism: TradeSLSBBean is a Stateless Session Bean with four class-level @Resource JMS injections (including jms/TopicConnectionFactory). The OpenLiberty EJB container intercepts the call and resolves all @Resource JNDI bindings before bean execution.',
      'The Root Cause: The server.xml included messagingServer-3.0 but omitted messagingClient-3.0. The missing client feature caused JNDI lookups to fail, throwing a jakarta.ejb.EJBException and aborting bean provisioning before line 1 of login() ever ran.',
      'The Servlet Red Herring: The unhandled servlet error passed a null exception object to _error.jsp, which threw an NPE when calling printStackTrace().',
      'Socket Collisions: Diagnosed silent JMS messaging engine aborts during mvn liberty:dev hot-reloads caused by orphaned background Java processes locking JMSPort 7276.',
    ],
    transitionCue: 'Now let us look at how we sanitized the configuration and automated cloud-native packaging.',
    anticipatedQuestions: [
      {
        q: 'Why did server.xml have messagingServer-3.0 without messagingClient-3.0?',
        a: 'Automated AI migration tools assumed the server feature implied client capabilities. In OpenLiberty modular architecture, messagingServer provides the message broker runtime, whereas messagingClient provides the JNDI resource adapter and client connection factory needed by EJBs.',
      },
    ],
  },

  cloudDeployment: {
    timingTarget: '2:00 min',
    targetSeconds: 120,
    keyTakeaway: 'Configuration as Code, AST sanitization, resolving CNTR0154E remote mismatches, stripping dead security XML, and Podman DB2 driver extraction.',
    talkingPoints: [
      'Configuration as Code: Refactored AI-generated Maven pom.xml and OpenLiberty server.xml files, eliminating hardcoded user paths and replacing them with parameterized environment variables.',
      'EJB Remote Interface Warnings: Resolved fatal CNTR0154E remote interface mismatch warnings on TradeSLSBBean and TradeSLSBRemote by separating duplicate interface annotations.',
      'Stripping Dead Security: Stripped unnecessary auto-injected appSecurity-5.0 artifacts to eliminate authentication bottlenecks on benchmarking workloads.',
      'Driver Extraction & Namespace Integrity: Extracted native DB2 JDBC driver (db2jcc4.jar) directly from active Podman container (/opt/ibm/db2/V12.1/java/db2jcc4.jar) into Liberty server library directory (${server.config.dir}/lib/db2jcc4.jar).',
      'Preserved standard Java SE JDBC API packages (javax.sql.ConnectionPoolDataSource) against incorrect automated conversion into jakarta.sql.',
    ],
    transitionCue: 'Having achieved full cloud-native deployment, we conducted an empirical A/B evaluation of enterprise AI tools.',
    anticipatedQuestions: [
      {
        q: 'Why must javax.sql.ConnectionPoolDataSource be preserved rather than converted to jakarta.sql?',
        a: 'The JDBC API (java.sql and javax.sql) is part of core Java SE standard library, not Jakarta EE. Automated tools often blindly convert all javax.* namespaces, which breaks compiler classpath bindings.',
      },
    ],
  },

  aiEvaluation: {
    timingTarget: '2:30 min',
    targetSeconds: 150,
    keyTakeaway: 'Empirical benchmark: 27 vs 18 Bob coins (33% efficiency gain), 40+ hours video telemetry, shared LLM failure modes, and leadership recommendation.',
    talkingPoints: [
      'Empirical A/B Testing: Evaluated 3 distinct workflows: Plain Bob AI (LLM only), Bob Premium Package (guided workflow), and AMA Dev Tools across 40+ hours of video telemetry.',
      'Token Cost: Plain Bob consumed 27 Bob coins vs Bob PP at 18 Bob coins — a 33% token-efficiency gain.',
      'Model Weights & Core Flaws: Both Plain Bob and Bob PP share the exact same underlying LLM weights and exhibit identical hallucinations (hallucinating DerbyDB, missing messagingClient-3.0).',
      'Configuration UX: Plain Bob emitted dummy placeholder variables directly into source code, whereas Bob PP provided structured upfront UI prompts for real environment variables.',
      'Licensing Friction: Plain Bob is included in baseline licenses; Bob PP requires an additional AMA license purchase.',
      'Strategic Recommendation to Leadership: Advised PMs that Bob PP double-licensing overhead invalidates ROI for small teams since developers can prompt standard Bob 2.0 to achieve identical results. Validated that Bob PP value is in UI standardization and lower token burn for automated enterprise pipelines.',
    ],
    transitionCue: 'To bridge the gap in AI model knowledge of Liberty diagnostics, we built the CWWK MCP server.',
    anticipatedQuestions: [
      {
        q: 'How did you calculate the 33% efficiency gain?',
        a: 'Across identical migration runs on DayTrader 7, Plain Bob required 27 Bob coins across iterative retry loops, while Bob PP completed the structured AST DAG in 18 coins: (27 - 18) / 27 = 33.3% reduction.',
      },
    ],
  },

  watsonxMcp: {
    timingTarget: '2:00 min',
    targetSeconds: 120,
    keyTakeaway: 'Technical Lead for 3-person Data Pod: Python/BS4 scraper for 1,300+ CWWK* codes, relational SQLite schema, and Model Context Protocol integration.',
    talkingPoints: [
      'Data Pod Leadership: Served as Technical Lead for the 3-person Data Pod (Pair B) within a 10-person corporate hackathon cohort for the WatsonX Challenge.',
      'Extraction Pipeline: Engineered an automated Python + BeautifulSoup web scraper extracting 1,300+ OpenLiberty CWWK* diagnostic error codes from documentation.',
      'Relational SQLite Schema (liberty_errors): Architected schema for sub-millisecond LLM lookups with code (PRIMARY KEY), severity, message, explanation, and fix.',
      'Model Context Protocol (MCP) Integration: Connected the SQLite knowledge base to an internal Model Context Protocol (MCP) server.',
      'Impact: Gives IBM internal LLMs real-time, deterministic retrieval capabilities for runtime log triage, transforming runtime stack traces into instant server.xml fixes.',
    ],
    transitionCue: 'We then incorporated this diagnostic capability into a full autonomous multi-agent modernization engine.',
    anticipatedQuestions: [
      {
        q: 'How does MCP improve over standard RAG vector search for error codes?',
        a: 'Standard RAG vector search suffers from semantic fuzziness with precise alphanumeric error codes like CWWKC2271E. MCP allows exact SQL keyword lookups, returning deterministic remediation XML with zero hallucinations.',
      },
    ],
  },

  multiAgentEngine: {
    timingTarget: '2:30 min',
    targetSeconds: 150,
    keyTakeaway: 'System design: LiteLLM gateway, LangChain orchestrator, parallel sandboxes (AMA, Plain Bob, Bob PP), bounded Diagnose & Patch loop, and PostgreSQL telemetry.',
    talkingPoints: [
      'System Architecture: Walk through the end-to-end multi-agent modernization engine designed with mentor Dan.',
      'Ingestion & Orchestrator: Ingests source repository into LiteLLM gateway coupled with LangChain for request routing, multi-model execution, and token rate limits.',
      'Parallel Execution Workers: Dispatches isolated subagents across 3 concurrent sandboxes to modernize codebases under AMA DT, Plain Bob, and Bob PP workflows.',
      'Self-Healing Build Loop: Intercepts compiler output and container runtime logs; on failure, initiates a bounded "Diagnose & Patch" loop to prevent runaway token spend.',
      'PostgreSQL Telemetry Schema: Persists run metadata (mod_id, tool_version, latency, tokens, retry_count, error_logs, deploy_status) for live dashboarding and PM analysis.',
    ],
    transitionCue: 'Let us conclude with our cross-functional impact and engineering retrospective.',
    anticipatedQuestions: [
      {
        q: 'How does the bounded self-healing loop prevent runaway token spend?',
        a: 'The state machine enforces a maximum retry budget (e.g. 3 attempts) per task node. If compilation or container startup fails 3 times, the failure context is dumped to PostgreSQL for human triage rather than looping indefinitely.',
      },
    ],
  },

  impactRetrospective: {
    timingTarget: '2:00 min',
    targetSeconds: 120,
    keyTakeaway: '6 cross-functional presentations, 5+ critical fixes, key systems engineering learnings, mentor acknowledgments, and Q&A.',
    talkingPoints: [
      'Cross-Functional Impact: Delivered 6 presentations across IBM Cloud, OpenShift, GPU teams, and Bob Product Management.',
      '5+ Foundational Fixes: Resolved CDI injection, JDBC DB2 driver binding, SIBus messaging, JNDI case-sensitivity, and port collision bugs.',
      'Key Systems Learnings: 1) AI is an accelerator, not an oracle — container lifecycles require systems engineering; 2) Deterministic closed-loop testing beats prompt engineering; 3) Low-latency structured tools (MCP) dramatically outperform raw LLM memory.',
      'Special thanks to mentors Monica, Dan, Brian, Jag and the entire IBM SVT organization for mentorship and guidance.',
      'Open for questions and live diagnostic demonstration.',
    ],
    transitionCue: 'Open for questions and discussion.',
    anticipatedQuestions: [
      {
        q: 'What is the immediate next step for this modernization tooling in SVT?',
        a: 'Connecting the multi-agent engine and CWWK MCP server into SVT automated nightly regression pipelines to benchmark upcoming WebSphere Liberty and OpenShift releases.',
      },
    ],
  },
};

// ==========================================
// 2. TIMELINE DATA (12 WEEKS DETAILED)
// ==========================================
export const TIMELINE_PHASES: TimelinePhase[] = [
  {
    week: 'Weeks 1–2',
    phaseCode: 'PHASE-01',
    title: 'Onboarding & Linux VM Provisioning',
    objective: 'Establish remote SVT environment and automate tWAS deployment.',
    bullets: [
      'Automated tWAS deployment on remote Linux VMs via IBM Installation Manager (./imcl), resolving SSL trust chains.',
      'Federated application servers and managed nodes into centralized Deployment Manager (Dmgr) topology.',
      'Orchestrated ephemeral DB2 container (svtdb:50000) via Podman with isolated db2inst1 credentials.',
    ],
    tags: ['tWAS 8.5.5', './imcl', 'Podman DB2', 'Dmgr Topology', 'Red Hat Linux'],
    deliverable: 'Operational SVT VM & verified IBM Installation Manager environment',
    status: 'Completed',
  },
  {
    week: 'Weeks 3–4',
    phaseCode: 'PHASE-02',
    title: 'DayTrader 7 Baseline & SIBus Messaging',
    objective: 'Deploy and validate full DayTrader 7 (Java EE 7) reference application with SIBus JMS.',
    bullets: [
      'Configured WebSphere Service Integration Bus (SIBus / TradeBus) with explicit bus members.',
      'Configured JNDI primitives: jms/TradeBrokerQueue, jms/TradeBrokerQCF, jms/TradeStreamerTCF, jms/TradeStreamerTopic.',
      'Bound MDB Activation Specs (eis/TradeBrokerMDB, eis/TradeStreamerMDB) and verified J2C authentication aliases.',
    ],
    tags: ['SIBus / TradeBus', 'JMS Queues', 'MDB Specs', 'J2C Aliases', 'Verified Baseline'],
    deliverable: 'End-to-end verified DayTrader 7 baseline deployment on tWAS 8.5.5',
    status: 'Completed',
  },
  {
    week: 'Weeks 5–7',
    phaseCode: 'PHASE-03',
    title: 'Liberty Migration & EJB Container Forensics',
    objective: 'Migrate to Jakarta EE 11 on OpenLiberty, trace 3-tier request flow, and isolate EJB root cause.',
    bullets: [
      'Traced request flow: TradeServletAction.doLogin() -> TradeAction.login() -> TradeSLSBBean.login().',
      'Isolated root cause: server.xml included messagingServer-3.0 but omitted messagingClient-3.0, aborting EJB CDI injection.',
      'Diagnosed socket collision on JMSPort 7276 and resolved CNTR0154E EJB remote interface mismatch warnings.',
      'Extracted native DB2 driver (db2jcc4.jar) from Podman into Liberty library; deployment approved by mentor Monica.',
    ],
    tags: ['Jakarta EE 11', 'OpenLiberty', '3-Tier Tracing', 'messagingClient-3.0', 'CNTR0154E'],
    deliverable: 'Verified DayTrader 7 Liberty Deployment & Container Forensics Report',
    status: 'Completed',
  },
  {
    week: 'Weeks 8–9',
    phaseCode: 'PHASE-04',
    title: 'AI Toolchain Benchmark & WatsonX Challenge',
    objective: 'Benchmark Plain Bob vs Bob PP (33% token gain) and build CWWK MCP server.',
    bullets: [
      'Scrubbed 40+ hours of video telemetry; proved 33% token savings (27 vs 18 coins) and shared LLM failure modes to PMs.',
      'Led 3-person Data Pod in WatsonX Challenge: scraped 1,300+ OpenLiberty CWWK* codes into SQLite database.',
      'Integrated Model Context Protocol (MCP) server for real-time, deterministic log triage by internal LLMs.',
    ],
    tags: ['Plain Bob vs Bob PP', '33% Token Gain', 'WatsonX Challenge', '1,300+ Error Codes', 'MCP Server'],
    deliverable: 'Live CWWK MCP Server & Leadership AI Benchmark Evaluation Report',
    status: 'Completed',
  },
  {
    week: 'Weeks 10–12',
    phaseCode: 'PHASE-05',
    title: 'Autonomous Multi-Agent Engine & Presentations',
    objective: 'Architect LangChain/LiteLLM engine with parallel sandboxes and deliver 6 cross-functional presentations.',
    bullets: [
      'Architected multi-agent modernization engine: LiteLLM gateway, LangChain orchestrator, and parallel sandboxes.',
      'Engineered bounded "Diagnose & Patch" self-healing loop and PostgreSQL telemetry layer.',
      'Delivered 6 presentations to PMs and engineers across IBM Cloud, OpenShift, and GPU teams.',
    ],
    tags: ['LangChain', 'LiteLLM', 'Parallel Sandboxes', 'PostgreSQL Telemetry', '6 PM Presentations'],
    deliverable: 'Autonomous Multi-Agent Architecture & Cross-Functional PM Deliverables',
    status: 'Completed',
  },
];

// ==========================================
// 3. WORKSTREAMS DATA
// ==========================================
export const WORKSTREAMS: WorkstreamCard[] = [
  {
    num: '01',
    code: 'WS-TWAS',
    title: 'Legacy Monolith Baseline & SIBus Topology',
    subtitle: 'tWAS v8.5.5 · Podman DB2 (svtdb:50000) · SIBus TradeBus',
    description:
      'Automated enterprise tWAS deployment on remote Linux VMs via ./imcl, resolving SSL trust chains. Federating application servers into centralized Dmgr architecture. Orchestrated ephemeral DB2 container (svtdb:50000) via Podman. Configured WebSphere Service Integration Bus (SIBus / TradeBus), JNDI messaging primitives (jms/TradeBrokerQueue, jms/TradeBrokerQCF), and MDB activation specs (eis/TradeBrokerMDB).',
    architectureNotes: [
      'Automated ./imcl provisioning on Red Hat Linux with SSL cert trust',
      'Centralized Deployment Manager (Dmgr) federated node topology',
      'Ephemeral IBM DB2 container in Podman (svtdb, port 50000, TRADEDB)',
      'SIBus messaging engine with TradeBus, JNDI primitives & MDB specs',
    ],
    badges: [
      { label: 'tWAS 8.5.5', variant: 'blue' },
      { label: 'Podman DB2', variant: 'blue' },
      { label: 'SIBus TradeBus', variant: 'blue' },
      { label: 'Verified Baseline ✓', variant: 'green' },
    ],
  },
  {
    num: '02',
    code: 'WS-DIAG',
    title: '3-Tier EJB Container Forensics & Lifecycle Debugging',
    subtitle: 'TradeServletAction -> TradeAction -> TradeSLSBBean · Missing messagingClient-3.0',
    description:
      'Modernized DayTrader 7 crashed on login with cascading NPE red herrings in _error.jsp. Traced request flow across 3 tiers to TradeSLSBBean stateless session bean with 4 class-level @Resource JMS injections. Isolated root cause: server.xml included messagingServer-3.0 but omitted messagingClient-3.0, aborting EJB CDI injection before line 1 of login() ran. Resolved port 7276 socket collisions.',
    architectureNotes: [
      '3-Tier flow: TradeServletAction.doLogin() -> TradeAction -> TradeSLSBBean',
      'EJB container intercepts method call and resolves @Resource JNDI bindings',
      'Root cause: missing messagingClient-3.0 caused jakarta.ejb.EJBException',
      'Diagnosed socket collision on JMSPort 7276 during hot-reloads',
    ],
    badges: [
      { label: 'OpenLiberty', variant: 'blue' },
      { label: 'Jakarta EE 11', variant: 'blue' },
      { label: '3-Tier Forensics', variant: 'blue' },
      { label: 'Approved by Monica ✓', variant: 'green' },
    ],
  },
  {
    num: '03',
    code: 'WS-CLOUD',
    title: 'Cloud-Native Deployment & AST Sanitization',
    subtitle: 'Parameterized Env Vars · CNTR0154E Fix · DB2 Driver Injection',
    description:
      'Refactored AI-generated Maven pom.xml and OpenLiberty server.xml, eliminating hardcoded user paths in favor of parameterized environment variables. Resolved fatal EJB remote interface mismatch warnings (CNTR0154E on TradeSLSBBean). Stripped dead security artifacts (appSecurity-5.0). Extracted DB2 driver (db2jcc4.jar) from Podman container into Liberty lib/ directory and preserved javax.sql namespaces.',
    architectureNotes: [
      'Configuration as code with parameterized environment variables',
      'Resolved CNTR0154E duplicate EJB remote/local interface annotations',
      'Stripped dead appSecurity-5.0 artifacts to eliminate benchmark bottlenecks',
      'Extracted native db2jcc4.jar from active Podman container into Liberty lib/',
    ],
    badges: [
      { label: 'Config as Code', variant: 'blue' },
      { label: 'CNTR0154E Fix', variant: 'blue' },
      { label: 'DB2 Injection', variant: 'blue' },
      { label: 'Production Ready ✓', variant: 'green' },
    ],
  },
  {
    num: '04',
    code: 'WS-BENCH',
    title: 'Enterprise AI Evaluation: Plain Bob vs. Bob PP',
    subtitle: '40+ Hours Telemetry · 27 vs 18 Coins (33% Gain) · PM ROI Analysis',
    description:
      'Scrubbed and analyzed 40+ hours of video telemetry across Plain Bob AI, Bob Premium Package (Bob PP), and AMA Dev Tools. Discovered a 33% token-efficiency gain (27 vs 18 Bob coins). Proved both tools share identical backend LLM weights and hallucinations. Advised PMs that Bob PP double-licensing overhead invalidates ROI for small teams, but provides UI standardization and lower token burn for automated enterprise pipelines.',
    architectureNotes: [
      'Analyzed 40+ hours of video telemetry across 3 migration workflows',
      'Discovered 33% token-efficiency gain (27 vs 18 Bob coins)',
      'Identified identical model failure modes (DerbyDB, missing messagingClient)',
      'Delivered strategic licensing ROI recommendation to Bob PM leadership',
    ],
    badges: [
      { label: '33% Token Gain', variant: 'blue' },
      { label: '27 vs 18 Coins', variant: 'blue' },
      { label: '40+ Hrs Telemetry', variant: 'blue' },
      { label: 'Presented to Leadership ✓', variant: 'green' },
    ],
  },
  {
    num: '05',
    code: 'WS-MCP',
    title: 'WatsonX Challenge: AI Data Infrastructure & MCP',
    subtitle: 'Data Pod Lead · 1,300+ CWWK* Codes · SQLite Schema · MCP Server',
    description:
      'Served as Technical Lead for the 3-person Data Pod (Pair B) in WatsonX Challenge. Built automated Python/BeautifulSoup web scraper extracting 1,300+ OpenLiberty CWWK* diagnostic codes. Architected optimized liberty_errors SQLite schema (code, severity, message, explanation, fix). Integrated dataset with internal Model Context Protocol (MCP) server for sub-second, deterministic log triage by IBM LLMs.',
    architectureNotes: [
      'Technical Lead for 3-person Data Pod in WatsonX Challenge',
      'Scraped 1,300+ OpenLiberty CWWK* diagnostic codes via Python/BS4',
      'Optimized liberty_errors SQLite database schema for low-latency lookups',
      'Model Context Protocol (MCP) server providing deterministic retrieval',
    ],
    badges: [
      { label: 'Data Pod Lead', variant: 'blue' },
      { label: '1,300+ Error Codes', variant: 'blue' },
      { label: 'SQLite DB', variant: 'blue' },
      { label: 'MCP Server Live ✓', variant: 'green' },
    ],
  },
  {
    num: '06',
    code: 'WS-AGENT',
    title: 'Autonomous Multi-Agent Modernization Engine',
    subtitle: 'LiteLLM Gateway · LangChain · Parallel Sandboxes · Postgres Telemetry',
    description:
      'Architected autonomous modernization engine: LiteLLM gateway coupled with LangChain for request routing, multi-model execution, and token rate limits. Dispatches isolated subagents across 3 concurrent sandboxes (AMA DT, Plain Bob, Bob PP). Bounded "Diagnose & Patch" self-healing loop intercepts compiler/runtime logs. PostgreSQL telemetry schema records mod_id, tool_version, latency, tokens, retries, and error logs.',
    architectureNotes: [
      'LiteLLM gateway + LangChain orchestrator for multi-model execution',
      'Concurrent execution across 3 sandboxes (AMA DT, Plain Bob, Bob PP)',
      'Bounded self-healing "Diagnose & Patch" loop preventing runaway token burn',
      'PostgreSQL telemetry schema logging mod_id, tokens, latency & errors',
    ],
    badges: [
      { label: 'LiteLLM Gateway', variant: 'blue' },
      { label: 'LangChain Orchestrator', variant: 'blue' },
      { label: 'Parallel Sandboxes', variant: 'blue' },
      { label: 'PostgreSQL Telemetry', variant: 'blue' },
    ],
  },
];

// ==========================================
// 4. BENCHMARK METRICS DATA (PLAIN BOB VS BOB PP)
// ==========================================
export const BENCHMARK_METRICS: MetricRow[] = [
  {
    label: 'Token / Coin Cost',
    category: 'Economics',
    blind: '27 Bob Coins',
    blindStyle: 'dim',
    pp: '18 Bob Coins (33% efficiency gain)',
    ppStyle: 'best',
    informed: '~15 Bob Coins (Targeted)',
    informedStyle: 'good',
    explanation: 'Bob Premium Package delivers an audited 33% token-efficiency gain over Plain Bob AI.',
  },
  {
    label: 'Model Weights & Core Flaws',
    category: 'Model Accuracy',
    blind: 'Hallucinated DerbyDB; missed messagingClient-3.0',
    blindStyle: 'warn',
    pp: 'Identical hallucinations (shared backend LLM)',
    ppStyle: 'warn',
    informed: 'Corrected via explicit developer prompts',
    informedStyle: 'good',
    explanation: 'Both tools share the exact same underlying LLM weights and exhibit identical hallucination patterns.',
  },
  {
    label: 'Configuration UX',
    category: 'Developer Experience',
    blind: 'Emitted dummy variables directly into code',
    blindStyle: 'dim',
    pp: 'Upfront UI prompts for real environment variables',
    ppStyle: 'best',
    informed: 'Manual developer parameterization',
    informedStyle: 'dim',
    explanation: 'Bob PP prompts users for actual database credentials and endpoints upfront rather than inserting placeholders.',
  },
  {
    label: 'Licensing Friction',
    category: 'Commercial Viability',
    blind: 'Included in baseline Bob license',
    blindStyle: 'best',
    pp: 'Requires separate AMA license purchase',
    ppStyle: 'warn',
    informed: 'Included in baseline Bob license',
    informedStyle: 'best',
    explanation: 'Double-licensing overhead of Bob PP invalidates ROI for small teams since developers can prompt standard Bob.',
  },
  {
    label: 'Target Deployment Fit',
    category: 'Strategy',
    blind: 'Ad-hoc, small-scale developer refactoring',
    blindStyle: null,
    pp: 'Scaled, automated enterprise portfolio pipelines',
    ppStyle: 'best',
    informed: 'Single-app specialist power engineer',
    informedStyle: 'good',
    explanation: 'Bob PP value proposition lies in UI standardization, deterministic variable input, and lower token burn at scale.',
  },
  {
    label: 'Telemetry & Auditability',
    category: 'Telemetry',
    blind: 'Manual video inspection (40+ hrs)',
    blindStyle: 'dim',
    pp: 'Automated state machine & Git commits',
    ppStyle: 'best',
    informed: 'Manual developer commit logs',
    informedStyle: 'dim',
    explanation: 'Bob PP automatically captures structured commit milestones and state transitions.',
  },
];

// ==========================================
// 5. CONTRIBUTIONS & IMPACT
// ==========================================
export const CONTRIBUTIONS: ContributionItem[] = [
  {
    color: '#0f62fe',
    title: '6 Cross-Functional Presentations Delivered',
    category: 'Product Strategy & Leadership',
    metric: '6 Cross-Team Reviews',
    description:
      'Presented migration telemetry, 33% token-efficiency findings, and product viability analyses directly to Product Managers and engineers across IBM Cloud, OpenShift, GPU teams, and Bob AI product leadership.',
    artifacts: ['PM Evaluation Reports', 'Telemetry Scrub Logs', 'Presentation Slide Decks'],
    tags: ['IBM Cloud', 'OpenShift', 'GPU Teams', 'Bob PMs'],
  },
  {
    color: '#198038',
    title: 'WatsonX Challenge: 1,300+ Error Code MCP Server',
    category: 'AI Data Infrastructure',
    metric: '1,300+ Codes in SQLite',
    description:
      'Served as Technical Lead for the 3-person Data Pod (Pair B). Built an automated Python/BeautifulSoup web scraper extracting 1,300+ OpenLiberty diagnostic error codes and indexed them into SQLite with a live Model Context Protocol (MCP) server.',
    artifacts: ['Python Scraper codebase', 'liberty_errors.sqlite schema', 'MCP JSON-RPC server endpoint'],
    tags: ['Data Pod Lead', 'Python', 'SQLite', 'MCP Protocol', 'WatsonX'],
  },
  {
    color: '#0f62fe',
    title: '5+ Foundational Enterprise Integration Fixes',
    category: 'Systems Engineering',
    metric: '5+ Critical Fixes',
    description:
      'Solved foundational container crashes: isolated missing messagingClient-3.0 CDI fault, resolved socket collisions on JMSPort 7276, fixed CNTR0154E EJB remote annotations, extracted native DB2 drivers from Podman, and preserved javax.sql namespaces.',
    artifacts: ['server.xml reference configs', 'pom.xml parameterized templates', 'Forensics Root-Cause Report'],
    tags: ['OpenLiberty', 'EJB Container', 'SIBus JMS', 'Podman DB2'],
  },
  {
    color: '#161616',
    title: 'Autonomous Multi-Agent Modernization Engine',
    category: 'Autonomous AI Architecture',
    metric: 'LiteLLM + Sandboxes',
    description:
      'Designed end-to-end multi-agent engine with LiteLLM gateway, LangChain orchestrator, parallel sandboxes (AMA DT, Plain Bob, Bob PP), bounded self-healing "Diagnose & Patch" loop, and PostgreSQL telemetry schema with mentor Dan.',
    artifacts: ['System Architecture Diagram', 'LiteLLM Router Configs', 'PostgreSQL Telemetry Schema'],
    tags: ['LiteLLM', 'LangChain', 'Parallel Sandboxes', 'PostgreSQL'],
  },
];

// ==========================================
// 6. GOALS & SIGN-OFF CHECKLIST
// ==========================================
export const GOALS: GoalItem[] = [
  {
    label: 'tWAS 8.5.5 Baseline Deployment with DB2 & SIBus JMS',
    category: 'Baseline',
    done: true,
    signoff: 'Verified by SVT Lab',
  },
  {
    label: 'Liberty Replatforming on Jakarta EE 11 & 3-Tier Forensics',
    category: 'Modernization',
    done: true,
    signoff: 'Approved by Mentor Monica',
  },
  {
    label: 'Plain Bob vs. Bob PP AI Benchmark (33% Token Gain)',
    category: 'Benchmarking',
    done: true,
    signoff: 'Presented to Bob PM Leadership',
  },
  {
    label: 'WatsonX Challenge: 1,300+ Error Code MCP Server in SQLite',
    category: 'AI Infrastructure',
    done: true,
    signoff: 'Data Pod Technical Lead',
  },
  {
    label: 'Autonomous Multi-Agent Engine (LiteLLM, Sandboxes, Postgres)',
    category: 'Systems Architecture',
    done: true,
    signoff: 'Reviewed with Mentor Dan',
  },
];

// ==========================================
// 7. CWWK ERROR CODES (1,300+ INDEXED IN SQLite)
// ==========================================
export const CWWK_CODES: CWWKCode[] = [
  {
    code: 'CNTR0154E',
    severity: 'ERROR',
    component: 'EJB Container',
    title: 'EJB Remote Interface Conflict',
    description:
      'CNTR0154E: The bean class TradeSLSBBean specifies both @Remote and @Local annotations with duplicate method signatures without interface separation.',
    solution:
      'Separate the remote business interface from the local CDI bean declaration. Refactor TradeSLSBRemote and ensure server.xml includes the ejbRemote-3.2 feature.',
  },
  {
    code: 'CWWKC2271E',
    severity: 'ERROR',
    component: 'JMS Client',
    title: 'Missing JMS Messaging Client Feature',
    description:
      'CWWKC2271E: An error occurred while initializing the JMS connection factory. Resource eis/TradeBrokerMDB cannot be resolved because no JMS client feature is loaded.',
    solution:
      'Add <feature>messagingClient-3.0</feature> (or wasJmsClient-2.0) to server.xml. Ensure the external SIBus messaging engine host and port are mapped in jmsConnectionFactory.',
  },
  {
    code: 'CWWKE0001I',
    severity: 'INFO',
    component: 'Liberty Kernel',
    title: 'Server Kernel Startup Complete',
    description:
      'CWWKE0001I: The server defaultServer has been launched in 2.180 seconds on Java 21 with active features [cdi-4.0, ejbLite-3.2, messagingClient-3.0].',
    solution: 'Informational message indicating successful WebSphere Liberty kernel initialization on Jakarta EE 11 / Java 21.',
  },
  {
    code: 'CWWKG0016I',
    severity: 'INFO',
    component: 'Config Manager',
    title: 'Dynamic Configuration Update Succeeded',
    description:
      'CWWKG0016I: Starting server configuration update. Dynamically loaded feature messagingClient-3.0 without requiring a server restart.',
    solution: 'Informational: WebSphere Liberty dynamic feature manager successfully applied configuration modifications in memory.',
  },
  {
    code: 'CWWKZ0001I',
    severity: 'INFO',
    component: 'Application Manager',
    title: 'Application Started Successfully',
    description:
      'CWWKZ0001I: Application daytrader-ee7 started in 4.215 seconds on HTTP endpoint *:9080 (Jakarta EE 11 / Java 21).',
    solution: 'Application is active and accepting HTTP traffic on configured virtual hosts.',
  },
  {
    code: 'J2CA0027E',
    severity: 'ERROR',
    component: 'J2C Connection Mgr',
    title: 'Datasource Driver Not Found',
    description:
      'J2CA0027E: An exception occurred while attempting to obtain a database connection for jdbc/TradeDataSource. ClassNotFoundException: com.ibm.db2.jcc.DB2Driver.',
    solution:
      'Copy the DB2 JDBC driver jar (db2jcc4.jar) from the Podman container into ${server.config.dir}/lib/ and define <fileset dir="${server.config.dir}/lib" includes="*.jar"/> in the library definition in server.xml.',
  },
];

// ==========================================
// 8. CONFIG DIFF ITEMS (FOR CONFIG DIFF INSPECTOR)
// ==========================================
export const CONFIG_DIFFS: ConfigDiffItem[] = [
  {
    file: 'server.xml (Feature Configuration)',
    context: 'Enabling messagingClient-3.0 to eliminate 3-tier TradeSLSBBean CDI NPEs on OpenLiberty',
    legacyCode: `<!-- INCOMPLETE FEATURE LIST (AI GENERATED) -->
<server description="DayTrader Liberty Server">
  <featureManager>
    <feature>cdi-4.0</feature>
    <feature>ejbLite-3.2</feature>
    <feature>servlet-6.0</feature>
    <feature>messagingServer-3.0</feature>
    <feature>appSecurity-5.0</feature> <!-- UNNECESSARY: CAUSES AUTH BOTTLENECK -->
  </featureManager>
</server>`,
    modernCode: `<!-- FIXED PRODUCTION FEATURE LIST (JAKARTA EE 11) -->
<server description="DayTrader Liberty Server">
  <featureManager>
    <feature>cdi-4.0</feature>
    <feature>ejbLite-3.2</feature>
    <feature>servlet-6.0</feature>
    <feature>messagingServer-3.0</feature>
    <feature>messagingClient-3.0</feature> <!-- REQUIRED FOR EJB @RESOURCE INJECTION -->
    <feature>jdbc-4.3</feature>
  </featureManager>
</server>`,
    explanation:
      'Adding messagingClient-3.0 resolves the container-level JMS ConnectionFactory binding during TradeSLSBBean initialization, preventing the downstream NullPointerException when TradeServletAction.doLogin() executes across the 3 architectural tiers.',
  },
  {
    file: 'server.xml (DB2 Datasource Configuration)',
    context: 'Wiring Podman DB2 container JDBC driver into Liberty runtime',
    legacyCode: `<!-- FAILING DATASOURCE (HARDCODED USER PATHS) -->
<dataSource id="TradeDataSource" jndiName="jdbc/TradeDataSource">
  <jdbcDriver libraryRef="DB2Lib"/>
</dataSource>`,
    modernCode: `<!-- RESOLVED DB2 DATASOURCE WITH EXTRACTED DRIVER -->
<library id="DB2Lib">
  <fileset dir="\${server.config.dir}/lib" includes="db2jcc4.jar db2jcc_license_cu.jar"/>
</library>

<dataSource id="TradeDataSource" jndiName="jdbc/TradeDataSource" type="javax.sql.ConnectionPoolDataSource">
  <jdbcDriver libraryRef="DB2Lib"/>
  <properties.db2.jcc 
    serverName="\${env.DB2_HOST:-localhost}" 
    portNumber="\${env.DB2_PORT:-50000}" 
    databaseName="TRADEDB" 
    user="\${env.DB2_USER:-db2inst1}" 
    password="\${env.DB2_PASSWORD:-password}"
    currentSchema="DB2INST1"/>
</dataSource>`,
    explanation:
      'Uses native db2jcc4.jar extracted from Podman container /opt/ibm/db2/V12.1/java/db2jcc4.jar, preserves javax.sql.ConnectionPoolDataSource package, and parameterizes credentials with environment variables.',
  },
];
