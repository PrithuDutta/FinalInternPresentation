import type { BadgeVariant } from '../types';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  blue:   'bg-[#edf4ff] text-[#0043ce] border border-[#c1d7ff]',
  green:  'bg-[#defbe6] text-[#198038] border border-[#a7f0ba]',
  gold:   'bg-[#fdf4d6] text-[#b28600] border border-[#f5d773]',
  gray:   'bg-[#f1f3f5] text-[#525252] border border-[#dde1e7]',
  purple: 'bg-[#f6f2ff] text-[#6929c4] border border-[#d4bbff]',
  dark:   'bg-[rgba(69,137,255,0.15)] text-[#4589ff] border border-[rgba(69,137,255,0.35)]',
};

export function Badge({ label, variant = 'blue' }: BadgeProps) {
  return (
    <span
      className={`inline-block text-[0.62rem] font-bold tracking-wide px-2 py-0.5 rounded-full ${variantClasses[variant]}`}
    >
      {label}
    </span>
  );
}
