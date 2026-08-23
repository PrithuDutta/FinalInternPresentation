// Shared design tokens and type definitions

export const COLORS = {
  navy:     '#0d1117',
  navyMid:  '#0f1e3c',
  blue:     '#0f62fe',
  blueLt:   '#4589ff',
  blueBg:   '#edf4ff',
  blueBd:   '#c1d7ff',
  text:     '#161616',
  muted:    '#525252',
  faint:    '#8d8d8d',
  border:   '#dde1e7',
  soft:     '#f4f6fb',
  green:    '#198038',
  greenBg:  '#defbe6',
  greenBd:  '#a7f0ba',
  gold:     '#b28600',
  goldBg:   '#fdf4d6',
  goldBd:   '#f5d773',
  purple:   '#6929c4',
} as const;

export type BadgeVariant = 'blue' | 'green' | 'gold' | 'gray' | 'purple' | 'dark';

// 'best' = blue highlight (lower is better or genuinely superior value)
// 'good' = green (middle ground)
// 'dim'  = muted (worse value)
// null   = default text
export type CellStyle = 'best' | 'good' | 'dim' | null;

export interface MetricRow {
  label: string;
  blind: string;
  pp: string;
  informed: string;
  blindStyle: CellStyle;
  ppStyle:    CellStyle;
  informedStyle: CellStyle;
}

export interface TimelinePhase {
  week: string;
  title: string;
  bullets: string[];
  tags: string[];
  ongoing?: boolean;
}

export interface WorkstreamCard {
  num: string;
  title: string;
  description: string;
  badges: Array<{ label: string; variant: BadgeVariant }>;
}

export interface ContributionItem {
  color: string;
  title: string;
  description: string;
  tags: string[];
}

export interface GoalItem {
  label: string;
  done: boolean;
}
