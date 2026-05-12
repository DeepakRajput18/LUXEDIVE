import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'bordered' | 'gradient';
}

export function Card({ children, className, variant = 'default' }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg transition-all',
        {
          'bg-luxe-dark/40 backdrop-blur-md border border-white/5 shadow-xl hover:-translate-y-1 hover:border-luxe-gold/20 hover:shadow-2xl hover:shadow-luxe-gold/5 duration-500': variant === 'default',
          'bg-[#050505] border border-white/5': variant === 'dark',
          'bg-transparent border border-white/10': variant === 'bordered',
          'bg-gradient-to-br from-luxe-surface to-black border border-white/5': variant === 'gradient'
        },
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className }: { children: ReactNode, className?: string }) {
  return <div className={cn("", className)}>{children}</div>
}

export function CardHeader({ children, className }: { children: ReactNode, className?: string }) {
  return <div className={cn("p-6 border-b border-luxe-gray/10", className)}>{children}</div>
}

export function CardTitle({ children, className }: { children: ReactNode, className?: string }) {
  return <h3 className={cn("text-lg font-medium text-luxe-white", className)}>{children}</h3>
}
