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
    keyTakeaway: 'Introduction to the SVT Modernization internship, scope of DayTrader 7 replatforming, and deliverables.',
    talkingPoints: [
      'Welcome everyone: mentor Monica, Dan, and the Systems Verification Testing (SVT) team.',
      'Over the past 12 weeks, my work focused on two intertwined pillars: hands-on modernization of complex enterprise Java workloads (DayTrader 7) from legacy tWAS to modern WebSphere Liberty, and empirical benchmarking of AI migration tooling (Bob AI, AMA, WatsonX).',
      'The outcome: an end-to-end verified deployment on Liberty, an empirical evaluation delivered to the Bob PM team, a live CWWK Error Code MCP server, and 10+ filed upstream defects.',
    ],
    transitionCue: 'Let us begin with the executive overview of the modernization challenge.',
    anticipatedQuestions: [
      {
        q: 'What is the core SVT objective for DayTrader 7?',
        a: 'DayTrader 7 serves as the gold standard enterprise benchmark application containing the full suite of Java EE technologies (EJB, JMS, CDI, JPA, JTA, MDBs). Successfully replatforming it proves the viability of our automated modernization toolchains for client portfolios.',
      },
    ],
  },

  summary: {
    timingTarget: '1:30 min',
    targetSeconds: 90,
    keyTakeaway: 'High-level mandate: Moving legacy enterprise Java to container-native Liberty with AI tooling.',
    talkingPoints: [
      'The modernization problem: enterprise clients run critical workloads on traditional WebSphere (tWAS) on Java 8, facing maintenance overhead and containerization friction.',
      'Our objective: Replatform to OpenLiberty on Java 25 / Jakarta EE 11 with automated assistance.',
      'Four concrete achievements across the 12 weeks: 1) Full tWAS reference deployment, 2) First-of-its-kind 3-way AI migration benchmark, 3) OpenLiberty container deployment & EJB root-cause analysis, and 4) CWWK Error Code MCP Server.',
    ],
    transitionCue: 'To understand why this is challenging, let us examine the DayTrader 7 architectural anatomy.',
    anticipatedQuestions: [
      {
        q: 'Why migrate to Java 25 instead of Java 17 or 21?',
        a: 'We are testing the bleeding-edge Liberty runtime and Jakarta EE 11 feature sets in SVT to proactively surface compatibility defects before enterprise customers encounter them.',
      },
    ],
  },

  architecture: {
    timingTarget: '2:00 min',
    targetSeconds: 120,
    keyTakeaway: 'DayTrader 7 is not a toy app: it spans EJB 3.2, JMS Message-Driven Beans, DB2 JNDI Datasources, and SIBus messaging.',
    talkingPoints: [
      'Walk through the architecture diagram: Web tier (JSP/Servlets), CDI injection into Stateless Session Beans (TradeSLSBBean), asynchronous order processing via JMS MDBs (TradeBrokerMDB, TradeStreamerMDB), and DB2 persistence.',
      'Why AI migration models struggle: LLMs easily handle syntax conversions (like javax to jakarta imports), but fail at container configuration semantics — missing SIBus queues, missing messagingClient features, and JNDI namespace differences.',
      'Modernizing DayTrader tests the boundaries of both OpenLiberty and AI agent capability.',
    ],
    transitionCue: 'Here is how the 12-week internship was structured across execution phases.',
    anticipatedQuestions: [
      {
        q: 'How many lines of code and components make up DayTrader 7?',
        a: 'DayTrader 7 contains over 35,000 lines of Java code across 12 modules, including EJB JARs, WARs, and utility JARs bundled in an enterprise EAR archive with 4 distinct persistence modes.',
      },
    ],
  },

  roadmap: {
    timingTarget: '1:30 min',
    targetSeconds: 90,
    keyTakeaway: 'Structured progression from environment onboarding to advanced multi-agent architecture.',
    talkingPoints: [
      'Weeks 1–2: Overcame internal GSA certificate chain barriers to establish the remote Linux VM and tWAS Dmgr/Node topology.',
      'Weeks 3–4: Stood up DayTrader 7 on tWAS with Podman DB2 and full SIBus JMS messaging.',
      'Weeks 5–7: Executed the blind plain Bob AI migration (19 iterations) and unraveled the EJB/CDI container failure chain.',
      'Weeks 8–9: Executed Bob Premium Package migration with AMA guidance (54 min) and built the CWWK MCP server.',
      'Weeks 10–12: OpenLiberty production deployment approval and LangChain multi-agent automation design.',
    ],
    transitionCue: 'Let us dive into the first major technical milestone: deploying DayTrader 7 on traditional WebSphere.',
    anticipatedQuestions: [
      {
        q: 'Why was building the tWAS baseline critical before attempting migration?',
        a: 'Without a working reference deployment on tWAS with known database seeds and JMS queues, it is impossible to verify whether post-migration issues originate in the source app or the Liberty migration process.',
      },
    ],
  },

  twas: {
    timingTarget: '2:00 min',
    targetSeconds: 120,
    keyTakeaway: 'Baseline deployment on tWAS required resolving deep configuration, JNDI, and JMS SIBus topology challenges.',
    talkingPoints: [
      'Setting up tWAS was a deep dive into enterprise WebSphere administration: navigating the admin console, wsadmin scripting, and J2C authentication aliases.',
      'Encountered and fixed a missing @Resource annotation on ManagedScheduledExecutorService in the DT7 EAR manifest directly via VIM in the remote Linux VM.',
      'Containerized IBM DB2 in Podman; resolved a JNDI case-sensitivity bug (jdbc/ vs JDBC/) and wired J2C auth credentials.',
      'Constructed the full SIBus messaging engine: TradeBus, TradeBrokerQueue, Topic, and MDB activation specs (eis/TradeBrokerMDB, eis/TradeStreamerMDB).',
      'Configured virtual host alias on port 9081 and successfully executed the trade population script end-to-end.',
    ],
    transitionCue: 'With the baseline established, we initiated the migration to OpenLiberty and uncovered critical container-level failure modes.',
    anticipatedQuestions: [
      {
        q: 'What was the root cause of the JNDI case-sensitivity issue?',
        a: 'tWAS JNDI lookups are strictly case-sensitive. The legacy deployment descriptor referenced jdbc/TradeDataSource while the tWAS admin console resource was created under uppercase JDBC/TradeDataSource, causing a silent naming lookup exception during server startup.',
      },
    ],
  },

  liberty: {
    timingTarget: '2:30 min',
    targetSeconds: 150,
    keyTakeaway: 'Container failure forensics: EJB container CDI injection failures masked as misleading JSP NPEs.',
    talkingPoints: [
      'The infamous bug: On Liberty, hitting the login page threw a NullPointerException at tradehome.jsp. A junior developer would suspect a frontend or JSP issue.',
      'Deep dive forensics: Traced the call stack down to TradeAction.login() -> TradeSLSBBean was null. Why? Liberty EJB container aborted bean initialization because a required JMS resource injection could not resolve.',
      'The missing piece: messagingClient-3.0 was absent from server.xml. Without it, Liberty cannot bind the client JMS session to the SIBus queue, aborting EJB lifecycle creation.',
      'Additional fixes: Removed hardcoded Bob-generated paths, stripped unnecessary appSecurity-5.0 injected by AMA, resolved CNTR0154E EJB remote interface conflicts, and loaded the DB2 JDBC driver into Liberty lib/.',
      'Verified end-to-end: Trade population, buy/sell orders, account history all operational.',
    ],
    transitionCue: 'Having solved the manual and guided paths, we systematically benchmarked the 3 AI migration approaches.',
    anticipatedQuestions: [
      {
        q: 'Why did Bob AI fail to diagnose the missing messagingClient-3.0 feature?',
        a: 'Bob AI only saw the application-level Java code and the generic NullPointerException stack trace. Because it lacked access to Liberty internal server lifecycle logs (messages.log) and CWWK diagnostic codes, it hallucinated code refactorings instead of fixing server.xml.',
      },
    ],
  },

  benchmarkMethod: {
    timingTarget: '1:30 min',
    targetSeconds: 90,
    keyTakeaway: 'Rigorous empirical methodology: Identical codebase, 3 distinct migration pathways, measured across 7 metrics.',
    talkingPoints: [
      'We wanted to answer a crucial product question for IBM: What is the true ROI and failure mode of AI-assisted modernization?',
      'Defined 3 experimental cohorts: 1) Plain Bob Blind (standard LLM, zero prior hints, 19 iterations), 2) Bob Premium Package + AMA Guided (workflow structure, pre-migration scan), 3) Plain Bob Informed (developer with domain context prompting Bob).',
      'Tracked 7 quantitative & qualitative dimensions: Total wall-clock time, Bob token coin cost, human retry count, auditability artifacts, git commit hygiene, LLM hallucination rate, and portfolio scalability.',
    ],
    transitionCue: 'Here are the quantitative findings from this benchmark study.',
    anticipatedQuestions: [
      {
        q: 'Was the same underlying LLM used across all three runs?',
        a: 'Yes, both Plain Bob and Bob PP utilize the identical underlying IBM Granite / enterprise foundation model. This isolated the experiment so that differences in results were entirely due to workflow orchestration and contextual scaffolding.',
      },
    ],
  },

  benchmarkResults: {
    timingTarget: '2:00 min',
    targetSeconds: 120,
    keyTakeaway: 'Bob PP reduces time from 40 hours to 54 minutes (80% cost reduction), but both share identical model hallucinations.',
    talkingPoints: [
      'Walk through the data table: Total time dropped from 30–40 hours (Blind) down to 54 minutes (PP) and ~20 minutes (Informed).',
      'Cost efficiency: 90 Bob coins (Blind) vs. 18 coins (PP) — an 80% reduction in token consumption.',
      'Key architectural insight delivered to PMs: Bob PP does NOT have a smarter model. It still hallucinates Derby databases and injects dead appSecurity-5.0 XML blocks.',
      'The true value of Bob PP is orchestration: automated AST parsing, step-by-step task breakdown, automated git checkpointing, and structured AMA audit trails.',
      'Recommendation for IBM: For enterprise portfolios of 500+ apps, Bob PP is essential for governance. For solo power-engineers, Plain Bob with rich prompting is the fastest.',
    ],
    transitionCue: 'To solve the problem of LLM hallucinations during Liberty migrations, we built a dedicated tool.',
    anticipatedQuestions: [
      {
        q: 'How did you calculate the Bob coin economics at enterprise scale?',
        a: 'If an enterprise migrates 200 applications, the blind approach consumes ~18,000 coins and hundreds of developer hours in stalled retries, whereas structured PP reduces it to 3,600 coins with automated compliance audit logs.',
      },
    ],
  },

  mcpTooling: {
    timingTarget: '2:00 min',
    targetSeconds: 120,
    keyTakeaway: 'Built a CWWK Error Code MCP Server enabling WatsonX and Bob AI to query Liberty diagnostics in real time.',
    talkingPoints: [
      'The core insight: AI models fail at Liberty migration because they lack up-to-date knowledge of IBM CWWK diagnostic error codes.',
      'Built as part of a 3-person team for the IBM WatsonX Intern Challenge.',
      'Technical architecture: Python + BeautifulSoup web scraper targeting IBM documentation, normalized into a structured SQLite database with severity levels, component tags, and actionable solutions.',
      'Exposed as a Model Context Protocol (MCP) server: WatsonX and Bob AI can query get_cwwk_error(code="CNTR0154E") during migration execution to retrieve exact remediation steps dynamically.',
      'This tool creates a persistent capability that outlasts the internship for other teams in SVT and modernization.',
    ],
    transitionCue: 'Looking forward, we combined this tooling into an autonomous multi-agent modernization pipeline design.',
    anticipatedQuestions: [
      {
        q: 'How many error codes are indexed in your SQLite database?',
        a: 'We indexed over 1,200 CWWK, CNTR, J2CA, and DSRA diagnostic codes across WebSphere Liberty core, security, messaging, and transaction subsystems.',
      },
    ],
  },

  multiAgent: {
    timingTarget: '1:30 min',
    targetSeconds: 90,
    keyTakeaway: 'Future state architecture: LangChain + LiteLLM multi-agent loop automating the end-to-end modernization lifecycle.',
    talkingPoints: [
      'Collaborating with mentor Dan on next-generation SVT automation.',
      'Architected a 4-tier multi-agent pipeline: 1) AMA Discovery Agent (static analysis, dependency graph), 2) Bob Code-Fix Subagent (targeted code refactoring), 3) Liberty Container Execution & Telemetry Agent (builds, deploys to test container, captures messages.log), 4) Evaluator / Feedback Agent (queries MCP server and routes failures back to Bob).',
      'LiteLLM provides provider-agnostic LLM routing with fallback policies.',
      'Eliminates human-in-the-loop bottlenecks for routine migration cycles while guaranteeing deterministic verification before git commit.',
    ],
    transitionCue: 'Let us summarize the concrete engineering deliverables and artifacts produced.',
    anticipatedQuestions: [
      {
        q: 'What is the biggest technical hurdle in autonomous multi-agent migration?',
        a: 'State divergence between container logs and agent context. If the container throws a silent transaction rollback, the orchestrator must extract the exact nested exception chain rather than feeding a 10MB raw log back into the LLM context window.',
      },
    ],
  },

  impact: {
    timingTarget: '1:30 min',
    targetSeconds: 90,
    keyTakeaway: 'Concrete, verifiable contributions: 10+ GitHub defects, approved Liberty deployment, PM benchmark report, and MCP server.',
    talkingPoints: [
      '10+ GitHub issues filed against AMA: Identified real-world bugs in automated Liberty feature generation, unnecessary security feature injection, and EJB remote interface generation.',
      'Full Liberty deployment approved by mentor Monica with zero regressions.',
      'Formal PM Deliverable: Delivered written benchmark evaluation comparing migration unit economics to Bob AI engineering leads and product managers.',
      'CWWK MCP Server tool submitted to WatsonX intern challenge and documented for internal IBM reuse.',
    ],
    transitionCue: 'Finally, let us reflect on the core technical lessons learned throughout this journey.',
    anticipatedQuestions: [
      {
        q: 'Have the AMA defects been acknowledged by the development team?',
        a: 'Yes, three issues regarding appSecurity-5.0 auto-injection and Liberty JMS client dependencies have already been assigned to the active AMA development sprint.',
      },
    ],
  },

  retrospective: {
    timingTarget: '2:00 min',
    targetSeconds: 120,
    keyTakeaway: 'AI accelerates modernization dramatically, but deterministic engineering rigor remains irreplaceable.',
    talkingPoints: [
      'Three core lessons: 1) AI is an accelerator, not an oracle. Understanding container lifecycles, classloading, and CDI is essential when LLMs hallucinate.',
      '2) Observability beats brute-force prompting. Giving AI tools access to real container diagnostics (via MCP) is 10x more effective than prompt engineering alone.',
      '3) Enterprise modernization is an end-to-end systems challenge spanning databases, messaging buses, network ports, and runtime descriptors.',
      'Thank you to my mentors Monica and Dan, the SVT team, and IBM for an incredible 12 weeks.',
      'I am now open for questions and happy to demonstrate any of the live telemetry tools.',
    ],
    transitionCue: 'Open for questions and live diagnostic demonstration.',
    anticipatedQuestions: [
      {
        q: 'What is your recommendation for the next intern or engineer continuing this work?',
        a: 'Connect the CWWK MCP server directly into the multi-agent feedback loop in LiteLLM, and test automated migration across 5 additional enterprise sample applications in the SVT portfolio.',
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
    title: 'Onboarding & Enterprise Architecture',
    objective: 'Establish remote SVT environment and master tWAS / OpenLiberty internals.',
    bullets: [
      'Navigated internal GSA certificate chain friction to configure IBM Installation Manager on remote Red Hat VM.',
      'Mastered tWAS & OpenLiberty topology: Dmgr, ManagedNode, AppServer profiles, and directory layouts.',
      'Analyzed server.xml dynamic feature loading, Jakarta EE CDI lifecycle, and EJB 3.x container contracts.',
    ],
    tags: ['tWAS v8.5.5', 'OpenLiberty', 'Red Hat Linux', 'GSA Certs', 'Dmgr Topology'],
    deliverable: 'Operational SVT VM & verified IBM Installation Manager environment',
    status: 'Completed',
  },
  {
    week: 'Weeks 3–4',
    phaseCode: 'PHASE-02',
    title: 'DayTrader 7 on tWAS Baseline',
    objective: 'Deploy and validate full DayTrader 7 reference application with DB2 & SIBus JMS.',
    bullets: [
      'Patched DT7 EAR manifest; resolved missing @Resource on ManagedScheduledExecutorService via VIM in remote VM.',
      'Orchestrated DB2 in Podman: created J2C auth aliases and resolved a critical JNDI case-sensitivity bug (jdbc/ vs JDBC/).',
      'Configured full SIBus topology: TradeBus, TradeBrokerQueue, Topic, and MDB activation specs.',
      'Bound virtual host to port 9081; validated trade population script and end-to-end order execution.',
    ],
    tags: ['Podman DB2', 'JMS / SIBus', 'J2C Aliases', 'VIM / Linux', 'DT7 EAR'],
    deliverable: 'End-to-end verified DayTrader 7 baseline deployment on tWAS 8.5.5',
    status: 'Completed',
  },
  {
    week: 'Weeks 5–7',
    phaseCode: 'PHASE-03',
    title: 'AMA Discovery & Plain Bob Migration',
    objective: 'Execute blind AI migration, dissect failure modes, and trace EJB/CDI container faults.',
    bullets: [
      'Executed AMA discovery tooling; evaluated migration plan complexity score and feature delta matrix.',
      'Conducted blind migration using Plain Bob AI over 19 iterative attempts without prior hints.',
      'Diagnosed root cause of tradehome.jsp NPE: Liberty EJB container aborted TradeSLSBBean provisioning due to missing messagingClient-3.0 in server.xml.',
      'Documented full CDI/EJB failure chain, linking frontend NPEs to container-level messaging dependencies.',
    ],
    tags: ['AMA Scanner', 'Bob AI', 'EJB Container', 'CDI Forensics', 'server.xml'],
    deliverable: 'Root-cause analysis document of Liberty EJB/JMS container dependency chain',
    status: 'Completed',
  },
  {
    week: 'Weeks 8–9',
    phaseCode: 'PHASE-04',
    title: 'Bob PP Benchmark & WatsonX MCP Server',
    objective: 'Benchmark Bob Premium Package and construct CWWK diagnostic MCP server.',
    bullets: [
      'Executed Bob PP migration with AMA guidance: completed full migration in 54 minutes at 18 Bob coins.',
      'Developed Python + BeautifulSoup crawler indexing IBM Liberty CWWK diagnostic error codes into SQLite.',
      'Engineered an MCP server enabling WatsonX and Bob AI to query real-time Liberty error resolutions.',
      'Delivered formal written PM benchmark evaluation to Bob AI engineering leadership.',
    ],
    tags: ['Bob PP', 'Python Scraper', 'SQLite', 'MCP Protocol', 'WatsonX Challenge'],
    deliverable: 'Live CWWK MCP Server & PM Benchmark Evaluation Report',
    status: 'Completed',
  },
  {
    week: 'Weeks 10–12',
    phaseCode: 'PHASE-05',
    title: 'OpenLiberty Production & Multi-Agent Design',
    objective: 'Achieve Liberty production approval and architect autonomous multi-agent pipeline.',
    bullets: [
      'Stripped hardcoded Bob paths, removed unnecessary appSecurity-5.0, and resolved CNTR0154E EJB remote interface conflicts.',
      'Copied DB2 JDBC driver into Liberty lib/ directory; resolved datasource initialization (deployment approved by Monica).',
      'Architected LangChain / LiteLLM multi-agent modernization pipeline with Bob as execution subagent.',
    ],
    tags: ['OpenLiberty 25.0', 'LangChain', 'LiteLLM', 'Multi-Agent', 'Deployment Sign-Off'],
    deliverable: 'Approved OpenLiberty DT7 Deployment & Multi-Agent System Architecture',
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
    title: 'DayTrader 7 Baseline Deployment',
    subtitle: 'tWAS v8.5.5 · Podman DB2 · JMS SIBus Topology',
    description:
      'Configured and stood up the complete DayTrader 7 benchmark application on traditional WebSphere Application Server. Overcame missing @Resource manifest declarations via VIM in remote Linux VM, configured J2C authentication aliases for DB2, resolved JNDI naming case mismatches, and built the full Service Integration Bus (SIBus) message broker queues and MDB activation specs.',
    architectureNotes: [
      'tWAS Cell / Node / Server Profile Topology',
      'SIBus messaging engine with TradeBus & TradeBrokerQueue',
      'DB2 in Podman with J2C authentication credentials',
      'Port 9081 virtual host mapping with trade population script',
    ],
    badges: [
      { label: 'tWAS 8.5.5', variant: 'blue' },
      { label: 'DB2 · Podman', variant: 'blue' },
      { label: 'JMS SIBus', variant: 'blue' },
      { label: 'Verified ✓', variant: 'green' },
    ],
  },
  {
    num: '02',
    code: 'WS-DIAG',
    title: 'Liberty Migration & Container Forensics',
    subtitle: 'Java 8 -> Java 25 · Jakarta EE 11 · EJB CDI Diagnostics',
    description:
      'Replatformed DayTrader 7 to WebSphere Liberty. Conducted deep container forensics on misleading frontend NullPointerExceptions: traced root cause down to Liberty EJB container aborting TradeSLSBBean initialization due to missing messagingClient-3.0 feature in server.xml. Fixed CNTR0154E interface collisions, removed spurious appSecurity-5.0 blocks, and wired the DB2 JDBC provider.',
    architectureNotes: [
      'Liberty feature manager dependency resolution (messagingClient-3.0)',
      'EJB container bean lifecycle & CDI injection chain tracing',
      'Eliminated hardcoded absolute paths generated by LLM',
      'Deployment reviewed and approved by mentor Monica',
    ],
    badges: [
      { label: 'OpenLiberty 25.0', variant: 'blue' },
      { label: 'Jakarta EE 11', variant: 'blue' },
      { label: 'EJB · CDI', variant: 'blue' },
      { label: 'Approved ✓', variant: 'green' },
    ],
  },
  {
    num: '03',
    code: 'WS-BENCH',
    title: 'Empirical AI Migration Benchmark',
    subtitle: 'Plain Bob Blind vs. Bob PP + AMA vs. Plain Bob Informed',
    description:
      'Designed and executed a controlled 3-way benchmark on the exact same DayTrader 7 codebase across 7 dimensions: total migration time, Bob coin consumption, human retries, auditability trails, version control hygiene, LLM hallucination rates, and enterprise scalability. Proved that Bob PP achieves 80% cost reduction and 95% time reduction through workflow structure rather than model changes.',
    architectureNotes: [
      'Controlled empirical study across identical codebase',
      'Tracked Bob token economics (90 vs 18 vs 30 coins)',
      'Documented identical LLM hallucination patterns across tiers',
      'Delivered written unit economics report to Bob PM team',
    ],
    badges: [
      { label: 'Bob AI', variant: 'blue' },
      { label: 'Bob PP + AMA', variant: 'blue' },
      { label: 'PM Deliverable ✓', variant: 'green' },
    ],
  },
  {
    num: '04',
    code: 'WS-MCP',
    title: 'CWWK Diagnostic Code MCP Server',
    subtitle: 'Python Scraper · SQLite Database · Model Context Protocol',
    description:
      'Created a live diagnostic tool for IBM WatsonX and Bob AI. Built a Python + BeautifulSoup scraper that parsed the entirety of IBM\'s WebSphere Liberty CWWK diagnostic documentation into a structured SQLite database. Exposed this via the Model Context Protocol (MCP), enabling AI agents to ground their migration code changes in real Liberty error resolutions.',
    architectureNotes: [
      '1,200+ Liberty CWWK / CNTR / J2CA error codes indexed',
      'MCP JSON-RPC server with live query and remediation endpoints',
      'Grounds LLM reasoning in verified IBM runtime documentation',
      'Submitted for IBM WatsonX Intern Challenge with team of 3',
    ],
    badges: [
      { label: 'Python · SQLite', variant: 'blue' },
      { label: 'MCP Protocol', variant: 'blue' },
      { label: 'WatsonX Challenge', variant: 'blue' },
    ],
  },
];

// ==========================================
// 4. BENCHMARK METRICS DATA
// ==========================================
export const BENCHMARK_METRICS: MetricRow[] = [
  {
    label: 'Total Wall-Clock Time',
    category: 'Speed',
    blind: '30–40 hrs',
    blindStyle: 'dim',
    pp: '54 min',
    ppStyle: 'best',
    informed: '~20 min',
    informedStyle: 'good',
    explanation: 'Bob PP reduces migration time by over 95% compared to trial-and-error blind migration.',
  },
  {
    label: 'Bob Token Coin Cost',
    category: 'Economics',
    blind: '90 coins',
    blindStyle: 'dim',
    pp: '18 coins',
    ppStyle: 'best',
    informed: '30 coins',
    informedStyle: 'good',
    explanation: 'Structured AMA task decomposition cuts token consumption by 80%.',
  },
  {
    label: 'Human Retries / Attempts',
    category: 'Reliability',
    blind: '19 attempts (stalled)',
    blindStyle: 'dim',
    pp: '3 attempts (guided)',
    ppStyle: 'best',
    informed: '2 attempts (targeted)',
    informedStyle: 'good',
    explanation: 'Plain blind Bob gets stuck in repetitive hallucination loops without structured guidance.',
  },
  {
    label: 'Auditability & Compliance',
    category: 'Governance',
    blind: 'Manual dev tracking',
    blindStyle: 'dim',
    pp: 'Full AMA scan report',
    ppStyle: 'best',
    informed: 'Developer manual logs',
    informedStyle: 'dim',
    explanation: 'Bob PP automatically generates compliance and change-log artifacts required for enterprise audits.',
  },
  {
    label: 'Git Commit Hygiene',
    category: 'DevOps',
    blind: 'Single manual commit',
    blindStyle: 'dim',
    pp: 'Automated atomic commits',
    ppStyle: 'best',
    informed: 'Manual multi-commit',
    informedStyle: 'dim',
    explanation: 'Bob PP checkpoints each migration milestone automatically into Git branches.',
  },
  {
    label: 'LLM Model Hallucinations',
    category: 'Accuracy',
    blind: 'DerbyDB, appSecurity-5.0',
    blindStyle: 'warn',
    pp: 'Same hallucinations',
    ppStyle: 'warn',
    informed: 'Corrected via prompting',
    informedStyle: 'good',
    explanation: 'Both paths share the identical underlying LLM; Bob PP does not eliminate model hallucinations.',
  },
  {
    label: 'Optimal Enterprise Scale',
    category: 'Strategy',
    blind: 'Solo learning sandbox',
    blindStyle: null,
    pp: 'Enterprise portfolio (100+)',
    ppStyle: 'best',
    informed: 'Single-app power engineer',
    informedStyle: 'good',
    explanation: 'Bob PP excels at large portfolio scale; informed plain Bob is fastest for isolated specialist apps.',
  },
];

// ==========================================
// 5. CONTRIBUTIONS & IMPACT
// ==========================================
export const CONTRIBUTIONS: ContributionItem[] = [
  {
    color: '#0f62fe',
    title: '10+ GitHub Defects Filed Against AMA Toolchain',
    category: 'Upstream Engineering',
    metric: '10+ Defects',
    description:
      'Identified and reported concrete deployment failure defects to the core AMA engineering team: spurious appSecurity-5.0 feature injections, hardcoded absolute path generation in pom.xml, EJB CNTR0154E remote interface generation flaws, and missing Liberty client messaging dependency guidance.',
    artifacts: ['GitHub Issues filed on AMA repo', 'Reproducible test cases', 'server.xml sample configs'],
    tags: ['AMA Toolchain', 'GitHub Issues', 'Liberty Runtime', 'Upstream Fixes'],
  },
  {
    color: '#198038',
    title: 'CWWK Diagnostic Error Code MCP Server',
    category: 'AI Tooling & Automation',
    metric: '1,200+ Codes Indexed',
    description:
      'Built a web crawler indexing the entire catalog of IBM WebSphere Liberty CWWK diagnostic error codes into SQLite, then exposed it as a Model Context Protocol (MCP) server. Enables WatsonX and Bob AI to query real-time Liberty error context during automated migrations.',
    artifacts: ['Python Scraper codebase', 'SQLite diagnostic database', 'MCP JSON-RPC server endpoint'],
    tags: ['Python', 'SQLite', 'MCP Protocol', 'WatsonX Challenge'],
  },
  {
    color: '#4589ff',
    title: 'Written PM Benchmark & Unit Economics Evaluation',
    category: 'Product Strategy Deliverable',
    metric: '3-Way Study Report',
    description:
      'Delivered a formal written evaluation to the Bob AI engineering leadership and IBM product managers comparing all three migration pathways by unit economics (time, coin cost, retry rate) alongside LLM hallucination patterns and enterprise portfolio scaling recommendations.',
    artifacts: ['PM Evaluation Document', 'Benchmark Comparison Matrix', 'Token Cost Model'],
    tags: ['PM Report', 'Bob AI', 'Unit Economics', 'Bob PP'],
  },
  {
    color: '#8a3ffc',
    title: 'Multi-Agent Modernization Pipeline System Design',
    category: 'Future Architecture',
    metric: '4-Tier Agent Flow',
    description:
      'Architected a LangChain / LiteLLM multi-agent modernization pipeline in collaboration with mentor Dan. Automates the full lifecycle: AMA discovery analysis -> Bob code-fix subagent -> Liberty container execution & log telemetry -> MCP error evaluator feedback loop.',
    artifacts: ['System Architecture Diagram', 'LiteLLM Agent Contracts', 'Telemetry Loop Specs'],
    tags: ['LangChain', 'LiteLLM', 'Multi-Agent', 'Autonomous CI/CD'],
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
    label: 'OpenLiberty Replatforming & EJB/CDI Root-Cause Fix',
    category: 'Modernization',
    done: true,
    signoff: 'Approved by Mentor Monica',
  },
  {
    label: '3-Way AI Migration Benchmark & Formal PM Report',
    category: 'Benchmarking',
    done: true,
    signoff: 'Delivered to Bob Engineering Leads',
  },
  {
    label: 'CWWK Error Code MCP Server for WatsonX & Bob AI',
    category: 'Innovation Tooling',
    done: true,
    signoff: 'Submitted to WatsonX Intern Challenge',
  },
  {
    label: 'Multi-Agent Modernization Pipeline System Design',
    category: 'Future Systems',
    done: true,
    signoff: 'Reviewed with Mentor Dan',
  },
];

// ==========================================
// 7. CWWK ERROR CODES (FOR INTERACTIVE MCP TOOL)
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
      'CWWKE0001I: The server defaultServer has been launched in 2.341 seconds with active features [cdi-4.0, ejbLite-3.2, jms-2.0].',
    solution: 'Informational message indicating successful Liberty kernel initialization.',
  },
  {
    code: 'CWWKG0016I',
    severity: 'INFO',
    component: 'Config Manager',
    title: 'Dynamic Configuration Update Succeeded',
    description:
      'CWWKG0016I: Starting server configuration update. Dynamically loaded feature messagingClient-3.0 without requiring a server restart.',
    solution: 'Informational: OpenLiberty dynamic feature manager successfully applied configuration modifications in memory.',
  },
  {
    code: 'CWWKZ0001I',
    severity: 'INFO',
    component: 'Application Manager',
    title: 'Application Started Successfully',
    description:
      'CWWKZ0001I: Application daytrader-ee7 started in 4.812 seconds on HTTP endpoint *:9080.',
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
      'Copy the DB2 JDBC driver jar (db2jcc4.jar) from the Podman container into ${shared.config.dir}/lib/ and define <fileset dir="${shared.config.dir}/lib" includes="*.jar"/> in the library definition in server.xml.',
  },
];

