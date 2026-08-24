import type { BadgeVariant } from '../types';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

export function Badge({ label, variant = 'blue', size = 'sm' }: BadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[9.5px]' : 'px-2.5 py-1 text-[10.5px]';

  const variantClassMap: Record<BadgeVariant, string> = {
    blue: 'badge-2010-blue',
    green: 'badge-2010-green',
    red: 'badge-2010-red',
    gray: 'badge-2010-gray',
    dark: 'badge-2010-dark',
    outline: 'badge-2010-outline',
  };

  return (
    <span className={`badge-2010 ${sizeClasses} ${variantClassMap[variant]} font-sans font-bold`}>
      {label}
    </span>
  );
}
