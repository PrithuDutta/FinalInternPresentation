import type { BadgeVariant } from '../types';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

export function Badge({ label, variant = 'blue', size = 'sm' }: BadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[0.62rem]' : 'px-2.5 py-1 text-[0.7rem]';

  const variantStyles: Record<BadgeVariant, string> = {
    blue: 'bg-[#edf5ff] text-[#0f62fe] border border-[#a6c8ff]',
    green: 'bg-[#defbe6] text-[#198038] border border-[#6fdc8c]',
    red: 'bg-[#fff1f1] text-[#da1e28] border border-[#ff8389]',
    gray: 'bg-[#f4f4f4] text-[#525252] border border-[#e0e0e0]',
    dark: 'bg-[#161616] text-[#ffffff] border border-[#161616]',
    outline: 'bg-white text-[#525252] border border-[#c6c6c6]',
  };

  return (
    <span
      className={`inline-flex items-center font-mono font-semibold tracking-wider uppercase border-0 ${sizeClasses} ${variantStyles[variant]}`}
      style={{ borderRadius: '0px' }}
    >
      {label}
    </span>
  );
}