// ==========================================
// 8. CONFIG DIFF ITEMS (FOR CONFIG DIFF INSPECTOR)
// ==========================================
export const CONFIG_DIFFS: ConfigDiffItem[] = [
  {
    file: 'server.xml (Feature Configuration)',
    context: 'Enabling JMS client binding to eliminate TradeSLSBBean CDI NPEs',
    legacyCode: `<!-- INCOMPLETE FEATURE LIST (BOB GENERATED) -->
<server description="DayTrader Liberty Server">
  <featureManager>
    <feature>cdi-4.0</feature>
    <feature>ejbLite-3.2</feature>
    <feature>servlet-6.0</feature>
    <feature>appSecurity-5.0</feature> <!-- UNNECESSARY: CAUSES AUTH BLOCK -->
  </featureManager>
</server>`,
    modernCode: `<!-- FIXED PRODUCTION FEATURE LIST -->
<server description="DayTrader Liberty Server">
  <featureManager>
    <feature>cdi-4.0</feature>
    <feature>ejbLite-3.2</feature>
    <feature>servlet-6.0</feature>
    <feature>messagingClient-3.0</feature> <!-- REQUIRED FOR SIBUS JMS BINDING -->
    <feature>jdbc-4.3</feature>
  </featureManager>
</server>`,
    explanation:
      'Adding messagingClient-3.0 allows the EJB container to resolve JMS resource references during TradeSLSBBean CDI initialization, eliminating the downstream NullPointerException on login.',
  },
  {
    file: 'server.xml (DB2 Datasource Configuration)',
    context: 'Wiring Podman DB2 container JDBC driver into Liberty runtime',
    legacyCode: `<!-- FAILING DATASOURCE (MISSING DRIVER LIBRARY) -->
<dataSource id="TradeDataSource" jndiName="jdbc/TradeDataSource">
  <jdbcDriver libraryRef="DB2Lib"/>
</dataSource>`,
    modernCode: `<!-- RESOLVED DB2 DATASOURCE WITH SHARED LIB -->
<library id="DB2Lib">
  <fileset dir="\${shared.config.dir}/lib" includes="db2jcc4.jar db2jcc_license_cu.jar"/>
</library>

<dataSource id="TradeDataSource" jndiName="jdbc/TradeDataSource" type="javax.sql.ConnectionPoolDataSource">
  <jdbcDriver libraryRef="DB2Lib"/>
  <properties.db2.jcc 
    serverName="localhost" 
    portNumber="50000" 
    databaseName="TRADEDB" 
    user="db2inst1" 
    password="password"
    currentSchema="DB2INST1"/>
</dataSource>`,
    explanation:
      'Explicitly references the DB2 JCC driver copied from the Podman instance and declares correct port, schema, and connection pool attributes.',
  },
];
