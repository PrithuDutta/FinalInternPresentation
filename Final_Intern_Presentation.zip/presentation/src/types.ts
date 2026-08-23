// Shared enterprise design tokens and type definitions

export const COLORS = {
  ibmBlue:    '#0f62fe',
  ibmBlue70:  '#0043ce',
  ibmBlue10:  '#edf5ff',
  gray100:    '#161616',
  gray90:     '#262626',
  gray80:     '#393939',
  gray70:     '#525252',
  gray60:     '#6f6f6f',
  gray50:     '#8d8d8d',
  gray30:     '#e0e0e0',
  gray20:     '#ececec',
  gray10:     '#f4f4f4',
  white:      '#ffffff',
  green:      '#198038',
  greenBg:    '#defbe6',
  red:        '#da1e28',
  redBg:      '#fff1f1',
  yellow:     '#f1c21b',
  yellowBg:   '#fdf4d6',
} as const;

export type BadgeVariant = 'blue' | 'green' | 'gray' | 'red' | 'dark' | 'outline';

export type CellStyle = 'best' | 'good' | 'dim' | 'warn' | null;

export interface SpeakerNotes {
  timingTarget: string; // e.g. "1:30 min"
  targetSeconds: number; // e.g. 90
  keyTakeaway: string;
  talkingPoints: string[];
  transitionCue: string;
  anticipatedQuestions: Array<{ q: string; a: string }>;
}

export interface SlideDefinition {
  id: string;
  slideNum: number;
  section: 'Overview' | 'Baseline' | 'Modernization' | 'Benchmark' | 'Tooling' | 'Impact';
  title: string;
  subtitle: string;
  Component: React.ComponentType;
  notes: SpeakerNotes;
}

export interface MetricRow {
  label: string;
  category?: string;
  blind: string;
  pp: string;
  informed: string;
  blindStyle: CellStyle;
  ppStyle:    CellStyle;
  informedStyle: CellStyle;
  explanation?: string;
}

export interface TimelinePhase {
  week: string;
  phaseCode: string;
  title: string;
  objective: string;
  bullets: string[];
  tags: string[];
  deliverable: string;
  status: 'Completed' | 'Ongoing';
}

export interface WorkstreamCard {
  num: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  architectureNotes: string[];
  badges: Array<{ label: string; variant: BadgeVariant }>;
}

export interface ContributionItem {
  color: string;
  title: string;
  category: string;
  metric: string;
  description: string;
  artifacts: string[];
  tags: string[];
}

export interface GoalItem {
  label: string;
  category: string;
  done: boolean;
  signoff: string;
}

export interface CWWKCode {
  code: string;
  severity: 'INFO' | 'WARNING' | 'ERROR';
  component: string;
  title: string;
  description: string;
  solution: string;
}

export interface ConfigDiffItem {
  file: string;
  context: string;
  legacyCode: string;
  modernCode: string;
  explanation: string;
}

