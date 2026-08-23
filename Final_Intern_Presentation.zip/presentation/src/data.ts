import type {
  TimelinePhase,
  WorkstreamCard,
  MetricRow,
  ContributionItem,
  GoalItem,
} from './types';

export const TIMELINE_PHASES: TimelinePhase[] = [
  {
    week: 'Weeks 1–2',
    title: 'Onboarding & Environment',
    bullets: [
      'Set up remote VM, navigated GSA certificate chain issues to get IBM Installation Manager running',
      'Learned the tWAS and OpenLiberty architectures — directories, profiles, Dmgr / ManagedNode / AppServer topology',
      'Reviewed OpenLiberty getting-started guide, traced how server.xml features, Java EE CDI, and EJB all interact',
    ],
    tags: ['tWAS', 'OpenLiberty', 'GSA'],
  },
  {
    week: 'Weeks 3–4',
    title: 'DayTrader 7 on tWAS',
    bullets: [
      'Fixed the DT7 EAR manifest, resolved a missing @Resource annotation on ManagedScheduledExecutorService via VIM in the Linux terminal',
      'Wired DB2 (Podman) into tWAS — fixed J2C auth alias credentials, resolved a JNDI case-sensitivity bug (JDBC/ vs jdbc/)',
      'Built the full JMS/SIBus topology: TradeBus, TradeBrokerQueue, QCF, Topic, and both MDB activation specs (eis/TradeBrokerMDB, eis/TradeStreamerMDB)',
      'Fixed the virtual host alias so the app was reachable on port 9081; ran the prepopulated data script end-to-end',
    ],
    tags: ['DB2', 'JMS/SIBus', 'Podman', 'JDBC'],
  },
  {
    week: 'Weeks 5–7',
    title: 'AMA Discovery & Plain Bob Migration',
    bullets: [
      'Installed and ran AMA discovery tools — reviewed the migration plan dashboard and understood the full scope of changes needed',
      'Ran a blind first migration using only standard Bob AI with no prior knowledge of the expected issues; 19 attempts over several weeks',
      'Traced the root cause: Liberty EJB container aborting TradeSLSBBean provisioning before login() could run due to missing messagingClient-3.0 in server.xml',
      'Documented the CDI/EJB failure chain and mapped the misleading JSP NPE back to the real container-level JMS binding failure',
    ],
    tags: ['AMA', 'Bob AI', 'EJB', 'CDI', 'server.xml'],
  },
  {
    week: 'Weeks 8–9',
    title: 'Bob PP Migration & WatsonX',
    bullets: [
      'Ran the Bob Premium Package migration with AMA guidance — completed in ~54 minutes at 18 Bob coins',
      'Built a Python + BeautifulSoup scraper for IBM\'s CWWK Liberty error code docs, stored structured results in SQLite',
      'Exposed the database as an MCP server for WatsonX and Bob AI to query Liberty diagnostic codes in real time',
      'Delivered written PM evaluation comparing the three migration paths to the Bob engineering team',
    ],
    tags: ['Bob PP', 'WatsonX', 'Python', 'SQLite', 'MCP Server'],
  },
  {
    week: 'Weeks 10–12',
    title: 'OpenLiberty Deployment & AI Pipeline',
    bullets: [
      'Removed hardcoded Bob-generated paths from pom.xml / server.xml, disabled unnecessary appSecurity-5.0, resolved CNTR0154E EJB remote-interface conflict',
      'Copied DB2 JDBC driver from Podman container into Liberty lib/ — fixed datasource init; deployment approved by mentor Monica',
      'Started system design for a LangChain / LiteLLM multi-agent pipeline to automate the full modernization lifecycle with Bob as execution subagent',
    ],
    tags: ['OpenLiberty', 'LangChain', 'LiteLLM'],
    ongoing: true,
  },
];

export const WORKSTREAMS: WorkstreamCard[] = [
  {
    num: '01',
    title: 'DayTrader 7 Modernization',
    description:
      'Replatformed DT7 from Java 8 tWAS to Java 25 OpenLiberty end-to-end. Root-caused EJB container CDI injection failures, a JMS feature dependency mismatch in server.xml, a JNDI case-sensitivity bug, and a missing DB2 JDBC driver. Remote deployment validated and approved by mentor Monica.',
    badges: [
      { label: 'OpenLiberty', variant: 'blue' },
      { label: 'Jakarta EE 11', variant: 'blue' },
      { label: 'EJB · JMS', variant: 'blue' },
      { label: 'Approved ✓', variant: 'green' },
    ],
  },
  {
    num: '02',
    title: 'AI Migration Benchmark',
    description:
      'Ran three migration paths — Plain Bob blind, Bob PP + AMA guided, Plain Bob informed — on the same codebase and measured total time, coin cost, retry count, auditability, and version control quality. Identified that both paths share the same LLM and that Bob PP\'s value comes from workflow structure, not model improvements.',
    badges: [
      { label: 'Bob AI', variant: 'blue' },
      { label: 'Bob PP · AMA', variant: 'blue' },
      { label: 'PM Deliverable ✓', variant: 'green' },
    ],
  },
  {
    num: '03',
    title: 'WatsonX Error Code MCP Server',
    description:
      'Built a Python scraper targeting IBM\'s Liberty CWWK error code documentation. Structured the data in SQLite and exposed it as an MCP server, giving Bob AI and WatsonX real-time access to Liberty diagnostic knowledge during migrations. Built and submitted as part of a 3-person team for the WatsonX intern challenge.',
    badges: [
      { label: 'Python · SQLite', variant: 'blue' },
      { label: 'MCP Server', variant: 'blue' },
      { label: 'WatsonX Challenge', variant: 'purple' },
    ],
  },
  {
    num: '04',
    title: 'Multi-Agent AI Pipeline',
    description:
      'System design for a LangChain / LiteLLM orchestrated pipeline to automate the full modernization lifecycle: AMA discovery → Bob migration → Liberty deployment → validation. Bob as execution subagent. Mapping edge cases, LLM failure modes, and agent handoff contracts with mentor Dan.',
    badges: [
      { label: 'LangChain', variant: 'blue' },
      { label: 'LiteLLM', variant: 'blue' },
      { label: 'Multi-agent', variant: 'purple' },
      { label: 'In Progress', variant: 'gray' },
    ],
  },
];

// Per-cell: 'best' = blue bold, 'good' = green, 'dim' = muted, null = normal
export const METRICS: MetricRow[] = [
  {
    label: 'Total Time',
    blind: '30–40 hrs',      blindStyle: 'dim',
    pp: '54 min',             ppStyle:    'best',
    informed: '~20 min',      informedStyle: 'good',
  },
  {
    label: 'Cost (Bob Coins)',
    blind: '90 coins',        blindStyle: 'dim',
    pp: '18 coins',           ppStyle:    'best',
    informed: '30 coins',     informedStyle: 'good',
  },
  {
    label: 'Attempts / Retries',
    blind: '19  — blind to issues',  blindStyle: 'dim',
    pp: '3  (user + Bob)',           ppStyle:    'best',
    informed: '2  (user-led)',        informedStyle: 'good',
  },
  {
    label: 'Auditability',
    blind: 'Developer managed',    blindStyle: 'dim',
    pp: 'Full AMA scan report',    ppStyle:    'best',
    informed: 'Developer managed', informedStyle: 'dim',
  },
  {
    label: 'Version Control',
    blind: 'Manual commits',         blindStyle: 'dim',
    pp: 'Automated Git commits',     ppStyle:    'best',
    informed: 'Manual commits',      informedStyle: 'dim',
  },
  {
    label: 'LLM Accuracy',
    blind: 'DerbyDB halluc. · missed messagingClient-3.0',  blindStyle: 'dim',
    pp: 'Same model — same hallucinations',                 ppStyle:    null,
    informed: 'Corrected via prompting',                    informedStyle: 'good',
  },
  {
    label: 'Ideal Scale',
    blind: 'Learning / solo dev',          blindStyle: null,
    pp: 'Large enterprise portfolio',      ppStyle:    'best',
    informed: 'Small team, single app',    informedStyle: 'good',
  },
];

export const CONTRIBUTIONS: ContributionItem[] = [
  {
    color: '#0f62fe',
    title: '10+ GitHub Defects on AMA',
    description:
      'Filed issues directly against the AMA toolchain based on real deployment failures: unnecessary appSecurity-5.0 injection, hardcoded path generation, EJB remote-interface misconfiguration, and missing client messaging feature guidance. These went to the AMA engineering team.',
    tags: ['AMA', 'GitHub Issues', 'Liberty'],
  },
  {
    color: '#198038',
    title: 'CWWK Error Code MCP Server',
    description:
      'Scraped and structured IBM\'s full Liberty CWWK error code documentation into SQLite, then exposed it as a live MCP server. This gives Bob AI access to Liberty diagnostic context in real time during any modernization — a tool that outlasts the internship.',
    tags: ['Python', 'SQLite', 'WatsonX', 'MCP'],
  },
  {
    color: '#4589ff',
    title: 'PM Benchmark Evaluation',
    description:
      'Delivered a written evaluation comparing all three migration paths by unit economics — time, coin cost, retry rate — alongside LLM hallucination patterns and a concrete enterprise scaling recommendation. Presented to the Bob engineering team and IBM product managers.',
    tags: ['PM Report', 'Bob AI', 'Bob PP'],
  },
  {
    color: '#6929c4',
    title: 'Multi-Agent Pipeline Design',
    description:
      'Architecting a LangChain / LiteLLM orchestrated pipeline to automate the end-to-end DT7 modernization flow: AMA scan → Bob migration → Liberty deployment → validation. Bob serves as the execution subagent with LiteLLM as the orchestration layer.',
    tags: ['LangChain', 'LiteLLM', 'In Progress'],
  },
];

export const GOALS: GoalItem[] = [
  { label: 'tWAS full deployment with DB2 & JMS', done: true },
  { label: 'AI migration benchmark & PM report', done: true },
  { label: 'Liberty remote deployment approved', done: true },
  { label: 'Multi-agent automation pipeline', done: false },
];
